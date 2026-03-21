## 删除电子表格

**POST** `/spreadsheets/delete`

删除一个电子表格。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `spreadsheetId` | string | ✓ | 要删除的电子表格 ID |

#### 认证

需要 HTTP Bearer 认证。

#### 请求示例

```json
{
    "spreadsheetId": "ferjGdIFhVF6LY1LeqtZklcOAukN3Uy7"
}
```

#### cURL 命令示例

```bash
curl -X POST "http://{server_url}/spreadsheets/delete" \
  -H "accept: application/json" \
  -H "authorization: Bearer {token}" \
  -H "content-type: application/json" \
  -d '{"spreadsheetId":"ferjGdIFhVF6LY1LeqtZklcOAukN3Uy7"}'
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `spreadsheetId` | string | 已删除的电子表格 ID |

#### 响应示例

```json
{
    "spreadsheetId": "ferjGdIFhVF6LY1LeqtZklcOAukN3Uy7"
}
```

#### 错误响应 (400)

请求参数无效时返回 400 状态码。

---

### 使用说明

- 删除操作不可逆，请谨慎使用
- 删除后电子表格将移至回收站
- 只有拥有删除权限的用户才能执行此操作