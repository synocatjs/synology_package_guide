## Docker（自 DSM 7.0）

### 描述

Docker worker 专为 Docker 套件设计，帮助它们轻松部署容器，而无需自行调用 Docker 命令。Docker worker 使用 Docker Compose 框架，将根据用户的 Docker worker 配置生成 `docker-compose.yaml`，并在安装期间创建容器。

---

### 行为说明

#### FROM_POSTINST_TO_PREUNINST（安装/移除阶段）
- **Acquire()**：创建 `docker-compose.yaml` 并准备供容器挂载的主机卷。worker 还会在此阶段创建容器。
- **Release()**：移除 `docker-compose.yaml`、主机卷、容器和镜像。注意：在升级 Docker 套件期间，worker 不会移除主机卷。

#### FROM_STARTUP_TO_HALT（启动/停止阶段）
- **Acquire()**：启动容器。
- **Release()**：停止容器。

---

### 提供者

Docker

---

### 时机

- `FROM_POSTINST_TO_PREUNINST`
- `FROM_STARTUP_TO_HALT`

---

### 环境变量

无

---

### 可更新

否

---

### 语法

```json
"docker": {
    "services": [{
        "service": "service1",
        ...
    }, {
        "service": "service2",
        ...
    }]
}
```

| 键 | 自版本 | 类型 | 必需 | 可空 | 默认值 | 描述 |
|----|--------|------|------|------|--------|------|
| `services` | 18.09.0-1018 | Array | true | false | N/A | 创建 `docker-compose.yaml` 的 Docker 服务信息列表 |

---

### services 配置

| 键 | 自版本 | 类型 | 必需 | 可空 | 默认值 | 描述 |
|----|--------|------|------|------|--------|------|
| `service` | 18.09.0-1018 | string | true | false | N/A | 服务名称 |
| `image` | 18.09.0-1018 | string | true | false | N/A | 镜像名称 |
| `tag` | 18.09.0-1018 | string | true | false | N/A | 镜像标签 |
| `build` | 18.09.0-1018 | string | true | false | N/A | Dockerfile 目录的相对路径 |
| `container_name` | 18.09.0-1018 | string | false | true | N/A | 容器名称 |
| `shares` | 18.09.0-1018 | array | false | true | N/A | 容器挂载卷规范（持久数据） |
| `volumes` | 18.09.0-1018 | array | false | true | N/A | 容器挂载卷规范（配置文件） |
| `ports` | 18.09.0-1018 | array | false | true | N/A | 容器端口规范 |
| `environment` | 18.09.0-1018 | array | false | false | N/A | 容器环境变量规范 |
| `depends` | 18.09.0-1018 | array | false | false | N/A | 指定依赖服务 |

---

### build（构建）

用于使用给定 Dockerfile 路径构建镜像。路径基于套件目标路径（`/var/packages/PKG_NAME/target/`）。

**语法：**
```json
{
    "build": "[Dockerfile directory]"
}
```

**转换后的 docker-compose.yaml：**
```yaml
build: /var/packages/PKG_NAME/target/[Dockerfile directory]
```

**示例：**
```json
{
    "build": "odoo_docker"
}
```
```yaml
build: /var/packages/Odoo/target/odoo_docker
```

---

### volumes（卷）

卷包含两种类别：`shares` 和 `volumes`，用途不同：
- **shares**：用于持久数据。用户只需填写目录名，worker 将首先在 Docker 共享目录下为用户创建目录，然后在 `docker-compose.yaml` 的 `volumes` 部分生成 `SOURCE:TARGET` 对。
- **volumes**：用于配置文件或相对文件。用户可以指定相对于套件目标路径的主机配置文件或目录路径。

#### shares 语法
```json
{
    "shares": [{
        "host_dir": "[host directory]",
        "mount_point": "[mount point]"
    }]
}
```
```yaml
volumes:
  - /volumeX/docker/PKG_NAME/[host directory]:[mount point]
```

#### volumes 语法
```json
{
    "volumes": [{
        "host_dir": "[host config or directory]",
        "mount_point": "[mount point]"
    }]
}
```
```yaml
volumes:
  - /var/packages/PKG_NAME/target/[host config or directory]:[mount point]
```

---

### ports（端口）

用于创建容器的端口绑定。

**限制：** 主机端口需在 1025 到 65535 之间。

**语法：**
```json
{
    "ports": [{
        "host_port": "[port on host]",
        "container_port": "[port in container]",
        "protocol": "[tcp or udp]"
    }]
}
```
```yaml
ports:
  - "[host_port]:[container_port]/[protocol]"
```

---

### environment（环境变量）

用于为容器创建环境变量和值。

**语法：**
```json
{
    "environment": [{
        "env_var": "[variable name]",
        "env_value": "[value]"
    }]
}
```
```yaml
environment:
  - "[variable name]=[value]"
```

---

### depends（依赖）

用于指定依赖服务，与 Docker Compose 相同。

**语法：**
```json
{
    "depends": [{
        "dep_service": "[service name]"
    }]
}
```
```yaml
depends_on:
  - [service name]
```

---

### 完整示例：Odoo 套件

#### conf/resource 配置

```json
{
    "docker": {
        "services": [{
            "service": "odoo",
            "build": "odoo_docker",
            "image": "odoo",
            "container_name": "Odoo",
            "tag": "12.0",
            "environment": [{
                "env_var": "HOST",
                "env_value": "odoo_db"
            }, {
                "env_var": "USER",
                "env_value": "odoo"
            }, {
                "env_var": "PASSWORD",
                "env_value": "odoo"
            }],
            "shares": [{
                "host_dir": "odoo_data",
                "mount_point": "/var/lib/odoo"
            }],
            "ports": [{
                "host_port": "{{wizard_http_port}}",
                "container_port": "8069",
                "protocol": "tcp"
            }],
            "depends": [{
                "dep_service": "odoo_db"
            }]
        }, {
            "service": "odoo_db",
            "image": "postgres",
            "tag": "10",
            "container_name": "Odoo_db",
            "shares": [{
                "host_dir": "db",
                "mount_point": "/var/lib/postgresql/data/pgdata"
            }],
            "environment": [{
                "env_var": "POSTGRES_DB",
                "env_value": "postgres"
            }, {
                "env_var": "POSTGRES_PASSWORD",
                "env_value": "odoo"
            }, {
                "env_var": "POSTGRES_USER",
                "env_value": "odoo"
            }, {
                "env_var": "PGDATA",
                "env_value": "/var/lib/postgresql/data/pgdata"
            }]
        }]
    }
}
```

#### 生成的 docker-compose.yaml

```yaml
version: '3'
services:
  odoo:
    build: /var/packages/Docker_Odoo_SynoCommunity/target/odoo_docker
    image: odoo:12.0
    container_name: Odoo
    environment:
      - HOST=odoo_db
      - USER=odoo
      - PASSWORD=odoo
    volumes:
      - /volume1/docker/Docker_Odoo_SynoCommunity/odoo_data:/var/lib/odoo
    ports:
      - "30076:8069/tcp"
    depends_on:
      - odoo_db
    networks:
      - Docker_Odoo_SynoCommunity
  odoo_db:
    image: postgres:10
    container_name: Odoo_db
    environment:
      - POSTGRES_DB=postgres
      - POSTGRES_PASSWORD=odoo
      - POSTGRES_USER=odoo
      - PGDATA=/var/lib/postgresql/data/pgdata
    volumes:
      - /volume1/docker/Docker_Odoo_SynoCommunity/db:/var/lib/postgresql/data/pgdata
    networks:
      - Docker_Odoo_SynoCommunity
networks:
  Docker_Odoo_SynoCommunity:
    driver: bridge
```

---

### 使用说明

1. **安装时**：worker 生成 `docker-compose.yaml`，创建主机卷，拉取/构建镜像，创建容器
2. **启动时**：worker 启动所有容器
3. **停止时**：worker 停止所有容器
4. **卸载时**：worker 移除容器、镜像、卷和配置文件（但保留持久数据卷可选）
5. **升级时**：保留主机卷，避免数据丢失

---

### 注意事项

- 主机端口必须在 1025-65535 范围内
- 镜像标签可以是版本号或 `latest`
- `build` 路径必须包含有效的 Dockerfile
- 网络名称自动生成，使用套件名称作为前缀
- 支持向导变量（如 `{{wizard_http_port}}`）动态配置端口