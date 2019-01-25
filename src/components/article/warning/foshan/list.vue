<template>
  <div class="warning-list">
    <table>
      <thead>
        <th class="first">预警信号</th>
        <template v-for="(item,index) in warningCN">
          <th :key="'warning_cn_name_'+index">{{item}}</th>
        </template>
      </thead>
      <tbody>
        <template v-for="(item,index) in areaData">
          <tr :key="'area_row_'+index">
            <div class="inside">
              <div class="area-name">{{item.name}}</div>
              <div class="town-list">
                <template v-for="(townItem,townIndex) in item.town">
                  <div
                    :key="'town_row_'+townIndex"
                    :class="{'last':townIndex == item.town.length-1}"
                  >
                    <span>{{townItem.name}}</span>
                    <template></template>
                  </div>
                </template>
              </div>
            </div>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  mounted() {
    this.getData().then(res => {

      const data = this.areaData

      res.forEach(item => {

        // let areaName = item.station_code.substr(0, 2)
        // let townName = item.station_code.substr(2)
        // let warningIndex = this.warningCode.indexOf(item.code[0])
        // let areaIndex = this.areaIndex[areaName].index
        // let townIndex = this.areaIndex[areaName].townIndex[townName]

        // !data[areaIndex].town && (data[areaIndex].town = [])
        // !data[areaIndex].town[townIndex] && (data[areaIndex].town[townIndex] = {})
        // !data[areaIndex].town[townIndex].name && (data[areaIndex].town[townIndex].name = item.cn)
        // !data[areaIndex].town[townIndex].list && (data[areaIndex].town[townIndex].list = ['', '', '', '', '', '', '', '', '', ''])
        // data[areaIndex].town[townIndex].list[warningIndex] = item.code

      })

      // this.areaData = data
    })
  },
  data() {
    return {
      warningCN: ['台风', '暴雨', '高温', '寒冷', '大雾', '灰霾', '雷雨大风', '道路结冰', '冰雹', '森林火险'],
      warningCode: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
      areaIndex: {
        CC: {
          index: 0,
          townIndex: {
            SW: 0, ZM: 1, ZC: 2, NZ: 3
          }
        },
        NH: {
          index: 1,
          townIndex: {
            LS: 0, XQ: 1, JJ: 2, DZ: 3, DL: 4, SS: 5, GC: 6
          }
        },
        SD: {
          index: 2,
          townIndex: {
            JA: 0, DL: 1, RG: 2, LL: 3, LJ: 4, CC: 5, XT: 6, LZ: 7, LC: 8, BJ: 9
          }
        },
        SS: {
          index: 3,
          townIndex: {
            YD: 0, DT: 1, LP: 2, BN: 3, NS: 4, XN: 5, LB: 6
          }
        },
        GM: {
          index: 4,
          townIndex: {
            YH: 0, GH: 1, MC: 2, HC: 3
          }
        },
      },
      areaData: [
        {
          name: '禅城',
          code: 'CC',
          town: [
            {
              name: '石湾',
              code: 'SW'
            }, {
              name: '祖庙',
              code: 'ZM'
            }, {
              name: '张槎',
              code: 'ZC'
            }, {
              name: '南庄',
              code: 'NZ'
            }
          ]
        }
        // { name: '南海', code: 'NH' },
        // { name: '顺德', code: 'SD' },
        // { name: '三水', code: 'SS' },
        // { name: '高明', code: 'GM' }
      ]
    }
  },
  methods: {
    getData() {
      // 镇街预警状态
      return axios.get('/warning/wa_fotown_inforce_all.js').then(res => {
        return res.data
      });

    }
  }
}
</script>
<style lang="scss" scoped>
.clear-float:after {
  content: ".";
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}
.warning-list {
  width: 100%;
  table {
    width: 100%;
    thead {
      width: 100%;
      display: block;
      margin-bottom: 1px;
      th {
        width: 80px;
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        font-weight: bold;
        text-align: center;
        color: #ffffff;
        border-left: 1px solid #ffffff;
        background-color: #025ac4;
      }
      .first {
        width: 138px;
        border-left: 0;
      }
    }
    tbody {
      width: 100%;
      display: block;
      border-top: 1px solid #025ac4;
      > tr {
        width: 100%;
        padding: 2px 1px;
        display: block;
        border: solid #025ac4;
        border-width: 0 1px 1px;
        box-sizing: border-box;
        .inside {
          width: 100%;
          display: inline-block;
          background-color: #025ac4;
          font-size: 0;
          .area-name {
            width: 40px;
            padding: 0 12px;
            display: inline-block;
            text-align: center;
            font-size: 16px;
            color: #ffffff;
            vertical-align: middle;
          }
          .town-list {
            width: 894px;
            display: inline-block;
            background-color: #ffffff;
            vertical-align: middle;
            > .last {
              margin-bottom: 0;
            }
            > div {
              margin-left: 2px;
              margin-bottom: 2px;
              span {
                height: 50px;
                line-height: 50px;
                display: block;
                font-size: 12px;
                text-align: center;
                background-color: #eeeeee;
              }
            }
          }
        }
      }
    }
  }
}
</style>
