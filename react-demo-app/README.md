# DSM Markdown Editor 套件

基于 React + Vite 开发的群晖 DSM 套件，目标设备 DS923+（AMD R1000）。

## 项目结构

```
markdown-editor-spk/
├── src/                      # React 源码
│   ├── main.jsx
│   ├── App.jsx
│   └── index.css
├── package/                  # 套件内容（打包进 .spk）
│   ├── INFO.sh               # 套件元信息
│   ├── ui/                   # ← Vite build 产物输出到此
│   ├── scripts/
│   │   └── start-stop-status # DSM 生命周期脚本
│   └── conf/
│       └── resource          # DSM 桌面注册
├── SynoBuildConf/            # pkgscripts-ng 构建配置
│   ├── build                 # 编译阶段
│   └── install               # 打包阶段
├── scripts/
│   ├── pack.sh               # 独立打包（无需 pkgscripts-ng）
│   ├── deploy.sh             # SSH 热部署
│   └── setup-toolkit.sh      # 配置 pkgscripts-ng 工具链
├── dist/                     # ← .spk 输出目录
├── vite.config.js
└── package.json
```

## 开发环境

- 开发机：Ubuntu 24.04 LTS (x86-64)
- 目标机：Synology DS923+ (AMD R1000)
- DSM 版本：7.2
- 套件架构：`r1000`

---

## 快速开始

### 1. 安装依赖

```bash
npm install
```


```bash
mkdir -p src/{components,hooks,utils,styles,types}
```

### 2. 本地开发

修改 `vite.config.js` 中的 NAS IP：

```js
proxy: {
  '/webapi': {
    target: 'http://192.168.1.100:5000',  // ← 改为你的 NAS IP
  }
}
```

启动开发服务器：

```bash
npm run dev
# 访问 http://localhost:3000
```

---

## 打包方式一：独立脚本（推荐，无需 pkgscripts-ng）

```bash
npm run pack
# 输出：dist/MarkdownEditor-1.0.0-0001-r1000.spk
```

然后在 DSM → 套件中心 → 手动安装即可。

---

## 打包方式二：pkgscripts-ng（官方方式）

### 2.1 配置工具链（仅需一次，须 root）

```bash
sudo bash scripts/setup-toolkit.sh
```

这会：
- 在 `/toolkit/pkgscripts-ng` 安装官方工具链
- 下载 r1000 平台的 chroot 编译环境（约 500MB）

### 2.2 链接项目到 source 目录

```bash
ln -s $(pwd) /toolkit/source/MarkdownEditor
```

### 2.3 构建 React

```bash
npm run build
```

### 2.4 使用 PkgCreate 打包

```bash
cd /toolkit/pkgscripts-ng

# -S 跳过签名（开发测试用）
# -p r1000 指定 DS923+ 平台
./PkgCreate.py -S -p r1000 MarkdownEditor
```

输出位于 `/toolkit/result_spk/`。

---

## 热部署（开发迭代）

已安装套件后，可直接 rsync UI 文件到 NAS，无需重装：

```bash
NAS_HOST=192.168.1.100 NAS_USER=admin bash scripts/deploy.sh
```

---

## DSM 套件安装路径说明

| 路径 | 说明 |
|------|------|
| `/var/packages/MarkdownEditor/` | 套件根目录 |
| `/var/packages/MarkdownEditor/target/ui/` | UI 文件 |
| `/webman/3rdparty/MarkdownEditor/` | Web 访问路径 |

安装后访问：`http://<NAS_IP>:5000/webman/3rdparty/MarkdownEditor/`

---

## pkgscripts-ng 与 spksrc 选型说明

| 工具 | 本项目 | 原因 |
|------|--------|------|
| **pkgscripts-ng** | ✅ 使用 | 官方工具链，适合开发自有套件 |
| **spksrc** | ❌ 不用 | 用于移植 C/C++ 开源软件（如 ffmpeg） |

本套件是纯前端 React 应用，无需交叉编译，pkgscripts-ng 即可完成整个流程。
