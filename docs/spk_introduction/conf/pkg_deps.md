# PKG_DEPS

`PKG_DEPS` 类似于 INFO 文件中的 `install_dep_packages` 键，但它额外定义了根据特定操作系统版本的限制。

**注意：** `PKG_DEPS` 的优先级高于 INFO 中的 `install_dep_packages`。

每个配置文件使用标准的 .ini 文件格式定义，包含键/值对和节（section）。每个节描述一个依赖/冲突套件的唯一名称。每个节包含有关套件版本要求和操作系统版本限制的信息。

## 配置键说明

| 键 | 可用性 | 描述 | 值格式 |
|---|--------|------|--------|
| `pkg_min_ver` | DSM 4.2+ | 依赖套件的最低版本要求 | 套件版本号 |
| `pkg_max_ver` | DSM 4.2+ | 依赖套件的最高版本要求 | 套件版本号 |
| `dsm_min_ver` | DSM 4.2 - DSM 7.1 | 最低要求的 DSM 版本。DSM 7.2 起被 `os_min_ver` 取代 | X.Y-Z（DSM 主版本号、次版本号、构建版本号） |
| `dsm_max_ver` | DSM 4.2 - DSM 7.1 | 最高要求的 DSM 版本。DSM 7.2 起被 `os_max_ver` 取代 | X.Y-Z（DSM 主版本号、次版本号、构建版本号） |
| `os_min_ver` | DSM 7.2-60112+ | 最低要求的操作系统版本 | X.Y-Z（操作系统主版本号、次版本号、构建版本号） |
| `os_max_ver` | DSM 7.2-60112+ | 最高要求的操作系统版本 | X.Y-Z（操作系统主版本号、次版本号、构建版本号） |

---

## 配置示例

```ini
; 您的套件依赖任意版本的 Package A
[Package A]

; 您的套件依赖 Package B 版本 2 或更高版本
[Package B]
pkg_min_ver=2

; 您的套件依赖 Package C 版本 2 或更低版本
[Package C]
pkg_max_ver=2

; 您的套件依赖 Package D 版本 2 或更高版本
; 但当操作系统版本低于 7.2-60000 时，此依赖将被忽略
[Package D]
os_min_ver=7.2-60000
pkg_min_ver=2

; 您的套件依赖 Package E 版本 2 或更高版本
; 但当操作系统版本高于 7.2-60000 时，此依赖将被忽略
[Package E]
os_max_ver=7.2-60000
pkg_min_ver=2
```

---

## 使用说明

1. **优先级**：`PKG_DEPS` 中的配置会覆盖 INFO 中的 `install_dep_packages` 设置
2. **版本范围**：可以组合使用 `pkg_min_ver` 和 `pkg_max_ver` 来定义精确的版本范围
3. **操作系统限制**：通过 `os_min_ver` 和 `os_max_ver` 可以指定仅在特定 DSM/OS 版本范围内应用依赖关系
4. **注释**：使用分号 `;` 添加注释行