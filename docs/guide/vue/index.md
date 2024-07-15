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

### V-if
v-if 指令用于条件性地渲染一块内容。这块内容只会在指令的表达式返回真值时才被渲染。

```template
<h1 v-if="awesome">Vue is awesome!</h1>
```
### v-show

```template
另一个可以用来按条件显示一个元素的指令是 v-show
```
### 不同点
- v-show 会在 DOM 渲染中保留该元素；v-show 仅切换了该元素上名为 display 的 CSS 属性。

- v-show 不支持在 \<template\> 元素上使用，也不能和 v-else 搭配使用。

### 选择v-if and v-show

v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要频繁切换，则使用 v-show 较好；如果在运行时绑定条件很少改变，则 v-if 会更合适。

## 列表渲染

### v-for

基础语法：
```js
<li v-for="item in items">
  {{ item.message }}
</li>
```

### v-for与对象

当v-for遍历一个对象的所有属性时

- 第二个参数表示属性名

- 第三个参数表示索引位置

```js
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
```

```template
<li v-for="(value, key, index) in myObject">
  {{ index }}. {{ key }}: {{ value }}
</li>
```

### 使用范围值

```template
<span v-for="n in 10">{{ n }}</span>
```
注意此处 n 的初值是从 1 开始而非 0。

### 通过key管理状态

- Vue 默认按照“就地更新”的策略来更新通过 v-for 渲染的元素列表。Vue 不会随之移动 DOM 元素的顺序，而是就地更新每个元素，确保它们在原本指定的索引位置上渲染。

- 默认模式是高效的，但只适用于列表渲染输出的结果不依赖子组件状态或者临时 DOM 状态 (例如表单输入值) 的情况。

- 为了给 Vue 一个提示，以便它可以跟踪每个节点的标识，从而重用和重新排序现有的元素，你需要为每个元素对应的块提供一个唯一的 key attribute：

```template
<div v-for="item in items" :key="item.id">
</div>
```


## 事件处理
我们可以使用 v-on 指令 (简写为 @) 来监听 DOM 事件，并在事件触发时执行对应的 JavaScript。用法：v-on:click="handler" 或 @click="handler"。

### 内联事件处理器

```template
<button @click="count++">Add 1</button>
```

### 方法事件处理器

```template
<button @click="greet">Greet</button>
```

### 事件修饰符
>stop阻止冒泡

```template

<div @click="divHandler">
	<button @click.stop="btnHandler">点击</button>
</div>

```
>prevent 阻止默认事件

```template
<a href="http://www.baidu.com" @click.prevent='linkclick'>百度一下</a>

```

>capture 添加事件侦听时使用事件捕获模式

```template
<div @click.capture="divHandler">
	<button @click="btnHandler">点击</button>
</div>
```


>once事件只触发一次

```template
<button @click.once="btnHandler">点击</button>
```

>self 点击当前元素本身时才会触发回调

```template
<div @click.self="divHandler" style="background: red;">
	<button @click="btnHandler">点击</button>
</div>
```

## 表单输入绑定

### v-model
在前端处理表单时，我们常常需要将表单输入框的内容同步给 JavaScript 中相应的变量

```template
<input :value="text" @input="event => text = event.target.value">
```

现在

```template
<input v-model="text">
```

### 修饰词

> lazy默认情况下，v-model 会在每次 input 事件后更新数据 (IME 拼字阶段的状态例外)。你可以添加 lazy 修饰符来改为在每次 change 事件后更新数据：

```template
<!-- 在 "change" 事件后同步更新而不是 "input" -->
<input v-model.lazy="msg" />
```

>number 自动转换为数字

```template
<input v-model.number="age" />
```

>trim 自动去除用户输入内容中两端的空格

```template
<input v-model.trim="msg" />
```

## 生命周期

### 注册周期钩子

```template
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log(`the component is now mounted.`)
})
</script>
```

### 生命周期图示

![生命周期](../../public/live.png)

## 侦听器

### watch

> 基本示例
，我们可以使用 watch 函数在每次响应式状态发生变化时触发回调函数：
```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')
const loading = ref(false)

// 可以直接侦听一个 ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.includes('?')) {
    loading.value = true
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    } finally {
      loading.value = false
    }
  }
})
</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" :disabled="loading" />
  </p>
  <p>{{ answer }}</p>
</template>
```

### 侦听对象属性

```js
// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(`Count is: ${count}`)
})

// 提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {
    console.log(`Count is: ${count}`)
  }
)
```

### 深层侦听器

>直接给 watch() 传入一个响应式对象，会隐式地创建一个深层侦听器——该回调函数在所有嵌套的变更时都会被触发：

```js
const obj = reactive({ count: 0 })

watch(obj, (newValue, oldValue) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
})

obj.count++
```

> 一个返回响应式对象的 getter 函数，只有在返回不同的对象时，才会触发回调

```vue
<script setup>
import { reactive,watch } from 'vue';
const obj = reactive({ count: 0,a:{cout:2,b:3} })

watch(()=>obj.a, (newValue, oldValue) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
  console.log(newValue)
})

const handleClick= () => {
  obj.a = {cout:4,b:5}
}

</script>

<template>


  <button @click="handleClick">改变</button>
</template>

```

>你也可以给上面这个例子显式地加上 deep 选项，强制转成深层侦听器：

```js
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // 注意：`newValue` 此处和 `oldValue` 是相等的
    // *除非* state.someObject 被整个替换了
  },
  { deep: true }//+
)
```

### 即时回调的侦听器

watch 默认是懒执行的：仅当数据源变化时，才会执行回调。但在某些场景中，我们希望在创建侦听器时，立即执行一遍回调。

```js
watch(
  source,
  (newValue, oldValue) => {
    // 立即执行，且当 `source` 改变时再次执行
  },
  { immediate: true }
)
```

### 一次性侦听器 
每当被侦听源发生变化时，侦听器的回调就会执行。如果希望回调只在源变化时触发一次，请使用 once: true 选项。
```js
watch(
  source,
  (newValue, oldValue) => {
    // 当 `source` 变化时，仅触发一次
  },
  { once: true }
)
```

### watchEffect()

>侦听器的回调使用与源完全相同的响应式状态是很常见的。例如下面的代码，在每当 todoId 的引用发生变化时使用侦听器来加载一个远程资源：