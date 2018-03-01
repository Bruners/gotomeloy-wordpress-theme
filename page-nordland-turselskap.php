<?php get_header(); ?>
 
<section id="site-body" class="sections padding-size-m">
    <div class="container container-content">
 
        <?php
            if ( ICL_LANGUAGE_CODE == "en") {
                $iframe_lang = "en";
            } elseif ( ICL_LANGUAGE_CODE == "nb" ) {
                $iframe_lang = "no";
            }
        ?>

        <?php while ( have_posts() ) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <?php the_content(); ?>
                <div class="loader"></div>
                <div id="bokun-w11173_89214788_8d02_4e30_a68e_f6bf431d1b4a"></div>
                <script>
                    jQuery(window).bind("load", function() {
                        jQuery(".loader").delay(200).fadeOut();
                    });
                </script>
                <script type="text/javascript">

                    var w11173_89214788_8d02_4e30_a68e_f6bf431d1b4a;
                
                    (function(d, t) {

                        var host = 'widgets.bokun.io';

                        var frameUrl = 'https://' + host + '/widgets/11173?bookingChannelUUID=fa6d9f0c-2f8e-489c-99de-91cb65d41116&amp;activityId=23993&amp;lang=<?php echo $iframe_lang; ?>&amp;ccy=NOK&amp;hash=w11173_89214788_8d02_4e30_a68e_f6bf431d1b4a';

                        var s = d.createElement(t), options = {'host': host, 'frameUrl': frameUrl, 'widgetHash':'w11173_89214788_8d02_4e30_a68e_f6bf431d1b4a', 'autoResize':true,'height':'','width':'100%', 'minHeight': 0,'async':true, 'ssl':true, 'affiliateTrackingCode': '', 'transientSession': true, 'cookieLifetime': 43200 };

                        s.src = 'https://' + host + '/assets/javascripts/widgets/embedder.js';

                        s.onload = s.onreadystatechange = function() {
                            var rs = this.readyState; if (rs) if (rs != 'complete') if (rs != 'loaded') return;
                            try {
                                w11173_89214788_8d02_4e30_a68e_f6bf431d1b4a = new BokunWidgetEmbedder(); w11173_89214788_8d02_4e30_a68e_f6bf431d1b4a.initialize(options); w11173_89214788_8d02_4e30_a68e_f6bf431d1b4a.display();

                            } catch (e) {}

                    };

                    var scr = d.getElementsByTagName(t)[0], par = scr.parentNode; par.insertBefore(s, scr);

                    })(document, 'script');

                </script>
            </article>
      <?php endwhile; // end of the loop. ?>
    </div>

    <div class="container-fluid container-bunn">
        <div class="kontakt-oss">
        <div class="fb-like" data-href="https://www.facebook.com/StottBrygge/" data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></div>
        <?php
            $kontaktskjema_bunn = types_render_field("kontaktskjema-bunn", array('raw' => false));
            $kontaktskjema_logo = types_render_field("kontaktskjema-logo", array('raw' => true));
            $kontaktskjema_adresse = types_render_field("kontaktskjema-adress", array('raw' => false));
        ?>
        <?php echo ( $kontaktskjema_bunn ); ?>
        <style>
            #map-container { height: 300px; }
        </style>
        <div class="row">
            <div id="map-outer" class="col-md-12">
                <div id="address" class="col-md-4 text-center">
                    <address>
                        <p><img src="<?php echo ( $kontaktskjema_logo ); ?>"><br /></p>
                        <p><?php echo ( $kontaktskjema_adresse ); ?></p>
                    </address>
                </div>
                <div id="map-container" class="col-md-8"></div>
            </div><!-- /map-outer -->
        </div> <!-- /row -->
        </div>
        <div class="copyright">
            <?php echo get_theme_mod('gotomeloy_copyright_text', esc_html__('Copyright © GO TO MELØY 2016', 'gotomeloy') ); ?> | <?php echo(esc_html__( 'Utviklet av', 'gotomeloy' )); ?> <a href="https://www.github.com/bruners/" target="_blank">Lasse Brun</a><br />
        </div>
    </div>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
          if (document.querySelectorAll('#map-container').length > 0)
          {
            if (document.querySelector('html').lang)
              lang = document.querySelector('html').lang;
            else
              lang = 'en';

            var js_file = document.createElement('script');
            js_file.type = 'text/javascript';
            js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&key=AIzaSyAWe_W4EBKsLh6r582q_xyP-GbY7Am761E&language=' + lang;
            document.getElementsByTagName('head')[0].appendChild(js_file);
          }
        });

        /*
         * declare map as a global variable
         */
        var map;

        /*
         * use google maps api built-in mechanism to attach dom events
         */
        function initMap() {
            /*
             * create map
             */
            var map = new google.maps.Map(document.getElementById("map-container"), {
                center: new google.maps.LatLng(67.0120865,13.8881624),
                zoom: 8,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: false,
                panControl:false,
                rotateControl:false,
                streetViewControl: false,
            });

            /*
             * create infowindow (which will be used by markers)
             */
            var infoWindow = new google.maps.InfoWindow();

            /*
             * marker creater function (acts as a closure for html parameter)
             */
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

            /*
             * add markers to map
             */

            var pin_blue = {
                url: '../../../wp-content/themes/gotomeloy/img/map-pins/pin-blue-10.png',
            }

            /*
            new: 66.703641, 13.730335
            old: 66.704096,13.731034
             */
            var marker0 = createMarker({
                position: new google.maps.LatLng(66.925775,13.437980),
                map: map,
                icon: pin_blue
            }, "<div id='infowindow_content'><p><strong>Støtt Brygge</strong><br />8159 Støtt<br>Norge<br />+47 400 21 212</p><a href='https://www.stott.no' target='_blank'>stott.no</a> | <a href='mailto:eaa@stott.no'>eaa@stott.no</a></div>");

        };
    </script>
</section>
<?php get_footer(); ?>