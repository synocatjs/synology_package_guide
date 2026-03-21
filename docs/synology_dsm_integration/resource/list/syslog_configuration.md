## Syslog 配置

### 描述

在套件启动/停止期间安装/卸载 syslog-ng 和 logrotate 配置文件。

关于如何编写 syslog-ng 配置文件，请参考 syslog-ng 文档。

#### Acquire()（获取资源）
- 将 patterndb / logrotate 文件复制到：
  - `/usr/local/etc/syslog-ng/patterndb.d/`
  - `/usr/local/etc/logrotate.d/`
- 然后重新加载 syslog-ng
- 如果文件已存在，先执行 `unlink()` 删除
- 任何文件复制失败将导致此 worker 中止并触发回滚

#### Release()（释放资源）
- 删除配置文件并重新加载 syslog-ng
- 忽略 `unlink()` 失败

---

### 提供者

DSM

---

### 时机

`FROM_STARTUP_TO_HALT`

---

### 环境变量

无

---

### 可更新

否

---

### 语法

```json
"syslog-config": {
    "patterndb-relpath": "<relpath>",
    "patterninc": [
        {
            "target-dir": "not2msg",
            "conf-relpath": "<relpath>"
        },
        {
            "target-dir": "not2kern",
            "conf-relpath": "<relpath>"
        }
    ],
    "logrotate-relpath": "<relpath>"
}
```

| 成员 | 自版本 | 描述 |
|------|--------|------|
| `patterndb-relpath` | 6.0-7145 | 字符串，syslog-ng 配置文件相对于 `/var/packages/${package}/target/` 的路径。如果日志不是由 syslog-ng 生成，则忽略此字段（可选） |
| `patterninc` | 6.1-7610 | 对象数组，额外的 patterndb-inc 配置列表。定义要安装到 syslog 配置文件夹下指定路径的额外 syslog-ng 配置 |
| `target-dir` | 6.1-7610 | 字符串，在 `/usr/local/etc/syslog-ng/patterndb.d/include/` 下的安装目标路径 |
| `conf-relpath` | 6.1-7610 | 字符串，安装源路径，相对于 `/var/packages/${package}/target/`。通常用于存储额外的 syslog 过滤器 |
| `logrotate-relpath` | 6.0-5911 | 字符串，logrotate 配置文件相对于 `/var/packages/${package}/target/` 的路径。如果日志保存到数据库，则忽略此字段（可选） |

---

### 示例

```json
"syslog-config": {
    "patterndb-relpath": "etc/syslog-ng.conf",
    "patterninc": [
        {
            "target-dir": "not2msg",
            "conf-relpath": "etc/NotLog2Msg"
        },
        {
            "target-dir": "not2kern",
            "conf-relpath": "etc/NotLog2Kern"
        }
    ],
    "logrotate-relpath": "etc/logrotate.conf"
}
```

---

### 目录结构示例

```
target/
└── etc/
    ├── syslog-ng.conf
    ├── NotLog2Msg
    ├── NotLog2Kern
    └── logrotate.conf
```

---

### 安装后的文件位置

| 文件类型 | 源路径 | 目标路径 |
|----------|--------|----------|
| patterndb | `/var/packages/${package}/target/etc/syslog-ng.conf` | `/usr/local/etc/syslog-ng/patterndb.d/${package}-syslog-ng.conf` |
| patterninc | `/var/packages/${package}/target/etc/NotLog2Msg` | `/usr/local/etc/syslog-ng/patterndb.d/include/not2msg/NotLog2Msg` |
| logrotate | `/var/packages/${package}/target/etc/logrotate.conf` | `/usr/local/etc/logrotate.d/${package}-logrotate.conf` |

---

### 日志存储位置

请将套件日志保存在 `/var/packages/[package_id]/var/` 目录下：

```
/var/packages/TextEditor/var/log/texteditor.log
```

---

### 使用场景

- 将套件日志集成到 DSM 系统日志
- 配置日志轮转策略
- 自定义日志过滤规则
- 将不同套件的日志分类存储

---

### 注意事项

- 套件停止时，配置文件会自动从系统目录中移除
- 配置文件语法必须正确，否则可能导致 syslog-ng 重载失败
- 配置错误会导致 worker 中止并回滚所有更改
- `patterninc` 可用于添加额外的日志过滤器
- 日志文件应保存在套件私有目录中，避免与其他套件冲突