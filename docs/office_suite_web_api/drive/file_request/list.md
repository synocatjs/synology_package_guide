## 列出文件请求

**GET** `/api/SynologyDrive/default/v2/file-request`

列出所有文件请求任务。

---

### 请求

#### 查询参数

无查询参数。

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/file-request" \
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
| `data.total` | integer | 文件请求总数 |
| `data.items` | array | 在此 Synology Drive 上创建的文件请求信息列表 |

#### data.items 数组元素字段

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
| `identifier` | string | 标识符。可能的值：<br>`add_prefix`：上传的文件名将添加用户名作为前缀<br>`create_folder`：将使用用户名创建一个文件夹，上传的文件将放入此文件夹 |
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
        "total": 3,
        "items": [
            {
                "file_request_id": "req_001",
                "sharing_link": "https://nas.example.com/file-request/M1vN2fazkgmjP0Ng0ZvP-c9iwmdqTl24-jLrgDOxYvgs",
                "permanent_link": "link:11Hir6FmGS8BFudSaWoqIW2aP9WxLGSQ",
                "title": "Project Files Upload",
                "description": "Please upload your project files here",
                "display_path": "/team-folder/project/uploads",
                "identifier": "create_folder",
                "file_request_status": "active",
                "is_expired": false,
                "due_date": 1700000000,
                "created_time": 1699900000,
                "uid": 1001,
                "url": "https://nas.example.com/file-request/M1vN2fazkgmjP0Ng0ZvP-c9iwmdqTl24-jLrgDOxYvgs",
                "protect_password": ""
            },
            {
                "file_request_id": "req_002",
                "sharing_link": "https://nas.example.com/file-request/OkRRuoIJCjErc-6ULdCi2bbjeQ5gxowF-PbXg-Uyi4ws",
                "permanent_link": "link:22Hir6FmGS8BFudSaWoqIW2aP9WxLGSQ",
                "title": "Marketing Materials",
                "description": "Upload marketing materials here",
                "display_path": "/team-folder/marketing/uploads",
                "identifier": "add_prefix",
                "file_request_status": "inactive",
                "is_expired": true,
                "due_date": 1699900000,
                "created_time": 1699800000,
                "uid": 1002,
                "url": "https://nas.example.com/file-request/OkRRuoIJCjErc-6ULdCi2bbjeQ5gxowF-PbXg-Uyi4ws",
                "protect_password": ""
            }
        ]
    }
}
```