## 设置重复事件例外日期

**PUT** `/api/Calendar/default/v1/event/exdate`

删除重复事件中的特定一次发生。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `evt_id` | integer | ✓ | 事件 ID |
| `dav_etag` | string | ✓ | 事件时间戳。修改时若此值与服务器记录值不同，表示已被他人修改 |
| `exdate` | string | ✓ | 要删除的重复事件中特定一次的发生日期，格式：全天事件 `YYYYMMDD`，非全天事件 `YYYYMMDDThhmmss` |

#### 认证

需要 API 密钥（cookie），使用登录获取的 sid。

#### 请求示例

```json
{
    "evt_id": 12345,
    "dav_etag": "\"123456789\"",
    "exdate": "20231122T100000"
}
```

#### cURL 命令示例

```bash
curl -X PUT "https://{nas_url}/api/Calendar/default/v1/event/exdate" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: id={sid}" \
  -d '{"evt_id":12345,"dav_etag":"\"123456789\"","exdate":"20231122T100000"}'
```

---

### 响应

#### 成功响应 (200)

响应结构与 [获取事件] 接口返回的 data 对象一致，返回更新后的主事件信息。

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data` | object | 更新后的事件详细信息 |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "evt_id": 12345,
        "cal_id": "/admin/home/",
        "summary": "Team Meeting",
        "is_repeat_evt": true,
        "repeat_setting": {
            "type": "week",
            "interval": 1,
            "weekday": ["Tuesday"]
        },
        "modify_time": 1700005000
    }
}
```

---

### 使用说明

- 此 API 用于从重复事件系列中删除单个发生
- 删除后，该特定日期将不再显示事件
- 其他未删除的发生仍遵循主事件的重复规则
- 此操作不可逆，如需恢复被删除的发生，需要重新创建事件或修改例外设置
- `exdate` 格式必须与主事件的重复规则一致