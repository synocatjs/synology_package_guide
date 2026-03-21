## 资源更新

某些 worker 支持在 worker 时机之外进行更新操作。应使用 `/usr/syno/sbin/synopkghelper` 来完成此任务。

---

### 更新资源的步骤

1. **更新配置文件**
   
   更新 `/var/packages/[package_name]/conf/resource` 文件

2. **触发更新过程**
   
   执行命令触发更新过程：
   ```bash
   /usr/syno/sbin/synopkghelper update [package_name] [resource_id]
   ```

---

### 示例：更新端口配置

假设一个套件允许用户编辑其监听端口，并需要更新相应的网络设置：

1. 用户向应用程序提交新端口
2. 应用程序更新 `/var/packages/[package_name]/conf/resource` 文件
3. 应用程序执行命令：
   ```bash
   /usr/syno/sbin/synopkghelper update ${package} port-config
   ```
4. `port-config` worker 将读取配置并重新加载网络设置

---

### 命令参数说明

| 参数 | 描述 |
|------|------|
| `update` | 操作类型，表示更新资源 |
| `[package_name]` | 套件名称 |
| `[resource_id]` | 资源标识符（如 `port-config`、`usr-local-linker` 等） |

---

### 重要说明

- **并非所有资源都支持更新操作**，请参考每个资源的 `Updatable` 部分
- 更新操作允许在不重新启动套件的情况下动态更改资源配置
- 使用此机制可以实现配置的热更新，提高套件的灵活性

---

### 支持更新的资源类型示例

| 资源 ID | 是否可更新 | 描述 |
|---------|-----------|------|
| `port-config` | ✓ | 端口配置，可动态更新网络设置 |
| `usr-local-linker` | ✗ | 通常需要重新启动套件才能生效 |
| `data-share` | ✗ | 共享文件夹配置，通常需要重新挂载 |