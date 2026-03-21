# 搜索

**POST** `/api/SynologyDrive/default/v2/files/search`

按名称、日期、标签或位置搜索文件。后端搜索引擎与 Synology Universal Search 集成。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `sort_direction` | string | ✗ | 排序方向。有效值：`desc`（降序）、`asc`（升序）。（默认值：`asc`） |
| `sort_by` | string | ✗ | 排序字段。（默认值：`score`） |
| `limit` | integer | ✗ | 返回数量。（默认值：`1000`） |
| `offset` | integer | ✗ | 起始位置。（默认值：`0`） |

---

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `content_snippet` | boolean | ✗ | 是否在搜索结果中提取文件内容片段。（默认值：`false`） |
| `max_size` | integer | ✗ | 文件最大大小 |
| `min_size` | integer | ✗ | 文件最小大小 |
| `end_date` | integer | ✗ | 最后修改时间范围的结束时间（Unix 时间戳） |
| `start_date` | integer | ✗ | 最后修改时间范围的开始时间（Unix 时间戳） |
| `time` | string | ✗ | 用于搜索的时间字段。有效值：`created_time`、`modified_time` |
| `labels` | array | ✗ | 要搜索的标签 ID 数组 |
| `custom_owner` | object | ✗ | 自定义所有者信息 |
| `custom_owner.gid` | integer | ✗ | 组的系统 ID |
| `custom_owner.uid` | integer | ✗ | 用户的系统 ID |
| `custom_owner.name` | string | ✗ | 用户或组的成员名称（优先级高于 uid 和 gid） |
| `custom_owner.type` | string | ✗ | 成员类型。有效值：`user`、`group`、`public`、`internal` |
| `owner` | string | ✗ | 文件所有者。有效值：`any`（任意）、`me`（我）、`not_me`（非我）、`custom`（自定义）。（默认值：`any`） |
| `location` | string | ✗ | 搜索位置。有效值：`any`（任意）、`mydrive`（我的驱动器）、`team_folders`（团队文件夹）、`shared_with_me`（与我共享）、`shared_with_others`（与他人共享）、`starred`（收藏）、`custom`（自定义）及有效路径格式。（默认值：`any`） |
| `custom_file_type` | string | ✗ | 自定义文件类型 |
| `file_type` | string | ✗ | 文件类型。有效值：`any`、`file`、`folder`、`document`、`audio`、`image`、`video`、`odoc`、`osheet`、`oslides`、`custom`。（默认值：`any`） |
| `keyword` | string | ✗ | 搜索关键词 |

#### 请求示例

```json
{
    "keyword": "3.jpg",
    "location": "mydrive"
}
```

#### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/SynologyDrive/default/v2/files/search" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: {sid}" \
  -d '{"keyword":"3.jpg","location":"mydrive"}'
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data` | object | 搜索结果数据 |
| `data.total` | integer | 搜索结果总数 |
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
                "name": "3.jpg",
                "type": "file",
                "content_type": "image",
                "size": 512000,
                "content_snippet": "...image content preview...",
                "modified_time": 1700000000,
                "created_time": 1699900000,
                "path": "/mydrive/images/3.jpg",
                "starred": false,
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