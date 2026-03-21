# 获取父文件夹列表

**GET** `/api/SynologyDrive/default/v2/files/ancestors`

列出指定文件的父文件夹（从根目录到直接父文件夹的完整路径）。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
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

**示例：**
```
/mydrive/123/cat3.jpg
```
列出 `/mydrive/123/cat3.jpg` 的父文件夹列表。

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/files/ancestors?path=%2Fmydrive%2F123%2Fcat3.jpg" \
  -H "accept: application/json" \
  -H "cookie: {sid}"
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data` | object | 父文件夹列表数据 |
| `data.total` | integer | 父文件夹总数 |
| `data.files` | array | 父文件夹元数据对象数组，结构与 [获取元数据] 接口返回的 data 对象一致（从根目录到直接父文件夹） |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "total": 3,
        "files": [
            {
                "file_id": "root_folder_id",
                "name": "My Drive",
                "type": "dir",
                "content_type": "dir",
                "path": "/mydrive",
                "capabilities": {
                    "can_read": true,
                    "can_write": true,
                    "can_organize": true
                }
            },
            {
                "file_id": "873048346137239556",
                "name": "123",
                "type": "dir",
                "content_type": "dir",
                "path": "/mydrive/123",
                "parent_id": "root_folder_id",
                "capabilities": {
                    "can_read": true,
                    "can_write": true,
                    "can_organize": true
                }
            },
            {
                "file_id": "873048346137239557",
                "name": "cat3.jpg",
                "type": "file",
                "content_type": "image",
                "path": "/mydrive/123/cat3.jpg",
                "parent_id": "873048346137239556",
                "capabilities": {
                    "can_read": true,
                    "can_write": true,
                    "can_delete": true,
                    "can_download": true
                }
            }
        ]
    }
}
```