<template>
  <div class="firendlink">
    <titleContent :titlearray="titlefirenlink"/>
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
      titlefirenlink: '友情链接'
    }
  }
}
</script>

<style lang="scss" scoped>
.firendlink {
  width: 1144px;
  margin: 0 auto;
}
</style>
