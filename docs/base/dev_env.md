# 搭建开发环境

> 开发设备至少预留 200G 空间。

## 创建并进入开发目录

```bash
mkdir -p toolkit # 名称任意，官方文档中为 toolkit
cd toolkit
```

## 查看信息

### 查看平台信息

```bash
# ssh 连接到群晖
uname -a
```

> 例如：
>
> Linux DS923plus 4.4.302+ #69057 SMP Mon Jul 21 23:26:13 CST 2025 x86_64 GNU/Linux synology_r1000_923+
>
> `synology_r1000_923+` 中 `r1000` 是 DSM 平台标识符，接下来会用到。

### 查看DMS 信息

可以在控制面板中查看，也可以通过命令行查看。

例如，我的控制面板显示的是：`DSM 7.2.1-69057 Update 11`

```bash
cat /etc.defaults/VERSION
```

> 参考输出：
> ```bash
> majorversion="7" # 主版本号
> minorversion="2" # 次版本号
> major="7" # 主版本号
> minor="2" # 次版本号
> micro="1"  # 微版本号
> buildphase="GM" 
> buildnumber="69057" # 构建号
> smallfixnumber="11" 
> nano="11" 
> base="69057" 
> productversion="7.2.1" # DSM 版本号
> os_name="DSM" # 操作系统名称
> builddate="2026/03/17"
> buildtime="17:01:03"
> ```
> 
> 在这里，我的 DSM 版本是 `7.2.1`，接下来会用到。


## 准备构建环境

> 确保您已经下载了 `pkgscripts-ng`，如果没有，请先下载。

进入 `pkgscripts-ng` 目录。

```bash
cd /toolkit/pkgscripts-ng
```

您可以使用 `EnvDeploy` 下载并设置预构建环境，如下所示。

使用 `-v` 指定 DSM 版本，使用 `-p` 指定目标平台。

如果未指定 `-p`，将为给定版本设置所有可用平台。

```bash
cd /toolkit/pkgscripts-ng
./EnvDeploy -v 7.2 -p r1000  # 7.2 和 r1000 的获取方式参考上一段描述
```

最终，整个工作目录将如下图所示，其中 `ds.r1000-7.2` 是用于构建您自己项目的 chroot 环境。

```
$ tree . -L 2
.
├── build_env
│   └── ds.r1000-7.2
├── envdeploy.log
├── envdeploy.log.old
├── pkgscripts-ng
│   ├── EnvDeploy
│   ├── include
│   ├── ParallelProjects.py
│   ├── PkgCreate.py
│   ├── ProjectDepends.py
│   ├── README.md
│   ├── strings.js
│   ├── SynoBuild
│   ├── SynoCC
│   ├── SynoCustomize
│   ├── SynoInstall
│   └── tool
└── toolkit_tarballs
    ├── base_env-7.2.txz
    ├── ds.r1000-7.2.dev.txz
    └── ds.r1000-7.2.env.txz
```

---

### 可用平台

您可以使用以下命令之一来显示可用平台。如果未指定 `-v`，将列出所有版本的可用平台。

```bash
# 列出所有可用平台
./EnvDeploy -v 7.2 --list

# 显示平台详细信息
./EnvDeploy -v 7.2 --info platform
```

> 参考输出:
> 
> ```bash
> pkgscripts-ng$ ./EnvDeploy -v 7.2 --list
>
> [2026-03-22 12:11:19,275] INFO: Available platforms: avoton braswell bromolow grantley alpine alpine4k monaco armada38x kvmcloud kvmx64 rtd1296 broadwellnk denverton apollolake armada37xx purley v1000 broadwell geminilake broadwellntbap r1000 broadwellnkv2 rtd1619b epyc7002 geminilakenk r1000nk v1000nk
> ```

---

### 更新环境

再次使用 `EnvDeploy` 来更新您的环境。例如，通过运行以下命令更新 DSM 7.2 的 avoton 环境：

```bash
./EnvDeploy -v 7.2 -p avoton
```

---

### 移除环境

移除构建环境非常简单。首先 chroot 到构建环境，卸载 `/proc` 文件夹，然后退出 chroot。之后，删除构建环境文件夹。以下命令演示了如何移除版本 7.0、平台 avoton 的构建环境：

```bash
chroot /toolkit/build_env/ds.avoton-7.0 umount /proc
rm -rf /toolkit/build_env/ds.avoton-7.0
```