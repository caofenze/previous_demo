<%*   声明对ltr/rtl的css依赖    *%>
<%if $head.dir=='ltr'%> <%require name="buy:widget/buy-collocation/ltr/ltr.css"%> <%else%> <%require name="buy:widget/buy-collocation/rtl/rtl.css"%> <%/if%>
	<%if $body.collocation.isHidden == 1%>
		<div class="mod-buy-collocation" id="buyCollo">
			<div class="col-title">
				<p class="col-t"><%$body.collocation.title%></p>
			</div>
			<hr class="line"/>
			<div class="col-wrap">
				<%if $body.collocation.nav|@count > 4%>
					<span class="pre"></span>
					<span class="next"></span>
				<%/if%>
				<div id="container">
					<ul class="templates clearfix">
						<%foreach $body.collocation.nav as $nav%>
							<li index="<%$nav@index%>">
								<a href="<%$nav.redirect%>">
									<img alt="" src="<%$nav.img%>" />
								</a>
							</li>
						<%/foreach%>
					</ul>
				</div>

			</div>
			<div class="triangle-note" id="triangleNote">
				  <div class="del-message"></div>
			</div>
			<div id="detailInfo">
				<%foreach $body.collocation.nav as $nav%>
					<div class="col-detail">
						<ul>
							<a>
								<li class="col-del-items items-text">
									<p><%$nav.detail.description%></p>
								</li>
							</a>
							<%foreach $nav.detail.items as $item%>
								<a href="<%$item.redirect%>">
									<li class="col-del-items img-info">
										<img src="<%$item.img%>" />
										<div class="info">
											<p class="name"><%$item.name%></p>
											<p class="provider"><%$item.provider%></p>
											<p class="price">R$<span><%$item.price%></span></p>
										</div>
									</li>
								</a>
							<%/foreach%>
						</ul>
					</div>
				<%/foreach%>
			</div>
		</div>
	<%/if%>
<%script%>
	require.async('buy:widget/buy-collocation/buy-collocation.js',function(buyColl){
		new buyColl();
	});
<%/script%>