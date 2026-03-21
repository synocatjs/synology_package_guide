## 监控

DSM 通过切片（slices）或进程来管理资源。它需要知道"谁拥有这个进程"的信息。对于套件，它们应告知 DSM 哪些守护进程属于它们。

您需要做的就是在 systemd 单元中填写 `Slice` 字段，值为 `[package_name].slice`。以下是 MyPackage 单元中的示例字段：

```
...
[Service]
Slice=MyPackage.slice
...
```

如果该字段设置正确，您应该能够在资源监控器中看到您的套件显示。