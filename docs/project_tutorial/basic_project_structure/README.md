# 基本项目结构

在一个可完整编译的项目中，这些文件是必要的：

```bash
.
├── demo.c
├── INFO.sh
├── Makefile
├── scripts
└── SynoBuildConf
    ├── build
    └── install
```

分别是：

- `demo.c`：源代码文件
- `INFO.sh`：项目信息文件
- `Makefile`：编译脚本
- `scripts`：脚本文件夹
- `SynoBuildConf/build`：构建脚本
- `SynoBuildConf/install`：安装脚本

但是当你安装的时候会提示错误：

![errro](_media/demo_basic_install_error.png)

你可以在 [解决方案](project_tutorial/basic_project_structure/privilege_solution.md) 中尝试解决这个问题。

