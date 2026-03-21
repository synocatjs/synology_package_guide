## 更新共享标签

**POST** `/api/SynologyDrive/default/v2/labels/shared/{label_id}`

使用新名称、新颜色或新排序位置更新现有的共享标签。

---

### 请求

#### 路径参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `label_id` | string | ✓ | 标签 ID |

**示例：**
```
label_id=3
```
更新 ID 为 "3" 的共享标签，修改其名称、颜色和描述。

---

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `name` | string | ✗ | 标签名称 |
| `color` | string | ✗ | 标签颜色，6 位十六进制表示，带前导 `#` 号。（默认值：`#000000`） |
| `description` | string | ✗ | 共享标签的描述 |
| `copy_policy` | integer | ✗ | 复制文件时此共享标签的策略。（默认值：`0`）<br>`0`：始终复制此标签，即使用户没有应用它的权限<br>`1`：仅当用户有权限应用时才复制此标签<br>`2`：不复制此标签 |
| `enabled` | boolean | ✗ | 授权用户访问共享标签的能力。（默认值：`true`） |
| `permission` | integer | ✗ | 共享标签的操作权限。（默认值：`0`）<br>`0`：仅受邀用户可以在他们可访问的文件/文件夹上应用此标签<br>`1`：所有用户可以在他们可访问的文件/文件夹上查看此标签<br>`2`：所有用户可以在他们可访问的文件/文件夹上查看和应用此标签 |
| `invitee_list` | array | ✗ | 受邀者信息数组，用于更新或删除共享标签的操作权限 |
| `invitee_list[].member.name` | string | ✓ | 用户或组的成员名称 |
| `invitee_list[].member.type` | string | ✓ | 成员类型。有效值：`user`、`group` |
| `invitee_list[].action` | string | ✓ | 受邀者记录的编辑操作。有效值：`update`（更新）、`delete`（删除） |
| `invitee_list[].permission` | integer | ✗ | 共享标签的操作权限。当 `action` 为 `update` 时需要。<br>`1`：成员可以在他们可访问的文件/文件夹上查看此标签<br>`2`：成员可以在他们可访问的文件/文件夹上查看和应用此标签 |

#### 请求示例

```json
{
    "name": "my_edited_shared_label",
    "description": "test edit",
    "color": "#499DF2"
}
```

#### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/SynologyDrive/default/v2/labels/shared/3" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: {sid}" \
  -d '{"name":"my_edited_shared_label","description":"test edit","color":"#499DF2"}'
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data` | object | 更新后的共享标签信息对象 |

#### data 对象字段

| 字段 | 类型 | 描述 |
|------|------|------|
| `label_id` | string | 标签 ID |
| `name` | string | 标签名称 |
| `color` | string | 标签颜色 |
| `position` | integer | 标签位置 |
| `type` | string | 标签类型（应为 `shared_label`） |
| `description` | string | 共享标签的描述 |
| `copy_policy` | integer | 复制文件时的策略 |
| `enabled` | boolean | 是否启用 |
| `permission` | integer | 操作权限 |
| `display` | boolean | 是否显示 |
| `update_time` | integer | 更新时间（Unix 时间戳） |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "label_id": "3",
        "name": "my_edited_shared_label",
        "color": "#499DF2",
        "position": 0,
        "type": "shared_label",
        "description": "test edit",
        "copy_policy": 0,
        "enabled": true,
        "permission": 0,
        "display": true,
        "update_time": 1700000000
    }
}
```