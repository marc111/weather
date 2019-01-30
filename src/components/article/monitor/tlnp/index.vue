<template>
  <div class="monitor-tlnp">
    <select-ctrl @selectUpdate="selectUpdate" />
    <nav-ctrl @navUpdate="navUpdate" />
    <canvas-box
      :canvas-id="canvasId"
      :layer="layer"
      :canvas-target="canvasTarget"
    />
  </div>
</template>
<script>
import axios from 'axios'
import selectCtrl from './select'
import navCtrl from './nav'
import canvasBox from './tlnp'

// canvas模块加载
import canvasTarget from './canvas_plugin/target'
import canvasUtil from './canvas_plugin/util'
import canvasMath from './canvas_plugin/math'
import canvasMatrix from './canvas_plugin/matrix'
import canvasGeometry2D from './canvas_plugin/geometry2D'
import canvasConstant from './canvas_plugin/constant'
import canvasPhy from './canvas_plugin/phy'
import canvasG2dlnp from './canvas_plugin/g2dlnp'
import canvasDataupper from './canvas_plugin/data.upper'
import canvasWsymbol from './canvas_plugin/wsymbol'
import canvasTlnputil from './canvas_plugin/tlnputil'
import canvasTlnp from './canvas_plugin/tlnp'
import canvasTlnpcanvas from './canvas_plugin/tlnpcanvas'
import canvasTlnpplugin from './canvas_plugin/tlnpplugin'

export default {
  components: {
    selectCtrl,
    navCtrl,
    canvasBox
  },
  data() {
    return {
      station: {},
      time: '',
      layer: 'ema50',
      canvasId: 'canvas-tlnp',
      canvasData: {},
      canvasTarget: null
    }
  },

  mounted() {

  },

  methods: {

    // 顶部select切换
    selectUpdate(data) {
      if (data.station.id != this.station.id || data.time != data.time) {
        this.dataUpdate(data)
      } else if (data.layer != this.layer) {
        this.layer = data.layer
      }
    },

    // 图表类型选择
    navUpdate(data) {
      data.id != this.canvasId && (this.canvasId = 'canvas-' + data.id)
    },

    // 获取图表数据
    async dataUpdate(data) {
      this.station = data.station
      this.time = data.time
      this.layer = data.layer
      const canvasData = await axios.get('/dat/upper/upper.js').then(res => {
        return res.data
      })
      this.createDrawObject(canvasData)
    },

    // 创建绘制tlnp图的对象
    createDrawObject(data) {
      const target = canvasTarget()
      canvasUtil(target)
      canvasMath(target)
      canvasMatrix(target)
      canvasGeometry2D(target)
      canvasConstant(target)
      canvasPhy(target)
      canvasG2dlnp(target)
      canvasDataupper(target)
      canvasWsymbol(target)
      canvasTlnputil(target)
      canvasTlnp(target)
      canvasTlnpcanvas(target)
      canvasTlnpplugin(target)
      const dataMnt = target.data.upper()
      dataMnt.setData(data, { current: true, ...this.station })

      this.canvasTarget = { dataMnt, target }

      // const tlnp = target.tmgram.tlnp("canvas-tlnp", dataMnt, { no_padding: false })
      // tlnp.setOption({ diagram_mode: this.layer, plugin_opt: { StateCurve: { orgin: 'lowest' }, Idx: { hide: true } } })
      // tlnp.draw()
    }
  }
}
</script>
<style lang="scss" scoped>
.monitor-tlnp {
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
}
</style>
