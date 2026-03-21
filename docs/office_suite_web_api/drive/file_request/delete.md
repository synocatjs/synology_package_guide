## 删除文件请求

**DELETE** `/api/SynologyDrive/default/v2/file-request/{sharing_link_id}`

删除一个文件请求。

---

### 请求

#### 路径参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `sharing_link_id` | string | ✓ | 通过创建文件请求或获取文件请求信息获得的共享链接 ID |

**示例：**
```
sharing_link_id=M1vN2fazkgmjP0Ng0ZvP-c9iwmdqTl24-jLrgDOxYvgs
```
删除一个文件请求。

#### cURL 命令示例

```bash
curl -X DELETE "https://{nas_url}/api/SynologyDrive/default/v2/file-request/M1vN2fazkgmjP0Ng0ZvP-c9iwmdqTl24-jLrgDOxYvgs" \
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

- 删除文件请求后，相应的共享链接将失效
- 用户将无法再通过该链接上传文件
- 已上传的文件不会被删除，仍保留在目标文件夹中
- 此操作不可逆，请谨慎使用