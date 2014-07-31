<%*   声明对ltr/rtl的css依赖    *%>
<%if $head.dir=='ltr'%> <%require name="buy:widget/buy-hotsite/ltr/ltr.css"%> <%else%> <%require name="buy:widget/buy-hotsite/rtl/rtl.css"%> <%/if%>
	<%if $body.hotSite.isHidden == "1"%>
		<div class="mod-buy-hotsite" id="buyHot">
			<div class="nav">
				<ul>
					<%foreach $body.hotSite.nav as $nav%>
						<li class="nav-items"><%$nav.navName%></li>
					<%/foreach%>
				</ul>
			</div>
			<div class="hotsite-wrap">
				<%foreach $body.hotSite.nav as $nav%>
					<div class="hotsite-container hotsite<%$nav@index+1%>">
						<div class="hotsite-big">
							<ul id="da-thumbs" class="da-thumbs">
								<%foreach $nav.navItems as $bigItems%>
									<li class="hotsite-staff"><a href="<%$bigItems.link%>"><i class="s-img" style="background:url('<%$bigItems.redirect%>') no-repeat;"></i><div><%$bigItems.text%></div></a></li>
								<%/foreach%>
							</ul>
						</div>
						<div class="hotsite-small">
							<ul>
								<%foreach $nav.navItemsmall as $smallItems%>
									<a href="<%$smallItems.link%>"><li class="hotsite-small-item"><i class="s-img" style="background:url('<%$smallItems.redirect%>') no-repeat"></i><span class="hotsite-s-text"><%$smallItems.name%></span></li></a>
								<%/foreach%>
							</ul>
						</div>
					</div>		
				<%/foreach%>
			</div>
		</div>
	<%/if%>

<%script%>
	require.async('buy:widget/buy-hotsite/buy-hotsite.js',function(buyHot){
		new buyHot();
	});
<%/script%>