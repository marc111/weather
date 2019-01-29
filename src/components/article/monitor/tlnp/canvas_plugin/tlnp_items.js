export default function(target) {
  /* 
   * 项目: 【佛山气象试验版】
   * 库名: Tlnp items
   * 功能: 配置子项目(每一Pane)
   * 作者: 木土
   * 版本: 0.1
   * 日期: 2012-6-4
   * 修订: 
   */
  var util = target.util;
  var app_items = target.namespace("tmgram.app").items = {};
  app_items['tlnp_app'] = {
    //dataMnt:... 由系统推入
    _init: function() {},
    _draw: function(mode) {
      var stateCurve_orgin = 'lowest' // 表单 stateCurve_orgin;
      var idxOn = false // 表单 idx;
      var tlnp = getTlnp(this.dataMnt);
      tlnp.setOption({ diagram_mode: mode, plugin_opt: { StateCurve: { orgin: stateCurve_orgin }, Idx: { hide: !idxOn } } });
      tlnp.draw();
      return
      var ctx = document.getElementById("s_wind").getContext("2d");
      drawHodograph(this.dataMnt.getSeries('w&h'), ctx, 0, 0, 75, { no_label: true });
      //Singleton 模式
      function getTlnp(dataMnt) {
        return target.tmgram.tlnp("tlnp", dataMnt, { no_padding: false });
      }
 
      //是否显示指数插件
      function isIdxOn() {
        return $("input:[name=idx]:checkbox:checked").attr("checked");
      }
    }
  };
  app_items['hodograph_app'] = {
    //dataMnt:... 由系统推入
    _draw: function(mode) {
      var dataMnt = this.dataMnt;
      switch (getCurrentItem()) {
        case "vwprofile":
          vwprofile();
          break;
        default:
          hodograph();
      };

      function vwprofile() {
        var tlnp = getTlnp(dataMnt),
          dowithp = isYaxisLnp() ? 'ln' : 'linear';
        tlnp.setOption({ diagram_mode: mode, plugins: target.tmgram.PLUGIN_GROUP.V_WindSpeedProfile, plugin_opt: { CanvasReset: { dowithP: dowithp } } });
        tlnp.draw();
      }

      function hodograph() {
        var data = dataMnt.getSeries('w&h');
        var canv = document.getElementById("hodograph"),
          ctx = canv.getContext("2d");
        ctx.clearRect(0, 0, canv.width, canv.height);
        drawHodograph(data, ctx, 20, 20, 360, { usingP: isP_WindUnit() });
        target.wsymbol.drawWindPillar(ctx, data, {
          x: 755,
          y: 0,
          width: 150,
          height: 770,
          fWidth: 1
            //,wfcolor:	
            ,
          backgroundStyle: "rgba(255,255,555,1)",
          usingLnp: isYaxisLnp(),
          wfprofile: getCurrentWfProfile()
        });
      }
      //获取当前风分析图所用单位选择
      function isP_WindUnit() {
        return $("input:[name=wind_unit]:radio:checked").val() == "p";
      }
      //获取当前Y轴坐标方式选择
      function isYaxisLnp() {
        return $("input:[name=yaxis_lnp2]:radio:checked").val() == "ln";
      }
      //获取当前风速分布指示选择
      function getCurrentWfProfile() {
        return $("input:[name=wf_profile]:radio:checked").val();
      }
      //获取当前项选择
      function getCurrentItem() {
        return $("input:[name=item2]:radio:checked").val();
      }
      //Singleton 模式
      function getTlnp(dataMnt) {
        if (this._tlnp_hodograph == null)
          this._tlnp_hodograph = target.tmgram.tlnp("hodograph", dataMnt, { no_padding: false });
        return this._tlnp_hodograph;
      }
    }
  };
  app_items['height_app'] = {
    _draw: function(mode) {
      var tlnp = getTlnp(this.dataMnt),
        orgin = getCurrentStateCurveOrgin(),
        inv = getCurrentWhenInversion();
      switch (getCurrentItem()) {
        case "LCL":
          tlnp.setOption({ diagram_mode: mode, plugins: target.tmgram.PLUGIN_GROUP.LCL, plugin_opt: { StateCurve: { orgin: orgin }, LCL: { orgin: orgin } } });
          break;
        case "CCL":
          tlnp.setOption({ diagram_mode: mode, plugins: target.tmgram.PLUGIN_GROUP.CCL, plugin_opt: { CCL: { when_inversion: inv } } });
          break;
        case "SpecialTempLayer":
          tlnp.setOption({ diagram_mode: mode, plugins: target.tmgram.PLUGIN_GROUP.SpecialTempLayer, plugin_opt: {} });
          break;
        default:
          tlnp.setOption({ diagram_mode: mode, plugins: target.tmgram.PLUGIN_GROUP.P_H });
      }
      tlnp.draw();
      //Singleton 模式
      function getTlnp(dataMnt) {
        if (this._tlnp_height == null)
          this._tlnp_height = target.tmgram.tlnp("height", dataMnt, {});
        return this._tlnp_height;
      }
      //获取当前项选择
      function getCurrentItem() {
        return $("input:[name=item3]:radio:checked").val();
      }
      //获取当前状态曲线出发点选择
      function getCurrentStateCurveOrgin() {
        return $("input:[name=stateCurve_orgin3]:radio:checked").val();
      }
      //获取当前遇逆温处理方式选择
      function getCurrentWhenInversion() {
        return $("input:[name=when_inversion3]:radio:checked").val();
      }
    }
  };
  app_items['v-distribution_app'] = {
    _draw: function(mode) {
      var tlnp = getTlnp(this.dataMnt),
        dowithp = isYaxisLnp() ? 'ln' : 'linear';
      switch (getCurrentItem()) {
        case "q":
          tlnp.setOption({ diagram_mode: mode, plugins: target.tmgram.PLUGIN_GROUP.QCurve, plugin_opt: { CanvasReset: { dowithP: dowithp } } });
          break;
        case "rh":
          tlnp.setOption({ diagram_mode: mode, plugins: target.tmgram.PLUGIN_GROUP.RhCurve, plugin_opt: { CanvasReset: { dowithP: dowithp } } });
          break;
        case "V_3theta":
          tlnp.setOption({ diagram_mode: mode, plugins: target.tmgram.PLUGIN_GROUP.V_3theta, plugin_opt: { CanvasReset: { dowithP: dowithp } } });
          break;
        default:
          tlnp.setOption({ diagram_mode: mode, plugins: target.tmgram.PLUGIN_GROUP.VDISTRIBUTION, plugin_opt: { CanvasReset: { dowithP: dowithp } } });
      }
      tlnp.draw();
      //Singleton 模式
      function getTlnp(dataMnt) {
        if (this._tlnp_vd == null)
          this._tlnp_vd = target.tmgram.tlnp("v-distribution", dataMnt, { no_padding: false });
        return this._tlnp_vd;
      }
      //获取当前项选择
      function getCurrentItem() {
        return $("input:[name=item4]:radio:checked").val();
      }
      //获取当前Y轴坐标方式选择
      function isYaxisLnp() {
        return $("input:[name=yaxis_lnp4]:radio:checked").val() == "ln";
      }
    }
  };

  function drawHodograph(data, ctx, x, y, radius, opt) {
    var _opt = {
      x: x + radius,
      y: y + radius,
      radius: radius,
      interval: 3,
      fWidth: .5,
      fcolor: 'blue',
      backgroundStyle: "rgba(255,238,119,1)" //背景设为不透明
        //,usingP:true
        //,font:'40pt Calibri'
    };
    util.extend(_opt, opt || {});
    target.wsymbol.drawHodograph(ctx, data, _opt);
  }

}