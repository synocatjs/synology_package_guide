# WIZARD UI 文件
## WIZARD_UIFILES[7.2.2]

`install_uifile`、`upgrade_uifile` 和 `uninstall_uifile` 是以 JSON 格式描述 UI 组件的文件。它们存储在 `WIZARD_UIFILES` 文件夹中。在安装、升级和卸载过程中，这些 UI 组件将显示在向导中。一旦选择了这些组件，它们的键将以 `true`、`false` 或文本值的形式设置在脚本环境变量中。

这些文件可以被视为用户设置，或用于控制脚本执行的流程。

### 文件说明

| 文件 | 描述 |
|------|------|
| **install_uifile** | 描述安装过程的 UI 组件。在 preinst 和 postinst 脚本执行期间，这些组件键和值可以在环境变量中找到。 |
| **upgrade_uifile** | 描述升级过程的 UI 组件。在 preupgrade、postupgrade、preuninst、postuninst、preinst 和 postinst 脚本执行期间，这些组件键和值可以在环境变量中找到。 |
| **uninstall_uifile** | 描述卸载过程的 UI 组件。在 preuninst 和 postuninst 脚本执行期间，这些组件键和值可以在环境变量中找到。 |

---

### 动态生成向导

如果您想运行脚本动态生成向导，可以添加 `install_uifile.sh`、`upgrade_uifile.sh` 和 `uninstall_uifile.sh` 文件。它们分别在安装、升级和卸载套件之前运行，用于生成 JSON 格式的 UI 组件并写入 `SYNOPKG_TEMP_LOGFILE`。这些脚本中可以使用脚本环境变量。更多信息请参阅"脚本环境变量"部分。

---

### 国际化支持

如果您想对 UI 组件的描述进行本地化，可以在此文件夹中添加带语言缩写后缀的文件：
- `install_uifile_[DSM语言]`
- `upgrade_uifile_[DSM语言]`
- `uninstall_uifile_[DSM语言]`
- `install_uifile_[DSM语言].sh`
- `upgrade_uifile_[DSM语言].sh`
- `uninstall_uifile_[DSM语言].sh`

例如，要在繁体中文环境中进行安装，应将 `[DSM语言]` 替换为 `cht`：`install_uifile_cht`。

---

### 示例项目结构

您可以从 https://github.com/SynologyOpenSource/ExamplePackages 下载模板包，并将 `ExamplePackages/ExamplePackage` 目录放置于 `/toolkit/source/ExamplePackage`。

```
└── WIZARD_UIFILES
    ├── create_install_uifile.sh
    ├── create_uninstall_uifile.sh
    ├── create_upgrade_uifile.sh
    ├── Makefile
    ├── package.json
    ├── pnpm-lock.yaml
    ├── src
    │   ├── remove-entry.js
    │   └── remove-setting.vue
    ├── uifile_setting.sh
    └── webpack.config.js
```

---

### DSM 7.2.2 中的新方式

在 DSM 7.2.2 中，我们引入了一种创建向导 UI 文件的新方法。这种方法使用渲染函数（render function）来生成向导 UI 文件。渲染函数是基于 Vue.js 框架结构的函数。开始之前，开发者应熟悉 Vue.js 框架的基本概念，以便更高效地创建向导 UI 文件。

**UI 框架相关文档：**
- 在 DSM 7.2.2 中，默认 Vue.js 版本为 2.7.14
- 开发者可以参考 Vue2 官方文档学习 Vue.js 的基本概念

**基础知识要求：**
- Vue2 官方文档
- Webpack
- NPM / PNPM

**注意：** 您可以参考 ExamplePackage 中的 `WIZARD_UIFILES` 文件夹来学习如何创建向导 UI 文件。

---

### JSON 格式示例

```json
[{
    "custom_render_fn": "/* render function */",
    "custom_render_name": "remove_setting"
}]
```

---

### package.json 配置

```json
{
    "name": "WIZARD_UIFILES",
    "private": true,
    "version": "1.0.0",
    "description": "",
    "main": "webpack.config.js",
    "scripts": {
        "build": "webpack --mode production",
        "dev": "webpack --watch --progress --mode development"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "@babel/core": "7.18.6",
        "babel-loader": "8.0.6",
        "terser-webpack-plugin": "5.3.10",
        "vue": "2.7.14",
        "vue-loader": "15.10.1",
        "vue-template-compiler": "2.7.14",
        "webpack": "5.91.0",
        "webpack-cli": "5.1.4"
    }
}
```

安装依赖：
```bash
pnpm install
```

---

### Webpack 配置

```javascript
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const STRING_PATH = '/source/uistring/webstation';
const { getString } = require('/source/synopkgutils/string.js');

/**
 * 从 uistring 文件夹获取字符串，例如获取向导字符串：
 * ['wizard', 'remove_setting_title']
 * ['wizard', 'remove_setting_desc']
 */
const stringsEntries = [
    ['wizard', 'remove_setting_title'],
    ['wizard', 'remove_setting_desc']
];

function resolve (dir) {
    return path.join(__dirname, dir)
}

async function traverseStringPath() {
    const texts = {};
    fs.readdirSync(STRING_PATH).forEach(dir => {
        const lang = path.basename(dir);
        const langStringFile = `${STRING_PATH}/${lang}/strings`;
        texts[lang] = {};
        for (const [section, key] of stringsEntries) {
            texts[lang][section] = texts[lang][section] ?? {};
            texts[lang][section][key] = getString(langStringFile, section, key);
        }
    });
    return texts;
}

module.exports = async (env, argv) => {
    const isDevelopment = argv.mode === 'development';
    return {
        mode: isDevelopment ? 'development' : 'production',
        devtool: isDevelopment ? 'inline-source-map' : false,
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    exclude: /node_modules/,
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            rootMode: 'upward'
                        }
                    }
                },
            ]
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
        },
        entry: {
            remove_entry: './src/remove-entry.js',
        },
        output: {
            library: {
                name: 'SYNO.SDS.PkgManApp.Custom.JsonpLoader.load',
                type: 'jsonp',
            },
            path: resolve('dist'),
            filename: '[name].bundle.js'
        },
        plugins: [
            new VueLoaderPlugin(),
            new webpack.DefinePlugin({
                __STRINGS__: JSON.stringify(await traverseStringPath())
            }),
        ],
        externalsType: 'window',
        externals: {
            'vue': 'Vue',
        },
        watchOptions: {
            poll: true,
        },
    };
}
```

---

### 编写向导布局

在编写之前，您需要了解 Vue.js 的基本概念。使用向导布局时，必须遵循以下准则：

1. **入口文件必须返回对象**，格式为：`{ name: 'your_render_function_name', render: YourRenderFunction }`
2. **Vue.js 文件必须包含 `pkg-center-step-content` 组件**
3. **使用组合式方法调用套件中心提供的函数**

---

### 套件中心提供的函数

**获取 props：**
```javascript
SYNO.SDS.PkgManApp.Custom.useHook.props
```

**获取函数：**
```javascript
SYNO.SDS.PkgManApp.Custom.useHook(props)
```

返回的函数对象：
```javascript
{
    getNext: () => String,      // 获取下一步的 ID
    checkState: () => void,     // 基于当前信息更新向导底部信息，例如：启用/禁用上一步按钮
}
```

---

### Vue.js 文件中的 setup 函数

在 Vue.js 文件中，请使用 `setup` 函数获取套件中心提供的函数，并返回以下变量：

| 属性 | 描述 | 值类型 |
|------|------|--------|
| `getNext` | 获取下一步的 ID | `() => String` |
| `checkState` | 基于当前信息更新向导底部信息 | `() => void` |
| `headline` | 显示向导标题 | `String` |
| `getValues` | 套件中心使用此函数获取向导设置的数据 | `() => Object[]` |

---

### 入口文件示例：remove-entry.js

```javascript
import RemoveSetting from './remove-setting.vue';

export default {
    name: 'remove_setting', // 渲染函数名称
    render: RemoveSetting,
};
```

---

### Vue 组件示例：remove-setting.vue

```vue
<template>
    <pkg-center-step-content>
        <v-form syno-id="form">
            <v-form-item syno-id="form-item" label="Password">
                <v-input type="password" v-model="password" syno-id="password" />
            </v-form-item>
            <v-form-item syno-id="form-item" label="Confirm Password">
                <v-input type="password" v-model="confirmPassword" syno-id="confirm-password" />
            </v-form-item>
            <v-form-item syno-id="form-item" :label="removeSettingTitle">
                <v-checkbox v-model="valid" syno-id="checkbox">
                    Checkbox Value: {{ valid }}
                </v-checkbox>
            </v-form-item>
        </v-form>
    </pkg-center-step-content>
</template>

<script>
import { $t } from './utils/uistring';
import { defineComponent, watchEffect, ref } from 'vue';
export default defineComponent({
    props: {
        ...SYNO.SDS.PkgManApp.Custom.useHook.props,
    },
    setup(props) {
        const { getNext, checkState: _checkState } = SYNO.SDS.PkgManApp.Custom.useHook(props);

        const valid = ref(false);
        const password = ref('');
        const confirmPassword = ref('');
        const removeSettingTitle = $t(_S('lang'), 'wizard', 'remove_setting_title');
        const headline = $t(_S('lang'), 'wizard', 'remove_setting_title');

        const checkState = (owner) => {
            owner = owner ?? props.getOwner();
            _checkState(owner);
            const nextButton = owner.getButton('next');
            nextButton.setDisabled(!valid.value);
        };

        const getValues = () => {
            return [{
                isSelected: valid.value,
            }];
        };

        watchEffect(() => {
            checkState();
        });

        return {
            /* 套件中心所需 */
            getNext,
            checkState,
            headline,
            getValues,
            /* 自定义变量 */
            valid,
            password,
            confirmPassword,
            removeSettingTitle,
        };
    },
});
</script>
```

---

### 相关文件

**uifile_setting.sh**
```bash
#!/bin/bash

REMOVE_ENTRY_JS='./dist/remove_entry.bundle.js'
```

**create_uninstall_uifile.sh**
```bash
#!/bin/bash

UISTRING_PATH=/source/uistring/webstation
PKG_UTILS="/source/synopkgutils/pkg_util.sh"

. $PKG_UTILS
. ./uifile_setting.sh

pkg_dump_wizard_content()
{
    local out=$1
    cat > "$out" <<EOF
[{
    "custom_render_fn": $(cat $REMOVE_ENTRY_JS | jq -R),
    "custom_render_name": "remove_setting"
}]
EOF
}

pkg_dump_uninst_wizard()
{
    if [ ! -d "$PKG_WIZARD_DIR" ]; then
        mkdir $PKG_WIZARD_DIR
    fi

    pkg_dump_wizard_content $PKG_WIZARD_DIR/uninstall_uifile
}

PKG_WIZARD_DIR="."
pkg_dump_uninst_wizard
```

**Makefile**
```makefile
include ../Makefile.inc

.PHONY: all install package clean

UIFILES = uninstall_uifile

all install:
    # Snpm 是在 Synology 中安装 npm 模块的工具
    /usr/local/tool/snpm i
    /usr/local/tool/snpm build

package: $(UIFILES)
    [ -d $(PACKAGEDIR)/WIZARD_UIFILES ] || install -d $(PACKAGEDIR)/WIZARD_UIFILES
    for i in $(UIFILES); do \
        install -c -m 644 $$i $(PACKAGEDIR)/WIZARD_UIFILES; \
    done

clean:
    @for i in $(UIFILES); do $(RM) $$i $${i}_*; done

%: create_%.sh
    ./$<
```

---

**注意：** 所有单词均区分大小写。