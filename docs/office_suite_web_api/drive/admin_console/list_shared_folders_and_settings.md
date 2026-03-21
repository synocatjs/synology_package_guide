## 列出共享文件夹和设置

**GET** `/api/SynologyDrive/default/v2/admin/available-team-folder`

列出设备上可启用为 Synology Drive 团队文件夹的共享文件夹，或已启用的团队文件夹的设置。

---

### 请求

#### 查询参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `offset` | integer | ✗ | 跳过前 N 个共享文件夹。（默认值：`0`） |
| `limit` | integer | ✗ | 最多列出 N 个共享文件夹。（默认值：`0` 表示无限制） |
| `sort_by` | enum | ✗ | 排序字段。<br>**有效值：** `share_name`、`share_status`、`rotate_cnt`、`rotate_policy`、`disable_download`、`enable_watermark` |
| `sort_direction` | string | ✗ | 排序方向。有效值：`ASC`（升序）、`DESC`（降序） |
| `query` | string | ✗ | 按前缀过滤共享文件夹 |

#### cURL 命令示例

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/admin/available-team-folder" \
  -H "accept: application/json" \
  -H "cookie: {sid}"
```

带分页和排序参数的示例：

```bash
curl -X GET "https://{nas_url}/api/SynologyDrive/default/v2/admin/available-team-folder?offset=0&limit=50&sort_by=share_name&sort_direction=ASC" \
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
| `data.total` | integer | 共享文件夹总数 |
| `data.items` | array | 共享文件夹信息数组 |

#### data.items 数组元素字段

| 字段 | 类型 | 描述 |
|------|------|------|
| `share_name` | string | 共享文件夹名称 |
| `share_status` | string | 共享状态（如 `enabled`、`disabled`） |
| `rotate_cnt` | integer | 保留的最大版本数 |
| `rotate_policy` | string | 版本轮转策略：`fifo`（先进先出）、`smart`（智能） |
| `rotate_days` | integer | 自动删除超过指定天数的版本 |
| `disable_download` | boolean | 是否禁用下载 |
| `enable_watermark` | boolean | 是否启用水印 |
| `enable_versioning` | boolean | 是否启用版本控制 |
| `volume_name` | string | 卷名称 |
| `volume_status` | string | 卷状态 |
| `volume_free_space` | integer | 卷可用空间（字节） |
| `volume_total_space` | integer | 卷总空间（字节） |

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
                "share_name": "Marketing",
                "share_status": "enabled",
                "rotate_cnt": 10,
                "rotate_policy": "smart",
                "rotate_days": 30,
                "disable_download": false,
                "enable_watermark": false,
                "enable_versioning": true,
                "volume_name": "volume1",
                "volume_status": "normal",
                "volume_free_space": 107374182400,
                "volume_total_space": 1073741824000
            },
            {
                "share_name": "Engineering",
                "share_status": "enabled",
                "rotate_cnt": 20,
                "rotate_policy": "fifo",
                "rotate_days": 60,
                "disable_download": false,
                "enable_watermark": false,
                "enable_versioning": true,
                "volume_name": "volume1",
                "volume_status": "normal",
                "volume_free_space": 107374182400,
                "volume_total_space": 1073741824000
            },
            {
                "share_name": "Sales",
                "share_status": "disabled",
                "rotate_cnt": 0,
                "rotate_policy": "fifo",
                "rotate_days": 0,
                "disable_download": false,
                "enable_watermark": false,
                "enable_versioning": false,
                "volume_name": "volume2",
                "volume_status": "normal",
                "volume_free_space": 536870912000,
                "volume_total_space": 1073741824000
            }
        ]
    }
}
```