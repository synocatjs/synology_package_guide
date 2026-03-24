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


## 脚本环境变量

Package Center 会导出多个变量，可在脚本中使用。变量描述如下：

| 变量名 | 描述 |
|--------|------|
| **SYNOPKG_PKGNAME** | 套件标识，在 INFO 中定义。 |
| **SYNOPKG_PKGVER** | 套件版本，在 INFO 中定义。升级时，该值为套件的新版本。 |
| **SYNOPKG_PKGDEST** | 套件存储的目标目录。 |
| **SYNOPKG_PKGDEST_VOL** | 套件存储的目标卷。 |
| **SYNOPKG_PKGPORT** | INFO 中定义的 adminport 端口。该端口将由此套件及其管理界面占用。 |
| **SYNOPKG_PKGINST_TEMP_DIR** | 安装或升级套件时，套件解压的临时目录。 |
| **SYNOPKG_TEMP_LOGFILE** | 脚本记录信息或错误消息的临时文件路径。 |
| **SYNOPKG_TEMP_UPGRADE_FOLDER** | 套件升级时的临时目录。您可以在 preupgrade 脚本中将旧版本套件的文件移至此目录，并在 postupgrade 脚本中将其移回。 |
| **SYNOPKG_DSM_LANGUAGE** | 最终用户的 DSM 语言。 |
| **SYNOPKG_DSM_VERSION_MAJOR** | 最终用户的 DSM 主版本号，格式为 `[DSM 主版本号].[DSM 次版本号]-[DSM 构建版本号]`。 |
| **SYNOPKG_DSM_VERSION_MINOR** | 最终用户的 DSM 次版本号，格式为 `[DSM 主版本号].[DSM 次版本号]-[DSM 构建版本号]`。 |
| **SYNOPKG_DSM_VERSION_BUILD** | 最终用户的 DSM 构建版本号，格式为 `[DSM 主版本号].[DSM 次版本号]-[DSM 构建版本号]`。 |
| **SYNOPKG_DSM_ARCH** | 最终用户的 DSM CPU 架构。更多信息请参阅附录 A：平台和架构值映射表。 |
| **SYNOPKG_PKG_STATUS** | 套件状态，取值为：`INSTALL`、`UPGRADE`、`UNINSTALL`、`START`、`STOP` 或空值。 |
| **SYNOPKG_OLD_PKGVER** | 升级期间 INFO 中定义的旧套件版本。 |
| **SYNOPKG_TEMP_SPKFILE** | 安装/升级套件时，套件 spk 文件在 DS 中临时存储的位置。 |
| **SYNOPKG_USERNAME** | 安装、升级、卸载、启动或停止套件的用户名。如果该值为空，则表示操作由 DSM 触发，而非最终用户。 |
| **SYNOPKG_PKG_PROGRESS_PATH** | 脚本用于显示安装和升级进度的临时文件路径。<br>**注意：** 进度值介于 0 和 1 之间。<br>**示例：** `flock -x "$SYNOPKG_PKG_PROGRESS_PATH" -c echo 0.80 > "$SYNOPKG_PKG_PROGRESS_PATH"` |

---

### SYNOPKG_PKG_STATUS 详细说明

| 状态值 | 说明 |
|--------|------|
| **INSTALL** | 在安装套件时的 preinst 和 postinst 脚本中设置此状态值。如果用户在安装向导的最后一步选择"安装后启动"，则在启动套件时的 start-stop-status 脚本中，该值将设置为 INSTALL。 |
| **UPGRADE** | 在升级套件时，按顺序在 preupgrade、preuninst、postuninst、preinst、postinst 和 postupgrade 脚本中设置此状态值。如果套件在升级前已启动，则在启动或停止套件时的 start-stop-status 脚本中，该值将设置为 UPGRADE。 |
| **UNINSTALL** | 在卸载套件时的 preuninst 和 postuninst 脚本中设置此状态值。如果套件在卸载前已启动，则在停止套件时的 start-stop-status 脚本中，该值将设置为 UNINSTALL。 |
| **START / STOP** | 如果用户在套件中心启动或停止套件，将在 start-stop-status 脚本中设置 START 或 STOP 状态值。 |
| **空值** | 当 NAS 启动或关机时，状态值为空。 |

## 向用户显示消息

## 通过脚本结果显示消息

如果您想在用户安装、升级、卸载、启动或停止套件后发送提示消息，可以在相关脚本中使用 `$SYNOPKG_TEMP_LOGFILE` 变量。例如：

```sh
echo "Hello World!!" > $SYNOPKG_TEMP_LOGFILE
```

如果您想根据用户的语言显示提示消息，可以使用 `$SYNOPKG_DSM_LANGUAGE` 变量获取语言缩写，如下例所示：

```sh
case $SYNOPKG_DSM_LANGUAGE in
        chs)
            echo "简体中文" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        cht)
            echo "繁體中文" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        csy)
            echo "Český" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        dan)
            echo "Dansk" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        enu)
            echo "English" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        fre)
            echo "Français" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        ger)
            echo "Deutsch" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        hun)
            echo "Magyar" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        ita)
            echo "Italiano" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        jpn)
            echo "日本語" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        krn)
            echo "한국어" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        nld)
            echo "Nederlands" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        nor)
            echo "Norsk" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        plk)
            echo "Polski" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        ptb)
            echo "Português do Brasil" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        ptg)
            echo "Português Europeu" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        rus)
            echo "Русский" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        spn)
            echo "Español" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        sve)
            echo "Svenska" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        trk)
            echo "Türkçe" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        *)
            echo "English" > $SYNOPKG_TEMP_LOGFILE 
        ;;
    esac
```

更多信息请参阅"scripts"和"脚本环境变量"部分。

---

## 通过桌面通知显示消息

可以使用 `/usr/syno/bin/synodsmnotify` 可执行文件向用户发送桌面通知。通知标题/消息必须是国际化字符串。

```sh
/usr/syno/bin/synodsmnotify -c [应用ID] [用户或组] [标题的国际化字符串] [消息的国际化字符串]
```

**示例：**
```sh
# 向管理员用户发送通知
/usr/syno/bin/synodsmnotify -c com.company.App1 admin MyPackage:app_tree:index_title MyPackage:app_tree:node_1

# 向管理员组发送通知
/usr/syno/bin/synodsmnotify -c com.company.App1 @administrators MyPackage:app_tree:index_title MyPackage:app_tree:node_1
```

**通知标题和消息格式：** `[套件ID]:[国际化部分]:[国际化键]`

其中 `套件ID` 是套件 INFO 文件中的 package 值。国际化字符串示例可在国际化页面找到。

**注意：** 记得在应用程序配置的 `preloadTexts` 字段中指定桌面通知字符串。