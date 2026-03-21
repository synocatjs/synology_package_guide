## 端口配置

如果您的套件服务使用特定端口进行通信（例如 Surveillance Station 使用 19997/udp 作为源端口，19998/udp 作为目标端口），您应为该套件准备一个服务配置文件，描述将使用的端口。之后，当用户从内置应用程序创建防火墙规则或端口转发规则时，您的套件服务也会列出供选择。

---

### 服务配置文件名

文件名应遵循命名约定 `[package_name].sc`（例如 `SurveillanceStation.sc`）。`[package_name]` 应为 INFO 文件中 `package` 键指定的套件名称，`sc` 表示服务配置文件。

---

### 配置格式模板

请参考以下示例：

```
[service_name]
title="English title"
desc="English description"
port_forward="yes" or "no"
src.ports="ports/protocols"
dst.ports="ports/protocols"

[service_name2]
...
```

---

### 配置项说明

| 配置项/键 | 描述 | 值 | 默认值 | DSM 版本要求 |
|-----------|------|-----|--------|--------------|
| **service_name** | 必需。通常一个套件只有一个唯一的服务名称。如果您的套件需要多个端口描述，可以定义 service_name2、service_name3 等。<br>注意：service_name 不能为空，只能包含字符 "a~z"、"A~Z"、"0~9"、"-"、"\\"、"." | 唯一服务名称 | N/A | 4.0-2206 |
| **title** | 必需。在防火墙内置选择菜单的"协议"字段中显示的英文标题。 | 英文标题 | N/A | 4.0-2206 |
| **desc** | 必需。在防火墙内置选择菜单的"应用程序"字段中显示的英文描述。 | 英文描述 | N/A | 4.0-2206 |
| **port_forward** | 可选。如果设置为 "yes"，当用户从内置应用程序设置端口转发规则时，您的套件服务相关端口将列出；否则不会列出。 | "yes" 或 "no" | "no" | 4.0-2206 |
| **src.ports** | 可选。如果您的套件服务有指定的源端口，可以在此键中设置。值应至少包含端口号，默认协议为 tcp + udp。<br>示例：`6000,7000:8000/tcp,udp` 表示源端口为 6000、7000 到 8000，所有端口均为 tcp + udp。 | ports/protocols<br>ports: 1~65535（用 ',' 分隔，使用 ':' 表示端口范围）<br>protocols: tcp,udp（用 ',' 分隔） | ports: N/A<br>protocols: tcp,udp | 4.0-2206 |
| **dst.ports** | 必需。每个服务应有目标端口。值应至少包含端口号，默认协议为 tcp + udp。<br>示例：`6000,7000:8000/tcp,udp` 表示目标端口为 6000、7000 到 8000，所有端口均为 tcp + udp。 | ports/protocols<br>ports: 1~65535（用 ',' 分隔，使用 ':' 表示端口范围）<br>protocols: tcp,udp（用 ',' 分隔） | ports: N/A<br>protocols: tcp,udp | 4.0-2206 |

---

### 示例（SurveillanceStation.sc）

```
[ss_findhostd_port]
title="Search Surveillance Station"
desc="Surveillance Station"
port_forward="yes"
src.ports="19997/udp"
dst.ports="19998/udp"
```

---

### 集成到资源配置

准备好服务配置文件后，将以下内容添加到资源规范文件中。更多详情请参阅 Port Config。

```json
"port-config": {
    "protocol-file": "port_conf/xxdns.sc"
}
```

---

### 检查端口冲突

在尝试更改端口号之前，您需要检查该端口号是否已被使用。

#### 如何检查端口号是否已被使用

假设套件名为 DhcpServer，端口配置文件 `DhcpServer.sc` 包含：

```
[dhcp_udp]
title="DHCP Server"
title_key="DHCP Server"
desc="DHCP Server"
desc_key="DHCP Server"
port_forward="no"
dst.ports="67,68/udp"
```

当您尝试将端口号从 67 更改为 667 时，请运行以下指令检查端口是否已被使用：

```bash
servicetool --conf-port-conflict-check --tcp 667
```

输出示例：

```
root@dev:~# servicetool --conf-port-conflict-check  --tcp 667
IsConflict: false       Port: 667       Protocol: tcp   ServiceName: (null)
root@dev:~#
```

**注意：** 返回代码并不表示端口占用情况，您需要解析标准输出以提取 `IsConflict` 值。如果 `IsConflict` 值为 `false`，您可以安全使用该端口号。