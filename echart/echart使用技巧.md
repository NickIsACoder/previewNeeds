<!-- #### 按需引入`(https://github.com/apache/incubator-echarts/blob/master/index.js)` -->

### 介绍
ECharts由百度团队开发， 是一个使用 JavaScript 实现的开源可视化库  
ECharts 兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari等）及兼容多种设备。针对移动端交互做了细致的优化，
例如PC端用鼠标在图中进行缩放（用鼠标滚轮）、平移等的操作，在移动端上可以用手指在坐标系中进行缩放、平移。

### 安装
> cnpm install echarts --save  

### 使用
```js
// 引入
const echarts = require("echarts");
// or
import * as echarts from 'echarts'

// 创建实例
echarts.init(dom).setOption(){
      title: {
        text: "ECharts示例",
      },
      legend: {
        data: ["销量", "销量2"],
      },
      tooltip: {
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [

        {
          name: "销量",
          type: "bar",
          barMaxWidth: 20,
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    }
```


### 社区
> https://gallery.echartsjs.com/explore.html



### tooltip提示框添加点击事件：
```javascript
tooltip: {
	// trigger : ‘item‘,
	enterable: true  //鼠标是否可进入提示框浮层中
},
```

#### 重新设置图形高度
```javascript
mychart.resize({height:380});
```
### tooltip显示超出视图范围的解决方法
* 将tooltip限制在容器内
```javascript
tooltip: {
	confine: true
},
```
* 为tooltip添加额外样式
```javascript
tooltip: {
	extraCssText: 'z-index:999'
},
```

### 使用formatter格式化图例文本 
``` javascript
// 字符串模板
formatter: '{a|{name}}',
textStyle:{
  rich: {
	  a: {
		  fontSize: 18,
		  lineHeight: 25,
		  color: 'red',
		  align: 'left'
	  },
  }
}}
// 回调函数
tooltip : {
   formatter: function (params) {
     return  “名称：” +params.name
  }
}
tooltip: {
	 formatter: function(a) {
		 return '<div class="showBox" style="color:red">' + a + '</div>'
	 }
 }
```

### 柱状图等数据量大，可设置为可拖动状态或者添加滚动条
* 拖动
``` javascript
dataZoom: [
  {
     type: 'inside', // 内置在坐标系中 通过鼠标滚轮或者手指touch进行处罚
     start: 50,
     end: 100
  }
]
```
* 底部滚动条
``` javascript
dataZoom: [
  {
     type: 'slider', // 在外部 显示为滑动条形的一个组件,可直接拖动使用
     start: 50,
     end: 100
  }
]
```

### x轴文字过长的处理方法
* 设置文字倾斜
``` javascript
xAxis: {
	axisLabel: {
		 rotate:40  
	}	
}
```
* 设置文字换行
``` javascript
xAxis: {
	axisLabel: {
		formatter:function(value)
		{
			return value.split("").join("\n");
		}
	}
}
```

### 控制图的大小
``` javascript
grid: {
	top: '10%',
	right: '10%',
	bottom: '10%',
	left: '10%'
},
```

### 堆叠柱状图的配置方式
``` javascript
series: [{
	name: '高于拿地版',
	type: 'bar',
	barWidth: '24', 
	stack: 'cost', // 代表叠加的形态，如果去掉这个，该条就会单独出来
	data: [20,30,10]
},
{
	name: '与拿地版持平',
	type: 'bar',
	barWidth: '24',
	stack: 'cost',
	data: [10,20,30]
}]
```

### 柱状图设置中位线/平均线
``` javascript
series: [{
  name: "销量",
  type: "bar",
  barMaxWidth: 20,
  data: [5, 20, 36, 10, 10, 20],
  markLine:{
	data:[
	  {type:'average',name:'平均数'}
	]
  }
},]
```

### 地图
* 绘制地图
获取地图json的地址
> http://datav.aliyun.com/tools/atlas/#&lat=31.769817845138945&lng=104.29901249999999&zoom=4
``` javascript
// zoneJson为要渲染的地图json
echarts.registerMap('zone', zoneJson);
option = {
	geo: { 
		map: 'zone', // 地图
		zoom: 1.2, 
		roam: true, // 地图可拖动
		label: {
			normal: {
				show: true, // 是否显示对应地名
			}
		},
	},
}
```

### 常用方法/API
* 事件绑定
``` javascript
// on(eventName,function)  
// ('click'、'dblclick'、'mousedown'、'mousemove'、'mouseup'、'mouseover'、'mouseout'、'globalout'、'contextmenu')
myChart.on('click', function (params) {
		console.log(params.name);
});
 //chart.on(eventName, query, handler)
 // 使用 query 只对指定的组件的图形元素的触发回调
chart.on('click', 'series', function () {})
chart.on('click', 'series.line', function () {})
chart.on('click', 'dataZoom', function () {})
chart.on('click', 'xAxis.category', function () {})
// 例: 给x轴的文字添加点击事件，y轴同理  
// 将xAxis或者yAxis的属性triggerEvent 置为 true  
chart.on('click', 'xAxis', function () {})  
```

* 解绑

```javascript
<!-- // 解除某个事件的绑定
myChart.un("click", function () {
	 alert("悲剧，你注销我了!");
}); -->
// 移除事件（避免点击事件重复促发）
myChart.off('click')
```

* 显示/关闭loading
```javascript
myChart.showLoading({
    text: "图表数据正在努力加载...",
    x: "center",
    y: "center",
    textStyle: {
        color:"red",
        fontSize:14
    },
    effect:"spin"
});
myChart.hideLoading();
```

* resize() 图表随浏览器窗口大小改变
``` javascript
window.onresize = this.myChart.resize
```

* clear() 清空绘画内容，清空后实例可用
``` javascript
myChart.clear()
```

* dispose() 释放图表实例，释放后实例不再可用
``` javascript
myChart.dispose()
```

* getDataURL()  导出图表图片，返回一个 base64 的 URL，可以设置为Image的src
``` javascript
// 可选png, jpeg
myChart.getDataURL("png")
```

<!-- * 为 echarts图表转换后的img标签
``` javascript
myChart.getImage()
``` -->

### 通过dispatchAction触发图表行为
* highlight 高亮/downplay取消高亮
``` javascript
myChart.dispatchAction({
		type: 'highlight', // highlight/ downplay
		seriesIndex: 0,  // series数组里面的下标
		dataIndex: 0   // 数据的下标
});
myChart.dispatchAction({
    type: 'highlight',
    // 可选，系列 index，可以是一个数组指定多个系列
    seriesIndex?: number|Array,
    // 可选，系列名称，可以是一个数组指定多个系列
    seriesName?: string|Array,
    // 可选，数据的 index
    dataIndex?: number,
    // 可选，数据的 名称
    name?: string
})
```
* legendSelect 选中图例/legendUnSelect 取消选中图例/legendToggleSelect 	切换图例的选中状态
``` javascript
myChart.dispatchAction({
    type: 'legendSelect',
    // 图例名称
    name: string
})
```
* legendScroll 控制图例的滚动
``` javascript
myChart.dispatchAction({
    type: 'legendScroll',
    scrollDataIndex: number,
    legendId: string
})
```
* legendScroll 控制图例的滚动
``` javascript
myChart.dispatchAction({
    type: 'legendScroll',
    scrollDataIndex: number,
    legendId: string
})
```
* showTip 	显示提示框/hideTip 隐藏提示框
``` javascript
myChart.dispatchAction({
    type:'showTip',
    //屏幕上的x坐标
    x: number,
    //屏幕上的y坐标
    y: number,
    //本次显示tooltip的位置，只在本次action生效。缺省则使用option中定义的tooltip位置
    position: Array.<number> | String | Function
})
// 或
myChart.dispatch({
    type: 'showTip',
    // 系列的 index，在 tooltip 的 trigger 为 axis 的时候可选。
    seriesIndex?: number,
    // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
    dataIndex?: number,
    // 可选，数据名称，在有 dataIndex 的时候忽略
    name?: string,
    // 本次显示 tooltip 的位置。只在本次 action 中生效。
    // 缺省则使用 option 中定义的 tooltip 位置。
    position: Array.<number>|string|Function,
})
```