var map;
var mapCenter = new google.maps.LatLng(54.768056, -96);
var calgaryMarker;
var maxZoomIn = 22;
var maxZoomOut = 4;
var timeOut = 200;
var zoomedIn = false;
var greenRoofMarkers = [
    { "title": "Calgary",
      "lat": "51.079992",
      "lng": "-114.129111"
    },
    { "title": "London",
      "lat": "42.9837",
      "lng": "-81.2497"
    },
    { "title": "Halifax",
      "lat": "44.854444",
      "lng": "-63.199167"
    },
];

// js object to hold json response from the server
var moduleObjectReseponse = {};