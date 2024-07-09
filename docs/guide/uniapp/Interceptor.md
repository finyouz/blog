# 拦截器与请求的统一封装

```js
import { useMemberStore } from '@/stores'

const baseUrl = ''

//添加拦截器
const httpInterceptor = {
  //拦截前触发
  invoke(optios: UniApp.RequestOptions) {
    //1. 非http开头需拼接地址
    if (!optios.url.startsWith('http')) {
      optios.url = baseUrl + optios.url
    }
    //2.设置超时时间10s
    optios.timeout = 10000
    //3.添加小程序请求头标识
    optios.header = {
      ...optios.header,
      'source-client': 'miniapp',
    }

    //4.添加token请求头标识
    const memberStore = useMemberStore()

    const token = memberStore.profile?.token

    if (token) {
      optios.header.Authorization = token
    }
  },
}

uni.addInterceptor('request', httpInterceptor)
uni.addInterceptor('uploadFile', httpInterceptor)

interface Data<T> {
  code: string
  msg: string
  result: T
}

// 封装请求
export const http = <T>(optios: UniApp.RequestOptions) => {
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...optios,
      success(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data as Data<T>)
        } else if (res.statusCode === 401) {
          const memberStore = useMemberStore()
          memberStore.clearProfile()

          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          uni.showToast({
            icon: 'none',
            title: (res.data as Data<T>).msg || '请求错误',
          })
          reject(res)
        }
      },
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误,请跟换网络试试',
        })
        reject(err)
      },
    })
  })
}
```
