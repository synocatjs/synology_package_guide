

# 📦 resource 文件

`resource` 文件定义了包的**资源链接**，特别是**符号链接（symlink）**配置。

```json
{
    "usr-local-linker": {
        "bin": ["usr/local/bin/examplePkg"]
    }
}
```

## 字段说明

| 字段 | 说明 |
|------|------|
| `usr-local-linker` | 定义 `/usr/local` 下的链接 |
| `bin` | 要链接到 `/usr/local/bin/` 的可执行文件列表 |

## 工作原理

当包安装时，会自动创建符号链接：

```bash
# 包的实际位置
/var/packages/examplePkg/target/usr/local/bin/examplePkg

# 创建的链接
/usr/local/bin/examplePkg → /var/packages/examplePkg/target/usr/local/bin/examplePkg
```