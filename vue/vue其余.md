1、不能用箭头函数来定义`method`函数，因为`this`不会指向vue实例，`this.xxx` 将是 `undefined`

npm安装的文件存放在`node_module`中,在`package.json`中的`dependencies`中可以查看，使用`import Stomp from '@stomp/stompjs';`来引用


import与require的区别：
  使用import引入的文件必须时暴露出来的，即有export
  
写法区别：
`const {count} = require('./counter')`
    
`import fs from 'fs'`
`import {default as fs} from 'fs'`
`import * as fs from 'fs'`
`import {readFile} from 'fs'`
`import {readFile as read} from 'fs'`
`import fs, {readFile} from 'fs'`


Vue.use()


挂载到原型上
Vue.prototype


Vue.config

