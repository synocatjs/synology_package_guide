# 安装脚本

```bash
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
	
	if [ -f /source/mini-app/demo ]; then
		cp -av /source/mini-app/demo $binary_dir
	else
		echo "Error: demo binary not found!"
		exit 1
	fi

	### create package.tgz
	pkg_make_package $package_tgz_dir "${PKG_DIR}"
}

create_spk(){
	# 生成 INFO 文件
	if [ -f /source/mini-app/INFO.sh ]; then
		cd /source/mini-app
		./INFO.sh > INFO
		cd /source/mini-app/SynoBuildConf
	fi
	
	# 复制文件
	[ -d /source/mini-app/scripts ] && cp -av /source/mini-app/scripts $PKG_DIR/scripts
	ls /source/mini-app/PACKAGE_ICON*.PNG 2>/dev/null && cp -av /source/mini-app/PACKAGE_ICON*.PNG $PKG_DIR
	[ -d /source/mini-app/conf ] && cp -av /source/mini-app/conf $PKG_DIR
	
	# 复制 INFO
	[ -f /source/mini-app/INFO ] && cp /source/mini-app/INFO $PKG_DIR/INFO

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

## `PKG_DIR=/tmp/_test_spk`
定义工作目录变量，用于存放打包过程中的临时文件。

## `rm -rf $PKG_DIR` 和 `mkdir -p $PKG_DIR`
删除旧的临时目录（如果存在），然后重新创建。

## `source /pkgscripts/include/pkg_util.sh`
加载 Synology 打包工具函数库，提供 `pkg_make_package`、`pkg_make_spk`、`pkg_get_spk_family_name` 等函数。

---

## `create_package_tgz()` 函数
创建 `package.tgz` 压缩包：

- `package_tgz_dir=/tmp/_package_tgz` - 定义临时打包目录
- `binary_dir=$package_tgz_dir/usr/local/bin` - 定义二进制文件安装路径
- `rm -rf $package_tgz_dir && mkdir -p $package_tgz_dir` - 清理并重建临时目录
- `mkdir -p $binary_dir` - 创建二进制文件目录
- `if [ -f /source/mini-app/demo ]; then` - 检查 demo 文件是否存在
- `cp -av /source/mini-app/demo $binary_dir` - 复制 demo 到临时目录
- `pkg_make_package $package_tgz_dir "${PKG_DIR}"` - 调用函数创建 `package.tgz`

---

## `create_spk()` 函数
创建最终的 `.spk` 包：

- 生成 INFO 文件：
  - `if [ -f /source/mini-app/INFO.sh ]; then` - 检查 INFO.sh 是否存在
  - `cd /source/mini-app` - 切换到源目录
  - `./INFO.sh > INFO` - 执行 INFO.sh 并输出到 INFO 文件
  - `cd /source/mini-app/SynoBuildConf` - 返回原目录

- 复制文件：
  - `[ -d /source/mini-app/scripts ] && cp -av ...` - 如果 scripts 目录存在则复制
  - `ls /source/mini-app/PACKAGE_ICON*.PNG 2>/dev/null && cp -av ...` - 如果图标文件存在则复制
  - `[ -d /source/mini-app/conf ] && cp -av ...` - 如果 conf 目录存在则复制
  - `[ -f /source/mini-app/INFO ] && cp ...` - 如果 INFO 文件存在则复制

- 创建 SPK：
  - `mkdir -p /image/packages` - 创建输出目录
  - `pkg_make_spk ${PKG_DIR} "/image/packages" $(pkg_get_spk_family_name)` - 调用函数生成 SPK 文件

---

## `main()` 函数
主函数，按顺序执行：
- `create_package_tgz` - 创建 package.tgz
- `create_spk` - 创建 SPK 包

## `main "$@"`
调用 main 函数，并传递所有脚本参数。