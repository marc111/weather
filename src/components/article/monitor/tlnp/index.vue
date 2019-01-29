<template>
  <div class="monitor-tlnp">
    <select-ctrl @selectUpdate="selectUpdate" />
    <nav-ctrl @navUpdate="navUpdate" />
    <canvas id="tlnp" width="744" height="628" style="float:left"></canvas>
    <!-- <canvas-box
      :station="station"
      :bt="time"
      :canvas-data="canvasData"
      :canvas-id="canvasId"
      :layer="layer"
    /> -->
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
import canvasAppPane from './canvas_plugin/appPane'
import canvasTlnpItems from './canvas_plugin/tlnp_items'

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
      canvasId: 'tlnp',
      canvasData: {}
    }
  },

  mounted() {
    const target = this.setCanvas()

    console.log(target)
  },

  methods: {

    setCanvas() {
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
      canvasAppPane(target)
      canvasTlnpItems(target)

      this.drawMain(target)
      return target
    },

    // 顶部select切换
    selectUpdate(data) {
      if (data.station.id != this.station.id || data.time != data.time) {
        this.dataUpdate(data)
      } else if (data.layer != this.layer) {

      }
    },

    // 图表类型选择
    navUpdate(data) {
      data.id != this.canvasId && (this.canvasId = data.id)
    },

    // 获取图表数据
    dataUpdate(data) {
      this.station = data.station
      this.time = data.time
      this.layer = data.layer
      axios.get('/dat/upper/upper.js').then(res => {
        this.canvasData = res.data
      })
    },

    // test function

    drawMain(target) {
      
      const that = this

      var util = target.util, idItems;

      var appPane = target.tmgram.app.AppPane(["tlnp_app", "hodograph_app", "height_app", "v-distribution_app"])
        , app_items = target.tmgram.app.items;
      for (var i in app_items) {
        appPane.register(i, app_items[i]);
      }

      init();

      function init() {
        // $("input[name=*]:radio").change(function (event) {// name in (diagram_mode,wind_unit,wind_lny)
        //   appPane.toChange();
        //   draw();
        // });
        // $("input[name=*]:checkbox").change(function (event) {// name in (diagram_mode,wind_unit,wind_lny)
        //   appPane.toChange();
        //   draw();
        // });

        // setupHtmlSelectOptions("#datectrl", setupHrsItems());

        // $('#datectrl').change(function (event) {
        //   var dt = $(event.target).val();
        //   disableAbs(dt);
        //   appPane.toChangeAll();
        //   draw();
        // });
        // idItems = setupIdsItems();
        // setupHtmlSelectOptions("#sidctrl", idItems);
        // $('#sidctrl').change(function (event) {
        //   appPane.toChangeAll();
        //   draw();
        // });
        // $('#diagram_mode').change(function (event) {
        //   appPane.toChangeAll();
        //   draw();
        // });

        // disableAbs(getCurrentDt());
        appPane.setCurrentIndex(0);
        draw()
        // $("ul.css-tabs").tabs("div.css-panes > div", {
        //   initialIndex: getTabOfLocationHash(),
        //   onClick: function (event, index) {
        //     appPane.setCurrentIndex(index);

        //     //console.log('tid='+appPane.getCurrentIndex());
        //     draw();


        //   }
        // });
        function draw() {

          var dt = that.time, sid = that.station.id, mode = that.layer;

          appPane.getApp().draw(that.station, dt, mode);
          util.setLocationHash({ sid: sid, tab: appPane.getCurrentIndex() });//编程注意：因为tid可以为空，所以用appPane.getCurrentIndex()


        }
        //取得地址栏中tab参数数值，如果无或不可识别，设为0
        function getTabOfLocationHash() {
          var tid = 1 * util.getLocationHash().tab;
          return isNaN(tid) ? 0 : tid;
        }
      }
      //获取当前的站号选择
      function getCurrentSid() {
        return $sidctrl = $('#sidctrl').val();
      }
      //获取当前的时次选择
      function getCurrentDt() {
        return $('#datectrl').val();
      }
      //获取当前图型选择
      function getCurrentDiagramMode() {
        return $('#diagram_mode').val();
      }
      /*
      function getTabApi(){
        return $("ul.css-tabs").data("tabs");
      }
      */
      //从dom中取得app's id
      function getAppIds() {
        var appIds = [], $dom = $("ul.css-tabs > li > a");
        for (var i = 0; i < $dom.length; i++) {
          appIds.push($dom[i].id);
        }
        return appIds;
      }
      function getSta(sid) {
        for (var i = 0, len = idItems.length; i < len; i++) {
          if (sid == idItems[i].id)
            return idItems[i];
        }
        return null;
      }
      //将部分指定时次未到的站“变灰”
      function disableAbs(dt) {
        var abs = HRS.abs[dt];
        $("#sidctrl option").removeAttr("disabled");
        $.each(abs, function (i, v) {
          var s = "#sidctrl option[value=" + v + "]";
          $(s).attr("disabled", "disabled");
        });
      }
      function setupHrsItems() {
        var items = [];
        var hrs = HRS.hrs;
        for (var i = 0, len = hrs.length; i < len; i++) {
          var id = hrs[i];
          var name = id.slice(0, 4) + '-' + id.slice(4, 6) + '-' + id.slice(6, 8) + ' ' + id.slice(8, 10) + ':00';
          items.push({ id: id, name: name });
        }
        console.log(items)
        return items;
      }
      // function setupIdsItems() {
      //   var items = [];
      //   var sid = util.getLocationHash().sid;
      //   if (sid == null)
      //     sid = '59280';//默认清远站
      //   for (var i = 0, len = stainfo.length; i < len; i++) { // stainfo 在 upper_stations.js 中定义
      //     var id, name, la, ar = stainfo[i];
      //     if (target.util.isOfArray(ar)) {
      //       id = ar[0];
      //       name = id;
      //       if (ar[1])
      //         name += ' ' + ar[1];
      //       if (ar[2])
      //         name += ' ' + ar[2];
      //       la = ar[3];
      //     }
      //     else {
      //       id = null,
      //         name = ar;
      //     }
      //     var o = { id: id, name: name, la: la };
      //     if (id == sid)
      //       o.current = true;
      //     items.push(o);
      //   }
      //   delete stainfo;
      //   return items;
      // }
      function setupHtmlSelectOptions(parentSelector, items) {
        var parent = $(parentSelector);
        parent.empty();
        var size = items.length;
        var optg = parent;
        $.each(items, function (i, item) {
          if (!item.id)
            optg = $('<optgroup></optgroup>').attr('label', item.name).appendTo(parent);
          else {
            var o = $('<option></option>').attr('value', item.id).text(item.name).appendTo(optg);
            if (item.current)
              o[0].selected = "selected"; // 不用o.attr("selected","selected")，避免在ie6出问题。但本处理并不合符规范，不过在多个浏览器下测试可用。
          }
        });
      }
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
