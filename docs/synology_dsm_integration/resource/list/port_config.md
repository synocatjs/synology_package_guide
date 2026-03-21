## Port Config

### 描述

在套件安装/卸载期间安装/卸载服务端口配置文件。

关于什么是端口配置文件以及如何编写端口配置文件的详细描述，请参阅"将套件相关端口信息安装到 DSM"。

---

### 行为说明

#### Acquire()（获取资源）
- 将 `.sc` 文件复制到 `/usr/local/etc/service.d/`
- 如果目标文件已存在，则跳过文件复制

#### Release()（释放资源）
- 删除 `.sc` 文件
- 重新加载防火墙和端口转发

#### Update()（更新资源）
- 更新 `.sc` 文件
- 重新加载防火墙和端口转发

---

### 提供者

DSM

---

### 时机

`FROM_POSTINST_TO_POSTUNINST`

---

### 环境变量

无

---

### 可更新

是，请参阅"配置更新"了解如何触发更新。

---

### 语法

```json
"port-config": {
    "protocol-file": "<protocol_file>"
}
```

| 成员 | 自版本 | 描述 |
|------|--------|------|
| `protocol-file` | 6.0-5936 | `.sc` 文件相对于 `/var/packages/${package}/target/` 的路径 |

---

### 示例

```json
"port-config": {
    "protocol-file": "port_conf/xxdns.sc"
}
```

---

### 目录结构示例

```
target/
└── port_conf/
    └── xxdns.sc
```

---

### .sc 端口配置文件格式

端口配置文件（`.sc`）定义了套件使用的网络端口信息，包括端口号、协议类型和服务描述等。DSM 使用这些信息来管理防火墙规则和端口转发。

**示例 .sc 文件内容：**
```
[service]
name = "MyService"
protocol = "tcp"
port = 8080
description = "My Service Web Interface"
```

---

### 安装后的文件位置

| 源路径 | 目标路径 |
|--------|----------|
| `/var/packages/${package}/target/port_conf/xxdns.sc` | `/usr/local/etc/service.d/xxdns.sc` |

---

### 使用场景

- 声明套件使用的网络端口
- 使 DSM 防火墙自动开放套件所需端口
- 配置 UPnP 端口转发
- 在套件中心显示套件使用的端口信息
- 避免端口冲突

---

### 更新流程

当需要更新端口配置时（例如用户更改了监听端口）：

1. 更新 `/var/packages/[package_name]/conf/resource` 文件
2. 执行命令触发更新：
   ```bash
   /usr/syno/sbin/synopkghelper update [package_name] port-config
   ```
3. worker 将更新 `.sc` 文件并重新加载防火墙和端口转发

---

### 注意事项

- 端口配置文件必须具有 `.sc` 扩展名
- 文件复制时，如果目标文件已存在，会跳过复制（不会覆盖）
- 更新时需要手动调用 `synopkghelper` 触发
- 卸载套件时，`.sc` 文件会自动删除
- 端口变更后，防火墙规则会自动更新，无需手动干预