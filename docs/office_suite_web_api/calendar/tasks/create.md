## 创建任务

**POST** `/api/Calendar/default/v1/task`

创建一个新任务。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `summary` | string | ✓ | 任务标题 |
| `description` | string | ✓ | 任务描述 |
| `dtstart` | integer | ✗ | 任务开始时间（Epoch 秒） |
| `due` | integer | ✗ | 任务截止时间（Epoch 秒） |
| `has_start_time` | boolean | ✓ | 是否有开始时间 |
| `has_end_time` | boolean | ✓ | 是否有截止时间 |
| `is_all_day` | boolean | ✗ | 是否为全天任务 |
| `tzid` | string | ✗ | 时区信息，非全天任务需要，如 `Asia/Taipei` |
| `percent_complete` | integer | ✓ | 完成百分比，值为 0 或 100 |
| `original_cal_id` | string | ✓ | 任务所在日历的原始 ID，格式如 `/admin/home_todo/` 或共享日历 `/test1/xxxxx/` |
| `from_syno_app_url` | object | ✗ | 创建任务的 Synology 应用程序信息 |
| `notify_setting` | object | ✗ | 通知设置 |

#### 认证

需要 API 密钥（cookie），使用登录获取的 sid。

#### 请求示例（创建带开始和截止时间的任务）

```json
{
    "summary": "Complete project report",
    "description": "Finish the quarterly project report",
    "dtstart": 1699900000,
    "due": 1700000000,
    "has_start_time": true,
    "has_end_time": true,
    "is_all_day": false,
    "tzid": "Asia/Taipei",
    "percent_complete": 0,
    "original_cal_id": "/admin/home_todo/"
}
```

#### 请求示例（创建无开始时间的任务）

```json
{
    "summary": "Review team performance",
    "description": "Conduct team performance review",
    "due": 1700086400,
    "has_start_time": false,
    "has_end_time": true,
    "is_all_day": false,
    "tzid": "Asia/Taipei",
    "percent_complete": 0,
    "original_cal_id": "/admin/home_todo/"
}
```

#### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/Calendar/default/v1/task" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: id={sid}" \
  -d '{"summary":"Complete project report","description":"Finish the quarterly project report","dtstart":1699900000,"due":1700000000,"has_start_time":true,"has_end_time":true,"is_all_day":false,"tzid":"Asia/Taipei","percent_complete":0,"original_cal_id":"/admin/home_todo/"}'
```

---

### 响应

#### 成功响应 (200)

响应结构与 [获取任务] 接口返回的 data 对象一致，返回新创建的任务信息。

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data` | object | 新创建的任务详细信息 |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "evt_id": 1001,
        "summary": "Complete project report",
        "description": "Finish the quarterly project report",
        "create_time": 1699900000,
        "modify_time": 1699900000,
        "dtstart": 1699900000,
        "dtstart_string": "20231114T090000",
        "due": 1700000000,
        "due_string": "20231115T170000",
        "is_all_day": false,
        "tzid": "Asia/Taipei",
        "has_start_time": true,
        "has_end_time": true,
        "percent_complete": 0,
        "priority_order": 0,
        "ical_uid": "task-abc123",
        "dav_etag": "\"123456789\"",
        "owner_id": 1001,
        "owner_name": "admin",
        "cal_id": "/admin/home_todo/",
        "original_cal_id": "/admin/home_todo/",
        "last_modify_user": "admin",
        "evt_cal": "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Synology Inc.//Synology Calendar//EN\nBEGIN:VTODO\nUID:task-abc123\nSUMMARY:Complete project report\nDESCRIPTION:Finish the quarterly project report\nDTSTART:20231114T090000\nDUE:20231115T170000\nSTATUS:NEEDS-ACTION\nEND:VTODO\nEND:VCALENDAR",
        "notify_setting": [],
        "from_syno_app_url": {
            "app": "Calendar",
            "msg_id": ""
        }
    }
}
```