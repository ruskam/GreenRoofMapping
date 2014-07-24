var map;
var mapCenter = new google.maps.LatLng(56.646563, -92.460937);
var maxZoomIn = 21;
var maxZoomOut = 4;
var calgaryMap;
var londonMap;
var halfiaxMap;
var infoBubble;
var greenRoofMarkers = [
    { "title": "Calgary",
      "lat": "51.08003234",
      "lng": "-114.12911475"
    },
    { "title": "London",
      "lat": "43.00761832871958",
      "lng": "-81.27059519290924"
    },
    { "title": "Halifax",
      "lat": "44.63222984132247",
      "lng": "-63.58145624399185"
    },
];
var greenRoofIcon = new google.maps.MarkerImage("imgs/map-pin.png", null, null, null, new google.maps.Size(21,34));
var aIcon = new google.maps.MarkerImage("imgs/aquilegia-marker.png", null, null, null, new google.maps.Size(16,16));
// js object to hold json response from the server
var moduleObjectReseponse = {};