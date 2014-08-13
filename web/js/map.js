function initialize() {
    
    var mapCenter = new google.maps.LatLng(56.306786, -88.769531);
    
    var maxZoomOut = 4;
    
    var mapOptions = {
      center: mapCenter,
      zoom: maxZoomOut,
      minZoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
      styles: [{"featureType":"all","stylers":[{"saturation":-100},{"gamma":0.9}]}]
    };
    
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    
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



function dialogUI() {
	var options = { autoOpen: false, modal: true, width: '50%', height: 'auto', resizable: false, closeOnEscape: true, dialogClass: 'dropShadow' };
	$('.open-disclaimer').click(function() { $('#disclaimer').dialog(options).dialog('open'); });
	$('.open-about').click(function(){ $('#about').dialog(options).dialog('open'); });
	$('.open-tutorial').click(function(){ $('#tutorial').dialog(options).dialog('open'); });
	$('#lineGraph').dialog({width:'265', height:'240', dialogClass: 'dropShadow', position: { my: "left", at: "right+5", of: ".specie-popup" } });
}

function drawLineChart(weights) {
    
    var lineChartData = {
        labels: [getDate(weights[0][0]).toString().concat("/",getMonth(weights[0][0]).toString()), 
            getDate(weights[1][0]).toString().concat("/",getMonth(weights[1][0]).toString()), 
            getDate(weights[2][0]).toString().concat("/",getMonth(weights[2][0]).toString()), 
            getDate(weights[3][0]).toString().concat("/",getMonth(weights[3][0]).toString())],
        datasets: [{
            label: "Week 1",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [weights[0][1], weights[1][1], weights[2][1], weights[3][1]]
        }]
    };

    var options = {
            scaleIntegersOnly: false
    };
    var lineChart = document.getElementById("chartjs").getContext("2d");
    new Chart(lineChart).Line(lineChartData, options);
}    

function parseJSONObject(rawJSONResponse) {
    var parsedModuleObjectResponse = jQuery.parseJSON(rawJSONResponse);                
    return parsedModuleObjectResponse;
}

function getMonth(str) {
    var month = parseInt(str.substring(4,6));
    return month;
}

function getMonthName(str) {
    var number = parseInt(str.substring(4,6));
    var month;
    if (number === 1) {
        month = "January";
    }
    else if (number === 2) {
        month = "February";
    }
    else if (number === 3) {
        month = "March";
    }
    else if (number === 4) {
        month = "April";
    }
    return month;
}

function getDate(str) {
    var date = parseInt(str.substring(6,8));
    return date;
}

function getYear(str) {
    var year = parseInt(str.substring(0, 4));
    return year;
}

function showWeights(marker, map) {
    
    google.maps.event.addListener(marker, 'click', function() {
        
        var rawJSONResponse = $.ajax({
            url: 'bringModule',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({moduleID: marker.moduleID}),
            async: false
        }).responseText;
        
        var moduleObjectResponse = parseJSONObject(rawJSONResponse);
        
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
        
        weights.sort();
        var latestDate = weights[weights.length - 1][0];
        var latestWeight = weights[weights.length - 1][1];
        
        if (infoBubble) {
            infoBubble.close()
        };
        
        infoBubble = getInfoBubble(moduleObjectResponse.moduleID, moduleObjectResponse.species,
            moduleObjectResponse.moduleDepth, moduleObjectResponse.slope, moduleObjectResponse.lifterWeight,
            latestDate, latestWeight
        );          
       
        infoBubble.open(map, marker); 
        
        google.maps.event.addListener(infoBubble, 'domready', function() {             
            drawLineChart(weights); 
        });
    });
    
}

function calgaryGreenRoof () {
    $('.yxu').removeClass('selected');
    $('.yhz').removeClass('selected');
    $('.yyc').addClass('selected');
	
    var maxZoomIn = 21;    
        
    var calgaryMapOptions = {
        center: new google.maps.LatLng(51.080025, -114.129286),
        zoom: maxZoomIn,
        minZoom: maxZoomIn,
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        disableDefaultUI: true
    };
    var calgaryMap = new google.maps.Map(document.getElementById("map-canvas"), calgaryMapOptions);
    
    for (var i = 0 in moduleList) {
        var module = moduleList[i];
        var latLng = new google.maps.LatLng(module.latLng[0], module.latLng[1]);
        //var marker = createMarker(latLng, module.moduleID[0], aIcon, calgaryMap);
        var marker = new google.maps.Marker({
            position: latLng,
            moduleID: module.moduleID,
            icon: aIcon,
            map: calgaryMap
        });
        
        showWeights(marker, calgaryMap);
    }
	
    var yycStudyArea = [
            new google.maps.LatLng(51.080024,-114.129298), new google.maps.LatLng(51.080024,-114.129241), new google.maps.LatLng(51.080016,-114.129241), new google.maps.LatLng(51.080016,-114.129231), new google.maps.LatLng(51.080005,-114.129231), new google.maps.LatLng(51.080005,-114.129213), new google.maps.LatLng(51.079971,-114.129213), new google.maps.LatLng(51.079971,-114.129232), new google.maps.LatLng(51.079961,-114.129232), new google.maps.LatLng(51.079961,-114.129240), new google.maps.LatLng(51.079951,-114.129240), new google.maps.LatLng(51.079951,-114.129315), new google.maps.LatLng(51.079951,-114.129322), new google.maps.LatLng(51.079960,-114.129322), new google.maps.LatLng(51.079960,-114.129330), new google.maps.LatLng(51.079972,-114.129330), new google.maps.LatLng(51.079972,-114.129347), new google.maps.LatLng(51.080006,-114.129347), new google.maps.LatLng(51.080006,-114.129330), new google.maps.LatLng(51.080016,-114.129330), new google.maps.LatLng(51.080020,-114.129316), new google.maps.LatLng(51.080024,-114.129316)
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
    
}

google.maps.event.addDomListener(window, 'load', initialize);