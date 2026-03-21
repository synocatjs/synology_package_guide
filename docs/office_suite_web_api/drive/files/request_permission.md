## 请求访问权限

**POST** `/api/SynologyDrive/default/v2/files/request-access`

请求访问文件的权限。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `path` | string | ✓ | 文件路径。支持 ID 系统格式 |

**ID 系统格式：**
- `link:permanent_link` - 永久链接
- `id:file_id` - 文件 ID
- `id:file_id/basename` - 文件 ID 加基础名称
- `/mydrive/{relative-path}` - 我的驱动器中的相对路径
- `/team-folders/{team-folder-name}/{relative-path}` - 团队文件夹中的相对路径
- `/views/{view_id}/{relative-path}` - 视图中的相对路径
- `/volumes/{absolute-path}` - 卷中的绝对路径

**示例：**
```
id:844970262695819228
```
请求访问 ID 为 `844970262695819228` 的文件。

#### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/SynologyDrive/default/v2/files/request-access?path=id%3A844970262695819228" \
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

- 此 API 用于向文件所有者请求访问权限
- 适用于当前用户无权访问但需要申请权限的场景
- 成功请求后，文件所有者将收到通知，并可选择授予或拒绝访问权限
- 仅当文件已共享但用户没有足够权限时使用此 API