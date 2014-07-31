var $ = require("buy:widget/ui/jquery/jquery.js");
var UT = require("buy:widget/ui/ut/ut.js");
var navTransition = require("buy:widget/ui/navtransition/navtransition.js");
function buyHot(){
	this.wrapperHot = $("#buyHot");
	this.init();
	this.displayItems(0);
	this.utRelated();
};
buyHot.prototype = {
	init:function(){
		$(".hotsite-container",this.wrapperHot).css("height",this.wrapperHot.height());
		$(".nav-items",this.wrapperHot).on("click",this,function(){
			$(this).addClass("bra-selected").siblings().removeClass("bra-selected");
			$(".hotsite"+($(this).index()+1)+"",this.brandWrapper).show().siblings().hide();
		});
		//初始化悬停
		$('.da-thumbs > li').hoverdir();
		/*$(".hotsite-staff",this.wrapperHot).hover(
			function(){
				$(this).find(".hotsite-bak").show();
			},
			function(){
				$(this).find(".hotsite-bak").hide();
			}
		)*/
	},
	displayItems:function(id){
		$(".nav-items",this.wrapperHot).eq(id).addClass("bra-selected").siblings().removeClass("bra-selected");
		$(".hotsite"+(id+1)+"",this.brandWrapper).show().siblings().hide();
	},
	utRelated:function(){
		$(".nav-items,.hotsite-staff,.hotsite-small-item",this.wrapperHot).on("click",this,function(){
			UT.send({type:"click",modId:"buy-hotsite",channel:"buy",ac:"a"});
		});
	}
};

module.exports = buyHot;