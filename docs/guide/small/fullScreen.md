# 全屏效果

> 在后台管理系统开发中,我们可以看到后台系统右上角有一个全屏的图标,点击就可以完成全屏效果,但是又要怎么去实现呢,刚开始查看可以使用的插件去完成，但后来发现使用原生js也可以进行全屏效果，但是兼容性可能不好。

## 打开全屏

```js
//文档根节点的方法requestFullscreen,实现全屏模式
document.documentElement.requestFullscreen();
```

## 关闭全屏

```js
//退出全屏
document.exitFullscreen()
```

## 判断当前页面是否是全屏

```js
//DOM对象的一个属性:可以用来判断当前是不是全屏模式[全屏:true,不是全屏:false]
let full = document.fullscreenElement;
```

## 遇到的困难

> 当点击全屏时，按下esc时，可以退出全屏，但是图标没发生改变

- 想过监听键盘事件

```js
onMounted(()=>{
    window.addEventListener('keydown', (event)=>{
        if(event.key==='Escape'){
            //逻辑部分
        }
    })
})
```

但是全屏情况下,按下esc没反应

## 解决方法

>监听页面的改变

```js
onMounted(() => {
    window.addEventListener('fullscreenchange', handleFullscreenChange)
})

const handleFullscreenChange = () => {
    if (!document.fullscreenElement) {
        // 退出全屏模式时触发  
        isOpen.value = false
    }
}
```
