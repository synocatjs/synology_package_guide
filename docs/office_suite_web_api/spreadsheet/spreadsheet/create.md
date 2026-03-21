## 创建电子表格

**POST** `/spreadsheets/create`

创建一个新的电子表格。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `name` | string | ✓ | 电子表格的文件名 |

#### 认证

需要 HTTP Bearer 认证。

#### 请求示例

```json
{
    "name": "Spreadsheet Name"
}
```

#### cURL 命令示例

```bash
curl -X POST "http://{server_url}/spreadsheets/create" \
  -H "accept: application/json" \
  -H "authorization: Bearer {token}" \
  -H "content-type: application/json" \
  -d '{"name":"Spreadsheet Name"}'
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `spreadsheetId` | string | 新创建的电子表格 ID |

#### 响应示例

```json
{
    "spreadsheetId": "rLEyyVwkqWABsmKFrn1OiRXogFCTFIAO"
}
```

#### 错误响应 (400)

请求参数无效时返回 400 状态码。

---

### 使用说明

- 新创建的电子表格默认包含一个空白工作表（通常名为 "Sheet1"）
- 电子表格 ID 可用于后续所有读写操作
- 文件名支持中文，但需符合 DSM 文件命名规范