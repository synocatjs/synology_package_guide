## 导出 ICS

**GET** `/api/Calendar/default/v1/cal/export`

将指定日历导出为 ICS 格式文件。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `cal_id` | string | ✓ | 日历 ID |

#### 认证

需要 API 密钥（cookie），使用登录获取的 sid。

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/Calendar/default/v1/cal/export?cal_id=%2Fadmin%2Fhome%2F" \
  -H "accept: application/octet-stream" \
  -H "cookie: id={sid}"
```

---

### 响应

#### 成功响应 (200)

**Content-Type:** `application/octet-stream`

响应体为 ICS 格式的日历数据。

| 响应头 | 值 | 描述 |
|--------|-----|------|
| `Content-Type` | `application/octet-stream` 或 `text/calendar` | ICS 文件 MIME 类型 |
| `Content-Disposition` | `attachment; filename="calendar.ics"` | 建议的文件名 |

#### 响应示例

```ics
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Synology Inc.//Synology Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
UID:abc123-def456-ghi789
SUMMARY:Team Meeting
DESCRIPTION:Weekly team sync
DTSTART:20231115T100000
DTEND:20231115T110000
DTSTAMP:20231101T000000Z
LOCATION:Conference Room A
END:VEVENT
BEGIN:VTODO
UID:task-abc123
SUMMARY:Complete project report
DESCRIPTION:Finish the quarterly project report
DUE:20231115T170000
STATUS:NEEDS-ACTION
END:VTODO
END:VCALENDAR
```

---

### 使用说明

- 导出的 ICS 文件兼容大多数日历应用程序（如 Apple Calendar、Google Calendar、Microsoft Outlook）
- 导出内容包括日历中的所有事件和任务
- 可用于数据备份或迁移到其他日历服务
- 建议定期导出备份重要日历数据