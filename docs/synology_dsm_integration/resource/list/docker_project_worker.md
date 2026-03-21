## Docker Project Worker

### 描述

Docker Project Worker 由 Container Manager 提供，基于 docker-compose 技术，是一个使用 Compose 文件格式在 Docker 上运行多容器应用程序的工具。

相比仅提供有限配置的 Docker Worker，Docker Project Worker 更加灵活，可用于定义多个项目。

当套件安装/卸载时，worker 将根据提供的路径使用内部的 compose 文件创建（或更新）项目并构建它。在套件启动或停止阶段，worker 会启动或停止项目。

---

### 提供者

ContainerManager >= 1432（自 DSM 7.2.1 起）

---

### 时机

#### FROM_POSTINST_TO_PREUNINST（安装/移除阶段）
- **Acquire()**：根据提供的配置创建（或更新）并构建项目
- **Release()**：删除项目

#### FROM_STARTUP_TO_HALT（启动/停止阶段）
- **Acquire()**：启动项目
- **Release()**：停止项目

---

### 环境变量

无

---

### 可更新

否

---

### 语法

```json
{
    "docker-project": {
        "preload-image": "image.tar.gz",
        "projects": [{
            "name": "django-project",
            "path": "django"
        }, {
            "name": "wordpress-project",
            "path": "wordpress-mysql"
        }]
    }
}
```

| 键 | 类型 | 必需 | 描述 |
|----|------|------|------|
| `preload-image` | String | false | 加载镜像 tar 包 |
| `projects` | Array | true | Docker 项目列表 |

---

### projects 配置

| 键 | 类型 | 必需 | 描述 |
|----|------|------|------|
| `name` | string | true | 项目名称 |
| `path` | string | true | compose.yaml 所在目录，相对于 target 路径 |
| `build_params` | object | false | 构建项目参数，详见下表 |

---

### build_params 配置

这些属性在升级时非常有用。

| 键 | 类型 | 默认值 | 描述 |
|----|------|--------|------|
| `force_pull` | boolean | false | 强制拉取镜像 |
| `force_recreate` | boolean | true | 强制重新创建容器 |
| `build` | boolean | true | 强制构建 Dockerfile |

---

### 示例：WordPress + MySQL

#### compose.yml 文件内容

```yaml
services:
  db:
    # 使用同时支持 amd64 和 arm64 架构的 mariadb 镜像
    image: mariadb:10.6.4-focal
    # 如果确实需要使用 MySQL，取消下面一行的注释
    #image: mysql:8.0.27
    command: '--default-authentication-plugin=mysql_native_password'
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=somewordpress
      - MYSQL_DATABASE=wordpress
      - MYSQL_USER=wordpress
      - MYSQL_PASSWORD=wordpress
    expose:
      - 3306
      - 33060
  wordpress:
    image: wordpress:latest
    ports:
      - 9527:80
    restart: always
    environment:
      - WORDPRESS_DB_HOST=db
      - WORDPRESS_DB_USER=wordpress
      - WORDPRESS_DB_PASSWORD=wordpress
      - WORDPRESS_DB_NAME=wordpress
volumes:
  db_data:
```

#### target 目录结构

```
target
├── image.tar.gz
├── django
│   ├── app
│   │   ├── Dockerfile
│   │   ├── example
│   │   │   ├── __init__.py
│   │   │   ├── settings.py
│   │   │   ├── urls.py
│   │   │   └── wsgi.py
│   │   ├── manage.py
│   │   └── requirements.txt
│   ├── compose.yaml
│   └── README.md
└── wordpress-mysql
    └── compose.yml
```

---

### 资源配置示例

```json
{
    "docker-project": {
        "preload-image": "image.tar.gz",
        "projects": [{
            "name": "django-project",
            "path": "django",
            "build_params": {
                "force_pull": false,
                "force_recreate": true,
                "build": true
            }
        }, {
            "name": "wordpress-project",
            "path": "wordpress-mysql"
        }]
    }
}
```

---

### 与 Docker Worker 的区别

| 特性 | Docker Worker | Docker Project Worker |
|------|---------------|----------------------|
| 配置灵活性 | 有限，仅支持预定义配置 | 完全灵活，支持完整 compose 文件 |
| 项目数量 | 单个 | 多个 |
| compose 文件 | 自动生成 | 用户提供 |
| 适用场景 | 简单容器部署 | 复杂多容器应用 |
| DSM 版本要求 | DSM 7.0+ | DSM 7.2.1+ |

---

### 使用说明

1. **安装时**：加载预加载镜像（如果提供），根据 compose 文件创建项目并构建
2. **启动时**：启动所有项目容器
3. **停止时**：停止所有项目容器
4. **卸载时**：删除所有项目
5. **升级时**：根据 `build_params` 决定是否强制重建

---

### 注意事项

- `preload-image` 可用于预加载大型镜像，减少首次启动时间
- compose 文件必须命名为 `compose.yaml` 或 `compose.yml`
- 项目名称用于标识不同项目，在同一系统中必须唯一
- 支持多个项目同时运行，各自独立管理