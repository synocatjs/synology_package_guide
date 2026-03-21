## API Token

### 获取方式

通过 `/spreadsheets/authorize` 接口使用账户和密码获取 Token。

---

### 格式

Token 采用 JWT 格式。解码后可获得以下信息：
- 用户名
- 服务器主机
- 过期日期

---

### 有效期

- Token 有效期为 **28 天**
- Token 与 DSM 会话绑定
- 如果 DSM 重启或用户被强制登出，Token 将失效