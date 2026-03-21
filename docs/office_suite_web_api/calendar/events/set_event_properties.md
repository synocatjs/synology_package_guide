## 设置事件的特定属性

**PUT** `/api/Calendar/default/v1/event/personal-property`

设置事件的特定属性，如可见性。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `evt_id` | integer | ✓ | 事件 ID |
| `recurrence_id` | string | ✗ | 子事件的日期和时间，格式：全天事件 `YYYYMMDD`，非全天事件 `YYYYMMDDThhmmss`。依赖 `evt_id`，用于指定重复事件中的特定子事件 |
| `is_visible` | boolean | ✓ | 配置事件的可见性属性。<br>`true`：可见<br>`false`：不可见 |

#### 认证

需要 API 密钥（cookie），使用登录获取的 sid。

#### 请求示例（设置事件不可见）

```json
{
    "evt_id": 12345,
    "is_visible": false
}
```

#### 请求示例（设置重复事件中子事件不可见）

```json
{
    "evt_id": 12345,
    "recurrence_id": "20231122T100000",
    "is_visible": false
}
```

#### cURL 命令示例

```bash
curl -X PUT "https://{nas_url}/api/Calendar/default/v1/event/personal-property" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: id={sid}" \
  -d '{"is_visible":false,"evt_id":12345}'
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data.success` | boolean | 操作是否成功 |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "success": true
    }
}
```

---

### 使用说明

- 此 API 用于设置事件的个人属性（如可见性）
- 可见性设置仅影响当前用户，不影响其他参与者
- 设置 `is_visible: false` 后，该事件将对当前用户隐藏
- 可用于在日历中过滤不希望看到的事件
- 对于重复事件，可通过 `recurrence_id` 指定特定子事件进行设置