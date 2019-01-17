<template>
  <div class="empty">
    <div class="zdzd">
      <!-- 头部 -->
      <div class="zdMenu">
        <Select v-model="model1" size="large" style="width:100px">
          <Option v-for="item in showlistArray" :value="item.val" :key="item.index">{{ item.val }}</Option>
        </Select>
        <span :class="[flag==1?'active':'']" style="cursor:pointer" @click="changeclass(1)">表格</span>
        <span :class="[flag==2?'active':'']" style="cursor:pointer"@click="changeclass(2)">图</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showlist: false,
      model1: '全市',
      flag: 1,
      showlistArray: [
        {
          val: '全市'
        }, {
          val: '禅城'
        }, {
          val: '南海'
        }, {
          val: '顺德'
        }, {
          val: '三水'
        }, {
          val: '高明'
        }
      ]
    }
  },
  methods: {
    changeclass (flag) {
      this.flag = flag
    }
  }
}
</script>

<style lang="scss" scoped>
.empty {
  width: 100%;
  height: 700px;
  > .zdzd {
    background-color: #fff;
    height: auto;
    padding-bottom: 31px;
    > .zdMenu {
      width: 892px;
      height: auto;
      margin: 0 auto 0;
      color: #000;
      padding-top: 16px;
      > span {
        width: 121px;
        height: 37px;
        line-height: 37px;
        text-align: center;
        color: #fff;
        margin-right: 8px;
        display: inline-block;
        background: #025bc4;
        margin-left: 10px;
      }
      .active {
        background: #ff6c00;
      }
    }
  }
}
</style>
