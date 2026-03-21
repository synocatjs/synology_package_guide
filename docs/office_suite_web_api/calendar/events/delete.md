## 删除事件

**DELETE** `/api/Calendar/default/v1/event`

删除指定的事件。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `evt_id` | integer | ✓ | 事件 ID |

**示例：**
```
evt_id=12345
```
删除 ID 为 12345 的事件。

#### 认证

需要 API 密钥（cookie），使用登录获取的 sid。

#### cURL 命令示例

```bash
curl -X DELETE "https://{nas_url}/api/Calendar/default/v1/event?evt_id=12345" \
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

- 删除操作不可逆，请谨慎使用
- 删除事件后，所有参与者的日历中该事件也将被移除
- 对于重复事件，此操作将删除整个重复事件系列
- 如需仅删除单个重复事件实例，请使用其他接口或指定 `recurrence_id`