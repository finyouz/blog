# 国际化

>在开发中，我们发现多数后台系统支持国际化，那如何支持呢，这里借助插件来完成

## 安装插件

国际化是指项目能够根据不同国家的语言进行转换，便于不同国家的用户使用。Vue I18 是 Vue.js 的国际化插件，它可以轻松地将一些本地化功能集成到应用程序中。

```bash
npm install vue-i18n@9
```

> 这里我使用的vue3,所以安装的v9版本，v8 和 v9。v8 版本适用于 Vue2 框架。

## 准备语言包

### 中文

```js
// src/language/zh.ts
export default{
    header:{
        title:'后台管理系统'
    }
}
```

### 英文

```js
export default {
    header:{
        title:'ManagementSystem'
    }
}
```

## 引入插件

```js
// src/mian.ts
import { createI18n } from 'vue-i18n';
import en from '@/langurage/en'
import zh from '@/langurage/zh';
const messages = {
    en,
    zh
}
const i18n = createI18n({
    legacy:false,
    messages,
    locale:JSON.parse(localStorage.getItem('headerStore') as any).local
})
app.use(i18n)
```

## 使用

```html
 <div>{{ $t("header.title") }}</div>
```

## 切换语言

```html
<button @click="changeLocale('zh')">切换为中文</button>
<button @click="changeLocale('en')">切换为中文</button>
```

```js
import { useI18n } from "vue-i18n";
 
const { locale } = useI18n();
 
// 切换语言
const changeLocale = (lang) => {
  locale.value = lang;
}

```
