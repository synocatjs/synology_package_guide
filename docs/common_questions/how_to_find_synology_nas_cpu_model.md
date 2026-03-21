# 如何查找 Synology NAS 的 CPU 型号？

>[查看原文](https://kb.synology.cn/zh-cn/DSM/tutorial/What_kind_of_CPU_does_my_NAS_have) 

## 目的

您能在以下表格中查找每台 Synology NAS 使用的 CPU 型号、套件架构和内存类别。

> **注意**：您所在地区可能未提供某些型号。要了解更多信息，请联系您当地的经销商。

## FS 系列

| 型号 | CPU 型号 | 核心数 | 线程数 | FPU | 套件架构 | RAM |
|------|----------|--------|--------|-----|----------|-----|
| FS6400 | Intel Xeon Silver 4110 x 2 | 8 | 16 | ✓ | Purley | DDR4 ECC RDIMM 32 GB |
| FS3600 | Intel Xeon D-1567 | 12 | 24 | ✓ | Broadwellnk | DDR4 ECC RDIMM 16 GB |
| FS3410 | Intel Xeon D-1541 | 8 | 16 | ✓ | Broadwellnkv2 | DDR4 ECC RDIMM 16 GB |
| FS3400 | Intel Xeon D-1541 | 8 | 16 | ✓ | Broadwell | DDR4 ECC RDIMM 16 GB |
| FS3017 | Intel Xeon E5-2620 v3 x 2 | 6 | 12 | ✓ | Grantley | DDR4 ECC RDIMM 64 GB |
| FS2500 | AMD Ryzen V1780B | 4 | 8 | ✓ | V1000 | DDR4 ECC UDIMM 8 GB |
| FS2017 | Intel Xeon D-1541 | 8 | 16 | ✓ | Broadwell | DDR4 ECC RDIMM 16 GB |
| FS1018 | Intel Pentium D1508 | 2 | 4 | ✓ | Broadwellnk | DDR4 ECC SODIMM 8 GB |

## HD 系列

| 型号 | CPU 型号 | 核心数 | 线程数 | FPU | 套件架构 | RAM |
|------|----------|--------|--------|-----|----------|-----|
| HD6500 | Intel Xeon Silver 4210R x 2 | 10 | 20 | ✓ | Purley | DDR4 ECC RDIMM 64 GB |

## SA 系列

| 型号 | CPU 型号 | 核心数 | 线程数 | FPU | 套件架构 | RAM |
|------|----------|--------|--------|-----|----------|-----|
| SA6400 | AMD EPYC 7272 | 12 | 24 | ✓ | Epyc7002 | DDR4 ECC RDIMM 32 GB |
| SA3610 | Intel Xeon D-1567 | 12 | 24 | ✓ | Broadwellnkv2 | DDR4 ECC RDIMM 16 GB |
| SA3600 | Intel Xeon D-1567 | 12 | 24 | ✓ | Broadwellnk | DDR4 ECC RDIMM 16 GB |
| SA3410 | Intel Xeon D-1541 | 8 | 16 | ✓ | Broadwellnkv2 | DDR4 ECC RDIMM 16 GB |
| SA3400 | Intel Xeon D-1541 | 8 | 16 | ✓ | Broadwellnk | DDR4 ECC RDIMM 16 GB |
| SA3400D | Intel Xeon D-1541 x 2 | 8 | 16 | ✓ | Broadwellntbap | DDR4 ECC UDIMM 8 GB x 2 |
| SA3200D | Intel Xeon D-1521 x 2 | 4 | 8 | ✓ | Broadwellntbap | DDR4 ECC UDIMM 8 GB x 2 |

## x25 系列

| 型号 | CPU 型号 | 核心数 | 线程数 | FPU | 套件架构 | RAM |
|------|----------|--------|--------|-----|----------|-----|
| RS2825RP+ | AMD Ryzen V1780B | 4 | 8 | ✓ | V1000nk | DDR4 ECC UDIMM 8 GB |
| DS1825+ | AMD Ryzen V1500B | 4 | 8 | ✓ | V1000nk | DDR4 ECC SODIMM 8 GB |
| DS1525+ | AMD Ryzen V1500B | 4 | 8 | ✓ | V1000nk | DDR4 ECC SODIMM 8 GB |
| DS925+ | AMD Ryzen V1500B | 4 | 8 | ✓ | V1000nk | DDR4 ECC SODIMM 4 GB |
| DS725+ | AMD Ryzen R1600 | 2 | 4 | ✓ | R1000nk | DDR4 ECC SODIMM 4 GB |
| DS425+ | Intel Celeron J4125 | 4 | 4 | ✓ | Geminilakenk | DDR4 2 GB |
| DS225+ | Intel Celeron J4125 | 4 | 4 | ✓ | Geminilakenk | DDR4 2 GB |

## x24 系列

| 型号 | CPU 型号 | 核心数 | 线程数 | FPU | 套件架构 | RAM |
|------|----------|--------|--------|-----|----------|-----|
| DS224+ | Intel Celeron J4125 | 4 | 4 | ✓ | Geminilake | DDR4 2 GB |
| DS124 | Realtek RTD1619B | 4 | 4 | ✓ | rtd1619b | DDR4 1 GB |

## 套件架构值映射表

为方便套件开发，以下是主要架构的汇总：

| 架构名称 | 说明 |
|----------|------|
| Purley | Intel Xeon Scalable 系列 |
| Broadwell / Broadwellnk / Broadwellnkv2 / Broadwellntbap | Intel Xeon D 系列 / Broadwell 架构 |
| V1000 / V1000nk | AMD Ryzen V 系列 |
| R1000 / R1000nk | AMD Ryzen R 系列 |
| Geminilake / Geminilakenk | Intel Celeron J / N 系列 |
| Denverton | Intel Atom C 系列 |
| Apollolake | Intel Celeron J / N 系列 |
| rtd1296 / rtd1619b | Realtek 系列 |
| armada37xx / armada38x | Marvell Armada 系列 |
| Bromolow | Intel Xeon E3 / Core i3 |
| Avoton | Intel Atom C2538 |
| X86 | Intel Atom D 系列 |

## 用途说明

在开发套件时，**套件架构 (arch)** 字段需要在 `INFO` 文件中正确填写。例如：

```bash
# INFO.sh 示例
arch="$(pkg_get_unified_platform)"   # 推荐：自动获取平台家族
# 或手动指定
arch="x86_64"                         # 适用于 x86_64 架构
arch="armv8"                          # 适用于 ARMv8 架构
```

> **提示**：对于纯脚本套件（不包含二进制文件），可以使用 `arch="noarch"`，可安装在所有平台。
