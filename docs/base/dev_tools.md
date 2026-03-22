# 开发工具

## Synology Package Toolkit 框架

```bash
git clone https://github.com/SynologyOpenSource/pkgscripts-ng.git
```

❗ 此 Toolkit 仅适用于 DSM 7.0。如果您需要 7.0 之前的 Toolkit，请切换到其他分支。

```bash
git checkout DSM7.3 # 当前默认
git checkout DSM7.2
git checkout DSM6.2
```

## 安装依赖

```bash
# 安装
sudo apt-get install cifs-utils \
    python \
    python-pip \
    python3 \
    python3-pip
```