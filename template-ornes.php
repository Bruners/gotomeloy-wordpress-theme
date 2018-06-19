<?php
/*
Template Name: Portfolio Ørnes
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
            <?php get_template_part( 'parts/portfolio-ornes-index-entry.inc' ); ?>
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
    </div>
    <!-- END: BOTTOM WIDGETS -->
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
                    <li data-target="#carousel-promo-video" data-slide-to="4"></li>
                </ol>

                <!-- Wrapper for slides -->
                <div class="carousel-inner" role="listbox">
                    <div class="item active">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe width="560" height="315" src="" data-src="https://www.youtube.com/embed/xM7d2HHvAR0?rel=0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                        </div>
                        <div class="carousel-caption">
                            <h5 class="text-center">Go to Meløy</h5>
                            <p>Visit Meløy and experience the coast in Helgaland, the gateway to Lofoten. Together with Meløy Adventure, Glomfjord Hotell, Ørnes Hotell, Støtt Brygge and Rocks'n Rivers we can give you amazing experiences in unique locations in Norway.</p>
                        </div>
                    </div>
                    <div class="item">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe width="560" height="315" src="" data-src="https://player.vimeo.com/video/199325238" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                        </div>
                        <div class="carousel-caption">
                            <h5 class="text-center">Go to Meløy</h5>
                            <p><a href="https://vimeo.com/199325238">Go to Mel&oslash;y </a>by <a href="https://vimeo.com/user39330606">Mel&oslash;y Adventure</a></p>
                        </div>
                    </div>
                    <div class="item">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe width="560" height="315" src="" data-src="https://www.youtube.com/embed/FltXYcQeMDU?rel=0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                        </div>
                        <div class="carousel-caption">
                            <h5 class="text-center">Go To Meloy</h5>
                            <p>Visit Meløy and experience the coast in Helgaland, the gateway to Lofoten. Together with Meløy Adventure, Glomfjord Hotell, Ørnes Hotell, Støtt Brygge and Rocks'n Rivers we can give you amazing experiences in unique locations in Norway.</p>
                        </div>
                    </div>
                    <div class="item">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe width="560" height="315" src="" data-src="https://www.youtube.com/embed/7AYErtJrcd8?rel=0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                        </div>
                        <div class="carousel-caption">
                            <h5 class="text-center">Fykantrappa Glomfjord</h5>
                            <p>Opp og ned Fykantrappa i Glomfjord, 1126 trinn med god trimm og ingenting for folk med høydeskrekk</p>
                        </div>
                    </div>
                    <div class="item">
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe width="560" height="315" src="" data-src="https://player.vimeo.com/video/196182028" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                        </div>
                        <div class="carousel-caption">
                            <h5 class="text-center">NorthernNorway</h5>
                            <p>adventurous | pure | majestic - falling in love with #NorthernNorway ♡#travel the #world with a #drone</p>
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
        <div class="fb-like" data-href="https://www.facebook.com/Ørnes-Hotell-879538312107349/" data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></div>
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
