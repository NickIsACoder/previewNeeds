理解：
    dom的更新是异步的，无法通过同步代码来获取，需要放在 nextTick()中。
    nextTick()是指将回调函数延迟在下一次dom更新数据后调用。当数据变动，dom渲染完成后，回调函数自动执行

应用场景：
    1、在Vue的生命周期，created()钩子函数中进行的dom操作都要放在Vue.nextTick()回调函数中，因为在此阶段
        dom还未进行任何渲染。mounted()钩子函数执行时，所有dom挂载和渲染都已完成
    2、dom元素的数据改变后，需要基于新的dom结构进行的操作，都需要放在nextTick()的回调函数中

原理：
    vue为了保证性能，会把dom修改添加到异步任务，所有同步代码执行完后再统一修改dom，一次事件循环中的多次数据修改只会触发一次nextTick，所以nextTick会在下次dom更新循环结束之后执行延迟回调

源码分析：
    源码中首先定义了以下内容
    1、callbacks=[]。用来存储所有需要执行的回调函数。
    2、pending。判断本轮事件是否执行过timerFunc(nextTickHandler, 0)这个函数
    3、timerFunc。用来触发执行回调函数，触发后会执行nextTickHandler()函数
    nextTickHandler()函数，用来执行callbacks存储的所有回调函数
    
    然后通过三个判断来触发执行nextTickHandler()函数，最后代码返回一个函数（此函数就是调用nextTick时传入的回调函数）
    关键点为回调函数及回调函数的触发方式；
    timerFunc的触发方式（检测运行环境的支持情况来进行如下判断）：
        1、先判断是否支持原生promise，如果支持，则使用promise来触发执行回调函数
        2、是否支持MutationObserver，如果支持则实例化一个观察者对象，检测的dom节点发生变化后触发回调函数
        3、以上两个都不支持，则使用setTimeout设置延时为0
    （MutationObserver是html5新增的用来监听DOM变动的api，能监听一个dom对象的子节点删除、属性修改、文本内容修改等操作）
    
    
    涉及任务循环机制的任务队列，nextTick()属于microtask（微任务）