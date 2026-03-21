## 获取 Webhook

**GET** `/api/SynologyDrive/default/v2/webhooks/{webhook_id}/{app_id}`

获取指定的 Webhook。

---

### 请求

#### 路径参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `webhook_id` | string | ✓ | Webhook ID |
| `app_id` | string | ✓ | 此 Webhook 所属的应用集成 ID |

**示例：**
```
webhook_id=3
app_id=3
```
获取 `app_id` 为 3 且 `webhook_id` 为 3 的 Webhook 信息。

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/webhooks/3/3" \
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
| `data.webhook_id` | string | Webhook ID |
| `data.app_id` | string | 此 Webhook 所属的应用集成 ID |
| `data.type` | string | 通知目标类型。有效值：`shared_library`、`url` |
| `data.url` | string | 接收 URL 的域名（当类型为 `url` 时返回） |
| `data.so_name` | string | 共享库的文件名（当类型为 `shared_library` 时返回） |
| `data.token` | string | 密钥令牌（不会在响应中返回实际值） |
| `data.options` | object | 过滤选项 |
| `data.options.filter_file_ext` | array | 过滤文件的扩展名后缀 |
| `data.options.filter_events` | array | 过滤事件类型 |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "webhook_id": "3",
        "app_id": "3",
        "type": "url",
        "url": "127.0.0.1/ping",
        "so_name": "",
        "options": {
            "filter_file_ext": [],
            "filter_events": []
        }
    }
}
```