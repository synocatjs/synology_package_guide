## 获取团队文件夹列表

**GET** `/api/SynologyDrive/default/v2/team-folder`

获取已登录用户的团队文件夹列表。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `sort_direction` | string | ✗ | 排序方向。有效值：`desc`（降序）、`asc`（升序）。（默认值：`asc`） |
| `sort_by` | string | ✗ | 排序字段。（默认值：`name`） |
| `limit` | integer | ✗ | 返回数量。（默认值：`0` 表示无限制） |
| `offset` | integer | ✗ | 起始位置。（默认值：`0`） |

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/team-folder" \
  -H "accept: application/json" \
  -H "cookie: {sid}"
```

带分页和排序参数的示例：

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/team-folder?limit=10&offset=0&sort_by=name&sort_direction=asc" \
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
| `data.total` | integer | 忽略 limit 的项目总数 |
| `data.items` | array | 包含所列文件夹的数组 |

#### data.items 数组元素字段

| 字段 | 类型 | 描述 |
|------|------|------|
| `disable_download` | boolean | 是否禁用下载 |
| `enable_versioning` | boolean | 是否启用版本控制 |
| `keep_versions` | integer | 保留版本数量 |
| `file_id` | string | 根目录 ID |
| `name` | string | 文件夹名称 |
| `team_id` | string | 团队文件夹 ID |
| `capabilities` | object | 权限能力对象 |
| `capabilities.can_read` | boolean | 是否可以读取 |
| `capabilities.can_write` | boolean | 是否可以写入 |
| `capabilities.can_delete` | boolean | 是否可以删除 |
| `capabilities.can_rename` | boolean | 是否可以重命名 |
| `capabilities.can_share` | boolean | 是否可以修改共享权限 |
| `capabilities.can_download` | boolean | 是否可以下载 |
| `capabilities.can_sync` | boolean | 是否可以同步 |
| `capabilities.can_organize` | boolean | 是否有完整权限 |
| `capabilities.can_encrypt` | boolean | 是否可以加密 |
| `capabilities.can_comment` | boolean | 是否可以评论 |
| `capabilities.can_preview` | boolean | 是否可以预览 |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "total": 5,
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
            }
        ]
    }
}
```