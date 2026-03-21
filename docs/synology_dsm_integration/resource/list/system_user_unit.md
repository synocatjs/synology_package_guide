## Systemd User Unit

### 描述

套件框架会在 Acquire 时将 `conf/systemd/pkguser-[customname]` 下的文件复制到 `~/.config/systemd/user/`，并在 Release 时将其删除。

**注意**：用户单元不能与普通系统单元相关联。如果您的套件需要与系统服务关联，请参考 `start_dep_services`。

套件应在脚本中使用 `synosystemctl start` 和 `synosystemctl stop` 来控制用户单元。

---

### 额外说明

如果您需要在系统中使用系统级 systemd 单元，可以直接将单元文件放在 `conf/systemd/pkg-[customname]` 下，无需使用此 `systemd-user-unit` worker。

套件框架会在 Acquire 时将系统单元复制到 `/usr/local/lib/systemd/system`，并在 Release 时将其删除。

---

### 提供者

DSM

---

### 自版本

7.0-40761

---

### 时机

`FROM_POSTINST_TO_POSTUNINST`

---

### 语法

```json
"systemd-user-unit": {}
```

---

### 目录结构示例

```
target/
└── conf/
    └── systemd/
        ├── pkguser-myapp/
        │   ├── myapp.service
        │   └── myapp.timer
        └── pkg-myapp/
            ├── myapp-system.service
            └── myapp-system.timer
```

---

### 安装后的文件位置

| 类型 | 源路径 | 目标路径 |
|------|--------|----------|
| 用户单元 | `/var/packages/${package}/target/conf/systemd/pkguser-[customname]/` | `~/.config/systemd/user/` |
| 系统单元 | `/var/packages/${package}/target/conf/systemd/pkg-[customname]/` | `/usr/local/lib/systemd/system` |

---

### 控制命令

在套件脚本中使用以下命令控制用户单元：

```bash
# 启动用户单元
synosystemctl start --user myapp.service

# 停止用户单元
synosystemctl stop --user myapp.service

# 查看状态
synosystemctl status --user myapp.service

# 启用自启动
synosystemctl enable --user myapp.service

# 禁用自启动
synosystemctl disable --user myapp.service
```

---

### 使用场景

- 运行用户级别的后台服务
- 用户定时任务（timer）
- Socket 激活的服务
- 路径激活的服务
- 不依赖系统服务的轻量级守护进程

---

### 用户单元 vs 系统单元

| 特性 | 用户单元 | 系统单元 |
|------|----------|----------|
| 目录 | `conf/systemd/pkguser-*` | `conf/systemd/pkg-*` |
| 安装位置 | `~/.config/systemd/user/` | `/usr/local/lib/systemd/system` |
| 作用域 | 特定用户 | 系统全局 |
| 权限 | 用户权限 | root 权限 |
| 开机启动 | 用户登录后 | 系统启动时 |
| 控制命令 | `synosystemctl --user` | `synosystemctl` |

---

### 注意事项

- 用户单元仅在用户登录后才会启动
- 多个用户可以各自运行独立的用户单元实例
- 用户单元不能依赖系统单元
- 如果需要依赖系统服务（如网络、数据库），应使用 `start_dep_services` 或在系统单元中处理
- 单元文件名称应避免与系统已有单元冲突
- 使用 `synosystemctl` 而非原生 `systemctl` 命令以确保兼容性