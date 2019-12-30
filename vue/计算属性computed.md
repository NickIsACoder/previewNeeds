用法:
`data(){
    return{
        firstname: 'leo',
        lastname: 'messi',
    }
},
computed:{
    fullname:{
        get(){
            return this.firstname + '_' + this.lastname;
        },
        set(val){
            const add = val.split('')
            this.firstname = add + this.firstname
            this.lastname  = add + this.lastname
        }
    }
},
methods:{
    fullname(){
        return this.firstname + '_' + this.lastname;
    }
}`

触发get 方法
<div>{{fullname}}</div>
触发set 方法
this.fullname = 'the king'

【计算属性与方法】
使用fullname 方法与使用计算属性fullname 取得的结果一样
<div>{{ fullname() }}</div>

两者的区别：
    fullname()：每使用一次都会重新调用fullname()一次
    fullname：只在第一次调用的时候会计算求值，往后的调用会直接返回结果。直到fullname的值发生改变时才会再重新计算
    计算属性是基于他们的响应式依赖进行缓存的，所以只有当它的相关依赖发送改变时（fullname的值发生改变）才会重新计算求值