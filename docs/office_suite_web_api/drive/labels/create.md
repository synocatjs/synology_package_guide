## 创建标签

**POST** `/api/SynologyDrive/default/v2/labels`

为已登录用户创建具有指定名称、颜色和排序位置的新标签。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `name` | string | ✓ | 标签名称 |
| `color` | string | ✗ | 标签颜色，6 位十六进制表示，带前导 `#` 号。（默认值：`#000000`） |
| `position` | integer | ✗ | 标签位置。（默认值：`0`） |
| `type` | string | ✗ | 指定要创建的标签类型。有效值：`personal_label`（个人标签）、`shared_label`（共享标签）。（默认值：`personal_label`） |
| `description` | string | ✗ | 共享标签的描述 |
| `copy_policy` | integer | ✗ | 复制文件时此共享标签的策略。（默认值：`0`）<br>`0`：始终复制此标签，即使用户没有应用它的权限<br>`1`：仅当用户有权限应用时才复制此标签<br>`2`：不复制此标签 |
| `enabled` | boolean | ✗ | 授权用户访问共享标签的能力。（默认值：`true`） |
| `permission` | integer | ✗ | 共享标签的操作权限。（默认值：`0`）<br>`0`：仅受邀用户可以在他们可访问的文件/文件夹上应用此标签<br>`1`：所有用户可以在他们可访问的文件/文件夹上查看此标签<br>`2`：所有用户可以在他们可访问的文件/文件夹上查看和应用此标签 |
| `invitee_list` | array | ✗ | 受邀者信息数组，用于更新或删除共享标签的操作权限 |
| `invitee_list[].member.name` | string | ✓ | 用户或组的成员名称 |
| `invitee_list[].member.type` | string | ✓ | 成员类型。有效值：`user`、`group` |
| `invitee_list[].action` | string | ✓ | 受邀者记录的编辑操作。有效值：`update`（更新）、`delete`（删除） |
| `invitee_list[].permission` | integer | ✗ | 共享标签的操作权限。当 `action` 为 `update` 时需要。<br>`1`：成员可以在他们可访问的文件/文件夹上查看此标签<br>`2`：成员可以在他们可访问的文件/文件夹上查看和应用此标签 |
| `member` | array | ✗ | 编辑时的用户身份。此参数用于允许管理员为用户编辑标签 |
| `member[].gid` | integer | ✗ | 组的系统 ID |
| `member[].uid` | integer | ✗ | 用户的系统 ID |
| `member[].name` | string | ✗ | 用户或组的成员名称（优先级高于 uid 和 gid） |
| `member[].type` | string | ✗ | 成员类型。有效值：`user`、`group`、`public`、`internal` |

#### 请求示例（创建个人标签）

```json
{
    "name": "openapi example",
    "color": "#00AABB"
}
```

#### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/SynologyDrive/default/v2/labels" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: {sid}" \
  -d '{"name":"openapi example","color":"#00AABB"}'
```

#### 请求示例（创建共享标签）

```json
{
    "name": "Team Project",
    "color": "#FF6600",
    "type": "shared_label",
    "description": "标签用于团队项目文件",
    "permission": 2,
    "invitee_list": [
        {
            "member": {
                "name": "john_doe",
                "type": "user"
            },
            "action": "update",
            "permission": 2
        }
    ]
}
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data.label_id` | string | 标签 ID |
| `data.name` | string | 标签名称 |
| `data.color` | string | 标签颜色 |
| `data.position` | integer | 标签位置 |
| `data.type` | string | 标签类型 |
| `data.update_time` | integer | 更新时间（Unix 时间戳） |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "label_id": "6",
        "name": "openapi example",
        "color": "#00AABB",
        "position": 5,
        "type": "personal_label",
        "update_time": 1700000000
    }
}
```