# TypeScript

## 一、类型声明

```ts
let a: string = '123'

let b: number = 0

let c: boolean = false

function count(x:number,y:number):number{
    return x + y
}

count(1,2)
```

>特殊情况

```ts
let a:'ser'

a = 'hello' //不能将类型“"hello"”分配给类型“"ser"”

a = 'ser'


```

## 二、类型总览

JavaScript中的数据类型

- string
- number
- boolean
- null
- underfined
- bigint
- symbol
- object


TypeScript的数据类型

- 上述javaScript类型

- any
- unknown
- never
- void
- tuple
- enum

自定义类型的方式
- type
- interface

## 三、ts类型

1.any
任意类型，一旦将变量类型限制为any,就意味着放弃对该变量的类型检查
```ts
let a:any

a = 2

a = 'string'


let b:string

b = a
```

2.unknown

`未知类型`

- 可以理解为一个类型安全的any，适用于不确定的具体类型

```ts
let a:ubknows


a = 100

a = false

a = '你好'

let x:string

x = a //不能将类型unknown分配给类型string
```

- unknown会强制开发者在使用之前进行类型检查，从而提供更浅的类型安全性

```ts
if(typeof a === 'string'){
    x = a
}

//断言
x = a as string

x = <string> a
```
- 读取any类型数据的任何属性都不会报错，而unknown正好相反

```ts
let str:unknown

str = 'anc'

str.toUpperCase() //str类型为未知
```

3.never

- 几乎不用never去限制变量，因为没意义
```ts
let a:never

//以下都会警告
a = 2

a = true

a = undefined

```
- never一般时ts主动推断出来的
```ts
let a:string

a = 'hello'

if(typeof a === 'string'){
    console.log(a.toUpperCase())
}else{
    console.log(a) //推断出
}
```

- never也可以用于限制函数的返回值
```ts
function throwError(str:string):never{
    throws new Error('程序退出')
}
```
4.void

函数返回值为空，函数行会隐身返回一个undefined,void可以接收这一种“空”

```ts
function sun():void{
    consloe.log('11')
}
function sun():void{
    consloe.log('11')
    return undefined
}
```

5.object

- 数组类型


- 对象类型
```ts
let person : {name:string,age?:number
    [key:string]:string // 索引签名
}

person = {name:'234','gender':'男'}
```
- 函数类型

```TS   
let count:(a:number) => number
```

- 数组类型
```ts
let arr:string[]

let arr2:Array<number>
```
6.tuple
是一种特殊的数据类型，可以存储
固定数量的元素，并且每个元素的类型是已知的且可以不同。元组用于精确描述一组值的类型，?表示可选元素

```ts
let arr1:[string,number]

let arr2:[string,number?]

let arr3:[string,...string[]]
```
7.enum

枚举：可以定义一组命名常量 它能增强代码的可读性

```ts
enum Direction{
    Up,
    Down,
    Left,
    Right
}

```

8.type

为任意类型创建别名，让代码更简洁、可读性更强，同时能更方便地进行类型复用和扩展。
```ts
type item = {
    num:number,
    gender:string
}


type Item2 = item | {
    age:number
}

//通过交叉实现继承
type Item2 = item & {
    age:number
}
```

10.class

> 基本展示
```ts
class Person{
    name:string
    age:number
    constructor(name:string,age:number){
        this.name = name
        this.age = age
    }
    speak(){
        consloe.log(`我的名字${this.name}`)
    }
}
```

>继承
```ts
class Student extents Person{
    grade:string
    constructor(name:string,age:number,grader:string){
        super(name,age)
        this.grade = grade
    }

    //可写不写,(防止写错)
    override speak(){
        consloe.log(`我学生的名字${this.name}`)
    }
}

```

11. 属性修饰符

|修饰符|含义|具体规程|
|--|--|--|
|public|公开|可以被：类内部、子类、类外部访问(new)|
|protected|受保护的|可以被：类内部、子类访问|
|private|私有的|可以被类内部访问|
|readonly|只读属性|属性无法修改|

简写形式
```ts
class Person{
    constructor(public name:string,public age:number){
        this.name = name
        this.age = age
    }
    speak(){
        consloe.log(`我的名字${this.name}`)
    }
}
```

12.抽象类
> 概述：抽象类是一种`无法被实例化`的类，专门用来定义类的`结构和行为`，类中可以写抽象方法，也可以具体实现。抽象类主要用来为其派生类提供一个基本结构，要求`必须实现其中的抽象方法`。


```ts
abstract class Package{
    contruction(public weight:number){

    }

    //抽象方法
    abstract calculate():number

    printPackage(){
        console.log("包裹重")
    }
}
```

13 interface
`重复定义，可以合并`
```ts
interface Person{
    name:string,
    age:number,
    speack(numbre):void
}

interface Son extends Person {
    detail:string
}

//类的实现
class Father implements Person{
    constructor(){
        public name:string,
        public age:number
    }

    speack(n:number){
        console.log(n)
    }
}
```

14.区别

>type 和 interface

相同点：定义对象的类型

不同点：

- 前者专注于`类型别名、联合类型、交叉类型`，不支持继承和自动合并

- 后者专注于`对象和类`的结构，但支持继承和自动合并

> interface 和抽象类

相同点：定义类的结构

不同点：
- 前者：只能描述结构，无法实现代码，一个类可以实现多个结构
- 后者：既可以包含抽象方法，也可以包含具体方法，一个类只能继承一个抽象类

## 三、泛型
>泛型函数
```ts
function logData<T>(data:T){

}


logData<number>(100)

logData<string>(100)
```
>泛型接口

```ts
interface Person<T>{
    name:string,
    userInfo:T
}


let person:Person<number>{
    name:'ok',
    userInfo:2 
}
```
## 四、类型声明文件

> 类型声明文件是Ts中的特殊文件，通常以.d.ts作为扩展名，它主要作用是为现有的js提供类型信息，是的ts能够使用js是进行类型检查和提示

```js
//demo.js

export function add(a,b){
    return a+b
}

```

```ts
// demo.d.ts

declare function add(a:number,b:number):number


```