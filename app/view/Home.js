
Ext.define('Vaanilai.view.Home',{
	//extend: 'Ext.Panel',
	xtype: 'Home',
	requires: ['Ext.carousel.Carousel'],
	requires: ['Ext.Anim'],
	requires: ['Ext.Map'],
	});


	
//Ext.Msg.alert('Title', 'The quick brown fox jumped over the lazy dog.', Ext.emptyFn);	
var msg = new Ext.MessageBox();
				msg.show({
                              title: '\'How To\' --- Manual',
							  style: 'background-color: #218cc2; color:white',
                              html: 'Swipe the upper part of the application to view all data',
                              buttons: [{text:'Fine Go ahead'}]
});
var globe = {
					active_card: null,
					climate_now: 'Climate Now',
					wind: 'Wind Now',
					temp: 'Temp',
					hum: 'Humidity',
					pressure: 'Pressure',
					cel: '&deg c',
					wind_dir: 'Direction',
					wind_speed: 'Speed',
					kmph: '<font size=5px face= Raleway,sans-serif> km/h </font>',
					wind_degree: 'Degree',
					humunit: '%',
					vaanilai: 'Vaanilai',
					deg: '&deg',
					tommorow: 'Tommorow',
					day_after_tommorow: 'Day after tommorow',
					map: 'Weather Map',
					forecast: 'Forecast',
					world_weather: 'World Weather',
				};
var image_selector;	
//checking availability of geo location	
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
}
else{
	alert("Sorry! We are not able to identify your current location");
}

function locationError(error){
	if(error.TIMEOUT){
		alert("Timeout");
		}
     else if(error.PERMISSION_DENIED){
	    alert("Please make sure that you have given permission to access your location");
	 }
	  else if(error.POSITION_UNAVAILABLE){
	    alert("Sorry! We are not able to find your location");
	 }
}
	var lat, lon,r,val = 0; 
    function locationSuccess(position) {
	lat = position.coords.latitude;
    lon = position.coords.longitude;

    var url = "http://free.worldweatheronline.com/feed/weather.ashx?q="+ lat + "," + lon + "&format=Json&num_of_days=5&key=16ffda4916085629133101";
    uri=encodeURI(url); 
	
    jQuery.get(uri,function(r){ 
	
	     function imag(condition){
		          if(condition == 'Sunny' || condition == 'Clear'){
						return '<img src = images/Sun.png height = 110px width = 150px>';
				  }
				  else if(condition == 'Partly Cloudy' || condition =='Cloudy'){
						return '<img src = images/Cloudy.png height = 110px width = 150px>';
				  }
				  else if(condition == 'Heavy rain' || condition == 'Heavy rain at times' || condition == 'Moderate rain' || condition == 'Moderate rain at times' || condition == 'Light rain' || condition == 'Patchy light rain' || condition == 'Heavy freezing drizzle' || condition == 'Freezing drizzle' || condition == 'Light drizzle' || condition == 'Patchy light drizzle' || condition == 'Patchy rain nearby'){
						return '<img src = images/Rain.png height = 110px width = 150px>';
				  }
				  else if(condition == 'Light snow' || condition == 'Patchy snow nearby' || condition == 'Blowing snow' || condition == 'Patchy moderate snow' || condition == 'Moderate snow' || condition == 'Patchy heavy snow' || condition == 'Heavy snow' || condition == 'Moderate or heavy snow showers'){
						return '<img src = images/cSnow.png height = 110px width = 150px>';
				  }
				  else if(condition == 'Mist' || condition == 'Fog' || condition == 'Freezing fog'){
						return '<img src = images/Fog.png height = 110px width = 150px>';
				  }
				  else if(condition == 'Moderate or heavy snow in area with thunder' || condition == 'Moderate or heavy rain in area with thunder' || condition == 'Patchy light rain in area with thunder'){
						return '<img src = images/Thunder.png height = 110px width = 150px>';
				  }
				  else{
						return '<img src = images/Thermo.png height = 110px width = 150px>';
				  }
				  
			   }
		    var condition = r.data.current_condition[0].weatherDesc[0].value;
	        ima = imag(condition);

			
		 function wind(speed){
		 
				if(speed >= 0 && speed <= 6){
				   return 'Breezy';
				   }
				else if(speed >= 7 && speed <=15){
				  return 'Speed';
				}
				else{
				  return 'Extra Speed'; 
				}
				
		 }
		  
		  var wind_speed = r.data.current_condition[0].windspeedKmph;
		  win = wind(wind_speed);
		  //alert(win);
			   
	
		
	   	var current_top = {
			style: "background: #11b66e url(images/current_top.png) repeat-x; background-color: #11b66e; color:white",
			title: "climate_now",
			html: '<div id=current_top>' 
					+ '<div id=vaanilai>' + globe.vaanilai + '</div>'
			        + '<div id=current_top_header >' + globe.climate_now + '</div>' 
			        + '<div id=current_top_img>' + ima + '</div>' 
					+ ' <div id=current_top_climate> ' + r.data.current_condition[0].weatherDesc[0].value + '</div>' 
					+'</div>',
	
			styleHtmlContent: true,
			styleHtmlCls: 'contain',
			};
			
	     var wind_top = {
			style: "background: #1fa5dc url(images/wind_top.png) repeat-x; background-color: #1fa5dc color:white",
			title: "window_now",
			html: '<div id=current_top>'  
			        + '<div id=vaanilai>' + globe.vaanilai + '</div>'
			        + '<div id=current_top_header>' + globe.wind + '</div>' 
			        + '<div id=current_top_img><img src = images/Wind.png height=110 width=150></div>' 
					+ ' <div id=current_top_climate> ' + win + '</div>' 
					+'</div>',
			styleHtmlContent: true,
			styleHtmlCls: 'contain',
			};
	   
         var forecast_top = {
			style: "background: #d0127f url(images/forecast_top.png) repeat-x; background-color: #d0127f color:white",
			title: "forecast",
			html: '<div id=current_top>'  
			        + '<div id=vaanilai>' + globe.vaanilai + '</div>'
			        + '<div id=current_top_header>' + globe.forecast + '</div>' 
			        +'<div id=table>'
                    +'<table align=center border=0  height=80px width=75% cellspacing=50px>' 
			      
			        + '<tr><td align=left colspan=2><font face= Raleway,sans-serif color=#FFFFFF>' +  globe.tommorow +  '</font></div></td></tr>'
					+'<tr><td align=left><font face= Raleway,sans-serif><p align=left>' +  globe.temp + '</p><p align=left>' + r.data.weather[0].tempMinC + globe.cel +  '</p></font></div></td>'
					+'<td align=right><font face= Raleway,sans-serif size=2px>' +  '<p>' + ima +'</p><p>' + r.data.current_condition[0].weatherDesc[0].value + '</p></font></div></td>'
					//+'<td align=right><font face= Raleway,sans-serif><p>' +  globe.hum + '</p><p>' + r.data.current_condition[0].humidity + globe.humunit +  '</p></font></div></td>'
					+'</table></div></div>',
					//+'<td align=center><font size=50px face= Raleway,sans-serif>' + r.data.current_condition[0].pressure + '</font></td></tr></table>',
			styleHtmlContent: true,
			styleHtmlCls: 'contain',
			};
			
		 var map_top = {
			style: "background: #a50894 url(images/map_top.png) repeat-x; background-color: #a50894 color:white",
			title: "map",
			html:'<div id=current_top>' 
					+ '<div id=vaanilai>' + globe.vaanilai + '</div>'
			        + '<div id=current_top_header >' + globe.map + '</div>' 
			        + '<div id=current_top_img><img src = images/Map.png height=110 width=150></div>' 
					+ ' <div id=current_top_climate> ' + globe.world_weather + '</div>' 
					+'</div>',
			styleHtmlContent: true,
			styleHtmlCls: 'contain',
			};
			
		 
		var current_bottom = {
			style: "background: #11b66e url(images/current_bottom.png) repeat-x;  background-color: #11b66e; color:white",
			title: "temp_1",
			//html: '<div id=current_bottom>'  
			//        + '<div id=current_bottom_temp>' + globe.temp + '</div>'  + '<div id=current_bottom_temp_value>' + r.data.current_condition[0].temp_C + globe.cel  + '</div>'
			//      +  '<div id=current_bottom_humidity>' + globe.hum + '</div>' + '<div id=current_bottom_humidity_value>' + r.data.current_condition[0].humidity + '</div>'
			//		+ ' <div id=current_bottom_pressure> ' + globe.pressure + '</div>' + '<div id=current_bottom_pressure_value>' + r.data.current_condition[0].pressure + '</div>'
			//		+'</div>',
			
			html: '<div id=current_table><table align=center border=0  height=180px width=75% cellspacing=50px background = images/table_bg.png>' 
			      
			        + '<tr><td align=center colspan=2><font size=3px face= Raleway,sans-serif>' +  globe.temp + '</font></div></td></tr>'
					+ '<tr> <td align=center colspan = 2><font size=10px face= Raleway,sans-serif weight=bold>' +  r.data.current_condition[0].temp_C + globe.cel + '</font></td></tr>'
				    
					+'<tr><td align=center><font size=2px face= Raleway,sans-serif>' + globe.hum + '</font></td>'
					+'<td align=center><font size=2px face= Raleway,sans-serif>' + globe.pressure + '</font></td></tr>'
					
					+'<tr><td align=center><font size=10px face= Raleway,sans-serif>' + r.data.current_condition[0].humidity + globe.humunit + '</font></td>'
					+'<td align=center><font size=10px face= Raleway,sans-serif>' + r.data.current_condition[0].pressure + '</font></td></tr></table></div>',
			        
			styleHtmlContent: true,
			styleHtmlCls: 'contain',
			};
			
		var wind_bottom = {
			style: "background: #1fa5dc url(images/wind_bottom.png) repeat-x; background-color: #1fa5dc color:white",
			title: "temp_1",
			//html: '<div id=current_top>'  
			//        + '<div id=current_bottom_temp>' + globe.wind_dir + '</div>'  + '<div id=current_bottom_temp_value>' + r.data.current_condition[0].winddir16Point +  '</div>'
			//        + '<div id=current_bottom_humidity>' + globe.wind_speed + '</div>' + '<div id=current_bottom_humidity_value>' + r.data.current_condition[0].windspeedKmph + '  ' + globe.kmph + '</div>'
			//		+ ' <div id=current_bottom_pressure> ' + globe.wind_degree + '</div>' + '<div id=current_bottom_pressure_value>' + r.data.current_condition[0].winddirDegree + '</div>'
			//		+'</div>',
			
			html: '<div id=wind_table><table align=center border=0 height=180px width=75% cellspacing=50px background = images/table_bg.png>' 
			      
			        + '<tr><td align=center colspan=2><font face= Raleway,sans-serif color=#FFFFFF>' +  globe.wind_dir + '</font></div></td></tr>'
					+ '<tr> <td align=center colspan = 2><font size=80px face= Raleway,sans-serif weight=bold color=#FFFFFF>' + r.data.current_condition[0].winddir16Point + '</font></td></tr>'
				    
					+'<tr><td align=center><font size=2px face= Raleway,sans-serif color=#FFFFFF>' + globe.wind_speed + '</font></td>'
					+'<td align=center><font size=2px face= Raleway,sans-serif color=#FFFFFF>' + globe.wind_degree + '</font></td></tr>'
					
					+'<tr><td align=center><font size=50px face= Raleway,sans-serif color=#FFFFFF>' + r.data.current_condition[0].windspeedKmph + globe.kmph + '</font>' + '</td>'
					+'<td align=center><font size=50px face= Raleway,sans-serif color=#FFFFFF>' +  r.data.current_condition[0].winddirDegree  + globe.deg +  '</font></td></tr></table></div>',
					
			styleHtmlContent: true,
			styleHtmlCls: 'contain',
			};
			
		var forecast_bottom = {
			style: "background: #d0127f url(images/forecast_bottom.png) repeat-x; background-color: #d0127f color:whitee",
			title: "temp_1",
			html: '<div id=table>'
                    +'<table align=center border=0  height=40px width=75% cellspacing=50px>' 
			      
			        + '<tr><td align=left colspan=2><font face= Raleway,sans-serif color=#FFFFFF>' +  globe.day_after_tommorow +  '</font></div></td></tr>'
					+'<tr><td align=left><font face= Raleway,sans-serif><p align=left>' +  globe.temp + '</p><p align=left>' + r.data.weather[1].tempMinC + globe.cel +  '</p></font></div></td>'
					+'<td align=right><font face= Raleway,sans-serif size=2px>' +  '<p>' + ima +'</p><p>' + r.data.current_condition[0].weatherDesc[0].value + '</p></font></div></td>'
					//+'<td align=right><font face= Raleway,sans-serif><p>' +  globe.hum + '</p><p>' + r.data.current_condition[0].humidity + globe.humunit +  '</p></font></div></td>'
					+'</table></div>',
					//+'<td align=center><font size=50px face= Raleway,sans-serif>' + r.data.current_condition[0].pressure + '</font></td></tr></table>',
			styleHtmlContent: true,
			styleHtmlCls: 'contain',
			};
			

	/* var map_bottom = Ext.Viewport.add({
			xtype: 'map',
			id: 'map',
			mapOptions: {
							center: new google.maps.LatLng (lat,lon),
							mapTypeId: google.maps.MapTypeId.ROADMAP,
							zoom: 12,
					           },
			initialize: function() {
						var gMap = this.getMap();
						var trafficLayer = new google.maps.TrafficLayer();
						trafficLayer.setMap(gMap);
					},
			html:'<div id=mapo></div>',
			useCurrentLocation: true,
			});	 
	*/
	   var map_bottom = {
			title: 'weather_map',
			html: '<iframe src=Map.html height=100% width=100%><p>Your browser does not support iframes.</p> </iframe>',
			styleHtmlContent: true,
			styleHtmlCls: 'contain',
			};
		
	   var car_top = Ext.create('Ext.Carousel', {
		indicator: false,
		flex: 1,
		 listeners: {
                activeitemchange: function() {
				     globe.active_card = car_top.getActiveIndex();
                    //Ext.Msg.alert( 'Index' + active);
					if(globe.active_card == 0){
					car_bottom.setActiveItem(0);
					}
					else if(globe.active_card == 1){
					 car_bottom.setActiveItem(1);
					}
					else if(globe.active_card == 2){
					 car_bottom.setActiveItem(2);
					}
					else if(globe.active_card == 3){
					 car_bottom.setActiveItem(3);
					 car_bottom.flex = 2;
					 container.doLayout();
					 
					 }
					
                     } 
				}, 
		
		items: [ current_top, wind_top , forecast_top, map_top],
		});	

	   var car_bottom = Ext.create('Ext.Container', {
		layout: { type: 'card',
		             animation: {
									type: 'slide',
									duration: 500,
                                     },
					},				
        bodyPadding: 10, 					
		flex: 1, 
		
		items: [current_bottom, wind_bottom, forecast_bottom, map_bottom],
		});
				
		var container = Ext.create('Ext.Container',{
				fullscreen: true,
				layout: 'vbox',
	//			listeners  : {
	//							element : 'element',
	//							pinch    : function() {
	//									container.hide();
    //    }
    // },
				
				items: [car_top, car_bottom]
				});	
				
	 
      },"jsonp");
} 
		 
		
	
			