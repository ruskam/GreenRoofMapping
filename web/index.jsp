<!doctype html>
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
			<span class="developer">Developed by <a href="index.jsp"><strong>Magna Systems</strong></a></span>
		</div>
        <div class="links">
			<ul class="info">
				<li><a class="open-disclaimer" href="javascript:void(0);">Disclaimer</a></li>
				<li><a class="open-tutorial" href="javascript:void(0);">Tutorial</a></li>
				<li><a class="open-about" href="javascript:void(0);">About</a></li>
			</ul>
        </div>
        <div id="disclaimer" title="Disclaimer"><p>At the moment, this application is intended for research purposes ONLY. We do not generate any profits, or share data with other organizations. If you are concerned with the material seen in this application, please contact us and we will be happy to discuss it.</p></div>
        <div id="about" title="About"><p>Magna Systems is an experimental Google Maps API based web mapping application for monitoring world’s built and natural assets. It is developed by <a class="author" href="http://rustam.io" target="_blank">Rustam Kamberov</a> and <a class="author" href="http://bilalkarim.com" target="_blank">Bilal Karim</a>. We believe in making information accessible through rich, unique and interactive interfaces that utilize the power of maps.</p><p>Our first application is targeted towards researchers engaged in monitoring the health of green roof research projects across Canada from the University of Calgary, University of Western Ontario, and Saint Mary’s University.</p><p>We envision to continue developing this platform to support industries such as oil and gas, forestry, and more.</p>
        </div>
        <div id="tutorial" title="Tutorial"><p>Using Magna Systems is easy. To get started, simply click on the locations on top or the markers seen on the map. This will zoom you right to the green roof location. From here on, you can click (or tap) on the individual green roof modules to visualize their health such as weight, slope, depth, and more.</p>
        </div>
    </footer>
<script src="http://maps.google.com/maps/api/js?sensor=false"></script>
<script src="js/globalVar.js"></script>
<script src="js/map.js"></script>
<script src="js/jquery-1.11.1.min.js"></script>
<script src="js/jquery-ui.min.js"></script>
<script src="js/jquery.ui.touch-punch.min.js"></script>
<script src="js/charts.min.js"></script>
<script src="js/infobox.js"></script>
<script>dialogUI();</script>
</body>
</html>