# package.tgz 文件介绍

`package.tgz` 是一个压缩文件（tgz / xz 格式），包含启动应用程序所需的所有文件，例如：

- 可执行文件
- 库文件
- UI 文件
- 配置文件

您可以使用 `pkg_make_package` 函数来创建 `package.tgz`，而不是手动打包。

安装套件后，您的 `package.tgz` 将被解压到 `/volume?/@appstore/[您的套件名称]/` 或 `/usr/local/packages/@appstore/[您的套件名称]/` 文件夹（取决于 INFO 中的 `install_type`）。同时，系统会在 `/var/packages/[您的套件名称]/target` 创建一个指向指定文件夹的软链接。

除了目标目录外，系统还会为套件创建其他目录，用于存储不同用途的数据。详细信息可在此处找到。

## 启动应用程序

本节介绍如何通过在 `package.tgz` 中打包 UI 所需的最少文件来启动应用程序。

```
package.tgz
   ├── ui                       (由 INFO 中的 dsmuidir 指定)
   |   ├── config               (UI 配置文件，描述 JavaScript 文件中的组件及其依赖关系)
   |   ├── ExamplePackage.js    (套件的主 JavaScript 文件)
   |   └── style.css            (套件的样式文件)
   └── ....
```

要在 `package.tgz` 中准备这些文件（UI 配置文件、主 JavaScript 文件），请将应用程序源代码组织在套件项目的 `ui` 文件夹中。您也可以使用其他名称，但请记住在安装期间要与 INFO 文件中指定的 `dsmuidir` 匹配。

应用程序 UI 的项目结构可能如下所示：

```
ExamplePackage
└── ui
    ├── app.config
    ├── config.define
    ├── Makefile
    ├── package.json
    ├── pnpm-lock.yaml
    ├── src
    │   ├── App.vue
    │   │── components
    │   │   └── CustomForm.vue
    │   ├── main.js
    │   └── styles
    └── webpack.config.js
```

以下是上述文件的详细信息：

首先，要生成 `package.tgz` 中的配置文件，需要准备 `app.config`、`config.define` 和 `Makefile`。

### app.config

`app.config` 描述套件中的组件。

**格式：**
```json
{
    "[Classname]": {
        "[Attribute]": "[Value]",
        ...
    }
}
```

**示例：**
```json
{
    "SYNO.SDS.App.ExamplePackage.Instance": {
        "type": "app",
        "title": "ExamplePackage",
        "appWindow": "SYNO.SDS.App.ExamplePackage.Instance",
        "allUsers": true,
        "allowMultiInstance": false,
        "hidden": false,
        "icon": "images/icon.png"
    }
}
```

**属性详情：**

| 属性 | 描述 | 值类型 |
|------|------|--------|
| type | 指定此类的类型 | String |
| title | 套件应用程序的标题 | String |
| appWindow | 打开此应用程序时指定 AppWindow 的类名 | String |
| allUsers | 设置所有用户都可以使用此应用 | Boolean |
| allowMultiInstance | 应用程序可以启动多个实例 | Boolean |
| hidden | 设置为 true 可在开始菜单中隐藏套件 | Boolean |
| icon | 应用程序图标 | String |

### config.define

`config.define` 定义安装在 `package.tgz` 中的已部署 JavaScript 文件名。JSfiles 应包含您要部署的所有 JavaScript 文件，通常是打包工具（如 webpack）的输出。

**示例：**
```json
{
    "ExamplePackage.js":{
        "JSfiles": [
            "dist/example-package.bundle.js"
        ],
        "params": "-s -c skip"
    }
}
```

### Makefile

此 Makefile 用于管理套件应用程序的构建过程。

```makefile
include /env.mak
include ../Makefile.inc

JS_DIR="dist"                                     # JavaScript 文件存储目录
JS_NAMESPACE="SYNO.SDS.App.ExamplePackage"        # 项目中的类名前缀，应与 main.js 中定义的命名空间匹配
BUNDLE_JS="dist/example-package.bundle.js"
BUNDLE_CSS="dist/style/example-package.bundle.css"

.PHONY: all $(SUBDIR)

all: $(BUNDLE_JS) style.css $(SUBDIR)

$(BUNDLE_JS):
    # Snpm 是在 Synology 中安装 npm 模块的工具
    /usr/local/tool/snpm install
    /usr/local/tool/snpm run build
    $(MAKE) -f Makefile.js.inc JSCompress JS_NAMESPACE=\"${JS_NAMESPACE}\" JS_DIR=${JS_DIR}

$(SUBDIR):
    @echo "===>" $@
    $(MAKE) -C $@ INSTALLDIR=$(INSTALLDIR)/$@ DESTDIR=$(DESTDIR) PREFIX=$(PREFIX) $(MAKECMDGOALS);
    @echo "<===" $@

style.css: $(BUNDLE_JS)
    cp $(BUNDLE_CSS) $@

clean: clean_JSCompress $(SUBDIR)
    rm $(BUNDLE_JS)

install: $(SUBDIR) install_JSCompress
    [ -d $(INSTALLDIR)/dist/assets ] || install -d $(INSTALLDIR)/dist/assets
    install --mode 644 dist/assets/*.png $(INSTALLDIR)/dist/assets

include Makefile.js.inc
```

### package.json

此外，您还需要一个 `package.json` 来配置和描述应用程序的依赖关系。

```json
{
    "name": "ExamplePackage",
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

### main.js

该文件作为打包工具的入口点，通过设置必要的组件和配置来初始化 Vue 应用程序。

```javascript
import Vue from 'vue';
import App from './App.vue';

SYNO.namespace('SYNO.SDS.App.ExamplePackage');

// @require SYNO.SDS.App.ExamplePackage.ModalWindow
SYNO.SDS.App.ExamplePackage.Instance = Vue.extend({
    components: { App },
    template: '<App/>',
});
```

### App.vue

您的应用程序实例在此定义，允许您编写 Vue 组件来渲染应用程序。有关 UI 框架的更多详细信息，请参阅 DSM UI 框架。

```vue
<template>
    <v-app-instance class-name="SYNO.SDS.App.ExamplePackage.Instance">
        <v-app-window width=850 height=574 ref="appWindow" :resizable="false" syno-id="SYNO.SDS.App.ExamplePackage.Window">
            <div class="example-package-app">
                Hello Synology Package
            </div>
        </v-app-window>
    </v-app-instance>
</template>

<script>
export default {
    data() {
        return {
        };
    },
    methods: {
        close() {
            this.$refs.appWindow.close();
        },
    },
}
</script>

<style lang="scss">
.example-package-app {
    height: 100%;
}
</style>
```

### webpack.config.js

```javascript
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = async (env, argv) => {
    const isDevelopment = argv.mode === 'development';
    return {
        mode: isDevelopment ? 'development' : 'production',
        devtool: isDevelopment ? 'inline-cheap-module-source-map' : false,
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
        /* 您的包入口，定义了 Vue.extend 和 SYNO.namespace */
        entry: './src/main.js',
        output: {
            /* 需要在 config.define 中写入 */
            filename: 'example-package.js',
            path: path.resolve('dist')
        },
        resolve: {
            extensions: ['.js', '.vue', '.json']
        },
        plugins: [
            new VueLoaderPlugin()
        ],
        externals: {
            'vue': 'Vue'
        },
        watchOptions: {
            poll: true
        }
    };
};
```