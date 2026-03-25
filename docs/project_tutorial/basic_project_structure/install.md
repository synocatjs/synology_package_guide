# 安装脚本

这个脚本是 Synology 包的**安装脚本**，负责：
1. 将编译好的二进制文件打包成 `package.tgz`
2. 收集所有配置文件、脚本、图标
3. 生成 `INFO` 文件
4. 打包成最终的 `.spk` 文件
```bash
#!/bin/bash

### Use PKG_DIR as working directory.
PKG_DIR=/tmp/_test_spk
rm -rf $PKG_DIR
mkdir -p $PKG_DIR

### get spk packing functions
source /pkgscripts/include/pkg_util.sh

create_package_tgz() {
	local package_tgz_dir=/tmp/_package_tgz
	local binary_dir=$package_tgz_dir/usr/local/bin

	### clear destination directory
	rm -rf $package_tgz_dir && mkdir -p $package_tgz_dir

	### install demo binary
	mkdir -p $binary_dir
	
	# 修正：/source/mini-app → /source/basic
	if [ -f /source/basic/demo ]; then
		cp -av /source/basic/demo $binary_dir/
	else
		echo "Error: demo binary not found!"
		exit 1
	fi

	### create package.tgz
	pkg_make_package $package_tgz_dir "${PKG_DIR}"
}

create_spk(){
	# 生成 INFO 文件
	# 修正：/source/mini-app → /source/basic
	if [ -f /source/basic/INFO.sh ]; then
		cd /source/basic
		./INFO.sh > INFO
		cd - > /dev/null  # 返回原目录
	fi
	
	# 复制文件
	# 修正：/source/mini-app → /source/basic
	[ -d /source/basic/scripts ] && cp -av /source/basic/scripts $PKG_DIR/
	ls /source/basic/PACKAGE_ICON*.PNG 2>/dev/null && cp -av /source/basic/PACKAGE_ICON*.PNG $PKG_DIR
	[ -d /source/basic/conf ] && cp -av /source/basic/conf $PKG_DIR/
	
	# 复制 INFO
	# 修正：/source/mini-app → /source/basic
	if [ -f /source/basic/INFO ]; then
		cp -av /source/basic/INFO $PKG_DIR/
	elif [ -f /source/basic/INFO.sh ]; then
		# 如果没有 INFO 文件但有 INFO.sh，重新生成
		(cd /source/basic && ./INFO.sh) > $PKG_DIR/INFO
	fi

	### Create the final spk
	mkdir -p /image/packages
	pkg_make_spk ${PKG_DIR} "/image/packages" $(pkg_get_spk_family_name)
}

main() {
	create_package_tgz
	create_spk
}

main "$@"
```

## 1. 设置工作目录
```bash
PKG_DIR=/tmp/_test_spk
rm -rf $PKG_DIR
mkdir -p $PKG_DIR
```
- 创建临时目录 `/tmp/_test_spk` 作为 SPK 打包的工作区
- 先删除旧目录，再创建新目录（确保干净环境）

## 2. 加载工具函数
```bash
source /pkgscripts/include/pkg_util.sh
```
- 加载 Synology 官方包工具函数库
- 提供 `pkg_make_package`、`pkg_make_spk` 等函数

---

## 3. `create_package_tgz()` 函数
创建 `package.tgz`（包含程序文件）

```bash
local package_tgz_dir=/tmp/_package_tgz
local binary_dir=$package_tgz_dir/usr/local/bin
```
- 创建临时目录用于存放打包文件
- 二进制文件将放在 `usr/local/bin` 下

```bash
rm -rf $package_tgz_dir && mkdir -p $package_tgz_dir
```
- 清空并重建临时目录

```bash
mkdir -p $binary_dir
```
- 创建 `usr/local/bin` 目录

```bash
if [ -f /source/basic/demo ]; then
    cp -av /source/basic/demo $binary_dir/
else
    echo "Error: demo binary not found!"
    exit 1
fi
```
- 检查编译好的 `demo` 二进制文件是否存在
- 存在则复制到 `usr/local/bin/`

```bash
pkg_make_package $package_tgz_dir "${PKG_DIR}"
```
- 调用官方函数，将 `$package_tgz_dir` 内容打包成 `package.tgz`
- 输出到 `$PKG_DIR` 目录

---

## 4. `create_spk()` 函数
创建最终 SPK 文件

### 4.1 生成 INFO 文件
```bash
if [ -f /source/basic/INFO.sh ]; then
    cd /source/basic
    ./INFO.sh > INFO
    cd - > /dev/null
fi
```
- 如果存在 `INFO.sh` 脚本，执行它并输出到 `INFO` 文件
- `cd - > /dev/null` 返回原目录，不显示输出

### 4.2 复制其他文件
```bash
[ -d /source/basic/scripts ] && cp -av /source/basic/scripts $PKG_DIR/
```
- 复制 `scripts` 目录（生命周期脚本如 `postinst`、`start-stop-status`）

```bash
ls /source/basic/PACKAGE_ICON*.PNG 2>/dev/null && cp -av /source/basic/PACKAGE_ICON*.PNG $PKG_DIR
```
- 复制包图标文件

```bash
[ -d /source/basic/conf ] && cp -av /source/basic/conf $PKG_DIR/
```
- 复制 `conf` 目录（权限配置 `privilege`、资源配置 `resource`）

### 4.3 复制 INFO 文件
```bash
if [ -f /source/basic/INFO ]; then
    cp -av /source/basic/INFO $PKG_DIR/
elif [ -f /source/basic/INFO.sh ]; then
    (cd /source/basic && ./INFO.sh) > $PKG_DIR/INFO
fi
```
- 优先使用已存在的 `INFO` 文件
- 如果没有，则执行 `INFO.sh` 生成

### 4.4 创建最终 SPK
```bash
mkdir -p /image/packages
pkg_make_spk ${PKG_DIR} "/image/packages" $(pkg_get_spk_family_name)
```
- 创建输出目录 `/image/packages`
- 调用官方函数将 `$PKG_DIR` 内容打包成 `.spk` 文件
- `pkg_get_spk_family_name` 获取包文件名

---

## 5. `main()` 函数
```bash
main() {
    create_package_tgz
    create_spk
}
main "$@"
```
- 按顺序执行两个主要函数
- `"$@"` 传递所有命令行参数

---

## 📊 执行流程图

```
开始
  ↓
创建 PKG_DIR (/tmp/_test_spk)
  ↓
加载 pkg_util.sh
  ↓
create_package_tgz()
  ├── 创建 package_tgz_dir
  ├── 复制 demo 到 usr/local/bin
  └── 打包成 package.tgz
  ↓
create_spk()
  ├── 生成 INFO 文件
  ├── 复制 scripts/ 目录
  ├── 复制图标文件
  ├── 复制 conf/ 目录
  ├── 复制 INFO 文件
  └── 打包成最终 .spk 文件
  ↓
结束
```