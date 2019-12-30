用法：
data(){
  return{
      message: 1,
      wObj1:{
          name: 'aa',
          age: 3
        },
        wObj2:{
          name: 'bb',
          age: 2
        }
  }  
},
watch:{
    // 如果 `message` 发生改变，这个函数就会运行
    message(newVal,oldVal){
      console.log('发生了改变 '+oldVal+'变为 '+newVal)
    },
    wObj1(newVal,oldVal){
      console.log('wObj1 改变了')
    },
    // 对象内部的监听：第一种方法：直接监听对应属性
    'wObj2.age'(){
        console.log('wObj2.age 改变了')
    },
    // 对象内部的监听：第二种方法：深度监听
    wObj2:{
      handler(newVal,oldVal){
        console.log('wObj2 改变了 '+JSON.stringify(oldVal) +'变为'+ JSON.stringify(newVal))
      },
      deep: true,   //开启深度监听
      immediate: true   //立即以表达式当前的值触发回调，一进入页面就触发wObj2的监听事件，此时的oldVal为undefined
    },
},
methods:{
    change(){
      this.message = this.message +1  //一直加1，一直改变，会一直触发watch
      // this.message = 20   //赋值为20的时候会触发一次watch，往后一直都为20，不会再触发watch

      // 对象整个被改变，watch能监听到
      this.wObj1 = 30

      // 对象内部的改变，watch无法监听到
      this.wObj2.age = 20
      
    }
}

<p @click="change">{{ message }}</p>

对象数据类型的监听分为两种
一种是直接监听变化的属性，另一种是开启深度监听deep

immediate的作用：当值第一次进行绑定的时候并不会触发watch监听，使用immediate则可以在最初绑定的时候执行。