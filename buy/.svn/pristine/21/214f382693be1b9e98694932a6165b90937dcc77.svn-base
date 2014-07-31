var $ = require("buy:widget/ui/jquery/jquery.js");
var UT = require("buy:widget/ui/ut/ut.js");
var message = require("buy:widget/ui/message/src/message.js");

function forHome(){
	this.shopContainer = $("#shopContainer");
	this.getMessage();
	this.init();
	this.autoPlay();
};

forHome.prototype = {
	init : function(){
		this.switchList();
	},
	switchList : function(){
		var len = $(".category" ,this.shopContainer).find("li").length;

		$(".category" ,this.shopContainer).find("li").css("width",(1/len)*100+"%");

		$(".category").show();
		$(".category").find("li").eq(0).addClass("active");
		
		$(".tpl-01 .item,.tpl-02 .item",this.shopContainer).hover(
			function(){
				$(this).find(".name,.price,.supplier").addClass('under-line');
			},
			function(){
				$(this).find(".name,.price,.supplier").removeClass('under-line');
			}
		)
	},
	autoPlay:function(){

		var navContainer = $(".category" ,this.shopContainer ), 
	    	navItem = navContainer.find("li"), 
	    	activeItem = navItem.find(".go .activego"), 
	    	detailContainer = $(".detail" , this.shopContainer).find(".sort-detail"), 
	    	h = detailContainer.get().length, 
	    	b = 0, 
	    	i = !0, 
	    	d;

	    if (1 <= h) {

	        var touch = function(index) {
	            detailContainer.eq(index).fadeIn().siblings().hide();
	        }, 
	        rebuild = function(b) {

	            activeItem.stop(!0, !0);
	            
	            navItem.removeClass("closing");
	            
	            $currentHeader = navItem.eq(b);
	            
	            $currentHeader.prev().addClass("previous closing");
	            
	            0 === b && (navItem.removeClass("previous"), activeItem.css({width: "0%"}));
	            
	            activeItem.eq(b).animate({width: $currentHeader.css("width")}, parseInt(conf.common.time), "linear");

	            i ? i = !1 : ($previousHeader = navItem.eq(b - 1), navItem.find(".go .activego").css({width: "0px"}), $previousHeader.find(".activego").css("width", $previousHeader.css("width")), $previousHeader.find(".go .activego").animate({width: "0px"}, 600, "swing"))
	        }, 
	        startTimer = function(d) {
	            ++b >= h && (b = 0, activeItem.css({width: "0px"}));
	            touch(b);
	            !0 === d ? rebuild(b - 1) : rebuild(b);
	            navItem.removeClass("active");
	            navItem.eq(b).addClass("active")
	        }, 
	        clearTimer = function() {
	            clearInterval(d);
	            rebuild(b);
	            return setInterval(startTimer, parseInt(conf.common.time));
	        };

	        touch(0);
	        
	        d = clearTimer();

	        navItem.click(function(ev) {
	        	
	            ev.preventDefault();
	            $this = $(this);

	        	if($this.is(".selected")){
	        		$this.removeClass("selected");

	        		startTimer(!0);

	        		d = clearTimer();
	        	}else{
	        		clearInterval(d);
	        		
	        		activeItem.stop(!0, !0);
	            	
	            	b = navItem.index(this); 
	            	
	            	navItem.removeClass("active selected previous"); 
	            	
	            	activeItem.css("width", "0px");
	            	
	            	navItem.each(function(a) {
	                	a < b && $(this).addClass("previous")
	            	});
	            	
	            	$this.addClass("active selected"); 
	            	
	            	touch(b);
	        	}
	        });
	        
	        !function() {
	            return {pause: function() {
	                    navItem.removeClass("selected");
	                    navItem.filter(".active").click()
	                },resume: function() {
	                    navItem.filter(".selected").click()
	                }}
	        }()
	    }
	},
	getMessage:function(){
		message.on("iframe.flow.switch" , function(data){
			var width = (data == 960) ? 640 : 798 ;
			
			$("#shopContainer").width(width);
		});
	},
};

module.exports = forHome ; 