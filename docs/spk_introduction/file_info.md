# INFO 文件介绍

此文件描述套件的属性

## INFO 字段格式：

每个属性定义为键/值对，用等号分隔

```bash
key=value
```

## INFO 字段列表：

您可以根据需求定义以下属性：

- [必需的字段](spk_introduction/info_fields_necessary.md)
- [可选的字段](spk_introduction/info_fields_optional.md)

```bash
thirdparty="yes"
maintainer="mycompany"
description="mydescription"
distributor="mycompany"
package="mypackagename"
silent_install="yes"
silent_uninstall="yes"
silent_upgrade="yes"
os_min_ver="7.0-40000"
version="0.0.1-0001"
arch="noarch"
```

## 如何编写 INFO 文件

无需手动编写 INFO 文件，您可以使用 Package Toolkit 中的辅助函数以编程方式生成某些字段。更多信息请参考 INFO.sh。