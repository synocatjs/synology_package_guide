## 获取事件

**GET** `/api/Calendar/default/v1/event`

获取指定事件的详细信息。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `evt_id` | integer | ✗ | 事件 ID（与 `ical_uid` 互斥） |
| `recurrence_id` | string | ✗ | 子事件的日期和时间，依赖 `evt_id`，格式为 ISO8601.2004。<br>全天事件：`YYYYMMDD`，如 `20230601`<br>非全天事件：`YYYYMMDDThhmmss`，如 `20230601T080000` |
| `cal_id` | string | ✗ | 日历 ID，与 `ical_uid` 共同使用时必须提供 |
| `ical_uid` | string | ✗ | 事件 UID，与 `evt_id` 互斥 |

#### 认证

需要 API 密钥（cookie），使用登录获取的 sid。

#### cURL 命令示例（通过 evt_id 获取）

```bash
curl -X GET "https://{nas_url}/api/Calendar/default/v1/event?evt_id=12345" \
  -H "accept: application/json" \
  -H "cookie: id={sid}"
```

通过 ical_uid 获取：

```bash
curl -X GET "https://{nas_url}/api/Calendar/default/v1/event?ical_uid=abc123&cal_id=%2Fadmin%2Fhome%2F" \
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
| `data` | object | 事件详细信息 |

#### data 对象主要字段

| 字段 | 类型 | 描述 |
|------|------|------|
| `evt_id` | integer | 事件 ID |
| `cal_id` | string | 事件所在日历 ID，格式如 `/admin/home/` 或共享日历 `/test1/xxxxx/` |
| `ical_uid` | string | ICS 中的事件 UUID |
| `dav_etag` | string | 事件时间戳，修改时若与服务器记录值不同，表示已被他人修改 |
| `summary` | string | 事件标题 |
| `description` | string | 事件描述 |
| `color` | string | 事件颜色，RGB 颜色代码如 `#112233`，留空使用日历默认颜色 |
| `is_all_day` | boolean | 是否为全天事件 |
| `tz_id` | string | 时区 ID，如 `Asia/Taipei`（非全天事件需要） |
| `dtstart` | integer | 事件开始时间（Epoch 秒） |
| `dtstart_string` | string | 事件开始时间（ISO8601.2004 格式） |
| `dtend` | integer | 事件结束时间（Epoch 秒） |
| `dtend_string` | string | 事件结束时间（ISO8601.2004 格式） |
| `is_repeat_evt` | boolean | 是否为重复事件 |
| `repeat_setting` | object | 重复设置 |
| `participant` | object | 参与者信息 |
| `location_info` | object | 位置信息 |
| `attachments` | object | 附件信息 |
| `invite_status` | string | 当前邀请状态：`needs_action`、`accepted`、`declined`、`tentative` |

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
        "ical_uid": "abc123-def456-ghi789",
        "dav_etag": "\"123456789\"",
        "summary": "Team Meeting",
        "description": "Weekly team sync",
        "color": "#4285F4",
        "is_all_day": false,
        "tz_id": "Asia/Taipei",
        "dtstart": 1700000000,
        "dtstart_string": "20231115T100000",
        "dtend": 1700003600,
        "dtend_string": "20231115T110000",
        "is_repeat_evt": true,
        "repeat_setting": {
            "type": "week",
            "interval": 1,
            "weekday": ["Tuesday"],
            "week_start_day": "Monday"
        },
        "participant": {
            "type": "dsm",
            "status": "accepted",
            "role": "organizer",
            "user_name": "admin",
            "email": "admin@example.com",
            "is_real_email": true
        },
        "location_info": {
            "map_type": "google",
            "name": "Conference Room A",
            "address": "123 Main St, Taipei",
            "place_id": "ChIJabc123"
        },
        "invite_status": "accepted"
    }
}
```