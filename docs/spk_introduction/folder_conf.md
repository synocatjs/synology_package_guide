# conf 文件夹

`conf` 文件夹包含以下文件：

| 文件/文件夹名称 | 必需 | 描述 | 文件/文件夹类型 | DSM 版本要求 |
|-----------------|------|------|-----------------|--------------|
| PKG_DEPS | ✗ | 定义具有 DSM 版本限制的套件之间的依赖关系。 | 文件 | 4.2-3160 |
| PKG_CONX | ✗ | 定义具有 DSM 版本限制的套件之间的冲突关系。 | 文件 | 4.2-3160 |
| privilege | ✓ | 定义文件权限和执行权限以保护套件安全。 | 文件 | 6.2-5891 |
| resource | ✗ | 定义套件生命周期中可使用的系统资源。 | 文件 | 6.2-5941 |

**注意：** 自 DSM 7.0 起，所有套件都被强制明确降低权限。必须提供权限配置才能使套件正常工作。

## Privilege（权限）

在 DSM 7.0 中，套件被强制通过明确应用权限机制来降低权限。

为了降低安全风险，套件应以用户身份而非 root 身份运行。套件可以通过提供名为 `privilege` 的配置文件来应用此类机制：

通过此配置，套件开发者能够：
- 控制脚本中进程的默认用户/组名称
- 控制 `package.tgz` 中文件的权限
- 控制 `package.tgz` 中的文件能力（capabilities）
- 控制是否可以访问特殊系统资源

为了克服普通用户无法执行特权操作的限制，我们提供了一种方式让套件请求系统资源。[请参阅 Resource（资源）](synology_dsm_integration/resource/)部分了解更多信息。

---

### 设置权限配置

只需在 `conf/privilege` 创建文件并配置所需设置。

```json
{
    "defaults": {
        "run-as": "package"
    }
}
```

**说明：**
- `run-as`：指定进程运行时所使用的用户账户
- 设置为 `"package"` 表示使用套件专属用户运行，而非 root 用户
- 这样可以有效限制套件的系统权限，提高安全性

## Resource（资源）

即使套件使用较低权限身份运行，也可以通过应用此机制来获取系统资源。

---

### 设置资源配置的步骤

1. **从资源列表中查找您需要的资源**
   - 查看可用的系统资源类型

2. **检查所选资源的相应时机是否满足**
   - 确保在正确的生命周期阶段请求资源

3. **在 `conf/resource` 创建文件并配置所需设置**

```json
{
    "data-share": {
        "shares": [
            {
                "name": "MyShareFolderName",
                "permission": {
                    "ro": ["MyUserName"]
                }
            }
        ]
    }
}
```

**说明：**
- `data-share`：资源类型（数据共享文件夹）
- `shares`：共享文件夹配置列表
- `name`：共享文件夹名称
- `permission`：权限设置
  - `ro`：只读权限，指定可访问的用户列表
  - `rw`：读写权限（如需读写访问）

处理资源请求的实例称为 **worker**。

## PKG_DEPS

`PKG_DEPS` 类似于 INFO 文件中的 `install_dep_packages` 键，但它额外定义了根据特定操作系统版本的限制。

**注意：** `PKG_DEPS` 的优先级高于 INFO 中的 `install_dep_packages`。

每个配置文件使用标准的 .ini 文件格式定义，包含键/值对和节（section）。每个节描述一个依赖/冲突套件的唯一名称。每个节包含有关套件版本要求和操作系统版本限制的信息。

### 配置键说明

| 键 | 可用性 | 描述 | 值格式 |
|---|--------|------|--------|
| `pkg_min_ver` | DSM 4.2+ | 依赖套件的最低版本要求 | 套件版本号 |
| `pkg_max_ver` | DSM 4.2+ | 依赖套件的最高版本要求 | 套件版本号 |
| `dsm_min_ver` | DSM 4.2 - DSM 7.1 | 最低要求的 DSM 版本。DSM 7.2 起被 `os_min_ver` 取代 | X.Y-Z（DSM 主版本号、次版本号、构建版本号） |
| `dsm_max_ver` | DSM 4.2 - DSM 7.1 | 最高要求的 DSM 版本。DSM 7.2 起被 `os_max_ver` 取代 | X.Y-Z（DSM 主版本号、次版本号、构建版本号） |
| `os_min_ver` | DSM 7.2-60112+ | 最低要求的操作系统版本 | X.Y-Z（操作系统主版本号、次版本号、构建版本号） |
| `os_max_ver` | DSM 7.2-60112+ | 最高要求的操作系统版本 | X.Y-Z（操作系统主版本号、次版本号、构建版本号） |

---

### 配置示例

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

### 使用说明

1. **优先级**：`PKG_DEPS` 中的配置会覆盖 INFO 中的 `install_dep_packages` 设置
2. **版本范围**：可以组合使用 `pkg_min_ver` 和 `pkg_max_ver` 来定义精确的版本范围
3. **操作系统限制**：通过 `os_min_ver` 和 `os_max_ver` 可以指定仅在特定 DSM/OS 版本范围内应用依赖关系
4. **注释**：使用分号 `;` 添加注释行

## PKG_CONX

`PKG_CONX` 类似于 INFO 文件中的 `install_conflict_packages` 键，但它额外定义了根据特定操作系统版本的限制。

**注意：** `PKG_CONX` 的优先级高于 INFO 中的 `install_conflict_packages`。

每个配置文件使用标准的 .ini 文件格式定义，包含键/值对和节（section）。每个节描述一个依赖/冲突套件的唯一名称。每个节包含有关套件版本要求和操作系统版本限制的信息。

---

### 配置键说明

| 键 | 可用性 | 描述 | 值格式 |
|---|--------|------|--------|
| `pkg_min_ver` | DSM 4.2+ | 冲突套件的最低版本要求 | 套件版本号 |
| `pkg_max_ver` | DSM 4.2+ | 冲突套件的最高版本要求 | 套件版本号 |
| `dsm_min_ver` | DSM 4.2 - DSM 7.1 | 最低要求的 DSM 版本。DSM 7.2 起被 `os_min_ver` 取代 | X.Y-Z（DSM 主版本号、次版本号、构建版本号） |
| `dsm_max_ver` | DSM 4.2 - DSM 7.1 | 最高要求的 DSM 版本。DSM 7.2 起被 `os_max_ver` 取代 | X.Y-Z（DSM 主版本号、次版本号、构建版本号） |
| `os_min_ver` | DSM 7.2-60112+ | 最低要求的操作系统版本 | X.Y-Z（操作系统主版本号、次版本号、构建版本号） |
| `os_max_ver` | DSM 7.2-60112+ | 最高要求的操作系统版本 | X.Y-Z（操作系统主版本号、次版本号、构建版本号） |

---

### 配置示例

```ini
; 您的套件与任意版本的 Package A 冲突
[Package A]

; 您的套件与 Package B 版本 2 或更高版本冲突
[Package B]
pkg_min_ver=2

; 您的套件与 Package C 版本 2 或更低版本冲突
[Package C]
pkg_max_ver=2

; 您的套件与 Package D 版本 2 或更高版本冲突
; 但当操作系统版本低于 7.2-60000 时，此冲突将被忽略
[Package D]
os_min_ver=7.2-60000
pkg_min_ver=2

; 您的套件与 Package E 版本 2 或更高版本冲突
; 但当操作系统版本高于 7.2-60000 时，此冲突将被忽略
[Package E]
os_max_ver=7.2-60000
pkg_min_ver=2
```

---

### 使用说明

1. **优先级**：`PKG_CONX` 中的配置会覆盖 INFO 中的 `install_conflict_packages` 设置
2. **版本范围**：可以组合使用 `pkg_min_ver` 和 `pkg_max_ver` 来定义精确的冲突版本范围
3. **操作系统限制**：通过 `os_min_ver` 和 `os_max_ver` 可以指定仅在特定 DSM/OS 版本范围内应用冲突关系
4. **注释**：使用分号 `;` 添加注释行