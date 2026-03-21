# 获取文件请求信息

**GET** `/api/SynologyDrive/default/v2/file-request/{sharing_link_id}`

使用指定的链接 ID 获取与文件请求任务相关的信息。

---

### 请求

#### 路径参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `sharing_link_id` | string | ✓ | 共享链接 ID |

**示例：**
```
sharing_link_id=M1vN2fazkgmjP0Ng0ZvP-c9iwmdqTl24-jLrgDOxYvgs
```
获取已创建的文件请求信息。

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/file-request/M1vN2fazkgmjP0Ng0ZvP-c9iwmdqTl24-jLrgDOxYvgs" \
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
| `data` | object | 文件请求信息对象 |

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
        "file_request_id": "req_001",
        "sharing_link": "https://nas.example.com/file-request/M1vN2fazkgmjP0Ng0ZvP-c9iwmdqTl24-jLrgDOxYvgs",
        "permanent_link": "https://nas.example.com/share/abc123",
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
    }
}
```