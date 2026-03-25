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

> 其实没有源代码也能完成编译，本文最后会说明。


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


## 附：最小可编译文件

```bash
.
├── INFO.sh
└── SynoBuildConf
    ├── build
    └── install
```

编译输出：

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
------------------------------------------------------------
Link /home/coayang/Documents/toolkit/pkgscripts-ng -> /home/coayang/Documents/toolkit/build_env/ds.r1000-7.2/pkgscripts-ng
Link /home/coayang/Documents/toolkit/source/basic -> /home/coayang/Documents/toolkit/build_env/ds.r1000-7.2/source/basic


============================================================
                Start to run "Build Package"                
------------------------------------------------------------
[r1000] env PackageName=basic /pkgscripts-ng/SynoBuild --r1000 -c --min-sdk 6.2 basic
/bin/bash: warning: setlocale: LC_ALL: cannot change locale (en_US.UTF-8)
Set cache size limit to 8.0 GB
Statistics zeroed
[INFO] projectList=basic
[INFO] Start to build basic.
[SCRIPT] build script: //source/basic/SynoBuildConf/build
[INFO] ======= Run build script =======
Cleaning...
Build completed (no files generated)
[INFO] No install-dev script.
Time cost: 00:00:00 [Build-->basic]
[INFO] Build basic finished!
----------------- Time cost statistics -----------------
Time cost: 00:00:00 [Build-->basic]
1 projects, 0 failed, 0 blocked.

============================================================
        Start to run "Install Package[--with-debug]"        
------------------------------------------------------------
[r1000] env PackageName=basic /pkgscripts-ng/SynoInstall  --with-debug basic
/bin/bash: warning: setlocale: LC_ALL: cannot change locale (en_US.UTF-8)
[INFO] projectList=basic
[INFO] Start to install basic.
[ENV] Using 64bit environment.
[INFO] Execute install script: //source/basic/SynoBuildConf/install
Warning: demo binary not found, skipping
ls /tmp/_package_tgz | tar cJf /tmp/_test_spk/package.tgz -C /tmp/_package_tgz -T /dev/stdin
'/source/basic/INFO' -> '/tmp/_test_spk/INFO'
creating package: basic-1.0.0-0001_debug.spk
source:           /tmp/_test_spk
destination:      /image/packages/basic-1.0.0-0001_debug.spk
[WARNING] /tmp/_install is empty!
[INFO] Install basic finished!
1 projects, 0 failed, 0 blocked.
[INFO] Finished SynoInstall script.

============================================================
               Start to run "Install Package"               
------------------------------------------------------------
[r1000] env PackageName=basic /pkgscripts-ng/SynoInstall  basic
/bin/bash: warning: setlocale: LC_ALL: cannot change locale (en_US.UTF-8)
[INFO] projectList=basic
[INFO] Start to install basic.
[ENV] Using 64bit environment.
[INFO] Execute install script: //source/basic/SynoBuildConf/install
Warning: demo binary not found, skipping
ls /tmp/_package_tgz | tar cJf /tmp/_test_spk/package.tgz -C /tmp/_package_tgz -T /dev/stdin
'/source/basic/INFO' -> '/tmp/_test_spk/INFO'
creating package: basic-1.0.0-0001.spk
source:           /tmp/_test_spk
destination:      /image/packages/basic-1.0.0-0001.spk
[WARNING] /tmp/_install is empty!
[INFO] Install basic finished!
1 projects, 0 failed, 0 blocked.
[INFO] Finished SynoInstall script.

============================================================
               Start to run "Collect package"               
------------------------------------------------------------
/home/coayang/Documents/toolkit/build_env/ds.r1000-7.2/image/packages/basic-1.0.0-0001.spk -> /home/coayang/Documents/toolkit/result_spk/basic-1.0.0-0001
/home/coayang/Documents/toolkit/build_env/ds.r1000-7.2/image/packages/basic-1.0.0-0001_debug.spk -> /home/coayang/Documents/toolkit/result_spk/basic-1.0.0-0001

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

