## 修改受邀事件提醒

**PUT** `/api/Calendar/default/v1/event/invite-event`

修改受邀事件的提醒设置。

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
| `notify_setting` | array | ✓ | 通知设置 |

#### notify_setting 对象字段

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `action` | string | ✓ | ICS VALARM 组件中的 ACTION 属性 |
| `description` | string | ✓ | ICS VALARM 组件中的 DESCRIPTION 属性，默认值可为 "This is an event reminder" |
| `type` | string | ✓ | 提醒类型。<br>`duration`：相对时间提醒<br>`datetime`：绝对时间提醒 |
| `duration` | object | ✗ | 当 `type` 为 `duration` 时需要 |
| `duration.related` | string | ✓ | 相对于 `dtstart` 或 `dtend`。<br>`start`：相对于事件开始时间<br>`end`：相对于事件结束时间 |
| `duration.minutes` | integer | ✓ | 触发提醒的提前或延后分钟数，可为正数或负数 |
| `datetime` | object | ✗ | 当 `type` 为 `datetime` 时需要 |
| `datetime.utc_seconds` | integer | ✓ | UTC 时间中触发提醒的时间（秒） |
| `ical_extra_info` | object | ✗ | ICS 属性额外信息 |
| `ical_extra_info.key` | string | ✓ | ICS 中的属性键 |
| `ical_extra_info.value` | string | ✓ | ICS 中的属性值 |
| `ical_extra_info.parameters` | array | ✗ | ICS 属性参数列表 |

#### 认证

需要 API 密钥（cookie），使用登录获取的 sid。

#### 请求示例

```json
{
    "evt_id": 12345,
    "cal_id": "/admin/home/",
    "original_cal_id": "/admin/home/",
    "dav_etag": "\"123456789\"",
    "notify_setting": [
        {
            "action": "DISPLAY",
            "description": "Event reminder",
            "type": "duration",
            "duration": {
                "related": "start",
                "minutes": 30
            }
        }
    ]
}
```

#### cURL 命令示例

```bash
curl -X PUT "https://{nas_url}/api/Calendar/default/v1/event/invite-event" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: id={sid}" \
  -d '{"evt_id":12345,"cal_id":"/admin/home/","original_cal_id":"/admin/home/","dav_etag":"\"123456789\"","notify_setting":[{"action":"DISPLAY","description":"Event reminder","type":"duration","duration":{"related":"start","minutes":30}}]}'
```

---

### 响应

#### 成功响应 (200)

响应结构与 [获取事件] 接口返回的 data 对象一致，返回更新后的事件信息。

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
        "notify_setting": {
            "action": "DISPLAY",
            "description": "Event reminder",
            "type": "duration",
            "duration": {
                "related": "start",
                "minutes": 30
            }
        },
        "modify_time": 1700005000
    }
}
```

---

### 使用说明

- 此 API 用于修改受邀事件的提醒设置
- 仅影响当前用户的提醒设置，不影响事件本身或其他参与者
- 可用于添加、修改或删除事件提醒
- 设置 `notify_setting` 为空数组可移除所有提醒