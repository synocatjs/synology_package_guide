## 收藏

**POST** `/api/SynologyDrive/default/v2/files/star`

添加或移除一个或多个文件的收藏标记。此 API 提供批量操作，可同时在多个文件上添加或移除收藏。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `starred` | boolean | ✓ | 是否收藏文件 |
| `files` | array | ✓ | 要编辑收藏标记的文件路径数组 |

#### 请求示例

```json
{
    "files": ["/mydrive/123/cat3.jpg", "/mydrive/123/2.jpg"],
    "starred": false
}
```

#### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/SynologyDrive/default/v2/files/star" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: {sid}" \
  -d '{"files":["/mydrive/123/cat3.jpg","/mydrive/123/2.jpg"],"starred":false}'
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    }
}
```

---

### 使用说明

- **添加收藏**：设置 `starred: true`
- **移除收藏**：设置 `starred: false`
- **批量操作**：可以在一个请求中同时处理多个文件