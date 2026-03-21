## 删除日历

**DELETE** `/api/Calendar/default/v1/cal`

删除指定的日历。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `cal_id` | string | ✓ | 日历 ID |

**示例：**
```
cal_id=/admin/sadflhjlk/
```
删除 ID 为 `/admin/sadflhjlk/` 的日历。

#### 认证

需要 API 密钥（cookie），使用登录获取的 sid。

#### cURL 命令示例

```bash
curl -X DELETE "https://{nas_url}/api/Calendar/default/v1/cal?cal_id=%2Fadmin%2Fsadflhjlk%2F" \
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
- 删除日历后，该日历中的所有事件和任务将一并删除
- 默认日历不可删除
- 只有日历所有者或有相应权限的用户可以删除日历