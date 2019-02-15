<template>
  <div class="tornado-introduce">
    <span class="title">{{title}}</span>
    <span class="content" v-html="content"></span>
  </div>
</template>
<script>
// 本地预报

import axios from "axios"
import * as api from 'api/config'

export default {
  mounted() {
    axios.get(api.request_organizationSynopsis).then(res => {
      if (res.status == 200 && res.data) {
        const result = res.data.articleList[0]
        this.content = result.content
        this.title = result.title
      }
    })
  },
  data() {
    return {
      content: '',
      title: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.tornado-introduce {
  width: 100%;
  padding: 20px 30px;
  box-sizing: border-box;
  .title {
    width: 100%;
    display: block;
    height: 24px;
    line-height: 24px;
    font-size: 22px;
    text-align: center;
  }
  .content{
    width: 100%;
    display: block;
  }
  img {
    width: 800px;
    height: 380px;
    display: block;
    margin: 0 auto;
  }
}
</style>
