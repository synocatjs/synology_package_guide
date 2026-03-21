## 注销

**POST** `/spreadsheets/authorize/token/revoke`

撤销在 Authorization 标头中指定的 Token。同时立即从相应的 DSM 会话中登出。

---

### 请求

#### 认证

需要 HTTP Bearer 认证。

#### cURL 命令示例

```bash
curl -X POST "http://{server_url}/spreadsheets/authorize/token/revoke" \
  -H "accept: application/json" \
  -H "authorization: Bearer {token}"
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 是否成功。始终为 `true` |

#### 响应示例

```json
{
    "success": true
}
```

#### 错误响应 (401)

认证失败或 Token 无效时返回 401 状态码。

---

### 使用说明

- 调用此 API 后，指定的 Token 将立即失效
- 与该 Token 关联的 DSM 会话也将被登出
- 如需继续使用 API，需要重新调用登录接口获取新的 Token