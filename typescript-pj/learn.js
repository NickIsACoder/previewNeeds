function sayHello(person) {
    return 'Hello ' + person;
}
var user = 'Tom';
// let user = [1,1]
console.log(sayHello(user));
// powershell 无法执行，需用cmd
//////// 原始数据类型：boolean、null、undefined、string、number、symbol(es6引入)
///// 布尔值
var isDone = false; // false
// let createByNewBoolean1:boolean = new Boolean(1)   // 报错
var createByNewBoolean2 = new Boolean(1); // true
var createByNewBoolean3 = Boolean(1); // true
///// 空值（void）：javascript没有空值(void)的概念,在ts中可以用void来表示没有任何返回值的函数
function alertName() {
    alert('name is Tom');
}
///// null和undefined：与void的区别是，undefined和null是所有类型的子类型。也就是说undefined类型的变量可以赋值给number类型的变量
var u = undefined;
var n = null;
// 与void的区别
var u1;
var n1;
var num1 = u1; // 不会报错 
var str2 = n1;
// 反之，void类型的变量不能赋值给number类型的变量
var v;
// let num2:number = v  //报错
///// 任意值类型：变量在声明时未指定其类型，那么它会被识别为任意值类型
var anyType;
anyType = 10;
anyType = 'aaa';
///// 类型推论
var theVar = 'string'; // 实际上等价于： let theVar:string = 'string' 
// theVar = 10  //报错
// 如果定义的时候没有赋值，不管之后有没赋值，都会被推断为any类型而完全不被类型检查
///// 联合类型
var uniteType;
uniteType = 'seven';
uniteType = 7;
// uniteType = false  // 报错
// 当ts不确定一个联合类型的变量到底是哪个类型时，只能访问此联合类型变量里面所有类型里共有的属性或方法
function aaa(type) {
    // return type.length  //报错，length属性只有string有
    return type.toString();
}
// function disp(name:string|string[]) { 
//     if(typeof name == "string") { 
//             console.log(name) 
//     } else { 
//         var i; 
//         for(i = 0;i<name.length;i++) { 
//         console.log(name[i])
//         } 
//     } 
// } 
// 枚举类型
var Direction;
(function (Direction) {
    Direction[Direction["NORTH"] = 0] = "NORTH";
    Direction["SOUTH"] = "s";
    Direction["EAST"] = "e";
    Direction[Direction["WEST"] = 2] = "WEST";
})(Direction || (Direction = {}));
var dir = Direction.NORTH;
console.log(dir);
console.log(Direction.SOUTH, Direction.EAST, Direction.WEST);
