## 更新标签

**PUT** `/api/SynologyDrive/default/v2/labels/{label_id}`

使用新名称、新颜色或新排序位置更新现有标签。

---

### 请求

#### 路径参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `label_id` | string | ✓ | 标签 ID |

**示例：**
```
label_id=1
```
更新 ID 为 "1" 的标签，将其名称更改为 "111"，颜色更改为 `#C8EDFA`。

---

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `name` | string | ✗ | 标签名称 |
| `color` | string | ✗ | 标签颜色，6 位十六进制表示，带前导 `#` 号。（默认值：`#000000`） |
| `position` | integer | ✗ | 标签位置。（默认值：`0`） |

#### 请求示例

```json
{
    "name": "111",
    "color": "#C8EDFA"
}
```

#### cURL 命令示例

```bash
curl -X PUT "https://{nas_url}/api/SynologyDrive/default/v2/labels/1" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: {sid}" \
  -d '{"name":"111","color":"#C8EDFA"}'
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data` | object | 更新后的标签信息对象 |

#### data 对象字段

| 字段 | 类型 | 描述 |
|------|------|------|
| `label_id` | string | 标签 ID |
| `name` | string | 标签名称 |
| `color` | string | 标签颜色 |
| `position` | integer | 标签位置 |
| `type` | string | 标签类型 |
| `update_time` | integer | 更新时间（Unix 时间戳） |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "label_id": "1",
        "name": "111",
        "color": "#C8EDFA",
        "position": 0,
        "type": "personal_label",
        "update_time": 1700000000
    }
}
```