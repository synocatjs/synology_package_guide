## 更新元数据

**PUT** `/api/SynologyDrive/default/v2/files`

更新文件的元数据。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `path` | string | ✓ | 文件路径。支持 ID 系统格式 |

**示例：**
```
id:844934352212112874
```
重命名文件为 "345.jpg"

---

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `mute` | boolean | ✗ | 如果为 `true`，此文件操作不会记录到最近访问列表，也不会向用户发送任何通知。（默认值：`false`） |
| `encrypted` | boolean | ✗ | 文件是否已加密 |
| `removed` | boolean | ✗ | 文件是否已移至回收站。此参数主要用于在回收站中创建版本，普通应用程序不应使用 |
| `starred` | array | ✗ | 收藏设置 |
| `starred[].starred` | boolean | ✓ | 是否收藏文件 |
| `starred[].member` | object | ✗ | 编辑时的用户身份。此参数用于允许管理员为用户编辑标签 |
| `labels` | array | ✗ | 要标记的标签 ID 数组 |
| `labels[].label_id` | string | ✗ | 标签 ID。使用 Labels/Get API 获取标签 ID |
| `labels[].name` | string | ✗ | 标签名称 |
| `labels[].action` | string | ✓ | 标签的编辑操作。有效值：`add`、`delete` |
| `labels[].member` | object | ✗ | 编辑时的用户身份。此参数用于允许管理员为用户编辑标签 |
| `modified_time` | integer | ✗ | 最后修改时间（默认值：创建时间） |
| `created_time` | integer | ✗ | 文件创建时间（默认值：服务器当前时间） |
| `access_time` | integer | ✗ | 最后访问时间（默认值：创建时间） |
| `name` | string | ✗ | 文件名称。如果新文件名冲突，将返回名称已存在错误 |

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
    "name": "345.jpg",
    "mute": false,
    "starred": [
        {
            "starred": true
        }
    ]
}
```

#### cURL 命令示例

```bash
curl -X PUT "https://{nas_url}/api/SynologyDrive/default/v2/files?path=id%3A844934352212112874" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: {sid}" \
  -d '{"name":"345.jpg"}'
```

---

### 响应

#### 成功响应 (200)

响应结构与 [获取元数据] 接口相同，返回更新后的完整文件元数据对象。

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data` | object | 更新后的文件元数据对象 |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "file_id": "844934352212112874",
        "name": "345.jpg",
        "type": "file",
        "content_type": "image",
        "size": 1024000,
        "starred": true,
        "modified_time": 1700000000,
        "created_time": 1700000000,
        "path": "/mydrive/345.jpg",
        "capabilities": {
            "can_read": true,
            "can_write": true,
            "can_delete": true,
            "can_rename": true,
            "can_share": true
        }
    }
}
```