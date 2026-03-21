## 应用程序帮助

要将帮助文档集成到 DSM 帮助系统中，请按照以下步骤操作：

---

### 步骤 1：创建 helptoc.conf 配置文件

在 `dsmuidir` 指定的目录下创建一个 `helptoc.conf` 文件，描述您的帮助文档结构。

```json
{
    "app": "SYNO.App.TestAppInstance",
    "title": "app_tree:index_title",
    "content": "testapp_index.html",
    "toc": [
        {
            "title": "app_tree:node_1",
            "content": "testapp_node1.html",
            "nodes": [
                {
                    "title": "app_tree:node_1_child",
                    "content": "testapp_node1_child.html"
                }
            ]
        },
        {
            "title": "app_tree:node_2",
            "content": "testapp_node2.html"
        }
    ]
}
```

#### helptoc.conf 属性说明

| 属性 | 描述 |
|------|------|
| **app** | 应用程序实例 |
| **title** | 显示的标题 |
| **content** | 帮助文档的路径 |
| **toc** | 根目录的子节点（如果应用程序没有子节点，使用空数组） |
| **nodes** | 目录节点的子节点 |

**注意：** 文本字段支持国际化（i18n）值。

---

### 步骤 2：创建目录和文件

根据 `helptoc.conf` 创建相应的目录和文件结构：

```
ui (由 INFO 中的 dsmuidir 指定)
├── helptoc.conf
├── help
│   ├── enu
│   │    └── testapp_index.html
│   └── cht
│        └── testapp_index.html
└── texts
    ├── enu
    │    └── strings
    └── cht
         └── strings
```

---

### 步骤 3：编写帮助文档

每个帮助文档应使用以下 HTML 格式，以确保 UI 风格与 DSM 保持一致：

```html
<!DOCTYPE html>
<html class="img-no-display">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <link href="../../../../help/help.css" rel="stylesheet" type="text/css">
        <link href="../../../../help/scrollbar/flexcroll.css" rel="stylesheet" type="text/css">
        <script type="text/javascript" src="../../../../help/scrollbar/flexcroll.js"></script>
        <script type="text/javascript" src="../../../../help/scrollbar/initFlexcroll.js"></script>
    </head>
    <body>
        This is my help document content
    </body>
</html>
```

---

### 使用说明

- **国际化支持**：帮助文档和文本字符串支持多语言，通过 `help/{lang}/` 和 `texts/{lang}/strings` 目录组织不同语言的资源
- **样式一致性**：使用 DSM 提供的 CSS 和 JavaScript 文件，确保帮助文档与系统其他帮助页面风格统一
- **目录结构**：`helptoc.conf` 定义了帮助文档的层级结构，`content` 字段指向对应的 HTML 文件
- **文本字符串**：国际化字符串存储在 `texts/{lang}/strings` 文件中，可通过 `section:key` 格式引用