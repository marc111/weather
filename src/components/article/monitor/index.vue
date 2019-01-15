<template>
  <div class="empty">
    <article-content-nav
      :list="list"
      :current="current"
    />
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
// 本地预报
import articleContentNav from "../article-contentnav"

export default {
  components: {
    articleContentNav
  },
  data () {
    return {
      current: '',
      list: [{
        path: 'foshan',
        title: '自动站',
        icon: require('../img/content-nav/L3_1.png'),
        iconCurrent: require('../img/content-nav/L3_1_2.png')
      }, {
        path: 'province',
        title: '能见度',
        icon: require('../img/content-nav/L3_1.png'),
        iconCurrent: require('../img/content-nav/L3_1_2.png')
      }, {
        path: 'meaning',
        title: '天气实景',
        icon: require('../img/content-nav/L3_3.png'),
        iconCurrent: require('../img/content-nav/L3_3_2.png')
      }, {
        path: 'radar',
        title: 'S波段雷达图',
        icon: require('../img/content-nav/L3_2.png'),
        iconCurrent: require('../img/content-nav/L3_2_2.png')
      }, {
        path: 'disaster',
        title: 'X波段雷达图',
        icon: require('../img/content-nav/L3_2.png'),
        iconCurrent: require('../img/content-nav/L3_2_2.png')
      }, {
        path: 'cloud',
        title: '卫星云图',
        icon: require('../img/content-nav/L3_2.png'),
        iconCurrent: require('../img/content-nav/L3_2_2.png')
      }, {
        path: 'disaster',
        title: '台风路径图',
        icon: require('../img/content-nav/L3_2.png'),
        iconCurrent: require('../img/content-nav/L3_2_2.png')
      }, {
        path: 'disaster',
        title: '地球此时',
        icon: require('../img/content-nav/L3_2.png'),
        iconCurrent: require('../img/content-nav/L3_2_2.png')
      }, {
        path: 'disaster',
        title: 'T-Inp',
        icon: require('../img/content-nav/L3_2.png'),
        iconCurrent: require('../img/content-nav/L3_2_2.png')
      }]
    }
  },
  mounted () {
    console.log(this.$router)
    if (this.$router.history.current.name === "monitor") {
      this.$router.replace('/article/monitor/cloud')
      return
    } else {
      this.current = this.$router.history.current.matched[2].name
    }
  },
  beforeRouteUpdate (to, from, next) {
    if (to.name === "monitor") {
      this.$router.replace('/article/monitor/cloud')
    } else {
      this.current = to.matched[2].name
      next()
    }
  }
}
</script>
<style lang="scss" scoped>
  .empty{
    width: 100%;
    // height: 630px;
    // line-height: 630px;
    // font-size: 24px;
    // font-weight: 700;
    // text-align: center;
    .content {
      width: 992px;
      float: left;
      box-sizing: border-box;
      border: 5px solid #c2c8cc;
      background-color: #ffffff;
    }
  }
</style>
