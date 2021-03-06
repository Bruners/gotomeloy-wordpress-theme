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
    <div id="site-body" class="container clearfix padding-size-m">
        <section class="sections padding-size-s">
            <?php while( have_posts() ) : the_post(); ?>
                <!-- PAGE CONTENT -->
                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <div class="entry-content clearfix">
                        <?php the_content( esc_html__( 'Read More', 'gotomeloy' ) ); ?>
                    </div>
                </article>
            <?php endwhile; ?>
        </section>

        <section class="sections padding-size-s">
            <div class="offers__featured">
                <?php
                    // WP_QUERY Arguments
                    $offers_args = array(
                        'post_type' => 'offers',
                        'posts_per_page' => -1
                    );

                    $offers_query = new WP_Query($offers_args);

                    if ( $offers_query->have_posts() ) : while ( $offers_query->have_posts() ) : $offers_query->the_post();

                        get_template_part( 'parts/offers-featured-entry.inc' );
                    endwhile; wp_reset_postdata(); endif;
                ?>
            </div>
        </section>

        <section class="sections padding-size-s">
            <div class="portfolio__featured">
                <?php if ( $portfolio_query->have_posts() ) : while ( $portfolio_query->have_posts() ) : $portfolio_query->the_post(); ?>
                <?php get_template_part( 'parts/portfolio-featured-entry.inc' ); ?>
                <?php endwhile; wp_reset_postdata(); endif; ?>
            </div>
        </section>

        <section class="sections padding-size-s">
            <?php if ( $is_filtration ) { ?>

            <!-- BEGIN: FILTERATION -->
            <div class="filters-wrap">
                <ul class="filters nostyle">
                    <li><a data-filter="*" class="active" onclick="filterSelection('all')"><?php esc_html_e('Alle', 'gotomeloy'); ?></a></li>
                    <?php wp_list_categories(array('child_of' => $taxonomy_term_ID, 'title_li' => '', 'exclude' => '68,81,99,100','style' => 'none', 'taxonomy' => $taxonomy, 'show_option_none'   => '', 'walker' => new Lamark_Walker_Portfolio_Filter())); ?>
                 </ul>
            </div>
            <!-- END: FILTERATION -->
            <?php } ?>

            <div class="portfolio__grid">
            <!-- BEGIN: PORTFOLIO GRID -->
                <?php if ( $portfolio_query->have_posts() ) : while ( $portfolio_query->have_posts() ) : $portfolio_query->the_post(); ?>
                <?php get_template_part( 'parts/portfolio-grid-entry.inc' ); ?>
                <?php endwhile; wp_reset_postdata(); else: ?>
                    <p class="entry"><?php printf( esc_html__( 'Ready to publish your first entry? <a href="%s">Get started here</a>.', 'gotomeloy' ), esc_url( admin_url() ) ); ?></p>
                <?php endif; ?>
            </div>
            <!-- END: PORTFOLIO GRID -->
        </section>
    </div>

    <div class="container-fluid clearfix">
        <section class="sections padding-size-s container-bunn">
            <!-- BEGIN: BOTTOM WIDGETS -->
            <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("widgetized-page-bottom-portfolio") ) : ?>
            <?php endif; ?>
            <!-- END: BOTTOM WIDGETS -->
        </section>

        <section class="sections padding-size-s">
            <div class="container-promo-video">
                <div class="textwidget text-center"><h4><i class="fas fa-video"> Video</i></h4></div>
                <div id="carousel-promo-video" class="carousel slide" data-interval="false" data-ride="carousel">
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
                            <div class="video-carousel yt-video embed-responsive embed-responsive-16by9" data-yt_id="ZlQM7-BJagM">
                                <img src="https://www.stott.no/wp-content/uploads/2019/01/placeholder_2x2_trans.jpg" class="lazy" data-src="https://i.ytimg.com/vi/ZlQM7-BJagM/maxresdefault.jpg" width="560" height="315" />
                            </div>
                            <div class="carousel-caption">
                                <h5 class="text-center">Skattejakten LIVE</h5>
                                <p>Benedicte forteller om hvorfor hun gjerne vil bo på Støtt, et fiskevær med bare 25 innbyggere.</p>
                            </div>
                        </div>
                        <div class="item">
                            <div class="video-carousel yt-video embed-responsive embed-responsive-16by9" data-yt_id="xM7d2HHvAR0">
                                <img src="https://www.stott.no/wp-content/uploads/2019/01/placeholder_2x2_trans.jpg" class="lazy" data-src="https://i.ytimg.com/vi/xM7d2HHvAR0/maxresdefault.jpg" width="560" height="315" />
                            </div>
                            <div class="carousel-caption">
                                <h5 class="text-center">Go to Meløy</h5>
                                <p>Visit Meløy and experience the coast in Helgaland, the gateway to Lofoten. Together with Meløy Adventure, Glomfjord Hotell, Ørnes Hotell, Støtt Brygge and Rocks'n Rivers we can give you amazing experiences in unique locations in Norway.</p>
                            </div>
                        </div>
                        <div class="item">
                            <div class="video-carousel vm-video embed-responsive embed-responsive-16by9" data-vm_id="199325238">
                                <img src="https://www.stott.no/wp-content/uploads/2019/01/placeholder_2x2_trans.jpg" class="lazy" data-src="https://i.vimeocdn.com/video/695381075_1280x720.jpg" width="560" height="315" />
                            </div>
                            <div class="carousel-caption">
                                <h5 class="text-center">Go to Meløy</h5>
                                <p><a href="https://vimeo.com/199325238">Go to Mel&oslash;y </a>by <a href="https://vimeo.com/user39330606">Mel&oslash;y Adventure</a></p>
                            </div>
                        </div>
                        <div class="item">
                            <div class="video-carousel yt-video embed-responsive embed-responsive-16by9" data-yt_id="CkxmJ592_TY">
                                <img src="https://www.stott.no/wp-content/uploads/2019/01/placeholder_2x2_trans.jpg" class="lazy" data-src="https://i.ytimg.com/vi/CkxmJ592_TY/maxresdefault.jpg" width="560" height="315" />
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
        </section>
        <section class="sections padding-size-s container-bunn">
            <!-- BEGIN: BOTTOM WIDGETS -->
            <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar("widgetized-page-bottom-video") ) : ?>
            <?php endif; ?>
            <!-- END: BOTTOM WIDGETS -->
        </section>
        <section class="sections padding-size-s">
            <div id="contact-us" class="kontakt-oss">
            <?php get_template_part( 'parts/contact-form-large.inc' ); ?>
            <style>
                .map { height: 300px; }
            </style>
            <div class="row">
                <div id="map-outer" class="col-md-12">
                    <div id="address" class="col-md-4 text-center">
                        <address>
                            <?php
                                $options = get_option( 'gotomeloy_theme_options' );
                                $contact_form_logo = $options['contact-form-logo'];
                                $contact_form_adresse = $options['contact-form-adresse'];

                                if(!empty($contact_form_logo)) {
                                    echo ('<p><img class="image-lazy lazy" src="" data-src="' . $contact_form_logo . '" /><br /></p>');
                                }

                                if(!empty($contact_form_adresse))
                                {
                                    echo ('<p>' . html_entity_decode($contact_form_adresse) . '</p>');
                                }
                            ?>
                        </address>
                    </div>

                    <div class="map col-md-8" data-locations="[66.925775, 13.43798]" data-zoom="8"></div>
                </div><!-- /map-outer -->
            </div> <!-- /row -->
            </div>
        </section>
    </div>

    <!-- Modal -->
    <div id="action-button-webcam-modal" role="dialog" aria-labeledby="Støtt Brygge Webcam" class="modal fade" tabindex="-1">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close" type="button" aria-label="Close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                    <h5 class="modal-title">Støtt Brygge Webkamera</h5>
                </div>
                <div class="modal-body aligncenter">
                    <a href="" id="webcam-url" rel="attachment" data-fancybox="images" data-width="1280" data-height="800">
                        <img class="alignnone size-full lazy" src="" id="webcam-img" alt="Webkamera" width="568" height="355" />
                    </a>
                    <br />
                    <div class="table-responsive">
                        <table class="table table-hover">
                            <?php
                                require_once GOTOMELOY_INC . '/curl-cache.inc.php';

                                $lat = 66.925775;
                                $lon = 13.437980;
                                $fromtime = new DateTime('NOW');
                                $fromtime->modify('-1 day');
                                $fromtime->format("Y-m-d");

                                $totime = clone $fromtime;
                                $totime->modify('+3 day');

                                $tdtime = clone $fromtime;
                                $tdtime->format('d.m');

                                $feed = "https://api.sehavniva.no/tideapi.php?lat=".$lat."&lon=".$lon."&fromtime=".$fromtime->format("Y-m-d\T00:00:00P")."&totime=".$totime->format("Y-m-d\T00:00:00P")."&datatype=tab&refcode=cd&place=St%C3%B8tt&file=&lang=nb&interval=10&dst=1&tzone=&tide_request=locationdata";

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
                                                echo "<tr><th>".$datetime."</th><th>" . __('Time', 'gotomeloy') . "</th><th>" . __('Tidal forecast', 'gotomeloy') . "</th></tr>";
                                                $tdtime = $datetime;
                                            };
                                            $value = round($level['value']);
                                            echo "<tr><td align='center'><img class='lazy' src='' data-src='",$dir, $flag,".png' alt='",$flag,"' height='26' width='26'></td><td>",$time,"</td><td>",$value," cm</td></tr>";
                                        endforeach;
                                    };
                                } catch (Exception $e) {
                                    echo "<tr><td align='center'>" . __('Unable to load tide data', 'gotomeloy') . "</td></tr>";
                                }
                            ?>
                            <tr class="copyright" align="right"><?php echo __('Tidal forecast © Kartverket', 'gotomeloy');?> <a href='https://www.kartverket.no/sehavniva/'>sehavniva.no</a></tr>
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

    <div id="action-button-aktivitetskalender" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="aktivitetskalender">
        <div class="modal-dialog modal-md" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button class="close" type="button" aria-label="Close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                    <h5 class="modal-title"><?php echo(esc_html__( 'Aktivitetskalender', 'gotomeloy' )); ?></h5>
                </div>
                <div class="modal-body">
                    <div><h4><?php echo(esc_html__( 'Liste over kommende aktiviteter:', 'gotomeloy' )); ?></h4></div>
                    <div class="fb-page" data-href="https://www.facebook.com/StottBrygge/" data-tabs="events,timeline" data-width="360" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="false"><blockquote cite="https://www.facebook.com/StottBrygge/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/StottBrygge/">Støtt Brygge</a></blockquote></div>
                    <?php if ( function_exists( 'add_social_share_icons' ) ) { echo add_social_share_icons(); } ?>
                </div> <!-- /.modal-body -->
                <div class="modal-footer">
                    <button class="btn btn-default" type="button" data-dismiss="modal">Lukk</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->


<!-- END: SITE BODY -->

<?php get_footer(); ?>
