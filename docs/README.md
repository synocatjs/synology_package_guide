# 群晖套件开发手册

<div style="display: flex; flex-direction: column; align-items: center;">
    <img src="_media/logo.svg" width="256" height="256" alt="Synology Package Logo">
    <p style="margin-top: 12px; color: #666; font-size: 14px;">synocat（synocatjs）</p>
</div>

群晖 DSM 是基于 linux 的系统，并提供了 docker 运行套件，对于大多数开发中或者爱好者来说，通过 docker 可以运行大多数套件，但是一些时候，我们仍然需要一个能够集成桌面的套件，比如在 DSM 内修改特殊文件的内容。

事实上，如果不考虑桌面集成，也可以使用 OpenList 套件，但这本质上还是一个 docker 套件，因此本文档整理了群晖套件开发的相关资料，包括工具、开发指南、API 文档等。


尽管群晖提供了开发文档，但是个人认为，目前仍然不足以支持一个套件项目的快速开发，因而本文以及组织 `synocat` 旨在尝试提供更简洁的开发流程，

文中 `toolkit` 表示套件开发项目的根目录，您可以使用任意名称。

为了方便本文沿用 `toolkit`，您可以根据实际情况自行替换。

## 资源

1. [开发者工具](https://www.synology.cn/zh-cn/support/developer#tool)
2. [第三方套件开发指南](https://help.synology.cn/developer-guide/)
3. [开发者工具 Toolkits 和 GPL source](https://archive.synology.cn/download/ToolChain)
4. [官方套件 API 文档](https://office-suite-api.synology.com)

- pkgscripts-ng (套件构建脚本): 这是官方最主要的跨平台编译框架，用于打包、生成SPK文件以及管理不同架构下的编译环境。
- spksrc (跨平台编译框架): 一个非常强大的社区开源项目，提供了一个完整的交叉编译框架，可以帮你将大量现有的开源软件打包成SPK格式，并发布到SynoCommunity仓库。


## 组织

[synocat](https://github.com/synocat/synocatjs)

群晖（synology）套件被称为 `Toolkit`, `kit` 谐音 `cat` ，因此我们命名为 `synocat`。

## AI 使用说明

文档翻译使用了 AI，不排除幻觉出现的可能，请根据实际情况自行判断，或者[联系开发者](mailto:reggiesimons2cy@gmail.com)
