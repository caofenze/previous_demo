<%*   声明对ltr/rtl的css依赖    *%>

<%if $head.dir=='ltr'%> <%require name="buy:widget/buy-detail/ltr/ltr.css"%> <%else%> <%require name="buy:widget/buy-detail/rtl/rtl.css"%> <%/if%>
<%if $head.dir=='ltr'%> <%require name="buy:widget/ui/text-overflow/ltr/ltr.css"%> <%else%> <%require name="buy:widget/ui/text-overflow/rtl/rtl.css"%> <%/if%>

	<div id="buyDetail" class="mod-buy-detail">
		<div class="title-wrap line-block fl">
			<p class="title"><%$body.saleDetail.nav.title%></p>
		</div>
		<div class="nav-wrap line-block">
			<ul class="navigation" id="navigation" total="<%$body.saleDetail.nav.items|@count%>">
				<%foreach $body.saleDetail.nav.items as $navItem %>
				<li class="items" index="<%$navItem.id%>" sort="<%$navItem@index%>"><span><%$navItem.text%></span></li>
				<%/foreach%>
			</ul>
		</div>
		<div class="sort-wrap line-block s-mtl">
			<div class="sort-left fl">
				<span class="sort-title"><%$body.saleDetail.sort.title%></span>
				<select name="choose" class="sort-choose">
					<%foreach $body.saleDetail.sort.items as $sortItem%>
						<option value="<%$sortItem.value%>" st="<%$sortItem@index+1%>"><%$sortItem.value%></option>
					<%/foreach%>
				</select>
			</div>
			<div class="sort-right fr">
				<div class="sort-detail" log-mod="buy-sort-area"></div>
			</div>
		</div>
		<hr class="line line-block" />
		<div class="staff line-block s-mtl" log-mod="buy-staff-detail">
			<ul class="staff-container" id="staffContainer">
				
			</ul>
		</div>
		<hr class="line line-block" />
		<div class="sort-wrap line-block s-mtl s-mbl">
			<div class="sort-left fl">
				<span class="sort-title"><%$body.saleDetail.sort.title%></span>
				<select name="choose" class="sort-choose">
					<%foreach $body.saleDetail.sort.items as $sortItem%>
						<option value="<%$sortItem.value%>" st="<%$sortItem@index+1%>"><%$sortItem.value%></option>
					<%/foreach%>
				</select>
			</div>
			<div class="sort-right fr">
				<div class="sort-detail" log-mod="buy-sort-area"></div>
			</div>
		</div>
	</div>
<%script%>
	conf.common = <%json_encode($body.common)%>;
	conf.index = <%json_encode($body.saleDetail.sort.items)%>;

	require.async('buy:widget/buy-detail/buy-detail.js',function(buyDel){
		new buyDel();
	});
<%/script%>
