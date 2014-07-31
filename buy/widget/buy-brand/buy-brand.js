var $ = require("buy:widget/ui/jquery/jquery.js");
var UT = require("buy:widget/ui/ut/ut.js");
var navTransition = require("buy:widget/ui/navtransition/navtransition.js");

function buyBrand(){
	this.brandWrapper = $("#buyBrand");
	this.init();
};
buyBrand.prototype = {
	init:function(){
		this.handleItems();
		this.switchHandle();
		this.displayItems(0);
		this.utRelated();
	},
	displayItems:function(id){
		$(".nav-items",this.brandWrapper).eq(id).addClass("bra-selected").siblings().removeClass("bra-selected");
		$(".brand"+(id+1)+"",this.brandWrapper).show().siblings().hide();
	},
	handleItems:function(){
		//设置商标容器高度
		$(".brand-items",this.brandWrapper).css("height",this.brandWrapper.height());
		//切换NAV按钮操作
		$(".nav-items",this.brandWrapper).on("click",this,function(){
			$(this).addClass("bra-selected").siblings().removeClass("bra-selected");
			$(".brand"+($(this).index()+1)+"",this.brandWrapper).show().siblings().hide();
		});
		//多余两列时，显示切换按钮
		$(".brand-container",this.brandWrapper).each(function(){
			($(this).find("ul").length>1) && $(this).find(".prev-btn,.next-btn").show();
		});

		$('.da-thumbs01 > li').hoverdir();
	},
	switchHandle:function(){
		//左右切换按钮操作
		var w = $(".brand-wrap",this.brandWrapper).width();

		var isAnimating = false ;
		
		$(".next-btn",this.brandWrapper).on("click",this,function(){
			if(isAnimating){
				return ;
			}
			var tmpSilbing = $(this).siblings(".brand-items") ;
			var s = tmpSilbing.find("ul") ;

			isAnimating = true ;
			
			var l = tmpSilbing.position().left ; 
			if(Math.abs(Math.abs(l) - (s.length-1)*w) <= 5){
				tmpSilbing.find("ul").eq(0).css({
					"position":"relative",
					"left": w*(s.length)
				});
			};
			tmpSilbing.animate({"left": (l-w)+"px"}, 500, function(){
				var sl = $(this).position().left ; 
				
				if(Math.abs(Math.abs(sl) - $(this).find("ul").length * w) <= 5){
					$(this).find("ul").eq(0).css("left",0);
					$(this).css("left",0);
				};
				isAnimating = false ;
			});
		});
		$(".prev-btn",this.brandWrapper).on("click",this,function(){
			if(isAnimating){
				return ;
			}
			var tmpSilbing = $(this).siblings(".brand-items") ;
			var s = tmpSilbing.find("ul");

			isAnimating = true ;

			var l = tmpSilbing.position().left ;
			/** 向左按钮点击，如果左边没有元素，将最右边的元素挪到左边. **/
			if(Math.abs(l) <= 5){
				tmpSilbing.find("ul").eq(-1).css({
					"position":"relative",
					"left": "-" + w*(s.length) + "px"
				});
			};
			/** 滑动结束后将其还原. **/
			tmpSilbing.animate({"left": (l+w) + "px"}, 500, function(){
				var sl = $(this).position().left ; 
				if(Math.abs(sl - w) <=5 ){
					$(this).find("ul").eq(-1).css("left",0);
					$(this).css("left","-"+($(this).find("ul").length-1) * w+"px");
				};
				isAnimating = false ;
			});
		});
	},
	utRelated:function(){
		$(".nav-items,.brand-staff,.prev-btn,.next-btn",this.brandWrapper).on("click",this,function(){
			UT.send({type:"click",modId:"buy-brand",channel:"buy",ac:"a"});
		})
	}
};

module.exports = buyBrand;