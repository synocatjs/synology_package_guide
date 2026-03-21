**系统要求**

**工具包要求**
- 具有 root 权限的 64 位通用 Linux 环境（例如 Ubuntu 18.04 LTS）
- bash (>= 4.1.5)
- python (>= 2.7.3)

请勿在 Synology NAS 上安装工具包作为开发环境。NAS 专用于存储，不适用于通用开发目的。相反，你可以在 NAS 上安装 Docker 套件，然后设置一个通用 Linux 容器来安装工具包。

**运行时要求**
- 如果你的套件适用于 DSM6，则你需要有一台 DSM6 NAS。
- 如果你的套件适用于 DSM7，则你需要有一台 DSM7 NAS。
- 适用于 DSM6 的套件与 DSM7 不兼容

**安装开发 Token（仅限合作伙伴）**

如果你正在开发需要 root 权限的套件，除非该套件由 Synology 签名，否则你将无法安装它。为了应对此安全限制，我们提供了一个开发 token 来绕过签名限制。

1. 打开你的 DSM web UI，进入 Support Center > Support Services。
2. 点击 "Generate Logs" 按钮，你将获得一个名为 debug.dat 的文件。
3. 将 debug.dat 发送给 Synology。
4. Synology 将签名一个 token 并发送给你。
5. 将开发 token 放置到生成 debug.dat 的 NAS 上的 `/var/packages/syno_dev_token` 目录下。

如果一切正常，你未签名的套件将被允许安装。如果不行，你将收到错误消息：

```
安装失败。该套件应以较低权限级别运行。请联系套件开发者修改权限设置。
```

> Failed to install. The package should run with a lower privilege level. Please contact the package developer to modify the privilege settings.

如果你确信操作正确但问题仍然存在，请联系我们寻求帮助。

开发 token 仅对生成 debug.dat 的那台 NAS 有效。将 token 安装到另一台 NAS 上无法使绕过生效。