var map;
var mapCenter = new google.maps.LatLng(56.306786, -88.769531);
var maxZoomIn = 21;
var maxZoomOut = 4;
var calgaryMap;
var londonMap;
var halfiaxMap;
var greenRoofMarkers = [
    { "title": "Calgary", "lat": "51.08003234", "lng": "-114.12911475" },
    { "title": "London", "lat": "43.00761832871958", "lng": "-81.27059519290924" },
    { "title": "Halifax", "lat": "44.63222984132247", "lng": "-63.58145624399185" },
];
var greenRoofIcon = new google.maps.MarkerImage("imgs/map-pin.png", null, null, null, new google.maps.Size(21,34));
var aIcon = new google.maps.MarkerImage("imgs/aquilegia-marker.png", null, null, null, new google.maps.Size(16,16));
// js object to hold json response from the server
var moduleObjectReseponse = {};
// array to store coordinates and IDs of modules to create markers
var moduleList = [
    {latLng: [51.07995524, -114.129295], moduleID: "1"},
    {latLng: [51.07995524, -114.129265], moduleID: "2"}    
]
//var moduleIDResp = "TEST";
var boxText = document.createElement("div");
	boxText.className = "specie-popup";
	boxText.innerHTML = 
    '<div class="specie-bg">' + 
    '<div class="specie-name">1. Aquilegia</div>' + '<div class="specie-depth">Depth: 4’’' + /*moduleIDResp +*/ '</div>' +
    '<div class="specie-weight-holder"><div class="specie-weight">19.1</div><div class="specie-unit">kg</div></div>' +
    '<div class="specie-slope">Slope: —</div></div>' +
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
/*var moduleIDResp;
     var moduleDepthResp;
     var speciesResp;
     var slope;
     var lifterWeight;
     */