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


### Vue.use()与Vue.prototype
Vue.use(plugin, arguments)：就是执行一个plugin函数，或执行plugin的install方法进行插件注册(如果plugin是一个函数，则执行；若是一个插件，则执行plugin的install方法...)；并向plugin或其install方法传入Vue对象作为第一个参数；如果有多个参数，use的其它参数作为plugin或install的其它参数。

挂载到原型上
Vue.prototype：为Vue对象添加了一个原型属性，而不是一个全局变量。但是如果这个原型属性的值是引用类型的，我们就可以借此实现全局变量
`Vue.prototype.$http = axios` 使用时 `this.$http`

* 不是为了vue写的插件不支持Vue.use()加载方式
* 非vue官方库不支持new Vue()方式
* 每一个vue组件都是vue的实例，所以组件内的this可以拿到Vue.prototype上添加的属性和方法

如果有需要`install`的就要使用`Vue.use()`如一些自定义的UI组件和asiox


Vue.config

`Props,methods,data和computed`的初始化都是在`beforeCreated和created`之间完成的


Vue name的作用
* 当项目使用keep-alive时，可搭配组件name进行缓存过滤 （include、exclude）
* DOM做递归组件时（递归组件是指组件自身调用自身）
* vue-devtools调试工具里显示的组件名称是由vue中组件name决定的