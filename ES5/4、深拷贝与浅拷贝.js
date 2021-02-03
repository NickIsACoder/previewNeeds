//  浅拷贝：将原对象或原数组的引用直接赋值给新对象、新数组，新对象、新数组只是对原对象的一个引用，修改新对象时，原对象也会受到影响
// <br>
// 深拷贝：创建新的对象或数组，把原对象各项属性的值或者数组的每一项都拷贝过来。

// 为何要使用深拷贝：我们希望在改变新对象（数组）的时候，不改变原对象（数组）
// 注意事项：要拷贝第一层的对象属性还是递归拷贝所有层级的属性 


// 浅拷贝
// 实现1  直接的引用复制
var x = {
  a: 1,
  b: {
    f: {
      g: 1
    }
  },
  c: [1, 2, 3]
};
var y = x;
console.log(y.b.f === x.b.f); //true
x.b.f = 'ff';
console.log(y.b.f); //ff

// 实现2 
let obj1 = {
  a: 0,
  b: {
    c: 0
  }
};
let obj2 = Object.assign({}, obj1);
console.log(obj2); // { a: 0, b: { c: 0}} 
// Object.assign拷贝的是属性值,改变a时,改的是属性的值
obj1.a = 1;
console.log(obj1); // { a: 1, b: { c: 0}} 
console.log(obj2); // { a: 0, b: { c: 0}} 
// b为一个对象的引用,改变b里面的c时,改变的是引用,所以obj2也跟着改变了
obj1.b.c = 10;
console.log(obj1); // { a: 1, b: { c: 10}} 
console.log(obj2); // { a: 0, b: { c: 10}} 
// Object.assign第一级属于深拷贝，第二级开始属于浅拷贝


// 实现3(使用拓展运算符...)


// 深拷贝
// 使用slice和concat的伪深拷贝
// slice() 方法可从已有的数组中返回选定的元素。
var arr = [1, 2, 3, 4];
var arr2 = arr.slice();
var arr3 = arr.concat();
console.log(arr2) //[1,2,3,4]
console.log(arr3) //[1,2,3,4]
arr[0] = 10
console.log(arr) //[10,2,3,4]
console.log(arr2) //[1,2,3,4]
console.log(arr3) //[1,2,3,4]

// 数组中的对象元素(Object,Array等)只是复制了引用

var farr = [1, 2, [2, 3], 4];
var farr2 = farr.slice();
var farr3 = farr.concat();
console.log(arr2) //[1,2,[2,3],4]
console.log(arr3) //[1,2,[2,3],4]
farr[2][0] = 20;
console.log(farr) //[1,2,[20,3],4]
console.log(farr2) //[1,2,[20,3],4]
console.log(farr3) //[1,2,[20,3],4]

// 使用JSON对象的parse和stringify (不能拷贝函数，undefined，symbol、)
var source = {
  name: "source",
  child: {
    name: "child"
  }
};
var target = JSON.parse(JSON.stringify(source))
console.log(source === target)
source.name = 'nick';
console.log(source.name, target.name) //nick source
source.child.name = '99999';
console.log(source) //{ name:"nick", child:{ name:"99999" } }
console.log(target) //{ name:"source", child:{ name:"child" } }

// 没有嵌套的对象，那么我们也可以使用扩展符来实现深拷贝。
var obj = {
  a: 1,
  b: 2,
  c: 3
};
var objClone = {...obj}
console.log(objClone)


// 嵌套的对象
const makeDeepClone = (obj) => {
  let newObject = {};
  Object.keys(obj).map(key => {
    if(typeof obj[key] === 'object'){
      newObject[key] = makeDeepClone(obj[key]);
    } else {
      newObject[key] = obj[key];
    }
  });
 return newObject;
}

console.log(makeDeepClone(source))