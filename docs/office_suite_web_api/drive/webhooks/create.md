## 创建 Webhook

**POST** `/api/SynologyDrive/default/v2/webhooks`

创建 Webhook 以订阅文件变更通知。`app_id` 仅在创建 Webhook 时在响应中返回。请务必记录此值，因为在使用其他 Webhook 相关 API 时需要用到。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `app_id` | string | ✓ | 此 Webhook 所属的应用集成 ID |
| `type` | string | ✓ | 通知目标类型。有效值：`shared_library`（共享库）、`url`（URL） |
| `url` | string | ✗ | 接收 URL 的域名（当 `type` 为 `url` 时使用） |
| `so_name` | string | ✗ | 共享库的文件名（应用文件夹路径下的相对路径）（当 `type` 为 `shared_library` 时使用） |
| `token` | string | ✗ | 将附加在通知中用于验证用途的密钥令牌。此值不会在响应中返回。（默认值：空字符串） |
| `options` | object | ✗ | 过滤选项 |
| `options.filter_file_ext` | array | ✗ | 过滤文件的扩展名后缀，例如：`"pdf"`、`"doc"` 等 |
| `options.filter_events` | array | ✗ | 过滤事件类型。`"TrueEvent"` 或 `"FakeEvent"` |

#### 请求示例（URL 类型）

```json
{
    "url": "127.0.0.1/ping",
    "app_id": "3",
    "type": "url"
}
```

#### 请求示例（共享库类型）

```json
{
    "so_name": "libwebhook.so",
    "app_id": "3",
    "type": "shared_library",
    "token": "secret_token_123",
    "options": {
        "filter_file_ext": ["pdf", "doc", "jpg"],
        "filter_events": ["TrueEvent"]
    }
}
```

#### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/SynologyDrive/default/v2/webhooks" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: {sid}" \
  -d '{"url":"127.0.0.1/ping","app_id":"3","type":"url"}'
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
        "webhook_id": "webhook_001",
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

---

### 使用说明

- **app_id**：需要提前创建应用集成才能获取
- **webhook_id**：创建成功后返回，后续更新、删除、测试等操作需要此 ID
- **token**：用于验证通知的真实性，请妥善保管
- **过滤选项**：可通过 `filter_file_ext` 和 `filter_events` 减少不必要的通知