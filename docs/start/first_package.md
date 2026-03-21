# 你的第一个套件

请确保你已经为你的 NAS 准备好了开发环境。

**下载模板套件**

你可以从 https://github.com/SynologyOpenSource/ExamplePackages 下载我们的模板套件，并将 `ExamplePackages/ExamplePackage` 目录放置到 `/toolkit/source/ExamplePackage`。

```
/toolkit/
├── build_env/
│   └── ds.${platform}-${version}/
├── pkgscripts-ng/
│   ├── EnvDeploy
│   └── PkgCreate.py
└── source/
    └── ExamplePackage/
        ├── examplePkg.c
        ├── INFO.sh
        ├── Makefile
        ├── PACKAGE_ICON.PNG
        ├── PACKAGE_ICON_256.PNG
        ├── scripts/
        │   ├── postinst
        │   ├── postuninst
        │   ├── postupgrade
        │   ├── postreplace
        │   ├── preinst
        │   ├── preuninst
        │   ├── preupgrade
        │   ├── prereplace
        │   └── start-stop-status
        └── SynoBuildConf/
            ├── depends
            ├── build
            └── install
```

**配置构建配置**

构建套件和打包套件的步骤在 `${project_path}/SynoBuildConf/` 下配置。你可以看到三个文件：

- `depends`: 配置项目之间的依赖关系
- `build`: 配置构建套件的步骤
- `install`: 配置将套件打包成 `.spk` 文件的步骤

这个示例将通过一个用 C 语言编写的程序输出一些消息，因此有必要在构建阶段编译程序。我们在这个示例中使用 Makefile 来帮助我们进行交叉编译。

我们不关心你在构建配置中做什么，它甚至可以什么都不做。构建系统只会 chroot 进入环境，然后根据命令调用相应的 build、install 脚本。

**配置属性**

套件信息及其行为由 `INFO.sh` 控制，该文件在安装时会被转换为 `INFO` 文件。

```bash
#!/bin/bash
# INFO.sh
source /pkgscripts/include/pkg_util.sh
package="ExamplePackage"
version="1.0.0000"
os_min_ver="7.0-40000"
displayname="ExamplePackage Package"
description="this is an example package"
arch="$(pkg_get_unified_platform)"
maintainer="Synology Inc."
pkg_dump_info
```

**配置生命周期行为**

套件控制脚本可以在 `${project_path}/scripts/` 中找到。你可以在每个阶段控制行为，例如在套件启动/停止时调用 examplePkg 程序。

```bash
#!/bin/sh
# scripts/start-stop-status
case $1 in
    start)
        examplePkg "Start"
        echo "Hello World" > $SYNOPKG_TEMP_LOGFILE
        exit 0
    ;;
    stop)
        examplePkg "Stop"
        echo "Hello World" > $SYNOPKG_TEMP_LOGFILE
        exit 0
    ;;
    status)
        exit 0
    ;;
esac
```

**编写程序并配置其编译和安装**

通过套件将编译好的程序带入 DSM 是很常见的。你可以直接用 C 编写程序，并添加一个 Makefile 来编译你的程序。

```c
// examplePkg.c
#include <sys/sysinfo.h>
#include <syslog.h>
#include <stdio.h>
int main(int argc, char** argv) {
    struct sysinfo info;
    int ret;
    ret = sysinfo(&info);
    if (ret != 0) {
        syslog(LOG_SYSLOG, "Failed to get info\n");
        return -1;
    }
    syslog(LOG_SYSLOG, "[ExamplePkg] %s sample package ...", argv[1]);
    syslog(LOG_SYSLOG, "[ExamplePkg] Total RAM: %u\n", (unsigned int) info.totalram);
    syslog(LOG_SYSLOG, "[ExamplePkg] Free RAM: %u\n", (unsigned int) info.freeram);
    return 0;
}
```

```makefile
# Makefile
include /env.mak
EXEC= examplePkg
OBJS= examplePkg.o
all: $(EXEC)
$(EXEC): $(OBJS)
    $(CC) $(CFLAGS) $< -o $@ $(LDFLAGS)
install: $(EXEC)
    mkdir -p $(DESTDIR)/usr/bin/
    install $< $(DESTDIR)/usr/bin/
clean:
    rm -rf *.o $(EXEC)
```

任何附加文件（例如编译后的程序、媒体资源）都应该打包到 `.spk` 内的 `package.tgz` 文件中。我们提供了几个脚本命令来执行此类操作。在这个示例中，我们将通过 install 构建脚本来打包编译好的 examplePkg 可执行文件。

```bash
# SynoBuildConf/install (部分)
create_package_tgz() {
    local firewere_version=
    local package_tgz_dir=/tmp/_package_tgz
    local binary_dir=$package_tgz_dir/usr/bin
    rm -rf $package_tgz_dir && mkdir -p $package_tgz_dir
    mkdir -p $binary_dir
    cp -av examplePkg $binary_dir
    make install DESTDIR="$package_tgz_dir"
    pkg_make_package $package_tgz_dir "${PKG_DIR}"
}
```

**构建并打包套件**

完成套件源代码的准备工作后，你可以使用以下命令构建并将套件打包为 `.spk` 文件，存放于 `/toolkit/result_spk/${package}-${version}/*.spk`。

```bash
cd /toolkit/pkgscripts-ng/
./PkgCreate.py -v 7.0 -p avoton -c ExamplePackage
```

```
/toolkit/
├── pkgscripts-ng/
├── build_env/
│   └── ds.${platform}-${version}
└── result_spk/
    └── ${package}-${version}/
        └── *.spk
```

**安装并测试套件**

进入 DSM > Package Center > Manual Install，然后选择你的 `.spk` 文件进行安装。

一旦你安装并启动了套件，你可以在 UI 上看到它的消息，并在 `/var/log/messages` 中查看日志。

**了解更多**

- Synology Toolkit
- Synology Package
- Synology DSM Integration
- Package Examples