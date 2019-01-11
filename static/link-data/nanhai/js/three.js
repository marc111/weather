var barwidth = 500.0;

function tobar(count, current) {
	var currentwidth = Math.floor((current * 1.0) / (count - 1) * barwidth) + "px";
	document.getElementById("currenttimebar").style.width = currentwidth;
}

var usingtimebar = false;
var timebarmousehold = false;

function timebarmousedown(ev) {
	gkdatas[currentgk].visible = false;
	usingtimebar = true;
	timebarmousehold = true;
	m_clientX = ev.clientX - document.getElementById("timebarbackground").offsetLeft - document.getElementById("timebar").offsetLeft;
	ctime = Math.floor((times.length - 1) * (m_clientX / barwidth));
	if(ctime < 0) {
		ctime = 0;
	}
	if(ctime >= times.length) {
		ctime = times.length - 1
	}
	if(!playing) {
		ymupdate();
	}
}

function timebarmouseup() {

	timebarmousehold = false;
	usingtimebar = false;
}

function barto(ev) {
	if(timebarmousehold) {
		m_clientX = ev.clientX - document.getElementById("timebarbackground").offsetLeft - document.getElementById("timebar").offsetLeft;
		ctime = Math.floor((times.length - 1) * (m_clientX / barwidth));
		if(ctime < 0) {
			ctime = 0;
		}
		if(ctime >= times.length) {
			ctime = times.length - 1
		}
		if(!playing) {
			ymupdate();
		}
	}
}

function ymslowdown() {
	if(speed < 10) {
		speed++;
	}
}

function ymspeedup() {
	if(speed > 1) {
		speed--;
	}
}
var playing = false;

function ymstop(tozero) {
	if(tozero) {
		ctime = 0;
		ymupdate();
		playing = false;
		gkdatas[currentgk].visible = true;
	} else {
		gkdatas[currentgk].visible = false;
		playing = !playing;
	}
	if(!playing) {
		document.getElementById("tbp").className = "tbplay";
	} else {
		document.getElementById("tbp").className = "";
	}
}

function jumpto() {
	ctime = document.getElementById("jumptotext").value * 60 / datadtime;
	ymupdate();
	playing = false;
}

var toolvisible = true

function showtool() {
	toolvisible = !toolvisible
	var toolbar = document.getElementById("toolbar");
	if(toolvisible) {
		toolbar.className = "tool";
		document.getElementById("switchtip").innerHTML = "隐 藏";
	} else {
		toolbar.className = "toolclose";
		document.getElementById("switchtip").innerHTML = "展 开";
	}
}

function gettime(time) {
	var timestring;
	var h = Math.floor(time / 60);
	var d = Math.floor(h / 24);
	h = h % 24;
	time = time % 60;
	if(time < 10) {
		time = "0" + time;
	}
	if(h < 10) {
		h = "0" + h;
	}
	timestring = d + "天" + h + "小时" + time + "分";
	return timestring;
}