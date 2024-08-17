# electorn快速上手

## 创建应用程序


### 项目创建
```bash
mkdir my-electron-app && cd my-electron-app
npm init
```
```js
// package.json
{
  "name": "my-electron-app",
  "version": "1.0.0",
  "description": "Hello World!",
  "main": "main.js",
  "author": "Jane Doe",
  "license": "MIT"
}
```

### 依赖安装

```bash
npm install --save-dev electron
```

>这里一般都会出错
[问题出错请点击这查看](https://blog.csdn.net/feixin369/article/details/140363872)

>配置指令

```js
"scripts": {
    "start": "electron ."
}
```

### 页面的创建

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'">
    <title>finyou</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using Node.js <span id="node-version"></span>,
    Chromium <span id="chrome-version"></span>,
    and Electron <span id="electron-version"></span>.
  </body>
</html>

```

### 在窗口中打开您的页面

```js
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      backgroundColor: '#2e2c29'
    })
    
    win.setMenu(null)
    win.loadFile('index.html')
  }

  app.whenReady().then(() => {
    createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })
```

### 启动

```bash
npm start
```


### 效果展示

![](.\\images\\image.png)