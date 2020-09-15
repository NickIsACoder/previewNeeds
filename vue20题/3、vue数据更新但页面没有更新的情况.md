#### vue数据更新但页面没有更新的7种情况
1. vue无法检测实例创建时不存在data中的property  
由于vue会在初始化创建实例时对property执行`getter/setter`转化，所以property必须在`data`对象上存在才能让vue将它转换为响应式

2. vue无法检测对象property的添加或移除
由于es5的限制，vue.js不能检测到对象属性的添加或删除。因为vue.js在初始化实例时将属性转为`getter/setter`,所以属性必须在data对象上才能让vue.js转换它，才能让它是响应式的
```js
var vm = new Vue({
  data:{
    obj: {
      id: 001
    }
  },
  // 页面不会变化
  template: '<div>{{ obj.message }}</div>'
})

vm.obj.message = 'hello' // 不是响应式的
delete vm.obj.id       // 不是响应式的

// 解决方法
// 动态添加
Vue.set(vm.obj, propertyname, newValue) 
vm.$set(vm.obj, propertyname, newValue)
this.obj = Object.assign({}, this.obj, {a:1, b:2})

// 动态移除
Vue.delete(vm.obj, propertyName)
vm.$delete(vm.obj, propertyName)
```

3. vue不能检测通过数组索引直接修改一个数据项
由于JavaScript的限制，vue不能检测数组和对象的变化
```js
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的

// 解决方法
Vue.set(vm.items, indexOfItem, newVal)
vm.$set(vm.items, indexOfOtem, newVal)
vm.items.splice(indexOfItem, 1, newVal)
```

4. vue不能检测直接修改数组长度的变化
由于JavaScript的限制，vue不能检测数组和对象的变化
```js
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items.length = 2 // 不是响应性的

// 解决方法
vm.items.splice(newLen)
```

5. 在异步更新执行前操作dom数据不会变化
```js
// 解决方法
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
  vm.$el.style.color = 'red' // 文字颜色变成红色
})
```

6. 循环嵌套太深，视图不更新
```js
// 强制刷新
this.$forceUpdate()
```

7. 路由参数变化时，页面不更新（数据不更新）
```js
const router = new VueRouter({
  mode:'history',
    routes: [
    {path: '/home', component: Home },
    {path: '/home/:name', component: Home }
  ]
})
// 上述代码中，我们在路由构建选项 routes 中配置了一个动态路由 '/home/:name'，它们共用一个路由组件 Home，这代表他们复用 RouterView 。
// 当进行路由切换时，页面只会渲染第一次路由匹配到的参数，之后再进行路由切换时，message 是没有变化的。

// 解决方法
1、通过watch监听$route的变化
watch: {
 '$route': function() {
		this.message = this.$route.params.name
	}
}
2、<router-view> 绑定 key 属性，这样 Vue 就会认为这是不同的 <router-view>
<router-view :key="key"></router-view>
```