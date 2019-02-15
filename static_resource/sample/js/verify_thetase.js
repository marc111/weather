	var phy = fs121.phy;
	var list_t_td=ar_t_td(); //列首数值
	var ar_p=[[1050,-40,40],[1000,-20,40],[900,-30,31],[850,-39,30],[800,-42,26],[700,-44,20],[600,-46,15],[500,-50,10],[400,-55,0],[300,-65,-10],[250,-70,-20]];//[气压,起始温度,结束温度]
	//var ar_p=[[1050,-40,40],[1000,-20,40],[900,-30,31]];
	var timer_a=fs121.util.timer(),timer_c=fs121.util.timer();	//总计时器，运算计时器
	var cnt=0;//运算次数
	//制作t-td列表: 0,0.2,0.4,...,4.8,5,6,7,...,36
	function ar_t_td(){
		var a=[];
		for(var i=0;i<5;i+=.2)
			a.push(i.toFixed(1));
		for(var i=5;i<=36;i+=1)
			a.push(i);
		return a;
	}
	function table_html(p,t1,t2){
		var s="<table border='1' cellpadding='1'>"
		s+="<caption>p="+p+"hPa</caption>";
		s+="<thead><tr><th nowrap>t-td→<br/>t↓</th>";
		for(var i=0,len=list_t_td.length;i<len;i++){
			s+="<th>"+list_t_td[i]+"</th>";
		}
		s+="</tr></thead><tbody>";
		for(var t=t1;t<=t2;t+=0.5){
			s+="<tr><td>"+t+"</td>";
			for(var i=0,len=list_t_td.length;i<len;i++){
				timer_c.resume();
				var v=calc(t,t-list_t_td[i],p);
				timer_c.pause();
				cnt++;
				s+="<td>"+v+"</td>";
			}
			s+="</tr>";
		}
		s+="</tbody></table>";
		return s;
	}
	function print_usetime(){
		document.getElementById("timer_a").innerHTML=timer_a.sum();
		document.getElementById("timer_c").innerHTML=timer_c.sum();
		document.getElementById("cnt").innerHTML=cnt;
	}
	function append(html){
		var div=document.createElement("div");
		div.innerHTML=html;
		document.getElementsByTagName("body")[0].appendChild(div);
	}
	window.onload=function(){
		timer_a.start();
		timer_c.start();
		timer_c.pause();
		print_usetime();
		for(var i=0,len=ar_p.length;i<len;i++){
			var a=ar_p[i];
			append(table_html(a[0],a[1],a[2]));
			print_usetime();
		}
		timer_c.stop();
		timer_a.stop();
	}	
