## 创建共享链接

**POST** `/api/SynologyDrive/default/v2/sharing/create-link`

为特定文件创建共享链接。如果共享链接已存在，将直接返回之前的链接。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `path` | string | ✓ | 文件路径。支持 ID 系统格式 |

**ID 系统格式：**
- `link:permanent_link` - 永久链接
- `id:file_id` - 文件 ID
- `id:file_id/basename` - 文件 ID 加基础名称
- `/mydrive/{relative-path}` - 我的驱动器中的相对路径
- `/team-folders/{team-folder-name}/{relative-path}` - 团队文件夹中的相对路径
- `/views/{view_id}/{relative-path}` - 视图中的相对路径
- `/volumes/{absolute-path}` - 卷中的绝对路径

#### 请求示例

```json
{
    "path": "id:851875472317915235"
}
```

#### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/SynologyDrive/default/v2/sharing/create-link" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: {sid}" \
  -d '{"path":"id:851875472317915235"}'
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data.link_id` | string | URL 的 ID 部分，可用于使用链接 API |
| `data.url` | string | 指向此文件的共享链接 |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "link_id": "abc123def456",
        "url": "https://nas.example.com/sharing/abc123def456"
    }
}
```

---

### 使用说明

- 为指定文件创建公开共享链接
- 如果文件已有共享链接，将直接返回现有链接，不会重复创建
- 创建的链接可以分享给任何人，用于访问该文件
- 可通过 `link_id` 调用其他共享管理 API（如修改权限、删除链接等）