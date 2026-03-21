# 标签

**POST** `/api/SynologyDrive/default/v2/files/label`

添加或删除一个或多个文件的标签。此 API 提供批量操作，可同时在多个文件上添加或移除多个标签。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `labels` | array | ✓ | 标签编辑操作或标签 ID 数组。`LabelEditAction` 提供添加或删除标签的能力，应用程序也可以直接使用 `label_id` 来添加标签。将此参数留空数组将移除文件的所有标签 |
| `labels[].label_id` | string | ✗ | 标签 ID。使用 Labels/Get API 获取标签 ID |
| `labels[].name` | string | ✗ | 标签名称 |
| `labels[].action` | string | ✓ | 标签的编辑操作。有效值：`add`（添加）、`delete`（删除） |
| `labels[].member` | object | ✗ | 编辑时的用户身份。此参数用于允许管理员为用户编辑标签 |
| `files` | array | ✓ | 文件路径数组，指定要（取消）标记的目标文件 |

#### member 对象字段

| 字段 | 类型 | 描述 |
|------|------|------|
| `gid` | integer | 组的系统 ID |
| `uid` | integer | 用户的系统 ID |
| `name` | string | 用户或组的成员名称（优先级高于 uid 和 gid） |
| `type` | string | 成员类型。有效值：`user`、`group`、`public`、`internal` |

#### 请求示例

```json
{
    "labels": [
        {
            "name": "123",
            "action": "add"
        }
    ],
    "files": ["id:846585977561464157"]
}
```

#### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/SynologyDrive/default/v2/files/label" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: {sid}" \
  -d '{"labels":[{"name":"123","action":"add"}],"files":["id:846585977561464157"]}'
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

1. **添加标签**：设置 `action: "add"`，可指定 `label_id` 或 `name`
2. **删除标签**：设置 `action: "delete"`，可指定 `label_id` 或 `name`
3. **清空所有标签**：将 `labels` 参数设置为空数组 `[]`
4. **批量操作**：可以在一个请求中同时处理多个标签和多个文件