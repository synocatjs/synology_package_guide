# scripts

此文件夹包含控制套件生命周期的 Shell 脚本。

## 脚本列表

| 脚本名称 | 必需 | 描述 |
|---------|------|------|
| preinst | ✓ | 可用于在安装前检查条件，但不对系统产生副作用。返回值非零将中止套件安装。 |
| postinst | ✓ | 可用于在安装后为套件准备环境。返回值非零将导致套件状态变为损坏。 |
| preuninst | ✓ | 可用于在卸载前检查条件，但不对系统产生副作用。返回值非零将中止套件卸载。 |
| postuninst | ✓ | 可用于在卸载后清理套件环境。 |
| preupgrade | ✓ | 可用于在升级前检查条件，但不对系统产生副作用。返回值非零将中止套件升级。 |
| postupgrade | ✓ | 可用于在升级后为套件准备环境。返回值非零将导致套件状态变为损坏。 |
| prereplace | ✗ | 当 INFO 中定义了 `install_replace_packages` 用于套件替换时，可用于数据迁移。返回值非零将中止套件替换。 |
| postreplace | ✗ | 当 INFO 中定义了 `install_replace_packages` 用于套件替换时，可用于数据迁移。返回值非零将中止套件替换。 |
| start-stop-status | ✓ | 可用于控制套件生命周期。 |

最简单的脚本实现就是什么都不做：

```sh
#!/bin/sh

exit 0
```

有关向用户显示消息的机制，请参阅脚本消息。

---

## start-stop-status

```sh
#!/bin/sh

case "$1" in
    start)
        ;;
    stop)
        ;;
    status)
        ;;
esac

exit 0
```

此脚本用于启动、停止套件和检测运行状态。DSM 会在不同场景下使用不同参数调用此脚本：

- **start**：当用户运行套件或系统启动时，套件应执行启动操作。
- **stop**：当用户停止套件或系统关闭时，套件应执行停止操作。
- **status**：当检查套件状态时，应根据其状态返回以下退出码：
  - `0`：套件正在运行
  - `1`：套件程序已停止，但 `/var/run` pid 文件存在
  - `2`：套件程序已停止，但 `/var/lock` 锁文件存在
  - `3`：套件未运行
  - `4`：套件状态未知
  - `150`：套件已损坏，应重新安装
- **prestart**：如果 INFO 中的 `precheckstartstop` 设置为 "yes"，套件可以检查是否允许启动。
  - **注意**：DSM 7.0 后，在系统启动时启动套件之前也会运行此参数。
- **prestop**：如果 INFO 中的 `precheckstartstop` 设置为 "yes"，套件可以检查是否允许停止。
  - **注意**：在系统关机时停止套件之前不会运行此参数。

---

## 执行顺序

### 安装
1. prereplace
2. preinst
3. postinst
4. postreplace
5. start-stop-status（如果最终用户选择立即启动，则使用 prestart 参数）
6. start-stop-status（如果最终用户选择立即启动，则使用 start 参数）

### 升级
1. start-stop-status（如果旧版本已启动，则使用 prestop 参数）
2. start-stop-status（如果旧版本已启动，则使用 stop 参数）
3. preupgrade（新版本）
4. preuninst（旧版本）
5. postuninst（旧版本）
6. prereplace（新版本）
7. preinst（新版本）
8. postinst（新版本）
9. postreplace（新版本）
10. postupgrade（新版本）
11. start-stop-status（如果升级前已启动，则使用 prestart 参数，新版本）
12. start-stop-status（如果升级前已启动，则使用 start 参数，新版本）

### 卸载
1. start-stop-status（如果已启动，则使用 prestop 参数）
2. start-stop-status（如果已启动，则使用 stop 参数）
3. preuninst
4. postuninst

### 启动
1. start-stop-status（使用 prestart 参数）
2. start-stop-status（使用 start 参数）

### 停止
1. start-stop-status（使用 prestop 参数）
2. start-stop-status（使用 stop 参数）
