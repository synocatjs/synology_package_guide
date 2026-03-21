## 获取单元格样式

**GET** `/spreadsheets/{spreadsheetId}/styles/{range}`

获取指定范围内单元格的样式。

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
curl -X GET "http://{server_url}/spreadsheets/rLEyyVwkqWABsmKFrn1OiRXogFCTFIAO/styles/Sheet1!A1%3AC2" \
  -H "accept: application/json" \
  -H "authorization: Bearer {token}"
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `range` | string | 返回的范围 |
| `rows` | array | 行数组，包含每行的单元格样式信息 |

#### 单元格样式字段说明

| 字段 | 类型 | 描述 |
|------|------|------|
| `userEnteredValue` | object | 用户输入的值（数字、字符串、布尔值或富文本对象） |
| `effectiveValue` | object | 有效值。对于字面量，与 `userEnteredValue` 相同；对于公式，为计算值 |
| `formattedValue` | string | 格式化后的值 |
| `userEnteredFormat` | object | 用户输入的格式 |
| `effectiveFormat` | object | 实际应用的格式 |
| `hyperlink` | string | 单元格指向的超链接（只读） |

#### userEnteredFormat / effectiveFormat 字段

| 字段 | 类型 | 描述 |
|------|------|------|
| `numberFormat` | object | 数字格式（只读） |
| `verticalAlignment` | enum | 垂直对齐：`top`、`middle`、`bottom` |
| `textFormat` | object | 文本格式 |
| `textFormat.bold` | boolean | 是否粗体 |
| `textFormat.color` | string | 颜色 |
| `textFormat.italic` | boolean | 是否斜体 |
| `textFormat.name` | string | 字体名称 |
| `textFormat.size` | integer | 字体大小 |
| `textFormat.strike` | boolean | 是否删除线 |
| `textFormat.underline` | boolean | 是否下划线 |
| `bg` | string | 背景颜色 |
| `quotePrefix` | boolean | 是否添加引号前缀（仅 UI 可编辑） |
| `horizontalAlignment` | enum | 水平对齐：`left`、`center`、`right` |
| `wrapStrategy` | enum | 换行策略：`wrap`（换行）、`clip`（裁剪） |
| `borders` | array | 边框颜色数组，顺序为：[上, 右, 下, 左] |

#### 响应示例

```json
{
    "range": "Sheet1!A1:C2",
    "rows": [
        {
            "values": [
                {
                    "userEnteredValue": "Name",
                    "effectiveValue": "Name",
                    "formattedValue": "Name",
                    "userEnteredFormat": {
                        "horizontalAlignment": "center",
                        "verticalAlignment": "middle",
                        "textFormat": {
                            "bold": true,
                            "size": 12
                        },
                        "bg": "#F0F0F0"
                    },
                    "effectiveFormat": {
                        "horizontalAlignment": "center",
                        "verticalAlignment": "middle",
                        "textFormat": {
                            "bold": true,
                            "size": 12
                        },
                        "bg": "#F0F0F0"
                    }
                },
                {
                    "userEnteredValue": 30,
                    "effectiveValue": 30,
                    "formattedValue": "30",
                    "userEnteredFormat": {
                        "horizontalAlignment": "right"
                    },
                    "effectiveFormat": {
                        "horizontalAlignment": "right"
                    }
                }
            ]
        }
    ]
}
```

#### 错误响应 (400)

请求参数无效时返回 400 状态码。