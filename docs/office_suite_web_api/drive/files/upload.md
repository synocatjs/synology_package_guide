## 上传文件

**PUT** `/api/SynologyDrive/default/v2/files/upload`

简单上传一个文件。

---

### 请求

#### 请求体

**Content-Type:** `multipart/form-data`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `file` | binary | ✓ | HTML 文件类型输入字段的名称 |
| `path` | string | ✓ | 文件路径。支持 ID 系统格式 |
| `conflict_action` | enum | ✗ | 当目标文件夹中存在文件名冲突时的回退操作。有效值：`overwrite`（覆盖）、`autorename`（自动重命名）、`stop`（停止）、`version`（版本） |
| `type` | string | ✗ | 文件类型。有效值：`file`、`folder` |
| `mute` | boolean | ✗ | 如果为 `true`，此文件操作不会记录到最近访问列表，也不会向用户发送任何通知。（默认值：`false`） |
| `encrypted` | boolean | ✗ | 文件是否已加密 |
| `starred` | array | ✗ | 是否收藏此文件 |
| `labels` | array | ✗ | 要标记的标签 ID 数组 |
| `modified_time` | integer | ✗ | 最后修改时间（Unix 时间戳）。（默认值：创建时间） |
| `created_time` | integer | ✗ | 文件创建时间。（默认值：服务器当前时间） |
| `access_time` | integer | ✗ | 最后访问时间。（默认值：创建时间） |

**ID 系统格式：**
- `link:permanent_link` - 永久链接
- `id:file_id` - 文件 ID
- `id:file_id/basename` - 文件 ID 加基础名称
- `/mydrive/{relative-path}` - 我的驱动器中的相对路径
- `/team-folders/{team-folder-name}/{relative-path}` - 团队文件夹中的相对路径
- `/views/{view_id}/{relative-path}` - 视图中的相对路径
- `/volumes/{absolute-path}` - 卷中的绝对路径

---

### cURL 命令示例

```bash
curl -X PUT "https://{nas_url}/api/SynologyDrive/default/v2/files/upload" \
  -H "accept: application/json" \
  -H "cookie: {sid}" \
  -F "path=/mydrive/example.jpg" \
  -F "file=@/local/path/example.jpg" \
  -F "conflict_action=autorename"
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data` | object | 上传文件的元数据对象，结构与 [获取元数据] 接口返回的 data 对象一致 |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "file_id": "873048346137239558",
        "name": "example.jpg",
        "type": "file",
        "content_type": "image",
        "size": 1024000,
        "hash": "abc123def456",
        "created_time": 1700000000,
        "modified_time": 1700000000,
        "path": "/mydrive/example.jpg",
        "parent_id": "root_folder_id",
        "capabilities": {
            "can_read": true,
            "can_write": true,
            "can_delete": true,
            "can_rename": true,
            "can_download": true
        }
    }
}
```

---

### 使用说明

- 适用于单个文件的上传
- 对于大文件，建议使用分片上传 API
- 可通过 `conflict_action` 控制文件名冲突时的处理方式
- 设置 `mute: true` 可静默上传，不记录到最近访问列表