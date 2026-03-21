## 获取事件列表

**POST** `/api/Calendar/default/v1/event/list`

根据指定条件获取事件列表。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `cal_id_list` | array | ✗ | 日历 ID 列表，格式如 `/admin/home/` 或共享日历 `/admin/test1--xxxxx/` |
| `start` | integer | ✗ | 事件开始时间（Epoch 秒） |
| `end` | integer | ✗ | 事件结束时间（Epoch 秒） |
| `evt_color_list` | array | ✗ | 要列出的事件颜色列表，RGB 颜色代码格式，如 `["#112233", "#445566"]` |
| `keyword` | string | ✗ | 搜索字符串，搜索事件标题、描述和位置 |
| `limit` | integer | ✗ | 事件数量 |
| `filter_starred` | string | ✗ | 是否可见。<br>`yes`：可见<br>`no`：不可见<br>`all`：所有事件 |
| `filter_own` | string | ✗ | 是否为事件所有者创建。<br>`yes`：事件所有者创建<br>`no`：非事件所有者创建<br>`all`：所有事件 |
| `filter_invited` | string | ✗ | 是否为邀请。<br>`yes`：是邀请<br>`no`：非邀请<br>`all`：所有事件 |

#### 认证

需要 API 密钥（cookie），使用登录获取的 sid。

#### 请求示例

```json
{
    "cal_id_list": ["/admin/home/"],
    "start": 1699900000,
    "end": 1702500000,
    "evt_color_list": ["#4285F4", "#EA4335"],
    "keyword": "meeting",
    "limit": 50,
    "filter_starred": "all",
    "filter_own": "all",
    "filter_invited": "all"
}
```

#### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/Calendar/default/v1/event/list" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: id={sid}" \
  -d '{"cal_id_list":["/admin/home/"],"start":1699900000,"end":1702500000,"evt_color_list":["#4285F4","#EA4335"],"keyword":"meeting","limit":50,"filter_starred":"all","filter_own":"all","filter_invited":"all"}'
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data` | array | 事件对象数组，每个事件对象结构与 [获取事件] 接口返回的 data 对象一致 |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": [
        {
            "evt_id": 12345,
            "cal_id": "/admin/home/",
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
            "location_info": {
                "map_type": "google",
                "name": "Conference Room A",
                "address": "123 Main St, Taipei"
            },
            "participant": {
                "type": "dsm",
                "status": "accepted",
                "role": "organizer",
                "user_name": "admin",
                "email": "admin@example.com",
                "is_real_email": true
            }
        },
        {
            "evt_id": 12346,
            "cal_id": "/admin/home/",
            "summary": "Project Review",
            "description": "Monthly project review",
            "color": "#EA4335",
            "is_all_day": false,
            "tz_id": "Asia/Taipei",
            "dtstart": 1700086400,
            "dtstart_string": "20231116T140000",
            "dtend": 1700090000,
            "dtend_string": "20231116T150000",
            "is_repeat_evt": false,
            "location_info": {
                "map_type": "google",
                "name": "Conference Room B",
                "address": "456 Oak St, Taipei"
            }
        }
    ]
}
```