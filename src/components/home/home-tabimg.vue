<template>
  <div class="home-tabimg">
    <div class="top-tabimg">
      <div class="topimg">
        <ul>
          <li
            v-for="(item, index) in tabimgArr"
            :class="[flagimg===item.id?'on':'']"
            :key="item.index">
            <img :src="item.imgurl" alt="">
          </li>
        </ul>
      </div>
      <div class="bottomimg">
        <ul>
          <li :class="[flag===1?'tabon':'']">实景</li>
          <li :class="[flag===2?'tabon':'']">雷达</li>
          <li :class="[flag===3?'tabon':'']">云图</li>
          <li :class="[flag===4?'tabon':'']">台风</li>
          <li :class="[flag===5?'tabon':'']">预警</li>
          <li :class="[flag===6?'tabon':'']">地址</li>
        </ul>
      </div>
    </div>
    <div class="footer-tabspan">

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tabimgArr: [
        {
          imgurl: require('./img/fengjing.png'),
          id: 1
        }, {
          imgurl: require('./img/fengjing2.png'),
          id: 2
        }, {
          imgurl: require('./img/fengjing3.png'),
          id: 3
        }, {
          imgurl: require('./img/fengjing4.png'),
          id: 4
        }, {
          imgurl: require('./img/fengjing2.png'),
          id: 5
        }, {
          imgurl: require('./img/fengjing4.png'),
          id: 6
        }
      ],
      flagimg: 1,
      flag: 1
    }
  },
  methods: {
    // 循环切换
    _GetListtabimg () {
      setInterval(() => {
        this.flag++
        if (this.flag > 6) {
          this.flag = 1
        }
        this.flagimg = this.flag
      }, 2000)
    }
  },
  mounted () {
    this._GetListtabimg()
  }
}
</script>

<style lang="scss" scoped>
.home-tabimg {
  width: 352px;
  > .top-tabimg {
    margin-top: 10px;
    width: 100%;
    float: left;
    overflow: hidden;
    > .topimg {
      width: 100%;
      > ul {
        width: 100%;
        > li {
          display: none;
        }
        > .on {
          width: 100%;
          height: 211px;
          display: list-item;
          > img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    > .bottomimg {
      width: 100%;
      height: 34px;
      float: left;
      > ul {
        width: 100%;
        height: 34px;
        display: flex;
        > li {
          width: 16.66%;
          height: 100%;
          color: #666666;
          line-height: 34px;
          text-align: center;
          border: 1px solid #eee;
        }
        > .tabon {
          background-color: #0055c2;
          color: #fff;
        }
      }
    }
  }
  > .footer-tabspan {

  }
}
</style>
