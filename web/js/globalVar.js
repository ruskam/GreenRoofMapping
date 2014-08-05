//var map;
var mapCenter = new google.maps.LatLng(56.306786, -88.769531);
var maxZoomIn = 21;
var maxZoomOut = 4;

var londonMap;
var halfiaxMap;
//var calgaryMarker;
var greenRoofMarkers = [
    { "title": "Calgary", "lat": "51.08003234", "lng": "-114.12911475" },
    { "title": "London", "lat": "43.00761832871958", "lng": "-81.27059519290924" },
    { "title": "Halifax", "lat": "44.63222984132247", "lng": "-63.58145624399185" },
];
var greenRoofIcon = new google.maps.MarkerImage("imgs/map-pin.png", null, null, null, new google.maps.Size(21,34));
var aIcon = new google.maps.MarkerImage("imgs/aquilegia-marker.png", null, null, null, new google.maps.Size(16,16));
// js object to hold json response from the server
//var moduleObjectResponse;
// array to store coordinates and IDs of modules to create markers
var moduleList = [
    {latLng: [51.07995524, -114.129295], moduleID: 21},
    {latLng: [51.07995524, -114.1292803], moduleID: 22},
    {latLng: [51.07995524, -114.129265], moduleID: 23},
    {latLng: [51.07995524, -114.129250], moduleID: 24}
];
//var moduleIDResp = "TEST";
var infoBubble;
//var calgaryMap;
function getInfoBubble(id, species, depth, slope, lifterWeight, date, weight) {
    var boxText = document.createElement("div");
            boxText.className = "specie-popup";
            boxText.innerHTML = 
        '<div class="specie-bg">' + 
        '<div class="specie-name">1. ' + species + '</div>' + '<div class="specie-depth">Depth: ' + depth + /*moduleIDResp +*/ '</div>' +
        '<div class="specie-weight-holder"><div class="specie-weight">' + weight + '</div><div class="specie-unit">kg</div></div>' +
        '<div class="specie-slope">Slope: ' + slope + '</div></div>' +
        '<div class="specie-content">' + 
        '<div class="weather">T: 18&deg;C</div>' + 
        '<div class="uv-index">UV: 6</div></div>' + 
        '<div class="graph-button"><a onclick="dialogUI();" href="javascript:void(0);"><img src="imgs/graph-icon.png" height="32px" width="32px" alt="Launch Graph" title="Launch Graph"/></a></div>' +
        '<div id="lineGraph" title="Trends"><canvas id="chartjs" width="230" height="172"></canvas></div>' +
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
    return infoBubble;
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