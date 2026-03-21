## Index DB

### 描述

在套件启动/停止期间，对套件帮助文档和应用程序索引进行索引/取消索引。

有关套件应用程序索引和帮助索引的详细描述，请参阅"将帮助文档集成到 DSM 帮助"。

---

### 行为说明

#### Acquire()（获取资源）
- 对套件帮助文档和应用程序内容进行索引

#### Release()（释放资源）
- 取消套件帮助文档和应用程序内容的索引

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
"indexdb": {
    "app-index": {
        "conf-relpath": "<conf relpath>",
        "db-relpath": "<app db relpath>"
    },
    "help-index": {
        "conf-relpath": "<conf relpath>",
        "db-relpath": "<help db relpath>"
    }
}
```

| 成员 | 自版本 | 描述 |
|------|--------|------|
| `app-index` | 6.0-5924 | 对象，应用程序索引信息 |
| `help-index` | 6.0-5924 | 对象，帮助文档索引信息 |
| `conf-relpath` | 6.0-5924 | 字符串，配置文件相对于 `/var/packages/${package}/target/` 的路径 |
| `db-relpath` | 6.0-5924 | 字符串，数据库文件夹相对于 `/var/packages/${package}/target/` 的路径 |

---

### 示例

```json
"indexdb": {
    "app-index": {
        "conf-relpath": "app/index.conf",
        "db-relpath": "indexdb/appindexdb"
    },
    "help-index": {
        "conf-relpath": "app/helptoc.conf",
        "db-relpath": "indexdb/helpindexdb"
    }
}
```

---

### 目录结构示例

```
target/
├── app/
│   ├── index.conf          # 应用程序索引配置文件
│   └── helptoc.conf        # 帮助文档目录配置文件
└── indexdb/
    ├── appindexdb/         # 应用程序索引数据库目录
    └── helpindexdb/        # 帮助文档索引数据库目录
```

---

### 使用场景

- **应用程序索引**：使套件应用程序在 DSM 全局搜索中可被检索
- **帮助索引**：使套件帮助文档在 DSM 帮助系统中可被检索
- **提升用户体验**：用户可以通过 DSM 搜索功能快速找到套件相关内容和帮助文档

---

### 注意事项

- 索引配置文件必须符合 DSM 索引格式要求
- 数据库目录将由系统自动创建和管理
- 索引操作在套件启用时自动执行
- 取消索引在套件禁用时自动执行，无需手动清理