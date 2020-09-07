// 函数重载
function reverse(x: number): number
function reverse(x: string): string
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return x.toString().split('').reverse().join('')
    } else {
        return x.split('').reverse().join('')
    }
}

console.log(reverse(123))

type Combinable = string | number
function getName(x: Combinable, y: Combinable) {
    if (typeof x === 'string' || typeof y === 'string') {
        return x.toString() + y.toString()
    }
    return x + y
}
let theName = getName('leo', 'messi')
// console.log(theName)  // 不报错
// console.log(theName.split('')) // 类型“number”上不存在属性“split”
// 解决方法: 函数重载
function getName1(x: number, y: number): number;
function getName1(x: string, y: string): string;
function getName1(x: string, y: number): string;
function getName1(x: number, y: string): string;
function getName1(x: Combinable, y: Combinable) {
    if (typeof x === 'string' || typeof y === 'string') {
        console.log('aaa')
        return x.toString() + y.toString()
    }
    return x + y
}
let theName1 = getName1('leo', 'messi')
console.log(theName1)  // 不报错
console.log(theName1.split(''))

// 类型断言
interface cat{
    name: string
    run(): void
}
interface dog{
    name: string
    jump(): void
}
function isCat(animal: cat|dog){
    // if(typeof animal.run === 'function'){  // 报错，类型“dog”上不存在属性“run”
    if(typeof (animal as cat).run === 'function'){ 
        return true
    }
    return false
    // (animal as cat).run()
}
const tom:cat = {
    name: 'Tom',
    run(){
        console.log('I m '+this.name)
    }
}
const wang:dog = {
    name: 'wang',
    jump(){
        console.log('旺旺')
    }
}
function runFunc(animal: cat|dog){
    (animal as cat).run()
}
console.log(isCat(tom))
console.log(isCat(wang))
console.log(runFunc(tom))
console.log(runFunc(wang));

// window.foo = 1  //类型“Window & typeof globalThis”上不存在属性“foo”
(window as any).foo = 1

interface aaa{
    name: string
    run(): void
}
function getCacheData(key:string):any{
    return (window as any).cache[key]
}
const dick = getCacheData('tom') as aaa