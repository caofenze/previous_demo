<script>
window.conf || (window.conf = {});
conf.country = "<%$sysInfo.country|default:'br'%>";
conf.host = "<%$sysInfo.host%>";
conf.pageType = /^index/.test("<%$head.pageType%>") ? "index" : "<%$head.pageType%>";
conf.moreText = "<%$head.moreText|default:'MORE'%>";
conf.cdn = "<%$head.cdn|default:''%>";
conf.apiUrlPrefix = "<%$head.apiUrlPrefix%>";
conf.uploadUrlPrefix = "<%$head.uploadUrlPrefix%>";
conf.fbAppId = "<%$head.fbAppId%>";
conf.dir = "<%$head.dir%>";

<%* UT模块，全局的属性配置 *%>
conf.UT = {
	params: {
		country: "<%$sysInfo.country|default:''%>",
		level: "<%$head.pageLevel%>",
		page: "<%$head.pageId%>",
		type: 'click'  //default
		<%if !empty($head.channel)%>
		,channel:"<%$head.channel%>"
		<%/if%>
	},
	tn: window.location.search.match(/(^|&|\\?)tn=([^&]*)(&|$)/i)===null?"/":window.location.search.match(/(^|&|\\?)tn=([^&]*)(&|$)/i)[2]
};
</script>
