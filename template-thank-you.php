<?php
/*
Template Name: Takk for bestilling
*/
?>

<?php get_header( 'blog' ); ?>

<?php
	$hero_title = !empty($hero_title) ? $hero_title : get_the_title();
	$post_ID = get_the_ID();
	$is_custom_map = get_post_meta($post_ID, 'custom_map', true);

    if ($is_custom_map == true) {
    	$map_latlng = get_post_meta($post_ID, 'custom_map_latlng', true);
    	$map_zoom = get_post_meta($post_ID, 'custom_map_zoom', true);

    	$map_marker_1 = get_post_meta($post_ID, 'map_marker_1_enable', true);
    	$map_marker_2 = get_post_meta($post_ID, 'map_marker_2_enable', true);
    	$map_marker_3 = get_post_meta($post_ID, 'map_marker_3_enable', true);

    	if ($map_marker_1 == true) {
    		$marker1_title = get_post_meta($post_ID, 'map_marker_1_title', true);
			$marker1_latlng = get_post_meta($post_ID, 'map_marker_1_latlng', true);
			$marker1_desc = get_post_meta($post_ID, 'map_marker_1_description', true);
    	}

    	if ($map_marker_2 == true) {
    		$marker2_title = get_post_meta($post_ID, 'map_marker_2_title', true);
			$marker2_latlng = get_post_meta($post_ID, 'map_marker_2_latlng', true);
			$marker2_desc = get_post_meta($post_ID, 'map_marker_2_description', true);
    	}

    	if ($map_marker_3 == true) {
    		$marker3_title = get_post_meta($post_ID, 'map_marker_3_title', true);
			$marker3_latlng = get_post_meta($post_ID, 'map_marker_3_latlng', true);
			$marker3_desc = get_post_meta($post_ID, 'map_marker_3_description', true);
    	}
    } else {
    	$map_latlng = '67.0120865, 13.8881624';
    	$map_zoom = '8';
    }
?>

<style>
	.order-complete {
		background-image: -webkit-linear-gradient(top,#5cb85c 0,#419641 100%);
	    background-image: -o-linear-gradient(top,#5cb85c 0,#419641 100%);
	    background-image: -webkit-gradient(linear,left top,left bottom,from(#5cb85c),to(#419641));
	    background-image: linear-gradient(to bottom,#5cb85c 0,#419641 100%);
	    background-repeat: repeat-x;
	    -webkit-background-clip: text;
 	 	background-clip: text;
	    border-color: #3e8f3e;
	    color:transparent;
	}
	.thank-you {
		font-family: Oswald,sans-serif;
	}
</style>
<?php while ( have_posts() ) : the_post(); ?>
	<section id="site-body" class="sections thank-you padding-size-s">
		<div class="container-fluid filters">
				<?php the_content(); ?>
			<?php endwhile; ?>
		</div>
	</section>

	<section class="sections">
		<div class="container-fluid">
	        <div id="contact-us" class="kontakt-oss">
	        	<?php get_template_part( 'parts/contact-form-page.inc' ); ?>
	        </div>
	    </div>
	</section>
	<style>
	    #map-container-portfolio { height: 400px; }
	</style>
	<section class="sections padding-size-m">
		<div class="row">
			<div class="col-md-12">
				<div id="map-container-portfolio" class="google-maps"></div>
		    </div>
		</div>
		<script>
			var map;

	    	function initMap() {

			    var map = new google.maps.Map(document.getElementById("map-container-portfolio"), {
			        center: new google.maps.LatLng(<?php echo $map_latlng; ?>),
			        zoom: <?php echo $map_zoom; ?>,
			        mapTypeControl: false,
			        panControl:false,
			        rotateControl:false,
			        streetViewControl: false,
			        mapTypeControlOptions: {
			        	mapTypeIDs: ['roadmap', 'satelite', 'hybrid', 'terrain']
			        }
			    });


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

<?php get_footer(); ?>
