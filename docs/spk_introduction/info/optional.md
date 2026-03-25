# INFO 文件：可选字段

以下是 INFO 文件中可用可选字段的完整列表，按功能分类整理。

## 1. 基本信息与本地化
这些字段用于在套件中心向用户展示套件的名称、描述和开发者信息。

| 字段名 | 描述 | 值 / 示例 | DSM 版本要求 |
| :--- | :--- | :--- | :--- |
| **`displayname`** | 套件中心显示的套件名称。如果为空，则使用 `package` 键的值。 | 字符串 | 2.3-1118 |
| **`displayname_[语言]`** | 根据 DSM 语言环境显示的本地化名称。 | 字符串<br>`displayname_cht="你好"` | 2.3-1118 |
| **`description_[语言]`** | 根据 DSM 语言环境显示的本地化描述。 | 字符串<br>`description_cht="你好，世界"` | 2.3-1118 |
| **`maintainer`** | 套件开发者名称。 | `maintainer="Synology Inc."` | 2.0-0731 |
| **`maintainer_url`** | 开发者官网链接。 | `maintainer_url="http://www.synology.com"` | 4.2-3160 |
| **`distributor`** | 套件发布者名称。 | `distributor="Synology Inc."` | 4.2-3160 |
| **`distributor_url`** | 发布者官网链接。 | `distributor_url="http://www.synology.com/..."` | 4.2-3160 |
| **`support_url`** | 技术支持链接。 | `support_url="https://..."` | - |
| **`support_center`** | 设置为 `"yes"` 时，套件中心会显示链接，可启动 Synology 支持中心应用。 | `"yes"`/`"no"` | 5.0-4458 |

## 2. 平台兼容性
这些字段用于控制套件可以安装在哪些 NAS 架构和型号上。

| 字段名 | 描述 | 值 / 示例 | DSM 版本要求 |
| :--- | :--- | :--- | :--- |
| **`arch`** | 列出套件支持的 CPU 架构。`"noarch"` 表示支持所有平台。 | 架构值，用空格分隔。<br>`arch="x86_64 alpine"` | 2.0-0731 |
| **`exclude_arch`** | 列出套件**不支持**的 CPU 架构。 | 架构值，用空格分隔。<br>`exclude_arch="bromolow cedarview"` | 6.0 |
| **`model`** | 列出套件支持的特定型号（按 Synology 字符串标识）。 | 型号字符串，用空格分隔。<br>`model="synology_bromolow_3612xs ..."` | 4.0-2219 |
| **`exclude_model`** | 列出套件**不支持**的特定型号。 | 型号字符串，用空格分隔。<br>`exclude_model="synology_cedarview_713+ ..."` | 7.0-40329 |
| **`os_min_ver`** | 运行套件所需的最低 DSM 版本。DSM 7.0 后至少为 `7.0-40000`。 | `X.Y-Z` 格式<br>`os_min_ver="7.0-40000"` | 6.1-14715 |
| **`os_max_ver`** | 运行套件所需的最高 DSM 版本。 | `X.Y-Z` 格式<br>`os_max_ver="6.1-14715"` | 6.1-14715 |

## 3. 界面与集成
这些字段用于定义套件的 UI 如何与 DSM 集成。

| 字段名 | 描述 | 值 / 示例 | DSM 版本要求 |
| :--- | :--- | :--- | :--- |
| **`adminport`** | 套件 UI 监听的端口号。 | `0~65536` | 2.0-0731 |
| **`adminurl`** | 套件 UI 的 URL 路径。与 `adminport` 等组合。 | 字符串 | 2.3-1118 |
| **`adminprotocol`** | 套件 UI 使用的协议 (`http` 或 `https`)。 | `http` / `https` | 3.2-1922 |
| **`dsmuidir`** | `package.tgz` 中 UI 文件夹的名称。DSM 会自动创建链接。 | 字符串，可支持多链接。<br>`dsmuidir="ui"`<br>`dsmuidir="linkName1:ui/app1"` | 3.2-1922 (单值)<br>7.0-40731 (多值) |
| **`dsmappname`** | 用于将套件集成到 DSM 桌面（如主菜单）的唯一属性名。 | 字符串，用空格分隔。<br>`dsmappname="SYNO.SDS.PhotoStation"` | 3.2-1922 |
| **`dsmapppage`** | 点击套件打开按钮时，要打开的应用程序页面（需与 `dsmappname` 配合使用）。 | 页面名称 | 7.0-40332 |
| **`dsmapplaunchname`** | 用于启动桌面应用，优先级高于 `dsmappname`。 | 应用名称 | 7.0-40796 |
| **`checkport`** | 是否检查 `adminport` 与系统保留端口（如 5000/5001）的冲突。 | `"yes"`/`"no"` | 3.2-1922 |

## 4. 生命周期与控制
这些字段控制套件的安装、升级、卸载行为以及用户对套件的操作权限。

| 字段名 | 描述 | 值 / 示例 | DSM 版本要求 |
| :--- | :--- | :--- | :--- |
| **`startable`** | **(已废弃)** 用户是否可以在套件中心启动/停止套件。 | `"yes"`/`"no"` | 3.2-1922 |
| **`ctl_stop`** | 替代 `startable`。用户是否可以在套件中心启动/停止套件。 | `"yes"`/`"no"` | 6.1-14907 |
| **`ctl_uninstall`** | 用户是否可以在套件中心卸载套件。 | `"yes"`/`"no"` | 6.1-14907 |
| **`precheckstartstop`** | 在启动/停止套件前，是否先运行 `start-stop-status` 脚本的 `prestart`/`prestop` 参数。 | `"yes"`/`"no"` | 6.0 |
| **`silent_install`** | 是否允许在后台静默安装（无向导）。 | `"yes"`/`"no"` | 5.0-4458 |
| **`silent_upgrade`** | 是否允许在后台静默升级（无向导）。 | `"yes"`/`"no"` | 5.0-4458 |
| **`silent_uninstall`** | 是否允许在后台静默卸载（无向导）。 | `"yes"`/`"no"` | 5.0-4458 |
| **`install_reboot`** | 安装或升级套件后是否重启 DSM。 | `"yes"`/`"no"` | 3.2-1922 |
| **`support_move`** | 套件安装后是否允许移动到其他存储卷。 | `"yes"`/`"no"` | 6.2-22306 |
| **`install_type`** | 设置为 `"system"` 时，套件会安装在根文件系统，即使没有存储卷。 | `"system"` | 5.0-4458 |
| **`install_on_cold_storage`** | 是否允许将此套件安装在冷存储上。 | `"yes"`/`"no"` | 7.0-40726 |

## 5. 依赖与冲突
这些字段定义了套件与其他套件或系统服务的关系。

| 字段名 | 描述 | 值 / 示例 | DSM 版本要求 |
| :--- | :--- | :--- | :--- |
| **`install_dep_packages`** | 安装/升级本套件前，必须预先安装的依赖套件。 | 包名，多个用冒号分隔。<br>`install_dep_packages="pkgA>2.2: pkgB"` | 3.2-1922 |
| **`install_conflict_packages`** | 与本套件冲突的套件。如果已安装，则本套件无法安装/升级。 | 包名，多个用冒号分隔。<br>`install_conflict_packages="pkgA"` | 4.1-2851 |
| **`install_break_packages`** | 安装本套件后，会停止并使这些套件保持不可用状态。 | 包名，多个用冒号分隔。<br>`install_break_packages="pkgA"` | 6.1-15117 |
| **`install_replace_packages`** | 安装本套件后，这些被替换的套件将被移除。 | 包名，多个用冒号分隔。<br>`install_replace_packages="pkgA"` | 6.1-15117 |
| **`use_deprecated_replace_mechanism`** | 设置为 `"yes"` 时，使用旧版的替换机制。 | `"yes"`/`"no"` | 7.0-40340 |
| **`install_dep_services`** | 安装/升级本套件前，必须启动或启用的系统服务（如 `apache-web`）。 | 服务名，用空格分隔。<br>`install_dep_services="ssh pgsql"` | 3.2-1922 |
| **`start_dep_services`** | 启动本套件前，必须启动或启用的系统服务。 | 服务名，用空格分隔。 | 3.2-1922 |

## 6. 其他功能与元数据
| 字段名 | 描述 | 值 / 示例 | DSM 版本要求 |
| :--- | :--- | :--- | :--- |
| **`checksum`** | 用于验证 `package.tgz` 完整性的 MD5 字符串。 | 字符串 | 3.2-1922 |
| **`extractsize`** | 安装套件所需的最小空间。DSM 6.0+ 以 KB 为单位。 | 数字<br>`extractsize="253796"` | 4.0-2166 |
| **`support_conf_folder`** | **(DSM 6.0 起已弃用)** 是否支持使用 `conf` 文件夹。 | `"yes"`/`"no"` | 4.2-3160 ~ 5.2 |
| **`helpurl`** | 套件的帮助文档链接。 | `helpurl="https://..."` | 3.2-1922 |
| **`beta`** | 标记此套件为测试版。 | `"yes"`/`"no"` | 6.0 |
| **`report_url`** | 测试版套件的反馈链接。 | `report_url="https://..."` | 3.2-1922 |
| **`auto_upgrade_from`** | 设置一个版本号，当 `silent_upgrade` 启用时，只有当前版本等于或大于此版本才会自动升级。 | `auto_upgrade_from="2.0"` | 5.2-5565 |
| **`offline_install`** | 设置为 `"yes"` 后，套件在发布后不会在套件中心列表中显示，但用户可手动安装。 | `"yes"`/`"no"` | 6.0 |
| **`thirdparty`** | **(DSM 5.0 起不再使用)** 标记为第三方套件。 | `"yes"`/`"no"` | 4.0~4.3 |