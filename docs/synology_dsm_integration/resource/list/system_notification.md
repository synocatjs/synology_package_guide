## System Notification

### 描述

在套件启动/停止期间合并/取消合并套件通知字符串。

#### Acquire()（获取资源）
- 合并套件通知字符串，然后重建字符串索引

#### Release()（释放资源）
- 取消合并套件通知字符串，然后重建字符串索引

---

### 提供者

DSM

---

### 时机

`FROM_STARTUP_TO_HALT`

---

### 环境变量

无

---

### 可更新

否

---

### 语法

```json
"sysnotify": {
    "texts_dir": "<related_path_from_target_to_your_app_config_texts_dir>",
    "app_privileges": [
        {
            "app_id": "<app id in app config>",
            "categories": ["<notification category in your notification string>"]
        }
    ]
}
```

| 成员 | 自版本 | 描述 |
|------|--------|------|
| `texts_dir` | 6.0.1 | 文本目录的相对路径 |
| `app_privileges` | 7.0-40343 | 类别与应用程序 ID 的关联关系 |
| `app_id` | 7.0-40343 | 应用程序 ID |
| `categories` | 7.0-40343 | 通知类别列表 |

---

### 示例

#### 示例 1：将指定应用权限配置应用于所有通知类别

```json
"sysnotify": {
    "texts_dir": "ui/texts",
    "app_privileges": [{
        "app_id": "com.company.App1"
    }]
}
```

#### 示例 2：将指定应用权限配置应用于部分通知类别

```json
"sysnotify": {
    "texts_dir": "ui/texts",
    "app_privileges": [{
        "app_id": "com.company.App1",
        "categories": ["Admin Area"]
    }]
}
```

#### 示例 3：不应用任何权限配置

```json
"sysnotify": {
    "texts_dir": "ui/texts",
    "app_privileges": [{
        "categories": ["Guest Area"]
    }]
}
```

---

### 通知字符串格式

```
Category: (Required) the category in control panel > notification > rules > categories
Level: (Required) one of the value in NOTIFICATION_ERROR / NOTIFICATION_WARN / NOTIFICATION_INFO
Title: (Optional) the event name in control panel > notification > rules > event
Desktop: (Required) the content of the notification
```

---

### 通知示例

#### 系统通知示例

```
Category: Performance Alarm
Level: NOTIFICATION_ERROR
Title: System CPU utilization exceeds the threshold
Desktop: System CPU utilization exceeds the threshold.

The system CPU utilization has reached %VALUE%%, which exceeds the pre-defined value of %THRESHOLD%%.

From %HOSTNAME%
```

#### 仅桌面通知示例

```
Category: File Station
Level: NOTIFICATION_INFO
Desktop: Copied %FILE% successfully.
```

---

### 通知级别与目标

| 级别 | 桌面 | 邮件 | 短信 | 移动端 | CMS |
|------|------|------|------|--------|-----|
| **NOTIFICATION_ERROR** | ✓ | ✓ | ✓ | ✓ | ✓ |
| **NOTIFICATION_WARN** | ✓ | ✓ | ✗ | ✓ | ✓ |
| **NOTIFICATION_INFO** | ✓ | ✗ | ✗ | ✗ | ✓ |

---

### 通知目标覆盖

邮件字符串可以指定通知目标，其优先级高于类别：

```
Category: Performance Alarm
Level: NOTIFICATION_WARN
Desktop: there is a performance alram
Target: desktop,mail,sms,mobile,cms

The system has detected a performance issue
```

---

### 通知变量

变量仅可在 `Desktop` 中使用：

| 变量 | 示例值 |
|------|--------|
| `%COMPANY_NAME%` | Synology DiskStation |
| `%HOSTNAME%` | Synology DiskStation |
| `%IP_ADDR%` | 192.168.1.2 |
| `%HTTP_URL%` | http://192.168.1.2:5000 |
| `%DATE%` | 2022-1-1 |
| `%TIME%` | 09:00 |
| `%OSNAME%` | DSM |

---

### 发送通知命令

#### synonotify 命令

用于系统级通知：

```bash
/usr/syno/bin/synonotify <mail_string_key> <mail_string_custom_variables>
```

#### synodsmnotify 命令

用于用户级通知：

```bash
/usr/syno/bin/synodsmnotify <user/group> <mail_string_key> <mail_string_custom_variables>
```

#### 示例

```bash
/usr/syno/bin/synonotify CpuFanResume '{"%FANID%": 1,"DESKTOP_NOTIFY_TITLE": "mainmenu:leaf_packagemanage", "DESKTOP_NOTIFY_CLASSNAME": "SYNO.SDS.App.FileStation3.Instance"}'
```

---

### 使用场景

- 套件状态变更通知
- 系统资源告警
- 任务完成通知
- 用户操作确认
- 错误信息提示

---

### 注意事项

- 通知字符串使用套件的国际化文本目录
- 类别名称必须在控制面板 > 通知 > 规则中定义
- 变量在发送时会被替换为实际值
- 通知级别决定了通知的发送渠道
- `app_privileges` 用于将通知与特定应用程序权限关联