## 从 NAS 共享文件夹上传

**PUT** `/api/SynologyDrive/default/v2/files/upload-from-dsm`

直接从 NAS 共享文件夹上传文件到 Synology Drive。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `conflict_action` | string | ✗ | 当目标文件夹中存在文件名冲突时的回退操作。有效值：`overwrite`（覆盖）、`autorename`（自动重命名）、`stop`（停止）。（默认值：`stop`） |
| `dsm_paths` | array | ✓ | DSM 共享文件夹中文件的完整路径数组 |
| `path` | string | ✓ | 目标文件路径（Synology Drive 中的目标位置）。支持 ID 系统格式 |

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
    "conflict_action": "version",
    "path": "id:798778330294827825",
    "dsm_paths": ["/volume1/4/999.jpg"]
}
```

#### cURL 命令示例

```bash
curl -X PUT "https://{nas_url}/api/SynologyDrive/default/v2/files/upload-from-dsm" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: {sid}" \
  -d '{"conflict_action":"version","path":"id:798778330294827825","dsm_paths":["/volume1/4/999.jpg"]}'
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
        "name": "999.jpg",
        "type": "file",
        "content_type": "image",
        "size": 1024000,
        "hash": "abc123def456",
        "created_time": 1700000000,
        "modified_time": 1700000000,
        "path": "/mydrive/999.jpg",
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

- 此 API 允许将 NAS 共享文件夹中的文件直接上传到 Synology Drive
- 适用于已在 NAS 文件系统上存在的文件，无需通过客户端下载再上传
- 支持批量上传，可通过 `dsm_paths` 数组指定多个文件
- 可通过 `conflict_action` 控制文件名冲突时的处理方式