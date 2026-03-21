## 列出权限

**GET** `/api/SynologyDrive/default/v2/sharing`

获取当前登录用户对文件的共享权限。

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
id:798778330294827825
```
获取当前登录用户对文件的权限。

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/sharing?path=id%3A798778330294827825" \
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
| `data.items` | array | 包含所列权限的数组 |
| `data.items[].inherited` | boolean | 权限是否从父文件夹继承 |
| `data.items[].role` | enum | 此权限授予的角色。有效值：`denied`（拒绝）、`viewer`（查看者）、`commenter`（评论者）、`editor`（编辑者）、`organizer`（组织者）、`previewer`（预览者）、`preview_commenter`（预览评论者） |
| `data.items[].name` | string | 用户或组的成员名称 |
| `data.items[].type` | enum | 成员类型。有效值：`user`（用户）、`group`（组）、`public`（公开）、`internal`（内部） |
| `data.items[].permission_id` | integer | 权限记录 ID |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "items": [
            {
                "permission_id": 1001,
                "name": "john_doe",
                "type": "user",
                "role": "editor",
                "inherited": false
            },
            {
                "permission_id": 1002,
                "name": "jane_smith",
                "type": "user",
                "role": "viewer",
                "inherited": false
            },
            {
                "permission_id": 1003,
                "name": "team_group",
                "type": "group",
                "role": "commenter",
                "inherited": true
            }
        ]
    }
}
```

---

### 使用说明

- 返回当前登录用户对指定文件的共享权限信息
- 如果权限从父文件夹继承，`inherited` 字段为 `true`
- `role` 字段表示用户对该文件的操作权限级别
- 此 API 主要用于查看用户自身的权限，而非管理他人的权限