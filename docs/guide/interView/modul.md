# 引言
在前端开发中，我们都用到过import module from "module "或者const module = require( "module "),但是笔试的时候问我这俩种有什么区别？我：。。。。。

---

# import 
## import 属于ES6规范
import是在编译过程中加载,也就是说是在代码执行前执行,比如说,import后面的路径写错了,在运行代码前就会抛错,所以在编写代码时,必须放在模块顶部
## 导入和暴露模块的方式
```js
import module from "module " 
import {a,b} from "module " 

export default module 
export {a,b}
```
## 文件类型
import只能导入ES6模块或者使用Babel等工具转化为ES6模块的代码

---
#  require
## require 属于CommonJS规范
require是运行时调用,所以是动态执行的,所以require理论上可以运用在代码的任何地方
## 导入模块和暴露的方式
```js
const module = require("module") //exports = modele  module.exports = module 

module.export = {a,b,c}
exports = "hhhh"  //失败 exports.name = 'hhhh'的属性被 module.exports覆盖了,所以失效了.
```
## 文件类型
require导入CommonJS模块、AMD模块、UMD模块以及Node.js内置模块等多种类型的模块。

---
# 总结
- import 是 ES6 中用于导入模块的语句，而 require() 则是 Node.js 中用于导入模块的函数。
- 使用 import 语句导入模块时，模块会被静态加载，也就是在编译时就已经确定了导入的模块;
-  require() 动态加载模块的方式。它们都允许在代码运行时根据需要加载模块，而不是在编译时就将所有模块都加载进来。
- 在整个应用程序中，使用 import语句导入的模块是单例模式，也就是共用同一个模块实例，而使用 require() 导入的模块则会因为复制而产生多个实例。
- import 语句支持模块的默认导出和命名导出，而 require() 只支持模块的默认导出 (module.exports) 导出

