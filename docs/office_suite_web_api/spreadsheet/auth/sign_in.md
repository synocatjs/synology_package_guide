## 登录

**POST** `/spreadsheets/authorize`

创建新的登录会话。

指定要登录的 NAS 的协议和主机。

此会话的权限由提供的账户决定。没有相应权限的账户无法读取/写入 Office 文件。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `username` | string | ✓ | 用户名 |
| `password` | string | ✓ | 密码 |
| `host` | string | ✓ | NAS 主机地址。如果未使用 HTTP 或 HTTPS 的默认端口（即 80 或 443），请包含端口号 |
| `protocol` | enum | ✗ | 主机协议。默认为 `https`。<br>**有效值：** `https`、`http` |

#### 请求示例

```json
{
    "username": "username",
    "password": "password",
    "host": "my-nas:5001",
    "protocol": "https"
}
```

#### cURL 命令示例

```bash
curl -X POST "http://{server_url}/spreadsheets/authorize" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -d '{"username":"username","password":"password","host":"my-nas:5001","protocol":"https"}'
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `token` | string | JWT 格式的 API Token |

#### 响应示例

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lIiwiaG9zdCI6Im15LW5hczo1MDAxIiwiZXhwIjoxNzAwMDAwMDAwfQ.signature"
}
```

#### 错误响应 (401)

认证失败时返回 401 状态码。