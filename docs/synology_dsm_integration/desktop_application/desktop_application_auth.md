## 应用程序认证

将应用程序集成到 Synology DSM 后，您可能需要进行身份验证检查，以确保只有登录用户才能访问页面。

---

### 认证机制

您可以通过运行 `/usr/syno/synoman/webman/modules/authenticate.cgi` 来检查用户登录状态。但 `authenticate.cgi` 需要一些环境变量（`HTTP_COOKIE`、`REMOTE_ADDR`、`SERVER_ADDR` 等）。因此，建议直接从套件自定义 CGI 中执行 `authenticate.cgi`，因为所需的环境变量会自动设置。

---

### 示例代码 test.cgi

`authenticate.cgi` 在用户登录时会输出用户名，未认证时无输出。

```c
#define _GNU_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h>

/**
 * 检查用户是否已登录。
 *
 * 如果用户已登录，将用户名写入 "user"。
 *
 * @param user    用于获取用户名的缓冲区
 * @param bufsize user 缓冲区大小
 *
 * @return 0: 用户未登录或出错
 *         1: 用户已登录，用户名写入给定 "user"
 */

int IsUserLogin(char *user, int bufsize)
{
    FILE *fp = NULL;
    char buf[1024];
    int login = 0;

    bzero(user, bufsize);

    fp = popen("/usr/syno/synoman/webman/modules/authenticate.cgi", "r");
    if (!fp) {
        return 0;
    }
    bzero(buf, sizeof(buf));
    fread(buf, 1024, 1, fp);

    if (strlen(buf) > 0) {
        snprintf(user, bufsize, "%s", buf);
        login = 1;
    }
    pclose(fp);

    return login;
}

int main(int argc, char **argv)
{
    char user[256];

    printf("Content-Type: text/html\r\n\r\n");
    if (IsUserLogin(user, sizeof(user)) == 1) {
        printf("User is authenticated. Name: %s\n", user);
    } else {
        printf("User is not authenticated.\n");
    }
    return 0;
}
```

**注意：** 使用 `-std=c99` 编译此代码。

---

### 运行 test.cgi

DSM 需要 Cookie 来验证 DSM 登录会话。

#### 1. 登录

使用您的凭据访问以下 CGI，您将在 Cookie 中收到会话信息：

```bash
# HTTPS (端口 5001)
https://your-ip:5001/webapi/auth.cgi?api=SYNO.API.Auth&version=3&method=login&account=admin&passwd=your_admin_password&format=cookie

# HTTP (端口 5000)
http://your-ip:5000/webapi/auth.cgi?api=SYNO.API.Auth&version=3&method=login&account=admin&passwd=your_admin_password&format=cookie
```

#### 2. 使用 Cookie 访问 test.cgi

携带 Cookie 信息访问 test.cgi：

```bash
https://your-ip:5001/path/to/test.cgi
```

#### 3. 验证 Cookie 有效性

如果访问 test.cgi 遇到问题，请尝试使用 Cookie 访问其他 WebAPI，以验证 Cookie 信息是否有效：

```bash
https://your-ip:5001/webapi/entry.cgi?api=SYNO.Core.System&version=3&method=info
```

#### 4. 登出

访问以下 WebAPI 将注销当前会话：

```bash
https://your-ip:5001/webapi/auth.cgi?api=SYNO.API.Auth&version=1&method=logout
```

---

### 工作原理

1. **登录**：通过 `auth.cgi` 获取会话 Cookie
2. **认证检查**：CGI 程序调用 `authenticate.cgi`，它会读取环境变量中的 Cookie 信息
3. **结果**：已登录用户返回用户名，未登录用户无输出
4. **登出**：通过 `auth.cgi` 的 `logout` 方法清除会话