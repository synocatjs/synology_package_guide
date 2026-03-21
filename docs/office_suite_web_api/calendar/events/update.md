## 修改事件

**PUT** `/api/Calendar/default/v1/event`

此方法配置主事件，成功时返回的事件信息属于主事件。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `evt_id` | integer | ✓ | 事件 ID |
| `cal_id` | string | ✓ | 日历 ID |
| `original_cal_id` | string | ✓ | 日历所有者 ID，若日历未共享则与 `cal_id` 相同 |
| `dav_etag` | string | ✓ | 事件时间戳。修改时若此值与服务器记录值不同，表示已被他人修改 |
| `summary` | string | ✓ | 事件标题 |
| `is_all_day` | boolean | ✓ | 是否为全天事件 |
| `tz_id` | string | ✓ | 时区 ID（非全天事件需要），如 `Asia/Taipei` |
| `dtstart` | integer | ✓ | 事件开始时间（Epoch 秒） |
| `dtend` | integer | ✓ | 事件结束时间（Epoch 秒） |
| `is_repeat_evt` | boolean | ✓ | 是否为重复事件 |
| `repeat_setting` | array | ✗ | 重复事件设置（当 `is_repeat_evt` 为 `true` 时需要） |
| `color` | string | ✓ | 事件颜色，RGB 颜色代码如 `#112233`，留空使用日历默认颜色 |
| `notify_setting` | array | ✓ | 通知设置 |
| `description` | string | ✓ | 事件描述 |
| `participant` | array | ✓ | 参与者列表 |
| `location_info` | object | ✓ | 位置信息 |
| `attachments` | array | ✓ | 附件列表 |
| `exdate` | string | ✗ | 从重复事件中删除某一天，格式：全天事件 `YYYYMMDD`，非全天事件 `YYYYMMDDThhmmss` |

#### 认证

需要 API 密钥（cookie），使用登录获取的 sid。

#### 请求示例

```json
{
    "evt_id": 12345,
    "cal_id": "/admin/home/",
    "original_cal_id": "/admin/home/",
    "dav_etag": "\"123456789\"",
    "summary": "Updated Team Meeting",
    "is_all_day": false,
    "tz_id": "Asia/Taipei",
    "dtstart": 1700000000,
    "dtend": 1700003600,
    "is_repeat_evt": true,
    "repeat_setting": [
        {
            "type": "week",
            "interval": 1,
            "weekday": ["Tuesday"],
            "week_start_day": "Monday",
            "end": {
                "type": "date",
                "date": 1702684800
            }
        }
    ],
    "color": "#4285F4",
    "notify_setting": [
        {
            "action": "DISPLAY",
            "description": "Event reminder",
            "type": "duration",
            "duration": {
                "related": "start",
                "minutes": 10
            }
        }
    ],
    "description": "Weekly team sync - updated",
    "participant": [
        {
            "type": "dsm",
            "status": "accepted",
            "role": "organizer",
            "user_name": "admin",
            "email": "admin@example.com",
            "is_real_email": true
        }
    ],
    "location_info": {
        "map_type": "google",
        "name": "Conference Room B",
        "address": "456 Oak St, Taipei",
        "place_id": "ChIJdef456"
    },
    "attachments": []
}
```

#### cURL 命令示例

```bash
curl -X PUT "https://{nas_url}/api/Calendar/default/v1/event" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: id={sid}" \
  -d '{"evt_id":12345,"cal_id":"/admin/home/","original_cal_id":"/admin/home/","dav_etag":"\"123456789\"","summary":"Updated Team Meeting","is_all_day":false,"tz_id":"Asia/Taipei","dtstart":1700000000,"dtend":1700003600,"is_repeat_evt":true,"repeat_setting":[{"type":"week","interval":1,"weekday":["Tuesday"],"week_start_day":"Monday","end":{"type":"date","date":1702684800}}],"color":"#4285F4","notify_setting":[{"action":"DISPLAY","description":"Event reminder","type":"duration","duration":{"related":"start","minutes":10}}],"description":"Weekly team sync - updated","participant":[{"type":"dsm","status":"accepted","role":"organizer","user_name":"admin","email":"admin@example.com","is_real_email":true}],"location_info":{"map_type":"google","name":"Conference Room B","address":"456 Oak St, Taipei","place_id":"ChIJdef456"},"attachments":[]}'
```

---

### 响应

#### 成功响应 (200)

响应结构与 [获取事件] 接口返回的 data 对象一致，返回更新后的主事件信息。

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "evt_id": 12345,
        "cal_id": "/admin/home/",
        "summary": "Updated Team Meeting",
        "dtstart": 1700000000,
        "dtend": 1700003600,
        "modify_time": 1700005000,
        "..."
    }
}
```