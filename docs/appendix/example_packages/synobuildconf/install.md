
# 📋 install 文件解释

```bash
#!/bin/bash
# Copyright (C) 2000-2020 Synology Inc. All rights reserved.

### Use PKG_DIR as working directory.
PKG_DIR=/tmp/_test_spk
rm -rf $PKG_DIR
mkdir -p $PKG_DIR

### get spk packing functions
source /pkgscripts/include/pkg_util.sh

create_package_tgz() {
	local firewere_version=
	local package_tgz_dir=/tmp/_package_tgz
	local binary_dir=$package_tgz_dir/usr/local/bin

	### clear destination directory
	rm -rf $package_tgz_dir && mkdir -p $package_tgz_dir

	### install needed file into PKG_DIR
	mkdir -p $binary_dir
	cp -av examplePkg $binary_dir
	make install DESTDIR="$package_tgz_dir" INSTALLDIR="$package_tgz_dir"
	make packageinstall DESTDIR="$package_tgz_dir" PKG_DIR="$PKG_DIR"

	### create package.tgz $1: source_dir $2: dest_dir
	pkg_make_package $package_tgz_dir "${PKG_DIR}"
}

create_spk(){
	cp -av scripts $PKG_DIR/scripts
	cp -av PACKAGE_ICON*.PNG $PKG_DIR
	cp -av conf $PKG_DIR
	cp -av LICENSE $PKG_DIR

	./INFO.sh > INFO
	cp INFO $PKG_DIR/INFO

	### Create the final spk.
	# pkg_make_spk <source path> <dest path> <spk file name>
	# Please put the result spk into /image/packages
	# spk name functions: pkg_get_spk_name pkg_get_spk_unified_name pkg_get_spk_family_name
	mkdir -p /image/packages
	pkg_make_spk ${PKG_DIR} "/image/packages" $(pkg_get_spk_family_name)
}

main() {
	create_package_tgz
	create_spk
}

main "$@"
```

这是一个 **Synology 官方构建系统的安装脚本**，用于构建 SPK 包文件。

## 🔧 脚本结构

### 工作目录设置
```bash
PKG_DIR=/tmp/_test_spk
rm -rf $PKG_DIR
mkdir -p $PKG_DIR
```
- 创建临时工作目录 `/tmp/_test_spk`

### 加载工具函数
```bash
source /pkgscripts/include/pkg_util.sh
```
- 引入 Synology 包构建工具函数库

## 📦 主要函数

### create_package_tgz
创建 `package.tgz`（包含程序文件）：
- 创建临时目录 `/tmp/_package_tgz`
- 复制可执行文件到 `usr/local/bin/`
- 执行 `make install` 安装其他文件
- 调用 `pkg_make_package` 打包成 `package.tgz`

### create_spk
组装最终的 SPK 文件：
- 复制 `scripts/`、`conf/`、图标、LICENSE 等文件
- 生成并复制 `INFO` 文件
- 调用 `pkg_make_spk` 生成最终的 `.spk` 文件到 `/image/packages`

## 🔍 关键函数

| 函数 | 作用 |
|------|------|
| `pkg_make_package` | 创建 `package.tgz` 压缩包 |
| `pkg_make_spk` | 创建最终的 `.spk` 文件 |
| `pkg_get_spk_family_name` | 获取 SPK 文件名 |

## 📁 目录说明

| 目录/文件 | 用途 |
|----------|------|
| `PKG_DIR` | 临时工作目录 |
| `/image/packages` | 最终 SPK 输出目录 |
| `scripts/` | 安装脚本 |
| `conf/` | 配置文件 |
| `INFO` | 包信息文件 |