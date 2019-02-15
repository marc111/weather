<template>
  <div>
    <!-- <img src="./img/Round.png"  alt=""> -->
    <span class="spot-img" :style="{left:spotLeft,top:spotTop}"></span>
  </div>
</template>

<script>
export default {
  props: {
    spotLeft: {
      type: String,
      default: '0px'
    },
    spotTop: {
      type: String,
      default: '0px'
    }
  }
}
</script>

<style>
.spot-img {
  background: url('./img/Round.png') no-repeat center center;
  transform: translateX(-4px) translateY(-4px);
  width: 8px;
  height: 9px;
  display: inline-block;
  position: absolute;
}
</style>
