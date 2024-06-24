# 变量的解构赋值

## 数组的结构赋值

数组解构是将数组的单元值快速批量赋值给一系列变量的简洁语法

```js
const arr = [1,2,3]
const [a,b,c] = arr
```

典型案例：交换俩个变量

```js
let a = 1
let b = 2;
[b,a] = [a,b]
```

js前面加分号的情况

- 立即执行函数

```js
(function t(){})()
;(function b(){})()
```

- 数组结构

```js
;[b,a] = [a,b]

```

## 对象的结构赋值

将对象属性和方法快速批量赋值给一系列变量的简洁语法

```js
let {username}  = {username:'ok'}
```
