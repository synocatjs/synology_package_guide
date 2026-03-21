# 平台和架构值映射表

NAS 的架构基于多种平台开发，您的套件需要针对这些平台进行设计，并在套件的 INFO 文件中进行说明。

在下表中，您将找到与相应平台对应的字符串值。例如，如果您的 NAS 平台是 Marvell ARMADA 370，即 armada370，那么在 arch 键中应提供的值就是 armada370。

请检查需要支持的 NAS 平台，并参考下表获取其对应的字符串值：

| 架构系列 | 成员平台 |
|---------|---------|
| noarch | （所有平台） |
| x86_64 | apollolake, avoton, braswell, broadwell, broadwellnk, broadwellntb, broadwellntbap, bromolow, cedarview, coffeelake, denverton, geminilake, grantley, kvmx64, purley, skylaked, v1000 |
| i686 | evansport |
| armv7 | alpine, alpine4k |
| armv5 | 628x |
| armv8 | rtd1296, armada37xx, rtd1619, rtd1619b |

---

## 支持的平台值列表

- alpine
- alpine4k
- apollolake
- armada370
- armada375
- armada37xx
- armada38x
- armadaxp
- avoton
- braswell
- broadwell
- broadwellnk
- broadwellntb
- broadwellntbap
- bromolow
- cedarview
- coffeelake
- comcerto2k
- denverton
- evansport
- geminilake
- grantley
- kvmx64
- monaco
- purley
- rtd1296
- rtd1619
- rtd1619b
- skylaked
- v1000

---

## 如何确定 NAS 的架构

您可以在 CPU 列表中查看"Package Arch"字段，以确定您的 NAS 所属的架构。