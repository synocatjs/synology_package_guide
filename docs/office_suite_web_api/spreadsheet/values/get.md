## 获取单元格值

**GET** `/spreadsheets/{spreadsheetId}/values/{range}`

获取指定范围内的单元格值。

---

### 请求

#### 路径参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `spreadsheetId` | string | ✓ | 电子表格 ID。可直接从电子表格 URL 中提取，URL 格式为 `your.domain/oo/r/spreadsheetId`。电子表格 ID 是由大小写英文字母和数字组成的随机字符串。 |
| `range` | string | ✓ | 要操作的范围。例如：`Sheet1!A1:C2` |

#### 认证

需要 HTTP Bearer 认证。

#### cURL 命令示例

```bash
curl -X GET "http://{server_url}/spreadsheets/rLEyyVwkqWABsmKFrn1OiRXogFCTFIAO/values/Sheet1!A1%3AC2" \
  -H "accept: application/json" \
  -H "authorization: Bearer {token}"
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `range` | string | 返回的范围 |
| `majorDimension` | enum | 主要维度。有效值：`ROWS`（按行）、`COLUMNS`（按列） |
| `values` | array | 二维数组，包含范围内的单元格值 |

#### values 数组元素类型

单元格值可以是以下类型之一：

| 类型 | 描述 |
|------|------|
| **number** | 数字值 |
| **string** | 字符串值 |
| **boolean** | 布尔值 |
| **object** | 包含多个样式片段的富文本对象 |

#### 富文本对象结构

| 字段 | 类型 | 描述 |
|------|------|------|
| `t` | enum | 类型标识符。固定为 `r` |
| `v` | array | 片段数组 |
| `v[].tx` | string | 单元格片段文本 |
| `v[].s.n` | string | 字体家族 |
| `v[].s.sz` | number | 字体大小 |
| `v[].s.b` | boolean | 是否粗体（默认：`false`） |
| `v[].s.i` | boolean | 是否斜体（默认：`false`） |
| `v[].s.s` | boolean | 是否删除线（默认：`false`） |
| `v[].s.u` | boolean | 是否下划线（默认：`false`） |
| `v[].s.c` | string | 颜色 |

#### 响应示例（简单值）

```json
{
    "range": "Sheet1!A1:C2",
    "majorDimension": "ROWS",
    "values": [
        ["Name", "Age", "City"],
        ["John Doe", 30, "New York"],
        ["Jane Smith", 25, "Los Angeles"]
    ]
}
```

#### 响应示例（富文本）

```json
{
    "range": "Sheet1!A1",
    "majorDimension": "ROWS",
    "values": [
        [
            {
                "t": "r",
                "v": [
                    {
                        "tx": "Hello ",
                        "s": {}
                    },
                    {
                        "tx": "World",
                        "s": {
                            "b": true,
                            "c": "#FF0000"
                        }
                    }
                ]
            }
        ]
    ]
}
```

#### 错误响应 (400)

请求参数无效时返回 400 状态码。