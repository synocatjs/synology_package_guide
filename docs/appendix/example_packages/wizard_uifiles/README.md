# wizard uifiles 目录
这是一个 Synology DSM 包安装向导（WIZARD_UIFILES）项目，用于创建自定义的安装/卸载界面。

## 项目结构分析

```bash
WIZARD_UIFILES/
├── Makefile              # 构建脚本
├── package.json          # Node.js 依赖
├── webpack.config.js     # Webpack 配置
├── src/                  # 源代码
│   ├── install-entry.js      # 安装向导入口
│   ├── install-setting.vue   # 安装界面 Vue 组件
│   ├── remove-entry.js       # 卸载向导入口
│   ├── remove-setting.vue    # 卸载界面 Vue 组件
│   ├── remove-notice-entry.js
│   ├── remove-notice.vue
│   ├── example/              # 示例模板
│   │   ├── BraviaSignageInstall.vue
│   │   ├── PlexMediaInstall.vue
│   │   ├── PlexMediaUninstall.vue
│   │   └── ...
│   └── utils/
│       └── uistring.js       # UI 字符串工具
├── create_install_uifile.sh   # 生成安装向导脚本
├── create_uninstall_uifile.sh # 生成卸载向导脚本
└── uifile_setting.sh          # UI 文件设置脚本
```

## 🎯 核心功能

### 1. 安装向导（Install Wizard）
- `install-entry.js`：Vue 应用的入口文件
- `install-setting.vue`：安装界面的 Vue 组件
- 用于收集用户在安装时的配置选项

### 2. 卸载向导（Uninstall Wizard）
- `remove-entry.js`：卸载界面的入口
- `remove-setting.vue`：卸载界面组件
- 可选，用于确认卸载操作或清理配置

### 3. 卸载通知（Uninstall Notice）
- `remove-notice-entry.js`：卸载通知入口
- `remove-notice.vue`：卸载完成后的提示界面

## 🔧 Synology 向导的工作流程

### 安装流程
```
用户点击安装
    ↓
DSM 读取 INFO 文件中的 wizard="yes"
    ↓
DSM 显示 WIZARD_UIFILES/install_uifile
    ↓
用户填写配置 → 提交
    ↓
DSM 将配置传递给 scripts/postinst
    ↓
包安装完成
```

### 文件命名规范
```
install_uifile      → 安装向导（必需）
uninstall_uifile    → 卸载向导（可选）
remove_notice_uifile → 卸载通知（可选）
```