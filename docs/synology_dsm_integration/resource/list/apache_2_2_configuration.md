## Apache 2.2 配置

### 描述

套件可以为 Apache HTTP Server 2.2 携带 `sites-enabled/*.conf` 配置文件。此 worker 在套件启动/停止时安装/卸载这些配置文件。

---

### 行为说明

#### Acquire()（获取资源）
- 将配置文件复制到 `/usr/local/etc/httpd/sites-enabled/`
- 然后重新加载 Apache 2.2
- 文件必须具有 `.conf` 扩展名，否则将被忽略
- 文件会以 `${package}` 作为前缀命名
- 如果文件已存在，将先执行 `unlink()` 删除
- 任何文件复制失败将导致此 worker 中止并触发回滚

#### Release()（释放资源）
- 删除之前创建的链接
- 忽略找不到的文件
- 忽略 `unlink()` 失败

---

### 提供者

WebStation

---

### 时机

`FROM_ENABLE_TO_DISABLE`

---

### 环境变量

无

---

### 可更新

否

---

### 语法

```json
"apache22": {
    "sites-enabled": [{
        "relpath": "<conf-relpath>"
    }, ...]
}
```

| 成员 | 自版本 | 描述 |
|------|--------|------|
| `sites-enabled` | WebStation-1.0-0049 | 对象数组，要安装的配置文件列表 |
| `relpath` | WebStation-1.0-0049 | 目标文件相对于 `/var/packages/${package}/target/` 的路径 |

---

### 示例

#### 配置

```json
{
    "apache22": {
        "sites-enabled": [{
            "relpath": "synology_added/test_1.conf"
        }, {
            "relpath": "synology_added/test_2.conf"
        }, {
            "relpath": "synology_added/test_3.conf"
        }]
    }
}
```

---

### 使用场景

- 为 Web 应用程序添加 Apache 虚拟主机配置
- 添加 URL 重写规则
- 配置访问控制
- 设置反向代理规则

---

### 注意事项

- 文件将被重命名，添加 `${package}` 前缀以避免冲突
- 配置文件必须符合 Apache 2.2 的语法规范
- 配置错误可能导致 Apache 重载失败，触发回滚
- 套件卸载时，配置文件会自动从 `sites-enabled/` 目录中移除