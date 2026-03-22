# 如何连接到虚拟机？

```bash
# 更新软件包列表
sudo apt update

# 安装 OpenSSH 服务器
sudo apt install openssh-server -y

# 验证安装是否成功
dpkg -l | grep openssh-server
```

```bash
# 启动 SSH 服务
sudo systemctl start ssh

# 设置 SSH 开机自启
sudo systemctl enable ssh

# 查看 SSH 服务状态（确认运行中）
sudo systemctl status ssh
```

```bash
# 查看 IP 地址
ip addr show

# 或者更简洁的方式
hostname -I
```

```bash
# 从 Windows 打开 PowerShell 或 CMD
ssh 用户名@虚拟机IP

# 例如
ssh ubuntu@192.168.1.100
```