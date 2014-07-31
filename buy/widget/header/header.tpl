<%style%>
<%if $head.dir=='ltr'%> 
@import url('/widget/header/ltr/ltr.css?__inline');
<%else%> 
@import url('/widget/header/rtl/rtl.css?__inline');
<%/if%>
<%/style%>

<%*   声明对ltr/rtl的css依赖    *%>
<%if $head.dir=='ltr'%> 
<%require name="buy:widget/header/ltr/ltr.more.css"%>
<%else%>
<%require name="buy:widget/header/rtl/rtl.more.css"%> 
<%/if%>

<div class="userbar-wrap" id="top" alog-alias="userBar">
	<div class="userbar l-wrap">
	    <%widget name="buy:widget/header/logo/logo.tpl"%>
	    <div class="userbar-glo">
	    <div class="userbar-logoSibling <%if $head.dir=='ltr'%>fl<%else%>fr<%/if%>">
	        <%if !empty($body.headerTest.logoSibling)%>
			    <%foreach explode("|", $body.headerTest.logoSibling) as $item%>
			    <%if $item == "weather"%>
			        <div class="weather-wrap" id="weatherWrap">
			        <%*<div class="weather-wrap_arrow"><div class="weather-wrap_arrow-bg"></div></div>*%>
			        <%widget name="buy:widget/header/`$item`/`$item`.tpl"%>
			        <div class="weather-tip_def" id="weatherClkTip"></div>
			        <div id="weatherMoreWrap" class="weather-more_wrap" alog-alias="weatherMore">
			            <div class="weather-more_line">
			                <ul id="weatherMore" class="weather-more"></ul>
			            </div>
			        </div>
			        </div>
			    <%else%>
			        <%widget name="buy:widget/header/`$item`/`$item`.tpl"%>
			    <%/if%>
			    <%/foreach%>
			<%/if%>
		</div>
		<div class="userbar-tool <%if $head.dir=='ltr'%>fr<%else%>fl<%/if%>">
		<%if !empty($body.headerTest.showContent)%>
			<%foreach array_reverse(explode("|", $body.headerTest.showContent)) as $module%>
				<%widget name="buy:widget/header/`$module`/`$module`.tpl"%>
			<%/foreach%>
		<%/if%>
		</div>
		</div>
	</div>
</div>
<%script%>
 conf.headerTest = {
     dateWidth : "<%$body.headerTest.dateWidth%>",
     weatherWidth : "<%$body.headerTest.weather.width%>",
     isCeiling: "<%$body.headerTest.isCeiling%>",
     ceilingMore: "<%$body.headerTest.ceilingMore%>",
     settingTip: "<%$body.headerTest.settingTip%>",
     ceilingLogo: "<%$body.headerTest.ceilingLogo%>"
 };
<%/script%>


