## 更新文件请求

**PUT** `/api/SynologyDrive/default/v2/file-request/{sharing_link_id}`

更新文件请求链接的设置。

---

### 请求

#### 路径参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `sharing_link_id` | string | ✓ | 文件请求的共享链接 ID |

**示例：**
```
sharing_link_id=OkRRuoIJCjErc-6ULdCi2bbjeQ5gxowF-PbXg-Uyi4ws
```
将文件请求的标题从 "ABC" 更新为 "DEF"。

---

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `identifier` | string | ✗ | 标识符。（默认值：`create_folder`）<br>**可能的值：**<br>`add_prefix`：上传的文件名将添加用户名作为前缀<br>`create_folder`：将使用用户名创建一个文件夹，上传的文件将放入此文件夹 |
| `due_date` | integer | ✗ | 文件请求链接的截止日期。如果设置为 `0`，表示无过期日期（即永久有效） |
| `file_request_status` | string | ✗ | 设置状态为 `active`（活跃）或 `inactive`（非活跃）<br>`active`：用户可通过此文件请求上传文件<br>`inactive`：用户不可通过此文件请求上传文件 |
| `protect_password` | string | ✗ | 进入请求上传页面的密码 |
| `description` | string | ✗ | 描述，将在用户进入请求上传页面时显示 |
| `title` | string | ✗ | 文件请求标题，将在用户进入请求上传页面时显示 |
| `path` | string | ✓ | 文件请求的上传目标文件夹。路径格式必须遵循 `id:${permanent_id}` 或 `link:${permanent_link}`，例如：`id:817589748261499056`。永久 ID（file_id）可从文件信息中获取 |

#### 请求示例

```json
{
    "path": "link:11Hir6FmGS8BFudSaWoqIW2aP9WxLGSQ",
    "title": "DEF"
}
```

#### cURL 命令示例

```bash
curl -X PUT "https://{nas_url}/api/SynologyDrive/default/v2/file-request/OkRRuoIJCjErc-6ULdCi2bbjeQ5gxowF-PbXg-Uyi4ws" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: {sid}" \
  -d '{"path":"link:11Hir6FmGS8BFudSaWoqIW2aP9WxLGSQ","title":"DEF"}'
```

---

### 响应

#### 成功响应 (200)

响应结构与 [获取文件请求信息] 接口相同。

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data` | object | 更新后的文件请求信息对象 |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "file_request_id": "req_001",
        "sharing_link": "https://nas.example.com/file-request/OkRRuoIJCjErc-6ULdCi2bbjeQ5gxowF-PbXg-Uyi4ws",
        "permanent_link": "link:11Hir6FmGS8BFudSaWoqIW2aP9WxLGSQ",
        "title": "DEF",
        "description": "",
        "display_path": "/mydrive/uploads",
        "identifier": "create_folder",
        "file_request_status": "active",
        "is_expired": false,
        "due_date": 0,
        "created_time": 1699900000,
        "uid": 1001,
        "url": "https://nas.example.com/file-request/OkRRuoIJCjErc-6ULdCi2bbjeQ5gxowF-PbXg-Uyi4ws",
        "protect_password": ""
    }
}
```