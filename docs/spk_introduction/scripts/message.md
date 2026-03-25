# 向用户显示消息

## 通过脚本结果显示消息

如果您想在用户安装、升级、卸载、启动或停止套件后发送提示消息，可以在相关脚本中使用 `$SYNOPKG_TEMP_LOGFILE` 变量。例如：

```sh
echo "Hello World!!" > $SYNOPKG_TEMP_LOGFILE
```

如果您想根据用户的语言显示提示消息，可以使用 `$SYNOPKG_DSM_LANGUAGE` 变量获取语言缩写，如下例所示：

```sh
case $SYNOPKG_DSM_LANGUAGE in
        chs)
            echo "简体中文" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        cht)
            echo "繁體中文" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        csy)
            echo "Český" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        dan)
            echo "Dansk" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        enu)
            echo "English" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        fre)
            echo "Français" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        ger)
            echo "Deutsch" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        hun)
            echo "Magyar" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        ita)
            echo "Italiano" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        jpn)
            echo "日本語" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        krn)
            echo "한국어" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        nld)
            echo "Nederlands" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        nor)
            echo "Norsk" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        plk)
            echo "Polski" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        ptb)
            echo "Português do Brasil" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        ptg)
            echo "Português Europeu" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        rus)
            echo "Русский" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        spn)
            echo "Español" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        sve)
            echo "Svenska" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        trk)
            echo "Türkçe" > $SYNOPKG_TEMP_LOGFILE 
        ;;
        *)
            echo "English" > $SYNOPKG_TEMP_LOGFILE 
        ;;
    esac
```

更多信息请参阅"scripts"和"脚本环境变量"部分。

---

## 通过桌面通知显示消息

可以使用 `/usr/syno/bin/synodsmnotify` 可执行文件向用户发送桌面通知。通知标题/消息必须是国际化字符串。

```sh
/usr/syno/bin/synodsmnotify -c [应用ID] [用户或组] [标题的国际化字符串] [消息的国际化字符串]
```

**示例：**
```sh
# 向管理员用户发送通知
/usr/syno/bin/synodsmnotify -c com.company.App1 admin MyPackage:app_tree:index_title MyPackage:app_tree:node_1

# 向管理员组发送通知
/usr/syno/bin/synodsmnotify -c com.company.App1 @administrators MyPackage:app_tree:index_title MyPackage:app_tree:node_1
```

**通知标题和消息格式：** `[套件ID]:[国际化部分]:[国际化键]`

其中 `套件ID` 是套件 INFO 文件中的 package 值。国际化字符串示例可在国际化页面找到。

**注意：** 记得在应用程序配置的 `preloadTexts` 字段中指定桌面通知字符串。