## 获取服务器指标

**GET** `/spreadsheets/admin/fastifyMetrics`

以 Prometheus 格式获取服务器指标。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `metrics_token` | string | ✓ | METRICS_TOKEN 环境变量的值 |

#### cURL 命令示例

```bash
curl -X GET "http://{server_url}/spreadsheets/admin/fastifyMetrics?metrics_token={your_token}" \
  -H "accept: text/plain"
```

---

### 响应

#### 成功响应 (200)

**Content-Type:** `text/plain`

响应体为 Prometheus 格式的指标数据。

#### 响应示例

```
# HELP process_cpu_user_seconds_total Total user CPU time spent in seconds.
# TYPE process_cpu_user_seconds_total counter
process_cpu_user_seconds_total 0.5

# HELP process_resident_memory_bytes Resident memory size in bytes.
# TYPE process_resident_memory_bytes gauge
process_resident_memory_bytes 123456789

# HELP nodejs_active_handles Number of active handles.
# TYPE nodejs_active_handles gauge
nodejs_active_handles 15

# HELP nodejs_active_requests Number of active requests.
# TYPE nodejs_active_requests gauge
nodejs_active_requests 3

# HELP spreadsheet_api_requests_total Total number of API requests
# TYPE spreadsheet_api_requests_total counter
spreadsheet_api_requests_total 1250

# HELP spreadsheet_active_workers Number of active workers
# TYPE spreadsheet_active_workers gauge
spreadsheet_active_workers 8
```

#### 错误响应 (400)

- `metrics_token` 参数缺失时返回 400
- Token 无效时返回 400

---

### 使用说明

- 此端点用于监控服务器健康状态
- 指标包含系统指标和应用程序自定义指标
- 使用前需在运行服务器时设置 `METRICS_TOKEN` 环境变量
- 请妥善保管 Token，因为指标可能包含敏感信息
- 未设置 `METRICS_TOKEN` 时此端点不可访问