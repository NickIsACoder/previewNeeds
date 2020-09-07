// 对象的类型--接口
// 1、nick的形状必须和Person的一致，属性不能多或者少
interface Person {
    name: string;
    age: number;
}
let nick:Person = {
    name: 'Nick',
    age: 27
}
// 2、可选属性：赋值的时候，可选属性可以不存在
interface Person1 {
    name: string;
    age?: number;  // ?表示为可选属性，
}
let nick1:Person1 = {
    name: 'Nick'
}
// 3、任意属性  [propName:string] 定义了任意属性取string类型的值,string代表索引签名，必须为'string'或'number'
// [propName: string]:string; propname的索引为string，值的类型也为string
interface Person2 {
    name: string;
    // age?: number;   // 报错 
    // 一旦定义了任意属性，那么确定属性和可选属性都必须是它的类型的子集（即任意属性的类型为string，age和name的类型也必须时string）  
    // 解决方法：[propName: string]:string|number
    [propName: string]:string;  // 一个接口中只能定义一个任意属性
}
let nick2:Person2 = {
    name: 'Nick',
    anyprop: '27',
}

// 4、只读属性：只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
interface Person3 {
    readonly id: number;
    name: string;
}
let nick3:Person3 = {
    id: 324,
    name: 'nick'
}
// nick3.id = 22  // 报错