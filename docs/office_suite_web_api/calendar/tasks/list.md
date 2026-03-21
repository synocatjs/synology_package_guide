## 获取任务列表

**POST** `/api/Calendar/default/v1/task/list`

根据指定条件获取任务列表。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `cal_id_list` | array | ✗ | 任务所属的日历 ID 列表，格式如 `/admin/home_todo/` |
| `due` | integer | ✗ | 截止日期的 Unix 时间戳（秒） |
| `filter_complete` | string | ✗ | 任务完成状态。<br>`yes`：仅已完成<br>`no`：仅未完成<br>`all`：全部 |
| `filter_due` | string | ✗ | 任务截止值的存在状态。<br>`yes`：必须有截止值<br>`no`：必须无截止值<br>`all`：全部 |
| `limit` | integer | ✗ | 要列出的任务数量 |

#### 认证

需要 API 密钥（cookie），使用登录获取的 sid。

#### 请求示例

```json
{
    "cal_id_list": ["/admin/home_todo/"],
    "due": 1700000000,
    "filter_complete": "no",
    "filter_due": "yes",
    "limit": 50
}
```

#### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/Calendar/default/v1/task/list" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: id={sid}" \
  -d '{"cal_id_list":["/admin/home_todo/"],"due":1700000000,"filter_complete":"no","filter_due":"yes","limit":50}'
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data.list` | array | 任务列表数组 |

#### data.list 数组元素字段

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
        "list": [
            {
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
                "last_modify_user": "admin"
            },
            {
                "evt_id": 1002,
                "summary": "Review team performance",
                "description": "Conduct team performance review",
                "create_time": 1699950000,
                "modify_time": 1699950000,
                "due": 1700086400,
                "due_string": "20231116T170000",
                "is_all_day": false,
                "tzid": "Asia/Taipei",
                "has_start_time": false,
                "has_end_time": true,
                "percent_complete": 0,
                "priority_order": 2,
                "ical_uid": "task-def456",
                "dav_etag": "\"987654321\"",
                "owner_id": 1001,
                "owner_name": "admin",
                "cal_id": "/admin/home_todo/",
                "original_cal_id": "/admin/home_todo/"
            }
        ]
    }
}
```