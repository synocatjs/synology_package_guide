# 资源配置

资源配置定义了套件正常工作所需的系统资源。

## 基本格式

```json
{
  "<resource-id>": {
    <specification>
  }
}
```

---

## 示例：/usr/local 链接器

```json
{
  "usr-local-linker": {
    "lib": ["lib/foo"],
    "bin": ["bin/foo"],
    "etc": ["etc/foo"]
  }
}
```

在此示例中：
- `usr-local-linker` 是资源标识符
- 其值指定需要链接的文件

---

## 资源标识符说明

| 资源 ID | 描述 |
|---------|------|
| **usr-local-linker** | 用于在 `/usr/local` 下创建符号链接，使套件的库、二进制文件或配置文件可以被系统访问 |

---

## 规范说明

| 字段 | 类型 | 描述 |
|------|------|------|
| `lib` | array | 需要链接到 `/usr/local/lib` 的库文件路径列表 |
| `bin` | array | 需要链接到 `/usr/local/bin` 的二进制文件路径列表 |
| `etc` | array | 需要链接到 `/usr/local/etc` 的配置文件路径列表 |

---

## 使用场景

通过 `usr-local-linker` 资源配置，套件可以在较低权限身份下，将自身的库文件、可执行文件或配置文件链接到系统目录，从而实现：
- 系统级工具的访问
- 库文件的共享使用
- 配置文件的集中管理