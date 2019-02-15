<template>
  <div>
    <!-- df -->
    <div class="awshou-map">
      <img class="map-img" :src="locationData[currentIndex].img" alt="">
      <round-com v-for="(item, index) in spotArr"
      :key="index"
      :spotLeft="item.spotLeft"
      :spotTop="item.spotTop"
      />
      <temp-com v-for="(item, index) in spotArr"
      :key="index + spotArr.length"
      :spotLeft="item.spotLeft"
      :spotTop="item.spotTop"
      :minTemp="item.minTemp"
      :maxTemp="item.maxTemp"
      />
      <wind-com v-for="(item, index) in spotArr"
      :key="index + spotArr.length * 2"
      :spotLeft="item.spotLeft"
      :spotTop="item.spotTop"
      />
    </div>

  </div>
</template>

<script>
import mapData from './data.json'
import roundCom from './spot'
import tempCom from './temperature'
import windCom from './wind'
export default {
  components: {
    roundCom,
    tempCom,
    windCom
  },
  props: {
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  watch: {
    currentIndex (val) {
      this.renderMap()
    }
  },
  data () {
    return {
      mapData: mapData,
      spotArr: [],
      locationData: {
        0: {
          name: "",
          longitude_min: 112.3319,
          latitude_min: 22.57414,
          longitude_max: 113.45495,
          latitude_max: 23.6471,
          width: 730,
          height: 740,
          img: require("./img/qwBg.png")
        },
        4: {
          name: "禅城",
          longitude_min: 112.938954,
          latitude_min: 22.893128,
          longitude_max: 113.196952,
          latitude_max: 23.09612,
          width: 700,
          height: 576,
          img: require("./img/cc.png")
        },
        5: {
          name: "南海",
          longitude_min: 112.78719,
          latitude_min: 22.74813,
          longitude_max: 113.310775,
          latitude_max: 23.37886,
          width: 700,
          height: 860,
          img: require("./img/nh.png")
        },
        6: {
          name: "顺德",
          longitude_min: 112.938954,
          latitude_min: 22.57414,
          longitude_max: 113.45495,
          latitude_max: 23.06712,
          width: 700,
          height: 700,
          img: require("./img/sd.png")
        },
        7: {
          name: "三水",
          longitude_min: 112.69613,
          latitude_min: 22.89313,
          longitude_max: 113.12107,
          latitude_max: 23.6471,
          width: 485,
          height: 900,
          img: require("./img/ss.png")
        },
        8: {
          name: "高明",
          longitude_min: 112.3,
          latitude_min: 22.57414,
          longitude_max: 112.99966,
          latitude_max: 23.06712,
          width: 700,
          height: 541,
          img: require("./img/gm.png")
        }
      }
    }
  },
  methods: {
    // 经度转为图片left
    getPositionLeft (longitude, index) {
      if (!longitude) return 0
      return Math.abs((this.locationData[index].width * (longitude - this.locationData[index].longitude_min) / (this.locationData[index].longitude_max - this.locationData[index].longitude_min))) // - 35
    },
    // 纬度转为图片top
    getPositionTop (latitude, index) {
      if (!latitude) return 0
      return Math.abs((this.locationData[index].height * (latitude - this.locationData[index].latitude_max) / (this.locationData[index].latitude_min - this.locationData[index].latitude_max)))
    },
    // 渲染地图
    renderMap () {
      this.spotArr = []
      this.mapData.forEach(val => {
        if (!!val[5] && !!val[6] && val[0].indexOf(this.locationData[this.currentIndex].name) >= 0) {
          // 渲染点
          this.spotArr.push({
            spotLeft: this.getPositionLeft(val[5], this.currentIndex) + 'px',
            spotTop: this.getPositionTop(val[6], this.currentIndex) + 'px',
            maxTemp: val[12],
            minTemp: val[10]
          })
        }
      })
      console.log(this.spotArr)
    },
    // 渲染气温

  },
  mounted () {
    this.renderMap()
  }
}
</script>

<style lang="scss">
.awshou-map {
  width: 100%;
  position: relative;
  .map-img {
    width: auto;
  }
}
</style>
