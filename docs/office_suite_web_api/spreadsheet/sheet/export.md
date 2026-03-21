## 导出 CSV

**GET** `/spreadsheets/{spreadsheetId}/sheet/csv`

应用格式、解析公式，并将工作表导出为 CSV 格式。

---

### 请求

#### 路径参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `spreadsheetId` | string | ✓ | 电子表格 ID。可直接从电子表格 URL 中提取，URL 格式为 `your.domain/oo/r/spreadsheetId`。电子表格 ID 是由大小写英文字母和数字组成的随机字符串。 |

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `sheetId` | string | ✓ | 工作表 ID。可在 URL 末尾找到，例如 `.../spreadsheetId#tid=1` 中的 `sh_1`。 |

#### 认证

需要 HTTP Bearer 认证。

#### cURL 命令示例

```bash
curl -X GET "http://{server_url}/spreadsheets/rLEyyVwkqWABsmKFrn1OiRXogFCTFIAO/sheet/csv?sheetId=sh_1" \
  -H "accept: text/csv" \
  -H "authorization: Bearer {token}"
```

---

### 响应

#### 成功响应 (200)

**Content-Type:** `text/csv`

响应体为 CSV 格式的数据。

#### 响应示例

```csv
Name,Age,City
John Doe,30,New York
Jane Smith,25,Los Angeles
Bob Johnson,35,Chicago
```

#### 错误响应 (400)

请求参数无效时返回 400 状态码。

---

### 使用说明

- 导出的 CSV 会应用单元格格式并解析公式
- 公式将被计算后的值替代
- 支持中文字符，导出时使用 UTF-8 编码
- 适用于数据备份、数据分析或导入其他系统