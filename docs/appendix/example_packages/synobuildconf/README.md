# SynoBuildConf 目录解释

这是 **Synology 官方构建配置目录**，用于定义包在 Synology 官方构建系统（如 SynoCommunity）中的构建参数。

## 📄 文件说明

### **build** - 构建配置
定义包的构建参数，如：
- 源代码下载地址
- 依赖项
- 构建命令
- 目标架构

### **depends** - 依赖声明
列出包构建或运行所需的依赖项：
- 其他 Synology 包
- 系统库
- 工具链

### **install** - 安装配置
定义包的安装规则：
- 文件安装路径
- 权限设置
- 启动/停止脚本

## 🎯 用途

这些文件用于 **SynoCommunity** 或其他 Synology 第三方包仓库的自动化构建系统，与 `INFO`、`scripts/` 等运行时配置文件不同。