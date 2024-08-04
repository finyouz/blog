# 生成图片验证码

## 下载第三库

```bash
npm i svg-captcha
```

## 使用

```js
const svgCaptcha = require('svg-captcha');
const imageCode = ()=>{
    return svgCaptcha.create()
}

```

## 返回的数据

```json
{
    "code": 200,
    "data": {
        "text": "xpw6",
        "data": "<svg>....</svg>" 
    },
    "message": "图片验证码生成"
}
```

## 在前端使用

```html
<div ref=svgref></div>
```

```js
svgRef.value.innerHTML = result.data.data   
```

## 成品展示

![](.\\images\\image.png)