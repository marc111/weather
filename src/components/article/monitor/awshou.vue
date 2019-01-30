<template>
  <div class="empty">
    <div class="zdzd">
      <!-- 头部 -->
      <div class="zdMenu">
        <Select v-model="model1" size="large" style="width:100px" @on-change="cityChange">
          <Option v-for="item in showlistArray" :value="item.val" :key="item.index">{{ item.val }}</Option>
        </Select>
        <span :class="[flag==1?'active':'']" style="cursor:pointer" @click="changeclass('table')">表格</span>
        <span :class="[flag==2?'active':'']" style="cursor:pointer"@click="changeclass('map')">图</span>
      </div>
      <div class="zdMenu-box">
        <div class="zdMenu-left">
          <Collapse :hide-arrow='true' v-model="value2">
            <Panel name="1"  :hide-arrow='true'>
              自动站时次记录
              <p class="zdMenu-left-item item-active" slot="content">
                2019-01-28 10:00
              </p>
              <p class="zdMenu-left-item" slot="content">
                2019-01-28 10:00
              </p>
              <p class="zdMenu-left-item" slot="content">
                2019-01-28 10:00
              </p>
            </Panel>
            <Panel name="2">
              自动站时次记录
              <p class="zdMenu-left-item" slot="content">
                2019-01-28 10:00
              </p>
            </Panel>
            <Panel name="3">
              自动站时次记录
              <p class="zdMenu-left-item" slot="content">
                2019-01-28 10:00
              </p>
            </Panel>
            <Panel name="4">
              自动站时次记录
              <p class="zdMenu-left-item" slot="content">
                2019-01-28 10:00
              </p>
            </Panel>
          </Collapse>
        </div>
        <div class="zdMenu-right" v-show="flag == 'table'">
          <Table :columns="columns1"></Table>
        </div>
        <div class="zdMenu-right">
          <div>
            <awshouMap :currentIndex="currentIndex" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import awshouMap from './components/'
import mapData from './components/data.json'
console.log(mapData, 990)
export default {
  components: {
    awshouMap
  },
  data () {
    return {
      showlist: false,
      currentIndex: 0,
      model1: '全市',
      flag: 'map',
      showlistArray: [
        {
          val: '全市',
          index: 0
        }, {
          val: '禅城',
          index: 4
        }, {
          val: '南海',
          index: 5
        }, {
          val: '顺德',
          index: 6
        }, {
          val: '三水',
          index: 7
        }, {
          val: '高明',
          index: 8
        }
      ],
      value2: '1',
      columns1: [
        {
          title: '地点',
          key: 'name',
          sortable: true
        },
        {
          title: '气温（℃）',
          key: 'name',
          sortable: true
        },
        {
          title: '时雨量（mm）',
          key: 'name',
          sortable: true
        },
        {
          title: '风向',
          key: 'name',
          sortable: true
        },
        {
          title: '风速（m/s）',
          key: 'name',
          sortable: true
        }
      ]
    }
  },
  methods: {
    changeclass (flag) {
      this.flag = flag
    },
    cityChange (item) {
      this.showlistArray.forEach(val => {
        if (val.val === item) this.currentIndex = val.index
      })
    }
  }
}
</script>

<style lang="scss">
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
  .zdMenu-box {
    padding: 30px;
  }
  .zdMenu-left {
    float: left;
    width: 160px;
    border: 1px solid #025bc4;
    padding: 1px;
    .ivu-collapse-header{
      background-color: #025bc4 !important;
      color: #fff;
      padding-left: 6px;
      border: 1px solid #ffffff;
      border-bottom: none;
      position: relative;
      &:nth-last-child() {
        border-bottom: 1px solid #ffffff;
      }
      .ivu-icon {
        position: absolute;
        right: 24px;
        top: 0px;
        line-height: 38px;
        font-size: 16px;
      }
    }
    .ivu-collapse-content {
      padding: 6px !important;
    }
    .ivu-collapse-content-box {
      padding: 0px !important;
      .zdMenu-left-item {
        line-height: 30px;
        cursor: pointer;
        &.item-active {
          color: #025bc4;
        }
      }
    }
  }
  .zdMenu-right {
    width: 740px;
    float: left;
    margin-left: 20px;
    border: 1px solid #025bc4;
    .ivu-table-header {
      thead th {
        background-color: #025bc4;
        color: #ffffff;
        text-align: center;
      }
      .ivu-table td, .ivu-table th {
        border-color: #ffffff;
      }
    }
    .ivu-table td, .ivu-table th {
      border: 0.5px solid #fff;
    }
  }
}
</style>
