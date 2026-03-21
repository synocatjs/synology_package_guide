# 获取指定标签的项目列表

**GET** `/api/SynologyDrive/default/v2/files/labelled/{label_id}`

列出带有指定标签的项目。

---

### 请求

#### 路径参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `label_id` | string | ✓ | 文件上的标签 ID。使用 Labels/Get API 获取标签 ID |

**示例：**
```
label_id=2
```
列出具有 ID 为 "2" 的标签的文件。

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/files/labelled/2" \
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
| `data` | object | 标签项目列表数据 |
| `data.total` | integer | 带有该标签的项目总数 |
| `data.files` | array | 文件元数据对象数组，结构与 [获取元数据] 接口返回的 data 对象一致 |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "total": 8,
        "files": [
            {
                "file_id": "873048346137239558",
                "name": "important_document.pdf",
                "type": "file",
                "content_type": "document",
                "size": 2048000,
                "labels": [
                    {
                        "label_id": "2",
                        "name": "重要",
                        "color": "#FF0000",
                        "type": "user"
                    }
                ],
                "modified_time": 1700000000,
                "created_time": 1699900000,
                "path": "/mydrive/important_document.pdf",
                "starred": true,
                "capabilities": {
                    "can_read": true,
                    "can_write": true,
                    "can_delete": true,
                    "can_download": true
                }
            },
            {
                "file_id": "873048346137239559",
                "name": "project_folder",
                "type": "dir",
                "content_type": "dir",
                "size": 0,
                "labels": [
                    {
                        "label_id": "2",
                        "name": "重要",
                        "color": "#FF0000",
                        "type": "user"
                    }
                ],
                "modified_time": 1700000000,
                "created_time": 1699900000,
                "path": "/mydrive/project_folder",
                "starred": false,
                "capabilities": {
                    "can_read": true,
                    "can_write": true,
                    "can_delete": true,
                    "can_organize": true
                }
            }
        ]
    }
}
```