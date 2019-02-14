	var phy = fs121.phy;
	var list_t=[0,0.5,1.0,1.5,2.0,2.5,3.0,3.5,4.0,4.5]; //列首数值
	var ar_p=[[1000,45,-25],[900,40,-30],[850,35,-40],[800,30,-40],[700,20,-40],[600,15,-45],[500,10,-50],[400,0,-55],[300,-10,-65],[250,-20,-70],[200,-25,-70]];//[气压,起始温度,结束温度]
	//var ar_p=[[1000,45,-25],[900,40,-30]];//[气压,起始温度,结束温度]
	var timer_a=fs121.util.timer(),timer_c=fs121.util.timer();	//总计时器，运算计时器
	var cnt=0;//运算次数
	var e_methods={'Goff-Gratch(1957)':phy.e_GoffGratch_1957,Magnus:phy.e_Magnus,'改进Magnus':phy.e_Magnus_improved,Emanuel:phy.e_Emanuel,Wexler:phy.e_Wexler,'WMO(2008)':phy.e_WMO_2008,'查算表公式':phy.e_table_1980/*,'雷雨顺公式':phy.e*/};
	//计算数值
	function calc(t,p){
		var T=phy.T(t);
		var s="";
		var q0,i=0;
		for(var e in e_methods){
			var q=phy.q(e_methods[e](T),p)*1000;
			if(i++==0){
				q0=q;
				s+=q.toFixed(2);
			}
			else{	
				var delt=(q-q0).toFixed(2);
				if(delt==0.0)
					delt=0;
				s+="<br/>"+delt;
			}
			cnt++;
		}
		return s;
	}
	
	function table_html(p,t1,t2){
		var s="<table border='1' cellpadding='1'>"
		s+="<caption>p="+p+"hPa</caption>";
		s+="<thead><tr><th nowrap>△td→<br/>td↓</th>";
		for(var i=0,len=list_t.length;i<len;i++){
			s+="<th>"+list_t[i]+"</th>";
		}
			s+="<th nowrap>采用的E公式</th>";
		s+="</tr></thead><tbody>";
		for(var t=t1;t>=t2;t-=5){
			s+="<tr><td>"+t+"</td>";
			for(var i=0,len=list_t.length;i<len;i++){
				timer_c.resume();
				var v=calc(t+list_t[i],p);
				timer_c.pause();
				s+="<td>"+v+"</td>";
			}
			var j=0;
			s+="<td nowrap>";
			for(var e in e_methods){
				if(j++ >0)
					s+="<br/>";
				s+=e;
			}
			s+="</td></tr>";
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
