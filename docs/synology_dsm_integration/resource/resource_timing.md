## 资源时机

每个 worker 在特定时机获取资源，并在特定时间间隔内持有资源。例如，`/usr/local` 链接器在 `FROM_ENABLE_TO_DISABLE` 间隔内持有资源，即在 `WHEN_ENABLE` 时获取资源，在 `WHEN_DISABLE` 时释放资源。

---

### 时机说明

| 时机 | 描述 | 失败时的行为 |
|------|------|-------------|
| **WHEN_PREINST** | 在 preinst 脚本之前 | 中止安装、回滚、在 UI 上显示警告消息 |
| **WHEN_POSTINST** | 在 postinst 脚本之前 | 完成安装、在 UI 上显示警告消息 |
| **WHEN_ENABLE** | 在 WHEN_STARTUP 之前，启动时不会处理 | 中止启动、回滚、在 UI 上显示警告消息 |
| **WHEN_STARTUP** | 在 start 之前 | 中止启动、回滚、在 UI 上显示警告消息 |
| **WHEN_PREUNINST** | 在 preuninst 脚本之后 | 完成卸载、在 UI 上显示警告消息 |
| **WHEN_POSTUNINST** | 在 postuninst 脚本之前 | 完成卸载、在 UI 上显示警告消息 |
| **WHEN_DISABLE** | 在 WHEN_HALT 之后，关机时不会处理 | 忽略 |
| **WHEN_HALT** | 在 stop 之后 | 忽略 |

---

### 重要说明

- **WHEN_PREUNINST** 在 preuninst 脚本**之后**处理，以便让套件自身决定是否应继续卸载
- **WHEN_ENABLE** 和 **WHEN_DISABLE** 在系统启动/关机时不会处理
- 资源获取失败时，根据时机不同，可能中止操作或仅显示警告消息

---

### 时机间隔

| 间隔 | 描述 |
|------|------|
| **FROM_ENABLE_TO_DISABLE** | 从 WHEN_ENABLE 到 WHEN_DISABLE 期间持有资源 |
| **FROM_STARTUP_TO_HALT** | 从 WHEN_STARTUP 到 WHEN_HALT 期间持有资源 |