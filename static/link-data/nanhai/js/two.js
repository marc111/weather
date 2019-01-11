var cpoints = []; //定位点集合
var zoomptween; //位置定点
var zoomrtween; //角度定点
var lines = []; //飞行路线集合
var ptween = null; //位置动画
var rtween = null; //角度动画
var lastptween; //最后一帧位置动画
var lastrtween; //最后一帧角度动画
var time = 0; //动画进度
var ptime = 0; //上一帧动画时间
var dtime = 0; //动画时间差
var linespeed = 1; //动画速度
var model = Object.freeze({ "fly": 1, "animate": 2, "zoom": 3 }); //当前模式
var currentmodel = model.fly;
//定点
function camerapoint(ppx, ppy, ppz, prx, pry) {
	this.px = ppx;
	this.py = ppy;
	this.pz = ppz;
	this.rx = prx;
	this.ry = pry;
}
//动画路径关键帧
function Key_Frame(mptarget, mrtarget, mtime) {
	this.ptarget = mptarget;
	this.rtarget = mrtarget;
	this.time = mtime;
}
var state = Object.freeze({ "play": 1, "pause": 2, "stop": 3 });
var currentstate = state.stop;

function cameraanimate() {
	var now = window.performance.now();
	dtime = now - ptime;
	time = time + dtime * linespeed;
	// document.getElementById("searchtext").value = time;
	TWEEN.update(time);

}
var currentflyindex = 0

function playline(flylists, index) {
	currentflyindex = index
	flylist = flylists[index];
	tweenstop();
	settween(flylist.line);
	document.getElementById("currentline").innerHTML = flylist.name;
	tweenstart();
	currentmodel = model.animate;
	currentstate = state.play;
	document.getElementById("linelistdrop").className = "close"
	document.getElementById("playbt").className = "playstyle";
	//            document.getElementById("playbttip").innerHTML = "暂 停";
}

function restartline() {
	tweenstop();
	tweenstart();
}

function linespeedup() {
	if(linespeed < 8) {
		linespeed = 2 * linespeed;
	}
}

function linespeeddown() {
	if(linespeed > 1 / 8) {
		linespeed = linespeed / 2.0;
	}
}

function pauseline() {
	if(currentstate == state.play) {
		currentstate = state.pause
		document.getElementById("playbt").className = "playstyle2";
		//                document.getElementById("playbttip").innerHTML = "开 始";
	} else if(currentstate == state.pause) {
		currentstate = state.play;
		document.getElementById("playbt").className = "playstyle";
		//                document.getElementById("playbttip").innerHTML = "暂 停";
	} else {
		playline(lines, currentflyindex);
	}
}

function stopline() {
	currentstate = state.stop;
	tweenstop();
	linespeed = 1;
	currentmodel = model.fly;
	document.getElementById("playbt").className = "playstyle2";
}

function setlines() {
	var line = [];
	line.push(new Key_Frame({ x: 36728, y: 3952, z: 48625 }, { x: Math.PI * 1.85, y: Math.PI * 1.347 }, 0));
	line.push(new Key_Frame({ x: 26983, y: 3388, z: 44098 }, { x: 5.71, y: 3.53 }, 5500));
	line.push(new Key_Frame({ x: 25532, y: 3382, z: 30965 }, { x: 5.86, y: 4.027 }, 8000));
	line.push(new Key_Frame({ x: 19116, y: 2989, z: 22207 }, { x: 5.9, y: 4.357 }, 9000));
	line.push(new Key_Frame({ x: 19116, y: 2989, z: 22207 }, { x: 5.9, y: 4.357 }, 1000));

	lines.push({ line: line, name: "沿江飞行" });

	var line2 = [];
	line2.push(new Key_Frame({ x: 13703, y: 11386, z: 54048 }, { x: Math.PI * 1.7, y: Math.PI * 0.9 }, 0));
	line2.push(new Key_Frame({ x: 22785, y: 12697, z: 31877 }, { x: Math.PI * 1.7, y: Math.PI * 0.9 }, 24000));
	line2.push(new Key_Frame({ x: 25385, y: 12697, z: 23767 }, { x: Math.PI * 1.7, y: Math.PI * 2 }, 15000));
	line2.push(new Key_Frame({ x: 13703, y: 11386, z: 40048 }, { x: Math.PI * 1.7, y: Math.PI * 2 }, 24000));
	line2.push(new Key_Frame({ x: 13703, y: 11386, z: 40048 }, { x: Math.PI * 1.7, y: 0 }, 0));
	line2.push(new Key_Frame({ x: 13703, y: 11386, z: 54048 }, { x: Math.PI * 1.7, y: Math.PI * 0.9 }, 15000));
	lines.push({ line: line2, name: "高空飞行" });
}

function settween(flylist) {
	for(var i = 0; i < flylist.length; i++) {
		if(i == 0) {
			ptween = new TWEEN.Tween(camera.position);
			ptween.to(flylist[i].ptarget, flylist[i].time);
			lastptween = ptween;

			rtween = new TWEEN.Tween(pr);
			rtween.to(flylist[i].rtarget, flylist[i].time);
			lastrtween = rtween;
		} else {
			var ptween2 = new TWEEN.Tween(camera.position);
			ptween2.to(flylist[i].ptarget, flylist[i].time);
			lastptween.chain(ptween2);
			lastptween = ptween2;
			if(i == flylist.length - 1) {
				lastptween.chain(ptween);
			}

			var rtween2 = new TWEEN.Tween(pr);
			rtween2.to(flylist[i].rtarget, flylist[i].time);
			lastrtween.chain(rtween2);
			lastrtween = rtween2;
			if(i == flylist.length - 1) {
				lastrtween.chain(rtween);
			}
		}
	}
}

function tweenstart() {
	ptween.start();
	rtween.start();
	var x = camera.position.x;
	for(time = 0; x == camera.position.x; time++) {
		x = camera.position.x;
		TWEEN.update(time);
	}
	ptime = window.performance.now();
}

function tweenstop() {
	if(ptween != null) {
		ptween.stop();
		rtween.stop();
	}
	time = 0;
}

function setpoints() {
	var cpoint = new camerapoint(20209, 15138, 58122, 5.646, 3.2);
	cpoints.push(cpoint);
	cpoint = new camerapoint(22226, 14046, 35942, 5.54, 3.146);
	cpoints.push(cpoint);
	cpoint = new camerapoint(14267, 12452, 39529, 5.511, 3.092);
	cpoints.push(cpoint);
	cpoint = new camerapoint(40642, 7069, 41669, 5.686, 2.986);
	cpoints.push(cpoint);
	cpoint = new camerapoint(24408, 7499, 59987, 5.55, 3.342);
	cpoints.push(cpoint);

	cpoint = new camerapoint(17762, 7080, 53381, 5.681, 3.155);
	cpoints.push(cpoint);
	cpoint = new camerapoint(35586, 7876, 30047, 5.531, 3.136);
	cpoints.push(cpoint);
	cpoint = new camerapoint(38648, 9346, 23264, 5.569, 3.243);
	cpoints.push(cpoint);
	cpoint = new camerapoint(18620, 10146, 35277, 5.63, 3.243);
	cpoints.push(cpoint);
	cpoint = new camerapoint(20527, 6575, 45488, 5.738, 3.2);
	cpoints.push(cpoint);
	cpoint = new camerapoint(15906, 12078, 55023, 5.41, 3.2);
	cpoints.push(cpoint);
}

function zoomto(cpoint) {
	if(currentmodel == model.fly) {
		document.getElementById("locationlist").className = "close";
		var x = cpoint.px;
		var y = cpoint.py;
		var z = cpoint.pz;
		var x2 = cpoint.rx;
		var y2 = cpoint.ry;
		if(x != camera.position.x || y != camera.position.y || z != camera.position.z || x2 != pr.x || y2 != pr.y) {
			zoomptween = new TWEEN.Tween(camera.position);
			zoomptween.to({ x: cpoint.px, y: cpoint.py, z: cpoint.pz }, 200).onComplete(stopzoom);
			zoomrtween = new TWEEN.Tween(pr);
			zoomrtween.to({ x: cpoint.rx, y: cpoint.ry }, 100);
			currentmodel = model.zoom;
			zoomptween.start();
			zoomrtween.start();
			x = camera.position.x;
			y = camera.position.y;
			z = camera.position.z;
			x2 = pr.x;
			y2 = pr.y;
			for(time = 0; x == camera.position.x && y == camera.position.y && z == camera.position.z && x2 == pr.x && y2 == pr.y; time++) {
				x = camera.position.x;
				TWEEN.update(time);
			}
			ptime = window.performance.now();
		}
	}
}

function stopzoom() {
	currentmodel = model.fly;
	zoomptween.stop();
	zoomrtween.stop();
}