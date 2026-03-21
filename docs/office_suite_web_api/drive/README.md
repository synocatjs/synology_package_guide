# Synology Drive

[建议访问官方页面](https://office-suite-api.synology.com/Synology-Drive/v2)

### 版本 2

Synology Drive API 使开发者能够将文件管理、共享和协作功能无缝集成到兼容系统中。利用 Synology Drive 资源，在 Synology 安全、可信的生态系统内创建、管理和搜索文件。无论您是构建定制应用程序还是优化现有工作流，REST API 都能让您在私有云环境中创建确保数据安全、运行效率高且具有灵活可扩展性的解决方案。

---

### 环境要求

请检查您的环境是否满足以下要求：

- DSM 7.2.2 nano3 或更高版本
- Synology Drive 4.0.0 或更高版本
- Synology NAS

---

### 连接配置

指定 Synology NAS 的连接信息：

```url
https://{nas_url}
```

- **协议**：https / http
- **NAS URL**：您的 NAS 地址

---

### 身份验证

请先[登录](https://office-suite-api.synology.com/Synology-Drive/v2#post-/api/SynologyDrive/default/v2/login)以获取您的会话 ID（sid）。

然后，使用以下格式将 sid 输入到下方字段中，以便在 Cookie 标头中应用您的会话 ID：

```
id={sid}
```

设置 sid 后，它将自动应用于所有 API。

- 当前状态：未应用
- 在标头中发送 API 密钥（cookie）
- **设置** / **移除**