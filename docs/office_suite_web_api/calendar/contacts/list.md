## 获取用户联系人列表

**GET** `/api/Calendar/default/v1/contact`

获取用户联系人列表。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `list_dsm_only` | boolean | ✗ | 是否仅列出 DSM 用户 |

#### 认证

需要 API 密钥（cookie），使用登录获取的 sid。

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/Calendar/default/v1/contact" \
  -H "accept: application/json" \
  -H "cookie: id={sid}"
```

仅列出 DSM 用户的示例：

```bash
curl -X GET "https://{nas_url}/api/Calendar/default/v1/contact?list_dsm_only=true" \
  -H "accept: application/json" \
  -H "cookie: id={sid}"
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data.list` | array | 用户联系人信息列表 |

#### data.list 数组元素字段

| 字段 | 类型 | 描述 |
|------|------|------|
| `user_name` | string | 用户名 |
| `display_name` | string | 用户显示名称 |
| `email` | string | 用户邮箱 |
| `is_real_email` | boolean | 邮箱是否为真实邮箱 |
| `type` | enum | 用户类型。<br>`dsm`：DSM 用户<br>`email`：仅邮箱联系人 |
| `has_set_email` | boolean | 是否已设置邮箱 |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "list": [
            {
                "user_name": "admin",
                "display_name": "Administrator",
                "email": "admin@example.com",
                "is_real_email": true,
                "type": "dsm",
                "has_set_email": true
            },
            {
                "user_name": "john_doe",
                "display_name": "John Doe",
                "email": "john@example.com",
                "is_real_email": true,
                "type": "dsm",
                "has_set_email": true
            },
            {
                "user_name": "",
                "display_name": "external_user",
                "email": "external@example.com",
                "is_real_email": true,
                "type": "email",
                "has_set_email": true
            }
        ]
    }
}
```