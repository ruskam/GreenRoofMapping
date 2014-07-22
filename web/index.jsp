<!doctype html>
<!--<%@page contentType="text/html" pageEncoding="UTF-8"%>-->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="keywords" content="magna systems, environmental monitoring, asset monitoring, web mapping, green roofs, freaky developers, google maps, api" />
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="Magna">
<title>Magna Systems | Monitor Your Assets</title>
<link rel="stylesheet" href="css/style.css" />
<link rel="apple-touch-icon-precomposed" href="imgs/apple-touch-icon.png" />
<link href="imgs/apple-touch-startup-image-640x920.png" media="(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
</head>
<body onload="initialize();">
    <header> 
        <div class="logo-container">
            <div class="magna-systems">
				<a href="index.jsp"><img src="imgs/magna-logo.gif" alt="Magna Systems" height="45" width="143" title="Magna Systems" /></a>
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
				<span class="share"><a class="socicon" href="http://ctt.ec/e3q2Z" target="_blank">a</a></span>
			</div>
        </div>
    </header>
	<div id="map-canvas"> </div>
    <footer>
        <div class="credits">
			<span class="developer">Developed by <a class="author" href="index.jsp"><strong>Magna Systems</strong></a></span>
		</div>
        <div class="links">
			<ul class="info">
				<li><a class="modal fancybox.ajax" href="disclaimer.jsp">Disclaimer</a></li>
				<li><a class="modal fancybox.ajax" href="tutorial.jsp">Tutorial</a></li>
				<li><a class="modal fancybox.ajax" href="about.jsp">About</a></li>
			</ul>
        </div>
    </footer>
<script src="js/jquery-1.11.1.min.js"></script>
<script src="http://maps.google.com/maps/api/js?sensor=false"></script>
<script src="js/globalVar.js"></script>
<script src="js/map.js"></script>
<script src="js/infobubble.js"></script>
<script src="js/jquery.fancybox.pack.js"></script>
<script>
$(document).ready(function() {
	$(".modal").fancybox({ maxWidth: 800, maxHeight: 600, fitToView: false, width: '60%', height: '60%', autoSize: false, closeClick: true, openEffect: 'none', closeEffect: 'none' });
});    
</script>
</body>
</html>