## 修改子事件

**PUT** `/api/Calendar/default/v1/event/subevent`

修改重复事件中的单个子事件。成功时返回的信息属于子事件。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `evt_id` | integer | ✓ | 主事件 ID |
| `recurrence_id` | string | ✓ | 子事件的日期和时间，格式：全天事件 `YYYYMMDD`，非全天事件 `YYYYMMDDThhmmss` |
| `cal_id` | string | ✓ | 日历 ID |
| `original_cal_id` | string | ✓ | 日历所有者 ID，若日历未共享则与 `cal_id` 相同 |
| `dav_etag` | string | ✓ | 事件时间戳。修改时若此值与服务器记录值不同，表示已被他人修改 |
| `summary` | string | ✓ | 事件标题 |
| `is_all_day` | boolean | ✓ | 是否为全天事件 |
| `tz_id` | string | ✓ | 时区 ID（非全天事件需要），如 `Asia/Taipei` |
| `dtstart` | integer | ✓ | 事件开始时间（Epoch 秒） |
| `dtend` | integer | ✓ | 事件结束时间（Epoch 秒） |
| `color` | string | ✓ | 事件颜色，RGB 颜色代码如 `#112233`，留空使用日历默认颜色 |
| `notify_setting` | array | ✓ | 通知设置 |
| `description` | string | ✓ | 事件描述 |
| `location_info` | object | ✗ | 位置信息 |
| `attachments` | array | ✓ | 附件列表 |

#### 认证

需要 API 密钥（cookie），使用登录获取的 sid。

#### 请求示例

```json
{
    "evt_id": 12345,
    "recurrence_id": "20231122T100000",
    "cal_id": "/admin/home/",
    "original_cal_id": "/admin/home/",
    "dav_etag": "\"123456789\"",
    "summary": "Rescheduled Team Meeting",
    "is_all_day": false,
    "tz_id": "Asia/Taipei",
    "dtstart": 1700640000,
    "dtend": 1700643600,
    "color": "#4285F4",
    "notify_setting": [
        {
            "action": "DISPLAY",
            "description": "Event reminder",
            "type": "duration",
            "duration": {
                "related": "start",
                "minutes": 15
            }
        }
    ],
    "description": "Rescheduled weekly team sync",
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
curl -X PUT "https://{nas_url}/api/Calendar/default/v1/event/subevent" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: id={sid}" \
  -d '{"evt_id":12345,"recurrence_id":"20231122T100000","cal_id":"/admin/home/","original_cal_id":"/admin/home/","dav_etag":"\"123456789\"","summary":"Rescheduled Team Meeting","is_all_day":false,"tz_id":"Asia/Taipei","dtstart":1700640000,"dtend":1700643600,"color":"#4285F4","notify_setting":[{"action":"DISPLAY","description":"Event reminder","type":"duration","duration":{"related":"start","minutes":15}}],"description":"Rescheduled weekly team sync","location_info":{"map_type":"google","name":"Conference Room B","address":"456 Oak St, Taipei","place_id":"ChIJdef456"},"attachments":[]}'
```

---

### 响应

#### 成功响应 (200)

响应结构与 [获取事件] 接口返回的 data 对象一致，返回修改后的子事件信息。

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data` | object | 修改后的子事件详细信息 |
| `data.recurrence_id` | string | 子事件的日期时间标识 |

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
        "summary": "Rescheduled Team Meeting",
        "recurrence_id": "20231122T100000",
        "dtstart": 1700640000,
        "dtstart_string": "20231122T100000",
        "dtend": 1700643600,
        "dtend_string": "20231122T110000",
        "modify_time": 1700005000
    }
}
```

---

### 使用说明

- 此 API 用于修改重复事件中的单个实例
- 修改后，该子事件将独立于主事件系列
- 其他未修改的子事件仍遵循主事件的重复规则
- `recurrence_id` 格式必须与主事件的重复规则一致