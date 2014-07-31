<%style%>
<%if $head.dir=='ltr'%> 
@import url('/widget/header/account/ltr/ltr.css?__inline');
<%else%> 
@import url('/widget/header/account/rtl/rtl.css?__inline');
<%/if%>
<%/style%>

<%*   声明对ltr/rtl的css依赖    *%>
<%if $head.dir=='ltr'%> 
<%require name="buy:widget/header/account/ltr/ltr.more.css"%> 
<%else%> 
<%require name="buy:widget/header/account/rtl/rtl.more.css"%> 
<%/if%>

<div id="accountWrap" class="account_wrap box-message" log-mod="account">
    <div class="account_trig"></div>
    <i class='ico-message-new hide'></i>
    <div class="account-dropdown_wrap">
		<%widget name="buy:widget/header/message/message.tpl"%>
        <div class="account-loginfo_wrap">
		   <div class="account_login-tip">
	           <p class="login-tip_con"><%$body.commonLogin.txtDefaultBtn%></p>
	       </div>
	       <div class="account_logout-tip">
	           <div class="account_logout_content">
	               <p class="account_logout_name"></p>
	               <p class="account_logout_email"></p>
	               <p class="account_logout_con">
	                   <a href="#" target="_self" class="account_logout_btn"><%$body.commonLogin.logoutTxt%></a>
	               </p>
	           </div>
	       </div>
       </div>
    </div>
</div>

<%script%>
window.conf || (window.conf = {});
	<%*
	/**
	 * Facebook页面登录退出的配置信息(可供PM使用)
	 * conf.commonLogin:入口。
	 * 信息：(1)iWidth，iHeight:弹出窗口宽高。
	 * 		 (2)userip: 登录时的参数信息(可配)。
	 * 		 (3)jumpUrl:登录时的参数信息(可配)。
	 * 		 (4)loginUrl:登录时的参数信息(可配)。
	 * 		 (5)checkLoginUrl：Ajax请求地址。
	 * 		 (6)logoutUrl:退出时请求的URL地址，刷新页面。
	 * 		 (7)domainName:各国机房服务器地址(优先选择的地址)。
	 * 		 (8)txtDefaultBtn:默认按钮文字信息(可配)。
	 * 		 (9)txtErrorMsg:错误状态提示信息(可配)。
	 * 		 (10)level:权限级别(可配)。
	 */
	*%>   

	conf.commonLogin = {
		iWidth     : <%$body.commonLogin.iWidth%>,
		iHeight    : <%$body.commonLogin.iHeight%>,     
		countryCode: conf.country,
		
		<%if !empty($sysInfo.userip)%>
		userip: "<%$sysInfo.userip%>",
		<%else%>
		userip: "sdfdslgksdlgk",
		<%/if%>

		loginCallbackName: "<%$body.commonLogin.loginCallbackName%>",

		jumpUrl       : "<%$body.commonLogin.jumpUrl%>",
		hao123LoginUrl: "<%$body.commonLogin.hao123LoginUrl%>",
		checkLoginUrl : "<%$body.commonLogin.checkLoginUrl%>",
		logoutUrl     : "<%$body.commonLogin.logoutUrl%>",
		domainName    : <%json_encode($body.commonLogin.domainName)%>,
		txtErrorMsg   : "<%$body.commonLogin.txtErrorMsg%>",
		idcMap        : <%json_encode($body.commonLogin.idcMap)%>,
		level		  : "<%$body.commonLogin.level%>",
		message       : "<%$body.commonLogin.message%>",
		infoMsg       : "<%$body.commonLogin.infoMessage%>",
		defauImg      : "<%$body.headerTest.accountDefaultImg%>",
		defauUrl      : "<%$body.headerTest.accountUrl%>"
	};

require.async(["buy:widget/ui/jquery/jquery.js", "buy:widget/header/account/account-async.js"], function ($) {
    var onceRun = {
        runned: false,
        running: function() {
            if(window.loginCtroller) {
		   	    loginCtroller.init();
		   	    loginCtroller.isInited = true; // mark if init
		    }
        }
    };
    $("#accountWrap").one("mouseenter", function() {
        if(!onceRun.runned) {
            onceRun.running();
            onceRun.runned = true;
        }
    });
	// init
	$(function() {
		if(!onceRun.runned) {
            onceRun.running();
            onceRun.runned = true;
        }
	});
});

var accountTip = conf.commonLogin.defauImg;
require.async("buy:widget/ui/jquery/jquery.js", function ($) {
    if(/(png|gif|jpg|jpeg)/i.test(accountTip)) {
        $(".account_trig").removeClass("account_title").html("<img id='headPic' src='" + accountTip + "' />");
    } else {
        $(".account_trig").addClass("account_title").html(accountTip);
    }
});
<%/script%>
