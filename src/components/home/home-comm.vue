<template>
  <div class="comm">
    <titleContent :titlearray="titleright"/>
    <div class="level-comm">
      <div class="big-comm">
        <div class="message1">
          <span>昵称: </span>
          <Input v-model="namecode" />
        </div>
        <div class="message1">
          <span>联系方式: </span>
          <Input v-model="phonecode" />
        </div>
        <div class="message1">
          <span>留言: </span>
          <Input v-model="leavingcode" type="textarea" />
        </div>
        <div class="message1">
          <span>验证码: </span>
          <input type="text" style="width: 20%">
          <span class="code-text">1111111111</span>
          <Button type="primary">提交留言</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import titleContent from './titlecontent'

export default {
  components: {
    titleContent
  },
  data () {
    return {
      titleright: '互相交流',
      namecode: '',
      phonecode: '',
      leavingcode: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.comm {
  width: 350px;
  color: #000;
  > .level-comm {
    width: 100%;
    border: #e3e3e3 solid 1px;
    overflow: hidden;
    height: 240px;
    > .big-comm {
      > .message1 {
        padding-top: 18px;
        > span {
          width: 80px;
          display: inline-block;
          text-align: center;
          font-size: 16px;
        }
        > .ivu-input-wrapper {
          width: 68% !important;
        }
        > .code-text {
          width: 80px;
          height: 17px;
          background-color: orange;
        }
      }
    }
  }
}
</style>

