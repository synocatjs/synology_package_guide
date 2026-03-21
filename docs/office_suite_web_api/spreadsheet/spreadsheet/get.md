## 获取电子表格数据

**GET** `/spreadsheets/{spreadsheetId}`

获取电子表格数据。

---

### 请求

#### 路径参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `spreadsheetId` | string | ✓ | 电子表格 ID。可直接从电子表格 URL 中提取，URL 格式为 `your.domain/oo/r/spreadsheetId`。电子表格 ID 是由大小写英文字母和数字组成的随机字符串。 |

#### 认证

需要 HTTP Bearer 认证。

#### cURL 命令示例

```bash
curl -X GET "http://{server_url}/spreadsheets/rLEyyVwkqWABsmKFrn1OiRXogFCTFIAO" \
  -H "accept: application/json" \
  -H "authorization: Bearer {token}"
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `id` | string | 电子表格 ID |
| `properties.title` | string | 电子表格名称 |
| `properties.locale` | string | 区域设置 |
| `sheets` | array | 工作表数组 |

#### sheets 数组元素字段

| 字段 | 类型 | 描述 |
|------|------|------|
| `properties.title` | string | 工作表名称 |
| `properties.sheetId` | string | 工作表 ID，可在 URL 末尾找到，例如 `.../spreadsheetId#tid=1` 中的 `sh_1` |
| `properties.index` | number | 工作表索引 |
| `properties.hidden` | boolean | 是否隐藏 |
| `rowCount` | number | 行数 |
| `colCount` | number | 列数 |
| `fixedColumnLeft` | number | 冻结列数 |
| `fixedRowTop` | number | 冻结行数 |
| `mergeCells` | array | 合并单元格数组，每个元素为 [起始行, 起始列, 结束行, 结束列] |

#### 响应示例

```json
{
    "id": "rLEyyVwkqWABsmKFrn1OiRXogFCTFIAO",
    "properties": {
        "title": "Spreadsheet Name",
        "locale": "en_US"
    },
    "sheets": [
        {
            "properties": {
                "title": "Sheet1",
                "sheetId": "sh_1",
                "index": 0,
                "hidden": false
            },
            "rowCount": 1000,
            "colCount": 26,
            "fixedColumnLeft": 0,
            "fixedRowTop": 0,
            "mergeCells": [
                [0, 0, 0, 2],
                [1, 0, 2, 0]
            ]
        }
    ]
}
```

#### 错误响应 (400)

请求参数无效时返回 400 状态码。