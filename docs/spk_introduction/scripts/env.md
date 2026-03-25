# 脚本环境变量

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