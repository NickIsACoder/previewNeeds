1、不能用箭头函数来定义`method`函数，因为`this`不会指向vue实例，`this.xxx` 将是 `undefined`

npm安装的文件存放在`node_module`中,在`package.json`中的`dependencies`中可以查看，使用`import Stomp from '@stomp/stompjs';`来引用


### import与require的区别：
  使用import引入的文件必须时暴露出来的，即有export
  
写法区别：
`const {count} = require('./counter')`
    
`import fs from 'fs'`
`import {default as fs} from 'fs'`
`import * as fs from 'fs'`
`import {readFile} from 'fs'`
`import {readFile as read} from 'fs'`
`import fs, {readFile} from 'fs'`


### Vue.use()
Vue.use(plugin, arguments)就是执行一个plugin函数，或执行plugin的install方法进行插件注册(如果plugin是一个函数，则执行；若是一个插件，则执行plugin的install方法...)；并向plugin或其install方法传入Vue对象作为第一个参数；如果有多个参数，use的其它参数作为plugin或install的其它参数。


挂载到原型上
Vue.prototype


Vue.config

