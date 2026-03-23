# depends 文件

```bash
# Copyright (C) 2000-2020 Synology Inc. All rights reserved.

[default]
all="7.0"
```

这是一个 **Synology 构建系统的依赖声明文件**，用于指定包支持的 DSM 版本。

## 📝 格式说明

```ini
[default]
all="7.0"
```

- `[default]`：默认配置节
- `all="7.0"`：表示该包支持 DSM 7.0 及以上版本

## 🎯 用途

在 Synology 官方构建系统（如 SynoCommunity）中，此文件用于：
- 声明包兼容的 DSM 版本范围
- 构建系统据此决定使用哪个版本的构建环境
- 依赖解析和兼容性检查

## 📦 常见写法

```ini
[default]
all="6.0"      # 支持 DSM 6.0+
all="7.0"      # 支持 DSM 7.0+
all="7.0,7.1"  # 支持多个特定版本
```