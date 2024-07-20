# tabBar

## 原生tabBar

>这种一般在pages.json中配置

```json
{
	"tabBar": {
		"color": "#7A7E83",
		"selectedColor": "#3cc51f",
		"borderStyle": "black",
		"backgroundColor": "#ffffff",
		"list": [
			{
				"pagePath": "pages/home/home",
				"iconPath": "static/tabBar/home.png",
				"selectedIconPath": "static/tabBar/homeSel.png",
				"text": "首页"
			},
			{
				"pagePath": "pages/user/user",
				"iconPath": "static/tabBar/user.png",
				"selectedIconPath": "static/tabBar/userSel.png",
				"text": "我的"
			}
		]
	},
}
```

### 缺点：
- tabBar 中的 list 是一个数组，只能配置最少2个、最多5个 tab

## 自定义tabBar(简单案例，后期更改)

### 创建一个tabBar组件

```vue
<template>
  <Home v-if="currentIndex == 0"/>
  <User v-if="currentIndex == 1"/>

  <view class="tabBar">
    <view v-for="(item,index) in tabBarList" :key="item.id" class="item" @click="handleCurrent(item,index)">
        <img :src="index==currentIndex?item.picSel:item.pic" alt="">
        <view class="font" :class="{active:index==currentIndex}">{{ item.text }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import {ref} from 'vue'
import Home from '@/pages/home/home.vue'
import User from '@/pages/user/user.vue'

const tabBarList = [{
  id:'1',
  link:'home',
  pic:'static/tabBar/home.png',
  picSel:'static/tabBar/homeSel.png',
  text:'首页'
},
{
  id:'2',
  pic:'static/tabBar/user.png',
  link:'user',
  picSel:'static/tabBar/userSel.png',
  text:'我的'
},
]
const currentIndex = ref<number>(0)

//点击事件

const handleCurrent = (item:any,index:number)=>{
  currentIndex.value = index
  uni.setStorageSync('link',item.link)
}
</script>

<style lang="scss" scoped>
.tabBar{
  width: 100%;
  height: 120rpx;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .item{
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      width: 50rpx;
      height: 50rpx;
    }
    .font{
      font-size: 26rpx;
    }

    .active{
      color: red;
    }
  }
}
</style>
```

### 自定义tabBar如何跳转
