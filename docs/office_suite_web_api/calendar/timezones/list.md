## 获取时区列表

**GET** `/api/Calendar/default/v1/timezone`

获取可用的时区列表。

---

### 请求

#### 认证

需要 API 密钥（cookie），使用登录获取的 sid。

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/Calendar/default/v1/timezone" \
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
| `data.list` | array | 时区列表 |

#### data.list 数组元素字段

| 字段 | 类型 | 描述 |
|------|------|------|
| `active` | boolean | 时区是否激活 |
| `vtimezone` | string | 时区的 ICS 格式定义 |
| `tzid` | string | 时区标识符（TZID） |
| `temp` | string | 临时时区标识符 |

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
                "active": true,
                "vtimezone": "BEGIN:VTIMEZONE\nTZID:Asia/Taipei\nBEGIN:STANDARD\nTZOFFSETFROM:+0800\nTZOFFSETTO:+0800\nTZNAME:CST\nDTSTART:19700101T000000\nEND:STANDARD\nEND:VTIMEZONE",
                "tzid": "Asia/Taipei",
                "temp": ""
            },
            {
                "active": true,
                "vtimezone": "BEGIN:VTIMEZONE\nTZID:Asia/Tokyo\nBEGIN:STANDARD\nTZOFFSETFROM:+0900\nTZOFFSETTO:+0900\nTZNAME:JST\nDTSTART:19700101T000000\nEND:STANDARD\nEND:VTIMEZONE",
                "tzid": "Asia/Tokyo",
                "temp": ""
            },
            {
                "active": true,
                "vtimezone": "BEGIN:VTIMEZONE\nTZID:America/New_York\nBEGIN:DAYLIGHT\nTZOFFSETFROM:-0500\nTZOFFSETTO:-0400\nTZNAME:EDT\nDTSTART:19700308T020000\nRRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU\nEND:DAYLIGHT\nBEGIN:STANDARD\nTZOFFSETFROM:-0400\nTZOFFSETTO:-0500\nTZNAME:EST\nDTSTART:19701101T020000\nRRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU\nEND:STANDARD\nEND:VTIMEZONE",
                "tzid": "America/New_York",
                "temp": ""
            }
        ]
    }
}
```