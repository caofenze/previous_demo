window.conf || (window.conf = {});
var $ = require('buy:widget/ui/jquery/jquery.js');
require('buy:widget/ui/jquery/widget/jquery.ui.button/jquery.ui.button.js');  //jquery.UI

conf.weatherArea = {"Brasil":["zmw:00000.1.83780","zmw:00000.1.83755","zmw:00000.1.83096","zmw:00000.1.82191","zmw:00000.1.83587","zmw:00000.1.82024","zmw:00000.1.83377","zmw:00000.1.83612","zmw:00000.1.83361","zmw:00000.1.83840","zmw:00000.1.83897","zmw:00000.1.82397","zmw:00000.1.83423","zmw:00000.1.82798","zmw:00000.1.82993","zmw:00000.1.82098","zmw:00000.1.82331","zmw:00000.1.82599","zmw:00000.1.83860","zmw:00000.1.83971","zmw:00000.1.82825","zmw:00000.1.82899","zmw:00000.1.82915","zmw:00000.1.83755","zmw:00000.1.83229","zmw:00000.1.82281","zmw:00000.1.83780","zmw:00000.1.82578","zmw:00000.1.83648"]}

;;(function(DOC, areas, cityId, request, cites, tips) {
	var $ = jQuery,
		wrap = $("#weatherCityLayer"),
		area = $("#weatherCity_area"),
		city = $("#weatherCity_city"),
		btnSave = $("#weatherCity_save"),
		btnCancel = $("#weatherCity_cancel"),
		parent = $("#selectWeatherCity").parent(),
		
		//record the init seleted
		initAreaSelect,
		initCityIdx,

		initAreaIndex,
		initCityIndex,

		_area = area.get(0),
		_areaOp = _area.getElementsByTagName("option"),
		
		hide = function() {
			parent.removeClass("city-click");
			wrap.hide();
		},
		render = function(data, el, value, innerHTML) {
			var temp = document.createDocumentFragment(),
				node = document.createElement("OPTION");
				
			$.each(data, function(key, val) {
				node = node.cloneNode(false);
				node.value = value ? value(val, key) : key;
				node.innerHTML = innerHTML ? innerHTML(val, key) : key;
				temp.appendChild(node);
			});
			el.html("");
			el.css("zoom", "1");
			el[0].appendChild(temp);
		};

	var areasHash = (function(data, list) {
		var group = {};
		for(var pro in data) {
			if(data.hasOwnProperty(pro)) {
				group[pro] = [];
				for(var i = 0, j = data[pro].length; i < j; i++) {
					group[pro].push({
						"id": data[pro][i],
						"name": list[data[pro][i]]
					});
				}
			}
		}
		return group;
	})(areas, cites);

	//hide when click blank space
	$(DOC).on("click", function(e) {
		var el = e.target;
		wrap.css("display") === "block" && el !== $("#selectWeatherCity")[0] && el !== wrap[0] && !jQuery.contains(wrap[0], el) && hide();
	});
	
	$(btnSave).on("click", function() {
		var val = $("#weatherCity_cityPicker").attr("value") || cityId;
		
		//updata cityId before request
		Gl.weather.cityId = val;
		
		request();
		
		if(navigator.cookieEnabled) {
			hide();
			$.cookie("weatherCity", val, {expires: 2000});
			
		} else {
			alert(tips["nocookie"]);
		}
	});
	
	$(btnCancel).on("click", function() {
		hide();
	});
	
	btnSave.on("mousedown", function() {
		btnSave.addClass("mod-btn_normal_click");
	});
	
	btnSave.on("mouseup", function() {
		btnSave.removeClass("mod-btn_normal_click");
	});
	
	btnSave.on("mouseout", function() {
		btnSave.removeClass("mod-btn_normal_click");
	});
	
	btnCancel.on("mousedown", function() {
		btnCancel.addClass("mod-btn_cancel_click");
	});
	
	btnCancel.on("mouseup", function() {
		btnCancel.removeClass("mod-btn_cancel_click");
	});
	
	btnCancel.on("mouseout", function() {
		btnCancel.removeClass("mod-btn_cancel_click");
	});
	
	btnSave.button();
	btnCancel.button();
	//render area.select
	render(areas, area);
	
	//there used double "setTimeout" to fixed IE6 render thread bug, fuck!!
	setTimeout(function() {
		//reset the area.select's selected by cityId
		cityId && $.each(area.children("option"), function(n, val) {
			if(areas[val.value].join().indexOf(cityId) > -1) {
				val.selected = true;
				initAreaSelect = val;
				initAreaIndex = n;
				return false;
			}
		});
		//render city.select
		render(areas[area.val()], city, function(val, key) {
			return val;
		}, function(val, key) {
			return cites[val];
		});
		setTimeout(function() {
			//reset the city.select's selected by cityId
			cityId && $.each(city[0].options, function(n, val) {
				if(val.value === cityId) {
					val.selected = true;
					initCityIndex = n;
					initCityIdx = city.selectedIndex;
					return false;
				}
			});
			
			require.async("buy:widget/ui/dropdownlist/dropdownlist.js", function(dropdown) {
				var cityDrop = new dropdown({
					selector: "weatherCity_city",
					defIndex: initCityIndex || 0,
					supportSubmit: 1,
					lineHeight: 40,
					customScrollbar: 1
				});
				var areaDrop = new dropdown({
					selector: "weatherCity_area",
					defIndex: initAreaIndex || 0,
					supportSubmit: 1,
					lineHeight: 40,
					customScrollbar: 1,
					child: cityDrop,
					onChange: function() {
						var that = this;
						that.child.reset(areasHash[_areaOp[_area.selectedIndex].value]);
					}
				});
			});
		}, 16);
	}, 16);
})(document, conf.weatherArea, Gl.weather.cityId, Gl.weather.requestData, conf.weatherCity, conf.weather.tips);