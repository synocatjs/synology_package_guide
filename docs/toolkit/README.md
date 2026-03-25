# Synology Toolkit

在本节中，我们将介绍 Package Toolkit 的工作流程。如果您想在不使用 Package Toolkit 的情况下构建 Synology 套件，您必须：

- 准备交叉编译工具链
- 准备构建环境
- 准备元数据
- 编译源代码
- 打包套件

对于大多数开发者来说，手动创建套件可能非常复杂，因此我们建议使用 Package Toolkit 来简化套件创建过程。

---

## Toolkit 目录结构

```
/toolkit/
├── build_env/
│   └── ds.${platform}-${version}/
└── pkgscripts-ng/
    ├── EnvDeploy
    └── PkgCreate.py
```

---

## 创建套件工作流程

`PkgCreate.py` 套件创建过程分为两个阶段：

### 1. 构建阶段（Build Stage）
按正确顺序编译您的项目及所有依赖项目。

### 2. 打包阶段（Pack Stage）
将您的项目打包成 `.spk` 文件。

---

## 配置文件

为了正确使用 `PkgCreate.py` 创建 `.spk` 文件，您需要在项目目录下创建一个名为 `SynoBuildConf` 的文件夹，并提供额外的配置文件和构建脚本来描述如何构建您的项目。

### SynoBuildConf 文件说明

| 文件 | 描述 |
|------|------|
| **depends** | 定义项目的依赖关系。更多详情请参阅构建阶段（Build Stage） |
| **build** | 指定 `PkgCreate.py` 如何编译您的项目。更多详情请参阅构建阶段（Build Stage） |
| **install** | 指定 `PkgCreate.py` 如何打包您的 SPK 文件。更多详情请参阅打包阶段（Pack Stage） |
| **install-dev** | 类似于 `SynoBuildConf/install`，但此文件将在 chroot 环境中打包 `.spk` 文件，而非在通用 DSM 系统中。更多详情请参阅编译开源项目：nmap |

---

## 项目结构示例

```
your_project/
├── SynoBuildConf/
│   ├── depends
│   ├── build
│   ├── install
│   └── install-dev (可选)
├── src/
│   └── (源代码文件)
└── (其他项目文件)
```

---

## 使用 Package Toolkit 的优势

- **自动化依赖管理**：自动处理项目依赖关系，按正确顺序构建
- **简化编译过程**：提供统一的构建脚本接口
- **标准化打包流程**：自动生成符合 DSM 规范的 SPK 文件
- **交叉编译支持**：内置交叉编译工具链配置
- **环境一致性**：确保构建环境与 DSM 目标环境一致

---

## 工作流程图

![create package workflow](/_media/create_package_workflow.png)

### 整体结构

流程分为两个主要阶段：

1. **Build Stage（构建阶段）** —— 将源代码编译成可执行文件
2. **Pack Stage（打包阶段）** —— 将编译好的文件及相关配置打包成 `.spk` 安装包

---

### Build Stage（构建阶段）

- **2. Compile**：在 **Chroot Environment**（一个隔离的编译环境）中，根据 `SynoBuildConf/build` 的配置，将 **1. Copy Source Code** 编译成二进制文件

---

### Pack Stage（打包阶段）

- 将编译好的文件、`SynoBuildConf/install`（安装脚本）、`SynoBuildConf/depends`（依赖信息）等复制到打包目录
- **4. Sign SPK**：使用 **gpg key** 对套件进行数字签名，保证包的完整性和来源可信
- **5. Move to Destination**：将最终生成的 `.spk` 文件移动到指定输出位置
