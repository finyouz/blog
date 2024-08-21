# 生命周期

- ready:app初始化
- dom-ready:一个窗口的文本加载完成
- did-finsh-load:导航完成时触发
- window-all-closed:所有窗口都被关闭触发
- before-quit：在窗口之前触发
- will-quit:在窗口关闭并且应用退出时触发
- quit:当所有窗口被关闭时触发

## 生命周期执行顺序

```js
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      backgroundColor: '#2e2c29'
    })
    win.loadFile('index.html')

    win.webContents.on('did-finish-load',()=>{
      console.log("did-finish-load");
    })


    win.webContents.on('dom-ready',()=>{
      console.log('dom-ready');
    })
    
    win.on('close',()=>{
      console.log("close");
    })
   
  }

 app.on('ready',()=>{
  console.log('ready');
  createWindow()
  
 })
  app.on('before-quit',()=>{
    console.log("before-quit");
    
  })

  app.on('will-quit',()=>{
    console.log('will-quit');
  })
  app.on('window-all-closed', () => {
    console.log("window-all-closed");
    app.quit()
  })

  app.on('quit',()=>{
    console.log("quit");
    
  })
    //打印结果
    // ready
    // dom-ready
    // did-finish-load
    // close
    // window-all-closed
    // before-quit
    // will-quit
    // quit

```