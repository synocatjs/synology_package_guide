# 下载文件或文件夹

**POST** `/api/SynologyDrive/default/v2/files/download`

下载文件或将文件夹下载为压缩归档文件。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `dry_run` | boolean | ✗ | 测试此下载请求是否可执行。对于需要密码的加密文件下载非常有用。（默认值：`false`） |
| `decrypt` | object | ✗ | 解密配置 |
| `force_download` | boolean | ✗ | 通过将 content-type 设置为 `application/octet-stream` 并添加 content-disposition 头来强制触发浏览器下载。（默认值：`false`） |
| `archive_name` | string | ✗ | 归档文件的名称。（默认值：`download`） |
| `files` | array | ✗ | 要下载的文件路径数组。如果选择了多个文件，它们将被打包成 ZIP 文件，并以 `archive_name` 作为文件名 |

#### 请求示例

```json
{
    "files": ["/mydrive/123/2.jpg"],
    "archive_name": "my_download",
    "force_download": true
}
```

#### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/SynologyDrive/default/v2/files/download" \
  -H "accept: application/octet-stream" \
  -H "content-type: application/json" \
  -H "cookie: {sid}" \
  -d '{"files":["/mydrive/123/2.jpg"]}'
```

---

### 响应

#### 成功响应 (200)

**Content-Type:** `application/octet-stream`

响应体为文件内容。如果是多个文件，则为 ZIP 压缩包。

| 响应头 | 描述 |
|--------|------|
| `Content-Disposition` | 包含文件名，格式如 `attachment; filename="download.zip"` |
| `Content-Type` | `application/octet-stream` 或 `application/zip` |

#### 响应说明

- **单个文件**：直接返回文件二进制内容
- **多个文件**：返回 ZIP 压缩包，包含所有请求的文件
- **文件夹**：返回文件夹内容的 ZIP 压缩包

#### 错误响应

如果请求失败，返回 JSON 格式的错误信息：

```json
{
    "success": false,
    "error": {
        "code": 错误代码
    }
}
```