var sdata={isob:[
	[1004,,22.4,18.9,,],
	[1000,48,22.2,18.8,265,4],
	[974,,20.2,16.7,,],
	[908,,20.8,4.8,,],
	[850,1449,16.6,0.6,210,7],
	[820,,14.0,0,,],
	[798,,13.2,-2.8,,],
	[700,3070,4.6,-7.4,280,14],
	[600,,-6.1,-12.1,,],
	[500,5710,-15.9,-22.9,275,17],
	[451,,-19.7,-30.7,,],
	[400,7360,-25.3,-37.3,275,23],
	[343,,-31.9,-43.9,,],
	[300,9400,-38.5,-45.5,255,51],
	[298,,-39.1,-46.1,,],
	[267,,-39.3,-48.3,,],
	[250,10650,-41.9,-51.9,255,52],
	[236,,-44.5,-54.5,,],
	[200,12140,-48.7,-57.7,255,58],
	[150,14010,-55.7,-63.7,250,48],
	[112,,-57.7,,,],
	[100,16560,-59.7,,235,26],
	[70,18770,-63.3,,270,16],
	[64,,-61.1,,,],
	[50,20350,-62.7,,320,8],
	[40,,-57.1,,,],
	[30,24070,-56.9,,305,3]]
};
function draw(i) {
	var timer_a=fs121.util.timer();	//总计时器
	timer_a.start();
	if(fs121.util.canvasSupport()){
		drawTlnp(i);
	}
	else{
		$(".sample").hide();
		$("#nocanvas").show();
	}
	timer_a.stop();
	$("#timer_a").text(timer_a.sum()+"ms");
	drawData();
}

function table_html(series,caption){
	var s="<table border='1' cellpadding='1'>";
	s+="<caption>"+caption+"</caption>";
	s+="<thead><tr><th>P</th><th>H</th><th>T</th><th>Td</th><th>wd</th><th>wf</th></tr></thead><tbody>";
	var idx=[0,1,2,3,4,5],len2=idx.length;
	for(var i=0,len=series.length;i<len;i++){
		s+="<tr>";
		var ar=series[i];
		for(var j=0;j<len2;j++){
			var v=ar[idx[j]];
			s+="<td>";
			s+= v!=null? v : "<br/>";
			s+="</td>";
		}
		s+="</tr>";
	}
	s+="</tbody></table>";
	return s;
}

function drawTlnp(i) {
	var dataMnt=fs121.data.upper(),diagram;
	dataMnt.setData(sdata,{id:"58238",name:"58238 南京 NANJING",la:31.93});
	if(i==2){
  	diagram=fs121.tmgram.tlnp("windprofile",dataMnt,{diagram_mode:'ema50',plugins:fs121.tmgram.PLUGIN_GROUP.V_WindSpeedProfile});
  	diagram.draw();
  	diagram=fs121.tmgram.tlnp("V_3theta",dataMnt,{diagram_mode:'ema50',plugins:fs121.tmgram.PLUGIN_GROUP.V_3theta});
  	diagram.draw();
		drawHodograph();
		drawWindPillar();
  }
  else{
  	diagram=fs121.tmgram.tlnp("tlnp_ema200",dataMnt,{diagram_mode:'ema200'});
  	diagram.draw();
  	diagram=fs121.tmgram.tlnp("tlnp_ema50",dataMnt).setOption({diagram_mode:'ema50',no_isolabel:true,no_padding:false,plugin_opt:{DryAdiabatLabel:{hide:true},MoistAdiabatLabel:{hide:true},QsLabel:{hide:true},Idx:{hide:true}}});
  	diagram.draw();
  	diagram=fs121.tmgram.tlnp("p-h_curve",dataMnt,{diagram_mode:'ema200',plugins:fs121.tmgram.PLUGIN_GROUP.P_H});
  	diagram.draw();
  	diagram=fs121.tmgram.tlnp("LCL",dataMnt,{diagram_mode:'ema50',plugins:fs121.tmgram.PLUGIN_GROUP.LCL});
  	diagram.draw();
  	diagram=fs121.tmgram.tlnp("CCL",dataMnt,{diagram_mode:'ema200',plugins:fs121.tmgram.PLUGIN_GROUP.CCL});
  	diagram.draw();
  	diagram=fs121.tmgram.tlnp("SpecialTempLayer",dataMnt,{diagram_mode:'ema50',plugins:fs121.tmgram.PLUGIN_GROUP.SpecialTempLayer});
  	diagram.draw();
  }
}
function drawHodograph(){
	var canvas = document.getElementById('wind1');
	var ctx = canvas.getContext("2d");
	var x=35,y=35,radius=250,ws=[];
	for(var i=0;i<sdata.isob.length;i++){
		var w=sdata.isob[i];
		if(w[1]!=null && w[4]!=null && w[5]!=null)
			ws.push(w[4],w[5],w[1],w[0]);
	}
	fs121.wsymbol.drawHodograph(ctx,ws,{
			x:x+radius,
			y:y+radius,
			radius:radius,
			interval:3,
			fWidth:.5,
			fcolor:'blue'
		});
}
function drawWindPillar(){
	var canvas = document.getElementById('wind2');
	var ctx = canvas.getContext("2d");
	var x=0,y=0,ws=[];
	for(var i=0;i<sdata.isob.length;i++){
		var w=sdata.isob[i];
		if(w[1]!=null && w[4]!=null && w[5]!=null)
			ws.push(w[4],w[5],w[1],w[0]);
	}
	fs121.wsymbol.drawWindPillar(ctx,ws,{
			x:0
			,y:0
			,width:200
			,height:573
			,fWidth:1
			//,wfcolor:'blue'
			,backgroundStyle:"rgba(255,255,555,1)"
		});
}
function drawData(){
	append(table_html(sdata.isob,"1975年5月30日07时南京探空数据"));
	if(sdata.sign)
		append(table_html(sdata.sign,"1975年5月30日07时南京探空数据(特征层)"));
	if(sdata.spec)
		append(table_html(sdata.spec,"1975年5月30日07时南京探空数据(特别层)"));

	function append(html){
		$('#data').append(html);
	}
}
