var varnull;
var varundedined;
var varnumber = varnull;
var varstring = varnull;
function show(stuff) {
    if ('canRun' in stuff) {
        return '此物品是动物';
    }
    else if ('canEat' in stuff) {
        return '此物品是水果';
    }
}
var dog = {
    name: '旺财',
    canRun: true
};
var things = {
    name: '什么也不是'
};
console.log(show(dog)); // 此物品是动物
console.log(show(things)); // undefined
function padLeft(value, padding) {
    if (typeof padding === 'number') {
        return Array(padding).join('') + value;
    }
    if (typeof padding === 'string') {
        return padding + value;
    }
    throw Error('Expected string or number,got' + padding);
}
console.log(padLeft('left', 10));
console.log(padLeft('left', '10'));
console.log(padLeft('left', ''));
