# postinst 文件

这是一个 postinst（安装后脚本） 的示例，展示了如何读取用户在安装向导中填写的配置。

```bash
if [ "$myradio1" = true ] ; then
    echo 'radio button 1 is selected'
fi

if [ "$myradio2" = true ] ; then
    echo 'radio button 2 is selected'
fi
```

`myradio1` 和 `myradio2` 是用户在安装向导中填写的值

检查用户是否选择了某个选项

输出日志（可以在 `/var/log/packages/[packagename].log` 查看）