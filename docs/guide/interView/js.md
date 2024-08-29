# js

## js延迟加载的方式有哪些

[参考网址](https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)

延迟（异步）加载：async、defer

```js
<script async src="a.js"></script>
<script defer src="a.js"></script>
```
- 相同点
    - js和html一起解析
- 不同点
    - defer等html全部执行完成，才会执行js,按顺序执行
    - async执行js会暂停html的解析

## js数据类型有哪些

- 基本类型
    - string
    - number
    - boolean
    - undefined
    - null
    - symbol
    - bigint

- 引用类型
    - object

`NaN`是一个数值类型，但不是一个具体的数字

## null和undefined的区别

```txt
1.作者在设计是先设计null(借鉴java)
2.null会被隐式转换成0,很不容易发现错误
3.先有null后有undefined，undefined会被隐式转换NaN
```

## typeof 和 instanceof的区别

- typeof 判断基本数据类型
- instanceof 判断对象是否是某个的实例，适用于引用数据类型

> 如何实现一个instanceof

```js
function instanceOf(target,obj){
    let p = target

    while(p){
        if(obj.prototype == p){
            return true
        }else{
            p = p.__proto__
        }
    }
    return false
}


console.log( instanceOf([1,2,3],Array));
```

## js判断变量是否是数组

- Array.isArray(arr)

- Array.prototype.isPrototypeOf(arr)

- instanceof

- Object.prototype.toString.call(arr) === '[object Array]'


## == 和 === 区别

- == 比较值

- == 比较值和类型

## 什么是类数组，怎么转换成真正的数组

类数组是一种类似数组的对象，但它不是真正的js数组。类数组的主要特点：
- 具有length属性，这个属性表示类数组中元素的数量
- 类数组可以包含从0开始的自然递增整数作为键名
- 类数组可以真正的数组一样进行遍历，例如使用for循环
- 但是类数组不能调用真正的数组方法

>Array.form()将类数组转换为真正的数组

## 数组去重

```js
// set
let arr = [1,2,3,1]
let newArr = [...new Set(arr)]

//filter和indexOf
const newArr = arr.filter((value,index,self)=>{
    return self.indexOf(value) === index
})


//原生
let new_arr = []
for(let i = 0 ; i < arr.length ; i++){
    if(new_arr.indexOf(arr[i]) === -1){
        new_arr.push(arr[i])
    }
}
```

## 数组进行扁平化，并且去重
```js

//扁平化处理
arr.flat(Infinity)
```

## 找出数组中出现最多的元素
```js
function fun(arr){
    let obj = {}
    let count = 0
    let maxCount = null


    arr.forEach((item)=>{
        obj[item] = (obj[item] || 0) + 1

        if(obj[item] > count){
            count = obj[item]
            maxCount = item
        }
    })

    return maxCount
}
```