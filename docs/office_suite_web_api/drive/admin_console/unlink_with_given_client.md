## 解除客户端连接

**POST** `/api/SynologyDrive/default/v2/admin/client`

解除与指定客户端的连接。

---

### 请求

#### 请求体

**Content-Type:** `application/json`

| 字段 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `client_sess_id` | array | ✓ | 客户端会话 ID 数组。可通过 `GET /admin/client` 获取 |

#### 请求示例

```json
{
    "client_sess_id": ["80408dec99d4eb3c097e92772aba8d42"]
}
```

#### cURL 命令示例

```bash
curl -X POST "https://{nas_url}/api/SynologyDrive/default/v2/admin/client" \
  -H "accept: application/json" \
  -H "content-type: application/json" \
  -H "cookie: {sid}" \
  -d '{"client_sess_id":["80408dec99d4eb3c097e92772aba8d42"]}'
```

---

### 响应

#### 成功响应 (200)

| 字段 | 类型 | 描述 |
|------|------|------|
| `success` | boolean | 表示请求是否成功 |
| `error.code` | integer | 错误代码（仅在请求失败时返回） |
| `data.total` | integer | 处理的连接总数 |
| `data.items` | array | 处理结果数组 |

#### 响应示例

```json
{
    "success": true,
    "error": {
        "code": 0
    },
    "data": {
        "total": 1,
        "items": [
            {
                "client_sess_id": "80408dec99d4eb3c097e92772aba8d42",
                "status": "success"
            }
        ]
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

- 此 API 用于强制断开指定客户端的连接
- 断开后，客户端需要重新认证才能再次连接
- 支持批量操作，可同时断开多个客户端连接
- 只有管理员可以执行此操作