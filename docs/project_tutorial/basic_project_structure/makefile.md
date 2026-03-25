# Makefile 文件

```makefile
# Makefile for Synology DSM Package
include /env.mak

EXEC = demo
OBJS = demo.o

all: $(EXEC)

$(EXEC): $(OBJS)
	$(CC) $(CFLAGS) $^ -o $@ $(LDFLAGS)

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

install: $(EXEC)
	mkdir -p $(DESTDIR)/var/packages/$(PKG_NAME)/target/bin/
	install -m 755 $(EXEC) $(DESTDIR)/var/packages/$(PKG_NAME)/target/bin/

clean:
	rm -rf *.o $(EXEC)

.PHONY: all install clean
```

## `include /env.mak`
包含一个外部 Makefile 配置文件 `/env.mak`，这个文件定义了交叉编译环境变量（如 `CC`、`CFLAGS`、`LDFLAGS` 等）。

## 变量定义
- `EXEC = demo` - 定义目标可执行文件名为 `demo`
- `OBJS = demo.o` - 定义目标文件列表为 `demo.o`

## 目标 `all: $(EXEC)`
默认目标，依赖 `demo` 可执行文件。

## 目标 `$(EXEC): $(OBJS)`
构建 `demo` 可执行文件：
- 依赖 `demo.o`
- 使用 `$(CC)` 编译器、`$(CFLAGS)` 编译选项、`$(LDFLAGS)` 链接选项
- `$^` 表示所有依赖（demo.o）
- `$@` 表示目标（demo）

## 模式规则 `%.o: %.c`
编译 `.c` 源文件为 `.o` 目标文件：
- `$<` 表示第一个依赖（demo.c）
- `$@` 表示目标（demo.o）

## 目标 `install: $(EXEC)`
安装目标，依赖 `demo` 可执行文件：
- 创建目录 `$(DESTDIR)/var/packages/$(PKG_NAME)/target/bin/`
- 使用 `install` 命令将 `demo` 复制到该目录，权限设置为 755

## 目标 `clean`
清理目标：
- 删除所有 `.o` 文件和 `demo` 可执行文件

## `.PHONY: all install clean`
声明 `all`、`install`、`clean` 为伪目标，避免与同名文件冲突。