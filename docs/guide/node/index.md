# 后端token验证

## 1.安装jsonwebtoken

```bash
npm i jsonwebtoken
```

## 2.封装生成token的函数，和检查token是否过期的函数

```js
const jsonwebtoken = require('jsonwebtoken')

const secretKey = 'finyou'
const JWT = {
    sign(data,expiresIn){
        return jsonwebtoken.sign(data,secretKey,{expiresIn})
    },
    verify(token){
        try {
            return jsonwebtoken.verify(token,secretKey)
             
            
        } catch (error) {
            return false
        }
        
    }
}


module.exports = JWT
```

## 3.借助中间件，进行拦截

```js
//对请求进行拦截，是否存在token
app.use(async(req,res,next)=>{
  let {url} = req
  //routes(数组) 是对不需要token的接口
  if(routes.includes(url)){
    //不需要携带token
    next()
  }else{
    //需要携带token的
    let {authorization} = req.headers

    let token = authorization.split(' ')[1]
    //有token
    if(token){
       //判断token是否失效
       let paylond = JWT.verify(token)
       if(!paylond){
        //失效了
        res.send({
          code:401,
          message:'token过期了'
        })
       }else{
        //没有失效,防止在操作中失效,随时更新
        console.log(paylond.id);
        const newToken = JWT.sign({
          id:paylond.id,
          username:paylond.username
        },'24h')
        res.header('Authorization',newToken)
        next()
       }

    }else{
      //无token
      res.send({
        code:401,
        message:'未登录'
      })
    }
   
  }

})

```