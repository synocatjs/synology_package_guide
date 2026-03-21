## 创建新日历

**POST** `/api/Calendar/default/v1/cal`

创建一个新的日历。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `cal_displayname` | string | ✓ | 日历显示名称 |
| `cal_description` | string | ✓ | 日历描述 |
| `cal_color` | string | ✓ | 日历颜色，格式如 `#FFFFFF` |
| `is_hidden_in_cal` | boolean | ✓ | 日历中的所有事件是否在日历视图中隐藏 |
| `is_hidden_in_list` | boolean | ✓ | 日历是否在日历列表中隐藏 |
| `notify_alarm_by_browser` | boolean | ✓ | 是否通过浏览器通知提醒 |
| `notify_alarm_by_mail` | boolean | ✓ | 是否通过邮件通知提醒 |
| `notify_evt_by_browser` | boolean | ✓ | 是否通过浏览器通知事件修改 |
| `notify_evt_by_mail` | boolean | ✓ | 是否通过邮件通知事件修改 |
| `notify_import_cal_by_browser` | boolean | ✓ | 是否通过浏览器通知日历导入结果 |
| `notify_import_cal_by_mail` | boolean | ✓ | 是否通过邮件通知日历导入结果 |
| `cal_type` | enum | ✓ | 日历类型。<br>`event`：事件日历<br>`todo`：任务日历 |

#### 认证

需要 API 密钥（cookie），使用登录获取的 sid。

#### 请求示例（创建事件日历）

```json
{
    "cal_displayname": "Work Calendar",
    "cal_description": "Calendar for work-related events",
    "cal_color": "#4285F4",
    "is_hidden_in_cal": false,
    "is_hidden_in_list": false,
    "notify_alarm_by_browser": true,
    "notify_alarm_by_mail": true,
    "notify_evt_by_browser": true,
    "notify_evt_by_mail": false,
    "notify_import_cal_by_browser": true,
    "notify_import_cal_by_mail": false,
    "cal_type": "event"
}
```

#### 请求示例（创建任务日历）

```json
{
    "cal_displayname": "Task List",
    "cal_description": "Calendar for tasks",
    "cal_color": "#34A853",
    "is_hidden_in_cal": false,
    "is_hidden_in_list": false,
    "notify_alarm_by_browser": true,
    "notify_alarm_by_mail": false,
    "notify_evt_by_browser": true,
    "notify_evt_by_mail": false,
    "notify_import_cal_by_browser": true,
    "notify_import_cal_by_mail": false,
    "cal_type": "todo"
}
```

#### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/Calendar/default/v1/cal" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: id={sid}" \
  -d '{"cal_displayname":"Work Calendar","cal_description":"Calendar for work-related events","cal_color":"#4285F4","is_hidden_in_cal":false,"is_hidden_in_list":false,"notify_alarm_by_browser":true,"notify_alarm_by_mail":true,"notify_evt_by_browser":true,"notify_evt_by_mail":false,"notify_import_cal_by_browser":true,"notify_import_cal_by_mail":false,"cal_type":"event"}'
```

---

### 响应

#### 成功响应 (200)

响应结构与 [获取日历信息] 接口返回的 data 对象一致，返回新创建的日历信息。

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data` | object | 新创建的日历信息 |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "cal_id": "/admin/work/",
        "original_cal_id": "/admin/work/",
        "original_ug_name": "admin",
        "original_user_no": 1001,
        "cal_displayname": "Work Calendar",
        "cal_description": "Calendar for work-related events",
        "cal_color": "#4285F4",
        "cal_privilege": "RW",
        "cal_public_sharing_id": "",
        "default_calendar": false,
        "is_hidden_in_cal": false,
        "is_hidden_in_list": false,
        "notify_alarm_by_browser": true,
        "notify_alarm_by_mail": true,
        "notify_evt_by_browser": true,
        "notify_evt_by_mail": false,
        "notify_import_cal_by_browser": true,
        "notify_import_cal_by_mail": false
    }
}
```