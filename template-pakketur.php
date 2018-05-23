<?php
/*
Template Name: Pakketur Stott
*/
?>

<?php get_header( 'blog' ); ?>
<style>

	.panel {
	    margin-bottom: 2em;
	    background-color: #202223;
	    border: 1px solid transparent;
	    border-radius: 4px;
	    -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
	    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
	}

	.panel-body {
		padding: 0;
	}

	.well-dark {
       background-color: #202223;
       min-height: 20px;
       padding: 19px;
       margin-bottom: 20px;
       border: 0px;
       border-radius: 4px;
       -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
       box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
    }

	.panel-default>.panel-heading {
	    background-image: -webkit-linear-gradient(top, #202223 0%, #363838 100%);
	    background-image: -o-linear-gradient(top, #202223 0%, #363838 100%);
	    background-image: -webkit-gradient(linear, left top, left bottom, from(#f5f5f5), to(#363838));
	    background-image: linear-gradient(to bottom, #202223 0%, #363838 100%);
	    background-repeat: repeat-x;
	    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff202223', endColorstr='#ff363838', GradientType=0);
	}

	.pakketur-del-title {
	    font-family: Oswald, sans-serif;
	    color: #fff;
	    font-size: 1.5em;
	    text-shadow: 0 2px 4px rgba(0, 0, 0, .45);
	    padding-top: 30px;
	}

	.pakketur-del-title:after {
	    display: block;
	    content: '';
	    height: 3px;
	    background: #68c8dd;
	    width: 35%;
	}
	.well-dark {
       background-image: -webkit-linear-gradient(top, #363838 0%, #202223 100%);
       background-image: -o-linear-gradient(top, #363838 0%, #202223 100%);
       background-image: -webkit-gradient(linear, left top, left bottom, from(#363838), to(#f5f5f5));
       background-image: linear-gradient(to bottom, #363838 0%, #202223 100%);
       background-repeat: repeat-x;
       filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ff363838', endColorstr='#ff202223', GradientType=0);
       border-color: #363838;
       -webkit-box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.05), 0 1px 0 rgba(0, 0, 0, 0.1);
       box-shadow: inset 0 1px 3px rgba(255, 255, 255, 0.05), 0 1px 0 rgba(0, 0, 0, 0.1);
	}
</style>
<?php
	$hero_title = !empty($hero_title) ? $hero_title : get_the_title();
	$bokun_widget = types_render_field("bokun-widget", array('raw' => true));

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
?>

<!-- BEGIN: SITE BODY -->
<?php while ( have_posts() ) : the_post(); ?>
	<section id="site-body" class="container-fluid sections project">
		<div class="container single-header">
			<div class="row">
				<div class="col-xs-12 col-md-9">
					<div class="single-header-title"><?php echo $hero_title; ?></div>
					<div class="single-header-ingress"></div>
				</div>
				<div class="col-xs-12 col-md-3">
					<?php if ( function_exists( 'add_social_share_icons' ) ) { echo add_social_share_icons(); } ?>
				</div>
			</div>
				<?php the_content(); ?>
			<?php endwhile; ?>
		</div>
	</section>
<!-- END: SITE BODY -->
<style>
    #map-container-portfolio { height: 400px; }
</style>
<section class="sections maps">
	<div class="row">
		<div class="col-md-12">
			<div id="map-container-portfolio" class="google-maps"></div>
	    </div>
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

<section class="sections project maps">
	<div class="container-fluid">
        <div id="contact-us" class="kontakt-oss">
        	<?php
    	        $kontaktskjema_bunn = types_render_field("kontaktskjema-bunn", array('raw' => false));
	            $kontaktskjema_logo = types_render_field("kontaktskjema-logo", array('raw' => true));
            	$kontaktskjema_adresse = types_render_field("kontaktskjema-adress", array('raw' => false));
        	?>
        	<?php get_template_part( 'parts/contact-form-page.inc' ); ?>
        </div>
    </div>
    <div class="project project-copyright text-center">
    	<?php echo get_theme_mod('gotomeloy_copyright_text', esc_html__('Copyright © GO TO MELØY 2016', 'gotomeloy') ); ?> | <?php echo(esc_html__( 'Utviklet av', 'gotomeloy' )); ?> <a href="https://www.github.com/bruners/" target="_blank">Lasse Brun</a><br />
	</div>
</section>

    <div class="booking-bokun-modal">
        <!-- Modal -->
        <div id="booking-bokun-modal" role="dialog" aria-labeledby="Booking" class="modal fade" tabindex="-1">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" aria-label="Close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                        <h5 class="modal-title"><?php echo $hero_title; ?></h5>
                    </div>
                    <div class="modal-body aligncenter">
                        <?php echo $bokun_widget; ?>
                    </div>
                    <div class="modal-footer">
                        <ul class="nostyle clearfix">
                            <li class="btn btn-default" type="button" data-dismiss="modal"><i class="fa fa-times"></i></li>
                        </ul>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div> <!-- /.booking-bokun-modal -->


<?php get_footer(); ?>
