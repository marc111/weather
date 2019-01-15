<template>
  <div class="foshanradar">
    <div class="contentfoshan">
      <div class="left-foshan">
        <div class="lefttop-foshan">

        </div>
        <div class="leftfooter-foshan">
          <span>雷达图说明:</span>
          <br>
          <p>
该雷达图为基本反射率图，底图以不同底色区分佛山市五区，精细到各镇街。当佛山及周边地区有降雨时，图上就会显示有颜色的雷达回波，图像右上方的色板标示反射率的强度。反射率强度值（dBz）越大表示降雨强度越强，当它的值大于或等于40dBz时，出现雷雨天气的可能性较大；当它的值在50dBz或以上时，出现暴雨、冰雹、大风等强对流天气的可能性较大。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.foshanradar {
  width: 100%;
  height: 100%;
  > .contentfoshan {
    width: 100%;
    height: 100%;
    background-color: orange;
    > .left-foshan {
      width: 30%;
      height: 100%;
      background-color: green;
      > .lefttop-foshan {
        width: 100%;
        height: 110px;
        background-color: #123a7b;
      }
      > .leftfooter-foshan {
        margin-top: 8px;
        margin-left: 30px;
        width: 80%;
        height: 336px;
        background-color: #123a7b;
        padding: 14px;
        color: #fff;
        > p {
          color: #fff;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
