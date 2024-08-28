# css面试题

## 谈谈对盒子模型的理解

### 标准盒模型

>magin、border、padding、content

![](.\\image\\image2.png)

### ie盒模型
>magin、content（border + padding + content）

![](.\\image\\image3.png)

### css进行盒子模型的转换

```css
box-sizing:content-box; /*标准盒模型*/

box-sizing:border-box; /*IE模型 */
```

## css优先级排列

> !important > 内联样式>id>class>标签 >通配（*）

## css选择器

- 通配选择器（*）
- 元素选择器（div）
- 类选择器
- id选择器
- 属性选择器（[attr=value]）
- 分组选择器（div,span 同时匹配div元素和div元素）
- 后代组合选择器（div span 匹配div元素内的span元素）
- 直接子代组合器（ul>li 匹配直接嵌套在ul中所有里)
- 一般兄弟组合器(p ~ span)
- 紧邻兄弟组合器(h2 + p)
- 列组合器(col + td 匹配所有col作用域内的td元素)
- 伪劣选择器(:hover)
- 伪元素选择器（p::first-line）

## css实现一个三角形

```css
div{
    width: 0;
    height: 0;
    border-left: 100px solid red;
    border-right: 100px solid transparent;
    border-top: 100px solid transparent;
    border-bottom: 100px solid transparent;
}
```

## 文本溢出处理

### 单行文本溢出
```css
div {
    width:200px;
    white-space:nowrap; /*不换行*/
    overflow:hidden; /*超出部分隐藏*/
    text-overflow:ellipsis; /*溢出部分显示省略号/
}
```

### 多行文本溢出

```css
div{
    display: -webkit-box; /*使用弹性盒子布局*/
    -webkit-box-orient: vertical; /*垂直方向*/
    -webkit-line-clamp: 3; /*限制显示行数 */
    overflow: hidden; /*超出部分隐藏 */
}
```

## postition有哪些值，分别根据什么定位

- static(默认) 没有定位
- fixed 固定定位，相对于浏览器窗口进行定位
- relative  相对定位,相对于自身
- absolute  绝对定位，相对于第一个relative的父元素，脱离文档流
- sticky  粘性定位


## 移动端适配的方式有哪些

> 方案一：rem单位+动态改变html的font-size

自己编写写js或者使用flexible

>方案二：vw适配方案


## 随着屏幕缩放，图片能够自适应保持长宽等比为16:9或者1:1,让图片不能压缩

>让某盒子具有16：9或者1：1的比例，然后通过object-fit的设置，让图片适应容器的高度和宽度。

```css
padding-bottom:56.25% /*16：9 */

padding-bottom:56.25% /*1：1 */
```

## 对BFC规范的理解

>是什么：BFC(块级格式化上下文)就是页面上一个隔离的独立容器，容器里面的子元素不会影响外面的元素

- 如何触发BFC
    - float的值非none
    - overflow的值非visible
    - display的值：inline-block
- 用法

## 子元素设置margin-top父元素也会跟着移动，是怎么回事

>问题：垂直外边距叠加  
原因：普通文档流盒子间，只要垂直外边距直接接触，就会发生合并，合并以后外边距视觉高度取俩个发生合并外边距中较大者  
解决：触发BFC，或者不直接接触

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .father{
            width: 500px;
            height: 500px;
            background-color: red;
            overflow: hidden;
            .son{
                margin-top: 200px;
                width: 200px;
                height: 200px;
                background-color: antiquewhite;
            }
        }
    </style>
</head>
<body>
    <div class="father">
        <div class="son"></div>
    </div>
</body>
</html>
```

## css sprite（精灵图、雪碧图）是什么，有什么优缺点

1.是什么：

把多个小图标合并成一张大图片

2.优缺点
优点：减少了http请求的次数（减少了服务器和客户端之间的通信开销），提高性能

缺点：维护性较差

## 什么是css reset?

>reset.css 是一个css文件，用来重置css样式。   
 normalize.css 为了增强跨浏览器渲染的一致性，一个css重置样式库


