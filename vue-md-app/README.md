# DSM Markdown Editor — 开发文档

基于 **Synology DSM 7 包开发手册** 构建的专业 Markdown 编辑器，遵循 DSM 7 完整开发规范。

---

## 技术栈

| 层 | 技术 |
|---|---|
| UI 框架 | Vue 3 (CDN, Composition API) |
| 类型安全 | TypeScript-compatible (JSDoc) |
| 样式 | Tailwind-compatible CSS Variables |
| 图标 | Lucide SVG (内联) |
| Markdown 渲染 | marked.js 11 |
| 代码高亮 | highlight.js 11 |
| 字体 | JetBrains Mono + Syne + Lora |

---

## DSM 包结构 (符合 DSM 7 规范)

```
MarkdownEditor/
├── INFO.sh                    # 包元信息 (必填字段: package/version/os_min_ver/description/arch/maintainer)
├── PACKAGE_ICON.PNG           # 64×64 (DSM 7 breaking change: 从 72×72 改为 64×64)
├── PACKAGE_ICON_256.PNG       # 256×256
│
├── package.tgz                # 应用主体压缩包
│   └── ui/                    # dsmuidir="ui" — 自动链接至 /usr/syno/synoman/webman/3rdparty/MarkdownEditor/
│       └── index.html         # 单文件应用 (Vue 3 + marked.js + hljs)
│
├── conf/
│   ├── privilege              # DSM 7 必须: run-as: package (不可使用 run-as: system)
│   └── resource               # 端口 & web-service 配置
│
├── scripts/
│   ├── start                  # synopkg start 触发
│   ├── stop                   # synopkg stop 触发
│   └── postinst               # 安装后执行
│
├── wizard/
│   └── install.conf           # 安装向导 UI
│
└── nginx.conf                 # Web 服务器配置
```

---

## DSM 7 关键规范 (Breaking Changes 合规)

### 1. 特权降级 (Privilege)
```json
// conf/privilege — 必须提供此文件
{
  "defaults": {
    "run-as": "package"   // ✅ DSM 7 要求
    // "run-as": "system" ❌ 已在 DSM 7 中移除
  }
}
```

### 2. INFO 必填字段
```sh
package="MarkdownEditor"      # ✅ 必填
version="1.0.0-0001"          # ✅ 必填
os_min_ver="7.0-40000"        # ✅ 必填, 值必须 >= 7.0-40000
description="..."             # ✅ 必填
arch="noarch"                 # ✅ 必填
maintainer="..."              # ✅ 必填
```

### 3. 图标规格
```
PACKAGE_ICON.PNG     → 64×64  (DSM 7: 从 72×72 改为 64×64)
PACKAGE_ICON_256.PNG → 256×256
```

### 4. UI 目录集成
```sh
dsmuidir="ui"
# DSM 将自动建立软链接:
# /var/packages/MarkdownEditor/target/ui
#   → /usr/syno/synoman/webman/3rdparty/MarkdownEditor
```

### 5. 日志路径 (DSM 7+)
```
/var/log/packages/MarkdownEditor.log  # 控制脚本日志
/var/log/synopkg.log                  # 包操作日志
/var/log/messages                     # 开发时关注此文件排查警告/错误
```

---

## 构建流程

### 环境准备
```bash
# 1. 克隆 Synology 工具链
git clone https://github.com/SynologyOpenSource/pkgscripts-ng /toolkit/pkgscripts-ng

# 2. 安装依赖
apt-get install git cifs-utils python3 python3-pip

# 3. 部署目标平台 chroot 环境 (以 avoton 为例)
cd /toolkit/pkgscripts-ng
git checkout DSM7.2
./EnvDeploy -v 7.2 -p avoton
```

### 打包 (Pack Stage)
```bash
# 1. 创建 package.tgz (包含 ui/ 目录)
cd MarkdownEditor
tar czf package.tgz ui/ nginx.conf

# 2. 使用 PkgCreate.py 生成 .spk
cd /toolkit/pkgscripts-ng
python3 PkgCreate.py -p avoton -v 7.2 /path/to/MarkdownEditor

# 输出: MarkdownEditor-noarch-1.0.0-0001.spk
```

### 目录结构验证
```bash
# 验证 privilege 文件存在 (DSM 7 必须)
test -f conf/privilege && echo "✅ privilege OK" || echo "❌ 缺少 privilege"

# 验证 INFO 必填字段
grep -E "^(package|version|os_min_ver|description|arch|maintainer)=" INFO.sh

# 验证图标规格
identify PACKAGE_ICON.PNG | grep "64x64"
```

---

## 应用功能

### 编辑器核心
- **实时 Markdown 渲染** — marked.js，支持 GFM、表格、任务列表
- **代码语法高亮** — highlight.js，github-dark 主题
- **行号显示** — 动态计算
- **智能列表** — Enter 键自动延续列表，空行退出
- **Tab 缩进** — 2空格插入
- **撤销/重做** — 原生 contenteditable 历史

### 文档管理
- **多文档** — 侧边栏文件列表，双击重命名
- **本地持久化** — localStorage 自动保存 (2秒防抖)
- **拖拽导入** — 拖入 .md / .txt 文件
- **导出** — .md 原文件 / 完整 .html 页面

### UI/UX
- **三种视图** — 纯编辑 / 分栏 / 纯预览
- **命令面板** — Ctrl+P，模糊搜索所有命令
- **全文搜索** — Ctrl+F，高亮匹配
- **专注模式** — F11，隐藏所有 UI 元素
- **明暗主题** — 一键切换，持久化设置

### 快捷键
| 功能 | 快捷键 |
|------|--------|
| 保存 | Ctrl+S |
| 加粗 | Ctrl+B |
| 斜体 | Ctrl+I |
| 查找 | Ctrl+F |
| 命令面板 | Ctrl+P |
| 新建 | Ctrl+N |
| 专注模式 | F11 |

---

## DSM 集成路径

```
DSM 桌面
  └── Package Center 安装 MarkdownEditor.spk
        └── 解压 → /var/packages/MarkdownEditor/
              ├── target/ui/ ←→ 软链接 ←→ /usr/syno/synoman/webman/3rdparty/MarkdownEditor/
              └── scripts/start → synopkg start MarkdownEditor
                    └── 用户访问: http://nas-ip:5000/webman/3rdparty/MarkdownEditor/
```

---

## 发布流程 (Synology Package Center)

1. **开发** → 本地测试 .spk
2. **提交** → [Synology 开发者中心](https://developer.synology.com)
3. **审核** → Synology 审核团队验证
4. **响应** → 处理用户 Issue
5. **发布** → 上架 Package Center

参考: DSM Developer Guide — *Publish Synology Packages* 章节

---

## 开源许可

MIT License — 可自由使用、修改和分发。