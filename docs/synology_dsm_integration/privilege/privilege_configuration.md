## 权限配置

为使您的套件正常工作，套件中必须存在 `conf/privilege` 文件。它控制整个套件生命周期中的安全相关行为。

### 配置示例

```json
{
  "defaults": {
    "run-as": "package"
  },
  "username": "myusername",
  "groupname": "mygroupname",
  "tool": [{
    "relpath": "bin/mytool",
    "user": "package",
    "group": "package",
    "permission": "0700"
  }]
}
```

---

### 配置项说明

#### defaults（必需）

控制整个权限文件的默认设置。只能设置为以下值：

| run-as | 对文件的行为 | 对脚本的行为 |
|--------|-------------|-------------|
| **package** | `chown -hR "${package}:${package}"` | 设置 resuid 为 [username] |
| **root** | `chown -hR "root:root"` | 设置 resuid 为 root |

#### username / groupname（可选，自 6.0-5940）

指定用户名和组名。如果未指定，将使用套件名称作为默认值。

#### ctrl-script（可选）

控制脚本运行时的身份。

```json
"ctrl-script": [{
  "action": "start",
  "run-as": "package"
}]
```

| 成员 | 自版本 | 描述 |
|------|--------|------|
| `action` | 6.0-5891 | 可选值：`preinst`、`postinst`、`preuninst`、`postuninst`、`preupgrade`、`postupgrade`、`start`、`stop`、`status`、`prestart`、`prestop` |
| `run-as` | 6.0-5891 | 参见 defaults 中的 run-as 描述 |

#### executable（可选）

指定安装后特定文件的 chown 身份。

```json
"executable": [{
  "relpath": "bin/mybin",
  "run-as": "package"
}]
```

| 成员 | 自版本 | 描述 |
|------|--------|------|
| `relpath` | 6.0-5891 | 相对于 `/var/packages/[package_name]/target` 的路径 |
| `run-as` | 6.0-5891 | 参见 defaults 中的 run-as 描述 |

#### tool（可选）

指定安装后特定文件的 chown 和 chmod 身份。如果需要，还可以设置文件能力（capabilities）。

```json
"tool": [{
  "relpath": "bin/mytool",
  "user": "package",
  "group": "package",
  "permission": "0700"
}]
```

| 成员 | 自版本 | 描述 |
|------|--------|------|
| `relpath` | 6.0-5891 | 相对于 `/var/packages/${package}/target/` 的路径 |
| `user` | 6.0-5891 | 文件所有者用户，必须为 `"package"` |
| `group` | 6.0-5891 | 文件所有者组，必须为 `"package"` |
| `permission` | 6.0-5891 | 4 位数字设置文件权限，例如 `4750` |
| `capabilities` | 7.0-40656 | capabilities 字符串，不含任何 `+-=eip` 符号，值可参考 Linux capabilities 文档 |

带 capabilities 的示例：

```json
"tool": [{
  "relpath": "bin/mytool",
  "user": "package",
  "group": "package",
  "capabilities": "cap_chown,cap_net_raw",
  "permission": "0700"
}]
```

---

### 套件用户/组在 UI 中的可见性

套件用户和组在大多数 UI 设置中不会显示，但有以下例外：

**不可见（×）：**
- 应用程序权限查看器
- FTP chroot 用户选择器
- File Station
- 更改所有者
- 共享链接管理器 → 启用安全共享

**可见（○）：**
- 控制面板 > 共享文件夹 > 编辑 > 权限 > 系统内部用户
- ACL 编辑器