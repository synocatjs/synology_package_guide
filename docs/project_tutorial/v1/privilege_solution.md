# 解决权限问题

!> 注意：为了方便本教程的追溯，我创建了一个新的项目 `v1`，更改了 `install` 中的路径，请通过 diff 自行检查，这里不再赘述。

需要创建一个 `privilege` 文件，这是 json 格式的文件，没有后缀名。

## 项目结构

```bash
v1
├── conf
│   └── privilege # 创建这个文件
├── demo.c
├── INFO.sh
├── Makefile
└── SynoBuildConf
    ├── build
    └── install
```

文件内容如下：

```json
{
    "defaults": {
        "run-as": "package"
    }
}
```

1. run-as：指定进程运行时所使用的用户账户
2. 设置为 "package" 表示使用套件专属用户运行，而非 root 用户

[SPK包中的权限设置介绍](spk_introduction/folder_conf?id=Privilege（权限）)

# 现在，您会遇到新的问题：

![format error](_media/format_error.png)

套件格式不正确，具体没有说明。

所以，我们可以发现，`pkgscripts-ng` 并不会检查项目的结构，完成编译并不意味着可以安装运行。

那么，如何解决呢？

请看下一节。


