## Synology Spreadsheet

[建议访问官方页面](https://office-suite-api.synology.com/Synology-Spreadsheet/v3-4-1)

### 版本 3.4.1

Synology Spreadsheet API 允许开发者创建、读取和写入电子表格数据，并集成了文档管理和智能表格功能，如工时表和项目跟踪器模板。通过 REST API，开发者可以增强协作、简化数据管理，并自动化数据分析、项目跟踪等任务。

---

### 环境要求

请检查您的环境是否满足以下要求：

- Synology Office 3.7.0 或更高版本
- Spreadsheet API 不是套件的一部分，请完成所需设置

---

### Spreadsheet API 服务器

指定 Spreadsheet API 服务器的连接信息：

```
http://{server_url}
```

- **协议**：http
- **API 服务器 URL**：您的 API 服务器地址

---

### 身份验证

请先登录以获取您的 Token。

然后，将 Token 输入到下方字段中，以便在 Authorization 标头中应用您的 Token。设置 Token 后，它将自动应用于所有 API。

**格式：** Bearer {token}

- 当前状态：未应用
- 在标头中发送 Authorization，包含单词 Bearer 后跟空格和 Token 字符串
- **设置** / **移除**