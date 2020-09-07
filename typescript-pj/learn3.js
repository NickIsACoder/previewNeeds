function reverse(x) {
    if (typeof x === 'number') {
        return x.toString().split('').reverse().join('');
    }
    else {
        return x.split('').reverse().join('');
    }
}
console.log(reverse(123));
function getName(x, y) {
    if (typeof x === 'string' || typeof y === 'string') {
        return x.toString() + y.toString();
    }
    return x + y;
}
var theName = getName('leo', 'messi');
function getName1(x, y) {
    if (typeof x === 'string' || typeof y === 'string') {
        console.log('aaa');
        return x.toString() + y.toString();
    }
    return x + y;
}
var theName1 = getName1('leo', 'messi');
console.log(theName1); // 不报错
console.log(theName1.split(''));
function isCat(animal) {
    // if(typeof animal.run === 'function'){  // 报错，类型“dog”上不存在属性“run”
    if (typeof animal.run === 'function') {
        return true;
    }
    return false;
    // (animal as cat).run()
}
var tom = {
    name: 'Tom',
    run: function () {
        console.log('I m ' + this.name);
    }
};
var wang = {
    name: 'wang',
    jump: function () {
        console.log('旺旺');
    }
};
function runFunc(animal) {
    animal.run();
}
console.log(isCat(tom));
console.log(isCat(wang));
console.log(runFunc(tom));
console.log(runFunc(wang));
