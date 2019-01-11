function setsize() {
	document.getElementById("left").style.height = window.innerHeight - 110 + "px";
//	document.getElementById("leftswitch").style.height = window.innerHeight - 110 + "px";
}

function activetab(tabindex) {
	stopline();
	closedialog()
	if(tabindex == 0) {
		document.getElementById("headbar").children[0].className = "baractive";
		document.getElementById("headbar").children[1].className = "";
		document.getElementById("datatableHead").children[0].innerHTML = "工况模拟";
//		document.getElementById("headbar").innerHTML = "<th class='active' id='tab0' onclick='activetab(0)'><div>工况模拟</div></th><th id='tab1' class='unactive' onclick='activetab(1)'>信息查询</th>";
		document.getElementById("tab1inner").className = "close";
		document.getElementById("tab0inner").className = "";

		document.getElementById("timebarcontrol").className = "tbtransparent";
		for(var i = 0; i < tlines.length; i++) {
			tlines[i].material = line_material1;
		}
	} else {
		document.getElementById("headbar").children[0].className = "";
		document.getElementById("headbar").children[1].className = "baractive";
		document.getElementById("datatableHead").children[0].innerHTML = "信息查询";
//		document.getElementById("headbar").innerHTML = "<th class='active' id='tab0' onclick='activetab(1)'><div>信息查询</div></th><th id='tab1' class='unactive' onclick='activetab(0)'>工况模拟</th>";
		document.getElementById("tab0inner").className = "close";
		document.getElementById("tab1inner").className = "";

		document.getElementById("timebarcontrol").className = "close";

	}
	ymstop(true);
	if(tabindex != 0) {
		gkdatas[currentgk].visible = false;
	}
}

function listchage(listindex) {
	stopline();
	closedialog()
	if(currenttownindex != null) {
		showtownlist(currenttownindex)
	}
	var list = document.getElementById("dialoglist")
	for(var i = 0; i < list.childNodes.length; i++) {
		var nodeid = list.childNodes[i].id
		if(nodeid != undefined) {
			if(nodeid.substr(0, 8) == "listnode") {
				if(nodeid.substr(8) == listindex) {
					if(list.childNodes[i].className == "") {
						list.childNodes[i].className = "listactive";
					} else {
						list.childNodes[i].className = "";
					}
				} else {
					list.childNodes[i].className = "";
				}
			}
		}
	}
}
var currenttargets = null;
var currentsprites = null;
var currenttownindex = null;

function showtownlist(index, name) {
	closedialog()
	stopline();
	var open = false;
	var uls = document.getElementById("dialoglist").getElementsByTagName("ul");
	var allclose = false;
	for(var i = 0; i < uls.length; i++) {
		if(uls[i].id.substr(0, 8) == "townlist") {
			if(uls[i].id == "townlist" + index) {
				if(uls[i].className == "") {
					uls[i].className = "activetarget";
					currenttownindex = index;
					open = true;
					zoomto(towncamerpoints[name]);
					currentsprites = sprites[index];
				} else {
					uls[i].className = "";
					currenttargets = null;
					currentsprites = null;
					allclose = true;
					currenttownindex = null;
				}

			} else {
				uls[i].className = "";
			}
		}
	}
	for(var townindex in sprites) {
		if(townindex != index || allclose) {
			for(var s in sprites[townindex]) {
				for(var s in sprites[townindex]) {
					sprites[townindex][s].sprite.visible = false;
				}
			}
		} else {
			for(var s in sprites[townindex]) {
				sprites[townindex][s].sprite.visible = true;
			}
		}
	}
}

function loadpdf(info) {
	for(var i = 0; i < info.pathcount; i++) {
		alert(info["path" + i]);
	}
	//  document.getElementById("dialogframe").src = info.path + info.name;
}
var leftclosed = false;

function leftclose() {
	leftclosed = !leftclosed;
	if(!leftclosed) {
		document.getElementById("left").style.left = 0;
		document.getElementById("switchbtImg").src = "css/image/leftReadL.png";
//		document.getElementById("left").className = "leftdialogsclose";
	} else {
		document.getElementById("left").style.left = "-320px";
		document.getElementById("switchbtImg").src = "css/image/leftReadR.png";
//		document.getElementById("left").className = "leftdialogs";
	}
}

function webBack() {
	window.history.back();
}

function closedialog() {
	var dialog = document.getElementById("dialogframe");
	dialog.className = "close";
	dialog.src = "about:blank";
}

function mousehovertarget(townindex, index) {
	sprites[townindex][index].sprite.material = sprites[townindex][index].material2;
}

function mouseouttarget(townindex, index) {
	sprites[townindex][index].sprite.material = sprites[townindex][index].material1;
}
var showlevel = false;

function showlevelchange() {
	showlevel = document.getElementById("showlevel").checked;
	usingtimebar = true;
	ymupdate();
	usingtimebar = false;
}

function showvideo(index) {
	var dialog = document.getElementById("dialogframe");
	dialog.className = "bdialog";
	dialog.src = "videopage.htm?id=" + index;
}

function showlocationlist() {
	var list = document.getElementById("locationlist");
	if(list.className == "close") {
		list.className = "locationlist";
	} else {
		list.className = "close";
	}
	document.getElementById("helpdialog").className = "close";
	document.getElementById("flylist").className = "close";
	stopline();
	closedialog()
}

function showhelp() {
	var help = document.getElementById("helpdialog");
	if(help.className == "close") {
		help.className = "help";
	} else {
		help.className = "close";
	}
	document.getElementById("locationlist").className = "close";
	document.getElementById("flylist").className = "close";
	stopline();
	closedialog()
}

function showflylist() {
	var list = document.getElementById("flylist");
	if(list.className == "close") {
		list.className = "flyline";
	} else {
		list.className = "close";
		stopline();
		closedialog()
	}
	document.getElementById("locationlist").className = "close";
	document.getElementById("helpdialog").className = "close";
}

function showflylines() {
	var droplist = document.getElementById("linelistdrop");
	if(droplist.className == "close") {
		droplist.className = "";
	} else {
		droplist.className = "close";
	}
}

function showdw(id) {
	stopline();
	var dialog = document.getElementById("dialogframe");
	dialog.className = "dialog";
	dialog.src = "dw.htm#" + id;
}

function showsz(id) {
	stopline();
	var dialog = document.getElementById("dialogframe");
	dialog.className = "dialog";
	dialog.src = "sz.htm#" + id;
}

function showcz(id) {
	stopline();
	var dialog = document.getElementById("dialogframe");
	dialog.className = "dialog";
	dialog.src = "cz.htm#" + id;
}

function showdpz(id) {
	stopline();
	var dialog = document.getElementById("dialogframe");
	dialog.className = "dialog";
	dialog.src = "dpz.htm#" + id;
}
var currentgk = "TNT";

function showgk() {
	stopline();
	var dialog = document.getElementById("dialogframe");
	dialog.className = "bdialog";
	dialog.src = "gk.htm?id=" + currentgk;
}

function maxgk() {
	var dialog = document.getElementById("dialogframe");
	dialog.className = "fdialog";
}

function unmaxgk() {
	var dialog = document.getElementById("dialogframe");
	dialog.className = "bdialog";
}

function loadgklast(gkname, onProgress, onError) {

	var gkmtlLoader = new THREE.MTLLoader();
	gkmtlLoader.setPath('models/gk/' + gkname + '/');
	gkmtlLoader.setBaseUrl('models/gk/' + gkname + '/');
	gkmtlLoader.load(gkname + '.mtl', function(materials) {

		materials.preload();

		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials(materials);
		objLoader.setPath('models/gk/' + gkname + '/');
		objLoader.load(gkname + '.obj', function(object) {
			for(var i = 0; i < object.children.length; i++) {
				var child = object.children[i];
				child.material.transparent = true;
			}
			scene.add(object);
			if(gkname != currentgk) {
				object.visible = false;
			}
			object.position.y = 245;
			gkdatas[gkname] = object;

		}, onProgress, onError);

	});

}