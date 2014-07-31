<%*   声明对ltr/rtl的css依赖    *%>
<%if $head.dir=='ltr'%> <%require name="buy:widget/buy-search/ltr/ltr.css"%> <%else%> <%require name="buy:widget/buy-search/rtl/rtl.css"%> <%/if%>
<div id="topSearch" class="mod-top-search" log-mod="buy-top-search">
	<div class="l-wrap">
		<div class="top-del">
			<form action="http://www.zoom.com.br/search">
		 		<span class="title"><%$body.topSearch.prefix%></span> : 
		 		<%foreach $body.topSearch.items as $items%>
		 			<a class="items" href="<%$items.redirect%>"><%$items.text%></a> 
		 		<%/foreach%>
		 		<input type="text" class="seller-inputtext" name="q" autocomplete="off" pl="busque por produtos" placeholder="">
		 		<span class="form-params">
		 			<input type="hidden" value="19040" name="og"/>
		 			<input type="hidden" value="hao123" name="utm_source"/>
		 			<input type="hidden" value="midia" name="utm_medium"/>
		 			<input type="hidden" value="logo_vitrine" name="utm_campaign"/>
		 			<input type="hidden" value="1" name="s"/>
		 		</span>
		 		<input type="submit" class="submit" value="<%$body.topSearch.postTxt%>"/>
		 	</form>
	 	</div>
	</div>
</div>

<%script%>
	require.async('buy:widget/buy-search/buy-search.js',function(buySearch){
		new buySearch();
	});
<%/script%>
