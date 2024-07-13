# vue面试题

## vue3与vue2的区别

- 重写了响应式 Object.defineProperty > Proxy

```js
let name = 'finyou'
const obj = {}

Object.defineProperty(obj,'name',{
    get(){
        console.log("get方法");
        return name
    },
    set(newValue){
        console.log("set方法");
        name = newValue
    }
})

console.log(obj.name);
obj.name='张小胖'
console.log(obj.name);

```

## Vue和react的区别

### 核心思想不同

### 组件写法不同

### diff算法不同

### 响应式原理不同

### 封装程度不同