<template>
  <div class="forecast">
    <div class="article-content-nav">
      <article-content-nav
        :nav-list="navList"
        :current="current"
      />
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>

import articleContentNav from "./article-contentnav";

export default {
  props: ['parent-path'],
  components: {
    articleContentNav
  },
  mounted () {
    this.current = this.$router.history.current.matched[1].name
  },
  watch: {
    $route (to, from) {
      this.current = this.$router.history.current.matched[1].name
    }
  },
  computed: {
    navList () {
      return this.navData[this.parentPath]
    }
  },
  data: function () {
    return {
      current: '',
      navData: {
        forecast: [
          {
            path: '/forecast/refine',
            name: 'refine',
            title: '精细化预报',
            icon: require('./img/content-nav/L1_2.png'),
            iconCurrent: require('./img/content-nav/L1_2_2.png')
          }, {
            path: '/forecast/town',
            name: 'town',
            title: '乡镇天气预报',
            icon: require('./img/content-nav/L1_13.png'),
            iconCurrent: require('./img/content-nav/L1_13_2.png')
          }, {
            path: '/forecast/scenicSpot',
            name: 'scenicSpot',
            title: '景区预报',
            icon: require('./img/content-nav/L2_9.png'),
            iconCurrent: require('./img/content-nav/L2_9_2.png')
          }, {
            path: '/forecast/local',
            name: 'local',
            title: '本地预报',
            icon: require('./img/content-nav/L1_3.png'),
            iconCurrent: require('./img/content-nav/L1_3_2.png')
          }, {
            name: 'internal',
            path: '/forecast/internal',
            title: '国内七日预报',
            icon: require('./img/content-nav/L1_4.png'),
            iconCurrent: require('./img/content-nav/L1_4_2.png')
          }, {
            name: 'environment',
            path: '/forecast/environment',
            title: '环境气象',
            icon: require('./img/content-nav/L1_5.png'),
            iconCurrent: require('./img/content-nav/L1_5_2.png')
          }, {
            name: 'weatherReport',
            path: '/forecast/weatherReport',
            title: '天气报告',
            icon: require('./img/content-nav/L4_2.png'),
            iconCurrent: require('./img/content-nav/L4_2_2.png')
          }, {
            name: 'weatherNews',
            path: '/forecast/weatherNews',
            title: '天气消息',
            icon: require('./img/content-nav/L1_8.png'),
            iconCurrent: require('./img/content-nav/L1_8_2.png')
          }, {
            name: 'weatherVideo',
            path: '/forecast/weatherVideo',
            title: '天气视频',
            icon: require('./img/content-nav/L1_10.png'),
            iconCurrent: require('./img/content-nav/L1_10_2.png')
          }, {
            name: 'traffic',
            path: '/forecast/traffic',
            title: '道路交通预报',
            icon: require('./img/content-nav/L1_7.png'),
            iconCurrent: require('./img/content-nav/L1_7_2.png')
          }
        ],
        monitor: [
          {
            name: 'awshou',
            path: '/monitor/awshou',
            title: '自动站',
            icon: require('./img/content-nav/L1_7.png'),
            iconCurrent: require('./img/content-nav/L1_7_2.png')
          }, {
            name: 'cloud',
            path: '/monitor/cloud',
            title: '卫星云图',
            icon: require('./img/content-nav/L1_7.png'),
            iconCurrent: require('./img/content-nav/L1_7_2.png')
          }, {
            name: 'radar',
            path: '/monitor/radar',
            title: 'S波段雷达图',
            icon: require('./img/content-nav/L1_7.png'),
            iconCurrent: require('./img/content-nav/L1_7_2.png')
          }, {
            name: 'xradar',
            path: '/monitor/xradar',
            title: 'X波段雷达图',
            icon: require('./img/content-nav/L1_7.png'),
            iconCurrent: require('./img/content-nav/L1_7_2.png')
          }
        ],
        warning: [
          {
            path: '/warning/foshan',
            name: 'foshan',
            title: '佛山气象预警',
            icon: require('./img/content-nav/L3_1.png'),
            iconCurrent: require('./img/content-nav/L3_1_2.png')
          }, {
            path: '/warning/province',
            name: 'province',
            title: '全省气象预警',
            icon: require('./img/content-nav/L3_1.png'),
            iconCurrent: require('./img/content-nav/L3_1_2.png')
          }, {
            path: '/warning/meaning',
            name: 'meaning',
            title: '预警信号含义',
            icon: require('./img/content-nav/L3_3.png'),
            iconCurrent: require('./img/content-nav/L3_3_2.png')
          }, {
            path: '/warning/disaster',
            name: 'disaster',
            title: '地质灾害预警',
            icon: require('./img/content-nav/L3_2.png'),
            iconCurrent: require('./img/content-nav/L3_2_2.png')
          }
        ],
        service: [
          {
            path: '/service/foshan',
            name: 'foshan',
            title: '佛山气候',
            icon: require('./img/content-nav/L4_4.png'),
            iconCurrent: require('./img/content-nav/L4_4_2.png')
          }, {
            path: '/service/prediction',
            name: 'prediction',
            title: '生态气象预报',
            icon: require('./img/content-nav/L4_1.png'),
            iconCurrent: require('./img/content-nav/L4_1_2.png')
          }, {
            path: '/service/notice',
            name: 'notice',
            title: '档案公报',
            icon: require('./img/content-nav/L4_2.png'),
            iconCurrent: require('./img/content-nav/L4_2_2.png')
          }
        ],
        tornado: [
          {
            path: '/tornado/introduce',
            name: 'introduce',
            title: '机构简介',
            icon: require('./img/content-nav/L8_7.png'),
            iconCurrent: require('./img/content-nav/L8_7_2.png')
          }, {
            path: '/tornado/news',
            name: 'news',
            title: '科普咨讯',
            icon: require('./img/content-nav/L8_2.png'),
            iconCurrent: require('./img/content-nav/L8_2_2.png')
          }
        ],
        affairs: [
          {
            path: '/affairs/public',
            name: 'public',
            title: '政务公开',
            icon: require('./img/content-nav/zw_1.png'),
            iconCurrent: require('./img/content-nav/zw_1_2.png')
          }, {
            path: '/affairs/service',
            name: 'service',
            title: '办事服务',
            icon: require('./img/content-nav/L8_2.png'),
            iconCurrent: require('./img/content-nav/L8_2_2.png')
          }, {
            path: '/affairs/communication',
            name: 'communication',
            title: '互动交流',
            icon: require('./img/content-nav/zw_3.png'),
            iconCurrent: require('./img/content-nav/zw_3_2.png')
          }, {
            path: '/affairs/notice',
            name: 'notice',
            title: '通知公告',
            icon: require('./img/content-nav/zw_5.png'),
            iconCurrent: require('./img/content-nav/zw_5_2.png')
          }, {
            path: '/affairs/news',
            name: 'news',
            title: '气象新闻',
            icon: require('./img/content-nav/L8_2.png'),
            iconCurrent: require('./img/content-nav/L8_2_2.png')
          }, {
            path: '/affairs/suggestion',
            name: 'suggestion',
            title: '党风廉政意见箱',
            icon: require('./img/content-nav/L4_2.png'),
            iconCurrent: require('./img/content-nav/L4_2_2.png')
          }
        ],
        popularize: [
          {
            path: '/popularize/news',
            name: 'news',
            title: '气象科普',
            icon: require('./img/content-nav/kp_1.png'),
            iconCurrent: require('./img/content-nav/kp_1_2.png')
          }
        ],
        lightning: [
          {
            path: '/lightning/online',
            name: 'online',
            title: '在线办事',
            icon: require('./img/content-nav/L8_2.png'),
            iconCurrent: require('./img/content-nav/L8_2_2.png')
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.forecast {
  width: 100%;
  .content {
    width: 992px;
    float: left;
    box-sizing: border-box;
    border: 5px solid #c2c8cc;
    background-color: #ffffff;
  }
}
</style>

