# 删除文件或文件夹

**POST** `/api/SynologyDrive/default/v2/files/delete`

将文件或文件夹（包括子目录）移动到回收站。此 API 是异步的，会立即返回一个异步任务 ID，并在后台运行任务。

---

## 请求

### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `permanent` | boolean | ✗ | 是否永久删除文件。（默认值：`false`） |
| `files` | array | ✓ | 要移动的文件路径数组 |

### 请求示例

```json
{
    "files": ["/mydrive/123/1"],
    "permanent": false
}
```

### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/SynologyDrive/default/v2/files/delete" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: {sid}" \
  -d '{"files":["/mydrive/123/1"]}'
```

---

## 响应

### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data.async_task_id` | string | 异步任务 ID |

### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "async_task_id": "task_id_here"
    }
}
```