## 创建新事件

**POST** `/api/Calendar/default/v1/event`

创建一个新的事件。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `cal_id` | string | ✓ | 日历 ID |
| `original_cal_id` | string | ✓ | 日历所有者 ID，若日历未共享则与 `cal_id` 相同 |
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
| `from_syno_app_url` | array | ✗ | 创建事件的 Synology 应用程序信息，如 MailPlus |

#### 认证

需要 API 密钥（cookie），使用登录获取的 sid。

#### 请求示例

```json
{
    "cal_id": "/admin/home/",
    "original_cal_id": "/admin/home/",
    "summary": "Team Meeting",
    "is_all_day": false,
    "tz_id": "Asia/Taipei",
    "dtstart": 1700000000,
    "dtend": 1700003600,
    "is_repeat_evt": false,
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
    "description": "Weekly team sync meeting",
    "participant": [
        {
            "type": "dsm",
            "status": "needs_action",
            "role": "organizer",
            "user_name": "admin",
            "email": "admin@example.com",
            "is_real_email": true
        },
        {
            "type": "dsm",
            "status": "needs_action",
            "role": "attendee",
            "user_name": "john_doe",
            "email": "john@example.com",
            "is_real_email": true
        }
    ],
    "location_info": {
        "map_type": "google",
        "name": "Conference Room A",
        "address": "123 Main St, Taipei",
        "place_id": "ChIJabc123",
        "gps": {
            "lat": 25.0330,
            "lng": 121.5654
        }
    }
}
```

#### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/Calendar/default/v1/event" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: id={sid}" \
  -d '{"cal_id":"/admin/home/","original_cal_id":"/admin/home/","summary":"Team Meeting","is_all_day":false,"tz_id":"Asia/Taipei","dtstart":1700000000,"dtend":1700003600,"is_repeat_evt":false,"color":"#4285F4","notify_setting":[{"action":"DISPLAY","description":"Event reminder","type":"duration","duration":{"related":"start","minutes":10}}],"description":"Weekly team sync meeting","participant":[{"type":"dsm","status":"needs_action","role":"organizer","user_name":"admin","email":"admin@example.com","is_real_email":true},{"type":"dsm","status":"needs_action","role":"attendee","user_name":"john_doe","email":"john@example.com","is_real_email":true}],"location_info":{"map_type":"google","name":"Conference Room A","address":"123 Main St, Taipei","place_id":"ChIJabc123","gps":{"lat":25.0330,"lng":121.5654}}}'
```

---

### 响应

#### 成功响应 (200)

响应结构与 [获取事件] 接口返回的 data 对象一致，返回新创建的事件信息。

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data` | object | 新创建的事件详细信息 |

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
        "description": "Weekly team sync meeting",
        "color": "#4285F4",
        "is_all_day": false,
        "tz_id": "Asia/Taipei",
        "dtstart": 1700000000,
        "dtstart_string": "20231115T100000",
        "dtend": 1700003600,
        "dtend_string": "20231115T110000",
        "create_time": 1699900000,
        "modify_time": 1699900000,
        "is_repeat_evt": false,
        "location_info": {
            "map_type": "google",
            "name": "Conference Room A",
            "address": "123 Main St, Taipei",
            "place_id": "ChIJabc123",
            "gps": {
                "lat": 25.0330,
                "lng": 121.5654
            }
        }
    }
}
```