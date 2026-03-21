# 获取收藏列表

**GET** `/api/SynologyDrive/default/v2/files/starred`

列出已标记为收藏的项目。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `sort_direction` | enum | ✗ | 排序方向。有效值：`asc`（升序）、`desc`（降序）。（默认值：`asc`） |
| `sort_by` | enum | ✗ | 排序字段。（默认值：`name`）<br>**有效值：** `modified_time`、`size`、`owner`、`type`、`name` |
| `limit` | integer | ✗ | 返回数量。（默认值：`0` 表示无限制） |
| `offset` | integer | ✗ | 起始位置。（默认值：`0`） |

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/files/starred" \
  -H "accept: application/json" \
  -H "cookie: {sid}"
```

带排序和分页参数的示例：

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/files/starred?sort_by=modified_time&sort_direction=desc&limit=10&offset=0" \
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
| `data` | object | 收藏列表数据 |
| `data.total` | integer | 收藏项目总数 |
| `data.files` | array | 文件元数据对象数组，结构与 [获取元数据] 接口返回的 data 对象一致 |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "total": 5,
        "files": [
            {
                "file_id": "873048346137239558",
                "name": "important_document.pdf",
                "type": "file",
                "content_type": "document",
                "size": 2048000,
                "starred": true,
                "modified_time": 1700000000,
                "created_time": 1699900000,
                "path": "/mydrive/important_document.pdf",
                "capabilities": {
                    "can_read": true,
                    "can_write": true,
                    "can_delete": true,
                    "can_download": true
                }
            },
            {
                "file_id": "873048346137239559",
                "name": "favorite_folder",
                "type": "dir",
                "content_type": "dir",
                "size": 0,
                "starred": true,
                "modified_time": 1700000000,
                "created_time": 1699900000,
                "path": "/mydrive/favorite_folder",
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