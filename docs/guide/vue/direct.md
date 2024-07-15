# 全局自定义指令封装

## 自定义指令是什么？
在vue中我们遇到过v-model、v-show、v-if等等内置的指令，当然我们也可以封装指令

## 全局注册

> 1.在src新建directives/index.js文件

```ts
import type {App} from 'vue'

import { setCopyDirective } from './model/copy'


export function setupGlobDirectives(app:App){
    setCopyDirective(app)
}
```

> 2.main.js引用
```ts
import { setupGlobDirectives } from './directives';
const app = createApp(App)

setupGlobDirectives(app)
```

>3.创建指令

```ts
import type {App,Directive,DirectiveBinding} from 'vue'

function isCopy(el:Element,binding:any){    
    el.addEventListener('click',()=>{
          /* 复制内容到文本域 */
        navigator.clipboard.writeText(el.innerHTML);
    })
    
}



const mounted = (el:Element,binding:DirectiveBinding)=>{
    isCopy(el,binding)
}


const copyDirective:Directive = {
    mounted
}


export function setCopyDirective(app:App){
    app.directive('copy',copyDirective)
}

export default copyDirective;
```