> 主要用于保留组件状态或避免重新渲染

```html
<div class="tabbar">
  <p class="tab1" @click="switchTab('child1')">tab1</p>
  <p class="tab2" @click="switchTab('child2')">tab2</p>
  <p class="tab3" @click="switchTab('child3')">tab2</p>
</div>
<keep-alive include="child3" exclude="child1,child2" :max="10">
  <component v-bind:is="which_to_show"></component>
</keep-alive>
```

## props
_include="child3"_              表示name为`child3`的组件才会被缓存  
_exclude="child1,child2"_       表示name为`child1或者child2`的组件不会被缓存  
_max_                           表示最多可以缓存多少组件  
_name_                          为组件中的name属性

## keep-alive生命周期函数
* 当组件在 <keep-alive> 内被切换切设置了缓存时，进入组件时`activated`触发，切换到其他组件时`deactivated`触发
* 没有设置缓存时不会触发这两个钩子函数

在具体每个组件中定义钩子函数
```javascript
activated(){
    console.log('keepalive加载了')
},
deactivated(){
    console.log('deactivated加载了')
},
```

> 设置了缓存的<keep-alive>内嵌组件，只会在第一次进入时执行`created-> mounted`,后续只会执行`activated和deactivated`钩子
> 钩子的触发顺序`created-> mounted-> activated`