# 如何从虚拟环境中下载文件

可以使用 scp 命令从虚拟环境中下载文件。

```bash
# 下载单个文件到桌面
scp coayang@192.168.5.243:/home/coayang/Documents/toolkit/result_spk/mini-app-1.0.0/mini-app-x86_64-1.0.0.spk /Users/simons/Documents/synology


# 下载所有 SPK 文件
scp coayang@192.168.1.100:/home/coayang/Documents/toolkit/build_env/ds.r1000-7.2/image/packages/*.spk ~/Desktop/

# 下载整个目录
scp -r coayang@192.168.1.100:/home/coayang/Documents/toolkit/build_env/ds.r1000-7.2/image/packages/ ~/Desktop/spk_files/
```