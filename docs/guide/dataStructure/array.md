# 栈

1.认识栈结构

>栈(stack) 又名堆栈，它是一种运算受限的线性表。限定仅在表尾进行插入和删除操作的线性表，折断称为栈顶，令一端称为栈底。插入一个元素，称为进栈、入栈、压栈，相反删除一个元素，称为出栈、退栈。

### 特点：后进先出（Last in First Out）

2.入栈和出栈图解

2.1入栈

![](.\\images\\stackPush.png)

2.2出栈
![](.\\images\\stackPop.png)


3.栈结构封装

```js
class Stack{
    #item = []

    push(data){
        this.#item.push(data)
    }

    pop(){
        return this.#item.pop()
    }

    peek(){
        return this.#item.at(-1)
    }

    isEmpty(){
        return this.#item.length === 0
    }

    size(){
        return this.#item.length
    }

    clear(){
        return this.#item = []
    }
}
```

4.栈结构的应用
4.1十进制转2进制图解
![](.\\images\\base.png)
4.2.十进制转多进制代码

```js
let stack = new Stack()

function convert(num,base){
    if(num == 0){
        return
    }else {
        stack.push(num % base)
        convert(Math.floor(num/base,),base)
    }  
}
convert(50,8)
```