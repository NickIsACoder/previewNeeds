用法：
`<div>
  <p @click="change">{{obj.name}}</p>
  <span v-if="obj.add">{{obj.add}}</span>
</div>
<div v-if="obj2">
      <p @click="change">{{obj2.name}}</p>
      <span v-if="obj.add">{{obj2.add}}</span>
    </div>
`
`<script>
  obj: {
    id: 1,
    name: "速度"
  },
  obj2: null
  
   change() {
       // obj实例在增加add属性之前就已经被创建，所以新增属性的时候不会触发更新
      //   this.obj.add = true
        //需要使用set方法来触发视图更新
          this.$set(this.obj,'add',true)
          
          
          this.obj2 = {
              id:2,
              name: '阿斯顿'
          }
      }
</script>
`

问题点：如果在实例创建之后添加新的属性到实例上，它不会触发视图更新
原因：当把一个普通的JavaScript对象传入vue实例作为 data 选项时，vue将遍历此对象所有的属性，并使用 `obj.defineProperty` 把这些属性全部转为`getter/setter`。经过vue的转化后，它才具备响应式。但是vue无法检测到对象属性的新增或删除，所以无法触发视图更新


