## 删除标签

**DELETE** `/api/SynologyDrive/default/v2/labels/{label_id}`

删除具有指定标签 ID 的标签。

---

### 请求

#### 路径参数

| 参数 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `label_id` | string | ✓ | 标签 ID |

**示例：**
```
label_id=5
```
删除标签 ID 为 "5" 的标签。

#### cURL 命令示例

```bash
curl -X DELETE "https://{nas_url}/api/SynologyDrive/default/v2/labels/5" \
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

- 删除标签后，该标签将从所有文件和文件夹中移除
- 已应用该标签的文件将不再带有此标签
- 此操作不可逆，请谨慎使用
- 只有标签的创建者或管理员可以删除标签