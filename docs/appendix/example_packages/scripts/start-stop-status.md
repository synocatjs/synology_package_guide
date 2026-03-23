# start-stop-status 脚本解释

```bash
#!/bin/sh
# Copyright (C) 2000-2020 Synology Inc. All rights reserved.

case $1 in
	start)
		### Start this package.
		examplePkg "Start"
		echo "the package has been started" > $SYNOPKG_TEMP_LOGFILE
		exit 0
	;;
	stop)
		### Stop this package.
		examplePkg "Stop"
		echo "the package has been stopped" > $SYNOPKG_TEMP_LOGFILE
		exit 0
	;;
	status)
		### Check package alive.
		if [ -h "/usr/local/bin/examplePkg" ]; then
			exit 0
		else
			exit 1
		fi
	;;
	killall)
        ;;
	log)
		exit 0
	;;
esac
```
这是一个 **Synology DSM 包的服务控制脚本**，用于管理包的启动、停止和状态检查。

## 🔧 脚本结构

### 命令处理
```bash
case $1 in
    start)      # 启动服务
    stop)       # 停止服务
    status)     # 检查服务状态
    killall)    # 强制终止（空实现）
    log)        # 日志处理（空实现）
esac
```

## 📝 各命令说明

### start
- 调用 `examplePkg "Start"` 启动服务
- 将启动信息写入 `$SYNOPKG_TEMP_LOGFILE`
- 返回 0 表示成功

### stop
- 调用 `examplePkg "Stop"` 停止服务
- 将停止信息写入 `$SYNOPKG_TEMP_LOGFILE`
- 返回 0 表示成功

### status
- 检查 `/usr/local/bin/examplePkg` 符号链接是否存在
- 存在 → 返回 0（服务运行中）
- 不存在 → 返回 1（服务未运行）

### killall 和 log
- 空实现，保留作为占位符

## 🔍 环境变量

- `$SYNOPKG_TEMP_LOGFILE`：DSM 提供的临时日志文件路径

## ✅ 返回值

- `0`：成功（start/stop 成功，或 status 检测到运行中）
- `1`：失败（status 检测到未运行）