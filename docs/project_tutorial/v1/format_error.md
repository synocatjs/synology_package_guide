# 格式错误

首先我们需要知道格式是什么。

群晖官方在手册中有介绍：[套件格式](spk_introduction/?id=套件结构)

在官方的开发手册中，一个套件的结构如下：

```bash
name.spk
├── INFO
├── package.tgz
├── scripts
│   ├── postinst
│   ├── postuninst
│   ├── postupgrade
│   ├── preinst
│   ├── preuninst
│   ├── preupgrade
│   └── start-stop-status
├── conf
│   ├── privilege
│   └── resource
├── WIZARD_UIFILES
│   ├── install_uifile
│   └── uninstall_uifile
├── LICENSE
├── PACKAGE_ICON.PNG
└── PACKAGE_ICON_256.PNG
```

而目前我们的套件结构如下

> .spk文件 实际上是压缩后的文件，可以通过更改后缀名，例如改为`.zip` 解压后查看，解压后，包里面有个 `package.tgz` 自行决定是否解压，本节将不会解压说明。

```bash
v1
├── conf
│   └── privilege
├── INFO
└── package.tgz 
```

在手册中，以下文件和目录是必要的：

- `INFO` 文件，描述套件的属性
- `package.tgz` 一个压缩文件，包含应解压到系统的所有文件，如可执行二进制文件、库文件或 UI 文件
- `scripts` 文件夹，内含控制套件生命周期的 shell 脚本
- `conf` 文件夹，额外的文件配置
- `PACKAGE_ICON.PNG` 文件，64x64 的套件图片，格式为 PNG
- `PACKAGE_ICON_256.PNG` 文件，256x256 的套件图片，格式为 PNG

以下是可选的：

- `WIZARD_UIFILES` 文件夹，向导UI，引导用户安装卸载
- `LICENSE` 文件，许可证

目前我们缺失的是：`scripts` 文件夹，`PACKAGE_ICON.PNG` 文件，`PACKAGE_ICON_256.PNG` 文件，接下来，我们创建它们。