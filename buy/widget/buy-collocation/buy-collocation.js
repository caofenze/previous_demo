var $ = require("buy:widget/ui/jquery/jquery.js");
var UT = require("buy:widget/ui/ut/ut.js");

;(function($){
	$.fn.bubbleup = function(options) {
		var opt = $.extend({},options),
			tip = null;
		
		return this.each(function() {
			var w=$(this).width();
			$(this).on("mouseenter" , function(){

				$(this).closest('li').css({'z-index':2});
				$(this).closest('li').siblings().css({'z-index':1}).next().css({'z-index':0}).next().children('img').css({'z-index':0});


				$(this).stop().css({
					'box-shadow':"3px 3px 6px #888888",
					'z-index':2,
					'top':0,
					'left':0,
					'width':w
				}).animate({
					width:opt.scale
				},opt.inSpeed);


				$(this).closest('li').siblings().find("img").stop().css({
					'box-shadow':""
				}).animate({
					left:0,
					top:0,
					width:w
				},opt.outSpeed,function(){
					$(this).closest('li').siblings().find("img").css({
						'z-index':0
					});
				});

			});
		})
	};
})(jQuery);

var buyColl = function(){
	this.wrap = $("#buyCollo");
	this.imgItems = $("#container .templates li");
	this.delItems = $("#detailInfo .col-detail");
	this.imgContainer = $("#container .templates");
	this.prevBtn = $(".pre" , this.wrap);
	this.nextBtn = $(".next" , this.wrap);
	this.isAnimate = false ; 
	this.init();
};

buyColl.prototype = {
	init : function(){

		//加载首屏
		this.initAll();

		//大图片的hover效果
		this.handleBig();

		//小图标的展示和操作
		this.initDetail();

		//左右按钮的操作
		this.handleBtn();
		this.utRelated();

	},
	initAll: function(){
		var START_INDEX = 0,
			END_INDEX = 3;

		//大图的开始结束标示
		this.imgItems.eq(START_INDEX).addClass("start_index");
		this.imgItems.eq(END_INDEX).addClass("end_index");

		this.prevBtn.removeClass("pre").addClass("pre-bak");

		var start_notes = $("#container .start_index").find("img");
		//添加总数标示符
		this.imgContainer.attr("total",this.imgItems.length);

		//加载首项
		start_notes.css({"box-shadow":"3px 3px 6px #888888"}).animate({"width":"240px"});
		//首项的详细信息加载
		this.delItems.eq(START_INDEX).show();

	},
	handleBig : function(){
		var _this = this,
			SXPAND = 240,
			ORIGIN_PATH = 150,
			PER_ITEM = 260,
			note = $("#triangleNote") ;

		//hover图片下面详细信息的变化
		this.imgItems.on("mouseenter" , function(){
			
			var TMP = $(this).index() - $(".start_index").attr("index") ; 

			// hover 后加载对应信息项
			_this.delItems.eq($(this).index()).show().siblings().hide();
			// 三角箭头追随
			note.animate({"margin-left" : ( ORIGIN_PATH + TMP * PER_ITEM ) + "px"},150);

			_this.calculateHeight();
		});

		//触发图片放大效果
		$("img" , this.imgItems).bubbleup({tooltip: true, scale:SXPAND});
	},
	calculateHeight : function(){
		
		//计算描述信息的高度
		var info = $(".items-text p" , this.delItems) ;
		
		// 通过数字信息的多少判断其容器高度，设置垂直居中
		info.each(function(){

			var h = parseInt($(this).css("height"));
			
			//容器内垂直居中

			$(this).css({
				"top" : "50%",
				"margin-top" : "-" + h/2 + "px" 
			})
		});
	},
	initDetail : function(){
		// 操作图片划出文字信息
		var smallIcon = $("#detailInfo .img-info") ;

		smallIcon.on("mouseenter" , function(){

			$(this).find(".info").animate({ "bottom" : 0 },150);
			
			
		}).on("mouseleave" , function(){
			
			$(this).find(".info").animate({ "bottom" : "-60px" },150);
			
		});

		this.calculateHeight();

	},
	handleBtn : function(){
		var _this = this;

		this.prevBtn.on("click" , function(){
			if(!_this.isAnimate){
				_this.isAnimate = true ;
				_this.comeGo("left") ;
			}
			
		});

		this.nextBtn.on("click" , function(){
			if(!_this.isAnimate){
				_this.isAnimate = true ;
				_this.comeGo("right") ;
			}
			
		});
	},
	comeGo : function(direction){
		var _this = this,START_INDEX = 0,END_INDEX = 3,LENGTH = 4,EXPAND = 260,
			left = parseInt(this.imgContainer.position().left),
			start = $("#container .start_index"),
			end = $("#container .end_index"),
			tmpStart = parseInt(start.attr("index")),
			tmpLast = parseInt(end.attr("index")),
			total = this.imgContainer.attr("total"),
			tranNote = $("#triangleNote");

		if(direction == "left") {
			//左边界
			if(tmpStart == START_INDEX){
				this.isAnimate = false;
				return ;
			}
			//三角重定位
			tranNote.animate({"margin-left":"150px"});
			//移出原有标示
			start.removeClass("start_index");
			end.removeClass("end_index");

			// left值的缓存
			if(tmpStart < END_INDEX){
				//添加现有样式
				this.imgItems.eq(START_INDEX).addClass("start_index");
				this.imgItems.eq(END_INDEX).addClass("end_index");

				left = ( left + EXPAND * tmpStart ) ;  
			}else{
				//添加现有样式
				this.imgItems.eq( tmpStart - LENGTH ).addClass("start_index");
				this.imgItems.eq( tmpLast - LENGTH ).addClass("end_index");
				
				left = ( left + EXPAND * LENGTH ) ;
			}

		}else{
			//右边界
			if(tmpLast == total -1 ){
				this.isAnimate = false;
				return ;
			}
			//三角重定位
			tranNote.animate({"margin-left":"150px"});
			//移出原有标示
			start.removeClass("start_index");
			end.removeClass("end_index");

			if(total - tmpLast < LENGTH){
				//添加现有样式
				this.imgItems.eq( total - LENGTH ).addClass("start_index");
				this.imgItems.eq( total - 1 ).addClass("end_index");

				left = ( left - EXPAND * (total-tmpLast-1) ) ;  
			}else{
				//添加现有样式
				this.imgItems.eq( tmpStart + LENGTH ).addClass("start_index");
				this.imgItems.eq( tmpLast + LENGTH ).addClass("end_index");
				
				left = ( left - EXPAND * LENGTH ) ;
			}
		};
		
		this.imgContainer.animate({
			"left" : left + "px"  
		},500,function(){
			var start = $("#container .start_index").find("img"),
				allLi = $("#container li").find("img"),
				index = $("#container .start_index").attr("index"),
				last = $("#container .end_index").attr("index");

			if(index == 0){
				_this.prevBtn.removeClass("pre").addClass("pre-bak");
			}else{
				_this.prevBtn.removeClass("pre-bak").addClass("pre");
				
			}

			if(last == total-1){
				_this.nextBtn.removeClass("next").addClass("next-bak");
			}else{
				_this.nextBtn.removeClass("next-bak").addClass("next");
			}


			//清楚其他元素样式
			allLi.css({"width":"230px","box-shadow":""});
			//添加新一屏第一个元素
			start.css({"box-shadow":"3px 3px 6px #888888"}).animate({"width":"240px"});
			//显示对应的项
			_this.delItems.eq(index).show().siblings().hide();

			//计算描述信息的高度
			_this.calculateHeight();

			_this.isAnimate = false ;
		});
	},
	utRelated : function(){
		$("img,.pre,.next" , this.wrap).on("click" , function(){
			UT.send({type:"click",modId:"buy-collocation",channel:"buy",ac:"a"});
		});
	}
};

module.exports = buyColl ;