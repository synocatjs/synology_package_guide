## Synology Calendar

[官方页面查看](https://office-suite-api.synology.com/Synology-Calendar/v1)

### 版本 1

Synology Calendar API 可实现日历事件与业务系统的无缝集成和管理。利用事件创建、编辑和日程安排等高级功能，通过 REST API 构建 Synology Calendar 自定义日程功能，以增强跨平台协调。

---

### 环境要求

请检查您的环境是否满足以下要求：

- DSM 7.2.2 nano3 或更高版本
- Synology Calendar 2.5.3 或更高版本
- Synology NAS

---

### 连接配置

指定 Synology NAS 的连接信息：

```
https://{nas_url}
```

- **协议**：https
- **NAS URL**：您的 NAS 地址

---

### 身份验证

请先登录以获取您的会话 ID（sid）。

然后，使用以下格式将 sid 输入到下方字段中，以便在 Cookie 标头中应用您的会话 ID：

```
id={sid}
```

设置 sid 后，它将自动应用于所有 API。

- 当前状态：未应用
- 在标头中发送 API 密钥（cookie）
- **设置** / **移除**