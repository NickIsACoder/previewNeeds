<template>
  <div class="detail-panel white-bg">
    <div class="data-content-panel pt-15">
      <div class="tabBox">
        <div
          class="tabItem"
          @click="checkTab(1)"
          v-eventlisten="{isChangePage:false,pageEvent:'切换到总货值'}"
          :class="[tab == 1 ? 'active' : '']"
        >总货值</div>
        <div
          class="tabItem"
          @click="checkTab(2)"
          v-eventlisten="{isChangePage:false,pageEvent:'切换到项目数'}"
          :class="[tab == 2 ? 'active' : '']"
        >项目数</div>
        <div
          class="tabItem"
          @click="checkTab(3)"
          v-eventlisten="{isChangePage:false,pageEvent:'切换到剩余货值'}"
          :class="[tab == 3 ? 'active' : '']"
        >剩余货值</div>
        <div
          class="tabItem"
          @click="checkTab(4)"
          v-eventlisten="{isChangePage:false,pageEvent:'切换到销售均价'}"
          :class="[tab == 4 ? 'active' : '']"
        >销售均价</div>
        <div
          class="tabItem"
          @click="checkTab(5)"
          v-eventlisten="{isChangePage:false,pageEvent:'切换到土储货值'}"
          :class="[tab == 5 ? 'active' : '']"
        >土储货值</div>
        <div
          class="tabItem"
          @click="checkTab(6)"
          v-eventlisten="{isChangePage:false,pageEvent:'切换到库存货值'}"
          :class="[tab == 6 ? 'active' : '']"
        >库存货值</div>
        <div
          class="tabItem"
          @click="checkTab(7)"
          v-eventlisten="{isChangePage:false,pageEvent:'切换到今年计划供应'}"
          :class="[tab == 7 ? 'active' : '']"
        >今年计划供应</div>
        <div
          class="tabItem"
          @click="checkTab(8)"
          v-eventlisten="{isChangePage:false,pageEvent:'切换到今年实际已售'}"
          :class="[tab == 8 ? 'active' : '']"
        >今年实际已售</div>
      </div>

      <div class="chartTitle">
        城市资源布局地图
        <span class="more" @click="getMore">
          查看更多
          <i class="el-icon-arrow-right"></i>
        </span>
      </div>
      <div class="mapBox">
        <div class="mapChart" ref="map"></div>
        <span class="back el-icon-arrow-left" @click="back" v-show="mapType==2">返回</span>
      </div>
      <div class="" v-if="tab != 4">
        <p class="chartTitle">城市能级资源分布</p>
        <div class="huojv-chart-box-item" ref="bar" v-if="orgType<=2"></div>
        <div class="huojv-chart-box-item-small" ref="pie" v-else></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import scrollFixed from '@/mixin/scroll-fixed';
import { getLocalStorage } from '@/utils/local-storage';
import { getNextMonths, handleDate, getUrlParam } from '@/utils/common';
import echarts from 'echarts'
import { Icon, PullRefresh } from 'vant';
import $ from 'jquery';
import request from '@/utils/request';

export default {
  mixins: [scrollFixed],

  data () {
    return {
      isLoading: false,
      tab: 1,
      mapType: 1,
      mapArr: {
        "全国": "public/map/china",
        "上海市": "public/map/province/shanghai",
        "云南省": "public/map/province/yunnan",
        "内蒙古自治区": "public/map/province/neimenggu",
        "北京市": "public/map/province/beijing",
        // "南海诸岛": "undefined"
        "台湾省": "public/map/province/taiwan",
        "吉林省": "public/map/province/jilin",
        "四川省": "public/map/province/sichuan",
        "天津市": "public/map/province/tianjin",
        "宁夏回族自治区": "public/map/province/ningxia",
        "安徽省": "public/map/province/anhui",
        "山东省": "public/map/province/shandong",
        "山西省": "public/map/province/shanxi",
        "广东省": "public/map/province/guangdong",
        "广西壮族自治区": "public/map/province/guangxi",
        "新疆维吾尔自治区": "public/map/province/xinjiang",
        "江苏省": "public/map/province/jiangsu",
        "江西省": "public/map/province/jiangxi",
        "河北省": "public/map/province/hebei",
        "河南省": "public/map/province/henan",
        "浙江省": "public/map/province/zhejiang",
        "海南省": "public/map/province/hainan",
        "湖北省": "public/map/province/hubei",
        "湖南省": "public/map/province/hunan",
        "澳门特别行政区": "public/map/province/aomen",
        "甘肃省": "public/map/province/gansu",
        "福建省": "public/map/province/fujian",
        "西藏自治区": "public/map/province/xizang",
        "贵州省": "public/map/province/guizhou",
        "辽宁省": "public/map/province/liaoning",
        "重庆市": "public/map/province/chongqing",
        "陕西省": "public/map/province/shanxi1",
        "青海省": "public/map/province/qinghai",
        "香港特别行政区": "public/map/province/xianggang",
        "黑龙江省": "public/map/province/heilongjiang",
      },
      orgType: getUrlParam('chooseOrgType') || getUrlParam('orgType') || getLocalStorage('orgType').orgType,
      pieOption: {
        title: {
          text: '',
          show: true,
          textStyle: {
            fontWeight: 500,
            fontSize: 16,
            color: '#333333'
          },
          x: 'center',
          y: 'top'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a}{b}{c}%"
        },
        grid: {
          top: '0%',
          left: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: false
        },
        legend: {
          type: 'plain',
          icon: 'circle',
          x: "center",
          y: "bottom",
          itemWidth: 10,
          itemHeight: 8,
          itemGap: 5,
          textStyle: {
            color: '#999999',
            fontSize: 10,
            fontWeight: 0
          },
          data: []
        },
        series: []
      },
      mapParams: ['availableAmount', 'projectAmounts', 'remainingResourcesAmount', 'averagePrice', 'landStoreResourcesAmount', 'instockResourcesAmount', 'curPlanSupplyAmount', 'curYearsSoldAmount']
    };
  },
  computed: {
    ...mapState({
      orgId: state => state.orgId || getLocalStorage(['orgId']).orgId
    })
  },

  watch: {
    '$store.state.orgId': function (newVal, oldVal) {
      this.init();
    }
  },

  mounted () {
    this.init();
  },

  methods: {
    reloadWindow () {
      setTimeout(() => {
        window.location.reload();
        this.isLoading = false;
      }, 500)
    },

    init () {
      this.orgType = getUrlParam('chooseOrgType') || getUrlParam('orgType') || getLocalStorage('orgType').orgType

      if (sessionStorage.tab) {
        this.tab = sessionStorage.tab
        sessionStorage.removeItem('tab')
      }
      this.getMapData()
    },
    // 切换标签
    checkTab (idx) {
      this.tab = idx
      this.getMapData()
    },
    //  获取汇总数据
    getMapData () {
      request({
        url: `/app-api/resources/provinceMap`,
        method: 'post',
        data: {
          orgId: this.orgId,
          type: this.mapParams[this.tab - 1]
        }
      }).then(({ data }) => {
        if (data.code === 0) {
          // 获取地图数据，展示地图
          if (this.orgType == 5) {
            let aera = data.data.cityMapDetail.map( item=>{
              return item.province
            }),
            guids = data.data.cityMapDetail.map( item=>{
              return item.provinceGUID
            })
            if (guids.length<=0) {
              // 区域数据为空时，直接显示全国地图
              this.getMapJson('全国', data.data.maxHeatColor, data.data.cityMapDetail)
            } else {
              // 区域数据不为空，则去获取区域内所有城市的数据
              this.getCityData(aera, guids)
            }
          } else {
            this.getMapJson('全国', data.data.maxHeatColor, data.data.cityMapDetail)
          }

          // 一级集团显示柱状图，二级显示饼图
          // 销售均价tab 两个图都不显示
          if (this.tab!=4) {
            if (this.orgType <= 2) {
              this.setBar()
            } else {
              this.setPie()
            }
          }
        }
      }).catch((e) => {
        console.log('getEchartData-err', e);
      });
    },
    changePN(name){
      if (name.indexOf('广西')!=-1) {
        name = '广西壮族自治区'
      } else if (name.indexOf('内蒙古')!=-1) {
        name = '内蒙古自治区'
      } else if (name.indexOf('宁夏')!=-1) {
        name = '宁夏回族自治区'
      } else if (name.indexOf('新疆')!=-1) {
        name = '新疆维吾尔自治区'
      } else if (name.indexOf('澳门')!=-1) {
        name = '澳门特别行政区'
      } else if (name.indexOf('西藏')!=-1) {
        name = '西藏自治区'
      } if (name.indexOf('香港')!=-1) {
        name = '香港特别行政区'
      }
      return name
    },
    // 获取要显示的区域json
    getMapJson (name, visualMax, tooltipData) {
      let zone = null
      if (name instanceof Array) {
        let fts = []
        for (let i = 0; i < name.length; i++) {
          const item = this.changePN(name[i]);
          let area = require('../../../../' + this.mapArr[item] + '.json')
          fts = fts.concat(area.features)
        }

        zone = require('../../../../' + this.mapArr[name[0]] + '.json')
        zone.features = fts
      } else {
        zone = require('../../../../' + this.mapArr[name] + '.json')
      }
      this.mapConfigure(zone, visualMax, tooltipData)
    },
    /*
     visualMax：图例最大值
     zone： 地图json数据
     tooltipData: 展示的数值
     */
    mapConfigure (zone, visualMax, tooltipData) {
      let myChart = echarts.init(this.$refs.map); //这里是为了获得容器所在位置 
      let isCity = (this.orgType==5||this.mapType!=1)?true: false

      tooltipData = tooltipData.map(item => {
        return {
          name: !isCity? this.changePN(item.province):item.city+'市',
          value: item[this.mapParams[this.tab - 1]],
          ...item
        }
      })
      console.log(tooltipData)
      console.log('使用的值', this.mapParams[this.tab - 1])

      window.onresize = myChart.resize;

      const that = this
      echarts.registerMap('zone', zone);
      myChart.setOption({ // 进行相关配置
        backgroundColor: "#ECECEC",
        tooltip: {
          enterable: true, // 鼠标可移入tooltip中
          trigger: 'item',
           confine: true,
          backgroundColor: 'rgba(0,0,0,.75)',
          formatter: function (params) {
            if (!params.data) {
              return params.name
            }
            const dataItem = params.data;
            const p = that.mapParams[that.tab - 1]
            let unit = '亿元'
            if (that.tab==2) {
              unit = '个'
            } else if (that.tab==4){
              unit = '万元'
            }
            let tanNames = ['总货值', '项目数', '剩余货值', '销售均价', '土储货值', '库存货值', '今年计划供应', '今年实际已售']

            let txt = `<div style="font-size:11px;padding:5px;">${dataItem.name}<br>
                <div style="fong-size:8px;margin-top:4px;color:#E8E8E8;margin-bottom:5px;line-height:150%">
                ${tanNames[that.tab - 1]}：${dataItem[p]}（${unit}）`
            txt = txt +`
                <span style="display:${p=='availableAmount'?'none':'block'}">总货值：${dataItem.availableAmount}（亿元）<br></span>
                <span style="display:${p=='projectAmounts'?'none':'block'}">项目数：${dataItem.projectAmounts}（个）<br></span>
                <span style="display:${p=='remainingResourcesAmount'?'none':'block'}">剩余货值：${dataItem.remainingResourcesAmount}（亿元）<br></span>
                <span style="display:${p=='averagePrice'?'none':'block'}">销售均价：${dataItem.averagePrice}（万元）<br></span>
                <span style="display:${p=='landStoreResourcesAmount'?'none':'block'}">土储货值：${dataItem.landStoreResourcesAmount}（亿元）<br></span>
                <span style="display:${p=='instockResourcesAmount'?'none':'block'}">库存货值：${dataItem.instockResourcesAmount}（亿元）<br></span>
                <span style="display:${p=='curPlanSupplyAmount'?'none':'block'}">今年计划供应：${dataItem.curPlanSupplyAmount}（亿元）<br></span>
                <span style="display:${p=='curYearsSoldAmount'?'none':'block'}">今年实际已售：${dataItem.curYearsSoldAmount}（亿元）</div></span></div>`
            if (that.mapType==1&&that.orgType!=5) {
              txt = txt+`<p class="toCity" data-name="${dataItem.name}" data-id="${dataItem.provinceGUID}" 
                style="margin:0;padding-top:3px;border-top:1px solid #fff; display: flex;justify-content: space-between;align-items:center">
                查看详情<i style="float:right" class="el-icon-arrow-right"></i></p>`
            }
            return txt
          },
        },
        visualMap: {
          min: 0,
          max: visualMax == 0 ? 100 : visualMax,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
          itemWidth: 5,
          itemHeight: 60,
          calculable: true,
          inRange: {
            color: ['#AFE2E5', '#006E38']
          },
          show: true
        },
        geo: { // 这个是重点配置区
          map: 'zone', // 表示中国地图
          zoom: 1.2,
          roam: false,
          label: {
            normal: {
              show: true, // 是否显示对应地名
              formatter (param) {
                // 有数据才显示label
                let index = tooltipData.findIndex(item => item.name == param.name)
                return index == -1 ? '' : param.name
              },
              textStyle: {
                color: 'rgba(0,0,0,.4)',
                fontSize: 7.5
              }
            }
          },
          itemStyle: {
            normal: {
              areaColor: '#DDDDDD',
              borderColor: '#F8F8F8',
              borderWidth: 1
            },
            emphasis: {
              // areaColor: '#FFFED8',
              // borderWidth: 1
            }
            // normal: {
            //   borderColor: 'rgba(0, 0, 0, 0.2)'
            // },
            // emphasis: {
            //   areaColor: null,
            //   shadowOffsetX: 0,
            //   shadowOffsetY: 0,
            //   shadowBlur: 20,
            //   borderWidth: 0,
            //   shadowColor: 'rgba(0, 0, 0, 0.5)'
            // }
          }
        },
        series: [{
          type: 'scatter',
          showEffectOn: 'render',
          coordinateSystem: 'geo' // 对应上方配置
        },
        {
          type: 'map',
          geoIndex: 0,
          data: tooltipData,
        }]
      })

      myChart.off('click')
      myChart.on('click', function (params) {
        $('.toCity').click(function(e){
          console.log(e.currentTarget.dataset.name)
           let zone = e.currentTarget.dataset.name,
              guid = e.currentTarget.dataset.id
           that.getCityData(zone, [guid])
        })
      });
    },
    getCityData (zone,guid) {
      request({
        url: `/app-api/resources/cityMap`,
        method: 'post',
        data: {
          type: this.mapParams[this.tab - 1],
          provinceGUID: guid
        }
      }).then(({ data }) => {
        if (data.code === 0) {
          this.mapType = zone instanceof Array?1:2
          // 获取地图数据，展示地图
          this.getMapJson(zone,data.data.maxHeatColor, data.data.cityMapDetail)
        }
      }).catch((e) => {
        console.log('getEchartData-err', e);
      });
    },
    back () {
      this.mapType = 1
      this.getMapData()
    },
    setBar () {
      request({
        url: `/app-api/resources/provinceChart`,
        method: 'post',
        data: {
          orgId: this.orgId,
          orgType: this.orgType,
          type: this.mapParams[this.tab - 1]
        }
      }).then(res => {
        
        let _lengend = [], _xAxisData = [], _series = []
        if (!res.data.data||res.data.data.length<=0) {
          _xAxisData = ['地产','商业']
          _lengend = ['一线','新一线','二线','三线','四五线']
          for (let i = 0; i < _lengend.length; i++) {
            const item = _lengend[i];
            let _json = {
              name: item,
              type: "bar",
              stack: 'item1.organizationName',
              barWidth: "50%",
              data: [0, 0]
            }
            _series.push(_json)
          }
        }else {
          _lengend = res.data.data[0].cityLevelVo.map(item=>{
            return item.cityLevel
          })
          _xAxisData = res.data.data.map(item=>{
            return item.organizationName
          })

          for (let i = 0; i < res.data.data[0].cityLevelVo.length; i++) {
            const item1 = res.data.data[0].cityLevelVo[i]
            const item2 = res.data.data[1].cityLevelVo[i]
            let _json = {
              name: item1.cityLevel,
              type: "bar",
              stack: 'item1.organizationName',
              barWidth: "50%",
              data: [item1.levelPercent, item2.levelPercent]
            }
            _series.push(_json)
          }
        }

        let unit = '亿元'
        if (this.tab==2) {
          unit = '个'
        } else if (this.tab==4){
          unit = '万元'
        }

        let option = {
          color: ["#006E38", "#01AB91", "#B4A36B", "#FFC900", "#A7EDB9"],
          legend: {
            // orient: "vertical",
            data: _lengend,
            show: true,
            type: 'plain',
            icon: 'rect',
            itemWidth: 10,
            itemHeight: 10,
            // orient: 'horizon',
            x: 'center',
            y: 'bottom',
            textStyle: {
              fontSize: 11,
              color: '#999999'
            },
          },
          grid: {
            left: "4%",
            right: "4%",
            bottom: "12%",
            top: "12%",
            containLabel: true
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            },
            textStyle: {
              align: 'left'
            }
          },
          xAxis: {
            type: 'category',
            data: _xAxisData,
            axisLine: {
              lineStyle: {
                color: '#CCCCCC',
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              textStyle: {
                fontSize: '11',
                color: '#666'
              }
            },
          },
          yAxis: {
            type: 'value',
            name: '单位：'+unit,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#999999'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#E8E8E8'
              }
            },
            axisLabel: {
              textStyle: {
                textStyle: '11',
                color: '#666'
              }
            }
          },
          series: _series
        };
        let myChart = new echarts.init(this.$refs['bar']);
        myChart.setOption(option, true);
      })
    },
    setPie () {
      request({
        url: `/app-api/resources/provinceChart`,
        method: 'post',
        data: {
          orgId: this.orgId,
          orgType: this.orgType,
          type: this.mapParams[this.tab - 1]
        }
      }).then(res => {
        console.log(res);
        let pieData = [];
        if (res.data.data.length>0) {
          for (let i = 0; i < res.data.data[0].cityLevelVo.length; i++) {
            const item = res.data.data[0].cityLevelVo[i]
            pieData.push({
              name: item.cityLevel + ' ',
              value: parseFloat(item.levelPercent)
            });
          }
        }
        
        if (!pieData.length) {
          pieData = [{ name: '暂无数据', value: 0 }];
        }
        let legendData = pieData.map(item => {
          return item.name;
        });
        let series = [
          {
            name: '',
            type: 'pie',
            radius: '45%',
            center: ['50%', '45%'],
            color: ["#006E38", "#01AB91", "#B4A36B", "#FFC900", "#A7EDB9"],
            avoidLabelOverlap: true,
            label: {
              normal: {
                formatter: '{b}{d}%',
                textStyle: {
                  fontSize: '11',
                  color: '#666666'
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '11',
                  color: '#666666'
                }
              }
            },
            // itemStyle: {
            //   borderWidth: 1, //设置border的宽度有多大
            //   borderColor: '#fff',
            // },
            labelLine: {
              normal: {
                smooth: 0.2,
                length: 10,
                length2: 20,

              }
            },
            data: pieData
          }
        ];
        let option = JSON.parse(JSON.stringify(this.pieOption));
        option.series = series;
        option.legend.data = legendData
        let pie = new echarts.init(this.$refs.pie);
        pie.setOption(option, true);
      });
    },
    getMore () {
      sessionStorage.mainTab = this.mapParams[this.tab - 1];
      sessionStorage.tab = this.tab
      this.$router.push({
        path: '/resourceStructure/more',
        query: { token: getUrlParam('token'), orgId: this.orgId ,type: this.mapParams[this.tab - 1] }
      })
    },
  },

  components: {
    [Icon.name]: Icon,
    [PullRefresh.name]: PullRefresh
  }
};
</script>

<style lang="scss" scoped>
.tabBox {
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  justify-content: space-between;
  .tabItem {
    width: 74px;
    height: 25px;
    background: white;
    color: #666666;
    text-align: center;
    line-height: 25px;
    font-size: 10px;
    border: 1px solid rgba(204, 204, 204, 1);
    margin-bottom: 10px;
    border-radius: 3px;
    &.active {
      background: rgba(32, 155, 92, 0.08);
      border: 1px solid rgba(32, 155, 92, 1);
      color: #006e38;
    }
  }
}
.mapChart {
  height: 322px;
  width: 100%;
}
.chartTitle {
  font-size: 15px;
  color: #333333;
  margin: 20px auto;
  position: relative;
}
.mapBox {
  padding-bottom: 30px;
  position: relative;
  .back {
    position: absolute;
    top: 3%;
    left: 2%;
    font-size: 10px;
    color: #666666;
  }
}
.more {
  font-size: 12px;
  color: #666666;
  float: right;
}
.huojv-chart-box-item,
.huojv-chart-box-item-small {
  margin-bottom: 20px;
}

</style>