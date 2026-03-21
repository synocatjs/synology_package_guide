## Web 服务（自 DSM 7.0）

### 描述

在安装/移除套件阶段，worker 将更新/移除服务和默认门户设置。

在启动/停止套件阶段，worker 将启动/停止服务设置。

---

### 时机

#### FROM_PREINST_TO_PREUNINST（安装/移除阶段）
- **Acquire()**：将用户指定的 `/var/packages/${package}/target/*.json` 中的信息同步到用户设置，执行迁移，并设置用户在资源文件中指定的门户和服务
- **Release()**：移除用户设置

#### FROM_ENABLE_TO_DISABLE（启用/禁用阶段）
- **Acquire()**：将 `/var/packages/${package}/target/` 下的 `*.json` 和 `.mustache` 文件复制到 `/usr/syno/etc/www/app.d/`，并启用服务设置
- **Release()**：删除复制到 `/usr/syno/etc/www/app.d/` 的文件，并禁用服务设置

---

### 提供者

WebStation

---

### 时机

`FROM_PREINST_TO_PREUNINST` 和 `FROM_ENABLE_TO_DISABLE`

---

### 降低权限

根据套件中心权限策略，Web 套件在安装和运行时将获得受限权限。为了帮助 Web 套件设置环境，Webservice worker 提供了一个名为 `pkg_dir_prepare` 的机制，用于帮助 Web 套件创建网站根目录并设置相应的所有者和组。`pkg_dir_prepare` 的详细信息将在该部分详细说明。

---

### 环境变量

无

---

### 可更新

否

---

### 语法

```json
"webservice": {
    "services": [{
        "service": "service1",
        ...
    }, {
        "service": "service2",
        ...
    }],
    "portals": [{
        "service": "wordpress",
        ...
    }, {
        "service": "wordpress",
        ...
    }],
    "migrate": {
        "migration data"
    },
    "pkg_dir_prepare": [{
        "package directory prepare settings"
    }]
}
```

| 键 | 自版本 | 类型 | 必需 | 可空 | 默认值 | 描述 |
|----|--------|------|------|------|--------|------|
| `services` | 3.0.0-0214 | Array | true | false | N/A | 要注册的服务列表 |
| `portals` | 3.0.0-0214 | Array | false | true | 空数组 | 服务的默认门户（可选） |
| `migrate` | 3.0.0-0214 | Object | false | true | 空对象 | 迁移信息（可选） |
| `pkg_dir_prepare` | 3.0.0-0256 | Array | true | false | 空数组 | web_package 下网站根目录的设置规范 |

---

### services（服务）

要注册的 Web 服务，允许多个 Web 服务注册。更多详情请参阅 Web 服务部分。

---

### portals（门户）

为服务注册的默认门户，用于访问服务并创建 UI 快捷方式。分为服务器门户和别名门户。

**重要提示：** 不允许将默认服务器门户注册为基于名称的门户，因为客户端可能无法查找 FQDN 的正确 IP。

#### 别名门户示例

```json
{
    "service": "wordpress",
    "name": "wordpress",
    "app": "SYNO.SDS.WordPress",
    "type": "alias",
    "alias": "wordpress"
}
```

#### 服务器门户示例

```json
{
    "service": "wordpress",
    "name": "wordpress",
    "app": "SYNO.SDS.WordPress",
    "type": "server",
    "http_port": [9000],
    "https_port": [9001]
}
```

| 键 | 自版本 | 类型 | 必需 | 可空 | 默认值 | 描述 |
|----|--------|------|------|------|--------|------|
| `service` | 3.0.0-0214 | string | true | false | N/A | 门户链接的服务名称，对应要注册的服务中的 service 字段 |
| `name` | 3.0.0-0214 | string | true | false | N/A | 门户名称 |
| `display_name` | 3.0.0-0302 | string | false | true | 同 name | Web UI 门户快捷方式的标题 |
| `app` | 3.0.0-0214 | string | false | true | 空字符串 | 套件的 UI 应用名称 |
| `type` | 3.0.0-0214 | string | true | false | N/A | 门户类型，可以是 `alias` 或 `server` |
| `alias` | 3.0.0-0214 | string | true（如果 type 是 alias） | false | N/A | 别名名称 |
| `http_port` | 3.0.0-0214 | int array | false | false | 空数组（如果 type 是 server） | 服务器门户的 HTTP 端口设置，仅允许 1 个端口。至少需要设置 http_port 或 https_port 或两者都设置 |
| `https_port` | 3.0.0-0214 | int array | false | false | 空数组（如果 type 是 server） | 服务器门户的 HTTPS 端口设置，仅允许 1 个端口。至少需要设置 http_port 或 https_port 或两者都设置 |

---

### migrate（迁移）

帮助套件从旧版本（< DSM 7.0）迁移到新版本。支持两种迁移设置：`root` 和 `vhost`。

#### root 迁移

```json
"root": [{
    "old": "wordpress",
    "new": "wordpress"
}]
```

| 键 | 自版本 | 类型 | 必需 | 可空 | 默认值 | 描述 |
|----|--------|------|------|------|--------|------|
| `root` | 3.0.0-0214 | array | false | true | 空数组 | 将 Web 套件从 web 共享文件夹迁移到 web_packages 共享文件夹 |
| `old` | 3.0.0-0214 | string | true | false | N/A | web 共享文件夹中旧套件的名称 |
| `new` | 3.0.0-0214 | string | true | false | N/A | web_packages 共享文件夹中新套件的名称 |

#### vhost 迁移

```json
"vhost": [{
    "root": "wordpress",
    "service": "wordpress"
}]
```

| 键 | 自版本 | 类型 | 必需 | 可空 | 默认值 | 描述 |
|----|--------|------|------|------|--------|------|
| `vhost` | 3.0.0-0222 | array | false | true | 空数组 | 将指向旧套件的虚拟主机迁移到服务门户 |
| `root` | 3.0.0-0222 | string | true | false | N/A | web 共享文件夹中旧套件的名称 |
| `service` | 3.0.0-0222 | string | true | false | N/A | 新套件的服务名称 |

---

### pkg_dir_prepare（套件目录准备）

Webservice worker 将根据 Web 套件在 worker 配置中指定的信息，在 `web_packages` 下设置网站根目录。worker 将在 `preuninst` 和 `postuninst` 之间移除 `web_package` 下的目标目录。请在升级时的 `preuninst` 脚本中备份您的网站根目录。

#### pkg_dir_prepare 示例

```json
"pkg_dir_prepare": [{
    "source": "/var/package/WordPress/target/src",
    "target": "wordpress",
    "mode": "0755",
    "group": "http",
    "user": "WordPress"
}]
```

| 键 | 自版本 | 类型 | 必需 | 可空 | 默认值 | 描述 |
|----|--------|------|------|------|--------|------|
| `source` | 3.0.0-0256 | string | false | true | N/A | Web 套件源代码目录。通常在套件目标路径（`/var/package/$PKG_NAME/target/`）下。Webservice worker 会将您的源代码目录移动到目标目录，并根据您的 user:group 规范设置所有者组。注意，您应在 source 字段中指定完整路径。 |
| `target` | 3.0.0-0256 | string | true | false | N/A | 您的网站根目录。目标目录将在 web_packages 目录下创建。Webservice worker 会将源目录移动到目标目录，并根据您的 user:group 规范设置相应的所有者组。您应仅指定基于 web_packages 的相对路径。注意：当未指定 source 字段时，Webservice worker 将仅创建目标目录并为目标目录设置所有者组。 |
| `mode` | 3.0.0-0256 | string | true | false | N/A | 目标目录访问模式，例如 `"0755"`、`"0644"` 等 |
| `group` | 3.0.0-0256 | string | true | false | N/A | 目标目录的组所有权名称 |
| `user` | 3.0.0-0256 | string | true | false | N/A | 目标目录的用户所有权名称 |

---

### Web 服务

套件可以通过 WebStation webapi 或 Package Worker 注册到 WebStation。

#### Web 服务支持的类型

- **static 服务**：静态网页 Web 服务
- **nginx_php 服务**：使用 Nginx 作为 HTTP 服务器、PHP 作为脚本的 Web 服务，例如 phpMyAdmin。服务注册后将生成 PHP 配置文件，可在 WebStation -> 脚本语言设置 -> PHP 中修改。
- **apache_php 服务**：使用 Apache 作为 HTTP 服务器、PHP 作为脚本的 Web 服务，例如 WordPress。服务注册后将生成 PHP 配置文件，可在 WebStation -> 脚本语言设置 -> PHP 中修改。
- **reverse_proxy 服务**：依赖反向代理的 Web 服务，例如 Docker-GitLab

---

### 通用字段

| 键 | 自版本 | 类型 | 必需 | 可空 | 默认值 | 描述 |
|----|--------|------|------|------|--------|------|
| `service` | 3.0.0-0214 | string | true | false | N/A | 服务名称 |
| `display_name` | 3.0.0-0214 | string | true | false | N/A | 服务显示名称 |
| `display_name_i18n` | 3.0.0-0214 | string | false | true | null | 不同语言显示的服务名称（可选） |
| `support_alias` | 3.0.0-0214 | bool | false | false | true | 是否支持别名门户，不允许降级 |
| `support_server` | 3.0.0-0214 | bool | false | false | true | 是否支持服务器门户，不允许降级 |
| `icon` | 3.0.0-0214 | string | false | true | null | 图标路径，相对于套件的 target 路径。分辨率应在 `{0}` 中替换。目前仅支持 PNG 格式。如果此字段为空，将使用默认图标。 |
| `type` | 3.0.0-0214 | string | true | false | N/A | 服务类型 |

---

### PHP 配置文件详情

| 键 | 自版本 | 类型 | 必需 | 可空 | 默认值 | 描述 |
|----|--------|------|------|------|--------|------|
| `profile_name` | 3.0.0-0214 | string | true | false | N/A | 默认 PHP 配置文件的名称，用户可能无法修改此字段 |
| `profile_desc` | 3.0.0-0214 | string | true | false | N/A | PHP 配置文件的描述 |
| `backend` | 3.0.0-0214 | int | true | false | N/A | PHP 版本：3 表示 PHP 5.6，4 表示 PHP 7.0，5 表示 PHP 7.1，6 表示 PHP 7.2，7 表示 PHP 7.3，用户可能无法修改此字段 |
| `open_basedir` | 3.0.0-0214 | string | false | true | 空字符串 | 默认 PHP open_basedir，用户可修改此字段 |
| `extensions` | 3.0.0-0214 | string array | false | true | 空数组 | 默认启用的 PHP 扩展，用户无法关闭这些扩展，但可以启用其他扩展 |
| `php_settings` | 3.0.0-0214 | object | false | true | 空对象 | 键值对，定义 PHP ini 设置，用户可修改此字段 |
| `user` | 3.0.0-0256 | string | true | false | N/A | php-fpm 访问网站时具有权限的用户名。注意，该值应与 pkg_dir_prepare 的 user 相同，以便正确访问您的网站 |
| `group` | 3.0.0-0256 | string | true | false | N/A | php-fpm 访问网站时具有权限的组名。注意，该值应与 pkg_dir_prepare 的 group 相同，以便正确访问您的网站 |

---

### static 服务

当类型为 `static` 时，系统将使用 Nginx 提供您的套件服务。

| 键 | 自版本 | 类型 | 必需 | 可空 | 默认值 | 描述 |
|----|--------|------|------|------|--------|------|
| `root` | 3.0.0-0214 | string | true | false | N/A | 服务工作目录，如果以 `/` 开头则视为绝对路径，否则为相对于 web_packages 的路径 |
| `index` | 3.0.0-0214 | string array | false | true | `["index.html", "index.html"]` | static 服务的索引文件。如果此字段为 null，则使用默认值 |
| `custom_rule` | 3.0.0-0214 | object | false | true | 空对象 | 支持自定义路由规则。更多详情请参阅自定义规则部分 |

#### static 服务 worker 设置示例

```json
{
    "service": "static",
    "display_name": "static service",
    "support_alias": true,
    "support_server": true,
    "type": "static",
    "root": "static_dir",
    "icon": "ui/Wordpress_{0}.png"
}
```

---

### nginx_php 服务

当类型为 `nginx_php` 时，系统将使用 Nginx 提供您的套件服务。PHP 文件将由 php-fpm 执行。php-fpm 的默认行为可以在 `php` 字段中定义。

| 键 | 自版本 | 类型 | 必需 | 可空 | 默认值 | 描述 |
|----|--------|------|------|------|--------|------|
| `root` | 3.0.0-0214 | string | true | false | N/A | 服务工作目录，如果以 `/` 开头则视为绝对路径，否则为相对于 web_packages 的路径 |
| `index` | 3.0.0-0214 | string array | false | true | `["index.htm", "index.html", "index.php"]` | nginx 服务的索引文件。如果此字段为 null，则使用默认值 |
| `custom_rule` | 3.0.0-0214 | object | false | true | 空对象 | 支持自定义路由规则。更多详情请参阅自定义规则部分 |
| `connect_timeout` | 3.0.0-0214 | int | false | false | 60 | 连接 php-fpm 的超时设置，单位为秒 |
| `read_timeout` | 3.0.0-0214 | int | false | false | 60 | 从 php-fpm 获取响应的超时设置，单位为秒 |
| `send_timeout` | 3.0.0-0214 | int | false | false | 60 | 向 php-fpm 发送请求的超时设置，单位为秒 |
| `php` | 3.0.0-0214 | object | true | false | N/A | 定义默认 PHP 配置文件 |

#### nginx_php 服务 worker 设置示例

```json
{
    "service": "wordpress",
    "display_name": "WordPress",
    "support_alias": true,
    "support_server": true,
    "type": "nginx_php",
    "root": "wordpress",
    "icon": "ui/Wordpress_{0}.png",
    "php": {
        "profile_name": "WordPress Profile",
        "profile_desc": "PHP Profile for WordPress",
        "backend": 6,
        "open_basedir": "/var/services/web_packages/wordpress:/tmp:/var/services/tmp",
        "extensions": [
            "mysql",
            "mysqli",
            "pdo_mysql",
            "curl",
            "gd",
            "iconv"
        ],
        "php_settings": {
            "mysql.default_socket": "/run/mysqld/mysqld10.sock",
            "mysqli.default_socket": "mysqli.default_socket",
            "pdo_mysql.default_socket": "/run/mysqld/mysqld10.sock",
            "mysql.default_port": "3307",
            "mysqli.default_port": "3307"
        }
    },
    "connect_timeout": 60,
    "read_timeout": 3600,
    "send_timeout": 60
}
```

---

### apache_php 服务

当类型为 `apache_php` 时，Nginx 会将请求传递给 Apache 服务器。PHP 文件将由 php-fpm 执行。php-fpm 的默认行为可以在 `php` 字段中定义。与 nginx_php 相比，apache_php 增加了 `backend` 字段来指定 Apache 版本。

| 键 | 自版本 | 类型 | 必需 | 可空 | 默认值 | 描述 |
|----|--------|------|------|------|--------|------|
| `backend` | 3.0.0-0214 | int | true | false | N/A | 1（Apache 2.2）或 2（Apache 2.4） |
| `intercept_errors` | 3.0.0-0284 | bool | false | false | true | true（开启）或 false（关闭） |

#### apache_php 服务 worker 设置示例

```json
{
    "service": "wordpress",
    "display_name": "WordPress",
    "support_alias": true,
    "support_server": true,
    "type": "apache_php",
    "root": "wordpress",
    "backend": 2,
    "icon": "ui/Wordpress_{0}.png",
    "php": {
        "profile_name": "WordPress Profile",
        "profile_desc": "PHP Profile for WordPress",
        "backend": 6,
        "open_basedir": "/var/services/web_packages/wordpress:/tmp:/var/services/tmp",
        "extensions": [
            "mysql",
            "mysqli",
            "pdo_mysql",
            "curl",
            "gd",
            "iconv"
        ],
        "php_settings": {
            "mysql.default_socket": "/run/mysqld/mysqld10.sock",
            "mysqli.default_socket": "mysqli.default_socket",
            "pdo_mysql.default_socket": "/run/mysqld/mysqld10.sock",
            "mysql.default_port": "3307",
            "mysqli.default_port": "3307"
        }
    },
    "intercept_errors": false,
    "connect_timeout": 60,
    "read_timeout": 3600,
    "send_timeout": 60
}
```

---

### reverse_proxy 服务

当类型为 `reverse_proxy` 时，Nginx 将代理请求到目标服务。

| 键 | 自版本 | 类型 | 必需 | 可空 | 默认值 | 描述 |
|----|--------|------|------|------|--------|------|
| `proxy_target` | 3.0.0-0214 | string | true | false | N/A | 代理目标，支持 http、https 和 unix。此值将填入 nginx 的 proxy_pass URL。更多详情请参阅 proxy_pass |
| `proxy_headers` | 3.0.0-0214 | array | false | true | 空数组 | 定义代理中继头值对列表 |
| `proxy_intercept_errors` | 3.0.0-0284 | bool | false | false | false | 指定当发生错误时是否让 nginx 为您的套件返回错误页面。默认设置为 false |
| `proxy_http_version` | 3.0.0-0214 | int | false | false | 1 | 代理 HTTP 版本，支持 1.0（0）和 1.1（1） |
| `custom_rule` | 3.0.0-0214 | object | false | true | 空对象 | 定义特定的路由规则，应与 support_alias 和 support_server 设置兼容。更多详情请参阅自定义规则部分 |
| `connect_timeout` | 3.0.0-0214 | int | false | false | 60 | 连接代理目标的超时设置，单位为秒 |
| `read_timeout` | 3.0.0-0214 | int | false | false | 60 | 从代理目标获取响应的超时设置，单位为秒 |
| `send_timeout` | 3.0.0-0214 | int | false | false | 60 | 向代理目标发送请求的超时设置，单位为秒 |

#### 代理头

您可以定义代理头来修改代理行为，例如修改 host 或开启 WebSocket。如果需要支持 WebSocket，应按如下所示指定 Upgrade 和 Connection 头：

| 键 | 自版本 | 类型 | 必需 | 可空 | 默认值 | 描述 |
|----|--------|------|------|------|--------|------|
| `name` | 3.0.0-0214 | string | true | false | N/A | 头名称 |
| `value` | 3.0.0-0214 | string | true | false | N/A | 头值 |

#### reverse_proxy 服务 worker 设置示例

```json
{
    "service": "gitlab",
    "display_name": "Git Lab",
    "support_alias": true,
    "support_server": true,
    "type": "reverse_proxy",
    "icon": "ui/gitlab_{0}.png",
    "proxy_target": "http://gitlab:30000",
    "proxy_headers": [{
        "name": "host",
        "value": "gitlab"
    }, {
        "name": "Upgrade",
        "value": "$http_upgrade"
    }, {
        "name": "Connection",
        "value": "$connection_upgrade"
    }],
    "connect_timeout": 60,
    "read_timeout": 3600,
    "send_timeout": 60
}
```

---

### 自定义规则

您可以通过 JSON 键值格式的 `custom_rule` 字段修改配置。JSON 键是目标名称，JSON 值是目标配置的 mustache 文件路径。

您可以参考 `/var/packages/WebStation/target/misc` 下的 `nginx_service_template.mustache`、`apache22_service_template.mustache` 和 `apache24_service_template.mustache`，了解可以修改的路由规则。

mustache 模板中的 `{{ @json key }}` 字段将被 `custom_rule` 中指定的文件替换。

您应该考虑服务器和别名之间的兼容性，并可使用 `{{#alias}}` 来分隔这两种不同的路由规则。

#### 自定义规则示例

```json
"custom_rule": {
    "global_rule": "/var/packages/WordPress/target/misc/nginx_global.mustache",
    "fastcgi_rule": "/var/packages/WordPress/target/misc/nginx_fastcgi.mustache",
    "proxy_rule": "/var/packages/WordPress/target/misc/nginx_proxy.mustache",
    "apache_rule": "/var/packages/WordPress/target/misc/apache.mustache"
}
```

---

### 自定义规则类型

| 键 | 影响目标 | 影响的服务类型 | 效果 |
|----|----------|----------------|------|
| `global_rule` | Nginx | 所有类型 | 修改服务的请求行为 |
| `fastcgi_rule` | Nginx | nginx_php | 修改传递给 php-fpm 的请求行为 |
| `proxy_rule` | Nginx | reverse_proxy | 修改传递给代理目标的请求行为 |
| `apache_rule` | Apache 2.2 或 2.4（取决于 Apache 后端） | apache_php | 修改 Apache 行为 |