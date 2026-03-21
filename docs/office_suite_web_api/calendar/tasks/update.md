## 更新任务

**PUT** `/api/Calendar/default/v1/task`

更新指定任务的详细信息。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `description` | string | ✓ | 任务描述 |
| `dtstart` | integer | ✗ | 任务开始时间（Epoch 秒） |
| `due` | integer | ✗ | 任务截止时间（Epoch 秒） |
| `has_start_time` | boolean | ✓ | 是否有开始时间 |
| `has_end_time` | boolean | ✓ | 是否有截止时间 |
| `is_all_day` | boolean | ✗ | 是否为全天任务 |
| `tzid` | string | ✗ | 时区信息，非全天任务需要，如 `Asia/Taipei` |
| `summary` | string | ✓ | 任务标题 |
| `percent_complete` | integer | ✓ | 完成百分比，值为 0 或 100 |
| `priority_order` | integer | ✓ | 任务优先级 |
| `dav_etag` | string | ✓ | 任务时间戳。修改时若此值与服务器记录值不同，表示已被他人修改 |
| `original_cal_id` | string | ✓ | 任务所在日历的原始 ID，格式如 `/admin/home/` 或共享日历 `/test1/xxxxx/` |
| `from_syno_app_url` | object | ✗ | 创建任务的 Synology 应用程序信息 |
| `notify_setting` | object | ✗ | 通知设置 |

#### 认证

需要 API 密钥（cookie），使用登录获取的 sid。

#### 请求示例

```json
{
    "evt_id": 1001,
    "summary": "Complete project report",
    "description": "Finish the quarterly project report - updated",
    "dtstart": 1699900000,
    "due": 1700086400,
    "has_start_time": true,
    "has_end_time": true,
    "is_all_day": false,
    "tzid": "Asia/Taipei",
    "percent_complete": 50,
    "priority_order": 1,
    "dav_etag": "\"123456789\"",
    "original_cal_id": "/admin/home_todo/"
}
```

#### cURL 命令示例

```bash
curl -X PUT "https://{nas_url}/api/Calendar/default/v1/task" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: id={sid}" \
  -d '{"evt_id":1001,"summary":"Complete project report","description":"Finish the quarterly project report - updated","dtstart":1699900000,"due":1700086400,"has_start_time":true,"has_end_time":true,"is_all_day":false,"tzid":"Asia/Taipei","percent_complete":50,"priority_order":1,"dav_etag":"\"123456789\"","original_cal_id":"/admin/home_todo/"}'
```

---

### 响应

#### 成功响应 (200)

响应结构与 [获取任务] 接口返回的 data 对象一致，返回更新后的任务信息。

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data` | object | 更新后的任务详细信息 |

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
        "description": "Finish the quarterly project report - updated",
        "create_time": 1699900000,
        "modify_time": 1700000000,
        "dtstart": 1699900000,
        "dtstart_string": "20231114T090000",
        "due": 1700086400,
        "due_string": "20231116T170000",
        "is_all_day": false,
        "tzid": "Asia/Taipei",
        "has_start_time": true,
        "has_end_time": true,
        "percent_complete": 50,
        "priority_order": 1,
        "ical_uid": "task-abc123",
        "dav_etag": "\"987654321\"",
        "owner_id": 1001,
        "owner_name": "admin",
        "cal_id": "/admin/home_todo/",
        "original_cal_id": "/admin/home_todo/",
        "last_modify_user": "admin",
        "modify_time": 1700000000
    }
}
```