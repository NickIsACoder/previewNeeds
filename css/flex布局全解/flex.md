### flexBox的布局方式主要分为两个角色
* Flex Container
* Flex Items

#### 对Flex Container的设定
1. flex-direction（设定Flex Items的排序方向）

> 当`flex-direction：row`   
>> `main-axis(主轴)`是row，`cross-axis(交叉轴)`是column  

> 当`flex-direction：column`   
>> `main-axis(主轴)`是column，`cross-axis(交叉轴)`是row  

2. justify-content  
设定主轴的排序方向
3. align-items  
设定交叉轴的排序方向  
4. flex-wrap  
设定要不要分行
5. flex-flow  
`flex-direction`与`flex-wrap`的缩写，如：`flex-flow: row wrap`
6. align-content  
当`flex-wrap`的值为`wrap`时，即是有多于一行Flex Items时才会生效，用于设定多于一行的Flex Items的时候，行与行之间的对齐方式

#### 对Flex Items的设定
1. order  
用于调整Flex Items的位置，排序是根据`order`由小至大排列，默认值为0，当设置Flex Items的`order`为1时，该Flex Items会被移到最后，为-1时则会被移到最开始的位置
2. align-self  
用来重写Flex Container的`align-items`值，如Flex Container的`align-items:center`,当我们设置Flex Items的`align-self:flex-end`，则该Flex Items在Flex Container中则会按照`flex-end`来排列
3. flex-basis  
用来设置Flex Items在主轴方向的基础大小。如Flex Container的`flex-direction: row;`,主轴为row,当我们设置Flex Items的`flex-basis: 100px;`,则该Flex Items的width则为100px,若`flex-direction: column;`,主轴为cloumn,则该Flex Items的`height`则为100px，`flex-basis:auto`则表示按照本身的大小去计算
> 注：需要Flex Container在主轴方向上的大小足够容得下：如Flex Container主轴方向上的大小为设置了为200px，包含三个宽高都为50px的Flex Items，我们设置其中一个Flex Items的`flex-basis:150px`，由于三个Flex Items在主轴方向上的大小为`50+50+150=250`大于200，所以该Flex Items在主轴方向的最大值为100
4. flex-grow
用来设置Flex Items的扩大比例。当Flex Container主轴方向上的有剩余空间时，Flex Items沿主轴方向扩大。如：Flex Container主轴方向的大小为200px，包含三个宽高为50px的Flex Items，设置其中一个Flex Items`flex-grow:1`,则其余两个Flex Items大小不变，该Flex Items主轴方向大小占满Flex Container的剩余空间。`flex-grow：num`代表分担多少份扩大的值、num越大，代表扩大的份数越多`flex-grow:0`表示按照原有的大小不做改变
5. flex-shrink
用来设置Flex Items的缩小比例。与`flex-grow`相反，是指Flex Items主轴方向的大小总和超出了Flex Container的时候，Flex Items沿主轴方向缩小的设定。`flex-shrink：num`代表分担多少份缩小的值、num越大，代表缩小的份数越多，同样`flex-grow:0`表示按照原有的大小不做改变
6. flex
`flex`是`flex-grow + flex-shrink + flex-basis`的集合（按顺序）  
例如:`flex: 1 1 auto;`,表示Flex Items会按照Flex Container的宽度去平均分配空间去扩大或者缩小，Flex Container有剩余空间就同步扩大，没有足够空间时就同步缩小  
例如:`flex: 0 1 150px;`,表示Flex Items的主轴方向最大值为150px，只会根据Flex Container空间不足时同步缩小，不会根据Flex Container有剩余空间时同步扩大
例如:`flex: 0 1 200px;`,表示Flex Items的主轴方向大小固定为200px，不扩大也不缩小

#### 对一些属性值的说明
1. space-around   
指每个Flex Items左右都有相同的空间隔开
2. space-evenly   
指每个Flex Items之间都有相同间距
3. space-between  
与`space-evenly`差不多，区别是取消了最左边和最右边的空间

