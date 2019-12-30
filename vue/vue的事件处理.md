1、事件修饰符
    .stop 阻止冒泡
    .prevent 阻止默认事件
    .capture 使用事件捕获模式
    .self 只在当前元素本身触发
    .once 只触发一次

2、访问原始DOM事件
    <p @click="send('88',$event)">传值</p>
    <script>
        send(message,e){
            console.log(message,e)
       }
    </script>