# 可用的平台

## 准备环境

**安装 Toolkit**

Toolkit 安装：
你需要从这个链接克隆前端脚本。从本文档开始，我们将使用 `/toolkit` 作为 toolkit 基础目录。

```bash
apt-get install git
mkdir -p /toolkit
cd /toolkit
git clone https://github.com/SynologyOpenSource/pkgscripts-ng
```

然后你需要安装一些工具以使构建工具正常工作：

```bash
apt-get install cifs-utils \
    python \
    python-pip \
    python3 \
    python3-pip
```

此时，你可以找到 toolkit 文件，结构如下：

```
/toolkit
├── pkgscripts-ng/
│   ├── include/
│   ├── EnvDeploy    （用于 chroot 环境的部署工具）
│   └── PkgCreate.py （用于套件的构建工具）
└── build_env/       （用于存放 chroot 环境的目录）
```

**为不同的 NAS 目标部署 Chroot 环境**

为了加快开发速度，我们准备了多个不同架构的构建环境，其中包含了一些预构建的项目，这些项目的可执行二进制文件或共享库是在 DSM 中构建的，例如 zlib、libxml2 等。

你可以使用 `EnvDeploy` 来部署对应 NAS 的环境。例如，如果有一台 avoton 架构的 NAS，可以使用以下命令为 avoton 部署环境：

```bash
cd /toolkit/pkgscripts-ng/
git checkout DSM7.2
./EnvDeploy -v 7.2 -p avoton # 适用于 DSM7.2.2
```

也可以手动下载环境 tarball。你需要将 `base_env-{version}.txz`、`ds.{platform}-{version}.dev.txz` 和 `ds.{platform}-{version}.env.txz` 放入 `toolkit/toolkit_tarballs` 目录。

```
/toolkit
├── pkgscripts-ng/
└── toolkit_tarballs/
    ├── base_env-7.2.txz
    ├── ds.avoton-7.2.dev.txz
    └── ds.avoton-7.2.env.txz
```

```bash
cd /toolkit/pkgscripts-ng/
./EnvDeploy -v 7.2 -p avoton -D # -D 表示不下载
```

如前所述，部署的环境包含了一些预构建的库和头文件，它们可以在交叉 gcc 的 sysroot 下找到。Sysroot 是编译器的默认搜索路径。如果 gcc 在给定路径下找不到头文件或库，它将会搜索 `sysroot/usr/{lib,include}`。

```
/toolkit
├── pkgscripts-ng/
│   ├── include/
│   ├── EnvDeploy
│   └── PkgCreate.py
└── build_env/
    ├── ds.avoton-7.2/
    └── ds.avoton-6.2/
        └── usr/local/x86_64-pc-linux-gnu/x86_64-pc-linux-gnu/sys-root/
```

## 可用的平台

你可以使用以下命令之一来显示可用的平台。如果未指定 `-v`，将列出所有版本的可用平台。

```bash
./EnvDeploy -v 7.2 --list
./EnvDeploy -v 7.2 --info platform
```

你可以使用属于同一平台家族的任何 toolkit，为同一平台家族内的所有平台创建 spk 套件。例如，你可以使用 braswell 的 toolkit 来创建可在所有 x86_64 兼容平台上运行的套件。关于平台家族，请查看附录 A：平台和架构值映射表。

**更新环境**

再次使用 `EnvDeploy` 来更新环境。例如，你可以按如下方式更新 DSM 7.2.2 的 avoton 环境。

```bash
./EnvDeploy -v 7.2 -p avoton
```

**移除环境**

要移除环境，你首先需要卸载 `/proc` 文件夹，然后移除环境文件夹。以下命令演示了如何移除版本为 7.2、平台为 avoton 的环境。

```bash
umount /toolkit/build_env/ds.avoton-7.2/proc
rm -rf /toolkit/build_env/ds.avoton-7.2
```