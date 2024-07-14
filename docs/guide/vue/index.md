# 基础
## 模板语法

### 文本插值

>最基本的数据绑定形式是文本插值，它使用的是“Mustache”语法 (即双大括号)：

```tenplate
<span>Message: {{ msg }}</span>
```

### 只支持js表达式

```template
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div :id="`list-${id}`"></div>

```

### 不支持js语句

```template
<!-- 这是一个语句，而非表达式 -->
{{ var a = 1 }}

<!-- 条件控制也不支持，请使用三元表达式 -->
{{ if (ok) { return message } }}
```

## 响应式基础

### 声明响应式状态

> ref()

在组合式 API 中，推荐使用 ref() 函数来声明响应式状态：

```js
import { ref } from 'vue'

const count = ref(0)
```
ref() 接收参数，并将其包裹在一个带有 .value 属性的 ref 对象中返回：

```js
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1
```

要在组件模板中访问 ref，请从组件的 setup() 函数中声明并返回它们：

```js
import { ref } from 'vue'

export default {
  // `setup` 是一个特殊的钩子，专门用于组合式 API。
  setup() {
    const count = ref(0)

    // 将 ref 暴露给模板
    return {
      count
    }
  }
}
```
在模板中使用 ref 时，我们不需要附加 .value。

```js
<button @click="count++">
  {{ count }}
</button>
```
>reactive()

还有另一种声明响应式状态的方式，即使用 reactive() API。与将内部值包装在特殊对象中的 ref 不同，reactive() 将使对象本身具有响应性：

```js
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

局限：

- 它只能用于对象类型 (对象、数组和如 Map、Set 这样的集合类型)。它不能持有如 string、number 或 boolean 这样的原始类型。

- 不能替换整个对象：由于 Vue 的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用。这意味着我们不能轻易地“替换”响应式对象，因为这样的话与第一个引用的响应性连接将丢失：

```js
let state = reactive({ count: 0 })

// 上面的 ({ count: 0 }) 引用将不再被追踪
// (响应性连接已丢失！)
state = reactive({ count: 1 })

```

- 对解构操作不友好：当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接：

```js
const state = reactive({ count: 0 })

// 当解构时，count 已经与 state.count 断开连接
let { count } = state
// 不会影响原始的 state
count++

// 该函数接收到的是一个普通的数字
// 并且无法追踪 state.count 的变化
// 我们必须传入整个对象以保持响应性
callSomeFunction(state.count)

```

## 计算属性

如果在模板中写太多逻辑，会让模板变得臃肿，难以维护。

```js
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
```

```template
<p>Has published books:</p>
<span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>
```

### 使用计算属性

```vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

### 计算属性vs方法

> 方法

```js
// 组件中
function calculateBooksMessage() {
  return author.books.length > 0 ? 'Yes' : 'No'
}
```

> 计算属性

```js
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
```

俩种方式在结果上确实是完全相同的，不同之处在于计算属性会基于其响应式依赖被缓存。只要响应式数据不发生改变，计算属性返回先前的计算结果。


```js
// 这也解释了为什么下面的计算属性永远不会更新，因为 Date.now() 并不是一个响应式依赖：
const now = computed(() => Date.now())
```

### 可写计算属性
计算属性默认是只读的。当你尝试修改一个计算属性时，你会收到一个运行时警告。只在某些特殊场景中你可能才需要用到“可写”的属性，你可以通过同时提供 getter 和 setter 来创建：

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})

const handleClick = ()=>{
  firstName.value = '3333'
}
</script>

<template>
  <h1>{{ fullName }}</h1>

  <button @click="handleClick">改变</button>
</template>

```

## class 与 style 绑定样式

### 绑定class

#### 绑定对象

```template
<div :class="{ active: isActive }"></div>
```

#### 绑定数组
```js
const activeClass = ref('active')
const errorClass = ref('text-danger')
```

```template
<div :class="[activeClass, errorClass]"></div>
```

### 绑定style

#### 绑定对象

```template
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
```
```js
const activeColor = ref('red')
const fontSize = ref(30)
```

#### 绑定数组
我们还可以给 :style 绑定一个包含多个样式对象的数组。

```template
<div :style="[baseStyles, overridingStyles]"></div>
```

### 样式多值

```template
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

## 条件渲染


## 列表渲染


## 事件处理


## 表单输入绑定

## 生命周期


## 侦听器

