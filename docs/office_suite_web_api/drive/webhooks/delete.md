## 删除 Webhook

**DELETE** `/api/SynologyDrive/default/v2/webhooks/{webhook_id}/{app_id}`

删除指定的 Webhook。

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
删除 `app_id` 为 3 且 `webhook_id` 为 3 的 Webhook。

#### cURL 命令示例

```bash
curl -X DELETE "https://{nas_url}/api/SynologyDrive/default/v2/webhooks/3/3" \
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

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    }
}
```

---

### 使用说明

- 删除 Webhook 后，将不再接收该 Webhook 相关的文件变更通知
- 此操作不可逆，请谨慎使用
- 删除后无法恢复，如需重新接收通知，需要创建新的 Webhook