# 转换为 Synology Office

**POST** `/api/SynologyDrive/default/v2/files/convert-office`

将文件转换为 Synology Office。此 API 是异步的，转换在后台运行时会立即返回一个异步任务 ID。要正常使用此 API，必须安装 Synology Office。

---

## 请求

### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `to_parent_folder` | string | ✗ | 目标文件夹路径。支持 ID 系统格式 |
| `conflict_action` | enum | ✗ | 当目标文件夹中存在文件名冲突时的回退操作。<br>**有效值：** `overwrite`（覆盖）、`autorename`（自动重命名）、`stop`（停止）、`version`（版本） |
| `files` | array | ✓ | 用户选择的文件路径集合，包括目录和文件 |
| `files[].path` | string | ✓ | 文件路径。支持 ID 系统格式 |
| `files[].password` | string | ✗ | 密码 |

### ID 系统格式说明

- `link:permanent_link` - 永久链接
- `id:file_id` - 文件 ID
- `id:file_id/basename` - 文件 ID 加基础名称
- `/mydrive/{relative-path}` - 我的驱动器中的相对路径
- `/team-folders/{team-folder-name}/{relative-path}` - 团队文件夹中的相对路径
- `/views/{view_id}/{relative-path}` - 视图中的相对路径
- `/volumes/{absolute-path}` - 卷中的绝对路径

### 请求示例

```json
{
    "to_parent_folder": "/mydrive",
    "conflict_action": "autorename",
    "files": [
        {
            "path": "id:864340450465593037"
        }
    ]
}
```

### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/SynologyDrive/default/v2/files/convert-office" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: {sid}" \
  -d '{"to_parent_folder":"/mydrive","conflict_action":"autorename","files":[{"path":"id:864340450465593037"}]}'
```

---

## 响应

### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data.async_task_id` | string | 异步任务 ID |

### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "async_task_id": "task_id_here"
    }
}
```