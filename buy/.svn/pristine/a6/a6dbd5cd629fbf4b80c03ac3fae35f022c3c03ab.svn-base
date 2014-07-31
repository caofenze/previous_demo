var $ = require("buy:widget/ui/jquery/jquery.js");
var UT = require("buy:widget/ui/ut/ut.js");
var slide = require("buy:widget/ui/slider/slider.js");
var flex = require("buy:widget/ui/slider/flex.js");
var jqueryEasing = require("buy:widget/ui/slider/jquery.easing.js");
var hex_md5 = require('buy:widget/ui/md5/md5.js');
var helper = require("buy:widget/ui/helper/helper.js");
// ====================================
//  1. width,height : 图片区域宽高
//  2. slideinterval : 滑动时间
//  3. pauseonmouseover : 鼠标滑过时停止滚动
//  4. navspacing，navwidth : 圆点的距离和宽度
//  5. navmarginy，navmarginx : 圆点距离右下边距离
//  6. navstyle : 展现样式
//  7. navimage : 小圆点图片
//  8. navheight : 圆点高度
//  9. navposition : 分别可以为四个角
//  10. fade : 变化的形式
//  11. transition : 渐变
// =====================================
/*$("#buyNav").sliderstart({
    width:conf.slideImg.width, 
    height:conf.slideImg.height,
    slideinterval:conf.slideImg.time,
    autoplay:conf.slideImg.autoplay,
    pauseonmouseover:false,
    navswitchonmouseover:false,
    shade: {
        duration: 1000,
        easing: "easeOutQuad"
    },
    slowshade: {
        duration: 1000,
        easing: "easeOutQuad"
    },
    nomalslip: {
        duration: 1000,
        easing: "easeOutQuad",
    },
    directionnomalslip:false,
    topdownnomalslip: {
        duration: 1000,
        easing: "easeOutQuad",
    },
    directiontopdown:false,
    topdownslice: {
        duration: 1000,
        easing: "easeOutQuad",
        effects: "updown",
        slicecount: 4
    },
    leftrightslice: {
        duration: 1000,
        easing: "easeOutQuad",
        slicecount: 5,
        direction:false,
    },
    transition:conf.slideImg.transition,
});
//bak HTML
<div id="buyNav" log-mod="buy-nav">
    <ul class="slidercontainer-slides mod-slides">
        <%foreach $body.slideImg.items as $slide%>
            <li><a href="<%$slide.direct%>"><img src="<%if $body.slideImg.width != '960'%><%$slide.srcSec|escape%><%else%><%$slide.src|escape%><%/if%>" /></a></li>
        <%/foreach%>
    </ul>
</div>
*/
function buyNav(){
    this.buySeckill = $("#buySeckill");
    this.utRelated();
    if(this.buySeckill.length == 0){
        return 
    }else{
        this.requestData(); 
    }
};
buyNav.prototype = {
    requestData:function(){
        var url = conf.common.apiUrl + "?app=shopping&act=seckilling&vk=1&category=1&country=br";
        
        var _this = this;
        
        $.ajax({
            url:url,
            dataType: "jsonp",
            jsonp: "jsonp",
            jsonpCallback: "ghao123_" + hex_md5(url,16),
            cache: false,

            success:function(result){
                _this.renderIndex(result.content.data);
            },
            error:function(){
              
            }
        });
    },
    renderIndex:function(result){
        var curTime = new Date().getTime()/1000;

        for(var i=0;i<result.length;i++){
            if(curTime < result[i].start_time){
                //距离开始还有多久
                this.renderData(result[i],conf.common.startTime,conf.common.startText);
                return ;
            }else if(curTime > result[i].start_time && curTime < result[i].end_time){
                //距离结束还有多久
                this.renderData(result[i],conf.common.endTime);
                return ;
            }else if(curTime > result[result.length-1].end_time){
                //卖光了
                this.renderData(result[result.length-1],conf.common.soldOut,conf.common.outText);
                return ;
            }
        }
        
    },
    renderData:function(result,howGo,secTxt){
        var navContainer =  '<a href="#{staff_redirect}">'
                                +'<span class="staff-cut">'
                                  +'<span class="cut-num">#{staff_discount}</span>'
                                  +'<span class="cut-percent">%</span>'
                                  +'<span class="cut-on">OFF</span>'
                                +'</span>'
                                +'<div class="staff-img-wrap m-mtl m-mbl">'
                                  +'<img class="staff-img" src="#{staff_img}"/>'
                                +'</div>'
                                +'<div class="text-overflow-block p-wraper m-mbl m-mtl">'
                                  +'<p class="staff-info staff-name" title="#{staff_name}">#{staff_name}</p>'
                                +'</div>'
                                +'<span class="staff-info staff-pro m-mbl">Pro:'
                                  +'<span>#{staff_provider}</span>'
                                +'</span>'
                                +'<span class="staff-info staff-origin m-mbl"><span>R$</span> #{staff_price}</span>'
                                +'<span class="staff-info staff-bargin m-mbl"><span>R$</span> #{staff_disprice}</span>'
                            +'</a>'
                            +'<div class="sec-timer" id="secTimer">'
                                +'<div class="sec-del img-icon"></div>'
                                +'<div class="sec-del sec-text">'+howGo+'</div>'
                                +'<div class="sec-del timer-detail">'
                                    +'<span class="time day">-</span>'
                                    +'<span class="dot">:</span>'
                                    +'<span class="time hour">-</span>'
                                    +'<span class="dot">:</span>'
                                    +'<span class="time minute">-</span>'
                                    +'<span class="dot">:</span>'
                                    +'<span class="time second">-</span>'
                                +'</div>'
                            +'</div>'
                            +'<div class="sec-label-shit" id="shit">'+secTxt+'</div>';
        // 插入对应的商品信息
        var dom = helper.replaceTpl(navContainer,{
                "staff_redirect" : result.staff_redirect ,
                "staff_discount" : result.staff_discount ,
                "staff_img" : result.staff_img ,
                "staff_name" : result.staff_name ,
                "staff_provider" : result.staff_provider ,
                "staff_price" : result.staff_price ,
                "staff_disprice" : result.staff_disprice ,
            });
        //渲染整体页面
        this.buySeckill.append(dom);
        this.buySeckill.find("a").on("click",function(){
            UT.send({type:"click",modId:"buy-seckill",channel:"buy",ac:"a"});
        });
        //初始化clock时钟
        var day = $("#secTimer .day");
        var hour = $("#secTimer .hour");
        var minute = $("#secTimer .minute");
        var second = $("#secTimer .second");
        var alink = $("#buySeckill > a");
        //触发倒计时操作
        if(howGo == "sold_out"){
            // 卖光了显示的策略
            alink.removeAttr("href");
            return ;
        }else if(howGo == "start_time"){
            //未开始的显示策略
            alink.removeAttr("href");
            this.handleTimer(result.start_time,day,hour,minute,second);
        }else if(howGo == "end_time"){
            //距离结束的时钟操作
            $("#shit").hide();
            this.handleTimer(result.end_time,day,hour,minute,second);
        };
    },
    handleTimer:function(time,day_elem,hour_elem,minute_elem,second_elem){
        
        var _this = this,
            timer = null,
            end_time = time*1000, //转Unix编码 
            sys_second = (end_time-new Date().getTime())/1000; //目标时间和当前时间的差额
        //开启定时器
        timer = setInterval(function(){
            if (Math.floor(sys_second) > 0) {
                sys_second -= 1;
                var day = Math.floor((sys_second / 3600) / 24),
                    hour = Math.floor((sys_second / 3600) % 24),
                    minute = Math.floor((sys_second / 60) % 60),
                    second = Math.floor(sys_second % 60);

                day_elem && $(day_elem).text(_this.timerEl(day));//天
                
                hour_elem.text(_this.timerEl(hour));//时
                
                minute_elem.text(_this.timerEl(minute));//分
                
                second_elem.text(_this.timerEl(second));//秒

            } else { 
                //清除定时器
                clearInterval(timer);
                //情况时间容器
                _this.buySeckill.html("");
                //再次重新渲染
                _this.requestData();
            }
        }, 1000);
    },
    timerEl:function(time){
        return time<10?"0"+time:time
    },
    utRelated:function(){
        $("#banner a,#banner li").on("click",function(){
            UT.send({type:"click",modId:"buy-nav",channel:"buy",ac:"a"});
        });
    }
}

module.exports = buyNav;