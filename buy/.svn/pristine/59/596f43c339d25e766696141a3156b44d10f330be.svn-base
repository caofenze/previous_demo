<%*   声明对ltr/rtl的css依赖    *%>
<%if $head.dir=='ltr'%> <%require name="buy:widget/buy-nav/ltr/ltr.css"%> <%else%> <%require name="buy:widget/buy-nav/rtl/rtl.css"%> <%/if%>
<div class="mod-buy-banner banner" id="banner" style="float: left;">
	<%foreach $body.slideImg.items as $slide%>
		<a href="<%$slide.direct%>">
			<i class="d1" style="background:url('<%if $body.slideImg.width != '1120'%><%$slide.srcSec|escape%><%else%><%$slide.src|escape%><%/if%>') no-repeat;display:inline-block;"></i>
		</a>
	<%/foreach%>
	<div class="d2" id="banner_id">
		<ul>
			<%foreach $body.slideImg.items as $slide%>
				<li></li>
			<%/foreach%>
		</ul>
	</div>
</div>
<%if $body.slideImg.width != '1120'%>
	<div id="buySeckill" class="mod-sec-kill"></div>
<%/if%>
<%script%>
	conf.slideImg = <%json_encode($body.slideImg)%>;
	conf.common = <%json_encode($body.common)%>;
	require.async('buy:widget/buy-nav/buy-nav.js',function(buyNav){
		new buyNav();
	});
<%/script%>
