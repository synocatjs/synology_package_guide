## 设置

与其他套件不同，Spreadsheet API 不是 Office 套件的一部分。`synology/spreadsheet-api` 镜像提供了客户端与 DSM 之间的代理服务。每个 worker 专用于单个用户和单个电子表格。一个用户可以同时拥有多个针对不同电子表格的 worker。

**注意：** 不建议在同一 DSM 上运行容器和 Office。服务器可能会消耗大量资源，尤其是在有大量活跃电子表格的情况下。服务器在加载电子表格时会执行必要的计算。

---

### 运行服务器

从 `synology/spreadsheet-api:{tag}` 拉取镜像。以 API 版本 3.4.1 为例：

```bash
docker pull synology/spreadsheet-api:3.4.1
```

运行服务器：

```bash
docker run -e AUTH_SECRET=secret-key-for-auth-token -p '3000:3000' synology/spreadsheet-api:3.4.1
```

---

### 环境变量说明

| 变量 | 默认值 | 描述 |
|------|--------|------|
| **AUTH_SECRET** * | 无 | JWT Token 的密钥。服务器无法在没有此变量的情况下运行。 |
| **METRICS_TOKEN** | 无 | 使用此 Token 获取实时指标以监控服务器健康状态。请保密，因为指标可能包含机密数据。未设置时无法访问指标。 |
| **LOKI_HOST** | 无 | 将警告和错误发送到运行在此 URL 上的 Loki 服务器。请保密，因为日志可能包含机密数据。未设置时日志将输出到 stdout。 |
| **HOST** | 0.0.0.0 | 服务器监听的地址。 |
| **PORT** | 3000 | 服务器监听的端口。 |
| **WORKER_TIMEOUT** | 600,000 | 关闭非活跃 worker 前等待的时间（毫秒）。 |
| **USER_TIMEOUT** | 60,000 | 关闭没有 worker 的用户前等待的时间（毫秒）。 |

---

### 安全连接

默认情况下，上述设置仅接受 HTTP 连接。以下工具可用于处理安全连接（HTTPS）：

- DSM 反向代理
- Caddy
- NGINX

---

### 监控

#### Prometheus

创建作业来收集指标：

```yaml
# prometheus.yml
scrape_configs:
  - job_name: 'system-metrics'
    metrics_path: '/spreadsheets/admin/fastifyMetrics'
    params:
      metrics_token: ['{your METRICS_TOKEN}']
    static_configs:
      - targets: ['{your Spreadsheet API server ip}']
  - job_name: 'user-metrics'
    metrics_path: '/spreadsheets/admin/metrics'
    params:
      metrics_token: ['{your METRICS_TOKEN}']
    static_configs:
      - targets: ['{your Spreadsheet API server ip}']
```

#### Loki

在 `LOKI_HOST` 指定的 URL 上运行 Loki 服务器以收集日志：

```yaml
# loki.yml
target: all
server:
  http_listen_port: 3100

ingester:
  lifecycler:
    address: 127.0.0.1
    ring:
      kvstore:
        store: inmemory
      replication_factor: 1
    final_sleep: 0s
  wal:
    dir: /tmp/loki/wal
  chunk_idle_period: 30m
  chunk_retain_period: 0s
  max_transfer_retries: 0

schema_config:
  configs:
    - from: 2018-04-15
      store: boltdb
      object_store: filesystem
      schema: v11
      index:
        prefix: index_
        period: 168h

storage_config:
  boltdb:
    directory: /tmp/loki/index
  filesystem:
    directory: /tmp/loki/chunks
```

#### Grafana

运行服务器（参考以下 `docker-compose.yml`）：

```yaml
# docker-compose.yml

volumes:
  grafana-data-vol:

services:
  prometheus:
    image: prom/prometheus:latest
    command: [ "--config.file=/etc/prometheus/prometheus.yml" ]
    volumes:
      - ./prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
    ports:
      - "9090:9090"
  loki:
    image: grafana/loki
    ports:
      - 3100:3100
    command: [ "-config.file=/etc/loki/loki.yml" ]
    volumes:
      - ./loki/loki.yml:/etc/loki/loki.yml
      - ./loki/index:/tmp/loki/index
      - ./loki/chunks:/tmp/loki/chunks
      - ./loki/wal:/tmp/loki/wal
  grafana:
    image: grafana/grafana
    volumes:
      - grafana-data-vol:/var/lib/grafana
    ports:
      - 3000:3000
    environment:
      - GF_SECURITY_ADMIN_USER={your username}
      - GF_SECURITY_ADMIN_PASSWORD={your password}
      - GF_SERVER_DOMAIN={your server domain}
```

**导入仪表板：**
- API
- CPU & Memory
- Node.js

**在 UI 中配置 Prometheus 和 Loki 数据源。**