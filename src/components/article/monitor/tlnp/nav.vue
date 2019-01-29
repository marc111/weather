<template>
  <div class="monitor-tlnp-nav">
    <template v-for="(item,index) in navList">
      <span
        :key="'nav_'+item.id"
        :class="{'current':index==current}"
        @click="navClick(index)"
      >{{item.name}}</span>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: 0,
      navList: [
        {
          name: 'T-LnP',
          id: 'tlnp'
        }, {
          name: '高空风分析',
          id: 'hodograph'
        }, {
          name: '高度',
          id: 'height'
        }, {
          name: '未分类',
          id: 'v-distribution'
        }
      ]
    }
  },
  methods: {
    navClick(index) {
      this.current = index
      this.$emit('navUpdate', this.navList[index])
    }
  }
}
</script>
<style lang="scss" scoped>
.monitor-tlnp-nav {
  width: 100%;
  height: 28px;
  margin-bottom: 10px;
  box-sizing: border-box;
  span {
    width: 96px;
    height: 28px;
    line-height: 28px;
    margin-right: 4px;
    display: inline-block;
    background: #0656b4;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
  }
  .current {
    background-color: #ff6c00;
  }
}
</style>
