# vite + vue3使用mock假数据

## 什么是mock

>Mock.js 是一款模拟数据生成器，旨在帮助前端工程师`独立于后端进行开发`，帮助编写单元测试。

## 基础使用

### 安装
```bash
npm i vite-plugin-mock
```

### 配置

- vite.config.js

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import {viteMockServe} from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    viteMockServe({
			mockPath: "src/http/mock",
			enable: true,
		})
  ],
})

```
[viteMockServe更多配置可以点击此处](https://github.com/vbenjs/vite-plugin-mock/blob/main/README.zh_CN.md)

- 模拟假数据，根据配置的路径

```js
//src/http/mock/index.js

export default [
	{
		url: "/api/login", // 模拟登录的链接
		method: "post", // 请求方式
		timeout: 500, // 超时时间
		statusCode: 200, // 返回的http状态码
		response: { // 返回的结果集
			code: 200,
			message: "登录成功",
			data: {
				name: "admin"
			},
		},
	},
]

```


- MockMethod

```ts
{
  // 请求地址
  url: string;
  // 请求方式
  method?: MethodType;
  // 设置超时时间
  timeout?: number;
  // 状态吗
  statusCode?:number;
  // 响应数据（JSON）
  response?: ((opt: { [key: string]: string; body: Record<string,any>; query:  Record<string,any>, headers: Record<string, any>; }) => any) | any;
  // 响应（非JSON）
  rawResponse?: (req: IncomingMessage, res: ServerResponse) => void;
}
```

### 请求数据

```js
const handleLogin = async()=>{
  let result = await axios.post('/api/login')
  console.log(result);
}
```

### 效果展示

![](.\\images\\image.png)