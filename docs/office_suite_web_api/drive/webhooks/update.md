## 更新 Webhook

**PUT** `/api/SynologyDrive/default/v2/webhooks/{webhook_id}/{app_id}`

更新指定的 Webhook。

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
更新 `app_id` 为 3 且 `webhook_id` 为 3 的 Webhook 的 URL。

---

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `type` | string | ✓ | 通知目标类型。有效值：`shared_library`（共享库）、`url`（URL） |
| `url` | string | ✗ | 接收 URL 的域名（当 `type` 为 `url` 时使用） |
| `so_name` | string | ✗ | 共享库的文件名（应用文件夹路径下的相对路径）（当 `type` 为 `shared_library` 时使用） |
| `token` | string | ✗ | 将附加在通知中用于验证用途的密钥令牌。此值不会在响应中返回。（默认值：空字符串） |
| `options` | object | ✗ | 过滤选项 |
| `options.filter_file_ext` | array | ✗ | 过滤文件的扩展名后缀，例如：`"pdf"`、`"doc"` 等 |
| `options.filter_events` | array | ✗ | 过滤事件类型。`"TrueEvent"` 或 `"FakeEvent"` |

#### 请求示例

```json
{
    "url": "192.168.0.1/pong",
    "type": "url"
}
```

#### cURL 命令示例

```bash
curl -X PUT "https://{nas_url}/api/SynologyDrive/default/v2/webhooks/3/3" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: {sid}" \
  -d '{"url":"192.168.0.1/pong","type":"url"}'
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
| `data.type` | string | 通知目标类型 |
| `data.url` | string | 接收 URL 的域名 |
| `data.so_name` | string | 共享库的文件名 |
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
        "url": "192.168.0.1/pong",
        "so_name": "",
        "options": {
            "filter_file_ext": [],
            "filter_events": []
        }
    }
}
```