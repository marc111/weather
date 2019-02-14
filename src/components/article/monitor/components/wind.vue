<template>
  <div class="wind">
    <img src="./img/fx_2.gif" :style="{left:windLeft,top:windTop}" alt="">
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
  },
  data() {
    return {
      windLeft: '0px',
      windTop: '0px'
    }
  },
  mounted() {
    this.windLeft = parseFloat(this.spotLeft) - 12.5 + 'px';
    this.windTop = parseFloat(this.spotTop) - 30.5 + 'px';
  }
}
</script>

<style lang="scss">
.wind {
  img {
    width: 25px;
    height: 61px;
    transform: rotate(45deg);
    position: absolute;
    transform-origin: 50% 50% 0px;
  }
}
</style>
