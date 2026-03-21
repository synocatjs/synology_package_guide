# 登录

**POST** `/api/SynologyDrive/default/v2/login`

登录 DSM 以获取后续 API 调用所需的会话 ID（sid）。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `format` | enum | ✓ | 会话 ID 返回格式。设置为 `sid` 以确保兼容性。<br>**允许值：** `sid` |
| `account` | string | ✓ | DSM 账户名 |
| `passwd` | string | ✓ | DSM 密码 |

#### 请求示例

```json
{
    "format": "sid",
    "account": "admin",
    "passwd": "password"
}
```

#### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/SynologyDrive/default/v2/login" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -d '{"format":"sid","account":"admin","passwd":"password"}'
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 是否成功 |
| `data.did` | string | 设备 ID |
| `data.sid` | string | 后续 API 调用所需的会话 ID |
| `error.code` | integer | 错误代码（仅在失败时返回） |

#### 响应示例

```json
{
    "success": true,
    "data": {
        "did": "device_id_here",
        "sid": "session_id_here"
    },
    "error": {
        "code": 0
    }
}
```