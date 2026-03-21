## 更新权限

**PUT** `/api/SynologyDrive/default/v2/sharing/permissions`

更新共享权限。

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
id:844408776661448077
```
移除权限。

---

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `permissions` | array | ✓ | 权限编辑操作数组，用于添加、删除或更改文件的角色 |
| `permissions[].mounted` | boolean | ✗ | 此共享文件是否应显示在目标的"与我共享"列表中。（默认值：如果没有祖先挂载则为 `true`） |
| `permissions[].mute` | boolean | ✗ | 如果为 `true`，此文件操作不会向用户发送任何通知。（默认值：`false`） |
| `permissions[].role` | enum | ✗ | 此权限授予的角色。仅在 `action` 设置为 `update` 时适用。<br>**有效值：** `denied`（拒绝）、`viewer`（查看者）、`commenter`（评论者）、`editor`（编辑者）、`organizer`（组织者）、`previewer`（预览者）、`preview_commenter`（预览评论者） |
| `permissions[].member` | object | ✗ | 成员信息 |
| `permissions[].member.gid` | integer | ✗ | 组的系统 ID |
| `permissions[].member.uid` | integer | ✗ | 用户的系统 ID |
| `permissions[].member.name` | string | ✗ | 用户或组的成员名称（优先级高于 uid 和 gid） |
| `permissions[].member.type` | string | ✗ | 成员类型。有效值：`user`（用户）、`group`（组）、`internal`（内部） |
| `permissions[].action` | string | ✓ | 权限记录的编辑操作。有效值：`delete`（删除）、`update`（更新） |

#### 请求示例

```json
{
    "permissions": [
        {
            "member": {
                "name": "d1",
                "type": "user"
            },
            "action": "delete",
            "role": "viewer"
        }
    ]
}
```

#### cURL 命令示例

```bash
curl -X PUT "https://{nas_url}/api/SynologyDrive/default/v2/sharing/permissions?path=id%3A844408776661448077" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: {sid}" \
  -d '{"permissions":[{"member":{"name":"d1","type":"user"},"action":"delete","role":"viewer"}]}'
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    }
}
```

---

### 使用说明

- **添加权限**：使用 `action: "update"` 并指定 `member` 和 `role`
- **删除权限**：使用 `action: "delete"` 并指定要删除的 `member`
- **更新角色**：使用 `action: "update"` 并指定新的 `role`
- **静默操作**：设置 `mute: true` 可避免发送通知
- **挂载设置**：使用 `mounted` 控制共享文件是否显示在目标的"与我共享"列表中