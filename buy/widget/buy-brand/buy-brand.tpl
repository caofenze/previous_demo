<%*   声明对ltr/rtl的css依赖    *%>
<%if $head.dir=='ltr'%> <%require name="buy:widget/buy-brand/ltr/ltr.css"%> <%else%> <%require name="buy:widget/buy-brand/rtl/rtl.css"%> <%/if%>
	<%if $body.brand.isHidden == "1"%>
		<div class="mod-buy-brand" id="buyBrand">
			<div class="nav">
				<ul>
					<%foreach $body.brand.nav as $nav%>
						<li class="nav-items"><%$nav.navName%></li>
					<%/foreach%>
				</ul>
			</div>
			<div class="brand-wrap">
				<%foreach $body.brand.nav as $nav%>
					<div class="brand-container brand<%$nav@index+1%>">
						<span class="prev-btn" id="prevBtn"></span>
						<span class="next-btn" id="nextBtn"></span>
						<div class="brand-items item<%$nav@index+1%>">
							<%foreach $nav.navItems as $items%>
								<ul class="da-thumbs01 brand-items-wrap b-item<%$items@index+1%>">
									<%foreach $items.detail as $detail%>
									<li class="brand-staff"><a href="<%$detail.redirect%>"><img src="<%$detail.img%>"/><div class="brand-bak"><%$detail.text%></div></a><a href="<%$detail.redirect%>" class="brand-name"><%$detail.name%></a></li>
									<%/foreach%>
								</ul>
							<%/foreach%>
						</div>
					</div>
				<%/foreach%>
			</div>
			<span class="prev-btn-bak"></span>
			<span class="next-btn-bak"></span>
		</div>
	<%/if%>

<%script%>
	require.async('buy:widget/buy-brand/buy-brand.js',function(buyBrand){
		new buyBrand();
	});
<%/script%>