## 获取日历列表

**GET** `/api/Calendar/default/v1/cal/list`

获取指定类型的日历列表。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `cal_type` | enum | ✓ | 日历类型。<br>`event`：事件日历<br>`todo`：任务日历<br>`all`：全部日历 |

#### 认证

需要 API 密钥（cookie），使用登录获取的 sid。

#### cURL 命令示例（获取事件日历）

```bash
curl -X GET "https://{nas_url}/api/Calendar/default/v1/cal/list?cal_type=event" \
  -H "accept: application/json" \
  -H "cookie: id={sid}"
```

获取任务日历：

```bash
curl -X GET "https://{nas_url}/api/Calendar/default/v1/cal/list?cal_type=todo" \
  -H "accept: application/json" \
  -H "cookie: id={sid}"
```

获取全部日历：

```bash
curl -X GET "https://{nas_url}/api/Calendar/default/v1/cal/list?cal_type=all" \
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
| `data.list` | array | 日历信息列表 |

#### data.list 数组元素字段

| 字段 | 类型 | 描述 |
|------|------|------|
| `cal_id` | string | 日历 ID |
| `original_cal_id` | string | 原始日历 ID |
| `original_ug_name` | string | 日历所有者名称 |
| `original_user_no` | integer | 日历所有者的用户编号 |
| `cal_displayname` | string | 日历显示名称 |
| `cal_description` | string | 日历描述 |
| `cal_color` | string | 日历颜色，格式如 `#FFFFFF` |
| `cal_privilege` | enum | 日历权限。<br>`RO`：只读<br>`RW`：读写 |
| `cal_public_sharing_id` | string | 日历公开共享链接的 ID |
| `default_calendar` | boolean | 是否为默认日历 |
| `is_hidden_in_cal` | boolean | 日历中的所有事件是否在日历视图中隐藏 |
| `is_hidden_in_list` | boolean | 日历是否在日历列表中隐藏 |
| `notify_alarm_by_browser` | boolean | 是否通过浏览器通知提醒 |
| `notify_alarm_by_mail` | boolean | 是否通过邮件通知提醒 |
| `notify_evt_by_browser` | boolean | 是否通过浏览器通知事件修改 |
| `notify_evt_by_mail` | boolean | 是否通过邮件通知事件修改 |
| `notify_import_cal_by_browser` | boolean | 是否通过浏览器通知日历导入结果 |
| `notify_import_cal_by_mail` | boolean | 是否通过邮件通知日历导入结果 |

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
                "cal_id": "/admin/home/",
                "original_cal_id": "/admin/home/",
                "original_ug_name": "admin",
                "original_user_no": 1001,
                "cal_displayname": "My Calendar",
                "cal_description": "Personal calendar",
                "cal_color": "#4285F4",
                "cal_privilege": "RW",
                "cal_public_sharing_id": "",
                "default_calendar": true,
                "is_hidden_in_cal": false,
                "is_hidden_in_list": false,
                "notify_alarm_by_browser": true,
                "notify_alarm_by_mail": true,
                "notify_evt_by_browser": true,
                "notify_evt_by_mail": false,
                "notify_import_cal_by_browser": true,
                "notify_import_cal_by_mail": false
            },
            {
                "cal_id": "/admin/work/",
                "original_cal_id": "/admin/work/",
                "original_ug_name": "admin",
                "original_user_no": 1001,
                "cal_displayname": "Work Calendar",
                "cal_description": "Work-related events",
                "cal_color": "#EA4335",
                "cal_privilege": "RW",
                "cal_public_sharing_id": "",
                "default_calendar": false,
                "is_hidden_in_cal": false,
                "is_hidden_in_list": false,
                "notify_alarm_by_browser": true,
                "notify_alarm_by_mail": true,
                "notify_evt_by_browser": true,
                "notify_evt_by_mail": true,
                "notify_import_cal_by_browser": true,
                "notify_import_cal_by_mail": false
            }
        ]
    }
}
```