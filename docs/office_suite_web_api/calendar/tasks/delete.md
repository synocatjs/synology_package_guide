## 删除任务

**DELETE** `/api/Calendar/default/v1/task`

删除指定的任务。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `evt_id` | integer | ✓ | 任务 ID |

**示例：**
```
evt_id=12345
```
删除 ID 为 12345 的任务。

#### 认证

需要 API 密钥（cookie），使用登录获取的 sid。

#### cURL 命令示例

```bash
curl -X DELETE "https://{nas_url}/api/Calendar/default/v1/task?evt_id=12345" \
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
- 删除任务后，该任务将从所有相关日历中移除
- 只有任务所有者或有相应权限的用户可以删除任务