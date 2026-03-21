## 获取 Webhook 列表

**GET** `/api/SynologyDrive/default/v2/webhooks/{app_id}`

获取已登录用户或集成应用的 Webhook 列表。

---

### 请求

#### 路径参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `app_id` | string | ✓ | 此 Webhook 所属的应用集成 ID |

**示例：**
```
app_id=3
```
列出 ID 为 3 的应用的所有 Webhook。

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/webhooks/3" \
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
| `data.total` | integer | Webhook 总数 |
| `data.items` | array | Webhook 信息数组 |

#### data.items 数组元素字段

| 字段 | 类型 | 描述 |
|------|------|------|
| `webhook_id` | string | Webhook ID |
| `app_id` | string | 此 Webhook 所属的应用集成 ID |
| `type` | string | 通知目标类型。有效值：`shared_library`、`url` |
| `url` | string | 接收 URL 的域名（当类型为 `url` 时返回） |
| `so_name` | string | 共享库的文件名（当类型为 `shared_library` 时返回） |
| `token` | string | 密钥令牌（不会在响应中返回实际值） |
| `options` | object | 过滤选项 |
| `options.filter_file_ext` | array | 过滤文件的扩展名后缀 |
| `options.filter_events` | array | 过滤事件类型 |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "total": 2,
        "items": [
            {
                "webhook_id": "1",
                "app_id": "3",
                "type": "url",
                "url": "https://example.com/webhook/receiver",
                "so_name": "",
                "options": {
                    "filter_file_ext": ["pdf", "docx"],
                    "filter_events": ["file_created", "file_modified"]
                }
            },
            {
                "webhook_id": "2",
                "app_id": "3",
                "type": "shared_library",
                "url": "",
                "so_name": "libwebhook.so",
                "options": {
                    "filter_file_ext": [],
                    "filter_events": ["file_deleted"]
                }
            }
        ]
    }
}
```