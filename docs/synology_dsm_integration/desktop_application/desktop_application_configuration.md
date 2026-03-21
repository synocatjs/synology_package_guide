## 应用程序配置

要将桌面应用程序集成到 DSM 中，您需要在 `dsmuidir` 指定的目录下提供一个 JSON 格式的配置文件。

### 配置示例

```json
{
    ".url": {
        "com.company.App1": {
            "type": "url",
            "icon": "images/app_{0}.png",
            "title": "Test App1",
            "desc": "Description",
            "url": "http://www.yahoo.com",
            "allUsers": true,
            "preloadTexts": [
                "app_tree:index_title",
                "app_tree:node_1"
            ]
        },
        "com.company.App2": {
            "type": "url",
            "icon": "images/app2_{0}.png",
            "title": "Test App2",
            "desc": "Description 2",
            "url": "http://www.synology.com",
            "allUsers": true
        }
    }
}
```

---

### 属性说明

| 属性 | 必需 | 描述 |
|------|------|------|
| **com.company.App1 / com.company.App2** | ✗ | 在 `.url` 中，每个对象应有唯一的属性名称。 |
| **type** | ✗ | 当您点击菜单项时，用于连接 DSM 管理 UI 的地址将显示在管理 UI 的右侧框架中。您可以自定义地址。<br>`type` 值可以是 `url`，表示点击应用程序图标时，URL 将在弹出窗口中打开。 |
| **icon** | ✗ | 应用程序的图标。这是一个模板字符串，`{0}` 可根据图标分辨率替换为 `16`、`24`、`32`、`48`、`64`、`72`、`256`。<br>图标必须保存在 `/usr/syno/synoman/webman/3rdparty/xxx/` 下，其中 `xxx` 是套件的目录名称。<br>例如，创建 `images` 目录并放入图标文件 `icon.png`，完整路径为：<br>`/usr/syno/synoman/webman/3rdparty/xxx/images/icon_16.png`<br>`/usr/syno/synoman/webman/3rdparty/xxx/images/icon_24.png`<br>...<br>图标值应设置为 `"images/icon_{0}.png"`。 |
| **title** | ✗ | 应用程序名称，将显示在主菜单中。 |
| **desc** | ✗ | 鼠标悬停时显示的应用程序详细信息。 |
| **url** | ✗ | 应用程序的 URL 值设置示例：<br>`"url": "http://www.synology.com/"`<br>`"url": "3rdparty/xxx/index.html"` |
| **allUsers** | ✗ | 确定普通用户登录时是否可以看到菜单项。如需所有用户都能看到菜单项，请设置为：<br>`"allUsers": true`<br>默认设置是仅管理员可以看到应用程序。 |
| **preloadTexts** | ✗ | 指定的国际化字符串（格式：`section:key`）将在应用程序 UI 未打开时加载。当使用相应字符串发送桌面通知时需要此设置。 |

---

### 国际化支持

文本字段支持国际化（i18n）值，可以根据 DSM 语言设置显示对应的本地化文本。