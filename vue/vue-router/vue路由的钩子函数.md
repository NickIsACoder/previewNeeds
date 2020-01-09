### 全局守卫
> router.beforeEach()  `（全局前置守卫）` 进入之前触发
> router.beforeResolve()  `(全局解析守卫)` 同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用
> router.afterEach()   `（全局后置钩子）` 进入之后触发

### 路由独享的守卫
```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

### 组件内的守卫
```js
beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next( vm => {
    // 通过 `vm` 访问组件实例
  })
},
beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
},
beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
}
```

### 总结
* 所有路由跳转都会触发全局守卫
* 所有钩子函数中除了`afterEach`,其他的都需要执行`next()`

#### 执行顺序
（三个组件内的守卫和路由独享的守卫都在login组件中定义，）
* 未进入login组件时：`beforeEach -> beforeResolve -> afterEach`
* 当进入login组件时：`beforeEach -> beforeEnter -> beforeRouteEnter -> beforeResolve -> afterEach`
* 当login组件被复用时：`beforeEach -> beforeEnter -> beforeRouteUpdate -> beforeResolve -> afterEach`
* 当离开login时：`beforeEach -> beforeResolve -> afterEach -> beforeRouteLeave`
* 当路由的钩子函数 __执行完之后__ 才会执行vue中的钩子函数
