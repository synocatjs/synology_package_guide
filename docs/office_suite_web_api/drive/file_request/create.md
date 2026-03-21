## 创建文件请求

**POST** `/api/SynologyDrive/default/v2/file-request`

创建文件请求，以便从您的朋友那里收集文件。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `identifier` | string | ✗ | 标识符。（默认值：`create_folder`）<br>**可能的值：**<br>`add_prefix`：上传的文件名将添加用户名作为前缀<br>`create_folder`：将使用用户名创建一个文件夹，上传的文件将放入此文件夹 |
| `due_date` | integer | ✗ | 截止日期，以秒为单位的 Unix 时间戳表示 |
| `protect_password` | string | ✗ | 保护文件请求的密码。用户在文件请求页面需要输入正确的密码才能上传文件 |
| `description` | string | ✗ | 文件请求的描述，将在访问文件请求页面时显示 |
| `title` | string | ✓ | 文件请求的标题 |
| `path` | string | ✓ | 指定要在 Synology Drive 中创建文件请求的目标文件夹。使用 Drive 文件路径格式 |

#### 请求示例

```json
{
    "description": "I would like to invite you guys to upload the photos of the Offsite Training.",
    "protect_password": "1234",
    "path": "id:846211274365778545",
    "title": "File Request API test"
}
```

#### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/SynologyDrive/default/v2/file-request" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: {sid}" \
  -d '{"description":"I would like to invite you guys to upload the photos of the Offsite Training.","protect_password":"1234","path":"id:846211274365778545","title":"File Request API test"}'
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data` | object | 创建的文件请求信息对象 |

#### data 对象字段

| 字段 | 类型 | 描述 |
|------|------|------|
| `display_path` | string | 显示路径 |
| `is_expired` | boolean | 是否已过期 |
| `uid` | integer | 用户 UID |
| `url` | string | URL 地址 |
| `title` | string | 标题 |
| `sharing_link` | string | 共享链接 |
| `protect_password` | string | 保护密码 |
| `permanent_link` | string | 永久链接 |
| `identifier` | string | 标识符。可能的值：`add_prefix`、`create_folder` |
| `file_request_status` | string | 文件请求状态 |
| `file_request_id` | string | 文件请求 ID |
| `due_date` | integer | 截止日期（Unix 时间戳） |
| `description` | string | 描述 |
| `created_time` | integer | 创建时间（Unix 时间戳） |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "file_request_id": "req_new_001",
        "sharing_link": "https://nas.example.com/file-request/M1vN2fazkgmjP0Ng0ZvP-c9iwmdqTl24-jLrgDOxYvgs",
        "permanent_link": "link:11Hir6FmGS8BFudSaWoqIW2aP9WxLGSQ",
        "title": "File Request API test",
        "description": "I would like to invite you guys to upload the photos of the Offsite Training.",
        "display_path": "/mydrive/uploads",
        "identifier": "create_folder",
        "file_request_status": "active",
        "is_expired": false,
        "due_date": 0,
        "created_time": 1700000000,
        "uid": 1001,
        "url": "https://nas.example.com/file-request/M1vN2fazkgmjP0Ng0ZvP-c9iwmdqTl24-jLrgDOxYvgs",
        "protect_password": "1234"
    }
}
```