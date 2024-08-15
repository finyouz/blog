>前后端数据交互的安全性怎么保证

前端去请求接口的时候，需要携带唯一的标识（token验证）

![](.\\image\image1.png)
- token怎么根据接口一起携带过去

```js

let reqInstance = axios.create({
    headers:{
        Authorization:`Bearer ${localStorage.getItem('token')}`
    }
})
```

- axios为什么要二次封装，你做过哪些封装
```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(config.url !== '/login'){
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if(response.data.code==200){
         return response.data.data;
    }else{
        //具体需求 
    }
   
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });

```

- token无感刷新
![](.\\image\image.png)
1.token获取

```js
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if(response.data.code==200){

        response.data.data.token && localStorge.setItem('token', response.data.data.token)

        response.data.data. && localStorge.setItem('token', response.data.data.refresh_token)
         return response.data.data;
    }else if(response.data.code==401){

        getRefresh()
        //具体需求 refresh_token
    }
   
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

2.请求刷新token

```js
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(config.url !== '/login'){
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    }

    if(config.url == '/refresh'){
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('refresh_token')}`
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
```

3.短token更新


```js
// 添加响应拦截器
axios.interceptors.response.use(asycn function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if(response.data.code==200){

        response.data.data.token && localStorge.setItem('token', response.data.data.token)

        response.data.data. && localStorge.setItem('token', response.data.data.refresh_token)
         return response.data.data;
    }else if(response.data.code==401){

      let result = awatt  getRefresh()
        //具体需求 refresh_token
        if(result){
            response.config.headers.Authorization =  `Bearer ${localStorage.getItem('token')}`

            const re = await server.request(response.config)

            return re
        }

    }
   
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```