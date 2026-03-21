## 列出已启用的团队文件夹

**GET** `/api/SynologyDrive/default/v2/admin/active-team-folder`

列出未处于移动或重命名状态的已启用共享文件夹。

---

### 请求

#### 查询参数

无查询参数。

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/admin/active-team-folder" \
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
| `data.total` | integer | 总数 |
| `data.items` | array | 已启用的团队文件夹和 My Drive 列表 |

#### 错误代码说明

| 代码 | 描述 |
|------|------|
| 401 | 通用错误 |
| 402 | 请求仅允许管理员执行 |
| 403 | 登录用户不允许此请求 |
| 404 | 获取客户端下载链接失败 |
| 405 | 上一个下载任务尚未完成 |
| 406 | 上一个恢复任务尚未完成 |
| 407 | 上一个删除任务尚未完成 |
| 408 | 由于文件冲突，恢复任务失败 |
| 409 | 由于卷已满，恢复任务失败 |
| 500 | 套件已禁用 |
| 501 | 套件未为用户或共享就绪 |
| 502 | 某些卷已满 |
| 503 | 由于数据库迁移，套件已暂停 |
| 600 | 尝试将数据库移动到已满的卷 |
| 601 | 卷不存在 |
| 602 | 卷应为可写状态 |
| 603 | 请求的共享尚未挂载 |
| 604 | 尝试将数据库移动到无效卷 |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "total": 3,
        "items": [
            {
                "team_id": "team_folder_001",
                "name": "Marketing Team",
                "file_id": "873048346137239001",
                "disable_download": false,
                "enable_versioning": true,
                "keep_versions": 10,
                "capabilities": {
                    "can_read": true,
                    "can_write": true,
                    "can_delete": true,
                    "can_rename": true,
                    "can_share": true,
                    "can_download": true,
                    "can_sync": true,
                    "can_organize": true,
                    "can_encrypt": false,
                    "can_comment": true,
                    "can_preview": true
                }
            },
            {
                "team_id": "team_folder_002",
                "name": "Engineering Team",
                "file_id": "873048346137239002",
                "disable_download": false,
                "enable_versioning": true,
                "keep_versions": 20,
                "capabilities": {
                    "can_read": true,
                    "can_write": true,
                    "can_delete": false,
                    "can_rename": false,
                    "can_share": false,
                    "can_download": true,
                    "can_sync": true,
                    "can_organize": false,
                    "can_encrypt": false,
                    "can_comment": true,
                    "can_preview": true
                }
            },
            {
                "file_id": "my_drive_root",
                "name": "My Drive",
                "type": "dir",
                "content_type": "dir",
                "capabilities": {
                    "can_read": true,
                    "can_write": true,
                    "can_organize": true,
                    "can_share": true
                }
            }
        ]
    }
}
```