## Web 配置（自 DSM 7.2）

### 描述

此 worker 处理 Nginx 静态配置。使注册的 Nginx 静态配置在期望的时间生效。所需资源可以同步注册，包括端口和 80/443 别名。可以单独声明，无需额外指定配置。

---

### 时机

#### FROM_POSTINST_TO_PREUNINST（安装/移除阶段）
- **Acquire()**：将 `/var/packages/${package}/target/` 下所有注册的配置复制到对应的 nginx available 文件夹，并创建禁用时机的配置链接到对应的 nginx enable 文件夹
- **Release()**：移除所有 available 配置和 enable 链接

#### FROM_STARTUP_TO_HALT（启动/停止阶段）

**Acquire()**
- 从对应的 nginx 文件夹中移除禁用时机的 enable 配置链接
- 创建启用时机的配置链接到对应的 nginx 文件夹

**Release()**
- 从对应的 nginx 文件夹中移除启用时机的 enable 配置链接
- 创建禁用时机的配置链接到对应的 nginx 文件夹

---

### 注意事项

- 创建 enable 链接时，会先锁定并测试 nginx 配置，以避免竞态条件，并确保与已启用的配置不冲突
- 如果过程中发生任何故障，Acquire 将立即结束。Release 会尽可能完成，即使过程中出现错误
- 如果某个配置同时注册了启用和禁用时机，该配置将在套件安装后创建 enable 链接，并在套件移除时删除 enable 链接。套件的启用/禁用不会操作该链接
- 当配置复制到 available 文件夹时，其名称将进行哈希计算，并添加相应的前缀和后缀。无需担心与其他配置或您自己的配置发生冲突。转换后的配置名称为 `{type 前缀}.{package}-hash({path}).conf`
- Worker 不会重新加载 nginx，如果需要重新加载 nginx 服务，请按照以下说明操作：
  - 如果有启用时机的配置，套件所有者需要在 INFO 中标记 `instuninst_restart_services = nginx.service`
  - 如果有禁用时机的配置，套件所有者需要在 INFO 中标记 `instuninst_restart_services = nginx.service` 和 `startstop_restart_services = nginx.service`
- 注册端口资源仅限于允许 nginx 框架协助保留和确认端口号的使用。套件仍需编写 port config worker 来注册端口号

---

### 提供者

DSM

---

### 时机

`FROM_POSTINST_TO_PREUNINST` 和 `FROM_STARTUP_TO_HALT`

---

### 环境变量

无

---

### 可更新

否

---

### 语法

```json
"web-config": {
    "nginx-static-config": {
        "enable": [{
            "type": "<config type>",
            "relpath": "<config relpath>",
            "ports": [{
                "port": "<config port used>",
                "protocol": "<config port protocol used>",
                "schema": "<config port schema used>"
            }],
            "alias": ["<config alias used>"]
        }],
        "disable": [{
            "type": "<config type>",
            "relpath": "<config relpath>",
            "ports": [{
                "port": "<config port used>",
                "protocol": "<config port protocol used>",
                "schema": "<config port schema used>"
            }],
            "alias": ["<config alias used>"]
        }]
    }
}
```

---

### nginx-static-config 配置

| 成员 | 自版本 | 描述 |
|------|--------|------|
| `nginx-static-config` | 7.0-40120 | 列出套件要使用的 nginx 静态配置 |
| `enable` | 7.0-40120 | 列出套件启用时要应用的 nginx 静态配置 |
| `disable` | 7.0-40120 | 列出套件禁用时要应用的 nginx 静态配置 |
| `type` | 7.0-40120 | 要放置的配置类型，决定其在 nginx 配置中的包含位置。目前支持：`dsm`、`www`、`http`、`server`、`x-accel`、`main` |
| `relpath` | 7.0-40120 | 要放置的配置相对于 `/var/packages/${package}/target/` 的路径 |
| `port` | 7.1-42446 | 声明使用的端口号 |
| `protocol` | 7.1-42446 | 声明使用的端口协议，可填写 `tcp`/`udp`/`both` |
| `schema` | 7.1-42446 | 声明使用的端口模式，可填写 `http`/`https` |
| `alias` | 7.1-42446 | 声明的 80/443 别名 |

---

### type 类型说明

| 名称 | 自版本 | 描述 |
|------|--------|------|
| `dsm` | 7.0-40120 | 适用于 DSM Server block 和 DSM 自定义域名块（5000/5001） |
| `www` | 7.0-40120 | 适用于默认服务器块（80/443） |
| `http` | 7.0-40120 | 适用于 HTTP 上下文 |
| `server` | 7.0-40120 | 独立的 server 块 |
| `x-accel` | 7.0-40120 | 适用于 DSM Server block、DSM 自定义域名块和默认服务器块，用于放置 x-accel 设置 |
| `main` | 7.0-40227 | 适用于 HTTP 上下文。可以放置独立的 stream 块、mail 块或其他不属于 HTTP 上下文的设置 |

---

### 示例

```json
{
    "web-config": {
        "nginx-static-config": {
            "enable": [{
                "type": "www",
                "relpath": "synology_added/enable",
                "alias": ["www-test"]
            }, {
                "type": "http",
                "relpath": "synology_added/install"
            }, {
                "type": "server",
                "relpath": "synology_added/enable",
                "ports": [{
                    "port": 50400,
                    "protocol": "tcp",
                    "schema": "http"
                }]
            }, {
                "ports": [{
                    "port": 50455,
                    "protocol": "tcp",
                    "schema": "http"
                }],
                "alias": ["unique-test"]
            }],
            "disable": [{
                "type": "x-accel",
                "relpath": "synology_added/disable"
            }, {
                "type": "http",
                "relpath": "synology_added/install"
            }, {
                "type": "dsm",
                "relpath": "synology_added/disable"
            }]
        }
    }
}
```

---

### 目录结构示例

```
target/
└── synology_added/
    ├── enable
    ├── install
    └── disable
```

---

### 使用场景

- 为 Web 套件添加自定义 Nginx 配置
- 在套件启用/禁用时动态应用不同的配置
- 声明端口和别名资源
- 实现 Nginx 配置的热切换

---

### 注意事项

- 配置名称会自动进行哈希处理，避免冲突
- 启用配置前会进行 nginx 配置测试，确保语法正确
- 需要重新加载 nginx 服务时，需在 INFO 中声明相应的重启服务
- 端口声明仅用于资源预留，实际端口配置仍需通过 port config worker 完成
- 套件禁用时，启用时机的配置链接会被移除，禁用时机的配置链接会被创建