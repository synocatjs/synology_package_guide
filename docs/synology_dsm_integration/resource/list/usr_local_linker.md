## /usr/local 链接器

### 描述

套件的可执行文件和库文件应安装到 `/usr/local`。此 worker 在套件启动/停止时链接/取消链接文件到 `/usr/local/{bin,lib,etc}`。

---

### 行为说明

#### Acquire()（获取资源）
- 在 `/usr/local/{bin,lib,etc}/` 下创建指向 `/var/packages/${package}/target/` 中文件的符号链接
- 在 `/var/packages/${package}/target/` 中找不到的文件将被忽略
- 如果目标文件已存在于 `/usr/local/{bin,lib,etc}`，将先执行 `unlink()` 删除
- 任何文件链接失败将导致此 worker 中止并触发回滚

#### Release()（释放资源）
- 删除 `/usr/local/{bin,lib,etc}/` 下的链接
- 忽略找不到的文件
- 忽略 `unlink()` 失败

---

### 提供者

DSM

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
"usr-local-linker": {
  "bin": ["<relpath>", ...],
  "lib": ["<relpath>", ...],
  "etc": ["<relpath>", ...]
}
```

| 成员 | 自版本 | 描述 |
|------|--------|------|
| `bin` | 6.0-5941 | 字符串数组，要链接到 `/usr/local/bin/` 下的文件列表 |
| `lib` | 6.0-5941 | 字符串数组，要链接到 `/usr/local/lib/` 下的文件列表 |
| `etc` | 6.0-5941 | 字符串数组，要链接到 `/usr/local/etc/` 下的文件列表 |
| `relpath` | 6.0-5941 | 字符串，目标文件相对于 `/var/packages/${package}/target/` 的路径 |

---

### 示例

#### 配置

```json
"usr-local-linker": {
  "bin": ["usr/bin/a2p", "usr/bin/perl"],
  "lib": ["lib/perl5"]
}
```

#### 生成的符号链接（Perl 套件）

```bash
root@DS $ ls -l /usr/local/{bin,lib,etc}

/usr/local/bin/:
total 0
lrwxrwxrwx 1 root root   30 Aug 13 06:32 a2p -> /var/packages/Perl/target/usr/bin/a2p
lrwxrwxrwx 1 root root   31 Aug 13 06:32 perl -> /var/packages/Perl/target/usr/bin/perl

/usr/local/lib/:
total 0
lrwxrwxrwx 1 root root   28 Aug 13 06:32 perl5 -> /var/packages/Perl/target/lib/perl5

/usr/local/etc/:
total 0
```

---

### 使用场景

- 将 Perl、Python 等解释器链接到系统路径
- 将命令行工具暴露给系统 shell
- 使套件的库文件可供其他应用程序使用