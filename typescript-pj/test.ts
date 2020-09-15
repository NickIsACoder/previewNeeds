let varnull:null
let varundedined:undefined

let varnumber:number = varnull
let varstring:string = varnull

interface animal{
  name: string;
  canRun: boolean;
}
interface fruits{
  name: string;
  canEat: boolean;
}
interface nothing{
  name: string;
}
type unKnownStuff = animal|fruits|nothing
function show(stuff: unKnownStuff) {
  if ('canRun' in stuff){
    return '此物品是动物'
  }else if ('canEat' in stuff) {
    return '此物品是水果'
  }
}

let dog:animal = {
  name: '旺财',
  canRun: true
}
let things:nothing = {
  name: '什么也不是'
}
console.log(show(dog))  // 此物品是动物
console.log(show(things))  // undefined

function padLeft(value:string, padding:string|number){
  if (typeof padding === 'number'){
    return Array(padding).join('') + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
  throw Error('Expected string or number,got'+padding)
}

console.log(padLeft('left', 10)) // left
console.log(padLeft('left', '10'))  //10left


class men{
  name:string;
  smoke(){}
}
class women{
  name:string;
  makeup(){}
}
let person: men | women;
person = Math.random() < 0.5 ? new men() : new women();

if(person instanceof men) {
  console.log(person.name);
}
if(person instanceof women) {
  console.log(person.name);
}

function isNumber(x:any):x is number{
  return typeof x === 'number'
}
function isString(x:any):x is string{
  return typeof x === 'string'
}