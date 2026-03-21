
# 套件文件系统层级标准

套件安装后，会有一些目录供套件存放数据。安装在卷分区/系统分区上的套件将链接到不同的目录。

**安装在卷分区上的套件：**

```bash
/var/packages/[package_name]
├── etc     -> /volume[volume_number]/@appconf/[package_name] （自 7.0-41330 起移至卷，旧路径仍可用）
├── var     -> /volume[volume_number]/@appdata/[package_name]
├── tmp     -> /volume[volume_number]/@apptemp/[package_name]
├── home    -> /volume[volume_number]/@apphome/[package_name]
└── target  -> /volume[volume_number]/@appstore/[package_name]
```

**安装在系统分区上的套件：**

```bash
/var/packages/[package_name]
├── etc     -> /usr/syno/etc/packages/[package_name]
├── var     -> /usr/local/packages/@appdata/[package_name]
├── tmp     -> /usr/local/packages/@apptemp/[package_name]
├── home    -> /usr/local/packages/@apphome/[package_name]
└── target  -> /usr/local/packages/@appstore/[package_name]
```

关于安装到卷/系统分区的更多信息，请参阅 INFO 中的 install_type。

| 目录 | 用途 | 权限模式 | 创建时机 | 移除时机 | 脚本变量 |
|------|------|----------|----------|----------|----------|
| etc | 永久配置存储 | 0755 | 安装/升级时 | 不删除 | 无 |
| var（自 7.0-40314 起） | 永久数据存储 | 0755 | 安装/升级时 | 不删除 | SYNOPKG_PKGVAR |
| tmp（自 7.0-40356 起） | 临时数据存储 | 0755 | 安装/升级时 | 卸载/升级时 | SYNOPKG_PKGTMP |
| home（自 7.0-40759 起） | 私有存储 | 0700 | 安装/升级时 | 不删除 | SYNOPKG_PKGHOME |
| target | 从 package.tgz 提取的数据 | 0755 | 安装/升级时 | 卸载/升级时 | SYNOPKG_PKGDEST |

**目录所有者规则**

- 当默认运行身份为 package 时，FHS 目录设置为 `[packageuser]:[packagegroup]`
- 当默认运行身份为 root 时，FHS 目录设置为 `root:[packagegroup]`

关于默认运行身份的更多信息，请参阅权限部分。