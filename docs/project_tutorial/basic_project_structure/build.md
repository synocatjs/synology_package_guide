# 构建脚本

```bash
#!/bin/bash

set -e  # 遇到错误立即退出

case ${MakeClean} in
    [Yy][Ee][Ss])
        echo "Cleaning build artifacts..."
        make clean
        ;;
esac

# 编译选项
echo "CC: ${CC}"
echo "CFLAGS: ${CFLAGS}"

# 编译主程序
echo "Compiling demo.c..."
${CC} ${CFLAGS} demo.c -o demo.dummy


# 如果有 Makefile，也可以使用 make
if [ -f Makefile ]; then
    echo "Running make ${MAKE_FLAGS}"
    make ${MAKE_FLAGS}
fi

echo "Build completed successfully!"
```


## `set -e`
设置脚本在遇到任何错误时立即退出，避免错误继续执行。

## `case ${MakeClean} in ... esac`
检查环境变量 `MakeClean` 的值：
- 如果值为 `yes`、`y`、`YES`、`Y` 等（不区分大小写），则执行 `make clean` 清理构建产物
- 用于支持增量构建时的清理操作

## `echo "CC: ${CC}"` 和 `echo "CFLAGS: ${CFLAGS}"`
输出当前使用的编译器和编译选项，用于调试。

## `echo "Compiling demo.c..."`
输出正在编译的提示信息。

## `${CC} ${CFLAGS} demo.c -o demo.dummy`
使用交叉编译器 `CC` 和编译选项 `CFLAGS` 编译 `demo.c`，生成 `demo.dummy` 可执行文件。

## `if [ -f Makefile ]; then ... fi`
检查当前目录是否存在 `Makefile`：
- 如果存在，执行 `make ${MAKE_FLAGS}` 进行构建
- 用于兼容 Makefile 构建方式

## `echo "Build completed successfully!"`
输出构建成功的信息。
