var $ = require("buy:widget/ui/jquery/jquery.js");
var UT = require("buy:widget/ui/ut/ut.js");
var dropDown = require("buy:widget/ui/drop/drop.js");
var hex_md5 = require('buy:widget/ui/md5/md5.js');
var helper = require("buy:widget/ui/helper/helper.js");

//扩展setPage方法，分类中使用
;
(function($){

    $.fn.setPage =  function(container, count, pageindex) {

        var container = container;
        var count = count;
        var pageindex = pageindex;
        var a = [];
        var _this = this;
        //var _this = this;
        //总页数少于5 全部显示,大于5 显示前3 后3 中间3 其余....
        if (pageindex == 1) {
          a[a.length] = "<span class=\"prev unclick\">"+conf.common.prevBtn+"</span>";
        } else {
          a[a.length] = "<span class=\"prev\">"+conf.common.prevBtn+"</span>";
        }
        function pageList() {
          if (pageindex == i) {
            a[a.length] = "<a class=\"on\">" + i + "</a>";
          } else {
            a[a.length] = "<a>" + i + "</a>";
          }
        }
          //总页数小于5
        if (count <= 5) {
          for (var i = 1; i <= count; i++) {
            pageList();
          }
        }
        //总页数大于5页
        else {
          if (pageindex <= 4) {
            for (var i = 1; i <= 5; i++) {
              pageList();
            }
            a[a.length] = "...<a>" + count + "</a>";
          } else if (pageindex >= count - 3) {
            a[a.length] = "<a>1</a>...";
            for (var i = count - 4; i <= count; i++) {
              pageList();
            }
          }
          else { //当前页在中间部分
            a[a.length] = "<a>1</a>...";
            for (var i = pageindex - 2; i <= pageindex + 2; i++) {
              pageList();
            }
            a[a.length] = "...<a>" + count + "</a>";
          }
        }
        if (pageindex == count) {
          a[a.length] = "<span class=\"next unclick\">"+conf.common.nextBtn+"</span>";
        } else {
          a[a.length] = "<span class=\"next\">"+conf.common.nextBtn+"</span>";
        }
        
        container.html(a.join(""));
    };

})(jQuery);

function buyDel(){
    this.wrap = $("#buyDetail");
    this.nav = $("#navigation");
    this.staffCon = $("#staffContainer");
    this.sortWrap = $(".sort-wrap" , this.wrap);
    this.sort = $(".sort-detail" ,this.sortWrap);

    //导航分类的的操作，此处数据取自CMS
    this.handleItem();
    //商品详情页面的操作，API数据
    this.init();
    //排序操作
    this.sortEl();
};

buyDel.prototype = {
    constructor : buyDel ,
    
    init : function(){
        var item = $("li.items" , this.nav),
            category = $(".checked" , this.nav).attr("index");
        
        //请求数据
        this.requestData(category,conf.index[0].id,1,40);
        
        this.handlePage(this.sort);
    },
    
    handleItem : function(){
        var item = $("li.items" , this.nav),
            itemImg = $(".staff-items" , this.wrap),
            _this = this;

        //设置每一导航项宽度，并且在页面刷新后重置其之前选中项
        item.width(Math.floor(this.nav.width()/this.nav.attr("total"))).eq($.cookie("last_index")).addClass("checked");
        
        item.on("click",this,function(){
            var index = $(this).attr("index"),
                sort = $(this).attr("sort");
            
            UT.send({type:"click",modId:"buy-deatil-nav",channel:"buy",ac:"a"});

            $.cookie("last_index",sort);

            //样式操作
            $(this).addClass("checked").siblings().removeClass("checked");
            
            //重新切换分类后，对应的排序切换为默认的以名称排序
            $(".select_showbox").text($(".select_option li:first").text());
            $(".select_option").each(function(){
                $(this).find("li:first").addClass("selected").siblings().removeClass("selected");
            });
            //对应请求
            $("html , body").animate({scrollTop : $("#buyDetail").position().top},1);
            _this.requestData(index,conf.index[0].id,1,40);
        });
    },

    requestData:function(category,st,pageid,number){

        var url = conf.common.apiUrl + "?app=shopping&act=contents&vk=1&country=br&category="+category+"&st="+st+"&page="+pageid+"&number="+number;
        
        var _this = this;
        
        $.ajax({
            url:url,
            dataType: "jsonp",
            jsonp: "jsonp",
            jsonpCallback: "ghao123_" + hex_md5(url,16),
            cache: false,

            success:function(result){

                _this.renderContainer(result.content.data,pageid);
                
            },
            error:function(){
              
            }
        })
    },

    renderContainer:function(result,pageid){
        var page = Math.ceil(parseInt(result.total_number) / 40),
            
            _this = this,

            dom = "",

            buyContainer = '<a href="#{staff_redirect}">'
                              +'<li class="staff-items">'
                                +'<span class="staff-cut">'
                                  +'<span class="cut-num">#{staff_discount}</span>'
                                  +'<span class="cut-percent">%</span>'
                                  +'<span class="cut-on">OFF</span>'
                                +'</span>'
                                +'<div class="staff-img-wrap m-mtl">'
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
                              +'</li>'
                            +'</a>';

        isNaN(page) ? page = 1 : page ;

        //清空商品信息模板
        this.staffCon.html("");

        //给商品信息模板标示页码总数
        this.sort.attr("total",page);

        //设置分页页码
        $.fn.setPage(_this.sort,page,pageid);
        
        this.wrap.css("visibility","visible");

        if(result.data.length){
            for(var i=0; i <result.data.length ; i++) {
                dom = dom + helper.replaceTpl(buyContainer,{
                    "staff_redirect" : result.data[i].staff_redirect ,
                    "staff_discount" : result.data[i].staff_discount ,
                    "staff_img" : result.data[i].staff_img ,
                    "staff_name" : result.data[i].staff_name ,
                    "staff_provider" : result.data[i].staff_provider ,
                    "staff_price" : result.data[i].staff_price ,
                    "staff_disprice" : result.data[i].staff_disprice ,
                });
            } 
            this.staffCon.append(dom);

            $(".cut-num").each(function(){
               if($(this).text() == 0){
                  
                  $(this).parent().siblings(".staff-origin").hide();
                  $(this).parent().siblings(".staff-bargin").css("margin-top","15px");
                  $(this).parent().hide();
               }
            });
            $("#staffContainer a").click(function(){
                UT.send({type:"click",modId:"buy-detail-staff",channel:"buy",ac:"a"});
            });
        }
    },

    handlePage : function(container){

       //事件点击
      var _this = this ;

      container.on("click", ".prev", function(){
          var inx = parseInt($(this).siblings(".on").text()),
              cate = parseInt($("#navigation .checked").attr("index")),
              sort = parseInt($(".select_option .selected").attr("st"));

          if (inx == 1) {
            return false;
          }

          inx--;
          
          $("html , body").animate({scrollTop : _this.wrap.position().top},1);
          
          _this.requestData(cate,sort,inx,40);

          return false;
      });

      container.on("click", "a", function(){
        
        var cate = parseInt($("#navigation .checked").attr("index")),
            sort = parseInt($(".select_option .selected").attr("st")),
            inx = parseInt(this.innerHTML);
          $("html , body").animate({scrollTop : _this.wrap.position().top},1);
          _this.requestData(cate,sort,inx,40);
          
          return false;
      });

      
      container.on("click", ".next", function() { //点击下一页
        var inx = parseInt($(this).siblings(".on").text()),
            count = parseInt(container.attr("total")),
            cate = parseInt($("#navigation .checked").attr("index")),
            sort = parseInt($(".select_option .selected").attr("st"));

        if (inx == count) {
          return false;
        }
        inx++;
        $("html , body").animate({scrollTop : _this.wrap.position().top},1);
        _this.requestData(cate,sort,inx,40);
        return false;
      });

    },

    sortEl : function(){
        var _this = this;

        $(".select_option").on("click" , "li" ,function(){

            UT.send({type:"click",modId:"buy-deatil-sort",channel:"buy",ac:"a"});
            
            var category = $("#navigation .checked").attr("index"),
                inx = $(this).attr('st');
            $("html , body").animate({scrollTop : _this.wrap.position().top},1);
            _this.requestData(category,inx,1,40);
        });
    },
    
}

module.exports = buyDel;