<template>
  <div class="warning-foshan">
    <div class="inside">
      <div
        class="scroll-area"
        @mouseover="stopScroll"
        @mouseleave="startScroll"
      >
        <div
          id="scroll-inside"
          class="scroll-inside"
          :style="{'left':scrollDirection}"
        >
          <template v-if="currentWarning">
            <template v-for="(item,index) in scrollList[currentWarning]">
              <div
                :key="'scroll-'+currentWarning+'-'+index"
                class="scroll-box"
              >
                <span>{{item.city}} {{item.time}} </span>
                <img :src="'/images/warning/wa_fo/'+currentWarning+'.png'" />
              </div>
            </template>
          </template>
        </div>
      </div>
      <div class="nav-area">
        <span
          :class="['nav-button',{'current':showStatus=='map'}]"
          @click="showSwitch('map')"
        >区域展示</span>
        <span
          :class="['nav-button',{'current':showStatus=='list'}]"
          @click="showSwitch('list')"
        >列表展示</span>
        <a
          class="nav-button last"
          href="http://gd.weather.com.cn/zhyj/index.shtml"
          target="blank"
        >全省预警</a>
      </div>
      <div class="content-area">
        <div
          v-if="showStatus == 'map'"
          class="show-map"
        >
          <div class="map-nav">
            <div class="title">预警信号类型</div>
            <div class="map-list">
              <template v-for="(item,index) in scrollList">
                <span
                  :key="'map-nav-'+index"
                  :class="['map-nav-button',{'current':currentWarning == index}]"
                  @click="currentSwitch(index)"
                >
                  <img :src="'/images/warning/wa_fo/'+index+'.png'" />
                </span>
              </template>
            </div>
          </div>
          <div
            class="map-content"
            id="map-echarts"
          ></div>
        </div>
        <div
          v-if="showStatus == 'list'"
          class="show-list"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import axios from 'axios'
export default {
  async mounted() {

    const dataSource = await this.getData()

    this.setData(dataSource)
  },
  beforeDestroy() {
    this.stopScroll()
  },
  data() {
    return {
      showStatus: 'map',
      cityMap: {
        GDSS: '三水',
        GDSD: '顺德',
        GDNH: '南海',
        GDGM: '高明',
        BFFO: '禅城'
      },
      colorMap: [
        ['#e7e7e7', '#333333'],
        ['#ffffff', '#333333'],
        ['#0f0feb', '#ffffff'],
        ['#f5e82a', '#333333'],
        ['#efa425', '#333333'],
        ['#c30e21', '#ffffff'],
      ],
      currentWarning: '',
      scrollDirection: '100%',
      scrollList: {},
      scrollMove: 'scrollMove',
      mapSource: {},
      mapList: {},
      mapCurrent: ''
    }
  },
  methods: {
    getData() {

      // 当前预警状态
      let currentStatus = axios.get('/warning/wa_fotown_inforce.js').then(res => {
        return res.data
      });

      // 区预警状态
      let cityStatus = axios.get('/warning/wa_fo_inforce.js').then(res => {
        return res.data
      });

      // 镇街预警状态
      let townStatus = axios.get('/warning/wa_fotown_inforce_all.js').then(res => {
        return res.data
      });

      // 佛山镇街geoJSON数据
      let mapSource = axios.get('/map-source/area.js').then(res => {
        return res.data;
      })

      return Promise.all([currentStatus, cityStatus, townStatus, mapSource])
    },
    setData(data) {

      // 整理各区预警数据
      data[1].forEach(item => {
        let { code, station_code, datetime } = item
        !this.scrollList[code] && (this.scrollList[code] = [])
        this.scrollList[code].push({
          city: this.cityMap[station_code],
          time: datetime
        })
      })

      // 整理镇街预警数据
      data[2].forEach(item => {
        let { code, datetime, cn, name } = item
        !this.mapList[code] && (this.mapList[code] = [])
        this.mapList[code].push({
          name: cn,
          value: code,
          data: {
            code,
            time: datetime,
            content: name
          }
        })
      })

      // 地图数据
      this.mapSource = data[3]

      !this.currentWarning && (this.currentWarning = data[1][0].code)

    },
    setMap() {
      echarts.registerMap('foshan', this.mapSource);
      let mapChart = echarts.init(document.getElementById('map-echarts'));
      const mapData = this.mapList[this.currentWarning]
      const option = {
        tooltip: {
          trigger: 'item',
          showDelay: 0,
          transitionDuration: 0.2,
          position(point, params, dom, rect, size) {

          },

        },
        series: [{
          type: 'map',
          map: 'foshan',
          zoom: 1.1,
          roam: true,
          itemStyle: {
            areaColor: this.colorMap[0][0],
            color: this.colorMap[0][1],
          },
          label: {
            show: true,
            fontSize: 10
          },
          data: mapData
        }]
      }
      mapChart.setOption(option);
    },

    // 切换地图模式和列表模式
    showSwitch(status) {
      this.showStatus != status && (this.showStatus = status)
    },

    // 停止滚动
    stopScroll() {
      this.scrollMove && clearInterval(this.scrollMove)
    },

    // 开始滚动
    startScroll() {
      this.setScroll()
    },

    // 切换预警类型
    currentSwitch(index) {
      if (this.currentWarning != index) {
        clearInterval(this.scrollMove)
        this.scrollDirection = '100%'
        this.currentWarning = index
      }
    },
    setScroll() {
      let el = document.getElementById("scroll-inside")
      let originDirection, targetDirection
      if (el.style.left == "100%") {
        originDirection = el.offsetWidth
      } else {
        originDirection = parseFloat(el.style.left)
      }
      targetDirection = -originDirection
      this.scrollDirection = originDirection + 'px'
      this.scrollMove = setInterval(() => {
        if (originDirection > targetDirection) {
          originDirection -= 1
        } else {
          originDirection = -targetDirection
        }
        this.scrollDirection = originDirection + 'px'
      }, 50)
    }
  },
  watch: {
    currentWarning() {
      this.$nextTick(() => {
        this.setScroll()
        this.setMap()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.warning-foshan {
  width: 100%;
  padding: 20px 22px;
  box-sizing: border-box;
  .inside {
    width: 100%;
    .scroll-area {
      width: 100%;
      height: 32px;
      padding: 0 10px;
      position: relative;
      box-sizing: border-box;
      overflow: hidden;
      border: 1px solid #cccccc;
      .scroll-inside {
        width: auto;
        top: 0;
        position: absolute;
        height: 30px;
        display: inline-block;
        white-space: nowrap;
        .scroll-box {
          height: 26px;
          margin: 2px 0 0 26px;
          display: inline-block;
          span {
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            color: #346984;
          }
          img {
            height: 26px;
            display: inline-block;
          }
        }
      }
    }
    .nav-area {
      width: 100%;
      height: 58px;
      padding: 12px 0;
      .nav-button {
        width: 120px;
        height: 34px;
        line-height: 34px;
        margin-right: 10px;
        float: left;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        color: #ffffff;
        background-color: #025bc4;
        cursor: pointer;
      }
      .current {
        background-color: #ff6c00;
      }
      .last {
        margin-right: 0;
        float: right;
      }
    }
    .content-area {
      width: 100%;
      height: 540px;
      .show-map {
        width: 100%;
        display: inline-block;
        .map-nav {
          width: 230px;
          display: inline-block;
          vertical-align: top;
          .title {
            background: #025bc4;
            height: 24px;
            line-height: 24px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-family: "宋体";
            display: block;
          }
          .map-list {
            width: 100%;
            padding-top: 10px;
            box-sizing: border-box;
            border: 1px #dfdcdc solid;
            .map-nav-button {
              width: 84px;
              height: 69px;
              margin: 0 0 10px 20px;
              display: inline-block;
              border: 2px solid transparent;
              box-sizing: border-box;
              cursor: pointer;
              img {
                width: 80px;
                height: 65px;
                display: block;
              }
            }
            .map-nav-button:hover,
            .current {
              border-color: #ff6c00;
            }
          }
        }
        .map-content {
          width: 680px;
          height: 560px;
          margin-left: 20px;
          display: inline-block;
          vertical-align: top;
        }
      }
    }
  }
}
</style>
