## 获取任务

**GET** `/api/Calendar/default/v1/task`

获取指定任务的详细信息。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `evt_id` | integer | ✓ | 任务 ID |

#### 认证

需要 API 密钥（cookie），使用登录获取的 sid。

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/Calendar/default/v1/task?evt_id=1001" \
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
| `data` | object | 任务详细信息 |

#### data 对象字段

| 字段 | 类型 | 描述 |
|------|------|------|
| `evt_id` | integer | 任务 ID |
| `summary` | string | 任务标题 |
| `description` | string | 任务描述 |
| `create_time` | integer | 任务创建时间（Epoch 秒） |
| `modify_time` | integer | 任务修改时间（Epoch 秒） |
| `dtstart` | integer | 任务开始时间（Epoch 秒） |
| `dtstart_string` | string | 任务开始时间，格式：全天任务 `YYYYMMDD`，非全天任务 `YYYYMMDDThhmmss` |
| `due` | integer | 任务截止时间（Epoch 秒） |
| `due_string` | string | 任务截止时间，格式：全天任务 `YYYYMMDD`，非全天任务 `YYYYMMDDThhmmss` |
| `is_all_day` | boolean | 是否为全天任务 |
| `tzid` | string | 时区信息，非全天任务需要，如 `Asia/Taipei` |
| `has_start_time` | boolean | 是否有开始时间 |
| `has_end_time` | boolean | 是否有截止时间 |
| `percent_complete` | integer | 完成百分比，值为 0 或 100 |
| `priority_order` | integer | 任务优先级 |
| `ical_uid` | string | 任务在 ICS 中的 UUID |
| `dav_etag` | string | 任务时间戳，修改时若与服务器记录值不同，表示已被他人修改 |
| `owner_id` | integer | 任务所有者 ID |
| `owner_name` | string | 任务所有者名称 |
| `cal_id` | string | 任务所在日历 ID |
| `original_cal_id` | string | 任务所在日历的原始 ID |
| `last_modify_user` | string | 最后修改任务的用户 |
| `evt_cal` | string | 任务的完整 ICS 内容 |
| `notify_setting` | object | 通知设置 |
| `from_syno_app_url` | object | 创建任务的 Synology 应用程序信息 |

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
        "priority_order": 1,
        "ical_uid": "task-abc123",
        "dav_etag": "\"123456789\"",
        "owner_id": 1001,
        "owner_name": "admin",
        "cal_id": "/admin/home_todo/",
        "original_cal_id": "/admin/home_todo/",
        "last_modify_user": "admin",
        "evt_cal": "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Synology Inc.//Synology Calendar//EN\nBEGIN:VTODO\nUID:task-abc123\nSUMMARY:Complete project report\nDESCRIPTION:Finish the quarterly project report\nDTSTART:20231114T090000\nDUE:20231115T170000\nPRIORITY:1\nSTATUS:NEEDS-ACTION\nEND:VTODO\nEND:VCALENDAR",
        "notify_setting": [],
        "from_syno_app_url": {
            "app": "Calendar",
            "msg_id": ""
        }
    }
}
```