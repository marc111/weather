	var phy = fs121.phy;
	var timer=fs121.util.timer;
	var list_t=(function(){//列首数值
		var a=[];
		for(var i=0;i<=5.1;i+=.5){
			a.push(i.toFixed(1)*1);
		}
		return a;
	}());
	var ar_p=[[1025,40,-25],[1000,40,-25],[975,35,-30],[950,35,-30],[925,30,-35],[900,30,-35]];//[气压,起始温度,结束温度]
	var cnt=0;//运算次数
	var e_methods={'交点法':phy.LCL_intersection,'近似+迭代':phy.LCL,'迭代':phy.LCL_iteration,'近似':phy.LCL_appro};
	var timers={'交点法':timer(),'近似+迭代':timer(),'迭代':timer(),'近似':timer()};
	var timer_a=timer();	//总计时器，运算计时器
	//计算数值
	function calc(t,td,p){
		var T=phy.T(t);
		var Td=phy.T(td);
		var s="";
		var lcl0,i=0;
		for(var e in e_methods){
			var timer_c=timers[e];
			timer_c.resume();
			var lcl=e_methods[e](T,Td,p).p;
			timer_c.pause();
			if(i++==0){
				lcl0=lcl;
				s+=lcl.toFixed(1);
			}
			else{	
				var delt=(lcl-lcl0).toFixed(1);
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
		s+="<thead><tr><th nowrap>t-td→<br/>t↓</th>";
		for(var i=0,len=list_t.length;i<len;i++){
			s+="<th>"+list_t[i]+"</th>";
		}
			s+="<th nowrap>算法</th>";
		s+="</tr></thead><tbody>";
		for(var t=t1;t>=t2;t-=1){
			s+="<tr><td>"+t+"</td>";
			for(var i=0,len=list_t.length;i<len;i++){
				var v=calc(t,t-list_t[i],p);
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
		var s="";
		for(var label in timers){
			var timer_c=timers[label];
			s+=label+"："+timer_c.sum()+"ms，";
		}
		document.getElementById("timer_c").innerHTML=s;
		document.getElementById("cnt").innerHTML=cnt;
	}
	function append(html){
		var div=document.createElement("div");
		div.innerHTML=html;
		document.getElementsByTagName("body")[0].appendChild(div);
	}
	window.onload=function(){
		timer_a.start();
		for(var label in timers){
			var timer_c=timers[label];
			timer_c.reset();
		}
		print_usetime();
		for(var i=0,len=ar_p.length;i<len;i++){
			var a=ar_p[i];
			append(table_html(a[0],a[1],a[2]));
			print_usetime();
		}
		timer_a.stop();
	}	
