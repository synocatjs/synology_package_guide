## 重命名工作表

**POST** `/spreadsheets/{spreadsheetId}/sheet/rename`

重命名工作表。

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
| `sheetId` | string | ✓ | 工作表 ID。可在 URL 末尾找到，例如 `.../spreadsheetId#tid=1` 中的 `sh_1`。 |
| `sheetName` | string | ✓ | 工作表的新名称 |

#### 认证

需要 HTTP Bearer 认证。

#### 请求示例

```json
{
    "sheetId": "sh_1",
    "sheetName": "new name"
}
```

#### cURL 命令示例

```bash
curl -X POST "http://{server_url}/spreadsheets/rLEyyVwkqWABsmKFrn1OiRXogFCTFIAO/sheet/rename" \
  -H "accept: application/json" \
  -H "authorization: Bearer {token}" \
  -H "content-type: application/json" \
  -d '{"sheetId":"sh_1","sheetName":"new name"}'
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

- 工作表名称不能与现有工作表重名
- 名称长度有一定限制
- 某些特殊字符可能不被允许