# 获取元数据

**GET** `/api/SynologyDrive/default/v2/files`

获取文件的元数据。

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
/mydrive/123
```
获取位于路径 `/mydrive/123` 的文件。

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/files?path=%2Fmydrive%2F123" \
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
| `data` | object | 文件元数据对象 |

#### data 对象字段

| 字段 | 类型 | 描述 |
|------|------|------|
| `uploaded_size` | integer | 已上传大小（最小值为 0） |
| `watermark_version` | integer | 水印版本号（最小值为 0） |
| `transient` | boolean | 是否为临时文件 |
| `dsm_path` | string | DSM 路径 |
| `adv_shared` | boolean | 是否为高级共享 |
| `enable_watermark` | boolean | 是否启用水印 |
| `force_watermark_download` | boolean | 是否强制水印下载 |
| `support_remote` | boolean | 是否支持远程 |
| `disable_download` | boolean | 是否禁用下载 |
| `app_properties` | object | 应用程序属性 |
| `properties` | object | 属性 |
| `image_metadata.time` | integer | 图片时间戳（UNIX 时间戳） |
| `revisions` | integer | 文件修订版本数量 |
| `content_snippet` | string | 搜索结果中的内容片段高亮 |
| `hash` | string | 文件内容的哈希值 |
| `labels` | array | 附加在此文件上的标签信息数组 |
| `labels[].type` | string | 标签类型 |
| `labels[].color` | string | 标签颜色（6 位十六进制，带 # 号） |
| `labels[].name` | string | 标签名称 |
| `labels[].label_id` | string | 标签 ID |
| `permanent_link` | string | 此文件的永久链接 UUID |
| `owner.uid` | integer | 用户 UID |
| `owner.name` | string | 用户名 |
| `owner.nickname` | string | 用户昵称 |
| `owner.display_name` | string | 用户显示名称 |
| `shared_with` | array | 共享用户权限信息数组 |
| `shared_with[].display_name` | string | 用户显示名称 |
| `shared_with[].nickname` | string | 用户昵称 |
| `shared_with[].inherited` | boolean | 权限是否从父文件夹继承 |
| `shared_with[].role` | enum | 授予的权限角色：`denied`、`viewer`、`commenter`、`editor`、`organizer`、`previewer`、`preview_commenter` |
| `shared_with[].name` | string | 用户或组的成员名称 |
| `shared_with[].type` | enum | 成员类型：`user`、`group`、`public`、`internal` |
| `shared_with[].permission_id` | string | 权限记录 ID |
| `sync_to_device` | boolean | 文件是否被选择同步到设备 |
| `shared` | boolean | 文件是否与他人共享 |
| `starred` | boolean | 用户是否收藏了该文件 |
| `encrypted` | boolean | 文件是否已加密 |
| `removed` | boolean | 文件是否已被移除 |
| `max_id` | integer | 文件夹下的最大同步 ID |
| `change_id` | integer | 文件夹下的变更 ID |
| `sync_id` | integer | 同步 ID |
| `version_id` | integer | 文件的当前版本号 |
| `capabilities.can_download` | boolean | 是否可以下载 |
| `capabilities.can_sync` | boolean | 是否可以同步 |
| `capabilities.can_organize` | boolean | 用户是否有完整权限 |
| `capabilities.can_rename` | boolean | 是否可以重命名 |
| `capabilities.can_encrypt` | boolean | 是否可以加密 |
| `capabilities.can_share` | boolean | 是否可以修改共享权限 |
| `capabilities.can_delete` | boolean | 是否可以删除 |
| `capabilities.can_comment` | boolean | 是否可以评论 |
| `capabilities.can_write` | boolean | 是否可以写入元数据或内容 |
| `capabilities.can_preview` | boolean | 是否可以预览（非下载） |
| `capabilities.can_read` | boolean | 是否可以读取元数据或内容 |
| `size` | integer | 文件大小（最小值为 0） |
| `change_time` | integer | 最后变更时间（UNIX 时间戳） |
| `modified_time` | integer | 最后修改时间（UNIX 时间戳） |
| `access_time` | integer | 最后访问时间（UNIX 时间戳） |
| `created_time` | integer | 创建时间（UNIX 时间戳） |
| `parent_id` | string | 父文件夹 ID |
| `content_type` | enum | 文件内容类型：`dir`、`document`、`image`、`audio`、`video`、`file` |
| `type` | enum | 文件类型：`file`、`dir` |
| `name` | string | 文件名称 |
| `display_path` | string | 当前用户可以访问的可用路径 |
| `path` | string | 当前类别导航中的文件路径 |
| `file_id` | string | 文件 ID |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "file_id": "1234567890",
        "name": "example.docx",
        "type": "file",
        "content_type": "document",
        "size": 1024000,
        "created_time": 1700000000,
        "modified_time": 1700000000,
        "path": "/mydrive/example.docx",
        "display_path": "/mydrive/example.docx",
        "shared": false,
        "starred": false,
        "encrypted": false,
        "capabilities": {
            "can_read": true,
            "can_write": true,
            "can_delete": true,
            "can_share": true,
            "can_download": true
        }
    }
}
```