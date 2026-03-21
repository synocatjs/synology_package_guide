# 获取与他人共享的项目列表

**GET** `/api/SynologyDrive/default/v2/files/shared-with-others`

列出在我的驱动器或团队文件夹中与他人共享的项目集合。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `sort_direction` | enum | ✗ | 排序方向。有效值：`asc`（升序）、`desc`（降序）。（默认值：`asc`） |
| `sort_by` | enum | ✗ | 排序字段。（默认值：`name`）<br>**有效值：** `modified_time`、`size`、`owner`、`type`、`name` |
| `limit` | integer | ✗ | 返回数量。（默认值：`0` 表示无限制） |
| `offset` | integer | ✗ | 起始位置。（默认值：`0`） |

**示例：**
```
limit=2
```
列出与他人共享的 2 个文件。

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/files/shared-with-others" \
  -H "accept: application/json" \
  -H "cookie: {sid}"
```

带分页和排序参数的示例：

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/files/shared-with-others?limit=10&offset=0&sort_by=modified_time&sort_direction=desc" \
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
| `data` | object | 与他人共享列表数据 |
| `data.total` | integer | 共享项目总数 |
| `data.files` | array | 文件元数据对象数组，结构与 [获取元数据] 接口返回的 data 对象一致 |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "total": 25,
        "files": [
            {
                "file_id": "873048346137239558",
                "name": "shared_document.pdf",
                "type": "file",
                "content_type": "document",
                "size": 2048000,
                "shared": true,
                "owner": {
                    "uid": 1001,
                    "name": "current_user",
                    "nickname": "Me",
                    "display_name": "Current User"
                },
                "shared_with": [
                    {
                        "display_name": "John Doe",
                        "nickname": "John",
                        "inherited": false,
                        "role": "viewer",
                        "name": "john_doe",
                        "type": "user",
                        "permission_id": "perm_123"
                    },
                    {
                        "display_name": "Jane Smith",
                        "nickname": "Jane",
                        "inherited": false,
                        "role": "editor",
                        "name": "jane_smith",
                        "type": "user",
                        "permission_id": "perm_124"
                    }
                ],
                "modified_time": 1700000000,
                "created_time": 1699900000,
                "path": "/mydrive/shared_document.pdf",
                "capabilities": {
                    "can_read": true,
                    "can_write": true,
                    "can_delete": true,
                    "can_download": true,
                    "can_share": true
                }
            },
            {
                "file_id": "873048346137239559",
                "name": "shared_folder",
                "type": "dir",
                "content_type": "dir",
                "size": 0,
                "shared": true,
                "owner": {
                    "uid": 1001,
                    "name": "current_user",
                    "nickname": "Me",
                    "display_name": "Current User"
                },
                "shared_with": [
                    {
                        "display_name": "Team Group",
                        "nickname": "",
                        "inherited": false,
                        "role": "editor",
                        "name": "team_group",
                        "type": "group",
                        "permission_id": "perm_125"
                    }
                ],
                "modified_time": 1700000000,
                "created_time": 1699900000,
                "path": "/mydrive/shared_folder",
                "capabilities": {
                    "can_read": true,
                    "can_write": true,
                    "can_delete": true,
                    "can_organize": true,
                    "can_share": true
                }
            }
        ]
    }
}
```