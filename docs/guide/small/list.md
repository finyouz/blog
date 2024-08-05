# 使用vue如何渲染大量数据（长列表）

## 思路

- 描述大数据带来的问题

- 分不同情况做不同处理

- 总结一下


## 回答

1.在大型企业级项目中经常需要渲染大量数据，此时很容易出现卡顿的情况。比如大数据表格、树。

2.处理时要根据情况做不同处理
- 避免大数据量：可以采用分页的方式获取
- 避免渲染大量数据：vue-virtual-scroller等虚拟滚动方案，只渲染视口范围内的数据
- 避免更新：可以使用`v-once`方式只渲染一个
- 优化更新：通过v-memo缓存子树，有条件更新，提高复用，避免不必要更新
- 按需加载数据：可以采用`懒加载`方式，在用户需要的时候再加载数据，比如`tree`组件子树的懒加载

## 长列表和虚拟列表的概念

>一些数据量较大且无法使用分页方式来加载的列表，我们一般把这种列表叫做长列表。 

>虚拟列表：长列表的一种优化方案(dom树不发生改变)


## 实现

```vue
<template>
  <div class="view" ref="viewRef" @scroll="onScroll">
    <div class="scroll" ref="scrollRef"></div>
    <div class="item">
      <div v-for="item in showList" :key="item"  :style="{height:`${rowHeight}px`,transform:`translateY(${offset}px)`}">
      {{ item }}
    </div>
    </div>
   
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'


const start = ref(0) //截取起始下标
const end = ref(20)  //截取结束下标
const rowHeight = ref(20)  //每个列表的高度
const remain = ref(20) //显示列表数
const scrollHeight = ref(0) 

const list = ref([])
const offset = ref(0)

const scrollRef= ref(null)
const viewRef= ref(null)
onMounted(() => {

  //模拟大量数据
  list.value = new Array(10000).fill(null).map((value, index) => index + 1)
  //可滚动的区域 数据的长度 * 每列的高度
  scrollRef.value.style.height = `${(rowHeight.value * list.value.length)}px`
})


const showList = computed(()=>{
  return list.value.slice(start.value,end.value)
})

const onScroll = ()=>{
  // 可以获取或设置元素内容从其顶部边缘滚动的像素数
  let scroll = viewRef.value.scrollTop
  //四舍五入，保证是正数   
  start.value = Math.round((scroll / rowHeight.value))
  end.value = start.value + remain.value
  //
  offset.value = scroll
}
</script>

<style>
.view{
  position: relative;
  width: 100vw;
  /**可见区域 400px */
  height: 400px;
  overflow-y: auto;
  background-color: aqua;
}

.scroll{
  
}

.item{
  position: absolute;
  text-align: center;
  width: 100%;
  left: 0;
  top: 0;
  div{
    height: 20px;
  }
}

</style>

```

## 性能对比

### 直接渲染

![](.\\images\\image2.png)

### 虚拟列表

![](.\\images\\image.png)