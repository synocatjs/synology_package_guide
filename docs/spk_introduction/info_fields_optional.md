# INFO 文件字段说明（续）

### 字段名称：displayname

**描述：** 套件中心显示的套件名称。

**注意：** 如果 displayname 键值为空，套件中心将显示 package 键的值。

**值类型：** 字符串

**默认值：** package 键的值

**示例：** 无

**DSM 版本要求：** 2.3-1118

---

### 字段名称：displayname_[DSM 语言代码]

**描述：** 套件中心以最终用户设置的 DSM 语言显示套件名称。DSM 支持以下语言：
- enu（英语）
- cht（繁体中文）
- chs（简体中文）
- krn（韩语）
- ger（德语）
- fre（法语）
- ita（意大利语）
- spn（西班牙语）
- jpn（日语）
- dan（丹麦语）
- nor（挪威语）
- sve（瑞典语）
- nld（荷兰语）
- rus（俄语）
- plk（波兰语）
- ptb（巴西葡萄牙语）
- ptg（欧洲葡萄牙语）
- hun（匈牙利语）
- trk（土耳其语）
- csy（捷克语）

**值类型：** 字符串

**默认值：** 套件名称

**示例：**
```
displayname_enu="Hello World"
displayname_cht="你好"
```

**DSM 版本要求：** 2.3-1118

---

### 字段名称：description_[DSM 语言代码]

**描述：** 套件中心以最终用户设置的 DSM 语言显示简短描述。

**值类型：** 字符串

**默认值：** description

**示例：**
```
description_enu="Hello World"
description_cht="你好"
```

**DSM 版本要求：** 2.3-1118

---

### 字段名称：maintainer_url

**描述：** 如果套件有开发者网页，套件中心将显示链接供用户打开。

**值类型：** 字符串

**默认值：**（空）

**示例：**
```
maintainer_url="http://www.synology.com"
```

**DSM 版本要求：** 4.2-3160

---

### 字段名称：distributor

**描述：** 套件中心显示的套件发布者信息。

**值类型：** 字符串

**默认值：**（空）

**示例：**
```
distributor="Synology Inc."
```

**DSM 版本要求：** 4.2-3160

---

### 字段名称：distributor_url

**描述：** 如果套件已安装且有发布者网页，套件中心将显示链接供用户打开。

**值类型：** 字符串

**默认值：**（空）

**示例：**
```
distributor_url="http://www.synology.com/enu/apps/3rd-party_application_integration.php"
```

**DSM 版本要求：** 4.2-3160

---

### 字段名称：support_url

**描述：** 套件中心显示支持链接，允许用户在需要时寻求技术支持。

**值类型：** 字符串

**默认值：**（空）

**示例：**
```
support_url="https://myds.synology.com/support/support_form.php"
```

---

### 字段名称：support_center

**描述：** 如果设置为 "yes"，当您的套件安装后，套件中心将显示链接，使最终用户启动 Synology 支持中心应用程序。

**注意：** 如果设置为 "yes"，report_url 链接将不会在套件中心显示。

**值类型：** "yes"/"no"

**默认值：** "no"

**示例：** 无

**DSM 版本要求：** 5.0-4458

---

### 字段名称：model

**描述：** 可以安装套件的特定型号列表。按 Synology 字符串、架构和型号名称组织。

**值类型：** 型号之间用空格分隔，例如：`synology_88f6281_209`、`synology_cedarview_rs812rp+`、`synology_x86_411+II`、`synology_bromolow_3612xs`、`synology_cedarview_rs812rp+` 等

**默认值：**（空）

**示例：**
```
model="synology_bromolow_3612xs synology_cedarview_rs812rp+"
```

**DSM 版本要求：** 4.0-2219

---

### 字段名称：exclude_arch

**描述：** 列出不能安装套件的 CPU 架构列表。

**注意：** 请谨慎使用 exclude_arch 字段。如果套件在不同版本中有不同的 exclude_arch 值，最终用户可以在特定版本中安装排除某些架构值的套件。

**值类型：** 架构值之间用空格分隔。更多信息请参阅附录 A：平台和架构值映射表

**默认值：**（空）

**示例：**
```
exclude_arch="bromolow cedarview"
```

**DSM 版本要求：** 6.0

---

### 字段名称：checksum

**描述：** 包含用于验证 package.tgz 的 MD5 字符串。

**值类型：** 字符串

**默认值：**（空）

**示例：** 无

**DSM 版本要求：** 3.2-1922

---

### 字段名称：adminport

**描述：** 套件监听特定端口以显示其自己的 UI。如果套件定义了端口，当套件启动时将打开一个链接。

**注意：** adminprotocol、adminport 和 adminurl 键组合成 `adminprotocol://ip:adminport/adminurl` 链接

**值类型：** 0~65536

**默认值：** 80

**示例：**
```
adminport="9002"
```

**DSM 版本要求：** 2.0-0731

---

### 字段名称：adminurl

**描述：** 如果套件已安装且有网页，当套件启动时将打开一个链接。

**注意：** adminprotocol、adminport 和 adminurl 键组合成 `adminprotocol://ip:adminport/adminurl` 链接

**值类型：** 字符串

**默认值：**（空）

**示例：**
```
adminurl="web"
```

**DSM 版本要求：** 2.3-1118

---

### 字段名称：adminprotocol

**描述：** 套件使用特定协议显示其自己的 UI。如果套件已安装且有网页，当套件启动时将打开一个协议链接。

**注意：** adminprotocol、adminport 和 adminurl 键组合成 `adminprotocol://ip:adminport/adminurl` 链接

**值类型：** http / https（用空格分隔）

**默认值：** http

**示例：**
```
adminprotocol="http"
```

**DSM 版本要求：** 3.2-1922

---

### 字段名称：dsmuidir

**描述：** package.tgz 中的 DSM UI 文件夹名称。套件在 `/var/packages/[package name]/target/[dsmuidir]` 中的 UI 文件夹将自动链接到 DSM UI 文件夹 `/usr/syno/synoman/webman/3rdparty/[linkname]`，以在 DSM 中显示您的套件快捷方式。

**注意：**
- 如果只提供一个路径，该路径将是套件目标中相对于 dsmuidir 的路径，链接名称将是套件名称
- 如果提供多个键值对，键将是链接名称，值将是套件目标中相对于 dsmuidir 的路径
- 更多信息请参阅将套件集成到 DSM

**值类型：** 字符串

**默认值：**（空）

**示例：**
```
dsmuidir="ui"
dsmuidir="MyLinkName1:ui/app1 MyLinkName2:ui/app2"
```

**DSM 版本要求：** 3.2-1922（单值）/ 7.0-40731（多值）

---

### 字段名称：dsmappname

**描述：** 每个单独应用程序的值将等于 DSM 配置文件中的唯一属性名称，以便集成到 Synology DiskStation 中。

**注意：** 更多信息请参阅"将套件集成到 DSM"章节中的配置部分。

**值类型：** 用空格分隔

**默认值：**（空）

**示例：**
```
dsmappname="SYNO.SDS.PhotoStation SYNO.SDS.PersonalPhotoStation"
```

**DSM 版本要求：** 3.2-1922

---

### 字段名称：dsmapppage

**描述：** 单击套件打开按钮时要打开的应用程序页面（应与 dsmappname 键一起使用）

**值类型：** 页面名称

**注意：** 页面名称对应于调用 SYNO.SDS.AppLaunch 时的 PageListAppWindow 的 fn 值

**默认值：**（空）

**示例：**
```
dsmappname="SYNO.SDS.AdminCenter.Application"
dsmapppage="SYNO.SDS.AdminCenter.FileService.Main"
```

**DSM 版本要求：** 7.0-40332

---

### 字段名称：dsmapplaunchname

**描述：** 该值将用于启动桌面应用程序，其优先级高于 dsmappname。

**值类型：** 应用程序名称

**默认值：** 与 dsmappname 相同

**示例：**
```
dsmapplaunchname="SYNO.SDS.AdminCenter.Application"
```

**DSM 版本要求：** 7.0-40796

---

### 字段名称：checkport

**描述：** 检查 adminport 与除 Web 服务端口（如 80、443）和 DSM 端口（如 5000、5001）之外已保留或正在 DSM 上监听的端口是否存在冲突。

**值类型：** "yes"/"no"

**默认值：** "yes"

**示例：** 无

**DSM 版本要求：** 3.2-1922

---

### 字段名称：startable

**描述：** 当套件中没有程序为最终用户提供启用或禁用其功能的选项时。此键设置为 "no"，最终用户无法在套件中心启动或停止套件。

**注意：** 在 6.1-14907 之后已弃用，请使用 ctl_stop 代替。
如果 "startable" 设置为 "no"，仍需要启动停止脚本在启动或关闭时运行。

**值类型：** "yes"/"no"

**默认值：** "yes"

**示例：** 无

**DSM 版本要求：** 3.2-1922

---

### 字段名称：ctl_stop

**描述：** 当套件中没有程序为最终用户提供启用或禁用其功能的选项时。此键设置为 "no"，最终用户无法在套件中心启动或停止套件。

**注意：** 如果 "ctl_stop" 设置为 "no"，仍需要启动停止脚本在启动或关闭时运行。

**值类型：** "yes"/"no"

**默认值：** "yes"

**示例：** 无

**DSM 版本要求：** 6.1-14907

---

### 字段名称：ctl_uninstall

**描述：** 如果此键设置为 "no"，最终用户无法在套件中心卸载套件。

**值类型：** "yes"/"no"

**默认值：** "yes"

**示例：** 无

**DSM 版本要求：** 6.1-14907

---

### 字段名称：precheckstartstop

**描述：** 如果设置为 "yes"，让 start-stop-status 在启动或停止套件之前使用 prestart 或 prestop 参数运行。更多信息请参阅 scripts 中的 start-stop-status。

**值类型：** "yes"/"no"

**默认值：** "yes"

**示例：** 无

**DSM 版本要求：** 6.0

---

### 字段名称：helpurl

**描述：** 如果套件已安装且有"帮助"网页，套件中心将向用户显示超链接。

**值类型：** 字符串

**默认值：**（空）

**示例：**
```
helpurl="https://www.synology.com/en-global/knowledgebase"
```

**DSM 版本要求：** 3.2-1922

---

### 字段名称：beta

**描述：** 如果此套件被视为测试版，测试版信息将显示在套件中心。

**值类型：** "yes"/"no"

**默认值：** "no"

**示例：** 无

**DSM 版本要求：** 6.0

---

### 字段名称：report_url

**描述：** 如果套件是测试版且有"报告"网页，套件中心将显示超链接。如果此套件被视为测试版，测试版信息也将显示在套件中心。

**值类型：** 字符串

**默认值：**（空）

**示例：** 无

**DSM 版本要求：** 3.2-1922

---

### 字段名称：install_reboot

**描述：** 安装或升级套件后重新启动 DiskStation。

**值类型：** "yes"/"no"

**默认值：** "no"

**示例：** 无

**DSM 版本要求：** 3.2-1922

---

### 字段名称：install_dep_packages

**描述：** 在安装或升级套件之前，必须首先安装这些套件。此外，启动或停止套件的顺序也取决于此。格式由套件名称组成。如果需要多个依赖套件，套件名称将用冒号分隔，例如 `install_dep_packages="packageA"`。如果需要特定版本范围，套件名称后跟特殊字符 =、<、>、>=、<= 之一以及由数字和句点组成的套件版本，例如 `install_dep_packages="packageA>2.2.2:packageB"`。

**注意：** >= 和 <= 运算符仅在 DSM 4.2 或更新版本中支持。如果套件可以安装在 DSM 4.1 或更旧版本中，请不要使用 <= 和 >=，因为无法正确比较。相反，套件版本应设置得更低或更高。

**值类型：** 套件名称（每个套件名称用冒号分隔）

**默认值：**（空）

**示例：**
```
install_dep_packages="packageA"
```
或
```
install_dep_packages="packageA>2.2.2:packageB"
```

**DSM 版本要求：** 3.2-1922

---

### 字段名称：install_conflict_packages

**描述：** 在安装或升级您的套件之前，这些冲突套件不能安装。格式由套件名称组成，例如 `install_conflict_packages="packageA"`。如果需要多个冲突套件，套件名称将用冒号分隔，例如 `install_conflict_packages="packageA:packageB"`。如果需要特定版本范围，套件名称后跟特殊字符 =、<、>、>=、<= 之一以及由数字和句点组成的套件版本，例如 `install_conflict_packages="packageA>2.2.2:packageB"`。

**注意：** >= 和 <= 运算符仅在 DSM 4.2 或更新版本中支持。如果套件可以安装在 DSM 4.1 中，请不要使用 <= 和 >=，因为无法正确比较。相反，套件版本应设置得更低或更高。

**值类型：** 套件名称（每个套件名称用冒号分隔）

**默认值：**（空）

**示例：**
```
install_conflict_packages="packageA:packageB"
```
或
```
install_conflict_packages="packageA>2.2.2:packageB"
```

**DSM 版本要求：** 4.1-2851

---

### 字段名称：install_break_packages

**描述：** 在安装或升级您的套件后，这些将被破坏的套件将停止运行，并在您的套件存在期间保持破坏状态。格式由套件名称组成，例如 `install_break_packages="packageA"`。如果需要多个将被破坏的套件，套件名称将用冒号分隔，例如 `install_break_packages="packageA:packageB"`。如果需要特定版本范围，套件名称后跟特殊字符 =、<、>、>=、<= 之一以及由数字和句点组成的套件版本，例如 `install_break_packages="packageA>2.2.2:packageB"`。

**值类型：** 套件名称（每个套件名称用冒号分隔）

**默认值：**（空）

**示例：**
```
install_break_packages="packageA:packageB"
```
或
```
install_break_packages="packageA>2.2.2:packageB"
```

**DSM 版本要求：** 6.1-15117

---

### 字段名称：install_replace_packages

**描述：** 在安装或升级您的套件后，这些将被替换的套件将被移除。格式由套件名称组成，例如 `install_replace_packages="packageA"`。如果需要多个将被替换的套件，套件名称将用冒号分隔，例如 `install_replace_packages="packageA:packageB"`。如果需要特定版本范围，套件名称后跟特殊字符 =、<、>、>=、<= 之一以及由数字和句点组成的套件版本，例如 `install_replace_packages="packageA>2.2.2:packageB"`。

**值类型：** 套件名称（每个套件名称用冒号分隔）

**默认值：**（空）

**示例：**
```
install_replace_packages="packageA:packageB"
```
或
```
install_replace_packages="packageA>2.2.2:packageB"
```

**DSM 版本要求：** 6.1-15117

---

### 字段名称：install_dep_services

**描述：** 在安装或升级套件之前，这些服务必须由最终用户启动或启用。

**值类型：**
- DSM 4.2 或更旧：apache-web、mysql、php_disable_safe_exec_dir
- DSM 4.3：apache-web、mysql、php_disable_safe_exec_dir、ssh
- DSM 5.0 ~ DSM 5.2：apache-web、php_disable_safe_exec_dir、ssh、pgsql
- DSM 6.0：ssh、pgsql
- DSM 7.0：ssh-shell、pgsql、network.target、network-online.target、nginx.service、avahi.service、atalk.service、crond.service、nfs-server.service

**注意：** 每个服务用空格分隔。

**默认值：**（空）

**示例：**
```
install_dep_services="apache-web ssh"
```

**DSM 版本要求：** 3.2-1922

---

### 字段名称：start_dep_services

**描述：** 在启动套件之前，这些服务必须由最终用户启动或启用。如果 startable 设置为 "no"，则忽略此值。

**值类型：**
- DSM 4.2 或更旧：apache-web、mysql、php_disable_safe_exec_dir
- DSM 4.3：apache-web、mysql、php_disable_safe_exec_dir、ssh
- DSM 5.0 ~ DSM 5.2：apache-web、php_disable_safe_exec_dir、ssh、pgsql
- DSM 6.0：ssh、pgsql
- DSM 7.0：ssh-shell、pgsql、network.target、network-online.target、nginx.service、avahi.service、atalk.service、crond.service、nfs-server.service

**注意：** 每个服务用空格分隔。

**默认值：**（空）

**示例：**
```
start_dep_services="apache-web ssh"
```

**DSM 版本要求：** 3.2-1922

---

### 字段名称：extractsize

**描述：** 此值表示安装套件所需的最小空间。它将用于提示用户是否有足够的可用空间进行安装。

**注意：**
- 在 DSM 5.2 或更旧版本中，大小基于字节单位
- 在 DSM 6.0 或更新版本中，大小基于千字节单位

**值类型：** 大小单位

**默认值：** 套件 SPK 文件的字节大小

**示例：**
```
extractsize="253796"
```

**DSM 版本要求：** 4.0-2166

---

### 字段名称：support_conf_folder

**描述：** 在 DSM 5.2 或更旧版本中，如果您想在 "conf" 文件夹中使用一些特殊配置文件，此值必须设置为 "yes"。更多详细信息在 "conf" 部分给出。然而，在 DSM 6.0 或更新版本中，您不再需要定义它。

**注意：** 在 DSM 6.0 中已弃用

**值类型：** "yes"/"no"

**默认值：** "no"

**示例：**
```
support_conf_folder="yes"
```

**DSM 版本要求：** 4.2-3160 ~ 5.2

---

### 字段名称：install_type

**描述：** 如果设置为 "system" 或 "system_hidden"，您的套件将安装在根文件系统 `/usr/local/packages/@appstore/` 中，即使没有卷也会安装。

**注意：** 设置此选项时请小心，因为如果您的套件用尽根文件系统中的空间，可能会导致 DiskStation 崩溃。

**值类型：** "system"

**默认值：**（空）

**示例：**
```
install_type="system"
```

**DSM 版本要求：** 5.0-4458

---

### 字段名称：silent_install

**描述：** 如果设置为 "yes"，允许在后台无需套件向导的情况下安装您的套件。这允许 CMS（中央管理系统）将套件安装分发到连接的其他 NAS。

**值类型：** "yes"/"no"

**默认值：** "no"

**示例：**
```
silent_install="yes"
```

**DSM 版本要求：** 5.0-4458

---

### 字段名称：silent_upgrade

**描述：** 如果设置为 "yes"，允许在后台无需套件向导的情况下升级您的套件。最终用户无法修改任何升级信息。这不仅允许您的套件自动升级，还允许 CMS（中央管理系统）将套件升级分发到连接的其他 NAS。

**值类型：** "yes"/"no"

**默认值：** "no"

**示例：**
```
silent_upgrade="yes"
```

**DSM 版本要求：** 5.0-4458

---

### 字段名称：silent_uninstall

**描述：** 如果设置为 "yes"，允许在后台无需套件向导的情况下卸载您的套件。这允许 CMS（中央管理系统）将套件卸载分发到连接的其他 NAS。

**值类型：** "yes"/"no"

**默认值：** "no"

**示例：**
```
silent_uninstall="yes"
```

**DSM 版本要求：** 5.0-4458

---

### 字段名称：auto_upgrade_from

**描述：** 它设置为您的套件的某个版本。如果您的套件设置为 `silent_upgrade="yes"` 并且设置了此值，套件中心仅从安装的套件版本或更新版本自动升级您的套件。但是，如果最终用户安装了比此值更旧的版本，套件中心不会自动升级它，用户必须自行升级。

**值类型：** 套件版本

**默认值：** 空字符串

**示例：**
```
auto_upgrade_from="2.0"
```

**DSM 版本要求：** 5.2-5565

---

### 字段名称：offline_install

**描述：** 如果设置为 "yes"，在套件发布到 Synology 服务器后，它不会显示在套件中心的 Synology 服务器套件列表中。但是，用户可以手动安装套件。

**值类型：** "yes"/"no"

**默认值：** "no"

**示例：**
```
offline_install="yes"
```

**DSM 版本要求：** DSM 6.0

---

### 字段名称：thirdparty

**描述：** 如果设置为 "yes"，您的套件是第三方套件，不是由 Synology 开发的。在套件中心，第三方套件将显示在另一个部分。

**注意：** 在 DSM 5.0 或更新版本中不再使用。

**值类型：** "yes"/"no"

**默认值：** "no"

**示例：**
```
thirdparty="yes"
```

**DSM 版本要求：** 4.0~4.3

---

### 字段名称：os_max_ver

**描述：** 能够运行套件的 DSM 最高版本。

**值类型：** X.Y-Z（DSM 主版本号、DSM 次版本号、DSM 构建版本号）

**默认值：** 无

**示例：**
```
os_max_ver="6.1-14715"
```

**DSM 版本要求：** 6.1-14715

---

### 字段名称：support_move

**描述：** 如果设置为 "yes"，套件可以在安装后移动到不同的卷。

**值类型：** "yes"/"no"

**默认值：** "no"

**示例：**
```
support_move="yes"
```

**DSM 版本要求：** 6.2-22306

---

### 字段名称：exclude_model

**描述：** 列出不能安装套件的型号名称。

**注意：** 请谨慎使用 exclude_model 字段。如果套件在不同版本中有不同的 exclude_model 值，最终用户可以在特定版本中安装排除某些型号值的套件。

**值类型：** 型号值之间用空格分隔

**默认值：**（空）

**示例：**
```
exclude_model="synology_cedarview_713+ synology_kvmx64_virtualdsm"
```

**DSM 版本要求：** 7.0-40329

---

### 字段名称：use_deprecated_replace_mechanism

**描述：** 如果设置为 "yes"，被替换套件将在替换套件安装后卸载，并且不会执行 prereplace/postreplace 脚本。否则，被替换套件将在替换套件安装前卸载，并且将执行 prereplace/postreplace。

**值类型：** "yes"/"no"

**默认值：** "no"

**示例：**
```
install_replace_packages="packageA"
use_deprecated_replace_mechanism="yes"
```

**DSM 版本要求：** 7.0-40340

---

### 字段名称：install_on_cold_storage

**描述：** 如果设置为 "yes"，此套件可以安装在冷存储上，该存储具有非常大的空间用于数据存储。

**值类型：** "yes"/"no"

**默认值：** "no"

**示例：**
```
install_on_cold_storage="yes"
```

**DSM 版本要求：** 7.0-40726