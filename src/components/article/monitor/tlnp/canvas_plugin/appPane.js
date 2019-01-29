export default function(target) {
  //代表Pane内app（同时也是app管理器）的构造函数
  function AppPane(appIds) {
    return {
      _apps: [],
      _fileMnt: FileMnt(),
      dataMnt: target.data.upper(),
      _appIds: appIds,
      _currentIndex: 0,
      _toChange: true //指示切换到本tab时是否需要重绘
        ,
      id: null //需要与对应Pane的dom元素id相配
        ,
      register: function(id, opt) {
        var obj = Object.create(this);
        obj.id = id;
        target.util.extend(obj, opt || {});
        if (obj._init)
          obj._init();
        var i = 0;
        for (; i < this._appIds.length; i++) {
          if (this._appIds[i] == id) {
            this._apps[i] = obj;
            break;
          }
        }
        if (i == this._appIds.length)
          throw new Error("No tab'id is equal '" + id + "'.");
        return obj;
      },
      setCurrentIndex: function(i) {
        this._currentIndex = (i < 0 || i > this._apps.length) ? 0 : i;
      },
      getCurrentIndex: function() {
        return this._currentIndex;
      },
      getApp: function(idx) {
        console.log(this)
        return idx == undefined ? this._apps[this._currentIndex] : this._apps[idx];
      },
      toChange: function() { //将当前app置为准备更改状态
        this.getApp()._toChange = true;
      },
      toChangeAll: function() { //将所有app置为准备更改状态
        for (var i = 0; i < this._apps.length; i++)
          this._apps[i]._toChange = true;
      },
      _draw: null //function() 绘制pane中的内容。继承对象必须覆盖
        ,
      draw: function(sta, dt, mode) {
        if (this._toChange) {
          var that = this,
            file = pathfile(sta.id, dt);
          // this._fileMnt.get(file,function(dat){
          // 	that.dataMnt.setData(dat,sta);
          // 	that._draw(mode);
          // 	//console.log('draw picture: '+file+' on '+that.id);
          // });
          var dat = {
            "sign": [
              [1013, 0, 11.6, 8.8, 45, 2],
              [991, 1, 14.2, 9.9, null, null],
              [919, 101, null, null, 135, 3],
              [913, 2, 9.6, 7.8, null, null],
              [875, 3, 10.2, -0.8, null, null],
              [865, 4, 10.2, 3.2, null, null],
              [855, 5, 9.4, 7.9, null, null],
              [843, 102, null, null, 230, 6],
              [775, 103, null, null, 230, 8],
              [748, 6, 0.4, -0.8, null, null],
              [740, 7, 5.4, -7.6, null, null],
              [719, 8, 9.6, -15.4, null, null],
              [713, 104, null, null, 280, 15],
              [643, 9, 7, -22, null, null],
              [627, 105, null, null, 270, 22],
              [574, 106, null, null, 265, 19],
              [549, 107, null, null, 270, 18],
              [500, 108, null, null, 280, 20],
              [446, 11, -10.9, -34.9, null, null],
              [363, 109, null, null, 255, 28],
              [283, 12, -35.7, -50.7, null, null],
              [263, 111, null, null, 270, 35],
              [222, 112, null, null, 255, 36],
              [199, 113, null, null, 245, 36],
              [179, 13, -56.7, -70.7, null, null],
              [155, 114, null, null, 265, 29],
              [125, 115, null, null, 245, 26],
              [117, 14, -76.7, null, null, null],
              [105, 15, -77.9, null, null, null],
              [100, 16, -79.7, null, null, null],
              [95.5, 101, null, null, 260, 14],
              [72.8, 102, null, null, 250, 8],
              [72.5, 1, -83.3, null, null, null],
              [59.7, 103, null, null, 280, 6],
              [55.2, 104, null, null, 275, 5],
              [53.9, 2, -77.1, null, null, null],
              [51.9, 3, -71.9, null, null, null],
              [48.4, 105, null, null, 270, 6],
              [46.4, 4, -71.3, null, null, null],
              [40.5, 5, -62.9, null, null, null],
              [36.9, 106, null, null, 305, 8],
              [30.8, 6, -62.1, null, null, null],
              [23, 7, -50.7, null, null, null],
              [23, 107, null, null, 275, 16],
              [15.8, 108, null, null, 280, 20],
              [14.2, 8, -52.1, null, null, null],
              [11.8, 109, null, null, 265, 25],
              [10.2, 9, -43.9, null, null, null]
            ],
            "spec": [
              [1013, 99, 11.6, 8.8, 45, 2],
              [222, 77, null, null, 255, 36],
              [100, 880, -79.7, null, 250, 17]
            ],
            "isob": [
              [1000, 191, 13.6, 9.9, 60, 3],
              [925, 846, 10.4, 8.1, 130, 3],
              [850, 1550, 9, 7.5, 225, 6],
              [700, 3140, 9, -18, 280, 16],
              [500, 5860, -5.3, -32.3, 280, 20],
              [400, 7570, -17.5, -37.5, 260, 27],
              [300, 9670, -31.9, -48.9, 260, 31],
              [250, 10930, -41.5, -56.5, 265, 35],
              [200, 12410, -51.9, -66.9, 245, 36],
              [150, 14220, -65.9, null, 260, 28],
              [100, 16580, -79.7, null, 250, 17],
              [70, 18590, -82.1, null, 255, 7],
              [50, 20520, -70.5, null, 270, 6],
              [30, 23630, -61.3, null, 285, 11],
              [20, 26230, -52.5, null, 270, 20]
            ],
            "surf": [1023.9000244140625, 0, 11.5, 9.199999809265137, 110, 1]
          }

          that.dataMnt.setData(dat, sta);
          that._draw(mode);
        }
        this._toChange = false;

        function pathfile(sid, dt) {
          return '/dat/upper/' + 'upper-' + dt + '-' + sid + '.js';
        }
      }
    };

    function FileMnt(path) {
      return {
        _old_data: null,
        _old_file: null,
        get: function(file, fn) {
          if (file == this._old_file) {
            fn(this._old_data);
          } else {
            //console.log('load file:'+file);
            var that = this;
            $.getJSON(file, function(dat) {
              that._old_data = dat;
              that._old_file = file;
              fn(dat);
            });
          }
        }
      };
    }
  }
  target.namespace("tmgram.app").AppPane = AppPane;
}