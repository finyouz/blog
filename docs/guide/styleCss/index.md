# tailwindcss

## 快速上手

[tailwindcss网站](https://www.tailwindcss.cn/)

> 1.创建你的项目

如果您还没有设置Vite项目，请先创建一个新的Vite项目

```bash
npm create vite@latest my-project -- --template vue

cd my-project
```

> 2.安装 tailwindcss

安装tailwindcss及其对等依赖项，然后生成tailwind.js.js和postcss.js.js文件。

```bash
npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p
```

> 3.配置模板路径

在tailwind.js.js文件中添加所有模板文件的路径


```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

> 4.将Tailwind指令添加到CSS中

将Tailwind的每个层的@tailwind指令添加到。/ src/style.css文件

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

> 5.运行项目

```bash
npm run dev
```

>6.使用

```html
<template>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</template>
```

> 7.安装官方推荐插件实现智能提示 Tailwind CSS IntelliSens

然后开始添加class类，就会有智能提示了，如果没有的话，前面添加一个空格，就会出现提示类