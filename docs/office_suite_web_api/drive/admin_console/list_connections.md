## 列出客户端连接

**GET** `/api/SynologyDrive/default/v2/admin/client`

列出来自客户端的连接。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `offset` | integer | ✗ | 跳过前 N 个连接。（默认值：`0`） |
| `limit` | integer | ✗ | 最多列出 N 个连接。（`0` 表示无限制） |
| `sort_by` | enum | ✗ | 排序字段。<br>**有效值：** `client_id`、`client_name`、`login_time`、`client_status`、`client_type`、`client_ip`、`client_location`、`client_version`、`last_auth_time` |
| `sort_direction` | enum | ✗ | 排序方向。有效值：`ASC`（升序）、`DESC`（降序） |

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/admin/client" \
  -H "accept: application/json" \
  -H "cookie: {sid}"
```

带分页和排序参数的示例：

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/admin/client?offset=0&limit=50&sort_by=login_time&sort_direction=DESC" \
  -H "accept: application/json" \
  -H "cookie: {sid}"
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data.total` | integer | 连接总数 |
| `data.items` | array | 连接信息数组 |

#### data.items 数组元素字段

| 字段 | 类型 | 描述 |
|------|------|------|
| `client_id` | string | 客户端 ID |
| `client_name` | string | 客户端名称 |
| `client_ip` | string | 客户端 IP 地址 |
| `client_location` | string | 客户端位置 |
| `client_type` | string | 客户端类型（如 `Windows`、`macOS`、`Linux`、`Mobile`） |
| `client_version` | string | 客户端版本 |
| `client_status` | string | 客户端状态（如 `connected`、`disconnected`） |
| `login_time` | integer | 登录时间（Unix 时间戳） |
| `last_auth_time` | integer | 最后认证时间（Unix 时间戳） |
| `user_name` | string | 用户名 |
| `user_uid` | integer | 用户 UID |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "total": 25,
        "items": [
            {
                "client_id": "client_001",
                "client_name": "John-PC",
                "client_ip": "192.168.1.100",
                "client_location": "Office",
                "client_type": "Windows",
                "client_version": "4.0.0",
                "client_status": "connected",
                "login_time": 1700000000,
                "last_auth_time": 1700003600,
                "user_name": "john_doe",
                "user_uid": 1001
            },
            {
                "client_id": "client_002",
                "client_name": "Jane-MacBook",
                "client_ip": "192.168.1.101",
                "client_location": "Home",
                "client_type": "macOS",
                "client_version": "4.0.1",
                "client_status": "connected",
                "login_time": 1699990000,
                "last_auth_time": 1699993600,
                "user_name": "jane_smith",
                "user_uid": 1002
            },
            {
                "client_id": "client_003",
                "client_name": "Mobile-Android",
                "client_ip": "10.0.0.50",
                "client_location": "Remote",
                "client_type": "Android",
                "client_version": "4.0.0",
                "client_status": "disconnected",
                "login_time": 1699900000,
                "last_auth_time": 1699903600,
                "user_name": "bob_wilson",
                "user_uid": 1003
            }
        ]
    }
}
```