## 获取团队成员

**GET** `/api/SynologyDrive/default/v2/team-folder/members`

获取特定团队文件夹的成员列表。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `team_id` | string（双引号包裹） | ✓ | 团队文件夹 ID |
| `sort_direction` | string | ✗ | 排序方向。有效值：`desc`（降序）、`asc`（升序）。（默认值：`asc`） |
| `sort_by` | string | ✗ | 排序字段。（默认值：`display_name`） |
| `limit` | integer | ✗ | 返回数量。（默认值：`0` 表示无限制） |
| `offset` | integer | ✗ | 起始位置。（默认值：`0`） |

**示例：**
```
team_id="4"
```
获取 ID 为 "4" 的团队文件夹的成员列表。

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/team-folder/members?team_id=%224%22" \
  -H "accept: application/json" \
  -H "cookie: {sid}"
```

带分页和排序参数的示例：

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/team-folder/members?team_id=%224%22&limit=20&offset=0&sort_by=display_name&sort_direction=asc" \
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
| `data.items` | array | 包含所列成员的数组 |

#### data.items 数组元素字段

| 字段 | 类型 | 描述 |
|------|------|------|
| `role` | string | 此权限授予的角色。有效值：`organizer`（组织者）、`viewer`（查看者） |
| `uid` | integer | 用户的系统 UID |
| `name` | string | 用户的短名或长名 |
| `display_name` | string | 用户的显示名称 |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "total": 8,
        "items": [
            {
                "uid": 1001,
                "name": "john_doe",
                "display_name": "John Doe",
                "role": "organizer"
            },
            {
                "uid": 1002,
                "name": "jane_smith",
                "display_name": "Jane Smith",
                "role": "organizer"
            },
            {
                "uid": 1003,
                "name": "bob_wilson",
                "display_name": "Bob Wilson",
                "role": "viewer"
            },
            {
                "uid": 1004,
                "name": "alice_brown",
                "display_name": "Alice Brown",
                "role": "viewer"
            }
        ]
    }
}
```