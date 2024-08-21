# BrowserWindow属性

## 窗口尺寸

```js
new BrowserWindow({
    x:100,
    y:100,
    show:false,//窗口是否显示
    width:800,
    height:400,
    maxHeight:600,
    maxWidth:1000,
    minHeight:200,
    minWidth:400,
    resizable:false, //不可伸缩
})

```

## 窗口标题及环境

- autoHideMenuBar:true(自动隐藏菜单栏)

![](.\\images\\image1.png)

- icon (网站图标)

![](.\\images\\image2.png)

- title:(窗口标题)

>在browserWindow设置title,在想用的html中不用设置

- frame (无框窗口)

![](.\\images\\image3.png)

## 自定义窗口
```js
let {remote} from 'electorn'
let mainWin = remote.getCurrentWindow()
```
- 关闭
```js
mainWin.close()
```
- 最大化

```js
//判断窗口是什么状态
mainWin.isMaximized()


//最大化
mainWin.maximize()

//初始状态
mainWin.restore()

```
- 最小化
```js
//判断窗口是什么状态
mainWin.isMinimized()

//最大化
mainWin.minimize()

//初始状态
mainWin.restore()
```
 
## 阻止窗口关闭

```js
//清除关闭默认行为
windows.onbeforeunload = function(){

    //关闭窗口
    mainWin.destroy()

    return false
}
```

## 父子及模态窗口