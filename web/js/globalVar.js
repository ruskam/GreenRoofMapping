var greenRoofMarkers = [
    { "title": "Calgary", "lat": "51.08003234", "lng": "-114.12911475" },
    { "title": "London", "lat": "43.00761832871958", "lng": "-81.27059519290924" },
    { "title": "Halifax", "lat": "44.63222984132247", "lng": "-63.58145624399185" },
];
var greenRoofIcon = new google.maps.MarkerImage("imgs/map-pin.png", null, null, null, new google.maps.Size(21,34));
var aIcon = new google.maps.MarkerImage("imgs/aquilegia-marker.png", null, null, null, new google.maps.Size(16,16));
var sIcon = new google.maps.MarkerImage("imgs/sedum-marker.png", null, null, null, new google.maps.Size(16,16));
var gIcon = new google.maps.MarkerImage("imgs/grass-marker.png", null, null, null, new google.maps.Size(16,16));
// js object to hold json response from the server
//var moduleObjectResponse;
// array to store coordinates and IDs of modules to create markers
var aqModuleList = [
    {latLng: [51.080004, -114.129290], moduleID: 2},
    {latLng: [51.079956, -114.129290], moduleID: 17},
    {latLng: [51.079987, -114.129320], moduleID: 24},
    {latLng: [51.079987, -114.129330], moduleID: 25}
];
var sedumModuleList = [
    {latLng: [51.079998, -114.129290], moduleID: 26},
    {latLng: [51.079998, -114.129280], moduleID: 27},
    {latLng: [51.079998, -114.129270], moduleID: 28},
    {latLng: [51.079975, -114.129250], moduleID: 29},
    {latLng: [51.079981, -114.129250], moduleID: 30},
    {latLng: [51.079987, -114.129250], moduleID: 31},
    {latLng: [51.079964, -114.1292696], moduleID: 32},
    {latLng: [51.079964, -114.129280], moduleID: 33},
    {latLng: [51.079964, -114.129290], moduleID: 34},
    {latLng: [51.079975, -114.129300], moduleID: 35},
    {latLng: [51.079981, -114.129300], moduleID: 36},
    {latLng: [51.079987, -114.129300], moduleID: 37}
];
var grassModuleList = [
    {latLng: [51.080004, -114.129270], moduleID: 4},
    {latLng: [51.080004, -114.129260], moduleID: 5},
    {latLng: [51.079998, -114.129250], moduleID: 6},
    {latLng: [51.079956, -114.129300], moduleID: 18},
    {latLng: [51.079956, -114.129280], moduleID: 16},
    {latLng: [51.079956, -114.129270], moduleID: 15},
    {latLng: [51.079956, -114.129260], moduleID: 14},
    {latLng: [51.079964, -114.129250], moduleID: 13},
    {latLng: [51.079981, -114.129330], moduleID: 23},
    {latLng: [51.079964, -114.129310], moduleID: 19},
    {latLng: [51.079975, -114.129330], moduleID: 25},
    {latLng: [51.079975, -114.129320], moduleID: 24},
    {latLng: [51.079981, -114.129320], moduleID: 22},
    {latLng: [51.079975, -114.129230], moduleID: 7},
    {latLng: [51.079981, -114.129230], moduleID: 9},
    {latLng: [51.079987, -114.129230], moduleID: 11},
    {latLng: [51.079975, -114.129220], moduleID: 12},
    {latLng: [51.079981, -114.129220], moduleID: 10},
    {latLng: [51.079987, -114.129220], moduleID: 8},
    {latLng: [51.079993, -114.129220], moduleID: 1}
];
var infoBubble;
function getInfoBubble(id, species, depth, slope, lifterWeight, date, weight) {
    
    if (species === "gr") {
        species = "Grass";
    }
    else if (species == "sed") {
        species = "Sedum";
    }
    else if (species == "aq") {
        species = "Aquilegia";
    }
    else {
        species = "Mixed";
    }
    
    if (slope === "y") {
        slope = "yes";
    }
    else {
        slope = "no";
    }
    
    var boxText = document.createElement("div");
            boxText.className = "specie-popup";
            boxText.innerHTML = 
        '<div class="specie-bg">' + 
        '<div class="specie-name">Module #' + id + ': ' + species + '</div>' + '<div class="specie-depth">Depth: ' + depth + /*moduleIDResp +*/ '</div>' +
        '<div class="specie-weight-holder"><div class="specie-weight">' + weight + '</div><div class="specie-unit">kg</div></div>' +
        '<div class="specie-slope">Slope: ' + slope + '</div></div>' +
        '<div class="specie-content">' + 
        '<div class="weather">18&deg;C</div>' + 
        '<div class="uv-index">UV: 6</div></div>' + 
        '<div class="graph-button"><a onclick="dialogUI();" href="javascript:void(0);"><img src="imgs/graph-icon.png" height="32px" width="32px" alt="Launch Graph" title="Launch Graph"/></a></div>' +
        '<div id="lineGraph" title="Trends"><canvas id="chartjs" width="230" height="172"></canvas></div>' +
        '<div class="specie-date">' + getDate(date) + ' ' + getMonthName(date) + ', ' + getYear(date) + '</div>';
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