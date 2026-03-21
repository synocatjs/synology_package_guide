## 启用、禁用或配置团队文件夹和 My Drive 设置

**POST** `/api/SynologyDrive/default/v2/admin/team-folder`

在 Synology Drive 中启用、禁用或配置团队文件夹和 My Drive 的设置。

**注意：** 更新已启用的团队文件夹的设置时，请勿包含 `enable_share` 属性，否则请求将被忽略。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `share` | array | ✓ | 共享设置数组 |
| `share[].share_name` | string | ✓ | 要应用设置的团队文件夹名称 |
| `share[].share_enable` | boolean | ✗ | 启用或禁用团队文件夹 |
| `share[].rotate_policy` | string | ✗ | 版本轮转策略。<br>`fifo`：先删除最旧的版本<br>`smart`：使用智能版本控制 |
| `share[].rotate_cnt` | integer | ✗ | 保留的最大版本数（0-32） |
| `share[].rotate_days` | integer | ✗ | 自动删除超过指定天数的版本（0-120） |

#### 请求示例

```json
{
    "share": [
        {
            "rotate_cnt": 8,
            "rotate_policy": "smart",
            "share_enable": true,
            "share_name": "abc",
            "rotate_days": 7
        }
    ]
}
```

#### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/SynologyDrive/default/v2/admin/team-folder" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: {sid}" \
  -d '{"share":[{"rotate_cnt":8,"rotate_policy":"smart","share_enable":true,"share_name":"abc","rotate_days":7}]}'
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

### 错误代码说明

| 代码 | 描述 |
|------|------|
| 401 | 通用错误 |
| 402 | 请求仅允许管理员执行 |
| 403 | 登录用户不允许此请求 |
| 404 | 获取客户端下载链接失败 |
| 405 | 上一个下载任务尚未完成 |
| 406 | 上一个恢复任务尚未完成 |
| 407 | 上一个删除任务尚未完成 |
| 408 | 由于文件冲突，恢复任务失败 |
| 409 | 由于卷已满，恢复任务失败 |
| 500 | 套件已禁用 |
| 501 | 套件未为用户或共享就绪 |
| 502 | 某些卷已满 |
| 503 | 由于数据库迁移，套件已暂停 |
| 600 | 尝试将数据库移动到已满的卷 |
| 601 | 卷不存在 |
| 602 | 卷应为可写状态 |
| 603 | 请求的共享尚未挂载 |
| 604 | 尝试将数据库移动到无效卷 |

---

### 使用说明

- **启用团队文件夹**：设置 `share_enable: true`
- **禁用团队文件夹**：设置 `share_enable: false`
- **配置版本控制**：设置 `rotate_policy`、`rotate_cnt` 和 `rotate_days`
- **更新已启用的团队文件夹**：不要包含 `share_enable` 属性
- **My Drive 设置**：可使用相同的 API 结构配置 My Drive 的设置