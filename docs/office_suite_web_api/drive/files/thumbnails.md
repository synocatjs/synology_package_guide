## 缩略图

**GET** `/api/SynologyDrive/default/v2/files/thumbnail`

获取文件的缩略图。仅图像文件支持缩略图。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `size` | string | ✗ | 缩略图尺寸。如果缩略图生成失败，将返回原始图像。有效值：`small`（小）、`medium`（中）、`large`（大）、`original`（原始）。（默认值：`small`） |
| `animate` | boolean | ✗ | 是否保持 GIF 动画效果 |
| `path` | string | ✓ | 文件路径。支持 ID 系统格式 |

**ID 系统格式：**
- `link:permanent_link` - 永久链接
- `id:file_id` - 文件 ID
- `id:file_id/basename` - 文件 ID 加基础名称
- `/mydrive/{relative-path}` - 我的驱动器中的相对路径
- `/team-folders/{team-folder-name}/{relative-path}` - 团队文件夹中的相对路径
- `/views/{view_id}/{relative-path}` - 视图中的相对路径
- `/volumes/{absolute-path}` - 卷中的绝对路径

**示例：**
```
/mydrive/123/cat3.jpg
```
获取位于 `/mydrive/123/cat3.jpg` 文件的缩略图。

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/files/thumbnail?path=%2Fmydrive%2F123%2Fcat3.jpg" \
  -H "accept: application/octet-stream" \
  -H "cookie: {sid}"
```

带尺寸参数的示例：

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/files/thumbnail?path=%2Fmydrive%2F123%2Fcat3.jpg&size=large" \
  -H "accept: application/octet-stream" \
  -H "cookie: {sid}"
```

---

### 响应

#### 成功响应 (200)

**Content-Type:** `application/octet-stream` 或 `image/*`

响应体为缩略图二进制内容。

| 响应头 | 描述 |
|--------|------|
| `Content-Type` | 图像 MIME 类型，如 `image/jpeg`、`image/png`、`image/gif` |
| `Content-Length` | 图像文件大小 |

#### 响应说明

- **图像文件**：返回指定尺寸的缩略图
- **GIF 文件**：设置 `animate=true` 可返回动画 GIF，否则返回静态缩略图
- **缩略图生成失败**：返回原始图像
- **非图像文件**：返回错误响应

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