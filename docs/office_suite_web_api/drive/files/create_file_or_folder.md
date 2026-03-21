# 创建文件或文件夹

**POST** `/api/SynologyDrive/default/v2/files`

此 API 允许应用程序直接使用 Base64 编码内容创建文件，仅支持最大 1MB 的内容。对于更大的文件，请使用上传 API。

---

## 请求

### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `mute` | boolean | ✗ | 如果为 `true`，此文件操作不会记录到最近访问列表，也不会向用户发送任何通知。（默认值：`false`） |
| `conflict_action` | string | ✗ | 当目标文件夹中存在文件名冲突时的回退操作。有效值：`overwrite`、`autorename`、`stop`。（默认值：`stop`） |
| `permanent_link` | string | ✗ | 此文件的永久链接 UUID（默认值：自动生成） |
| `encrypted` | boolean | ✗ | 文件是否已加密 |
| `removed` | boolean | ✗ | 文件是否已移至回收站。此参数主要用于在回收站中创建版本，普通应用程序不应使用。（默认值：`false`） |
| `type` | string | ✓ | 文件类型。有效值：`file`、`folder` |
| `path` | string | ✓ | 文件路径。支持 ID 系统格式 |

**示例：**
```
/mydrive/abc
```
在 `/mydrive` 下创建名为 "abc" 的文件夹。

---

### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `file_content` | string | ✗ | Base64 编码的文件内容。此字段支持最大 1MB 的大小 |
| `labels` | array | ✗ | 要标记的标签 ID 数组。此参数主要用于迁移。（默认值：无） |
| `labels[].label_id` | string | ✗ | 标签 ID。使用 Labels/Get API 获取标签 ID |
| `labels[].name` | string | ✗ | 标签名称 |
| `labels[].action` | string | ✓ | 标签的编辑操作。有效值：`add`、`delete` |
| `labels[].member` | object | ✗ | 编辑时的用户身份。此参数用于允许管理员为用户编辑标签 |
| `modified_time` | integer | ✗ | 最后修改时间（默认值：创建时间） |
| `access_time` | integer | ✗ | 最后访问时间（默认值：创建时间） |
| `created_time` | integer | ✗ | 文件创建时间（默认值：服务器当前时间） |

### member 对象字段

| 字段 | 类型 | 描述 |
|------|------|------|
| `gid` | integer | 组的系统 ID |
| `uid` | integer | 用户的系统 ID |
| `name` | string | 用户或组的成员名称（优先级高于 uid 和 gid） |
| `type` | string | 成员类型。有效值：`user`、`group`、`public`、`internal` |

### 请求示例

```json
{
    "modified_time": 1738734842
}
```

### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/SynologyDrive/default/v2/files?type=folder&path=%2Fmydrive%2Fabc" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: {sid}" \
  -d '{"modified_time":1738734842}'
```

---

## 响应

### 成功响应 (200)

响应结构与 [获取元数据] 接口相同，返回新创建的文件或文件夹的完整元数据对象。

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data` | object | 新创建的文件或文件夹元数据对象 |

### 响应示例（创建文件夹）

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "file_id": "844934352212112875",
        "name": "abc",
        "type": "dir",
        "content_type": "dir",
        "size": 0,
        "created_time": 1738734842,
        "modified_time": 1738734842,
        "path": "/mydrive/abc",
        "parent_id": "root_folder_id",
        "capabilities": {
            "can_read": true,
            "can_write": true,
            "can_delete": true,
            "can_rename": true,
            "can_organize": true
        }
    }
}
```

### 响应示例（创建文件）

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "file_id": "844934352212112876",
        "name": "example.txt",
        "type": "file",
        "content_type": "file",
        "size": 1024,
        "hash": "abc123def456",
        "created_time": 1738734842,
        "modified_time": 1738734842,
        "path": "/mydrive/example.txt",
        "parent_id": "root_folder_id",
        "capabilities": {
            "can_read": true,
            "can_write": true,
            "can_delete": true,
            "can_rename": true,
            "can_download": true
        }
    }
}
```