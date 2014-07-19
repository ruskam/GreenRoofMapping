<!doctype html>
<!--<%@page contentType="text/html" pageEncoding="UTF-8"%>-->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="magna systems, environmental monitoring, web mapping, green roofs, freaky developers, google maps" />
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<title>Magna Systems | Green Roof</title>
<link rel="stylesheet" href="css/style.css" />
<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,600,700" type="text/css" />
<link rel="stylesheet" href="css/jquery.fancybox.css" />
<link rel="apple-touch-icon-precomposed" href="imgs/apple-touch-icon.png" />
<script src="js/jquery-1.11.1.min.js"></script>
<script src="http://maps.google.com/maps/api/js?sensor=false"></script>
<script src="js/map.js"></script>
<script src="js/globalVar.js"></script>
</head>    
<body onload="initialize();">
    <header> 
        <div class="logo-container">
            <div class="magna-systems">
				<a href="index.jsp"><img src="imgs/magna-logo.png" alt="Magna Systems" height="45" width="143" alt="Magna Systems Logo" title="Magna Systems" /></a>
			</div>
        </div>
        <div class="menu">
			<div class="locations">
				<span class="yyc" onclick="calgaryGreenRoof();">Calgary</span>
				<span class="yxu" onclick="londonGreenRoof();">London</span>
				<span class="yhz" onclick="halifaxGreenRoof();">Halifax</span>
			</div>
        </div>
        <div class="social">
			<div class="networks">
				<span class="share">&#9660;</span>
			</div>
        </div>
    </header>
	<div id="map-canvas"> </div>
    <footer>
        <div class="credits">
			<span class="developer">Developed by <strong><a href="#">Magna Systems</a></strong></span>
		</div>
        <div class="links">
			<ul class="info">
				<li><a href="#">Terms of Use</a></li>
				<li><a href="#">Tutorial</a></li>
				<li><a class="modal fancybox.ajax" href="about.jsp">About</a></li>
			</ul>
        </div>
    </footer>
<script src="js/jquery.fancybox.pack.js"></script>
<script>
$(document).ready(function() {
	$(".modal").fancybox({
		maxWidth	: 800,
		maxHeight	: 600,
		fitToView	: false,
		width		: '70%',
		height		: '70%',
		autoSize	: false,
		closeClick	: false,
		openEffect	: 'none',
		closeEffect	: 'none'
	});
});    
</script>
</body>
</html>