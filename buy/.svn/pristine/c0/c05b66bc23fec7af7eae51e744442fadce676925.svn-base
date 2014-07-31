<%script%>
	require.async("buy:widget/ui/jquery/jquery.js", function($) {
		$(window).one("e_go.weather", function () {
			require.async("buy:widget/ui/weather/weather.js", function (Gl) {
				Gl.weather.init(__uri('./weather_city.json'));
			});
		});

		$(function () {
			$(window).trigger("e_go.weather");
		});

		$("#weather").one("mouseenter", function () {
			$(window).trigger("e_go.weather");
		});
	});
<%/script%>
<%require name="buy:widget/ui/weather/`$country`/`$country`_flat.js" async="true" %>