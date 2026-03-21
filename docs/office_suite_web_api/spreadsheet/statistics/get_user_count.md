## 获取用户数量

**GET** `/spreadsheets/admin/metrics`

以 Prometheus 格式获取用户和 worker 数量。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `metrics_token` | string | ✓ | METRICS_TOKEN 环境变量的值 |

#### cURL 命令示例

```bash
curl -X GET "http://{server_url}/spreadsheets/admin/metrics?metrics_token={your_token}" \
  -H "accept: text/plain"
```

---

### 响应

#### 成功响应 (200)

**Content-Type:** `text/plain`

响应体为 Prometheus 格式的指标数据。

#### 响应示例

```
# HELP spreadsheet_active_users Number of active users
# TYPE spreadsheet_active_users gauge
spreadsheet_active_users 12

# HELP spreadsheet_active_workers Number of active workers
# TYPE spreadsheet_active_workers gauge
spreadsheet_active_workers 8

# HELP spreadsheet_total_users Total number of users
# TYPE spreadsheet_total_users gauge
spreadsheet_total_users 45

# HELP spreadsheet_total_workers Total number of workers
# TYPE spreadsheet_total_workers gauge
spreadsheet_total_workers 32
```

#### 错误响应 (400)

- `metrics_token` 参数缺失时返回 400
- Token 无效时返回 400

---

### 使用说明

- **active_users**：当前活跃用户数（至少有一个活跃 worker 的用户）
- **active_workers**：当前活跃 worker 数
- **total_users**：历史总用户数
- **total_workers**：历史总 worker 数
- 此端点用于监控服务器负载和用户活动情况
- 使用前需在运行服务器时设置 `METRICS_TOKEN` 环境变量
- 请妥善保管 Token，因为指标可能包含敏感信息
- 未设置 `METRICS_TOKEN` 时此端点不可访问