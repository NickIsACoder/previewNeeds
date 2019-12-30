const goods = '123';

import img1 from './img/downA.png'
import img2 from './img/upA.jpg'
import img3 from './img/norm_1.png'

import "babel-polyfill"
import './test.less'

async function sayHello(){
    // SERVICE_URL为在插件中定义的
    const name = await fetch(SERVICE_URL);//等待fetch执行完再往下执行
    console.log(name);
}

sayHello();