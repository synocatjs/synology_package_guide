## 应用程序国际化

桌面应用程序可以通过配置、帮助等引用国际化（i18n）文本。

---

### 目录结构

```
ui (由 INFO 中的 dsmuidir 指定)
└── texts
   ├── enu
   │    └── strings
   └── cht
        └── strings
```

您需要根据支持的语言创建目录，然后在每个语言目录中创建名为 `strings` 的文件。

---

### 字符串文件格式

#### 英文 (enu) 示例

`[dsmuidir]/texts/enu/strings`

```ini
[app_tree]
index_title="This is a title"
node_1="This is node1"

[app_tab]
tab1="This is tab1"
tab2="This is tab2"
```

#### 繁体中文 (cht) 示例

`[dsmuidir]/texts/cht/strings`

```ini
[app_tree]
index_title="這是標題"
node_1="這是節點1"

[app_tab]
tab1="這是標籤1"
tab2="這是標籤2"
```

---

### 引用国际化字符串

当您需要使用这些文本时，以 `section:key` 格式进行引用（一个值只能是一个 i18n 字符串）：

```json
"title": "app_tree:node_1"
```

---

### 加载时机

- **DSM 7.0 之后**：i18n 字符串仅在桌面应用程序打开时加载
- **桌面通知**：如果字符串用于桌面通知，必须在应用程序配置的 `preloadTexts` 字段中指定，以确保在发送通知时字符串已加载

```json
"preloadTexts": [
    "app_tree:index_title",
    "app_tree:node_1"
]
```

---

### 支持的语言代码

| 代码 | 语言 |
|------|------|
| enu | 英语 |
| cht | 繁体中文 |
| chs | 简体中文 |
| krn | 韩语 |
| ger | 德语 |
| fre | 法语 |
| ita | 意大利语 |
| spn | 西班牙语 |
| jpn | 日语 |
| dan | 丹麦语 |
| nor | 挪威语 |
| sve | 瑞典语 |
| nld | 荷兰语 |
| rus | 俄语 |
| plk | 波兰语 |
| ptb | 巴西葡萄牙语 |
| ptg | 欧洲葡萄牙语 |
| hun | 匈牙利语 |
| trk | 土耳其语 |
| csy | 捷克语 |