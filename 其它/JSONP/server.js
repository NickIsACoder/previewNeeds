var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('这里是首页')
})

// 第一种JSONP方式
app.get("/jsonp_get1",function (req,res) {
    res.jsonp({a:1,b:2});
});
// 第二种JSONP方式
app.get('/jsonp_get2', (req, res) => {
  let methodName = req.query.callback; 
  let dataStr = JSON.stringify(data),
      sendStr = `${methodName}(${dataStr})`;
  res.send(sendStr);
});

app.get('/jsonp_get3', (req, res) => {
  res.send(data);
});

// CORS 跨域
app.get('/goods', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.json(data)  //返回json数据
})
// 模拟的数据
var data = {
    code: 200,
    msg: 'ok',
    data: {
      a: 'aa',
      b: 'bb'
    }
}
  
// app.all('*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By", ' 3.2.1')
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

var server = app.listen(8000, 'localhost', function () {
  console.log('服务器已经启动，地址是http://localhost:8000')
})