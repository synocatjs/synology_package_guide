## 导出 XLSX

**GET** `/spreadsheets/{spreadsheetId}/xlsx`

将电子表格导出为 XLSX 格式。

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
curl -X GET "http://{server_url}/spreadsheets/rLEyyVwkqWABsmKFrn1OiRXogFCTFIAO/xlsx" \
  -H "accept: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" \
  -H "authorization: Bearer {token}"
```

---

### 响应

#### 成功响应 (200)

**Content-Type:** `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`

响应体为 XLSX 格式的二进制文件数据。

#### 响应头

| 响应头 | 值 | 描述 |
|--------|-----|------|
| `Content-Type` | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` | XLSX 文件 MIME 类型 |
| `Content-Disposition` | `attachment; filename="filename.xlsx"` | 建议的文件名 |

#### 错误响应 (400)

请求参数无效时返回 400 状态码。

---

### 使用说明

- 导出的 XLSX 文件可兼容 Microsoft Excel 和大多数电子表格软件
- 导出内容包含所有工作表、公式、格式和合并单元格
- 适用于数据备份、离线查看或与其他应用程序共享