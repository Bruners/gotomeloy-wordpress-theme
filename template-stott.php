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
<section id="site-body" class="sections padding-size-m">
    <div class="container container-content">
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
    </div>
    <div class="container container-tjenester">
        <div class="wrapper-tjenester">
            <div class="masonry masonry-tjenester">
                <?php
                    $args = array('post_type' => 'tjeneste');
                    $query = new WP_Query($args);
                    while($query -> have_posts()) : $query -> the_post();

                    $post_id = get_the_ID();
                ?>
                    <div id="tjeneste-<?php echo $post_id; ?>" class="brick">
                        <?php if ($post_id == 868 || $post_id == 1132 || $post_id == 18085 || $post_id == 19946) { ?>
                            <a href="#tjeneste-modal-868" data-toggle="modal" class="tjeneste-link2 link_nounderline">
                        <?php } else { ?>
                            <a href="#tjeneste-modal-<?php echo $post_id; ?>" data-toggle="modal" class="tjeneste-link link_nounderline">
                        <?php } ?>
                            <div class="tjeneste-post">
                                <div class="tjeneste-tittel"><?php the_title(); ?></div>
                                <div class="tjeneste-kort"><p><?php echo(types_render_field( "tjeneste-kort", array( 'raw' => true) )); ?></p></div>
                            </div>
                        </a>
                    </div>
                <?php endwhile; wp_reset_postdata(); ?>
            </div>
        </div>
    </div>
    <div class="container container-portofolio">
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
        <div class="textwidget text-center"><h4><i class="fas fa-video">Video</i></h4></div>
        <div class="container-promo-video">
            <div id="carousel-promo-video" class="carousel slide" data-ride="carousel">
                <!-- Indicators -->
                <ol class="carousel-indicators">
                    <li data-target="#carousel-promo-video" data-slide-to="0" class="active"></li>
                    <li data-target="#carousel-promo-video" data-slide-to="1"></li>
                    <li data-target="#carousel-promo-video" data-slide-to="2"></li>
                    <li data-target="#carousel-promo-video" data-slide-to="3"></li>
                </ol>

                <!-- Wrapper for slides -->
                <div id="video-slider" class="carousel-inner" role="listbox">
                    <div class="item active">
                        <div class="video-carousel yt-video embed-responsive embed-responsive-16by9" data-yt_id="xM7d2HHvAR0">
                            <img src="https:/img.youtube.com/vi/xM7d2HHvAR0/maxresdefault.jpg" width="560" height="315" />
                        </div>
                        <div class="carousel-caption">
                            <h5 class="text-center">Go to Meløy</h5>
                            <p>Visit Meløy and experience the coast in Helgaland, the gateway to Lofoten. Together with Meløy Adventure, Glomfjord Hotell, Ørnes Hotell, Støtt Brygge and Rocks'n Rivers we can give you amazing experiences in unique locations in Norway.</p>
                        </div>
                    </div>
                    <div class="item">
                        <div class="video-carousel vm-video embed-responsive embed-responsive-16by9" data-vm_id="199325238">
                            <img src="https://i.vimeocdn.com/video/695381075_1280x720.jpg" width="560" height="315" />
                        </div>
                        <div class="carousel-caption">
                            <h5 class="text-center">Go to Meløy</h5>
                            <p><a href="https://vimeo.com/199325238">Go to Mel&oslash;y </a>by <a href="https://vimeo.com/user39330606">Mel&oslash;y Adventure</a></p>
                        </div>
                    </div>
                    <div class="item">
                        <div class="video-carousel yt-video embed-responsive embed-responsive-16by9" data-yt_id="ZlQM7-BJagM">
                            <img src="https:/img.youtube.com/vi/ZlQM7-BJagM/maxresdefault.jpg" width="560" height="315" />
                        </div>
                        <div class="carousel-caption">
                            <h5 class="text-center">Skattejakten LIVE</h5>
                            <p>Benedicte forteller om hvorfor hun gjerne vil bo på Støtt, et fiskevær med bare 25 innbyggere.</p>
                        </div>
                    </div>
                    <div class="item">
                        <div class="video-carousel yt-video embed-responsive embed-responsive-16by9" data-yt_id="CkxmJ592_TY">
                            <img src="https:/img.youtube.com/vi/CkxmJ592_TY/maxresdefault.jpg" width="560" height="315" />
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
        <?php //echo ( $kontaktskjema_bunn ); ?>
        <?php get_template_part( 'parts/contact-form-large.inc' ); ?>
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
                        <a href="" id="webcam-url" rel="attachment" data-fancybox>
                            <img class="alignnone size-full" src="" id="webcam-img" alt="Webkamera" width="568" height="355" />
                        </a>
                        <br />
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <?php
                                    require_once GOTOMELOY_INC . '/curl-cache.inc.php';

                                    $lat = 66.925775;
                                    $lon = 13.437980;
                                    $fromtime = new DateTime('NOW');
                                    $fromtime->format("Y-m-d");

                                    $totime = clone $fromtime;
                                    $totime->modify('+2 day');

                                    $tdtime = clone $fromtime;
                                    $tdtime->format('d.m');

                                    $feed = "http://api.sehavniva.no/tideapi.php?lat=".$lat."&lon=".$lon."&fromtime=".$fromtime->format("Y-m-d\T00:00:00P")."&totime=".$totime->format("Y-m-d\T00:00:00P")."&datatype=tab&refcode=cd&place=St%C3%B8tt&file=&lang=nb&interval=10&dst=1&tzone=&tide_request=locationdata";

                                    $dir = get_stylesheet_directory_uri() . "/img/";

                                    libxml_use_internal_errors(TRUE);
                                    try {
                                        $xml = simplexml_load_string(cache_url($feed));

                                        if ($xml != "") {
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
                                        };
                                    } catch (Exception $e) {
                                        echo "<tr><td align='center'>Kunne ikke laste inn Vannstandsdata</td></tr>";
                                    }
                                ?>
                                <tr class="copyright" align="right">Vannstandsdata © Kartverket <a href='http://www.sehavniva.no'>sehavniva.no</a></tr>
                            </table>
                        </div>
                        <br />
                        <?php if ( function_exists( 'add_social_share_icons' ) ) { echo add_social_share_icons(); } ?>
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
            if ( ICL_LANGUAGE_CODE == "en") {
                $tjeneste_aktivitetskalender = get_post( 19946 );
            } elseif ( ICL_LANGUAGE_CODE == "nb" ) {
                $tjeneste_aktivitetskalender = get_post( 18085 );
            }
        ?>
        <div id="tjeneste-modal-868" class="modal fade" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" aria-label="Close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                        <h5 class="modal-title"><?php echo $tjeneste_aktivitetskalender->post_title; ?></h5>
                    </div>
                    <div class="modal-body">
                        <div><h4><?php echo(esc_html__( 'Liste over kommende aktiviteter:', 'gotomeloy' )); ?></h4></div>
                        <?php if ( function_exists( 'add_social_share_icons' ) ) { echo add_social_share_icons(); } ?>
                        <div class="fb-page" data-href="https://www.facebook.com/StottBrygge/" data-tabs="events,timeline" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/StottBrygge/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/StottBrygge/">Støtt Brygge</a></blockquote></div>
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
                        <p><a href="https://www.stott.no/tjeneste/aktivitetskalender/" target="_blank"><?php esc_html_e('Åpne innholdet i eget vindu', 'gotomeloy'); ?></a></p><br />
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
        <!-- Modal 868 × 488-->

        <?php if ($post_id != 868 || $post_id != 1132 || $post_id != 18085 || $post_id != 19946) { ?>
        <!-- 868 gotomeloy no, 1132 gotomeloy en, 18085 stott no , 19946 stott en-->
        <div id="tjeneste-modal-<?php echo $post_id; ?>" class="modal fade" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" aria-label="Close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                        <h5 class="modal-title"><?php the_title(); ?></h5>
                    </div>
                    <div class="modal-body">
                        <?php echo(types_render_field( "tjeneste-lang", array( 'raw' => true) )); ?>
                        <br />
                        <p><a href="<?php echo(get_permalink($post_id)); ?>" target="_blank"><?php esc_html_e('Åpne innholdet i eget vindu', 'gotomeloy'); ?></a></p><br />
                        <!-- SHARE -->
                        <?php if ( function_exists( 'add_social_share_icons' ) ) { echo add_social_share_icons(); } ?>
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

            $hero_opts = get_post_meta(get_the_ID(), 'hero_additional_options', true);
            $is_hero_module = is_array($hero_opts) && in_array('is_hero', $hero_opts) ? true : false;
        ?>
        <?php if ( $is_hero_module ) { ?>
            <div class="disabled"></div>
        <?php } else { ?>
        <!-- Modal -->
        <div id="portfolio-modal-<?php echo(get_the_ID()); ?>" role="dialog" aria-labeledby="<?php the_title(); ?>" class="modal fade" tabindex="-1">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" aria-label="Close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                        <h5 class="modal-title"><?php the_title(); ?></h5>
                    </div>
                    <div class="modal-body aligncenter">
                        <?php the_content(); ?>
                        <br />
                        <p><a href="<?php echo(get_permalink(get_the_ID())); ?>" target="_blank"><?php esc_html_e('Åpne innholdet i eget vindu', 'gotomeloy'); ?></a></p><br />
                        <?php if ( function_exists( 'add_social_share_icons' ) ) { echo add_social_share_icons(); } ?>
                    </div>
                    <div class="modal-footer">
                        <ul class="nostyle clearfix">
                            <li class="btn btn-default" type="button" data-dismiss="modal"><i class="fa fa-times"></i></li>
                        </ul>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <?php } ?>
        <?php endwhile; wp_reset_postdata(); ?>
    </div> <!-- /.portfolio-modals -->
</section>
<!-- END: SITE BODY -->

<?php get_footer(); ?>
