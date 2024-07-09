# 防抖和节流

## 1.防抖

>单位时间内,频繁触发事件,只执行最后一次

```js
function debounce(fn, t) {
 let timer
 // return 返回一个匿名函数
 return function() {
  if(timer) clearTimeout(timer)
  timer = setTimeOut(function() {
   fn()
  }, t)
 }
}

```

## 2.节流

>单位时间内，频繁触发事件，只执行一次

```js
function throttle(fn, t) {
let timer
// return 返回一个匿名函数
return function() {
if(!timer) {
    timer = setTimeOut(function() {
        fn()
        timer = null
    }, t)
    }
 }
}


```
