const path = require('path');
// 单独打包css
const ExtractTextPlugin = require("extract-text-webpack-plugin");
// 自动生产html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const babelpolyfill = require("babel-polyfill")

module.exports = {
    entry: './input.js',//入口文件,可单个配置
    output: {
        path: path.resolve(__dirname, 'dist'),//“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录
        filename: 'output.bundle.js'    ,//单个入口文件时的输出
    },
    mode: 'production',    //配置打包的模式：development：开发模式，production：生产模式
    devServer: {    //启动命令为webpack-dev-server,在package.json中配置scripts。配置后启动命令为npm run start
      contentBase: path.join(__dirname, "dist"),// 此dist要与output中的dist一样
      compress: true,
      port: 9000,
      hot: false,   //热替换功能，false时为开启，true为关闭，默认为false
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.DefinePlugin({
          'SERVICE_URL': JSON.stringify("https://bf6e1ee3-1d9d-4d34-bed0-a13458b7d08d.mock.pstmn.io/test")
        }),
        // new HtmlWebpackPlugin()  //直接输出html文件
        new HtmlWebpackPlugin({  // 自定义输出html文件
          title: '我的文件',
          anytxt: '配置的文字',
          filename: 'index.html',    //输出的文件名
          template: 'template.html'  //自定义的文件模版
        }),
    ],
    module: {
        rules: [
          {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 3192   //当图片大小大于3192时，打包后会生成物理文件，小于时，生产的为base64串
                }
              }
            ]
          },
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,//要排除的文件夹
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          },
          {
              test: /\.less$/,
              // 会把css打包在js文件中
              // use: [{
              //     loader: "style-loader" // creates style nodes from JS strings
              // }, {
              //     loader: "css-loader" // translates CSS into CommonJS
              // }, {
              //     loader: "less-loader" // compiles Less to CSS
              // }]
              // 把less打包成单独文件
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                use: ['css-loader', 'less-loader']
              })
          }
        ]
      }
}