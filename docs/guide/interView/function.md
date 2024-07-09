# 普通函数和箭头函数的区别

## 箭头函数没有自己的this

>所有函数在执行时，会创建一个函数执行上下文，普通函数的执行上下文中会有一个变量this，而箭头函数没有，箭头函数不会创建自己的this对象，只会继承在自己作用域的上一层this

```js
var id = 'Global'
 
// 箭头函数定义在全局作用域
let fun1 = () => {
  console.log(this.id)
}
 
fun1() // 'Global'
```

## 箭头函数的this不会改变

>箭头函数没有自己的this，所以箭头函数中this的指向在它定义时就已经确定了，之后不会改变。

```js
var name = 'GLOBAL';
var obj = {
    name: 'finyou',
    getName1: function(){
        console.log(this.name);
    },
    getName2: () => {
        console.log(this.name);
    }
};
obj.getName1();    
obj.getName2();   
 

```

## 箭头函数没有prototype属性

```js
let fn = function(name) {
    console.log(name);
}
let fn2 = name => console.log(name);
console.log(fn.prototype);
console.dir(fn2.prototype);
```

## 箭头函数不能作为构造函数

```js
let fn = (name, age) => {
    this.name = name;
    this.age = age;
}
 
// 报错
let p = new fn('finyou', 18);
```

- 创建一个新的空对象
- 设置原型，将对象的原型设置为函数的prototype对象
- 让函数的this指向这个对象，执行构造函数的代码
- 返回新的对象

```js
function myNew(constructor, ...args) {
  // 基于原型链 创建一个新对象，并且继承构造函数constructor的原型对象prototype上的属性
  let newObj = Object.create(constructor.prototype);
  // 执行构造函数，并让this指向这个新对象
  let res = constructor.apply(newObj, args); 
  // 如果函数的执行结果有返回值并且是一个对象, 返回执行的结果, 否则, 返回新创建的对象
  return typeof res === 'object' ? res: newObj;
}
```

## 箭头函数不能使用arguments对象

## 箭头函数不能用作Generator函数