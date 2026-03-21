## 写入单元格值

**PUT** `/spreadsheets/{spreadsheetId}/values/{range}`

在指定范围内写入单元格值。

---

### 请求

#### 路径参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `spreadsheetId` | string | ✓ | 电子表格 ID。可直接从电子表格 URL 中提取，URL 格式为 `your.domain/oo/r/spreadsheetId`。电子表格 ID 是由大小写英文字母和数字组成的随机字符串。 |
| `range` | string | ✓ | 要操作的范围。例如：`Sheet1!A1:C2` |

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 描述 |
|------|------|------|
| `values` | array | 二维数组，包含要写入的单元格值 |

#### 值类型说明

写入的单元格值可以是以下类型之一：

| 类型 | 描述 |
|------|------|
| **number** | 数字值 |
| **string** | 字符串值 |
| **boolean** | 布尔值 |
| **object** | 包含多个样式片段的富文本对象 |

#### 富文本对象结构

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `t` | enum | ✓ | 类型标识符。固定为 `r` |
| `v` | array | ✓ | 片段数组 |
| `v[].tx` | string | ✓ | 单元格片段文本 |
| `v[].s.n` | string | ✗ | 字体家族 |
| `v[].s.sz` | number | ✗ | 字体大小 |
| `v[].s.b` | boolean | ✗ | 是否粗体（默认：`false`） |
| `v[].s.i` | boolean | ✗ | 是否斜体（默认：`false`） |
| `v[].s.s` | boolean | ✗ | 是否删除线（默认：`false`） |
| `v[].s.u` | boolean | ✗ | 是否下划线（默认：`false`） |
| `v[].s.c` | string | ✗ | 颜色 |

#### 认证

需要 HTTP Bearer 认证。

#### 请求示例（写入数字）

```json
{
    "values": [[0]]
}
```

#### 请求示例（写入字符串）

```json
{
    "values": [["Name", "Age", "City"]]
}
```

#### 请求示例（写入富文本）

```json
{
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

#### cURL 命令示例

```bash
curl -X PUT "http://{server_url}/spreadsheets/rLEyyVwkqWABsmKFrn1OiRXogFCTFIAO/values/Sheet1!A1%3AC2" \
  -H "accept: application/json" \
  -H "authorization: Bearer {token}" \
  -H "content-type: application/json" \
  -d '{"values":[[0]]}'
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `range` | string | 写入的范围 |
| `majorDimension` | enum | 主要维度。有效值：`ROWS`（按行）、`COLUMNS`（按列） |
| `values` | array | 二维数组，包含写入后的单元格值 |

#### 响应示例

```json
{
    "range": "Sheet1!A1:C2",
    "majorDimension": "ROWS",
    "values": [
        [0, null, null],
        [null, null, null]
    ]
}
```

#### 错误响应 (400)

请求参数无效时返回 400 状态码。