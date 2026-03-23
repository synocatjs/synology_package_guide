# info 文件

```bash
#!/bin/bash
# Copyright (c) 2000-2020 Synology Inc. All rights reserved.

source /pkgscripts/include/pkg_util.sh

package="ExamplePackage"
version="1.0.0-0001"
displayname="Example Package"
os_min_ver="7.0-40000"
maintainer="Synology Inc."
arch="$(pkg_get_platform)"
description="this is an example package"
dsmuidir="ui"
[ "$(caller)" != "0 NULL" ] && return 0
pkg_dump_info

```

这是一个 **Synology DSM 包信息配置文件**，用于定义 SPK (Synology Package) 包的元数据。


## 1. 引入工具函数

```bash
source /pkgscripts/include/pkg_util.sh
```
- 引入 Synology 包构建工具的函数库

## 2. 包元数据定义

| 字段 | 说明 | 示例值 |
|------|------|--------|
| `package` | 包的唯一标识符 | `"ExamplePackage"` |
| `version` | 版本号格式：`主版本.次版本.修订版-构建号` | `"1.0.0-0001"` |
| `displayname` | 在 Package Center 显示的名称 | `"Example Package"` |
| `os_min_ver` | 最低支持的 DSM 版本 | `"7.0-40000"` |
| `maintainer` | 维护者/开发者 | `"Synology Inc."` |
| `arch` | 支持的架构 | `"$(pkg_get_platform)"` (动态获取) |
| `description` | 包描述 | `"this is an example package"` |
| `dsmuidir` | Web UI 目录 | `"ui"` |

## 3. 架构说明
```bash
arch="$(pkg_get_platform)"
```
- `pkg_get_platform` 函数会根据当前构建环境自动检测架构

## 4. 输出逻辑
```bash
[ "$(caller)" != "0 NULL" ] && return 0
pkg_dump_info
```

**这行代码的作用：**
- `$(caller)` 检查脚本被调用的方式
- 如果脚本不是被直接执行（而是被 source 引入），则直接返回
- 如果是直接执行，则调用 `pkg_dump_info` 输出包信息
