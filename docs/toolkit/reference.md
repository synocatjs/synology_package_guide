# 参考资料

本节介绍 Package Toolkit 的高级用法。

---

## PkgCreate.py 命令选项列表

下表列出了一些 `PkgCreate.py` 命令选项：

| 选项名称 | 选项用途 |
|----------|----------|
| (默认) | 仅运行构建阶段，包括链接和编译源代码。等同于 `-U` 选项。 |
| `-p` | 指定打包项目的平台。 |
| `-x` | 构建依赖项目层级。每个项目根据其自身的 `SynoBuildConf/build` 进行构建（例如 `-x0`、`-x1`）。 |
| `-c` | 同时运行构建阶段和打包阶段，包括链接源代码、编译源代码、打包套件和签名最终的 SPK 文件。 |
| `-U` | 仅运行构建阶段，包括链接和编译源代码。 |
| `-l` | 仅运行构建阶段，但仅链接源代码。 |
| `-L` | 仅运行构建阶段，但仅编译源代码。 |
| `-I` | 仅运行打包阶段，将打包并签名您的 SPK 文件。 |
| `--no-sign` | 指示 `PkgCreate.py` 不对 SPK 文件进行签名。例如：`PkgCreate.py -I --no-sign ${project}` |
| `-z` | 同时运行所有平台。 |
| `-J` | 使用 `-J` make 命令选项编译项目。 |
| `-S` | 禁用静默 make。 |

---

## 不同阶段的命令选项关系

下表显示了不同阶段中命令选项的关系。您可以根据需求选择合适的选项。对于大多数情况，选项 `-c` 已足够。

| 阶段 | 操作 | (默认) | -l | -L | -U | -I --no-sign | -I | -c |
|------|------|--------|----|----|----|--------------|-----|-----|
| 构建阶段 | 链接源代码 | ✓ | ✓ | ✗ | ✓ | ✗ | ✗ | ✓ |
| 构建阶段 | 编译源代码 | ✓ | ✗ | ✓ | ✓ | ✗ | ✗ | ✓ |
| 打包阶段 | 打包套件 | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ | ✓ |
| 打包阶段 | 签名套件 | ✗ | ✗ | ✗ | ✗ | ✗ | ✓ | ✓ |

---

## 平台特定依赖

平台特定依赖意味着您可以通过在以下部分添加 `:${platform}` 后缀来为不同平台设置不同的依赖项目：`BuildDependent` 和 `ReferenceOnly`。以下示例展示了 `libbar-1.0` 在 `816x` 和 `armada370` 平台上的依赖配置：

```ini
# SynoBuildConf/depends

[BuildDependent]
libfoo-1.0

[BuildDependent:816x,armada370]
libfoo-1.0
libbar-1.0

[default]
all="7.0"
```

---

## 自定义 SPK 文件收集方式

默认情况下，`PkgCreate.py` 会根据 `/toolkit/build_env/ds.${platform}-${version}/source/${project}/INFO` 将 SPK 文件移动到 `/toolkit/result_spk`。您可以通过添加一个钩子 `SynoBuildConf/collect` 来实现自定义的收集操作。

`SynoBuildConf/collect` 可以是任何可执行的 shell 脚本（因此请记得执行 `chmod +x`），`PkgCreate.py` 将向它传递以下环境变量：

| 环境变量 | 描述 |
|----------|------|
| `SPK_SRC_DIR` | 目标 SPK 文件的源文件夹 |
| `SPK_DST_DIR` | 放置 SPK 文件的默认目标文件夹 |
| `SPK_VERSION` | 套件版本（根据 INFO 文件） |

`SynoBuildConf/collect` 的当前工作目录是 chroot 环境下的 `/source/${project}`。

## 示例 collect 脚本

```bash
#!/bin/bash
# SynoBuildConf/collect

echo "Collecting SPK from $SPK_SRC_DIR to $SPK_DST_DIR"
cp -v $SPK_SRC_DIR/*.spk $SPK_DST_DIR/
```