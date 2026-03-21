## 获取共享标签

**GET** `/api/SynologyDrive/default/v2/labels/shared`

获取已登录用户的所有共享标签。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `owned_by_me` | boolean | ✗ | 列出当前用户拥有的共享标签 |

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/labels/shared" \
  -H "accept: application/json" \
  -H "cookie: {sid}"
```

获取当前用户拥有的共享标签：

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/labels/shared?owned_by_me=true" \
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
| `data.total` | integer | 共享标签总数 |
| `data.items` | array | 包含所列共享标签的数组 |

#### data.items 数组元素字段

| 字段 | 类型 | 描述 |
|------|------|------|
| `label_id` | string | 标签 ID |
| `name` | string | 标签名称 |
| `color` | string | 标签颜色，6 位十六进制表示，带前导 `#` 号 |
| `position` | integer | 标签位置 |
| `type` | string | 标签类型（应为 `shared_label`） |
| `description` | string | 共享标签的描述 |
| `copy_policy` | integer | 复制文件时的策略：<br>`0`：始终复制<br>`1`：仅当用户有权限时复制<br>`2`：不复制 |
| `enabled` | boolean | 授权用户是否可以访问此共享标签 |
| `permission` | integer | 共享标签的操作权限：<br>`0`：仅受邀用户可应用<br>`1`：所有用户可查看<br>`2`：所有用户可查看和应用 |
| `owner` | object | 标签所有者信息 |
| `owner.uid` | integer | 所有者 UID |
| `owner.name` | string | 所有者用户名 |
| `owner.display_name` | string | 所有者显示名称 |
| `invitee_list` | array | 受邀者列表 |
| `update_time` | integer | 更新时间（Unix 时间戳） |
| `create_time` | integer | 创建时间（Unix 时间戳） |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "total": 2,
        "items": [
            {
                "label_id": "shared_001",
                "name": "Team Project",
                "color": "#FF6600",
                "position": 0,
                "type": "shared_label",
                "description": "标签用于团队项目文件",
                "copy_policy": 1,
                "enabled": true,
                "permission": 2,
                "owner": {
                    "uid": 1001,
                    "name": "john_doe",
                    "display_name": "John Doe"
                },
                "invitee_list": [
                    {
                        "member": {
                            "name": "jane_smith",
                            "type": "user"
                        },
                        "permission": 2
                    },
                    {
                        "member": {
                            "name": "engineering_team",
                            "type": "group"
                        },
                        "permission": 1
                    }
                ],
                "update_time": 1700000000,
                "create_time": 1699900000
            },
            {
                "label_id": "shared_002",
                "name": "Marketing",
                "color": "#00AABB",
                "position": 1,
                "type": "shared_label",
                "description": "市场部文件标签",
                "copy_policy": 0,
                "enabled": true,
                "permission": 1,
                "owner": {
                    "uid": 1002,
                    "name": "jane_smith",
                    "display_name": "Jane Smith"
                },
                "invitee_list": [],
                "update_time": 1699900000,
                "create_time": 1699800000
            }
        ]
    }
}
```