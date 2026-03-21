# 登出

**POST** `/api/SynologyDrive/default/v2/logout`

注销与指定 `_sid` 对应的 DSM 会话。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `_sid` | string | ✓ | 从登录获取的会话 ID |

#### 请求示例

```json
{
    "_sid": "abcd1234"
}
```

#### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/SynologyDrive/default/v2/logout" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -d '{"_sid":"abcd1234"}'
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 是否成功 |
| `error.code` | integer | 错误代码（仅在失败时返回） |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    }
}
```