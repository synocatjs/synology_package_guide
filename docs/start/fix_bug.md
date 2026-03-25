好的，我来帮你完善这个说明文档：

---

# Synology DSM 包构建故障排除指南

## 概述

使用 `sudo ./PkgCreate.py -v 7.2 -p r1000 -c mini-app` 构建过程中，如果遇到错误，可以使用 **chroot** 进入隔离环境进行调试。

---

## 什么是 chroot？

**chroot** 是 "Change Root" 的缩写，用于创建"虚拟的 DSM 系统"环境：

- 创建一个隔离的沙盒环境
- 当前目录成为新的根目录 `/`
- 所有操作都在这个隔离环境中进行
- 不影响主机系统

### chroot 目录结构

进入 chroot 后，你的根目录变成了构建环境目录：

```bash
~/Documents/toolkit/build_env/ds.r1000-7.2/
├── bin/           # 交叉编译工具链
├── usr/           # 目标系统的库和头文件
├── pkgscripts-ng/ # Synology 打包脚本
├── source/        # 你的包源码（链接到主机源目录）
├── image/         # 生成的 SPK 文件存放位置
├── tmp/           # 临时文件目录
└── var/           # 运行时变量目录
```

---

## 进入 chroot 环境进行调试

### 1. 进入 chroot 环境

```bash
cd ~/Documents/toolkit/build_env/ds.r1000-7.2
sudo chroot . /bin/bash
```

进入后，你会看到提示符变为：
```
CHROOT@ds.r1000[/]#
```

### 2. 导航到你的包源码目录

```bash
cd /source/mini-app
ls -la
```

你应该能看到：
- `demo.c` - 源代码
- `Makefile` - 构建配置
- `SynoBuildConf/` - 构建和安装脚本
- `INFO.sh` - 包信息生成脚本
- `scripts/` - 启动/停止脚本
- `conf/` - 配置文件
- `PACKAGE_ICON*.PNG` - 图标文件

### 3. 手动测试构建脚本

```bash
# 进入构建脚本目录
cd SynoBuildConf

# 手动执行构建脚本
./build

# 检查是否生成 demo 二进制文件
ls -la ../demo
```

### 4. 手动测试安装脚本

```bash
# 在 SynoBuildConf 目录中
./install
```

如果成功，你会看到：
```
'/source/mini-app/demo' -> '/tmp/_package_tgz/usr/local/bin/demo'
=== Generating INFO file ===
INFO file generated successfully
creating package: mini-app-x86_64-1.0.0.spk
```

### 5. 手动生成 INFO 文件

```bash
cd /source/mini-app

# 执行 INFO.sh 生成 INFO 文件
./INFO.sh > INFO

# 查看生成的 INFO
cat INFO
```

### 6. 检查文件权限

```bash
# 确保所有脚本都有执行权限
chmod +x INFO.sh
chmod +x SynoBuildConf/build
chmod +x SynoBuildConf/install
chmod +x scripts/*.sh
```

---

## 常见问题和解决方案

### 问题 1：找不到 demo 二进制文件

```bash
# 在 chroot 中手动编译
cd /source/mini-app
make clean
make all

# 检查生成的文件
ls -la demo
```

### 问题 2：INFO.sh 执行失败

```bash
# 测试 INFO.sh
cd /source/mini-app
./INFO.sh

# 如果失败，检查 pkg_util.sh 是否存在
ls -la /pkgscripts/include/pkg_util.sh

# 查看可用的函数
grep "^pkg_get_" /pkgscripts/include/pkg_util.sh
```

### 问题 3：install 脚本找不到文件

```bash
# 在 chroot 中检查文件位置
find /source/mini-app -name "demo" -type f
find /source/mini-app -name "INFO.sh" -type f

# 使用绝对路径测试
/source/mini-app/SynoBuildConf/install
```

### 问题 4：权限错误

```bash
# 修复权限
chmod -R 755 /source/mini-app/SynoBuildConf/
chmod 755 /source/mini-app/INFO.sh
```

---

## 退出 chroot 并重新构建

### 1. 退出 chroot 环境

```bash
exit
# 或按 Ctrl+D
```

### 2. 清理临时文件

```bash
cd ~/Documents/toolkit/pkgscripts-ng
sudo rm -rf /tmp/_test_spk /tmp/_package_tgz
```

### 3. 重新构建

```bash
sudo ./PkgCreate.py -v 7.2 -p r1000 -c mini-app
```

---

## 验证构建结果

### 查看生成的 SPK 文件

```bash
# 查找所有 SPK 文件
find ~/Documents/toolkit -name "*.spk" -type f 2>/dev/null

# 查看最终产物
ls -la ~/Documents/toolkit/build_env/ds.r1000-7.2/image/packages/
```

应该看到：
```
mini-app-x86_64-1.0.0.spk
mini-app-x86_64-1.0.0_debug.spk
```

### 查看 SPK 内容

```bash
# 解压查看 SPK 内容（SPK 实际上是 tar 包）
tar -tvf ~/Documents/toolkit/build_env/ds.r1000-7.2/image/packages/mini-app-x86_64-1.0.0.spk
```

---

## 调试技巧总结

| 步骤 | 命令 | 目的 |
|------|------|------|
| 1 | `sudo chroot . /bin/bash` | 进入隔离环境 |
| 2 | `cd /source/mini-app` | 定位到包目录 |
| 3 | `./SynoBuildConf/build` | 测试构建脚本 |
| 4 | `./SynoBuildConf/install` | 测试安装脚本 |
| 5 | `./INFO.sh > INFO` | 手动生成 INFO |
| 6 | `cat /logs/error.build` | 查看错误日志 |
| 7 | `exit` | 退出 chroot |

---

## 注意事项（建议）

1. **路径问题**：在 chroot 中使用绝对路径 `/source/mini-app/`，不要使用相对路径
2. **权限问题**：确保所有 `.sh` 文件都有执行权限 (`chmod +x`)
3. **环境变量**：chroot 中的环境变量可能与主机不同
4. **日志文件**：错误日志位于 `/logs/error.build` 和 `/logs/error.install`
5. **临时文件**：构建失败后记得清理 `/tmp/_test_spk` 和 `/tmp/_package_tgz`

