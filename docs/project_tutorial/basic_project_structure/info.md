# INFO.sh 文件

```bash
#!/bin/bash

source /pkgscripts/include/pkg_util.sh

# 包信息
package="mini-app"
version="1.0.0"
arch="$(pkg_get_platform)" # 使用 pkg_get_platform 获取架构（返回平台架构，例如 r1000）
maintainer="Synocatjs"
description="A minimal Synology DSM package demo"
os_min_ver="7.0-40000"

# 生成 INFO 文件
pkg_dump_info

```

`INFO.sh` 文件用于定义包的信息，例如包名、版本、架构、维护者、描述和最低 DSM 版本。这些信息将被写入 `INFO` 文件中，供 DSM 使用。
- `package`：包的名称，例如 `mini-app`。
- `version`：包的版本，例如 `1.0.0`。
- `arch`：包的架构，例如 `r1000`。可以使用 `pkg_get_platform` 函数获取当前平台的架构。
- `maintainer`：包的维护者，例如 `Synocatjs`。
- `description`：包的描述，例如 `A minimal Synology DSM package demo`。
- `os_min_ver`：包最低支持的 DSM 版本，例如 `7.0-40000`。

在 `pkg_dump_info` 函数调用之前，可以添加其他自定义的变量或函数，以在 `INFO` 文件中包含更多的信息。