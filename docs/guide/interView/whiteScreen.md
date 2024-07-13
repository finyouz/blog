# 白屏问题

首页白屏是网站开发中常见的性能问题，通常表现 为用户访问网站首页时，页面内容无法正常显示，仅能看到浏览器背景色或白屏的状态。

## 产生的原因

### 资源加载问题

- css和js文件加载速度慢，导致页面渲染延迟
    - css和js文件体积过大
    - 网络条件不佳
- 图片资源加载慢：大图片或高分辨图片会显著增加页面加载时间
- 字体文件加载问题：如果网站使用自定义字体，而字体文件未能及时加载，也会影响页面渲染。

### 代码渲染问题

- js执行阻塞：当内联的js代码执行会阻塞页面的渲染，直到js代码执行完毕
- 模板渲染问题：当数据加载和渲染的时机不当，会导致白屏
- 框架的组件问题：没有正确引入，注册或存在模板语法错我，也有可能导致白屏

### 服务器和网络问题
- 服务器响应慢：服务器处理请求的速度慢，导致页面加载时间长
- 网络延迟:用户网络环境不佳，导致页面资源加载缓慢

### 浏览器缓存问题
- 浏览器缓存了旧的资源或配置，导致页面无法正常加载

## 解决方案
### 优化资源加载：
- 压缩和优化CSS、JavaScript文件：使用工具如Webpack、Gulp等进行代码压缩和优化，减少文件体积。
- 优化图片资源：使用适当的图像压缩技术减小图像文件大小，使用懒加载或延迟加载技术推迟图片的加载。
- 字体优化：使用Web字体时，考虑使用子集化技术减少字体文件大小，或使用系统默认字体作为备选。
### 代码和渲染优化：
- 避免内联JavaScript阻塞渲染：尽量将JavaScript代码放在页面底部或使用异步加载方式。
- 优化前端模板渲染：确保数据加载和渲染的时机合理，考虑使用服务器端渲染（SSR）技术。
- Vue等框架的优化：确保组件正确引入和注册，检查模板语法是否正确，修复任何编译错误。
### 服务器和网络优化：
- 优化服务器配置：提高服务器处理请求的能力，使用CDN加速等技术减少网络延迟。
- 监控网络请求：使用浏览器的开发者工具监控网络请求，确保所有资源都能正确加载。
### 清除浏览器缓存：
- 清除浏览器缓存，确保浏览器加载的是最新的资源。
### 其他建议：
- 使用加载骨架屏或占位符：在内容加载之前，使用加载骨架屏或占位符给用户一种进度感，减少白屏时间的不良体验。
- 前端性能监控和优化：使用工具来监测和分析前端性能，并针对性地进行优化。

## 白屏时间和首屏时间

### 白屏时间（FP）
白屏时间是指从浏览器开始响应用户输入的网址地址，到浏览器开始显示内容的时间

### 首屏时间（FCP）
首屏时间是指从浏览器开始响应用户输入的网址地址，到首屏内容（即用户视窗中可见的第一屏内容）全部渲染完成的时间。

## 代码解决方案

### 1.首页添加一个loading,在index.html里加一个loadingcss效果，当页面加载完成后消失。

### 2.路由进行懒加载

```js
routes:[{
   path:'/index',
   name:'index',
   component:() => import('@/views/index')
}]
```

好处：：使用懒加载，打包后才根据路由生成多个js和css文件，当访问到对应的路由时，才加载对应的文件在移动端页面的首页时，先加载可视区域的内容，剩下的内容等它进入可视区域后再按需加载。

### CDN资源优化

随着项目越做越大，需要依赖的第三方npm包也越多，构建后的文件也越大，主要目的是通过从CDN加载常用的库和框架来减少构建产物的体积，从而加快项目的加载速度。

- 将vue、vue-router、vuex、axios等vue的全家桶资源，全部改为通过CDN链接获取，在index.html里插入相应的链接

```html
<body> 
    <div id="app"></div> 
    <script src="https://cdn.bootcss.com/vue/2.6.10/vue.min.js"></script> 
    <script src="https://cdn.bootcss.com/axios/0.19.0-beta.1/axios.min.js"></script> 
    <script src="https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js"></script> 
    <script src="https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js"></script>
    <script src="https://cdn.bootcss.com/element-ui/2.6.1/index.js"></script> 
</body>

```

- vue-cli
在vue.config.js中配置externals属性
```js
module.exports = {
...
  externals:{
     'vue':'Vue',
     'vuex':'Vuex',
     'vue-router':'VueRouter',
     'axios':'axios'
  }
}
```
- vite
    - 安装插件 vite-plugin-cdn-import
```js
// vite.config.ts  
import { defineConfig } from 'vite';  
import vue from '@vitejs/plugin-vue';  
import importToCDN from 'vite-plugin-cdn-import';  

export default defineConfig({  
  plugins: [  
    vue(),  
    importToCDN({  
      modules: [  
        {  
          name: 'vue',  
          var: 'Vue',  
          path: 'https://unpkg.com/vue@3.x.x/dist/vue.global.prod.js', // 注意替换为实际版本号  
        },  
        {  
          name: 'axios',  
          var: 'axios',  
          path: 'https://unpkg.com/axios/dist/axios.min.js',  
        },  
        // 其他需要CDN化的资源...  
      ],  
    }),  
  ],  
});

    ```


