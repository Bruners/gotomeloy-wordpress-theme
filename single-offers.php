<?php get_header( 'blog' ); ?>

<?php

	$post_ingress = get_post_meta(get_the_ID(), 'post_ingress', true);

	// Pagination Variables
	$have_olders_posts = get_adjacent_post(false,'',true) ? '' : 'no-more-posts';
	$have_newer_posts = get_adjacent_post(false,'',false) ? '' : 'no-more-posts';
	$hero_title = !empty($hero_title) ? $hero_title : get_the_title();
	if ( function_exists( 'types_render_field' ) ) {
		$map_marker_1 = types_render_field("map-marker-1", array('raw' => false));
		$map_marker_2 = types_render_field("map-marker-2", array('raw' => false));
		$map_marker_3 = types_render_field("map-marker-3", array('raw' => false));
		$map_custom = types_render_field("custom-map", array('raw' => false));

		if ($map_custom == 1) {
			$map_latlng = types_render_field("custom-map-latlng", array('raw' => false));
			$map_zoom = types_render_field("custom-map-zoom", array('raw' => false));
		} else {
			$map_latlng = "67.0120865,13.8881624";
			$map_zoom = "8";
		}

		if ($map_marker_1 == 1) {
			$marker1_title = types_render_field("map-marker-1-title", array('raw' => false));
			$marker1_latlng = types_render_field("map-marker-1-latlng", array('raw' => false));
			$marker1_desc = types_render_field("map-marker-1-desc", array('raw' => false));
		}
		if ($map_marker_2 == 1) {
			$marker2_title = types_render_field("map-marker-2-title", array('raw' => false));
			$marker2_latlng = types_render_field("map-marker-2-latlng", array('raw' => false));
			$marker2_desc = types_render_field("map-marker-2-desc", array('raw' => false));
		}
		if ($map_marker_3 == 1) {
			$marker3_title = types_render_field("map-marker-3-title", array('raw' => false));
			$marker3_latlng = types_render_field("map-marker-3-latlng", array('raw' => false));
			$marker3_desc = types_render_field("map-marker-3-desc", array('raw' => false));
		}
	}
?>
<section class="sections project breadcrumbs">
    <div class="container">
        <div class="breadcrumbs">
            <?php if ( function_exists('yoast_breadcrumb') )
            {yoast_breadcrumb('<p id="breadcrumbs">','</p>');} ?>
        </div>
    </div>
</section>
<!-- BEGIN: SITE BODY -->
<?php while ( have_posts() ) : the_post(); ?>
	<section id="site-body" class="container-fluid sections project">
		<div class="container single-header">
			<div class="row">
				<div class="col-xs-12">
					<div class="single-header-title"><?php echo $hero_title; ?></div>
					<div class="single-post-ingress"><?php echo $post_ingress; ?></div>
				</div>
			</div>
			<br />
			<a class="btn btn-success link_nounderline scroll-booking" href="#book-now"><?php echo(esc_html__( 'Bestill nå', 'gotomeloy' )); ?></a>
			<a class="btn btn-info link_nounderline scroll-contact" href="#contact-us"><?php echo(esc_html__( 'Kontakt oss', 'gotomeloy' )); ?></a><br />
			<br />
			<?php get_template_part( 'parts/post-meta-icons.inc' ); ?>
				<?php the_content(); ?>
			<?php endwhile; ?>
		</div>
	</section>
<!-- END: SITE BODY -->
<!-- BEGIN: SOCIAL ICONS -->
<section class="sections project social">
	<div class="container">
		<div class="row">
			<div class="col-xs-12">
				<?php if ( function_exists( 'add_social_share_icons' ) ) { echo add_social_share_icons(); } ?>
			</div>
		</div>
	</div>
</section>
<!-- END: SOCIAL ICONS -->
<!-- BEGIN: RELATED POSTS -->
<section class="sections project related padding-size-m">
	<div class="container">
		<div class="single-header-title"><?php echo(esc_html__( 'Relaterte aktiviteter', 'gotomeloy' )); ?></div>
		<br />
		<?php get_portfolio_posts(); ?>
	</div>
</section>
<!-- END: RELATED POSTS -->

<style>
    #map-container-portfolio { height: 400px; }
</style>
<section class="sections maps">
	<div class="container-fluid">
		<div id="map-container-portfolio" class="google-maps"></div>
	</div>
	<script>
		var map;

    	function initMap() {

    		var styledMapType = new google.maps.StyledMapType(
    			[
				  {
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#1d2c4d"
				      }
				    ]
				  },
				  {
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#8ec3b9"
				      }
				    ]
				  },
				  {
				    "elementType": "labels.text.stroke",
				    "stylers": [
				      {
				        "color": "#1a3646"
				      }
				    ]
				  },
				  {
				    "featureType": "administrative.country",
				    "elementType": "geometry.stroke",
				    "stylers": [
				      {
				        "color": "#4b6878"
				      }
				    ]
				  },
				  {
				    "featureType": "administrative.land_parcel",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#64779e"
				      }
				    ]
				  },
				  {
				    "featureType": "administrative.province",
				    "elementType": "geometry.stroke",
				    "stylers": [
				      {
				        "color": "#4b6878"
				      }
				    ]
				  },
				  {
				    "featureType": "landscape.man_made",
				    "elementType": "geometry.stroke",
				    "stylers": [
				      {
				        "color": "#334e87"
				      }
				    ]
				  },
				  {
				    "featureType": "landscape.natural",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#023e58"
				      }
				    ]
				  },
				  {
				    "featureType": "poi",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#283d6a"
				      }
				    ]
				  },
				  {
				    "featureType": "poi",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#6f9ba5"
				      }
				    ]
				  },
				  {
				    "featureType": "poi",
				    "elementType": "labels.text.stroke",
				    "stylers": [
				      {
				        "color": "#1d2c4d"
				      }
				    ]
				  },
				  {
				    "featureType": "poi.park",
				    "elementType": "geometry.fill",
				    "stylers": [
				      {
				        "color": "#023e58"
				      }
				    ]
				  },
				  {
				    "featureType": "poi.park",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#3C7680"
				      }
				    ]
				  },
				  {
				    "featureType": "road",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#304a7d"
				      }
				    ]
				  },
				  {
				    "featureType": "road",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#98a5be"
				      }
				    ]
				  },
				  {
				    "featureType": "road",
				    "elementType": "labels.text.stroke",
				    "stylers": [
				      {
				        "color": "#1d2c4d"
				      }
				    ]
				  },
				  {
				    "featureType": "road.highway",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#2c6675"
				      }
				    ]
				  },
				  {
				    "featureType": "road.highway",
				    "elementType": "geometry.stroke",
				    "stylers": [
				      {
				        "color": "#255763"
				      }
				    ]
				  },
				  {
				    "featureType": "road.highway",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#b0d5ce"
				      }
				    ]
				  },
				  {
				    "featureType": "road.highway",
				    "elementType": "labels.text.stroke",
				    "stylers": [
				      {
				        "color": "#023e58"
				      }
				    ]
				  },
				  {
				    "featureType": "transit",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#98a5be"
				      }
				    ]
				  },
				  {
				    "featureType": "transit",
				    "elementType": "labels.text.stroke",
				    "stylers": [
				      {
				        "color": "#1d2c4d"
				      }
				    ]
				  },
				  {
				    "featureType": "transit.line",
				    "elementType": "geometry.fill",
				    "stylers": [
				      {
				        "color": "#283d6a"
				      }
				    ]
				  },
				  {
				    "featureType": "transit.station",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#3a4762"
				      }
				    ]
				  },
				  {
				    "featureType": "water",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#0e1626"
				      }
				    ]
				  },
				  {
				    "featureType": "water",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#4e6d70"
				      }
				    ]
				  }
				]
    		)

		    var map = new google.maps.Map(document.getElementById("map-container-portfolio"), {
		        center: new google.maps.LatLng(<?php echo $map_latlng; ?>),
		        zoom: <?php echo $map_zoom; ?>,
		        mapTypeControl: false,
		        panControl:false,
		        rotateControl:false,
		        streetViewControl: false,
		        mapTypeControlOptions: {
		        	mapTypeIDs: ['roadmap', 'satelite', 'hybrid', 'terrain', 'styled_map']
		        }
		    });

		    //Associate the styled map with the MapTypeId and set it to display.
        	map.mapTypes.set('styled_map', styledMapType);
        	map.setMapTypeId('styled_map');

        	var flightPlanCoordinates=[{lng:14.373359,lat:67.283907},{lng:14.365805,lat:67.285431},{lng:14.35851,lat:67.284768},{lng:14.346923,lat:67.282183},{lng:14.322461,lat:67.278901},{lng:14.277486,lat:67.273066},{lng:14.260405,lat:67.270247},{lng:14.221696,lat:67.263481},{lng:14.154748,lat:67.239783},{lng:14.099129,lat:67.213204},{lng:14.057931,lat:67.183667},{lng:14.035958,lat:67.145827},{lng:14.018105,lat:67.137825},{lng:13.992013,lat:67.127686},{lng:13.985146,lat:67.127152},{lng:13.972787,lat:67.130355},{lng:13.972787,lat:67.135424},{lng:13.972787,lat:67.12822},{lng:13.97416,lat:67.119411},{lng:13.96386,lat:67.10125},{lng:13.916482,lat:67.071843},{lng:13.842324,lat:67.033024},{lng:13.660363,lat:66.998973},{lng:13.566979,lat:66.982332},{lng:13.497628,lat:66.960844},{lng:13.477029,lat:66.946328},{lng:13.444756,lat:66.931804},{lng:13.436128,lat:66.926959},{lng:13.439304,lat:66.929011},{lng:13.442136,lat:66.930087},{lng:13.44926,lat:66.932341},{lng:13.458015,lat:66.932408},{lng:13.469483,lat:66.93076},{lng:13.488709,lat:66.923831},{lng:13.516346,lat:66.898182},{lng:13.522011,lat:66.896633},{lng:13.527333,lat:66.896027},{lng:13.544671,lat:66.895488},{lng:13.582608,lat:66.895016},{lng:13.611103,lat:66.894747},{lng:13.628956,lat:66.89313},{lng:13.646809,lat:66.887336},{lng:13.648869,lat:66.883966},{lng:13.683201,lat:66.873855},{lng:13.698059,lat:66.870248},{lng:13.703681,lat:66.869253},{lng:13.703595,lat:66.869236},{lng:13.700362,lat:66.869691},{lng:13.69504,lat:66.867533},{lng:13.690749,lat:66.863419},{lng:13.688689,lat:66.855459},{lng:13.685599,lat:66.842703},{lng:13.671694,lat:66.833723},{lng:13.625689,lat:66.824334},{lng:13.567839,lat:66.82001},{lng:13.516856,lat:66.81751},{lng:13.48424,lat:66.810751},{lng:13.465143,lat:66.804836},{lng:13.456045,lat:66.798226},{lng:13.45214,lat:66.794134},{lng:13.452783,lat:66.795436},{lng:13.450294,lat:66.800052},{lng:13.446174,lat:66.802419},{lng:13.435875,lat:66.804312},{lng:13.419052,lat:66.805867},{lng:13.401371,lat:66.806814},{lng:13.393474,lat:66.805867},{lng:13.280006,lat:66.80323},{lng:13.238196,lat:66.805049},{lng:13.236651,lat:66.805159},{lng:13.25254,lat:66.80286},{lng:13.25254,lat:66.796909},{lng:13.252197,lat:66.785408},{lng:13.234344,lat:66.767403},{lng:13.170967,lat:66.71784},{lng:13.102646,lat:66.647447},{lng:13.087883,lat:66.645678},{lng:13.076553,lat:66.651121},{lng:13.074293,lat:66.653785},{lng:13.072681,lat:66.650816},{lng:13.044529,lat:66.646461},{lng:13.01157,lat:66.644828},{lng:12.9175,lat:66.644012},{lng:12.799396,lat:66.670674},{lng:12.782917,lat:66.69758},{lng:12.727299,lat:66.717944},{lng:12.638721,lat:66.735036},{lng:12.485599,lat:66.760246},{lng:12.50655,lat:66.757807},{lng:12.50861,lat:66.754556},{lng:12.500371,lat:66.746153},{lng:12.439946,lat:66.733409},{lng:12.40836,lat:66.710072},{lng:12.266719,lat:66.589928},{lng:12.240769,lat:66.573456},{lng:12.221886,lat:66.574002},{lng:12.21193,lat:66.575776},{lng:12.205922,lat:66.579775},{lng:12.210728,lat:66.582777},{lng:12.22017,lat:66.583734},{lng:12.211072,lat:66.582574},{lng:12.206437,lat:66.579981},{lng:12.204549,lat:66.577866},{lng:12.200257,lat:66.567765},{lng:12.182284,lat:66.527204},{lng:12.141779,lat:66.499018},{lng:12.138002,lat:66.498744},{lng:12.133539,lat:66.499702},{lng:12.112757,lat:66.50358},{lng:12.107865,lat:66.50293},{lng:12.103144,lat:66.501835},{lng:12.110561,lat:66.502898},{lng:12.114166,lat:66.503055},{lng:12.13734,lat:66.498606},{lng:12.15279,lat:66.494498},{lng:12.18736,lat:66.486921},{lng:12.477889,lat:66.420882},{lng:12.481837,lat:66.419371},{lng:12.484068,lat:66.417379},{lng:12.48321,lat:66.41422},{lng:12.480464,lat:66.410305},{lng:12.463658,lat:66.39918},{lng:12.435483,lat:66.38669},{lng:12.389295,lat:66.375644},{lng:12.374361,lat:66.371585},{lng:12.370241,lat:66.368971},{lng:12.374017,lat:66.371116},{lng:12.385347,lat:66.370703},{lng:12.437189,lat:66.381709},{lng:12.492131,lat:66.401236},{lng:12.520627,lat:66.406183},{lng:12.53642,lat:66.408656},{lng:12.560453,lat:66.409343},{lng:12.588786,lat:66.405973},{lng:12.597369,lat:66.401163},{lng:12.619828,lat:66.369451},{lng:12.618455,lat:66.363258},{lng:12.611588,lat:66.358026},{lng:12.607125,lat:66.359403},{lng:12.607468,lat:66.361055},{lng:12.610558,lat:66.359128},{lng:12.616738,lat:66.363533},{lng:12.620515,lat:66.367112},{lng:12.625581,lat:66.370987},{lng:12.6291,lat:66.373257},{lng:12.633306,lat:66.376766},{lng:12.643784,lat:66.379963},{lng:12.658289,lat:66.380582},{lng:12.686856,lat:66.381626},{lng:12.700179,lat:66.382005},{lng:12.766354,lat:66.386393},{lng:12.798381,lat:66.390645},{lng:12.821508,lat:66.394024},{lng:12.824169,lat:66.393234},{lng:12.820735,lat:66.394127},{lng:12.802797,lat:66.390965},{lng:12.801148,lat:66.390587},{lng:12.795483,lat:66.386049},{lng:12.795741,lat:66.384915},{lng:12.796942,lat:66.383402},{lng:12.80235,lat:66.379138},{lng:12.809645,lat:66.374976},{lng:12.85234,lat:66.359293},{lng:12.891123,lat:66.348678},{lng:12.901079,lat:66.347128},{lng:12.928742,lat:66.344875},{lng:12.965239,lat:66.346122},{lng:12.977363,lat:66.34544},{lng:12.990786,lat:66.342782},{lng:12.99688,lat:66.341129},{lng:13.000485,lat:66.339889},{lng:12.98228,lat:66.34467},{lng:12.970778,lat:66.339711},{lng:12.951552,lat:66.322069},{lng:12.91722,lat:66.265476},{lng:12.900397,lat:66.231094},{lng:12.900654,lat:66.222954},{lng:12.906662,lat:66.221189},{lng:12.915073,lat:66.219458},{lng:12.926109,lat:66.218914},{lng:12.937782,lat:66.218326},{lng:12.945764,lat:66.218395},{lng:12.956321,lat:66.218118},{lng:12.961729,lat:66.218049},{lng:12.972543,lat:66.21573},{lng:13.011596,lat:66.200737},{lng:13.008026,lat:66.201724},{lng:13.004164,lat:66.200616},{lng:13.000902,lat:66.198364},{lng:12.99764,lat:66.191366},{lng:13.00242,lat:66.176328},{lng:13.001046,lat:66.16967},{lng:12.992807,lat:66.159681},{lng:12.936845,lat:66.14941},{lng:12.859597,lat:66.13858},{lng:12.809816,lat:66.128856},{lng:12.731195,lat:66.105087},{lng:12.6615,lat:66.070575},{lng:12.641244,lat:66.054834},{lng:12.639528,lat:66.038665},{lng:12.643304,lat:66.029601},{lng:12.646051,lat:66.026114},{lng:12.645784,lat:66.025587},{lng:12.643724,lat:66.024663},{lng:12.642308,lat:66.024384}];

	        var flightPath = new google.maps.Polyline({
	          path: flightPlanCoordinates,
	          geodesic: true,
	          strokeColor: '#FF0000',
	          strokeOpacity: 1.0,
	          strokeWeight: 2
	        });

	        //flightPath.setMap(map);

		    var infoWindow = new google.maps.InfoWindow();

		    function createMarker(options, html) {
		        var marker = new google.maps.Marker(options);
		        if (html) {
		            google.maps.event.addListener(marker, "click", function () {
		                infoWindow.setContent(html);
		                infoWindow.open(options.map, this);
		            });
		        }
		        return marker;
		    }

		    var pin_green_6 = {
		        url: '../../../wp-content/themes/gotomeloy/img/map-pins/pin-green-6.png',
		    }
		    var pin_red = {
		        url: '../../../wp-content/themes/gotomeloy/img/map-pins/pin-red-10.png',
		    }

		    var marker0 = createMarker({
		        position: new google.maps.LatLng(66.925775,13.437980),
		        map: map,
		        icon: pin_red
		    }, "<div id='infowindow_content'><p><strong>Støtt Brygge</strong><br />8159 Støtt<br>Norge<br />+47 400 21 212</p><a href='https://www.stott.no' target='_blank'>stott.no</a> | <a href='mailto:eaa@stott.no'>eaa@stott.no</a></div>");


		    <?php if ($map_marker_1 == 1) {
		    	echo 'var marker1 = createMarker({' . "\r\n";
		    	echo 'position: new google.maps.LatLng(' . $marker1_latlng . '),' . "\r\n";
		    	echo 'map: map,' . "\r\n";
		    	echo 'icon: pin_green_6' . "\r\n";
		    	echo '}, "<div id=\'infowindow_content\'><p><strong>' . $marker1_title . '</strong></p></p>' . $marker1_desc . '</p></div>");' . "\r\n";
		    	echo "\r\n";
		    } ?>
		    <?php if ($map_marker_2 == 1) {
		    	echo 'var marker2 = createMarker({' . "\r\n";
		    	echo 'position: new google.maps.LatLng(' . $marker2_latlng . '),' . "\r\n";
		    	echo 'map: map,' . "\r\n";
		    	echo 'icon: pin_green_6' . "\r\n";
		    	echo '}, "<div id=\'infowindow_content\'><p><strong>' . $marker2_title . '</strong></p></p>' . $marker2_desc . '</p></div>");' . "\r\n";
		    	echo "\r\n";
		    } ?>

			<?php if ($map_marker_3 == 1) {
		    	echo 'var marker3 = createMarker({' . "\r\n";
		    	echo 'position: new google.maps.LatLng(' . $marker3_latlng . '),' . "\r\n";
		    	echo 'map: map,' . "\r\n";
		    	echo 'icon: pin_green_6' . "\r\n";
		    	echo '}, "<div id=\'infowindow_content\'><p><strong>' . $marker3_title . '</strong></p></p>' . $marker3_desc . '</p></div>");' . "\r\n";
		    	echo "\r\n";
		    } ?>
  		};
	</script>
	<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3&amp;key=AIzaSyAWe_W4EBKsLh6r582q_xyP-GbY7Am761E&callback=initMap" async defer></script>
</section>

<section class="section project contact">
	<div class="container-fluid">
        <div id="contact-us" class="kontakt-oss">
        	<?php get_template_part( 'parts/contact-form-page.inc' ); ?>
        </div>
    </div>
</section>
<section class="section project copyright">
	<div class="container-fluid">
		<div class="project project-copyright text-center">
    	<?php echo get_theme_mod('gotomeloy_copyright_text', esc_html__('Copyright © GO TO MELØY 2016', 'gotomeloy') ); ?> | <?php echo(esc_html__( 'Utviklet av', 'gotomeloy' )); ?> <a href="https://www.github.com/bruners/" target="_blank">Lasse Brun</a><br />
	</div>
	</div>
</section>

<?php get_footer(); ?>
