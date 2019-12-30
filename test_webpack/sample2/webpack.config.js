const path = require('path');

module.exports = {
    entry: './input.js',//入口文件,可单个配置
    // entry:{ //入口文件,多个入口的配置
    //     home: './home.js',
    //     about: './about.js'
    // },
    output: {
        path: path.resolve(__dirname, 'dist'),//“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录
        filename: 'output.bundle.js'    ,//单个入口文件时的输出
        // filename: '[name].bundle.js'    ,//多个入口文件时的输出，[name]代指entry里面的key
    },
    mode: 'production',    //配置打包的模式：development：开发模式，production：生产模式
}