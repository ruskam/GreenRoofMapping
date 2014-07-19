function initialize() {
    var mapOptions = {
      center: mapCenter,
      zoom: maxZoomOut,
	  minZoom: maxZoomOut,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    };
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

    var i = 0;
    var interval = setInterval(function () {
        var data = greenRoofMarkers[i]
        var myLatlng = new google.maps.LatLng(data.lat, data.lng);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: data.title,
            animation: google.maps.Animation.DROP
        });
        i++;
        if (i == greenRoofMarkers.length) {
            clearInterval(interval);
        }
    }, 500);
    
    //google.maps.event.addListenerOnce(map, 'tilesloaded', addModuleMarkers(51.05, -114.066667));
	
	google.maps.event.addDomListener(window, 'resize', function() {
		map.setCenter(mapCenter);
	});
}

function createMarker(coords){
    var newMarker = new google.maps.Marker({
        position: coords,
		animation: google.maps.Animation.DROP,
        map: map
    })
}
/**
 
function addModuleMarkers(){
    var latLngCalgary = new google.maps.LatLng(51.05, -114.066667);
    var latLngLondon = new google.maps.LatLng(42.9837, -81.2497);
    var latLngHalifax = new google.maps.LatLng(44.854444, -63.199167);
    
    calgaryMarker = new google.maps.Marker({
        moduleID: 101,
        position: latLngCalgary,
		animation: google.maps.Animation.DROP,
        map: map
    })
    
    var moduleObject = {
        id: calgaryMarker.moduleID,
        message: "test!!!"
    };
    
    google.maps.event.addListener(calgaryMarker, 'click', function(){
        alert(moduleObject.id);
        
        $.ajax({
            //url: 'bringInfo',
            url: 'bringJavaBean',
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(moduleObject),
            success: function(data){
                if(data.isValid){
                    alert(data.isValid);
                    alert("status: " + data.status);
                    alert("description: " + data.description);
                    alert(data.moduleIDServer);
                    alert(data.responseTime);
                }
                else{
                    alert("no module under this number");
                    alert("status: " + data.status);
                    alert("description: " + data.description);
                    alert(data.moduleIDServer);
                    alert(data.responseTime);
                }
            }
        })
    });
    createMarker(latLngLondon);
    createMarker(latLngHalifax);
}
*/

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

function calgaryGreenRoof () {
    $('.yxu').removeClass('selected');
    $('.yhz').removeClass('selected');
	$('.yyc').addClass('selected');
	
	var calgaryMapOptions = {
		center: new google.maps.LatLng(51.05, -114.066667),
		zoom: maxZoomOut,
		minZoom: maxZoomOut,
		//mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeId: google.maps.MapTypeId.SATELLITE,
		disableDefaultUI: true
	};
	var calgaryMap = new google.maps.Map(document.getElementById("map-canvas"), calgaryMapOptions);
	
	var calgaryMarker = new google.maps.Marker({ 
		position: new google.maps.LatLng(51.079992, -114.129111),
		map: calgaryMap
	});
		
	google.maps.event.addListener(calgaryMarker, 'click', function() {
                
		if(!zoomedIn) {
			smoothZoom(calgaryMap, maxZoomIn, calgaryMap.getZoom(), true);
			zoomedIn = true;
                        
		} else {
			smoothZoom(calgaryMap, maxZoomOut, calgaryMap.getZoom(), false);
			zoomedIn = false;
                        
		}
                /**
                */
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
                      //  $.each(data, function(key, value){
                        //    if (key == "weightsMap"){
                          //      $.each(data.weightsMap, function(keyWM, valueWM){
                    //                alert(keyWM + ": " + valueWM); 
                            //    })
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
		
	function smoothZoom(map, level, cnt, mode) {
        if (mode == true) {
            if (cnt >= level) {
                return;
            } else {
                if ((maxZoomOut + 2) <= cnt) {
                    var z = google.maps.event.addListener(calgaryMap, 'zoom_changed', function (event) {
                        google.maps.event.removeListener(z);
                        calgaryMap.setCenter(calgaryMarker.getPosition());
                        smoothZoom(calgaryMap, level, cnt + 1, true);
                    });
                    setTimeout(function () {
                        calgaryMap.setZoom(cnt);
                    }, timeOut);
                } else {
                    calgaryMap.setZoom(cnt);
                    smoothZoom(calgaryMap, level, cnt + 1, true);
                }
            }
        } else {
            if (cnt < level) {
                return;
            } else {
                var z = google.maps.event.addListener(calgaryMap, 'zoom_changed', function (event) {
                    google.maps.event.removeListener(z);
                    calgaryMap.setCenter(calgaryMarker.getPosition());
                    smoothZoom(calgaryMap, level, cnt - 1, false);
                });
                if (maxZoomIn - 2 <= cnt) {
                    calgaryMap.setZoom(cnt);
                } else {
                    setTimeout(function () {
                        calgaryMap.setZoom(cnt);
                    }, timeOut);
                }
            }
        }
    }
}

function londonGreenRoof () {
    $('.yyc').removeClass('selected');
    $('.yhz').removeClass('selected');
	$('.yxu').addClass('selected');
	
	var londonMapOptions = {
		center: new google.maps.LatLng(42.9837, -81.2497),
		zoom: maxZoomOut,
		minZoom: maxZoomOut,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true
	};
	var londonMap = new google.maps.Map(document.getElementById("map-canvas"), londonMapOptions);
	
	var londonMarker = new google.maps.Marker({ 
		position: new google.maps.LatLng(42.9837, -81.2497),
		map: londonMap
	});
		
	google.maps.event.addListener(londonMarker, 'click', function() {
		if(!zoomedIn) {
			smoothZoom(londonMap, maxZoomIn, londonMap.getZoom(), true);
			zoomedIn = true;
		} else {
			smoothZoom(londonMap, maxZoomOut, londonMap.getZoom(), false);
			zoomedIn = false;
		}
	});
		
	function smoothZoom(map, level, cnt, mode) {
        if (mode == true) {
            if (cnt >= level) {
                return;
            } else {
                if ((maxZoomOut + 2) <= cnt) {
                    var z = google.maps.event.addListener(londonMap, 'zoom_changed', function (event) {
                        google.maps.event.removeListener(z);
                        londonMap.setCenter(londonMarker.getPosition());
                        smoothZoom(londonMap, level, cnt + 1, true);
                    });
                    setTimeout(function () {
                        londonMap.setZoom(cnt);
                    }, timeOut);
                } else {
                    londonMap.setZoom(cnt);
                    smoothZoom(londonMap, level, cnt + 1, true);
                }
            }
        } else {
            if (cnt < level) {
                return;
            } else {
                var z = google.maps.event.addListener(londonMap, 'zoom_changed', function (event) {
                    google.maps.event.removeListener(z);
                    londonMap.setCenter(londonMarker.getPosition());
                    smoothZoom(londonMap, level, cnt - 1, false);
                });
                if (maxZoomIn - 2 <= cnt) {
                    londonMap.setZoom(cnt);
                } else {
                    setTimeout(function () {
                        londonMap.setZoom(cnt);
                    }, timeOut);
                }
            }
        }
    }
}

function halifaxGreenRoof () {
    $('.yyc').removeClass('selected');
	$('.yxu').removeClass('selected');
    $('.yhz').addClass('selected');
	
	var halifaxMapOptions = {
		center: new google.maps.LatLng(44.854444, -63.199167),
		zoom: maxZoomOut,
		minZoom: maxZoomOut,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		disableDefaultUI: true
	};
	var halifaxMap = new google.maps.Map(document.getElementById("map-canvas"), halifaxMapOptions);
	
	var halifaxMarker = new google.maps.Marker({ 
		position: new google.maps.LatLng(44.854444, -63.199167),
		map: halifaxMap
	});
		
	google.maps.event.addListener(halifaxMarker, 'click', function() {
		if(!zoomedIn) {
			smoothZoom(halifaxMap, maxZoomIn, halifaxMap.getZoom(), true);
			zoomedIn = true;
		} else {
			smoothZoom(halifaxMap, maxZoomOut, halifaxMap.getZoom(), false);
			zoomedIn = false;
		}
	});
		
	function smoothZoom(map, level, cnt, mode) {
        if (mode == true) {
            if (cnt >= level) {
                return;
            } else {
                if ((maxZoomOut + 2) <= cnt) {
                    var z = google.maps.event.addListener(halifaxMap, 'zoom_changed', function (event) {
                        google.maps.event.removeListener(z);
                        halifaxMap.setCenter(halifaxMarker.getPosition());
                        smoothZoom(halifaxMap, level, cnt + 1, true);
                    });
                    setTimeout(function () {
                        halifaxMap.setZoom(cnt);
                    }, timeOut);
                } else {
                    halifaxMap.setZoom(cnt);
                    smoothZoom(halifaxMap, level, cnt + 1, true);
                }
            }
        } else {
            if (cnt < level) {
                return;
            } else {
                var z = google.maps.event.addListener(halifaxMap, 'zoom_changed', function (event) {
                    google.maps.event.removeListener(z);
                    halifaxMap.setCenter(halifaxMarker.getPosition());
                    smoothZoom(halifaxMap, level, cnt - 1, false);
                });
                if (maxZoomIn - 2 <= cnt) {
                    halifaxMap.setZoom(cnt);
                } else {
                    setTimeout(function () {
                        halifaxMap.setZoom(cnt);
                    }, timeOut);
                }
            }
        }
    }
}

google.maps.event.addDomListener(window, 'load', initialize);
