function setup(nav,content){
	$('<div class="title">目录</div>').appendTo(nav);
	var ul=$("<ul></ul>").appendTo(nav);
	var i_h2=0,i_h3,i_h4,label='';
	//建立锚点，并构造nav内容
	$("h2,h3,h4",content).each(function(i,item){
		if(item.tagName=='H2'){
			i_h2++;
			i_h3=i_h4=0; //复位
			label=""+i_h2;
		}
		else if(item.tagName=='H3'){
			i_h3++;
			i_h4=0; //复位
			label=""+i_h2+"."+i_h3;
		}
		else{
			i_h4++;
			label=""+i_h2+"."+i_h3+"."+i_h4;
		}
		if(item.tagName=='H2' || item.tagName=='H3')
			$("<a></a>").attr('href','#'+label).addClass(item.tagName).text($(item).text()).appendTo(ul).wrap("<li></li>");
		$('<a name="'+label+'"></a>').text(label).prependTo(item); // IE 不认：$("<a></a>").attr('name',label)..text(label).prependTo(item)
		//为nav内的连接添加click事件
		$(nav).click(
			function(event){
				if(event.target.tagName=='A'){
					$("a",this).removeClass("current");
					var target=$(event.target).addClass("current");
				}
			});
			if($("a.current",nav).length==0){
				$("a:first",nav).addClass("current");
			}
			
	});
	//为每幅图象添加标记
	$("img",content).each(function(i,item){
		$("<span></span>").text("【图"+(i+1)+"】").appendTo(content).insertAfter(item);
	});
	var links={
		java:"http://java.sun.com/javase/downloads/index.jsp",
		tomcat:"http://tomcat.apache.org",
		postgresql:"http://www.postgresql.org",
		oracle:"http://www.oracle.com",
		jquery:"http://jquery.com",
		gsp:"http://groovy.codehaus.org/GSP",
		groovy:"http://groovy.codehaus.org",
		json:"http://www.json.org/json-zh.html",
		spring:"http://www.springsource.org",
		"ui.layout":"http://layout.jquery-dev.net/index.html",
		flot:"http://code.google.com/p/flot/",
		firefox:"http://firefox.com.cn/",
		opera:"http://www.opera.com",
		safari:"http://www.apple.com.cn/Safari",
		"google chrome":"https://www.google.com/intl/zh-CN/chrome/browser/?hl=zh-CN",
		explorercanvas:"http://excanvas.sourceforge.net"
	}
	$("a",content).filter(function(){	return !$(this).attr('name') && !$(this).attr('href')}).each(function(i,item){
		var $item=$(item);
		var name=$item.text().toLowerCase();
		var url=links[name];
		if(url)
			$item.attr({href:url,target:"_blank"}).addClass('link');
	});
}
