# 📋 build 文件解释

```bash
#!/bin/bash
# Copyright (C) 2000-2020 Synology Inc. All rights reserved.

case ${MakeClean} in
	[Yy][Ee][Ss])
		make clean
		;;
esac

# You can use CC CFLAGS LD LDFLAGS CXX CXXFLAGS AR RANLIB READELF STRIP here
echo "${CC} ${CFLAGS} examplePkg.c -o examplePkg.dummy"
${CC} ${CFLAGS} examplePkg.c -o examplePkg.dummy

# Or you can use Makefile to genarate executable.
echo "make ${MAKE_FLAGS}"
make ${MAKE_FLAGS}

```

这是一个 **Synology 官方构建系统的构建脚本**，用于编译包的可执行文件。

## 🔧 脚本结构

### 清理操作
```bash
case ${MakeClean} in
	[Yy][Ee][Ss])
		make clean
		;;
esac
```
- 如果 `MakeClean` 变量设置为 yes/YES 等，则执行 `make clean` 清理之前的构建产物

### 编译方式

**方式一：直接编译**
```bash
echo "${CC} ${CFLAGS} examplePkg.c -o examplePkg.dummy"
${CC} ${CFLAGS} examplePkg.c -o examplePkg.dummy
```
- 使用系统提供的编译器 (`CC`) 和编译标志 (`CFLAGS`)
- 将 `examplePkg.c` 编译成 `examplePkg.dummy`

**方式二：使用 Makefile**
```bash
echo "make ${MAKE_FLAGS}"
make ${MAKE_FLAGS}
```
- 使用 `make` 命令执行自定义的 Makefile
- 传递构建标志 (`MAKE_FLAGS`)

## 🔍 环境变量

| 变量 | 说明 |
|------|------|
| `MakeClean` | 是否清理（yes/no） |
| `CC` | C 编译器路径 |
| `CFLAGS` | 编译标志 |
| `MAKE_FLAGS` | make 命令参数 |

## 📦 用途

这个脚本在 Synology 官方构建系统中执行，用于将源代码编译成可以在 DSM 上运行的二进制文件。