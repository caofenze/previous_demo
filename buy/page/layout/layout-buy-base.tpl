<%extends file='buy/page/layout/base.tpl'%>

<%block name="headInfo"%>
    <%if isset($head.webspeed)%>
    <script>(function(){window.PDC={_timing:{},_opt:{sample:0.01},_analyzer:{loaded:false,url:__uri("/static/js/wpo.pda.vs.js"),callbacks:[]},_render_start:+new Date,extend:function(b,a){for(property in b){a[property]=b[property]}return a},metadata:function(){var c=this._opt;var e={env:{user:(c.is_login==true?1:0),product_id:c.product_id,page_id:PDC._is_sample(c.sample)?c.page_id:0},render_start:this._render_start,timing:this._timing};var a=[];var d=c.special_pages||[];for(var b=0;b<d.length;b++){if(PDC._is_sample(d[b]["sample"])){a.push(d[b]["id"])}}if(a.length>0){e.env["special_id"]="["+a.join(",")+"]"}return e},init:function(a){this.extend(a,this._opt)},mark:function(a,b){this._timing[a]=b||+new Date},view_start:function(){this.mark("vt")},tti:function(){this.mark("tti")},page_ready:function(){this.mark("fvt")},first_screen:function(){var g=document.getElementsByTagName("img"),a=+new Date;var f=[],e=this;function b(h){var j=0;try{j+=h.getBoundingClientRect().top}catch(i){}finally{return j}}this._setFS=function(){var k = e._opt["fsHeight"] || document.documentElement.clientHeight;var jk = window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop;k = k -  jk;for(var j=0;j<f.length;j++){var l=f[j],h=l.img,n=l.time,m=b(h);if(m>0&&m<k){a=n>a?n:a}}e._timing.fs=a};var d=function(){if(this.removeEventListener){this.removeEventListener("load",d,false)}f.push({img:this,time:+new Date})};for(var c=0;c<g.length;c++){(function(){var h=g[c];if(h.addEventListener){!h.complete&&h.addEventListener("load",d,false)}else{if(h.attachEvent){h.attachEvent("onreadystatechange",function(){if(h.readyState=="complete"){d.call(h,d)}})}}})()}}};if(document.attachEvent){window.attachEvent("onload",function(){PDC.mark("let");PDC._setFS&&PDC._setFS();PDC._opt.ready!==false&&PDC._load_analyzer()})}else{window.addEventListener("load",function(){PDC.mark("lt")},false)}})();</script>
    <%/if%>
<%/block%>

<%block name="vsWebspeedHead"%>
    <%if isset($head.webspeed)%>
   	<script>
   		if(typeof PDC != 'undefined') {
   			PDC.mark("ht");
   			PDC.mark("vt");
   		}
   	</script>
   	<%/if%>
<%/block%>

<%block name="vsWebspeedBody"%>
    <%if isset($head.webspeed)%>
        <script>
        if (typeof PDC != 'undefined') {
            PDC.idforWebSpeed = '<%$head.webspeed.idforWebSpeed%>';
            PDC.sample = <%$head.webspeed.sample%>;
            PDC.init({
                is_login: 0,
                sample: PDC.sample,
                <%if !empty($head.webspeed.netTest)%>
                net_test: {
                    sample: <%$head.webspeed.netTest.sample%>,
                    url: "<%$head.webspeed.netTest.url%>"
                },
                <%/if%>
                product_id: 10,
                page_id: PDC.idforWebSpeed
            });
            (function(){PDC.extend({_navTiming:window.performance&&performance.timing,ready:(function(callback){var readyBound=false,readyList=[],DOMContentLoaded,isReady=false;if(document.addEventListener){DOMContentLoaded=function(){document.removeEventListener("DOMContentLoaded",DOMContentLoaded,false);ready()}}else{if(document.attachEvent){DOMContentLoaded=function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",DOMContentLoaded);ready()}}}}function ready(){if(!isReady){isReady=true;for(var i=0,j=readyList.length;i<j;i++){readyList[i]()}}}function doScrollCheck(){try{document.documentElement.doScroll("left")}catch(e){setTimeout(doScrollCheck,1);return}ready()}function bindReady(){if(readyBound){return}readyBound=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",DOMContentLoaded,false);window.addEventListener("load",ready,false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",DOMContentLoaded);window.attachEvent("onload",ready);var toplevel=false;try{toplevel=window.frameElement==null}catch(e){}if(document.documentElement.doScroll&&toplevel){doScrollCheck()}}}}bindReady();return function(callback){isReady?callback():readyList.push(callback)}})(),Cookie:{set:function(name,value,max_age){max_age=max_age||10;var exp=new Date();exp.setTime(new Date().getTime()+max_age*1000);document.cookie=name+"="+escape(value)+";path=/;expires="+exp.toGMTString()},get:function(name){var arr=document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));if(arr!=null){return unescape(arr[2])}return null},remove:function(name){this.set(name,"",-1)}},_is_sample:function(ratio){if(!PDC._random){PDC._random=Math.random()}return PDC._random<=ratio},_load_analyzer:function(){var special_pages=this._opt.special_pages||[];var radios=[this._opt.sample];for(var i=0;i<special_pages.length;i++){radios.push(special_pages[i]["sample"])}var radio=Math.max.apply(null,radios);if(PDC._is_sample(radio)==false){return}PDC._analyzer.loaded=true;PDC._load_js(PDC._analyzer.url,function(){var callbacks=PDC._analyzer.callbacks;for(var i=0,l=callbacks.length;i<l;i++){callbacks[i]()}})},_load_js:function(url,callback){var script=document.createElement("script");script.setAttribute("type","text/javascript");script.setAttribute("src",url);script.onload=script.onreadystatechange=function(){if(!this.readyState||this.readyState=="loaded"||this.readyState=="complete"){script.onload=script.onreadystatechange=null;if(typeof callback==="function"){callback(url,true)}}};script.onerror=function(e){if(typeof callback==="function"){callback(url,false)}};document.getElementsByTagName("head")[0].appendChild(script)},send:function(){if(PDC._analyzer.loaded==true){WPO_PDA.send()}else{PDC._load_analyzer();PDC._analyzer.callbacks.push(function(){WPO_PDA.send()})}}},PDC);!function(){var Cookie=PDC.Cookie,jt=Cookie.get("PMS_JT"),isset=false;if(jt){Cookie.remove("PMS_JT");jt=eval(jt);if(!jt.r||document.referrer.replace(/#.*/,"")==jt.r){(PDC._render_start-jt.s)>100&&PDC.mark("wt",(PDC._render_start-jt.s))}}function clickHandle(e){var e=e||window.event;var target=e.target||e.srcElement;if(target.nodeName=="A"){var url=target.getAttribute("href");if(!/^#|javascript:/.test(url)){Cookie.set("PMS_JT",'({"s":'+(+new Date)+',"r":"'+document.URL.replace(/#.*/,"")+'"})');isset=true}}}if(document.attachEvent){document.attachEvent("onclick",clickHandle)}else{document.addEventListener("click",clickHandle,false)}}();PDC.ready(function(){PDC.mark("drt")});if(document.attachEvent){window.attachEvent("onload",function(){PDC.mark("lt")},false)}else{window.addEventListener("load",function(){PDC.mark("let");PDC._setFS&&PDC._setFS();PDC._opt.ready!==false&&PDC._load_analyzer()})}})();
        }
        </script>
   	<%/if%>
<%/block%>
