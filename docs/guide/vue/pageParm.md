# 处理页面带参数和不带参数，侧边栏高亮问题

## 问题
```
/photo/album
/photo/album:id? (?参数可以携带也可以不携带)
```

当使用element-ui中菜单组件中

```vue
 <el-menu :default-active="" class="el-menu-vertical-demo" :router="true">
    <el-menu-item index="/photo/pic">
        <el-icon><CameraFilled /></el-icon>
        <span>照片</span>
    </el-menu-item>
    <el-menu-item index="/photo/album">
        <el-icon><MessageBox /></el-icon>
        <span>相册</span>
    </el-menu-item>
</el-menu>
```

当使用 route.path中 /photo/album 和 /photo/album/:id 是俩种不一样的路由,当进行跳转时,携带参数的导航栏不会显示。

## 正确做法

```js
route.matched.some(record => record.path === '/photo/album' || record.path === '/photo/album/:id')
```