# 打包阶段

在打包阶段，`PkgCreate.py` 根据元数据打包所有必要文件，并在 `/toolkit/result_spk` 创建 `.spk` 文件。如果您希望 `PkgCreate.py` 跳过构建阶段直接进入打包阶段，只需使用 `-i` 选项运行 `PkgCreate.py`。

```bash
cd /toolkit
pkgscripts-ng/PkgCreate.py -i ${project}
```

---

## Toolkit 目录结构

```
/toolkit/
├── build_env/
│   └── ds.${platform}-${version}/
├── pkgscripts-ng/
│   ├── EnvDeploy
│   └── PkgCreate.py
└── source/
    └── ${project}/
        └── SynoBuildConf/
            ├── depends
            ├── build
            └── install
```

---

## 打包阶段工作流程

![pack stage workflow](/_media/pack_stage_workflow.png)

1. `PkgCreate.py` 执行构建脚本 `SynoBuildConf/install`
2. 使用 `INFO.sh` 创建 INFO 文件
3. 将必要文件移动到临时文件夹（如 `/tmp/_install`），并创建 `package.tgz`
4. 将必要元数据和资源移动到临时文件夹（如 `/tmp/_pkg`），并创建 `.spk` 文件
5. `PkgCreate.py` 将使用位于 `/root/` 下的 GPG 密钥对新创建的 `.spk` 文件进行签名（DSM 7.0 后已弃用套件签名机制）

---

## SynoBuildConf/install

此文件必须使用 bash 编写，指示如何打包您的项目。当前工作目录是 chroot 环境下的 `/source/${project}`。如果这是您套件的顶级项目，此文件将定义如何创建 `.spk` 文件，包括目录结构和 INFO 文件。

```bash
#!/bin/bash
### 使用 PKG_DIR 作为工作目录
PKG_DIR=/tmp/_test_spk
rm -rf $PKG_DIR
mkdir -p $PKG_DIR

### 获取 spk 打包函数
source /pkgscripts-ng/include/pkg_util.sh

create_inner_tarball() {
    local inner_tarball_dir=/tmp/_inner_tarball

    ### 清理目标目录
    rm -rf $inner_tarball_dir && mkdir -p $inner_tarball_dir

    ### 安装所需文件到 PKG_DIR
    make install DESTDIR="$inner_tarball_dir"

    ### 创建 package.txz: $1=源目录, $2=目标目录
    pkg_make_package $inner_tarball_dir "${PKG_DIR}"
}

create_spk() {
    local scripts_dir=$PKG_DIR/scripts

    ### 复制 Package Center 脚本到 PKG_DIR
    mkdir -p $scripts_dir
    cp -av scripts/* $scripts_dir

    ### 复制套件图标
    cp -av PACKAGE_ICON*.PNG $PKG_DIR

    ### 生成 INFO 文件
    ./INFO.sh > INFO
    cp INFO $PKG_DIR/INFO

    ### 创建最终的 spk
    # pkg_make_spk <源路径> <目标路径> <spk 文件名>
    # 请将结果 spk 放入 /image/packages
    # spk 名称函数: pkg_get_spk_name, pkg_get_spk_unified_name, pkg_get_spk_family_name
    mkdir -p /image/packages
    pkg_make_spk ${PKG_DIR} "/image/packages" $(pkg_get_spk_family_name)
}

create_inner_tarball
create_spk
```

## 脚本说明

- 脚本首先调用 `PrepareDirs` 函数，为项目准备必要的文件夹
- 创建文件夹后，脚本调用 `SetupPackageFiles` 将必要资源文件移动到 `$INST_DIR` 和 `$PKG_DIR`
- 在此步骤中，调用 `INFO.sh` 创建 INFO 文件。虽然您可以将生成 INFO 文件的代码放在 `SynoBuildConf/install` 脚本中，但我们强烈建议单独创建 INFO 文件，通常命名为 `INFO.sh`
- 将资源文件移动到适当位置后，调用 `MakePackage` 函数创建套件
- 脚本引入/加载了位于 `/pkgscripts-ng/include` 的 `pkg_util.sh`
- `pkg_util.sh` 中定义的 `pkg_make_package` 和 `pkg_make_spk` 可帮助创建 `package.tgz` 和 `.spk`

| 函数 | 描述 |
|------|------|
| `pkg_make_package $1 $2` | 从 `$1` 中的文件创建 `$2` 的 package.tgz |
| `pkg_make_spk $1 $2` | 从 `$1` 中的文件创建 `$2` 的 spk |

---

## INFO.sh

如前所述，`INFO.sh` 是一个可选脚本。您可以手动创建 INFO 文件或将代码移至 `SynoBuildConf/install`。然而，我们强烈建议使用 `INFO.sh`，这样您可以将 INFO 文件的创建与 `SynoBuildConf/install` 分离。

```bash
#!/bin/bash

source /pkgscripts-ng/include/pkg_util.sh

package="ExamplePkg"
version="1.0.0000"
displayname="Example Package"
maintainer="Synology Inc."
arch="$(pkg_get_unified_platform)"
description="this is a Example package"
[ "$(caller)" != "0 NULL" ] && return 0
pkg_dump_info
```

上述代码只是示例，展示了 `pkg_dump_info` 的一些重要变量。如果您想了解 INFO 文件及各字段的更多详情，请参阅 INFO 部分。

与 `SynoBuildConf/install` 类似，我们必须首先包含 `pkg_util.sh`。之后，可以设置适当的变量并调用 `pkg_dump_info` 来正确创建 INFO 文件。如您所见，我们使用了另一个辅助函数 `pkg_get_platform` 来设置架构变量，该变量表示当前构建的平台。

| 函数 | 描述 |
|------|------|
| `pkg_get_spk_platform` | 返回 INFO 中 `arch` 的平台值 |
| `pkg_dump_info` | 根据给定变量输出 INFO 文件 |

**注意**：记得使 `INFO.sh` 可执行（例如 `chmod +x INFO.sh`）。

---

## SPK 打包函数

Synology 套件框架提供了多个函数来提高打包效率。导入 `/pkgscripts-ng/include/pkg_util.sh` 后，即可使用生成 INFO 文件中的架构信息、分离 SPK 名称和创建 SPK 等功能。

---

## SPK 平台函数

`.spk` 可以安装在一个或多个平台上。您可以通过 INFO 文件决定哪些平台可以安装。

| 函数名 | 值 | 描述 |
|--------|-----|------|
| （无函数） | `noarch` | 套件仅包含脚本。spk 可在所有 Synology 型号上运行。 |
| `pkg_get_platform_family` | `x86_64` `i686` `armv7` `armv5` `ppc` 等 | 将具有相同内核的平台统一为一个平台系列。套件可在同一系列的 Synology 型号上运行。 |
| `pkg_get_spk_platform` | `bromolow` `cedarview` `qoriq` `armadaxp` 等 | 直接输出当前使用的 toolkit 环境所在的平台。套件只能在特定平台上运行。 |

### 平台选择指南

| 场景 | 推荐方法 | arch 值示例 |
|------|----------|-------------|
| 套件没有原生二进制文件 | 使用 `noarch` | `noarch` |
| 套件没有内核相关功能 | 使用 `pkg_get_platform_family` | `x86_64` |
| 套件包含内核相关功能 | 使用 `pkg_get_spk_platform` | `bromolow` |

---

## SPK 命名函数

生成 SPK 后，需要按平台区分 SPK 名称。可以使用以下 SPK 名称函数：

| 函数名 | 对应的平台函数 | 示例 | 描述 |
|--------|----------------|------|------|
| `pkg_get_spk_name` | `pkg_get_spk_platform` | `examplePkg-bromolow-1.0.0000.spk` / `examplePkg-cedarview-1.0.0000.spk` | SPK 名称取决于使用的 toolkit 环境 |
| `pkg_get_spk_name` | `noarch` | `examplePkg-1.0.0000.spk` | 如果套件设置了 `arch="noarch"`，此函数将输出不带平台信息的 SPK 名称 |
| `pkg_get_spk_family_name` | `pkg_get_platform_family` | `examplePkg-x86_64-1.0.0000.spk` | SPK 名称统一为平台系列名称。同一平台系列将生成相同的 SPK 名称，如 bromolow 和 x64 具有相同的 SPK 名称 |

您需要使用 INFO 文件的路径作为参数。如果未指定路径，函数将自动从 `$PKG_DIR/INFO` 获取 INFO 文件。

---

## SPK 创建函数

开发者可以使用 `pkg_make_spk` 创建 SPK。

```bash
pkg_make_spk $source_path $dest_path $spk_name
```

| 参数 | 描述 |
|------|------|
| `source_path` | SPK 源目录。运行 `pkg_make_spk` 前，所有 SPK 文件必须复制到此目录 |
| `dest_path` | 目标 SPK 路径 |
| `spk_name` | 带或不带平台信息的 SPK 名称 |

### 示例

```bash
pkg_make_spk /tmp/_test_spk "/image/packages" $(pkg_get_spk_family_name)
```