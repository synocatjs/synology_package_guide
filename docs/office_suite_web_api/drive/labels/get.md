## 获取标签列表

**GET** `/api/SynologyDrive/default/v2/labels`

获取已登录用户的所有标签。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `offset` | integer | ✗ | 起始位置。（默认值：`0`） |
| `sort_direction` | enum | ✗ | 排序方向。有效值：`desc`（降序）、`asc`（升序）。（默认值：`asc`） |
| `sort_by` | enum | ✗ | 排序字段。（默认值：`position`）<br>**有效值：** `label_id`、`name`、`color`、`uid`、`position`、`update_time` |
| `limit` | integer | ✗ | 返回数量。（默认值：`0` 表示无限制） |

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/labels" \
  -H "accept: application/json" \
  -H "cookie: {sid}"
```

带分页和排序参数的示例：

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/labels?limit=20&offset=0&sort_by=name&sort_direction=asc" \
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
| `data.total` | integer | 标签总数 |
| `data.items` | array | 包含所列标签的数组 |

#### data.items 数组元素字段

| 字段 | 类型 | 描述 |
|------|------|------|
| `update_time` | integer | 更新时间（Unix 时间戳） |
| `type` | string | 标签类型 |
| `position` | integer | 标签位置（默认值：`0`） |
| `color` | string | 标签颜色，6 位十六进制表示，带前导 `#` 号。（默认值：`#000000`） |
| `name` | string | 标签名称 |
| `label_id` | string | 文件上的标签 ID |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "total": 5,
        "items": [
            {
                "label_id": "1",
                "name": "重要",
                "color": "#FF0000",
                "type": "user",
                "position": 0,
                "update_time": 1700000000
            },
            {
                "label_id": "2",
                "name": "工作",
                "color": "#00FF00",
                "type": "user",
                "position": 1,
                "update_time": 1700000000
            },
            {
                "label_id": "3",
                "name": "个人",
                "color": "#0000FF",
                "type": "user",
                "position": 2,
                "update_time": 1700000000
            },
            {
                "label_id": "4",
                "name": "待办",
                "color": "#FFA500",
                "type": "user",
                "position": 3,
                "update_time": 1699900000
            },
            {
                "label_id": "5",
                "name": "已完成",
                "color": "#808080",
                "type": "user",
                "position": 4,
                "update_time": 1699900000
            }
        ]
    }
}
```