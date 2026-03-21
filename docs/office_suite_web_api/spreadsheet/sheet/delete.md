## 删除工作表

**POST** `/spreadsheets/{spreadsheetId}/sheet/delete`

删除一个工作表。

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
| `sheetId` | string | ✓ | 要删除的工作表 ID。可在 URL 末尾找到，例如 `.../spreadsheetId#tid=1` 中的 `sh_1`。 |

#### 认证

需要 HTTP Bearer 认证。

#### 请求示例

```json
{
    "sheetId": "sh_1"
}
```

#### cURL 命令示例

```bash
curl -X POST "http://{server_url}/spreadsheets/rLEyyVwkqWABsmKFrn1OiRXogFCTFIAO/sheet/delete" \
  -H "accept: application/json" \
  -H "authorization: Bearer {token}" \
  -H "content-type: application/json" \
  -d '{"sheetId":"sh_1"}'
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

- 删除操作不可逆，请谨慎使用
- 至少需要保留一个工作表，无法删除最后一个工作表
- 删除工作表后，其中的所有数据将永久丢失