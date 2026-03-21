# 获取最近使用列表

**GET** `/api/SynologyDrive/default/v2/files/recent`

列出已登录用户最近使用过的项目。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `limit` | integer | ✗ | 返回的最近使用项目数量。（默认值：`200`） |

**示例：**
```
limit=2
```
列出最近使用的 2 个文件。

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/files/recent" \
  -H "accept: application/json" \
  -H "cookie: {sid}"
```

带 limit 参数的示例：

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/files/recent?limit=2" \
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
| `data` | object | 最近使用列表数据 |
| `data.total` | integer | 最近使用项目总数 |
| `data.files` | array | 文件元数据对象数组，结构与 [获取元数据] 接口返回的 data 对象一致 |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "total": 50,
        "files": [
            {
                "file_id": "873048346137239558",
                "name": "recent_document.pdf",
                "type": "file",
                "content_type": "document",
                "size": 1024000,
                "access_time": 1700000000,
                "modified_time": 1700000000,
                "created_time": 1699900000,
                "path": "/mydrive/recent_document.pdf",
                "starred": false,
                "capabilities": {
                    "can_read": true,
                    "can_write": true,
                    "can_delete": true,
                    "can_download": true
                }
            },
            {
                "file_id": "873048346137239559",
                "name": "recent_image.jpg",
                "type": "file",
                "content_type": "image",
                "size": 512000,
                "access_time": 1699990000,
                "modified_time": 1699900000,
                "created_time": 1699800000,
                "path": "/mydrive/recent_image.jpg",
                "starred": true,
                "capabilities": {
                    "can_read": true,
                    "can_write": true,
                    "can_delete": true,
                    "can_download": true
                }
            }
        ]
    }
}
```