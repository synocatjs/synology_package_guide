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

> 或许源代码不是必要的，但是为了演示，我没有删除它。

以上代码的编译输出如下：

```bash
sudo ./PkgCreate.py -v 7.2 -p r1000 -c basic
============================================================
                   Parse argument result                    
------------------------------------------------------------
platforms     : r1000
env_section   : default
env_version   : 7.2
dep_level     : 1
parallel_proj : 1
branch        : master
suffix        : 
collect       : True
collecter     : True
link          : True
update_link   : False
build         : True
install       : True
only_install  : False
parallel      : 2
build_opt     : 
install_opt   : 
print_log     : False
tee           : True
sdk_ver       : 6.2
package       : basic

Processing [7.2-72726]: r1000
============================================================
              Start to run "Traverse project"               
------------------------------------------------------------
Projects: basic

============================================================
                Start to run "Link Project"      

......
其他编译输出
......

============================================================
                    Time Cost Statistic                     
------------------------------------------------------------
00:00:00: Traverse project
00:00:00: Link Project
00:00:00: Build Package
00:00:00: Install Package[--with-debug]
00:00:00: Install Package
00:00:00: Collect package

[SUCCESS] ./PkgCreate.py -v 7.2 -p r1000 -c basic finished.
```

编译成功，可以尝试安装。

## 注意

但是当你安装的时候会提示错误：

![errro](_media/demo_basic_install_error.png)

你可以跟随步骤在下一节解决它，一步一步理解整个项目的逻辑。

