<%*   声明对ltr/rtl的css依赖    *%>

<%if $head.dir=='ltr'%> <%require name="buy:widget/buy-homedetail/ltr/ltr.css"%> <%else%> <%require name="buy:widget/buy-homedetail/rtl/rtl.css"%> <%/if%>

	<div id="shopContainer" class="sort-shop mod-sort-shop">
		<ul class="category">
			<%foreach $body.nav as $nav%>
				<li>
					<span class="go">
						<span class="activego">
						</span>
					</span>
					<span><%$nav.name%></span>
				</li>
			<%/foreach%>
			<%foreach $root.for_home_data.content.data as $smartData%>
				<li>
					<span class="go">
						<span class="activego">
						</span>
					</span>
					<span><%$smartData.bannertitle%></span>
				</li>
			<%/foreach%>
		</ul>
		<div class="detail">
			<%foreach $body.detail as $detail%>
				<div class="sort-detail">
					<ul class="<%$detail.tpl%>">
						<%if $detail.tpl=="tpl-01"%>
							<%foreach $detail.main as $main%>
								<li class="item">
									<a href="<%$main.dedirect%>" class="box">
										<div class="info">
											<div class="name"><%$main.name%></div>
											<div class="price"><%$main.price%></div>
											<div class="supplier"><%$main.provider%></div>
										</div>
										<img class="img" src="<%$main.img%>"/>
									</a>
								</li>
							<%/foreach%>
						<%elseif $detail.tpl=="tpl-02"%>
							<%foreach $detail.main as $main%>
								<%if $main@index == 1%>
									<li class="big-banner">
										<a href="<%$main.redirect%>" class="big-detail" style="background:url(<%$main.img%>) center center no-repeat">
										</a>
									</li>
								<%else%>
									<li class="item">
										<a href="<%$main.redirect%>" class="box">
											<div class="info">
												<div class="name"><%$main.name%></div>
												<div class="price"><%$main.price%></div>
												<div class="supplier"><%$main.provider%></div>
											</div>
											<img class="img" src="<%$main.img%>"/>
										</a>
									</li>
								<%/if%>
							<%/foreach%>
						<%elseif $detail.tpl=="tpl-03"%>
							<%foreach $detail.main as $main%>
								<li class="item">
									<a href="<%$main.redirect%>" title="<%$main.title%>">
										<img src="<%$main.img%>"/>
									</a>
								</li>
							<%/foreach%>
						<%elseif $detail.tpl=="tpl-04"%>
							<%foreach $detail.main as $main%>
								<%if $main@index == 2%>
									<li class="big-banner">
										<a href="<%$main.redirect%>" title="<%$main.title%>">
											<img src="<%$main.img%>"/>
										</a>
									</li>
								<%else%>
									<li class="item">
										<a href="<%$main.redirect%>" title="<%$main.title%>">
											<img src="<%$main.img%>"/>
										</a>
									</li>
								<%/if%>
							<%/foreach%>
						<%/if%>
					</ul>
				</div>
			<%/foreach%>
			<%foreach $root.for_home_data.content.data as $data%>
				<div class="sort-detail">
					<ul class="tpl-02">
						<%foreach $data.products as $products%>
							<%if $products@index == 1%>
								<li class="big-banner">
									<a href="<%$data.bannerurl%>" style="background:url(<%$data.bannerimg%>) center center no-repeat" class="big-detail">
									</a>
								</li>
							<%/if%>
							<li class="item">
								<a href="<%$products.produrl%>" class="box">
									<div class="info">
										<div class="name"><%$products.prodtitle%></div>
										<div class="price"><%$products.prodprice%></div>
										<div class="supplier"><%$products.supplier%></div>
									</div>
									<img class="img" src="<%$products.prodimg%>"/>
								</a>
							</li>
						<%/foreach%>
					</ul>
				</div>
			<%/foreach%>
		</div>
	</div>

<%script%>
	conf.common = <%json_encode($body.common)%>;

	require.async('buy:widget/buy-homedetail/buy-homedetail.js',function(forHome){
		new forHome();
	});
<%/script%>