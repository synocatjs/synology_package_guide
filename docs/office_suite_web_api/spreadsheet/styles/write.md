## 写入单元格样式

**PUT** `/spreadsheets/{spreadsheetId}/styles`

在指定范围内写入单元格样式。

---

### 请求

#### 路径参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `spreadsheetId` | string | ✓ | 电子表格 ID。可直接从电子表格 URL 中提取，URL 格式为 `your.domain/oo/r/spreadsheetId`。电子表格 ID 是由大小写英文字母和数字组成的随机字符串。 |

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `sheetName` | string | ✓ | 工作表名称 |
| `startRow` | integer | ✓ | 起始行索引（从 0 开始） |
| `startCol` | integer | ✓ | 起始列索引（从 0 开始） |
| `rows` | array | ✓ | 行数组，包含每行的样式信息 |

#### userEnteredFormat 字段说明

| 字段 | 类型 | 描述 |
|------|------|------|
| `numberFormat` | object | 数字格式（只读，API 写入无效） |
| `verticalAlignment` | enum | 垂直对齐：`top`、`middle`、`bottom` |
| `textFormat` | object | 文本格式 |
| `textFormat.bold` | boolean | 是否粗体 |
| `textFormat.color` | string | 颜色（十六进制，不含 #） |
| `textFormat.italic` | boolean | 是否斜体 |
| `textFormat.name` | string | 字体名称 |
| `textFormat.size` | integer | 字体大小 |
| `textFormat.strike` | boolean | 是否删除线 |
| `textFormat.underline` | boolean | 是否下划线 |
| `bg` | string | 背景颜色（十六进制，不含 #） |
| `quotePrefix` | boolean | 是否添加引号前缀（仅 UI 可编辑，API 写入无效） |
| `horizontalAlignment` | enum | 水平对齐：`left`、`center`、`right` |
| `wrapStrategy` | enum | 换行策略：`wrap`（换行）、`clip`（裁剪） |
| `borders` | array | 边框颜色数组，顺序为：[上, 右, 下, 左] |

#### 样式写入规则

- 新样式会**覆盖**现有样式
- 例如：当前样式为 `{bg: "red"}`，写入 `{horizontalAlignment: "center"}` 将清除 `bg`，结果为 `{horizontalAlignment: "center"}`
- 边框会**合并**到现有边框
- 例如：当前边框为 `["red", null, null, null]`，写入 `[null, "blue", null, null]` 结果为 `["red", "blue", null, null]`
- 设置 `borders=null` 可清除所有边框

#### 认证

需要 HTTP Bearer 认证。

#### 请求示例

```json
{
    "sheetName": "Sheet1",
    "startRow": 0,
    "startCol": 0,
    "rows": [
        {
            "values": [
                {
                    "userEnteredFormat": {
                        "numberFormat": {
                            "type": "DEFAULT",
                            "pattern": "0%"
                        },
                        "verticalAlignment": "top",
                        "textFormat": {
                            "bold": true,
                            "color": "000000",
                            "italic": false,
                            "name": "Arial",
                            "size": 20,
                            "strike": true,
                            "underline": true
                        },
                        "bg": "fffffe",
                        "quotePrefix": false,
                        "horizontalAlignment": "left",
                        "wrapStrategy": "wrap",
                        "borders": ["red", null, null, null]
                    }
                }
            ]
        }
    ]
}
```

#### cURL 命令示例

```bash
curl -X PUT "http://{server_url}/spreadsheets/rLEyyVwkqWABsmKFrn1OiRXogFCTFIAO/styles" \
  -H "accept: application/json" \
  -H "authorization: Bearer {token}" \
  -H "content-type: application/json" \
  -d '{"sheetName":"Sheet1","startRow":0,"startCol":0,"rows":[{"values":[{"userEnteredFormat":{"numberFormat":{"type":"DEFAULT","pattern":"0%"},"verticalAlignment":"top","textFormat":{"bold":true,"color":"000000","italic":false,"name":"Arial","size":20,"strike":true,"underline":true},"bg":"fffffe","quotePrefix":false,"horizontalAlignment":"left","wrapStrategy":"wrap","borders":["red",null,null,null]}}]}]}'
```

---

### 响应

#### 成功响应 (200)

成功时返回空对象。

```json
{}
```

#### 错误响应 (400)

请求参数无效时返回 400 状态码。