function initialize() {
    var mapOptions = {
      center: mapCenter,
      zoom: maxZoomOut,
      minZoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      styles: [{"featureType":"all","stylers":[{"saturation":-100},{"gamma":0.9}]}]
    };
    
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    
    var i = 0;
    var interval = setInterval(function() {
        var data = greenRoofMarkers[i];
        var myLatlng = new google.maps.LatLng(data.lat, data.lng);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            icon: greenRoofIcon,
            title: data.title,
            animation: google.maps.Animation.DROP
        });
        
        google.maps.event.addListener(marker, 'click', function() {
        	if (marker.title == 'Calgary') {
        		calgaryGreenRoof();
        	} else if (marker.title == 'London') {
				londonGreenRoof();
        	} else if (marker.title == 'Halifax') {
				halifaxGreenRoof();
        	}
        });
        
        i++;
        if (i == greenRoofMarkers.length) {
            clearInterval(interval);
        }
    }, 500);
        
    google.maps.event.addDomListener(window, 'resize', function() {
            map.setCenter(mapCenter);
    });

    var useragent = navigator.userAgent;
    if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
            map.setZoom(3);
    }
}

function sortObject(o) {
    var sorted = {},
    key, a = [];
    for (key in o) {
    	if (o.hasOwnProperty(key)) {
    		a.push(key);
    	}
    }
    a.sort();
    for (key = 0; key < a.length; key++) {
    	sorted[a[key]] = o[a[key]];
    }
    return sorted;
}

function dialogUI() {
	var options = { autoOpen: false, modal: true, width: '50%', height: 'auto', resizable: false, closeOnEscape: true, dialogClass: 'dropShadow' };
	$('.open-disclaimer').click(function() { $('#disclaimer').dialog(options).dialog('open'); });
	$('.open-about').click(function(){ $('#about').dialog(options).dialog('open'); });
	$('.open-tutorial').click(function(){ $('#tutorial').dialog(options).dialog('open'); });
	$('#lineGraph').dialog({width:'283px', height:'auto', dialogClass: 'dropShadow', position: { my: "left", at: "right+10", of: ".specie-popup" } });
}

function drawLineChart() {
	var lineChartData = {
		labels: ["M","T","W","T","F", "S", "S"],
		datasets: [{
			label: "Week 1",
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(220,220,220,1)",
			data:[19.1, 18.8, 18.6, 19.2, 19.5, 19.3, 18.9]
		},{
			label: "Week 2",
			fillColor: "rgba(151,187,205,0.2)",
			strokeColor: "rgba(151,187,205,1)",
			pointColor: "rgba(151,187,205,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(151,187,205,1)",
			data: [19.4, 18.6, 18.7, 19.2, 18.9, 19.8, 18.8]
		}]
	};
	var options = {
		animation: true,
		animationSteps: 40,
		animationEasing: "easeOutQuart",
		scaleIntegersOnly: false,
		scaleShowGridLines: true,
		scaleGridLineColor: "rgba(0,0,0,.05)",
		scaleGridLineWidth: 1,
		bezierCurve: true,
		bezierCurveTension: 0.5,
		pointDot: true,
		pointDotRadius: 4,
		pointDotStrokeWidth: 2,
		pointHitDetectionRadius: 20,
		datasetStroke: true,
		datasetStrokeWidth: 2,
		datasetFill: true,
		legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
	};
	var lineChart = document.getElementById("chartjs").getContext("2d");
	new Chart(lineChart).Line(lineChartData, options);
}

function createMarker(latLng, moduleID, icon, map){
    var marker = new google.maps.Marker({
        position: latLng,
        moduleID: moduleID,
        icon: aIcon,
        map: map
    });
    
    //var infoWindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function(){
        /*
        var myHTML = '<h1>' + "Hello there" + '</h1>' +
                '<strong>' + marker.moduleID[0] + '</strong';
        infoWindow.setContent(myHTML);
        infoWindow.open(map, marker);  
        */
        infoBubble.open(map, marker);
    });    
}

function calgaryGreenRoof () {
    $('.yxu').removeClass('selected');
    $('.yhz').removeClass('selected');
    $('.yyc').addClass('selected');
	
    var calgaryMapOptions = {
        center: new google.maps.LatLng(51.08003234, -114.12911475),
        zoom: maxZoomIn,
        minZoom: maxZoomIn,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        disableDefaultUI: true
    };
    var calgaryMap = new google.maps.Map(document.getElementById("map-canvas"), calgaryMapOptions);
    
    var calgaryMarker = new google.maps.Marker({ 
        position: new google.maps.LatLng(51.07995524, -114.12928037),
        icon: aIcon,
        moduleID: 1,
        map: calgaryMap
    });
	
   	// InfoBox.js
   	var boxText = document.createElement("div");
   	boxText.className = "specie-popup";
   	boxText.innerHTML = 
        '<div class="specie-bg">' + 
        '<div class="specie-name">1. Aquilegia</div>' + '<div class="specie-depth">Depth: 4’’</div>' +
        '<div class="specie-weight-holder"><div class="specie-weight">19.1</div><div class="specie-unit">kg</div></div>' +
        '<div class="specie-slope">Slope: —</div></div>' +
        '<div class="specie-content">' + 
        '<div class="weather">T: 18&deg;C</div>' + 
        '<div class="uv-index">UV: 6</div></div>' + 
        '<div class="graph-button"><a onclick="dialogUI();" href="javascript:void(0);"><img src="imgs/graph-icon.png" height="32px" width="32px" alt="Launch Graph" title="Launch Graph"/></a></div>' +
        '<div id="lineGraph" title="Trends"><canvas id="chartjs" height="171" width="250"></canvas></div>' +
        '<div class="specie-date">July 20, 2014</div>';
		
	var myOptions = {
		content: boxText,
		disableAutoPan: false,
		alignBottom: true,
		pixelOffset: new google.maps.Size(-115, -35),
		zIndex: null,
		closeBoxMargin: "21px 13px 0px",
		closeBoxURL: "imgs/close-button.png",
		infoBoxClearance: new google.maps.Size(1, 1),
		isHidden: false,
		pane: "floatPane",
		enableEventPropagation: false
	};

	var infoBubble = new InfoBox(myOptions);
	
	// InfoBubble.js
    /*var infoBubble = new InfoBubble({
    //function createMarker(latLng, moduleID, icon, map){
    
    var module, i, latLng;
    //infoWindow = new google.maps.InfoWindow();
    for (i in moduleList) {
        module = moduleList[i];
        latLng = new google.maps.LatLng(module.latLng[0], module.latLng[1]);
        var marker = createMarker(latLng, module.moduleID[0], aIcon, calgaryMap);
        
    }
    
    
    var moduleIDResp = "TEST";
    infoBubble = new InfoBubble({
            maxWidth: 223,
            content: '<div class="specie-popup">' + 
            '<div class="specie-bg">' + 
            '<div class="specie-name">1. Aquilegia</div>' + '<div class="specie-depth">Depth: 4’’' + moduleIDResp + '</div>' +
            '<div class="specie-weight-holder"><div class="specie-weight">19.1</div><div class="specie-unit">kg</div></div>' +
            '<div class="specie-slope">Slope: —</div></div>' +
            '<div class="specie-content">' + 
            '<div class="weather">T: 18&deg;C</div>' + 
            '<div class="uv-index">UV: 6</div></div>' + 
            '<div class="graph-button"><a onclick="dialogUI();" href="javascript:void(0);"><img src="imgs/graph-icon.png" height="32px" width="32px" alt="Launch Graph" title="Launch Graph"/></a></div>' +
            '<div id="lineGraph" title="Trends"><canvas id="test" height="171px" width="250px"></canvas></div>' +
            '<div class="specie-date">July 20, 2014</div>' + 
            '</div>',
            position: new google.maps.LatLng(51.07995524, -114.12928037),
            shadowStyle: 1,
            padding: 0,
            backgroundColor: '#FFF',
            borderRadius: 0,
            arrowSize: 16,
            disableAutoPan: true,
            disableAnimation: true,
            hideCloseButton: false,
            arrowPosition: 50,
            arrowStyle: 0
    });*/
	
    var yycStudyArea = [
            new google.maps.LatLng(51.080024,-114.129298),
            new google.maps.LatLng(51.080024,-114.129241),
            new google.maps.LatLng(51.080016,-114.129241),
            new google.maps.LatLng(51.080016,-114.129231),
            new google.maps.LatLng(51.080005,-114.129231),
            new google.maps.LatLng(51.080005,-114.129213),
            new google.maps.LatLng(51.079971,-114.129213),
            new google.maps.LatLng(51.079971,-114.129232),
            new google.maps.LatLng(51.079961,-114.129232),
            new google.maps.LatLng(51.079961,-114.129240),
            new google.maps.LatLng(51.079951,-114.129240),
            new google.maps.LatLng(51.079951,-114.129315),
            new google.maps.LatLng(51.079951,-114.129322),
            new google.maps.LatLng(51.079960,-114.129322),
            new google.maps.LatLng(51.079960,-114.129330),
            new google.maps.LatLng(51.079972,-114.129330),
            new google.maps.LatLng(51.079972,-114.129347),
            new google.maps.LatLng(51.080006,-114.129347),
            new google.maps.LatLng(51.080006,-114.129330),
            new google.maps.LatLng(51.080016,-114.129330),
            new google.maps.LatLng(51.080020,-114.129316),
            new google.maps.LatLng(51.080024,-114.129316)
    ];
    var polyOptions = {
            path: yycStudyArea,
            strokeColor: "#000",
            strokeOpacity: 0.4,
            strokeWeight: 4,
            fillColor: "#8560A8",
            fillOpacity: 0.5
    };
    var studyAreaPoly = new google.maps.Polygon(polyOptions);
    studyAreaPoly.setMap(calgaryMap);
    
    google.maps.event.addListener(infoBubble, 'domready', function() { drawLineChart(); });
    
    google.maps.event.addListener(calgaryMarker, 'click', function() {
        infoBubble.open(calgaryMap, calgaryMarker);
          
        var moduleObject = {
            moduleID: 1
        };

	    var d1, d2, d3, d4;
	    //alert("test");
	    var rawJSONResponse = $.ajax({
	        //moduleObjectStr = JSON.stringify(moduleObject);
	        url: 'bringModule',
	        type: 'POST',
	        dataType: 'json',
	        data: JSON.stringify(moduleObject),
	        async: false
	
	        //success: function(data){
	        //$.each(data, function(key, value){
	            //if (key == "weightsMap"){
	                //$.each(data.weightsMap, function(keyWM, valueWM){
	                //alert(keyWM + ": " + valueWM); 
	            //})
	        //alert("key == weightsMap" + " bingo");
	
	    }).responseText;
	    moduleObjectResponse = jQuery.parseJSON(rawJSONResponse);                
	    //alert(moduleObjectResponse.moduleDepth);
	    sortedObj = sortObject(moduleObjectResponse);
	    console.log(moduleObjectResponse );
	    var arrayOfDates = [];
	    $.each(sortedObj, function(key, value){
	        if (key === "weightsMap"){
	            $.each(sortedObj.weightsMap, function(keyWM, valueWM){
	                alert(keyWM + ": " + valueWM); 
	                arrayOfDates.push('{'+keyWM+'}');
	
	            });
	        }
	        else {
	            //alert(key + ": " + value);
	        }
	    });
	
	    console.log(arrayOfDates);
	    alert("Now data in array");
	    alert(arrayOfDates[0]);
	    alert(arrayOfDates[1]);
	    alert(arrayOfDates[2]);
	    alert(arrayOfDates[3]);
	});
        
        var rawJSONResponse = $.ajax({
            //moduleObjectStr = JSON.stringify(moduleObject);
            url: 'bringModule',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(moduleObject),
            async: false
        }).responseText;
        moduleObjectResponse = jQuery.parseJSON(rawJSONResponse);                
        
        var weights = [];
        var moduleIDResp;
        var moduleDepthResp;
        var speciesResp;
        var slopeResp;
        var lifterWeightResp;
        
        $.each(moduleObjectResponse, function(key, value){
            if (key === "weightsMap"){
                $.each(moduleObjectResponse.weightsMap, function(keyWM, valueWM){
                    weights.push([keyWM, valueWM]);
                });
            }
            else {
                if (key === "moduleID") {                    
                    moduleIDResp = moduleObjectResponse.moduleID;                    
                }
                else if (key === "moduleDepth") {
                    moduleDepthResp = moduleObjectResponse.moduleDepth;
                }
                else if (key === "species") {
                    speciesResp = moduleObjectResponse.species;
                }
                else if (key === "slope") {
                    slopeResp = moduleObjectResponse.slope; 
                }
                else if (key === "lifterWeight") {
                    lifterWeightResp = moduleObjectResponse.lifterWeight;
                }
            }
        });
        /*
         * This array holds the four latest weighing results starting from
         * the oldest, namely weights[0] is the oldest and weights[3] is the latest
         * We can access the values by specifying the index of the array:
         * weights[index][0] - date of weighing
         * weights[index][1] - weighing results
         * 
         */ 
        
        weights.sort();
    });
}

function londonGreenRoof() {
    $('.yyc').removeClass('selected');
    $('.yhz').removeClass('selected');
	$('.yxu').addClass('selected');
	
	var londonMapOptions = {
		center: new google.maps.LatLng(43.00761832871958, -81.27059519290924),
		zoom: maxZoomIn,
		minZoom: maxZoomIn,
		mapTypeId: google.maps.MapTypeId.SATELLITE,
		disableDefaultUI: true
	};
	var londonMap = new google.maps.Map(document.getElementById("map-canvas"), londonMapOptions);
	
	var londonMarker = new google.maps.Marker({ 
		position: new google.maps.LatLng(43.00758714245971, -81.27061128616333),
		icon: greenRoofIcon,
		map: londonMap
	});
		
	google.maps.event.addListener(londonMarker, 'click', function() {
	});
}

function halifaxGreenRoof() {
    $('.yyc').removeClass('selected');
    $('.yxu').removeClass('selected');
    $('.yhz').addClass('selected');
	
	var halifaxMapOptions = {
		center: new google.maps.LatLng(44.63222984132247, -63.58145624399185),
		zoom: 20,
		minZoom: 20,
		mapTypeId: google.maps.MapTypeId.SATELLITE,
		disableDefaultUI: true
	};
	var halifaxMap = new google.maps.Map(document.getElementById("map-canvas"), halifaxMapOptions);
	
	var halifaxMarker = new google.maps.Marker({ 
		position: new google.maps.LatLng(44.632262289944, -63.58146160840988),
		icon: greenRoofIcon,
		map: halifaxMap
	});
		
	google.maps.event.addListener(halifaxMarker, 'click', function() {
	});
			
}

google.maps.event.addDomListener(window, 'load', initialize);
