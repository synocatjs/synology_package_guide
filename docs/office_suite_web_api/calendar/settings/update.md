## 修改用户设置

**PUT** `/api/Calendar/default/v1/setting`

修改用户的设置。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 描述 |
|------|------|------|
| `date_format` | enum | 日期格式。可选值：`Y-m-d`、`m/d/Y`、`d/m/Y`、`d.m.Y`、`d-m-Y` |
| `default_alarm` | object | 默认提醒设置 |
| `default_alarm.is_set` | boolean | 是否配置了提醒通知 |
| `default_alarm.minutes` | integer | 默认提醒通知时间（分钟） |
| `default_alarm_ad` | object | 默认活动提醒设置 |
| `default_alarm_ad.is_set` | boolean | 是否配置了提醒通知 |
| `default_alarm_ad.minutes` | integer | 默认提醒通知时间（分钟） |
| `default_cal` | string | 创建事件的默认日历 |
| `default_plugin_mode` | string | 默认选项卡面板类型。<br>`nav_panel`：日历列表<br>`todo_plugin`：任务列表 |
| `default_todo_view` | object | 默认任务列表视图设置 |
| `default_todo_view.type` | string | 默认任务列表类型。<br>`selected_date`：按日<br>`upcoming`：从当前日开始向前<br>`by_list`：基于选定的任务列表 |
| `default_todo_view.extra` | string | 仅当 `type` 为 `by_list` 时适用，指默认任务列表编号 |
| `default_view` | string | 默认日历视图。<br>`day`：按日<br>`week`：按周<br>`month`：按月<br>`list`：按日程 |
| `enable_keyboard_shortcut` | boolean | 是否启用键盘快捷键 |
| `last_used_map_type` | string | 默认地图源。<br>`none`：纯文本<br>`google`：Google 地图<br>`baidu`：百度地图 |
| `show_week_numbers` | boolean | 是否显示周数 |
| `time_format` | string | 时间显示格式。`12`（12小时制）或 `24`（24小时制） |
| `time_zone` | string | 默认事件时区 |
| `week_start_day` | integer | 一周开始日。<br>`0`：星期日<br>`1`：星期一<br>`6`：星期六 |

#### 认证

需要 API 密钥（cookie），使用登录获取的 sid。

#### 请求示例

```json
{
    "date_format": "m/d/Y",
    "default_alarm": {
        "is_set": false,
        "minutes": 0
    },
    "default_alarm_ad": {
        "is_set": false,
        "minutes": 0
    },
    "default_cal": "string",
    "default_plugin_mode": "string",
    "default_todo_view": {
        "type": "string",
        "extra": "string"
    },
    "default_view": "string",
    "enable_keyboard_shortcut": false,
    "last_used_map_type": "string",
    "show_week_numbers": false,
    "time_format": "string",
    "time_zone": "string",
    "week_start_day": 0
}
```

#### cURL 命令示例

```bash
curl -X PUT "https://{nas_url}/api/Calendar/default/v1/setting" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: id={sid}" \
  -d '{"date_format":"m/d/Y","default_alarm":{"is_set":false,"minutes":0},"default_alarm_ad":{"is_set":false,"minutes":0},"default_cal":"string","default_plugin_mode":"string","default_todo_view":{"type":"string","extra":"string"},"default_view":"string","enable_keyboard_shortcut":false,"last_used_map_type":"string","show_week_numbers":false,"time_format":"string","time_zone":"string","week_start_day":0}'
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data` | object | 更新后的用户设置对象，结构与 [获取用户设置] 接口返回的 data 对象一致 |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "date_format": "m/d/Y",
        "default_alarm": {
            "is_set": false,
            "minutes": 0
        },
        "default_alarm_ad": {
            "is_set": false,
            "minutes": 0
        },
        "default_cal": "string",
        "default_plugin_mode": "string",
        "default_todo_view": {
            "type": "string",
            "extra": "string"
        },
        "default_view": "string",
        "enable_keyboard_shortcut": false,
        "last_used_map_type": "string",
        "show_week_numbers": false,
        "time_format": "string",
        "time_zone": "string",
        "week_start_day": 0
    }
}
```