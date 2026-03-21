## 批量更新

**POST** `/spreadsheets/{spreadsheetId}/batchUpdate`

批量更新电子表格，如插入或删除行和列。

---

### 请求

#### 路径参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `spreadsheetId` | string | ✓ | 电子表格 ID。可直接从电子表格 URL 中提取，URL 格式为 `your.domain/oo/r/spreadsheetId`。电子表格 ID 是由大小写英文字母和数字组成的随机字符串。 |

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 描述 |
|------|------|------|
| `requests` | array | 请求操作数组，可包含多个插入或删除维度操作 |

#### insertDimension 操作

| 字段 | 类型 | 描述 |
|------|------|------|
| `range.sheetId` | string | 工作表 ID，可在 URL 末尾找到，例如 `.../spreadsheetId#tid=1` 中的 `sh_1` |
| `range.dimension` | enum | 操作维度。有效值：`ROWS`（行）、`COLUMNS`（列） |
| `range.startIndex` | integer | 起始索引（从 0 开始） |
| `range.endIndex` | integer | 结束索引（从 0 开始，不包含） |
| `inheritFromBefore` | boolean | 是否从上方继承格式（默认：`true`） |

#### deleteDimension 操作

| 字段 | 类型 | 描述 |
|------|------|------|
| `range.sheetId` | string | 工作表 ID |
| `range.dimension` | enum | 操作维度。有效值：`ROWS`（行）、`COLUMNS`（列） |
| `range.startIndex` | integer | 起始索引（从 0 开始） |
| `range.endIndex` | integer | 结束索引（从 0 开始，不包含） |

#### 认证

需要 HTTP Bearer 认证。

#### 请求示例（插入行）

```json
{
    "requests": [
        {
            "insertDimension": {
                "range": {
                    "sheetId": "sh_1",
                    "dimension": "ROWS",
                    "startIndex": 1,
                    "endIndex": 2
                },
                "inheritFromBefore": false
            }
        }
    ]
}
```

#### 请求示例（删除列）

```json
{
    "requests": [
        {
            "deleteDimension": {
                "range": {
                    "sheetId": "sh_1",
                    "dimension": "COLUMNS",
                    "startIndex": 2,
                    "endIndex": 4
                }
            }
        }
    ]
}
```

#### 请求示例（批量操作）

```json
{
    "requests": [
        {
            "insertDimension": {
                "range": {
                    "sheetId": "sh_1",
                    "dimension": "ROWS",
                    "startIndex": 0,
                    "endIndex": 1
                }
            }
        },
        {
            "deleteDimension": {
                "range": {
                    "sheetId": "sh_1",
                    "dimension": "COLUMNS",
                    "startIndex": 5,
                    "endIndex": 6
                }
            }
        }
    ]
}
```

#### cURL 命令示例

```bash
curl -X POST "http://{server_url}/spreadsheets/rLEyyVwkqWABsmKFrn1OiRXogFCTFIAO/batchUpdate" \
  -H "accept: application/json" \
  -H "authorization: Bearer {token}" \
  -H "content-type: application/json" \
  -d '{"requests":[{"insertDimension":{"range":{"sheetId":"sh_1","dimension":"ROWS","startIndex":1,"endIndex":2},"inheritFromBefore":false}}]}'
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

---

### 使用说明

- **插入行**：在指定索引位置插入空行，`endIndex` 应为 `startIndex + 插入数量`
- **插入列**：在指定索引位置插入空列
- **删除行**：删除指定范围内的行，删除后下方数据上移
- **删除列**：删除指定范围内的列，删除后右侧数据左移
- **索引说明**：行和列索引均从 0 开始，`startIndex` 为起始位置，`endIndex` 为结束位置（不包含）
- **格式继承**：插入行时，`inheritFromBefore` 为 `true` 时从上方行继承格式，为 `false` 时不继承