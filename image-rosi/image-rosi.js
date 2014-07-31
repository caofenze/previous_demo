var rosiEl = function(){

	this.itemImg = '<li class="small-item" big-img="#{big}" data-sort="#{pn}" data-width="#{width}" data-height="#{height}" data-fb="#{fb}" data-like="#{like}" data-down="#{down}" img-id="#{id}" img-des="#{description}">'
						+'<img src="#{url}" #{hw}="#{value}"/>'
					+'</li>';

	this.rosiContainer = $("#rosiContainer");

	//设置开始滑动之前的标示符，如果点击太快未渲染成功则不进行请求数据操作
	this.startIndex = 0;
	//运动标示符，记录运动是否完毕
	this.isAnimate = false ;

	this.url = window.location.search;

	//初始化
	this.init();

	//操作弹出层
	this.initPop();
	this.handlePop();

};

rosiEl.prototype = {
	replaceTpl: function (tpl, data, label) {
		var t = String(tpl),
			s = label || /#\{([^}]*)\}/mg,
			trim = String.trim ||
				function (str) {
					return str.replace(/^\s+|\s+$/g, '')
				};
		return t.replace(s, function (value, name) {
			//从模板获取name,容错处理
			return value = data[trim(name)];
		});
	},
	/*弹出层初始化*/
	initPop:function(){
		var _this = this,
			tag1 = _this.getQueryStringByName("tag1");
		
		_this.requestPopData(tag1,50);
	},
	handleBtn:function(){
		var _this = this,
			handle = this.rosiContainer.find(".share-wrap"),curLike = this.rosiContainer.find(".like-btn .share-num"),curDown = this.rosiContainer.find(".download-btn .share-num"),curFb = this.rosiContainer.find(".facebook-btn .share-num"),tag1 = _this.getQueryStringByName("tag1"),tag2 = _this.getQueryStringByName("tag2"),st = _this.getQueryStringByName("st"),imgid = _this.getQueryStringByName("imgid"),
			redirectUrl = _this.replaceTpl(conf.commonUrl.redirect,{
				tag1:tag1,
				tag2:tag2,
				st:st,
				imgid:imgid,
			});

		handle.on("click",this,function(){
			
			var id = _this.rosiContainer.find(".item-h").attr("img-id");
			var n = '__g-st'+(new Date()).getTime().toString(32);
			var tagLogPrefix = "http://g.arimg.baidu.com/statistic/index.php?";
			window[n] = new Image();
			window[n].onload = window[n].onerror = function(){
			    window[n] = null;
			};
			if($(this).hasClass("download-btn")){
				UT.send({type:"click",modId:"act-download",channel:"image",ac:"a"});
				//下载调用接口
				var imgUrl = $(".big-img").find("img").attr("src"),
					countryList = ['th', 'tw', 'vn', 'id'],
					downUrl = $.inArray("ar", countryList) != -1 ? imgUrl + '&download=' + imgUrl:imgUrl.match(/^https?:\/\/[a-zA-Z0-9\-\.]*/) + "/download.php?url=" + imgUrl;
				window.open(downUrl);
				curDown.html(parseInt(curDown.html())+1);
				window[n].src= tagLogPrefix+ '?&type=download&image_id='+id+'&_='+n;

			}else if($(this).hasClass("like-btn")){
				UT.send({type:"click",modId:"act-like",channel:"image",ac:"a"});
				if(!$(this).hasClass("btn-disabled")){
					$(this).addClass("btn-disabled");
					curLike.html(parseInt(curLike.html())+1);
					var uid = !!$.cookie("FLASHID")?$.cookie("FLASHID"):"unknow";
					window[n].src= tagLogPrefix + '?&type=like&image_id='+id+ '&uid=' + uid + '&_='+n;
				}
				return false;
			}else if($(this).hasClass("facebook-btn")){
				UT.send({type:"click",modId:"act-share",channel:"image",ac:"a"});
				var redirect_url = "https://www.facebook.com/dialog/feed?app_id=301848393277202"/*+conf.fbAppId+*/+"&display=popup&link="+encodeURIComponent(window.location.href)+"&picture="+$(".big-img").find("img").attr("src")+"&name="+ conf.share.title+"&description="+conf.share.descripton+"&to=&redirect_uri=https://www.facebook.com/";
				window.open(redirect_url,"newwindow");
				curFb.html(parseInt(curFb.html())+1);
				window[n].src= tagLogPrefix+ '?&type=share&image_id='+id+'&_='+n;
			}
		}).on("mouseenter",this,function(){
			var tmp = $(this).find(".share-item"),
				index = tmp.attr("data-index");

			tmp.css("background","url(/static/web/common/img/rosi/"+index+"-hor.png) no-repeat");
		}).on("mouseleave",this,function(){
			var tmp = $(this).find(".share-item"),
				index = tmp.attr("data-index");

			tmp.css("background","url(/static/web/common/img/rosi/"+index+"-nor.png) no-repeat");
		})
	},
	/*操作弹出框*/
	handlePop:function(){
		var pop = $("#r-more"),
			popEl = pop.find(".n-container"),
			popClose = pop.find(".close");
		//操作弹出框的透明度
		popEl.find("img").hover(function(){
			$(this).css("opacity",0.8);
		},function(){
			$(this).css("opacity",1);
		});
		//操作弹出框关闭按钮
		popClose.click(function(){
			$("#overlay").hide();
			pop.hide();
		});
	},
	/*操作小图片的切换*/
	handleSmall:function(){
		var _this = this,
			_gEl = this.rosiContainer,imgItem = _gEl.find(".small-item"),cur = _gEl.find(".current-num"),curLike = _gEl.find(".like-btn .share-num"),curDown = _gEl.find(".download-btn .share-num"),curFb = _gEl.find(".facebook-btn .share-num"),likeCon = _gEl.find(".like-btn"),curDescription = _gEl.find(".big-content .description"),bigImg = _gEl.find(".big-img").find('img'),bigHref = _gEl.find(".big-img").find('a'),bigCon = _gEl.find(".big-img"),tag1 = _this.getQueryStringByName("tag1"),tag2 = _this.getQueryStringByName("tag2"),album = _this.getQueryStringByName("album"),
			imgId = _this.replaceTpl(conf.commonUrl.imgidIndex,{
				tag1:tag1,
				tag2:tag2,
				album:album,
			});;

		imgItem.on("click",this,function(){
			UT.send({type:"click",modId:"imglist",channel:"image",ac:"a"});
			var $this = $(this),
				index = $this.attr("big-img"),width = $this.attr("data-width"),height = $this.attr("data-height"),description = $this.attr("img-des");
				
			//如果是最后一个，滑动出后六张图片
			if($this.hasClass("display_last")){	
				_this.handleIndex("right");		
			}
			//如果是第一个，向做滑动出6张图片
			if($this.hasClass("display_start")){
				_this.handleIndex("left");
			}
			//点击小图后对于like按钮设置为可点状态
			likeCon.removeClass("btn-disabled");
			
			//点击小图后切换标题数字
			cur.text(parseInt($this.attr("data-sort"))+1);

			//点击后切换分享到的值
			curLike.text(parseInt($this.attr("data-like")));curDown.text(parseInt($this.attr("data-down")));curFb.text(parseInt($this.attr("data-fb")));
			//修改URL中的img-id
			if(typeof(history.pushState) == 'function'){
				history.pushState("","",imgId+"&imgid="+$this.attr("img-id"));
			}
			//点击小图后样式切换
			imgItem.removeClass("item-h");
			
			$this.addClass("item-h");

			/*点击小图后大图相应的变化*/
			bigHref.attr("href","").attr("href",index)
			bigImg.attr("src","").attr("src",index);
			/*文字设置空*/
			curDescription.text("");
			/*如果接口数据中有description字段，插入description到图片下方*/
			if(description != ''){
				curDescription.text(description);
				if(curDescription.height() >= 25){
					curDescription.css("text-align","left");
				}
				bigImg.height($(window).height() - 210);bigCon.width(width*($(window).height() -210)/height);
			}else{
				bigImg.height($(window).height() - 190);bigCon.width(width*($(window).height() -190)/height);
			}
			
		})
	},
	/*左右切换按钮的位置变化*/
	setExchange:function(){
		
		var _gEl = this.rosiContainer,
			exchangeBtn = _gEl.find('.exchange-el'),
			exchangeBtn01 = _gEl.find('.exchange-small-el'),
			total = $("body").attr("total");

		exchangeBtn.width($(document).width() - 30);
		exchangeBtn.css("top",($(window).height() -200)/2);

		if(total >= 12){
			exchangeBtn01.width(1064);
		}else{
			exchangeBtn01.width(80*total+100)
		}
		exchangeBtn.css("visibility","visible");
		exchangeBtn01.css("visibility","visible");
	},
	/*操作滑动方向*/
	handleIndex:function(where){
		var _this = this,
			_gEl = this.rosiContainer,tmp = _gEl.find(".display_last"),tmp01 = _gEl.find(".display_start"),tmpLast = _gEl.find(".display_last").attr("data-sort"),tmpStart = _gEl.find(".display_start").attr("data-sort"),imgItem = _gEl.find(".small-item"),leftImg = parseInt(_gEl.find(".small-item:last").attr("data-sort"))+1-tmpLast,decNum = parseInt(_gEl.find(".small-item:last").attr("data-sort"))+1,smallCon = _gEl.find(".small-container"),total = $("body").attr("total"),tag1 = _this.getQueryStringByName("tag1"),tag2 = _this.getQueryStringByName("tag2"),al = _this.getQueryStringByName("album"),st = _this.getQueryStringByName("st") == "" ? 0 : _this.getQueryStringByName("st"),left,whereTo;
		//设置滑动方向值
		conf.dir == 'ltr' ? left = parseInt(_gEl.find(".small-container").find("ul").css("left")) : left = parseInt(_gEl.find(".small-container").find("ul").css("right"));
		

		/*操作开始值和结束值，分别在左滑动或右滑动的时候*/
		if(where == "left"){
			// ===========================================
			// 1.设置开始元素和结束元素的标示
			//		1）如果开始元素的标示小于6，则说明不足六张照片，
			//		   直接将第一张设置为开始标示，最后一张设置为结束标示
			//		2）如果结束标签的值%6不为0，则说明最后一次滑动的值也不足6张照片
			//		   那么直接将最后一张照片设置为结束标示，同时向前推12张设置开始标示
			// 2.滑动出照片
			//      同上
			// 3.开始滑动时将start、last标示符移出
			// 4.如果触发左滑动时start标示符在第一个，则不进行操作
			// ============================================
			if(tmp01.attr("data-sort") == 0){
				_this.isAnimate = false;
				return ;
			}
			
			/*移出样式*/
			tmp.removeClass("display_last");
			tmp01.removeClass("display_start");

			if(tmpStart < 6){
				imgItem.eq(0).addClass("display_start");

				imgItem.eq(11).addClass("display_last");
				
				left = (left+80*tmpStart)+"px";
				
			}else{
				imgItem.eq(parseInt(tmpStart)-6).addClass("display_start");
				
				imgItem.eq(parseInt(tmpStart)+5).addClass("display_last");
				
				left = (left+80*6)+"px";
			}
		}else{
			// ========================================================
			// 1.每次滑动时，将之前的start、last的标示符移出
			// 2.如果后面的值不足6项，则将返回数据的最后一项设置为display_last
			// ========================================================
			if(tmpLast == total -1 ){
				_this.isAnimate = false;
				return ;
			}
			/*移出样式*/
			tmp.removeClass("display_last");
			tmp01.removeClass("display_start");

			if(total - (parseInt(tmpLast)+1) < 6){
				imgItem.eq(total-1).addClass("display_last");
				imgItem.eq(total-12).addClass("display_start");
				left = (left-80*(total%6)) + "px";

			}else{

				if((leftImg<=30) && (this.startIndex != decNum)){
					_this.requestData(st,tag1,tag2,decNum,50,al);
					this.startIndex = decNum;
				};
				imgItem.eq(parseInt(tmpLast) + 6).addClass("display_last");
				imgItem.eq(parseInt(tmpLast) - 5).addClass("display_start");

				left = (left-80*6)+"px";
				
			}
			
		}

		if(conf.dir == "ltr"){
			smallCon.find("ul").animate({"left":left},1000,function(){
				_this.isAnimate = false ;
			});
		}else{
			smallCon.find("ul").animate({"right":left},1000,function(){
				_this.isAnimate = false ;
			});
		}

	},
	handleSmallImg:function(){
		/*小图操作按钮*/
		var _this = this,
			_gEl = this.rosiContainer,eEl01 = _gEl.find(".exchange-b-l"),eEl02 = _gEl.find(".exchange-b-r"),eCl01 = _gEl.find(".exchange-s-l"),eCl02 = _gEl.find(".exchange-s-r"),total = $("body").attr("total");
		
		eEl01.on("mouseenter",this,function(){
			eCl01.css("visibility","visible");
		}).on("mouseleave",this,function(){
			eCl01.css("visibility","hidden");
		}).on("click",this,function(){
			UT.send({type:"click",sort:"button",modId:"imglist",channel:"image",ac:"a"});
			/*操作向左滑动*/
			if(!_this.isAnimate){
				_this.isAnimate = true;
				_this.handleIndex("left");
			}
			
		});

		eEl02.on("mouseenter",this,function(){
			eCl02.css("visibility","visible");
		}).on("mouseleave",this,function(){
			eCl02.css("visibility","hidden");
		}).on("click",this,function(){
			UT.send({type:"click",sort:"button",modId:"imglist",channel:"image",ac:"a"});
			if(total<12){
				return ;
			}
			/*操作向右滑动*/
			if(!_this.isAnimate){
				_this.isAnimate = true;
				_this.handleIndex("right");
			}
		});
	},
	/*大图操作按钮*/
	handleBigImg:function(){
		
		var _gEl = this.rosiContainer,
			_this = this,
			bEl01 = _gEl.find(".exchange-l"),bEl02 = _gEl.find(".exchange-r"),bCl01 = _gEl.find(".exchange-big-l"),bCl02 = _gEl.find(".exchange-big-r");

		bEl01.on("mouseenter",this,function(){
			bCl01.css("visibility","visible");
		}).on("click",function(){
			bCl01.trigger("click");
		})

		bCl01.on("mouseenter",function(){

		}).on("mouseleave",function(){
			$(this).css("visibility","hidden");
		}).on("click",this,function(){
			UT.send({type:"click",sort:"button",modId:"img",channel:"image",ac:"a"});
			var startEl = _gEl.find(".display_start");
			//操作上一个
			_this.handleBigImgDetail("prev");
			//若切到边界，则进行滑动操作
			if(startEl.hasClass("item-h")){
				_this.handleIndex("left");
			}

		});

		bEl02.on("mouseenter",this,function(){
			bCl02.css("visibility","visible");
		}).on("click",function(){
			bCl02.trigger("click");
		});

		bCl02.on("mouseenter",function(){

		}).on("mouseleave",function(){
			$(this).css("visibility","hidden");
		}).on("click",this,function(){
			UT.send({type:"click",sort:"button",modId:"img",channel:"image",ac:"a"});
			var lastEl = _gEl.find(".display_last")
			//操作下一个的切换
			_this.handleBigImgDetail("next");
			//若切到边界，则进行滑动操作
			if(lastEl.hasClass("item-h")){
				_this.handleIndex("right");
			}
			
		})
	},
	/*大图操作分项*/
	handleBigImgDetail:function(how){
		var _this = this,
			_gEl = this.rosiContainer,tmp = _gEl.find(".item-h"),bigImg = _gEl.find(".big-img"),tmpEl,curDescription = this.rosiContainer.find(".big-content .description"),curLike = this.rosiContainer.find(".like-btn .share-num"),curDown = this.rosiContainer.find(".download-btn .share-num"),curFb = this.rosiContainer.find(".facebook-btn .share-num"),likeCon = this.rosiContainer.find(".like-btn"),tag1 = _this.getQueryStringByName("tag1"),tag2 = _this.getQueryStringByName("tag2"),album = _this.getQueryStringByName("album"),
			imgId = _this.replaceTpl(conf.commonUrl.imgidIndex,{
				tag1:tag1,
				tag2:tag2,
				album:album,
			});
		how == "prev" ? tmpEl = tmp.prev() : tmpEl = tmp.next();
		
		var width = tmpEl.attr("data-width"),
			height = tmpEl.attr("data-height"),
			description = tmpEl.attr("img-des"),
			cur = _gEl.find(".current-num");

		//如果是第一项或者最后一项，它的前一项或后一项不存在，则返回，不操作
		if(how == "prev"){
			if(tmp.attr("data-sort") == 0){
				return ;
			}
		}
		if(!tmpEl.attr("big-img")){
			$("#overlay").show();
			$("#r-more").show();
			return ;
		}
		//添加选中效果
		tmpEl.addClass("item-h");

		//大图按钮点击后操作标题数字
		cur.text(parseInt(tmpEl.attr("data-sort"))+1);

		likeCon.removeClass("btn-disabled");

		//分享到文本
		curLike.text(parseInt(tmpEl.attr("data-like")));curDown.text(parseInt(tmpEl.attr("data-down")));curFb.text(parseInt(tmpEl.attr("data-fb")));
		
		if(typeof(history.pushState) == 'function'){
			history.pushState("","",imgId+"&imgid="+tmpEl.attr("img-id"));
		};
		
		//大图操作项
		bigImg.find('a').attr("href","").attr("href",tmpEl.attr("big-img"));
		bigImg.find('img').attr("src","").attr("src",tmpEl.attr("big-img"));
		/*移出文字*/
		curDescription.text("");

		if(description != ''){
			curDescription.text(description);
			if($(".big-content .description").height() >= 25){
				$(".big-content .description").css("text-align","left");
			}
			bigImg.find('img').height($(window).height() -210);bigImg.width(width*($(window).height() -210)/height);
		}else{
			bigImg.find('img').height($(window).height() -190);bigImg.width(width*($(window).height() -190)/height);	
		}
		//大图切换操作
		

		//移出前一项
		tmp.removeClass('item-h');
	},
	handleExchange:function(){

		this.handleSmallImg();

		this.handleBigImg();

	},
	/*页面渲染小图操作*/
	renderImg:function(result){
		//=================================================
		//	 小图DOM操作
		//		1）等比例压缩图片（如果正常尺寸宽高比例大于设置的框，按高度等比例缩放，反之）
		//		2）默认情况设置第一个和最后一个为开始结束标示
		//=================================================
		var dom = '',
			_gEl = this.rosiContainer;
		for(var i=0;i<result.data.length;i++){
		
			function imgSize(){
				if((result.data[i].thumbnail_height/result.data[i].thumbnail_width)>1){
					return "width";
				}else{
					return "height";
				}	
			};
			
			dom = dom + this.replaceTpl(this.itemImg,{
				"url" : result.data[i].thumbnail_url,
				"pn" : result.data[i].pn,
				"hw": imgSize(),
				"value" : 70 ,
				"big" : result.data[i].image_url ,
				"width":result.data[i].image_width,
				"height":result.data[i].image_height,
				"down":result.data[i].i18n_image_download,
				"like":result.data[i].i18n_image_like,
				"fb":result.data[i].i18n_image_share,
				"id":result.data[i].id,
				"description":result.data[i].description,
			});
		};
		
		_gEl.find(".small-container").find("ul").append(dom);
	},
	/*初始化默认加载项*/
	initEl:function(){
		// ==========================================
		//	1.大图展示区默认展示第一张图片
		//	2.小图区默认高亮第一张
		//	3.为第一项和最后一项添加display_start 和 display_last标示符
		// 	4.标题处展示总数和默认显示项
		// ==========================================
		var _this = this,
			_gEl = this.rosiContainer,width = _gEl.find(".small-item").attr("data-width"),height = _gEl.find(".small-item").attr("data-height"),imgFirstUrl = _gEl.find(".small-item").eq(0).attr("big-img"),imgDetail = _gEl.find(".small-item"),total = parseInt($("body").attr("total")),imgid = _this.getQueryStringByName("imgid");

		/*操作默认小图和大图的展示，为展示第一张*/
		imgDetail.eq(0).addClass("display_start");
		imgDetail.eq(11).addClass("display_last");

		/*标题上面的展示*/
		_gEl.find(".return_num").text(total);

		
		/*分享到部分初始值*/
		if(imgid){
			/**	
			***	如果页面加载时url参数中带有imgid字段，则请求imgid接口将大图设置为其值
			***	否则则显示专辑中的第一张图片信息
			**/
			_this.requestAxtra();
		}else{
			imgDetail.eq(0).addClass("item-h");
			/*设置大图的详细信息*/
			_gEl.find(".big-img").find('a').attr("href",imgFirstUrl);_gEl.find(".big-img").find('img').attr("src",imgFirstUrl).height($(window).height() - 185);_gEl.find(".big-img").width(width*($(window).height() -210)/height);_gEl.find(".download-btn .share-num").html(_gEl.find(".small-item").eq(0).attr("data-down"));_gEl.find(".like-btn .share-num").html(_gEl.find(".small-item").eq(0).attr("data-like"));_gEl.find(".facebook-btn .share-num").html(_gEl.find(".small-item").eq(0).attr("data-fb"));_gEl.find(".current-num").text(1);
		}
		
	},
	requestAxtra:function(){
		var _this = this,
			_gEl = this.rosiContainer,imgid = _this.getQueryStringByName("imgid"),al = _this.getQueryStringByName("album"),st = _this.getQueryStringByName("st"),smallIcon = _gEl.find(".small-item"),
			extraUrl = _this.replaceTpl(conf.commonUrl.imgUrl,{
				imgid:imgid,
				al:al,
				st:st,
			});
		
		$.ajax({
			url: extraUrl,
			dataType: "jsonp",
			jsonp: "jsonp",
			/*jsonpCallback: "ghao123_" + hex_md5(voteparams,16),*/
			cache: false,

			success:function(result){
				var width = result.data[0].image_width,height = result.data[0].image_height,isMacthed = false;
				//选中小图中对应的图片
				smallIcon.each(function(){
					if($(this).attr("img-id") == imgid){
						$(this).addClass("item-h");
						isMacthed = true;
					}
				});
				if(!isMacthed){
					smallIcon.eq(0).addClass("item-h");
				}
				//设置接口数据中的imgid对应值
				_gEl.find(".big-img").find('a').attr("href",result.data[0].image_url);_gEl.find(".big-img").find('img').attr("src",result.data[0].image_url).height($(window).height() - 185);_gEl.find(".big-img").width(width*($(window).height() -210)/height);_gEl.find(".download-btn .share-num").html(result.data[0].i18n_image_download);_gEl.find(".like-btn .share-num").html(result.data[0].i18n_image_like);_gEl.find(".facebook-btn .share-num").html(result.data[0].i18n_image_share);_gEl.find(".current-num").text(parseInt(result.data[0].pn)+1);
				
			},
			error:function(){
				
			}
		});
	},
	/*ar的专辑名称接口*/
	requestAlumb:function(tag1,tag2){
		
		var _this = this,
			nameUrl = _this.replaceTpl(conf.commonUrl.albumName,{
				tag1:tag1,
				tag2:tag2
			});
		$.ajax({
			url: nameUrl,
			dataType: "jsonp",
			jsonp: "jsonp",
			/*jsonpCallback: "ghao123_" + hex_md5(voteparams,16),*/
			cache: false,

			success:function(result){
				$(".album-name").text(result.album_name);	
			},
			error:function(){
				
			}
		});
	},
	// =============================
	//	默认加载时的接口（专辑瀑布流）
	//		1.ar接口请求主要字段为tag1，tag2
	//		2.br主要接口为al
	//		3.初始化接口返回数据
	//		4.设置图片尺寸
	// =============================
	requestData:function(st,tag1,tag2,start,rn,al){

		//请求借口URL，分为br和ar两种
		var _this = this,
			rosiUrl = _this.replaceTpl(conf.commonUrl.common,{
				rn:rn,
				start:start,
				tag1:tag1,
				tag2:tag2,
				al:al
			});
		
		$.ajax({
			url: rosiUrl,
			dataType: "jsonp",
			jsonp: "jsonp",
			/*jsonpCallback: "ghao123_" + hex_md5(voteparams,16),*/
			cache: false,

			success:function(result){

				//专辑名称，br直接从接口取
				//名称在br中直接可以在此接口请求，在ar中是请求另外一个接口
				if(conf.dir == "ltr"){
					$(".album-name").text(result.album_name);
				};
				//渲染小图
				_this.renderImg(result);

				//小图操作
				_this.handleSmall();
				
				//默认加载时显示的项
				//按钮的操作为默认
				if(!$("body").attr("total")){
					$("body").attr("total",result.total_number);
					//默认加载项操作
					_this.initEl();

					//计算屏幕宽度，设置按钮位置
					_this.setExchange();

					//操作按钮
					_this.handleExchange();	
				}
				
				
			},
			error:function(){
				
			}
		});
	},
	/*pop的数据接口*/
	requestPopData:function(tag1,rn){
		var _this = this,
			popUrl = _this.replaceTpl(conf.commonUrl.popUrl,{
				tag1:tag1,
				rn:rn,
			});
		$.ajax({
			url: popUrl,
			dataType: "jsonp",
			jsonp: "jsonp",
			/*jsonpCallback: "ghao123_" + hex_md5(voteparams,16),*/
			cache: false,

			success:function(result){
				_this.handlePopImg(result);
			},
			error:function(){
				
			}
		});
	},
	/*弹出层的图片链接展示*/
	handlePopImg:function(result){
		var _this = this,tmp,
			_gEl = $("#r-more"),imgWrap01 = _gEl.find(".bb-img"),imgWrap02 = _gEl.find(".first-img"),imgWrap03 = _gEl.find(".last-img"),img01 = imgWrap01.find("img"),img02 = imgWrap02.find("img"),img03 = imgWrap03.find("img"),text01 = _gEl.find(".bb-img .img-txt"),text02 = _gEl.find(".first-img .img-txt"),text03 = _gEl.find(".last-img .img-txt"),
			arr = [];
		/*弹出层，将总数push到一个数组中，操作随机获取3个专辑，在弹出层显示*/
		for(var i=0;i<result.total_number;i++){
			arr.push(i);
		}

		tmp = _this.getArrayItems(arr,3);
		//跳转链接
		//处理ar和br分别请求不同接口的数据
		if(result.data[tmp[0]].album_id){
			imgWrap01.attr("href","/image/album?album="+result.data[tmp[0]].album_id);imgWrap02.attr("href","/image/album?album="+result.data[tmp[1]].album_id);imgWrap03.attr("href","/image/album?album="+result.data[tmp[2]].album_id);
		}else{
			imgWrap01.attr("href","/image/album?tag1="+result.data[tmp[0]].tag1+"&tag2="+result.data[tmp[0]].tag2);imgWrap02.attr("href","/image/album?tag1="+result.data[tmp[1]].tag1+"&tag2="+result.data[tmp[1]].tag2);imgWrap03.attr("href","/image/album?tag1="+result.data[tmp[2]].tag1+"&tag2="+result.data[tmp[2]].tag2);
		}
		
		//图片地址
		img01.attr("src",result.data[tmp[0]].ImageInfo[0].thumbnail_url);img02.attr("src",result.data[tmp[1]].ImageInfo[0].thumbnail_url);img03.attr("src",result.data[tmp[2]].ImageInfo[0].thumbnail_url);
		// 图片文字
		text01.text(result.data[tmp[0]].title);text02.text(result.data[tmp[1]].title);text03.text(result.data[tmp[2]].title);

	},
	/*数组中随机取三个不同的数*/
	getArrayItems:function(arr, num) {
	    //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
	    var temp_array = new Array();
	    for (var index in arr) {
	        temp_array.push(arr[index]);
	    }
	    //取出的数值项,保存在此数组
	    var return_array = new Array();
	    for (var i = 0; i<num; i++) {
	        //判断如果数组还有可以取出的元素,以防下标越界
	        if (temp_array.length>0) {
	            //在数组中产生一个随机索引
	            var arrIndex = Math.floor(Math.random()*temp_array.length);
	            //将此随机索引的对应的数组元素值复制出来
	            return_array[i] = temp_array[arrIndex];
	            //然后删掉此索引的数组元素,这时候temp_array变为新的数组
	            temp_array.splice(arrIndex, 1);
	        } else {
	            //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
	            break;
	        }
	    }
	    return return_array;
	},
	/*滚动鼠标时执行的操作*/
	handleScroll:function(){
		var _gEl = this.rosiContainer,
			_this = this;
		var isScrolled = false;

		$(window).on("mousewheel",function (e, delta){

			e.preventDefault();
			
			delta = delta > 0 ? 1 : -1;

			if(!isScrolled){
				if(conf.dir == 'rtl' ? delta > 0 : delta < 0){
					isScrolled = true;
					setTimeout(function(){
						var lastEl = _gEl.find(".display_last")
						//操作下一个的切换
						_this.handleBigImgDetail("next");
						//若切到边界，则进行滑动操作
						if(lastEl.hasClass("item-h")){
							_this.handleIndex("right");
						}
						isScrolled = false;
						return false;
					}, 400);
				}else{
					isScrolled = true;
					setTimeout(function(){
						var startEl = _gEl.find(".display_start");
						//操作上一个
						_this.handleBigImgDetail("prev");
						//若切到边界，则进行滑动操作
						if(startEl.hasClass("item-h")){
							_this.handleIndex("left");
						}
						isScrolled = false;
						return false;
					}, 400);
				}
			}
			
			
		});
	},
	/*获取url参数值*/
	getQueryStringByName: function(name){

		//以&为分隔符切割
	    var result = this.url.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
	    //为空返回空字符串
	    if(result == null || result.length < 1){
	        return "";
	    }
		//返回结果数组中第一项
		return result[1];
	},
	send:function(){
		var _this = this,
			alEl = $("#rosiContainer .nomal-album"),
			hoEl = $("#rosiContainer .nomal-home"),
			amEl = $(".n-container").find("a"),
			tag1 = _this.getQueryStringByName("tag1"),
			tag2 = _this.getQueryStringByName("tag2"),
			al = _this.getQueryStringByName("album"),
			close = $("#r-more .close"),
			big = $(".big-img").find('a');
		big.click(function(){
			UT.send({type:"click",modId:"img",channel:"image",ac:"a"});
		});
		alEl.click(function(){
			UT.send({type:"click",modId:"album",channel:"image",ac:"a"});
		});
		hoEl.click(function(){
			UT.send({type:"click",modId:"home",channel:"image",ac:"a"});
		});
		close.click(function(){
			UT.send({type:"click",modId:"album-rec",position:"close",channel:"image",ac:"a"});
		});
		amEl.click(function(){
			if(al != ""){
				UT.send({type:"click",modId:"album-rec",channel:"image",ac:"a",sort:"a"+al});
			}else{
				UT.send({type:"click",modId:"album-rec",channel:"image",ac:"a",sort:tag1+"-"+tag2});
			}
			
		});
	},
	/*初始化操作入口*/
	init:function(){
		// ============================
		//	1.请求数据进行渲染，屏加载30张图片
		//	2.专辑名称请求一个专门的借口
		//	3.初始化弹出层（包括借口数据的请求）
		//	4.按钮操作
		//	5.鼠标滚轮滑动时执行的操作
		// ============================
		var _this = this,
			tag1 = _this.getQueryStringByName("tag1"),tag2 = _this.getQueryStringByName("tag2"),al = _this.getQueryStringByName("album"),st = _this.getQueryStringByName("st") == "" ? 0 : _this.getQueryStringByName("st");
		
		//默认加载时的请求数据
		_this.requestData(st,tag1,tag2,0,conf.num.number,al);
		
		//专辑名称，ar下面调用一个新的接口
		if(conf.dir == "rtl"){
			_this.requestAlumb(tag1,tag2);
		}

		//操作下载，like，分享到facebook按钮
		_this.handleBtn();

		//滚动鼠标执行切换图片
		_this.handleScroll();

		//统计
		_this.send();
	},
};