# uniapp自定义导航栏

1.准备组件

2.隐藏默认导航栏

```js
// pages.json
"navigationStyle": "custom",
```

3.样式适配->安全区

```js
//获取安全区的位置
const { safeAreaInsets } = uni.getSystemInfoSync()
```

```html
<div :style="{ paddingTop: safeAreaInsets?.top + 'px' }">组件顶部</div>
```

