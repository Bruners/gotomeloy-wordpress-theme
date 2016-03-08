+function ($) {
	'use strict';

	// set gps locations for map and markers
	var var_location = new google.maps.latlng(67.0120865,13.8881624);
	var var_stott = new google.maps.latlng(66.92588045759415,13.437868505716324)
	var var_ornes = new google.maps.latlng(66.86817417340465, 13.705768967047334)
	var var_glomfjord = new google.maps.latlng(66.81707278018057,13.944906760007143)
	var var_bodo = new google.maps.latlng(67.28294499015232,14.379660654813051)

	// define marker icons
	var pin_blue = 'wp-content/themes/gotomeloy/img/map-pins/pin-blue-10.png';
	var pin_green = 'wp-content/themes/gotomeloy/img/map-pins/pin-green-11.png';
	var pin_red = 'wp-content/themes/gotomeloy/img/map-pins/pin-red-16.png';
	var pin_yellow = 'wp-content/themes/gotomeloy/img/map-pins/pin-yellow-5.png';

	// define map options - https://developers.google.com/maps/documentation/javascript/controls
	var var_mapoptions = {
		center: var_location,
		zoom: 7,
		maptypeid: google.maps.maptypeid.roadmap,
		maptypecontrol: false,
		pancontrol:false,
		rotatecontrol:false,
		streetviewcontrol: false,
	};

	// define infoboxes and marker for each place
	var stott_content_string = 
		'<div id="infowindow_content">'+
		'<p><strong>støtt brygge</strong><br>'+
		'8159 støtt<br>' +
		'norge<br>'+
		'+47 400 21 212</p>'+
		'<a href="http://www.stott.no" target="_blank">stott.no</a> | <a href="mailto:eaa@stott.no">eaa@stott.no</a>'+
		'</div>';
		
	var stott_infowindow = new google.maps.infowindow({
    	content: stott_content_string
  	});
		
	var stott_marker = new google.maps.marker({
		position: var_stott,
		map: var_map,
		icon: pin_blue,
		title:"støtt brygge",
		maxwidth: 500
	});

	var ornes_content_string =
		'<div id="infowindow_content">'+
		'<p><strong>ørnes hotell as</strong><br />'+
		'havneveien 12<br />'+
		'8150 ørnes<br />'+
		'norge</p>'+
		'<a href="http://www.orneshotell.no" target="_blank">orneshotell.no</a> | <a href="mailto:bjorn@orneshotell.no">bjorn@orneshotell.no</a>'+
		'</div>';

	var ornes_infowindow = new google.maps.infowindow({
		content: ornes_content_string
	});

	var ornes_marker = new google.maps.marker({
		position: var_ornes,
		map: var_map,
		icon: pin_yellow,
		title: "ørnes hotell",
		maxwidth: 500
	});

	var glomfjord_content_string =
		'<div id="infowindow_content">'+
		'<p><strong>glomfjord hotell as</strong><br />'+
		'lars evensens vei 3<br />'+
		'8160 glomfjord<br />'+
		'norge</p>'+
		'<a href="http://www.glomfjordhotell.no" target="_blank">glomfjordhotell.no</a> | <a href="mailto:info@glomfjordhotell.no">info@glomfjordhotell.no</a>'+
		'</div>';
	var glomfjord_infowindow = new google.maps.infowindow({
		content: glomfjord_content_string
	});

	var glomfjord_marker = new google.maps.marker({
		position: var_glomfjord,
		map: var_map,
		icon: pin_green,
		title: "glomfjord hotell",
		maxwidth: 500
	});

	var bodo_content_string =
		'<div id="infowindow_content">'+
		'<p><strong>bodø hotell as</strong><br />'+
		'professor schyttes gate 5<br />'+
		'8006 bodø<br />'+
		'norge</p>'+
		'<a href="http://www.bodohotell.no" target="_blank">bodohotell.no</a> | <a href="mailto:booking@bodohotell.no">booking@bodohotell.no</a>'+
		'</div>';

	var bodo_infowindow = new google.maps.infowindow({
		content: bodo_content_string
	});

	var bodo_marker = new google.maps.marker({
		position: var_bodo,
		map: var_map,
		icon: pin_red,
		title: "bodø hotell",
		maxwidth: 500
	});

	// create map
	var var_map = new google.maps.map(document.getelementbyid("map-container"),
    	var_mapoptions);
	
	// add marker and infobox for støtt brygge
	stott_marker.setmap(var_map);
	google.maps.event.addlistener(stott_marker, 'click', function() {
		stott_infowindow.open(var_map,stott_marker);
	});
		
	// add marker and infobox for ørnes hotell
	ornes_marker.setmap(var_map);
	google.maps.event.addlistener(ornes_marker, 'click', function() {
		ornes_infowindow.open(var_map,ornes_marker);
 	});
	// add marker and infobox for glomfjord hotell
	glomfjord_marker.setmap(var_map);
	google.maps.event.addlistener(glomfjord_marker, 'click', function() {
		glomfjord_infowindow.open(var_map,glomfjord_marker);
 	});
	// add marker and infobox for bodø hotell
	bodo_marker.setmap(var_map);
	google.maps.event.addlistener(bodo_marker, 'click', function() {
		bodo_infowindow.open(var_map,bodo_marker);
 	});
}
	 
google.maps.event.adddomlistener(window, 'load', init_map);
}(jQuery);