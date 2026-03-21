# DSM Markdown Editor

> A production-grade Markdown editor built as a **Synology DSM 7 package**, following the official [DSM Package Developer Guide 7](https://global.download.synology.com/download/Document/Software/DeveloperGuide/Package/PackageCenter/All/enu/Synology_Package_Developer_Guide.pdf).

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| UI Framework | **Vue 3** (Composition API) | ^3.4 |
| Language | **TypeScript** (strict mode) | ^5.3 |
| State Management | **Pinia** | ^2.1 |
| Routing | **Vue Router** (hash mode) | ^4.3 |
| Styling | **Tailwind CSS** | ^3.4 |
| Headless UI | **@headlessui/vue** | ^1.7 |
| Icons | **lucide-vue-next** | ^0.363 |
| Composition Utilities | **@vueuse/core** | ^10.7 |
| Markdown Renderer | **marked.js** | ^11.1 |
| Syntax Highlighting | **highlight.js** | ^11.9 |
| Build Tool | **Vite** | ^5.1 |
| Testing | **Vitest** + **@vue/test-utils** | ^1.2 |
| Linting | **ESLint** + **@typescript-eslint** | ^8 |

---

## Project Structure

```
dsm-md-editor/                         # DSM package root
│
├── INFO.sh                            # Package metadata (required by DSM 7)
├── PACKAGE_ICON.PNG                   # 64×64 icon (DSM 7: changed from 72×72)
├── PACKAGE_ICON_256.PNG               # 256×256 icon
├── nginx.conf                         # Web server config
├── .gitignore
│
├── conf/
│   ├── privilege                      # run-as: package (DSM 7 mandatory)
│   └── resource                       # Port 8585 + web-service registration
│
├── scripts/
│   ├── start                          # synopkg start hook
│   ├── stop                           # synopkg stop hook
│   ├── postinst                       # Post-install (creates home/data/)
│   ├── preuninst                      # Pre-uninstall cleanup
│   └── build-spk.sh                   # Automated .spk builder
│
├── wizard/
│   └── install.conf                   # Package Center install wizard
│
└── ui/                                # Vue 3 TypeScript application
    ├── index.html                     # Vite entry point
    ├── package.json
    ├── vite.config.ts
    ├── vitest.config.ts
    ├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
    ├── tailwind.config.ts
    ├── postcss.config.js
    ├── .eslintrc.cjs
    │
    └── src/
        ├── main.ts                    # createApp + Pinia + Router
        ├── App.vue                    # Root: store init
        ├── env.d.ts
        │
        ├── router/
        │   └── index.ts               # Hash-history router
        │
        ├── types/
        │   └── index.ts               # All TypeScript interfaces
        │
        ├── stores/
        │   ├── files.ts               # Pinia: file management + persistence
        │   ├── editor.ts              # Pinia: UI state + notifications + settings
        │   └── __tests__/
        │       └── files.test.ts      # Vitest store unit tests
        │
        ├── utils/
        │   ├── markdown.ts            # marked.js renderer + stats computation
        │   ├── storage.ts             # localStorage abstraction
        │   ├── export.ts              # .md / .html / .txt export
        │   └── __tests__/
        │       └── markdown.test.ts   # Vitest utility unit tests
        │
        ├── composables/
        │   ├── useEditor.ts           # Format insertion, smart Enter/Tab, cursor
        │   ├── useAutoSave.ts         # Debounced auto-save watcher
        │   ├── useCommands.ts         # Command registry (command palette data)
        │   └── useKeyboard.ts         # Global keyboard shortcut handler
        │
        ├── components/
        │   ├── ui/
        │   │   ├── AppTooltip.vue     # CSS-only tooltip
        │   │   └── AppNotifications.vue # Toast notification system
        │   │
        │   ├── sidebar/
        │   │   └── AppSidebar.vue     # File list, rename, delete, sort
        │   │
        │   ├── toolbar/
        │   │   └── AppToolbar.vue     # Format buttons, view switcher, actions
        │   │
        │   ├── editor/
        │   │   ├── CodeEditor.vue     # Textarea + line numbers
        │   │   └── StatusBar.vue      # Bottom status: saved/cursor/stats
        │   │
        │   ├── preview/
        │   │   └── MarkdownPreview.vue # Live rendered HTML with hljs
        │   │
        │   └── dialogs/
        │       ├── CommandPalette.vue  # Headless UI Dialog — command palette
        │       ├── SearchPanel.vue     # Inline find bar
        │       └── SettingsPanel.vue   # Headless UI Drawer — settings
        │
        └── views/
            └── EditorView.vue         # Main page: composes all panels
```

---

## Development Workflow

### 1. Install dependencies

```bash
cd ui
npm install
```

### 2. Start dev server

```bash
npm run dev
# → http://localhost:5173
```

### 3. Type-check

```bash
npm run type-check
```

### 4. Lint

```bash
npm run lint
```

### 5. Run unit tests

```bash
npm run test:unit
# With coverage:
npx vitest run --coverage
```

### 6. Production build

```bash
npm run build
# Output: ui/dist/  (ready to be packaged as package.tgz/ui/)
```

---

## DSM Package Build & Installation

### Build .spk

```bash
# Step 1: build the Vue app
cd ui && npm run build && cd ..

# Step 2: generate the .spk
bash scripts/build-spk.sh

# Output: dist/MarkdownEditor-noarch-1.0.0-0001.spk
```

### Install on NAS

**Option A — Package Center UI:**
```
DSM → Package Center → 手动安装 → 选择 .spk 文件
```

**Option B — Command line:**
```bash
synopkg install MarkdownEditor-noarch-1.0.0-0001.spk
synopkg start MarkdownEditor
```

### Access the app

```
http://[NAS-IP]:8585
# or via DSM desktop shortcut
```

---

## DSM 7 Compliance Checklist

| Requirement | Status | Detail |
|-------------|--------|--------|
| `conf/privilege` present | ✅ | `run-as: package` |
| `run-as: system` removed | ✅ | DSM 7 breaking change |
| INFO required fields | ✅ | `package`, `version`, `os_min_ver`, `description`, `arch`, `maintainer` |
| `os_min_ver >= 7.0-40000` | ✅ | Set to `7.0-40000` |
| Package icon 64×64 | ✅ | DSM 7 changed from 72×72 |
| Logs at `/var/log/packages/` | ✅ | All scripts log there |
| `dsmuidir` set | ✅ | `ui` — links built app into DSM webman |
| No package signing | ✅ | Removed in DSM 7 |

---

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Command palette | `Ctrl+P` |
| Save | `Ctrl+S` |
| Save all | `Ctrl+Shift+S` |
| New file | `Ctrl+N` |
| Find | `Ctrl+F` |
| Toggle sidebar | `Ctrl+B` |
| Toggle split view | `Ctrl+\` |
| Open settings | `Ctrl+,` |
| Focus mode | `F11` |
| Bold | `Ctrl+B` (in editor) |
| Italic | `Ctrl+I` (in editor) |
| Close overlay | `Esc` |

---

## Features

- **Multi-document** — sidebar file list with sort (time / name) and double-click rename
- **Three view modes** — Edit / Split / Preview, switchable via toolbar or `Ctrl+\`
- **Real-time preview** — marked.js GFM rendering with highlight.js syntax highlighting
- **Command palette** — `Ctrl+P`, fuzzy search, keyboard navigable (Headless UI Dialog)
- **Settings drawer** — font size, line height, tab size, word wrap, auto-save (Headless UI)
- **Auto-save** — debounced 2 s after each keystroke, configurable
- **localStorage persistence** — documents survive page refresh without a backend
- **Smart lists** — Enter continues bullet/numbered lists; empty item breaks out
- **Tab indent/unindent** — `Tab` / `Shift+Tab` with configurable tab size
- **Find** — `Ctrl+F` highlights matches in both editor and preview
- **Drag & drop import** — drop `.md` / `.txt` files directly onto the editor
- **Export** — `.md`, `.html` (standalone styled), `.txt` (stripped)
- **Toast notifications** — success / info / warning / error with auto-dismiss
- **Focus mode** — `F11` hides sidebar, toolbar, status bar
- **Dark / light theme** — persisted to localStorage
- **Status bar** — cursor line/col, word count, char count, reading time

---

## License

MIT License — free to use, modify, and distribute.