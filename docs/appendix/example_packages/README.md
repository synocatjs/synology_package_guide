# 示例套件

```bash
ExamplePackages/ExamplePackage
├── conf                                      # 配置文件目录
│   ├── privilege                             # 权限配置（运行用户、权限）
│   └── resource                              # 资源配置（符号链接、服务、端口）
├── examplePkg.c                              # C 语言源代码
├── INFO.sh                                   # INFO 文件生成脚本
├── LICENSE                                   # 开源许可证文件
├── Makefile                                  # 编译构建脚本
├── PACKAGE_ICON_256.PNG                      # 256x256 包图标
├── PACKAGE_ICON.PNG                          # 默认包图标
├── README.md                                 # 项目说明文档
├── scripts                                   # 生命周期脚本目录
│   ├── postinst                              # 安装后执行
│   ├── postuninst                            # 卸载后执行
│   ├── postupgrade                           # 升级后执行
│   ├── preinst                               # 安装前执行
│   ├── preuninst                             # 卸载前执行
│   ├── preupgrade                            # 升级前执行
│   └── start-stop-status                     # 服务启停控制
├── SynoBuildConf                             # Synology 官方构建配置
│   ├── build                                 # 构建脚本
│   ├── depends                               # 依赖声明
│   └── install                               # 安装打包脚本
├── ui                                        # Web UI 前端应用
│   ├── app.config                            # 应用配置
│   ├── config.define                         # 编译定义配置
│   ├── images                                # 图标资源
│   │   ├── 128.png                           # 128x128 图标
│   │   ├── 16.png                            # 16x16 图标
│   │   ├── 256.png                           # 256x256 图标
│   │   ├── 32.png                            # 32x32 图标
│   │   └── 64.png                            # 64x64 图标
│   ├── Makefile                              # UI 构建脚本
│   ├── package.json                          # Node.js 依赖
│   ├── pnpm-lock.yaml                        # 依赖锁定文件
│   ├── src                                   # 前端源代码
│   │   ├── App.vue                           # Vue 根组件
│   │   ├── main.js                           # 应用入口
│   │   └── styles                            # 样式目录
│   │       └── index.css                     # 全局样式
│   ├── texts                                 # 多语言文本
│   │   ├── cht                               # 繁体中文
│   │   │   └── strings                       # 字符串资源
│   │   └── enu                               # 英文
│   │       └── strings                       # 字符串资源
│   └── webpack.config.js                     # Webpack 构建配置
└── WIZARD_UIFILES                            # 安装向导 UI
    ├── create_install_uifile.sh              # 生成安装向导脚本
    ├── create_uninstall_uifile.sh            # 生成卸载向导脚本
    ├── Makefile                              # 向导构建脚本
    ├── package.json                          # Node.js 依赖
    ├── pnpm-lock.yaml                        # 依赖锁定文件
    ├── src                                   # 向导源代码
    │   ├── example                           # 示例模板
    │   │   ├── BraviaSignageInstall.vue      # Bravia Signage 安装向导
    │   │   ├── MinimServerUninstall.vue      # MinimServer 卸载向导
    │   │   ├── PlexMediaInstall.vue          # Plex 安装向导
    │   │   ├── PlexMediaUninstall.vue        # Plex 卸载向导
    │   │   └── remove-setting-bak.vue        # 设置备份
    │   ├── install-entry.js                  # 安装向导入口
    │   ├── install-setting.vue               # 安装设置组件
    │   ├── remove-entry.js                   # 卸载向导入口
    │   ├── remove-notice-entry.js            # 卸载通知入口
    │   ├── remove-notice.vue                 # 卸载通知组件
    │   ├── remove-setting.vue                # 卸载设置组件
    │   └── utils
    │       └── uistring.js                   # UI 字符串工具
    ├── uifile_setting.sh                     # UI 文件设置脚本
    └── webpack.config.js                     # Webpack 构建配置
```