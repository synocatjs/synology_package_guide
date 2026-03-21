# 套件介绍

在本节中，您将了解群晖套件（.spk）的文件结构及各文件的含义。

```bash
spk
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

## 套件结构

一个群晖套件包含以下文件：

| 文件/文件夹名称（区分大小写） | 必需 | 描述 | 文件/文件夹类型 | DSM 版本要求 |
|------------------------|------|------|----------------|--------------|
| INFO | ✓ | 该文件描述套件的属性 | 属性文件 | 2.0-0731 |
| package.tgz | ✓ | 这是一个压缩文件，包含应解压到系统的所有文件，如可执行二进制文件、库文件或 UI 文件 | TGZ 文件 | 2.0-0731 |
| scripts | ✓ | 该文件夹包含控制套件生命周期的 Shell 脚本 | 文件夹 | 2.0-0731 |
| conf | ✓ | 该文件夹包含额外的配置文件 | 文件夹 | 4.2-3160 |
| WIZARD_UIFILES | ✗ | 该文件夹包含向导 UI 文件，用于在安装/卸载过程中引导套件用户 | 文件夹 | 7.2.2 |
| LICENSE | ✗ | 文件内容将在安装过程中显示在 UI 上。文件大小必须小于 1 MB | 文本文件 | 3.2-1922 |
| PACKAGE_ICON.PNG | ✓ | 在套件中心显示的 PNG 格式图片<br>对于 DSM 6.x，尺寸应为 72 x 72。<br>对于 DSM 7.0 及以上版本，图片尺寸应为 64 x 64。 | PNG 文件 | 3.2-1922 |
| PACKAGE_ICON_256.PNG | ✓ | 在套件中心显示的 PNG 格式图片，尺寸应为 256 x 256 | PNG 文件 | 5.0-4400 |

要创建这样的套件结构，请参阅打包阶段了解详细步骤。

