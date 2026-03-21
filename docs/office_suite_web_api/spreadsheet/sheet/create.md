## 创建工作表

**POST** `/spreadsheets/{spreadsheetId}/sheet/add`

向电子表格中添加一个新的工作表。

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
| `sheetName` | string | ✓ | 新工作表的名称 |

#### 认证

需要 HTTP Bearer 认证。

#### 请求示例

```json
{
    "sheetName": "new sheet"
}
```

#### cURL 命令示例

```bash
curl -X POST "http://{server_url}/spreadsheets/rLEyyVwkqWABsmKFrn1OiRXogFCTFIAO/sheet/add" \
  -H "accept: application/json" \
  -H "authorization: Bearer {token}" \
  -H "content-type: application/json" \
  -d '{"sheetName":"new sheet"}'
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `addSheet.properties.sheetId` | string | 工作表 ID。可在 URL 末尾找到，例如 `.../spreadsheetId#tid=1` 中的 `sh_1` |
| `addSheet.properties.title` | string | 工作表标题 |
| `addSheet.properties.index` | integer | 工作表索引 |

#### 响应示例

```json
{
    "addSheet": {
        "properties": {
            "sheetId": "sh_1",
            "title": "new sheet",
            "index": 1
        }
    }
}
```

#### 错误响应 (400)

请求参数无效时返回 400 状态码。