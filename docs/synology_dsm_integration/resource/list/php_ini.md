## PHP INI

### 描述

套件可以携带自定义的 `php.ini` 和 `fpm.conf` 文件。此 worker 在套件启动/停止期间安装/卸载这些配置文件。

---

### 行为说明

#### Acquire()（获取资源）
- 将 `php.ini` 和 `fpm.conf` 文件复制到：
  - `/usr/local/etc/php56/conf.d/`
  - `/usr/local/etc/php56/fpm.d/`
- 然后重新加载 `php56-fpm`
- `php.ini` 文件必须具有 `.ini` 扩展名，`fpm.conf` 文件必须具有 `.conf` 扩展名，否则将被忽略
- 文件将以 `${package}` 作为前缀命名
- 如果文件已存在，将先执行 `unlink()` 删除
- 任何文件复制失败将导致此 worker 中止并触发回滚

#### Release()（释放资源）
- 删除之前创建的链接
- 忽略找不到的文件
- 忽略 `unlink()` 失败

---

### 提供者

PHP 5.6

---

### 时机

`FROM_ENABLE_TO_DISABLE`

---

### 环境变量

无

---

### 可更新

否

---

### 语法

```json
"php": {
    "php-ini": [{
        "relpath": "<ini-relpath>"
    }, ...],
    "fpm-conf": [{
        "relpath": "<conf-relpath>"
    }, ...]
}
```

| 成员 | 自版本 | 描述 |
|------|--------|------|
| `php-ini` | PHP5.6-5.6.17-0020 | 对象数组，要安装的 `php.ini` 文件列表 |
| `fpm-conf` | PHP5.6-5.6.17-0020 | 对象数组，要安装的 `fpm.conf` 文件列表 |
| `relpath` | PHP5.6-5.6.17-0020 | 目标文件相对于 `/var/packages/${package}/target/` 的路径 |

---

### 示例

```json
{
    "php": {
        "php-ini": [{
            "relpath": "synology_added/etc/php/conf.d/test_1.ini"
        }, {
            "relpath": "synology_added/etc/php/conf.d/test_2.ini"
        }, {
            "relpath": "synology_added/etc/php/conf.d/test_3.ini"
        }],
        "fpm-conf": [{
            "relpath": "synology_added/etc/php/fpm.d/test_1.conf"
        }, {
            "relpath": "synology_added/etc/php/fpm.d/test_2.conf"
        }, {
            "relpath": "synology_added/etc/php/fpm.d/test_3.conf"
        }]
    }
}
```

---

### 目录结构示例

```
target/
└── synology_added/
    └── etc/
        └── php/
            ├── conf.d/
            │   ├── test_1.ini
            │   ├── test_2.ini
            │   └── test_3.ini
            └── fpm.d/
                ├── test_1.conf
                ├── test_2.conf
                └── test_3.conf
```

---

### 安装后的文件位置

| 文件类型 | 源路径 | 目标路径 |
|----------|--------|----------|
| php.ini | `/var/packages/${package}/target/synology_added/etc/php/conf.d/test_1.ini` | `/usr/local/etc/php56/conf.d/${package}-test_1.ini` |
| fpm.conf | `/var/packages/${package}/target/synology_added/etc/php/fpm.d/test_1.conf` | `/usr/local/etc/php56/fpm.d/${package}-test_1.conf` |

---

### 使用场景

- 为 Web 应用程序配置 PHP 扩展和设置
- 调整 PHP-FPM 进程管理参数
- 设置会话存储路径
- 配置上传文件大小限制
- 调整内存限制和执行时间

---

### 注意事项

- 配置文件会以套件名称作为前缀，避免与其他套件冲突
- 配置文件语法必须正确，否则可能导致 PHP-FPM 重载失败
- 配置错误会导致 worker 中止并回滚所有更改
- 套件禁用时，配置文件会自动从 PHP 配置目录中移除
- 修改后会自动重新加载 PHP-FPM，无需手动重启