# 快速开始

接触 Syno 开发的开发者也许听说过 pkgscripts-ng 和 spksrc，可谓令人迷惑的两个框架。

简单说，对于纯前端的套件，例如  React 项目，pkgscripts-ng 是正确选择，spksrc 主要用于需要交叉编译 C/C++ 二进制的场景（比如你的套件后端依赖 Node.js、ffmpeg 等）

## 下载配置toolkit framework

```bash
# 克隆工具包
git clone https://github.com/SynologyOpenSource/pkgscripts-ng.git
```

安装配置

```bash
# 安装
apt-get install cifs-utils \
    python \
    python-pip \
    python3 \
    python3-pip
```
