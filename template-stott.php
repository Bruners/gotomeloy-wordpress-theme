<?php
/*
Template Name: Portfolio Stott
*/
?>

<?php get_header(); ?>

<?php

    // Add. Options Variables
    $portfolio_opts = get_post_meta(get_the_ID(), 'portfolio_additional_options', true);
    $is_filtration = is_array($portfolio_opts) && in_array('is_filtration', $portfolio_opts) ? true : false;
    $is_masonry = is_array($portfolio_opts) && in_array('is_masonry', $portfolio_opts) ? true : false;

    // Taxonomy Variables
    $taxonomy = 'portfolio_category';
    $taxonomy_term_ID = get_post_meta(get_the_ID(), $taxonomy, true);

    $taxonomy_terms = get_terms( $taxonomy, array(
        'child_of'   => $taxonomy_term_ID,
        'hide_empty' => 0,
        'fields'     => 'ids',
    ) );

    array_push($taxonomy_terms, $taxonomy_term_ID); // add parent category to list


    // WP_QUERY Arguments
    $portfolio_args = array(
        'post_type' => 'portfolio',
        'tax_query' => array(
            array(
                'taxonomy' => $taxonomy,
                'field' => 'id',
                'terms' => $taxonomy_terms,
            ),
        ),
        'posts_per_page' => -1,
    );

    $portfolio_query = new WP_Query($portfolio_args);

?>

<!-- BEGIN: SITE BODY -->
<section id="site-body" class="sections portfolio padding-size-m">
    <div class="container">
        <div class="innhold">
        <?php while( have_posts() ) : the_post(); ?>
            <!-- PAGE CONTENT -->
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

                <div class="entry-content clearfix">
                    <?php the_content( esc_html__( 'Read More', 'gotomeloy' ) ); ?>
                </div>

            </article>

            <?php endwhile; ?>
        </div>
        <div class="tjenester-stott">
            <div class="row">
            <?php
                $args = array('post_type' => 'tjeneste');
                $query = new WP_Query($args);
                while($query -> have_posts()) : $query -> the_post();

                $post_id = get_the_ID();
            ?>
                <article id="tjeneste-<?php echo $post_id; ?>" class="tjeneste col-xs-12 col-sm-6 col-md-4">
                    <?php if ($post_id == 868 || $post_id == 1132 || $post_id == 18085 || $post_id == 19946) { ?>
                        <a href="#tjeneste-modal-868" data-toggle="modal" class="tjeneste-link link_nounderline">
                    <?php } else { ?>
                        <a href="#tjeneste-modal-<?php echo $post_id; ?>" data-toggle="modal" class="tjeneste-link link_nounderline">
                    <?php } ?>
                        <div class="tjeneste-post">
                            <div class="tjeneste-tittel"><?php the_title(); ?></div>
                            <div class="tjeneste-kort"><p><?php echo(types_render_field( "tjeneste-kort", array( 'raw' => true) )); ?></p></div>
                        </div>
                    </a>
                </article>
            <?php endwhile; wp_reset_postdata(); ?>
            </div>
        </div>
        <div id="opplevelser" class="portfolio">
            <?php if ( $is_filtration ) { ?>

            <!-- BEGIN: FILTERATION -->
            <div class="filters-wrap">
                <ul class="filters nostyle">
                    <li><a data-filter="*" class="active"><?php esc_html_e('Alle', 'gotomeloy'); ?></a></li>
                    <?php wp_list_categories(array('child_of' => $taxonomy_term_ID, 'title_li' => '', 'style' => 'none', 'taxonomy' => $taxonomy, 'show_option_none'   => '', 'walker' => new Lamark_Walker_Portfolio_Filter())); ?>
                 </ul>
            </div>
            <!-- END: FILTERATION -->
            <?php } ?>

            <!-- BEGIN: PORTFOLIO GRID -->
            <section class="grid clearfix" data-col="<?php echo get_post_meta(get_the_ID(), 'portfolio_columns', true); ?>" data-margin="25" data-height="0.8" data-double-height="1.6" data-masonry="<?php echo $is_masonry; ?>">

            <?php if ( $portfolio_query->have_posts() ) : while ( $portfolio_query->have_posts() ) : $portfolio_query->the_post(); ?>
            <?php get_template_part( 'parts/portfolio-index-entry.inc' ); ?>
            <?php endwhile; wp_reset_postdata(); else: ?>

                <p class="entry"><?php printf( esc_html__( 'Ready to publish your first entry? <a href="%1$s">Get started here</a>.', 'gotomeloy' ), esc_url( admin_url() ) ); ?></p>
            <?php endif; ?>

            </section>
            <!-- END: PORTFOLIO GRID -->
        </div>
    </div> <!-- END: CONTAINER DIV -->
    <!-- BEGIN: BOTTOM WIDGETS -->
    <div class="container-fluid container-bunn">
        <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("widgetized-page-bottom") ) : ?>
        <?php endif; ?>
    </div><!-- END: BOTTOM WIDGETS -->
    <div class="container-fluid">
        <div class="textwidget text-center"><h4><i class="fa fa-video-camera">Video</i></h4></div>
        <div class="container-promo-video">
            <div id="carousel-promo-video" class="carousel slide" data-ride="carousel">
                <!-- Indicators -->
                <ol class="carousel-indicators">
                    <li data-target="#carousel-promo-video" data-slide-to="0" class="active"></li>
                    <li data-target="#carousel-promo-video" data-slide-to="1"></li>
                    <li data-target="#carousel-promo-video" data-slide-to="2"></li>
                </ol>

                <!-- Wrapper for slides -->
                <div class="carousel-inner" role="listbox">
                    <div class="item active" >
                        <div class="embed-responsive embed-responsive-16by9" >
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/xM7d2HHvAR0?rel=0" webkitallowfullscreen mozallowfullscreen allowfullscreen</iframe>
                        </div>
                        <div class="carousel-caption">
                            <h5 class="text-center">Go to Meløy</h5>
                            <p>Visit Meløy and experience the coast in Helgaland, the gateway to Lofoten. Together with Meløy Adventure, Glomfjord Hotell, Ørnes Hotell, Støtt Brygge and Rocks'n Rivers we can give you amazing experiences in unique locations in Norway.</p>
                        </div>
                    </div>
                    <div class="item" >
                        <div class="embed-responsive embed-responsive-16by9" >
                            <iframe src="https://player.vimeo.com/video/199325238" width="560" height="315" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                        </div>
                        <div class="carousel-caption">
                            <h5 class="text-center">Go to Meløy</h5>
                            <p><a href="https://vimeo.com/199325238">Go to Mel&oslash;y </a>by <a href="https://vimeo.com/user39330606">Mel&oslash;y Adventure</a></p>
                        </div>
                    </div>
                    <div class="item" >
                        <div class="embed-responsive embed-responsive-16by9" >
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/OBBdQBFGGLk?rel=0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                        </div>
                        <div class="carousel-caption">
                            <h5 class="text-center">Støtt Brygge Promo 2018</h5>
                            <p></p>
                        </div>
                    </div>
                </div>

                <!-- Controls -->
                <a class="left carousel-control" href="#carousel-promo-video" role="button" data-slide="prev">
                    <span class="fa fa-chevron-left" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#carousel-promo-video" role="button" data-slide="next">
                    <span class="fa fa-chevron-right" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
            <div class="new-caption-area"></div>
        </div>
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
        <script src="http://maps.google.com/maps/api/js"></script>
        <script>    
            function init_map() {
                var enable_stott = true;

                // Define marker icons
                var pin_blue = '../../wp-content/themes/gotomeloy/img/map-pins/pin-blue-10.png';

                // Set gps location for map
                var var_location = new google.maps.LatLng(67.0120865,13.8881624);

                // Define map options - https://developers.google.com/maps/documentation/javascript/controls
                var var_mapoptions = {
                    center: var_location,
                    zoom: 7,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    mapTypeControl: false,
                    panControl:false,
                    rotateControl:false,
                    streetViewControl: false,
                };

                // Create map
                var var_map = new google.maps.Map(document.getElementById("map-container"),
                    var_mapoptions);

                // Define infoboxes and marker for each place
                if (enable_stott) {
                    // GPS position for map marker
                    var var_stott = new google.maps.LatLng(66.925775,13.437980);
                    
                    var stott_content_string = 
                        '<div id="infowindow_content">'+
                        '<p><strong>Støtt Brygge</strong><br>'+
                        '8159 Støtt<br>' +
                        'Norge<br>'+
                        '+47 400 21 212</p>'+
                        '<a href="http://www.stott.no" target="_blank">stott.no</a> | <a href="mailto:eaa@stott.no">eaa@stott.no</a>'+
                        '</div>';
                    var stott_infowindow = new google.maps.InfoWindow({
                        content: stott_content_string
                    });
                    var stott_marker = new google.maps.Marker({
                        position: var_stott,
                        map: var_map,
                        icon: pin_blue,
                        title:"Støtt Brygge",
                        maxWidth: 500
                    });
                    // Add marker and infobox for Støtt Brygge
                    stott_marker.setMap(var_map);
                    google.maps.event.addListener(stott_marker, 'click', function() {
                        stott_infowindow.open(var_map,stott_marker);
                    });     
                };
            };
 
            google.maps.event.addDomListener(window, 'load', init_map);
        </script>
        </div>
        <div class="copyright">
            <?php echo get_theme_mod('gotomeloy_copyright_text', esc_html__('Copyright © GO TO MELØY 2016', 'gotomeloy') ); ?> | <?php echo(esc_html__( 'Utviklet av', 'gotomeloy' )); ?> <a href="http://www.github.com/bruners/" target="_blank">Lasse Brun</a><br />
            <?php echo(esc_html__( 'Engelsk oversettelse av', 'gotomeloy' )); ?> <a href="http://mclean.no/" target="_blank">McLean.no Oversetting og undertekster</a>
        </div>
    </div>

    <div class="action-button-modal">
        <!-- Modal -->
        <div id="action-button-webcam-modal" role="dialog" aria-labeledby="Støtt Brygge Webcam" class="modal fade" tabindex="-1">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" aria-label="Close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                        <h5 class="modal-title">Støtt Brygge Webkamera</h5>
                    </div>
                    <div class="modal-body aligncenter">
                        <a data-fancybox href="" id="webcam-url"><img id="webcam-img" alt="Webkamera" src="" /></a>
                        <br />
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <?php
                                    $lat = 66.925775;
                                    $lon = 13.437980;
                                    $fromtime = new DateTime('NOW');
                                    $fromtime->format("Y-m-d");
                                    
                                    $totime = clone $fromtime;
                                    $totime->modify('+2 day');

                                    $tdtime = clone $fromtime;
                                    $tdtime->format('d.m');

                                    $xmlurl = "http://api.sehavniva.no/tideapi.php?lat=".$lat."&lon=".$lon."&fromtime=".$fromtime->format('c')."&totime=".$totime->format('c')."&datatype=tab&refcode=cd&place=St%C3%B8tt&file=&lang=nb&interval=10&dst=1&tzone=&tide_request=locationdata";
                                    $xml = simplexml_load_file($xmlurl);
                                    $dir = get_stylesheet_directory_uri() . "/img/";
                                    foreach ($xml->locationdata->data->waterlevel as $level):
                                        $flag = $level['flag'];
                                        $time = DateTime::createFromFormat('Y-m-d\TH:i:s+P',$level['time'])->format('H:i');
                                        $datetime = DateTime::createFromFormat('Y-m-d\TH:i:s+P',$level['time'])->format('d.m');
                                        if ($tdtime != $datetime) { 
                                            echo "<tr><th>".$datetime."</th><th>Tid</th><th>Beregnet vannstand</th></tr>";
                                            $tdtime = $datetime;
                                        };
                                        $value = round($level['value']);
                                        echo "<tr><td align='center'><img src='",$dir, $flag,".png' alt='",$flag,"' height='26' width='26'></td><td>",$time,"</td><td>",$value," cm</td></tr>";
                                    endforeach;
                                ?>
                            </table>
                        </div>
                        <br />
                        <?php if ( function_exists( 'sharing_display' ) ) { echo sharing_display(); } ?>
                    </div>
                    <div class="modal-footer">
                        <ul class="nostyle clearfix">
                            <li class="btn btn-default" type="button" data-dismiss="modal"><i class="fa fa-times"></i></li>
                        </ul>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </div> <!-- /.action-button-modal -->
    <div class="tjeneste-modals">
        <!-- Modal 868 -->
        <?php
            $tjeneste_868_post = get_post( 868 );
            $tjeneste_868_title = $tjeneste_868_post->post_title;
        ?>
        <div id="tjeneste-modal-868" class="modal fade" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close fa fa-close" type="button" data-dismiss="modal"></button>
                        <h5 class="modal-title"><?php echo ( $tjeneste_868_title ); ?></h5>
                    </div>
                    <div class="modal-body">
                        <div><h4><?php echo(esc_html__( 'Liste over kommende aktiviteter:', 'gotomeloy' )); ?></h4></div>
                        <?php if ( function_exists( 'sharing_display' ) ) { echo sharing_display(); } ?>
                        <?php 
                            $currentdate = date("Y-m-d",mktime(0,0,0,date("m"),date("d")-1,date("Y")));
                            
                            $args = array (
                                'meta_query'=> array(
                                    array(
                                        'key' => 'event_starts_sort_field',
                                        'compare' => '>',
                                        'value' => $currentdate,
                                        'type' => 'DATE',
                                    )),

                                'post_type' => 'facebook_events',
                                'posts_per_page' => -1,
                                
                                'meta_key' => 'event_starts_sort_field',
                                'orderby' => 'meta_value',
                                'order' => 'ASC'
                            ); 
                        
                            $fbe_query = new WP_Query( $args );
                            
                            if( $fbe_query->have_posts() ): 
                            while ( $fbe_query->have_posts() ) : $fbe_query->the_post();
                                $event_title = get_the_title();
                                $event_image = get_fbe_image('cover');
                                $event_url =  get_fbe_field('fb_event_uri');
                                $event_site = ucfirst(str_replace(array('https://facebook.com','/'), array('',''), get_fbe_field('facebook') ));
                                $event_location = get_fbe_field('location');
                                $event_starts_month = get_fbe_date('event_starts','M');
                                $event_starts_day = get_fbe_date('event_starts','j');
                        ?>
                            <div class="fbecol fbecolhover"><a href="<?php echo $event_url; ?>">
                                <div class="fbe_list_image" style="background-image:url(<?php echo $event_image; ?>)" />
                                    <div class="fbe_list_bar">
                                        <div class="fbe_list_date">
                                            <div class="fbe_list_month"><?php echo $event_starts_month; ?></div>
                                            <div class="fbe_list_day"><?php echo $event_starts_day; ?></div>
                                        </div>
                                        <div class="fbe_col_title"><h2><?php echo $event_title; ?></h2></div>
                                        <div class="fbe_col_location"><?php echo $event_site; ?></div>
                                    </div>
                                </div>
                            </a></div>
                        <?php
                            endwhile;
                            endif;
                            wp_reset_query();
                        ?>
                        <p><a href="http://www.stott.no/tjeneste/aktivitetskalender/" target="_blank"><?php esc_html_e('Åpne innholdet i eget vindu', 'gotomeloy'); ?></a></p><br />
                    </div> <!-- /.modal-body -->
                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" data-dismiss="modal">Lukk</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <?php
            $args = array('post_type' => 'tjeneste');
            $query = new WP_Query($args);
            while($query -> have_posts()) : $query -> the_post();

            $post_id = get_the_ID();
        ?>
        <!-- Modal -->
        
        <?php if ($post_id != 868 || $post_id != 1132 || $post_id != 18085 || $post_id != 19946) { ?>
        <!-- 868 gotomeloy no, 1132 gotomeloy en, 18085 stott no , 19946 stott en-->
        <div id="tjeneste-modal-<?php echo $post_id; ?>" class="modal fade" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close fa fa-close" type="button" data-dismiss="modal"></button>
                        <h5 class="modal-title"><?php the_title(); ?></h5>
                    </div>
                    <div class="modal-body">
                        <?php echo(types_render_field( "tjeneste-lang", array( 'raw' => false) )); ?>
                        <br />
                        <p><a href="<?php echo(get_permalink($post_id)); ?>" target="_blank"><?php esc_html_e('Åpne innholdet i eget vindu', 'gotomeloy'); ?></a></p><br />
                        <!-- SHARE -->
                        <?php if ( function_exists( 'sharing_display' ) ) { echo sharing_display(); } ?>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" data-dismiss="modal">Lukk</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <?php } ?>
        <?php endwhile; wp_reset_postdata(); ?>
    </div><!-- /.tjeneste-modals -->

    <div class="portfolio-modals">
        <?php
            $args = array(
                'post_type' => 'portfolio',
                'posts_per_page'      => -1
            );
            $query = new WP_Query($args);
            while($query -> have_posts()) : $query -> the_post();
        ?>

        <!-- Modal -->
        <div id="portfolio-modal-<?php echo(get_the_ID()); ?>" role="dialog" aria-labeledby="<?php the_title(); ?>" class="modal fade" tabindex="-1">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" aria-label="Close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                        <h5 class="modal-title"><?php the_title(); ?></h5>
                    </div>
                    <div class="modal-body aligncenter">
                        <?php the_content(); ?>
                        <br />
                        <p><a href="<?php echo(get_permalink(get_the_ID())); ?>" target="_blank"><?php esc_html_e('Åpne innholdet i eget vindu', 'gotomeloy'); ?></a></p><br />
                        <?php if ( function_exists( 'sharing_display' ) ) { echo sharing_display(); } ?>
                    </div>
                    <div class="modal-footer">
                        <ul class="nostyle clearfix">
                            <li class="btn btn-default" type="button" data-dismiss="modal"><i class="fa fa-times"></i></li>
                        </ul>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <?php endwhile; wp_reset_postdata(); ?>
    </div> <!-- /.portfolio-modals -->
</section>
<!-- END: SITE BODY -->

<?php get_footer(); ?>
