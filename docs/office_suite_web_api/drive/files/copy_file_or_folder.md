# 复制文件或文件夹

**POST** `/api/SynologyDrive/default/v2/files/copy`

将文件或文件夹（包括子目录）复制到另一个父文件夹。此 API 是异步的，会立即返回一个异步任务 ID，并在后台运行任务。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `files` | array | ✓ | 要复制的文件路径数组 |
| `dry_run` | boolean | ✗ | 预演复制操作，不实际执行文件系统操作。如果设置为 `true`，将报告可安全复制的文件或返回目标文件夹中的冲突文件。（默认值：`false`） |
| `to_parent_folder` | string | ✓ | 目标父文件夹路径 |
| `conflict_action` | enum | ✗ | 当目标文件夹中存在文件名冲突时的回退操作。（默认值：`autorename`）<br>**有效值：** `overwrite`（覆盖）、`autorename`（自动重命名）、`stop`（停止）、`version`（版本）、`skip`（跳过） |

#### 请求示例

```json
{
    "to_parent_folder": "/mydrive/test",
    "files": ["/mydrive/123/2.jpg"],
    "dry_run": false,
    "conflict_action": "autorename"
}
```

#### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/SynologyDrive/default/v2/files/copy" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: {sid}" \
  -d '{"to_parent_folder":"/mydrive/test","files":["/mydrive/123/2.jpg"]}'
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data.async_task_id` | string | 异步任务 ID |

#### 响应示例

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