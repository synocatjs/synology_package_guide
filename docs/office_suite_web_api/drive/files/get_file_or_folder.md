# 获取文件和文件夹列表

**POST** `/api/SynologyDrive/default/v2/files/list`

获取文件夹中的文件和文件夹列表。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `sort_direction` | enum | ✗ | 排序方向。有效值：`asc`（升序）、`desc`（降序）。（默认值：`asc`） |
| `sort_by` | enum | ✗ | 排序字段。（默认值：`name`）<br>**有效值：** `modified_time`、`size`、`owner`、`type`、`name` |
| `offset` | integer | ✗ | 文件列表的起始位置。（默认值：`0`） |
| `limit` | integer | ✗ | 文件列表数量。（默认值：`0` 表示无限制） |
| `path` | string | ✓ | 文件路径。支持 ID 系统格式 |

**示例：**
```
id:873048346137239557
```
列出路径为 `id:873048346137239557` 且标签 ID 为 "2" 的文件。

---

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 描述 |
|------|------|------|
| `filter` | object | 过滤条件 |
| `filter.extensions` | array | 文件扩展名数组 |
| `filter.type` | array | 文件类型。有效值：`file`、`dir`、`image`。如果指定 `image`，预定义的图片扩展名将与 `extensions` 属性中的值合并以过滤文件扩展名 |
| `filter.label_id` | string | 标签 ID。使用 Labels/Get API 获取标签 ID |
| `filter.starred` | boolean | 是否已收藏 |
| `extra` | array | 额外列表参数。**有效值：** `sync_to_device` |

#### 请求示例

```json
{
    "filter": {
        "label_id": "2"
    }
}
```

#### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/SynologyDrive/default/v2/files/list?path=id%3A873048346137239557" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: {sid}" \
  -d '{"filter":{"label_id":"2"}}'
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data` | object | 文件列表数据 |
| `data.total` | integer | 符合条件的文件总数 |
| `data.files` | array | 文件元数据对象数组，结构与 [获取元数据] 接口返回的 data 对象一致 |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "total": 25,
        "files": [
            {
                "file_id": "873048346137239558",
                "name": "document.pdf",
                "type": "file",
                "content_type": "document",
                "size": 2048000,
                "modified_time": 1700000000,
                "created_time": 1699900000,
                "path": "/mydrive/folder/document.pdf",
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
                "name": "image.jpg",
                "type": "file",
                "content_type": "image",
                "size": 512000,
                "modified_time": 1700000000,
                "created_time": 1699900000,
                "path": "/mydrive/folder/image.jpg",
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