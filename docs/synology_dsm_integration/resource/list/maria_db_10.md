## Maria DB 10

### 描述

此 worker 在以下时机注册：

#### PREINST / PREUNINST
检查用户/向导提供的资源规范，以避免在其他时机失败。

#### POSTINST / POSTUNINST
当套件意图执行以下操作时，执行多个阶段：

**POSTINST（安装和升级）**
- `migrate-db`：从 MariaDB 5 迁移数据库到 MariaDB 10（通常用于升级）
- `create-db`：创建数据库
- `grant-user`：创建用户
- `drop-db-inst`：删除旧数据库（通常用于数据库迁移）

**POSTUNINST（卸载）**（更新时不运行）
- `drop-db-uninst`：删除数据库
- `drop-user-uninst`：删除用户（如果多个套件共享同一用户，不应使用此选项）

如果 worker 在任何阶段失败，worker 框架将回滚已执行的操作。

---

### 提供者

MariaDB10 套件

---

### 时机

- `FROM_PREINST_TO_PREUNINST`
- `FROM_POSTINST_TO_POSTUNINST`

---

### 环境变量

无

---

### 可更新

否

---

### 语法

```json
"mariadb10-db": {
    "admin-account-m10": "<db account>",
    "admin-pw-m10": "<db password>",
    "admin-account-m5": "<m5 db account>",
    "admin-pw-m5": "<m5 db password>",
    "migrate-db": {
        "flag": true | false,
        "m5-db-name": "<db name>",
        "m10-db-name": "<db name>",
        "db-collision": "replace" | "error"
    },
    "create-db": {
        "flag": true | false,
        "db-name": "<db name>",
        "db-collision": "replace" | "skip" | "error"
    },
    "grant-user": {
        "flag": true | false,
        "db-name": "<db name>",
        "user-name": "<db username>",
        "host": "<db host>",
        "user-pw": "<db password>"
    },
    "drop-db-inst": {
        "flag": true | false,
        "ver": "m5" | "m10",
        "db-name": "<db name>"
    },
    "drop-db-uninst": true | false,
    "drop-user-uninst": true | false
}
```

> **注意**：并非所有字段都是必需的，但如果启用某些阶段，则必须填写相应字段（例如，启用 `create-db` 阶段，则必须提供 `admin-account-m10` 和 `admin-pw-m10`）。

---

### 配置项说明

| 一级成员 | 二级成员 | 自版本 | 描述 |
|----------|----------|--------|------|
| **admin-account-m10** | - | 10.0.30-0005 | 具有完全访问权限的 MariaDB10 管理员账户（root） |
| **admin-pw-m10** | - | 10.0.30-0005 | 具有完全访问权限的 MariaDB10 管理员密码 |
| **admin-account-m5** | - | 10.0.30-0005 | 具有完全访问权限的 MariaDB5 管理员账户（root） |
| **admin-pw-m5** | - | 10.0.30-0005 | 具有完全访问权限的 MariaDB5 管理员密码 |
| **migrate-db** | flag | 10.0.30-0005 | 是否运行此阶段 |
| | m5-db-name | 10.0.30-0005 | 迁移源数据库名称（MariaDB5） |
| | m10-db-name | 10.0.30-0005 | 迁移目标数据库名称（MariaDB10） |
| | db-collision | 10.0.30-0005 | 导入时的数据库冲突策略，不提供 skip |
| **create-db** | flag | 10.0.30-0005 | 是否运行此阶段 |
| | db-name | 10.0.30-0005 | 在 MariaDB10 上创建的数据库名称 |
| | db-collision | 10.0.30-0005 | 创建数据库时的冲突策略 |
| **grant-user** | flag | 10.0.30-0005 | 是否运行此阶段 |
| | db-name | 10.0.30-0005 | 授予用户权限的目标数据库名称 |
| | user-name | 10.0.30-0005 | 创建并授予权限的用户名 |
| | host | 10.0.30-0005 | 用户主机（默认：`localhost`） |
| | user-pw | 10.0.30-0005 | 用户密码 |
| **drop-db-inst** | flag | 10.0.30-0005 | 是否运行此阶段 |
| | ver | 10.0.30-0005 | 目标 MariaDB 版本（`m5` / `m10`） |
| | db-name | 10.0.30-0005 | 要删除的数据库名称 |
| **drop-db-uninst** | - | 10.0.30-0005 | 是否在卸载时删除数据库 |
| **drop-user-uninst** | - | 10.0.30-0005 | 是否在卸载时删除用户 |

---

### 数据库冲突策略

当 `migrate-db` 或 `create-db` 提供的数据库名称已存在时，可通过以下策略解决冲突：

| 策略 | 描述 |
|------|------|
| **replace** | 删除现有数据库并使用新数据库替换 |
| **error** | 不执行任何操作，仅报告错误，可能导致安装失败 |
| **skip** | 不执行任何操作，继续正常执行 |

---

### 示例

```json
"mariadb10-db": {
    "admin-account-m10": "root",
    "admin-pw-m10": "password!@#123432",
    "admin-account-m5": "",
    "admin-pw-m5": "",
    "migrate-db": {
        "flag": false,
        "m5-db-name": "",
        "m10-db-name": "",
        "db-collision": ""
    },
    "create-db": {
        "flag": true,
        "db-name": "myservice",
        "db-collision": "error"
    },
    "grant-user": {
        "flag": true,
        "db-name": "myservice",
        "user-name": "myservice_dbuser",
        "host": "localhost",
        "user-pw": "password!@#123432asd123123"
    },
    "drop-db-inst": {
        "flag": false,
        "ver": "",
        "db-name": ""
    },
    "drop-db-uninst": true,
    "drop-user-uninst": false
}
```

---

### 使用场景

- **新建套件**：使用 `create-db` 和 `grant-user` 创建专用数据库和用户
- **从 MariaDB5 升级**：使用 `migrate-db` 迁移数据
- **套件卸载**：使用 `drop-db-uninst` 清理数据库（`drop-user-uninst` 谨慎使用）

---

### 注意事项

- 如果多个套件共享同一个数据库用户，`drop-user-uninst` 应设为 `false`，避免影响其他套件
- `admin-account-m10` 和 `admin-pw-m10` 是执行数据库操作必需的凭证
- 迁移时 `db-collision` 不支持 `skip` 策略
- 阶段失败时会自动回滚已执行的操作