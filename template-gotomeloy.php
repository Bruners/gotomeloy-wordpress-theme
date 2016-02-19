<?php
/*
Template Name: Portfolio Meloy
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
        'child_of' 	 => $taxonomy_term_ID,
        'hide_empty' => 0,
        'fields' 	 => 'ids',
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
        <div class="tjenester">
            <div class="row">
            <?php
                $args = array('post_type' => 'tjeneste');
                $query = new WP_Query($args);
                while($query -> have_posts()) : $query -> the_post();

                $post_id = get_the_ID();
            ?>
                <article id="tjeneste-<?php echo $post_id; ?>" class="tjeneste col-sm-4">
                    <?php if ($post_id == 1132) { ?>
                        <a href="#tjeneste-modal-868" data-toggle="modal" class="tjeneste-link">
                    <?php } else { ?>
                        <a href="#tjeneste-modal-<?php echo $post_id; ?>" data-toggle="modal" class="tjeneste-link">
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
    <div class="container-bunn">
        <div class="kontakt-oss">
        <div class="fb-like" data-href="https://www.facebook.com/gotomeloy/" data-layout="button_count" data-action="like" data-show-faces="true" data-share="true"></div>
        <?php
            $kontaktskjema_forside = types_render_field("kontakskjema-forside", array('raw' => false));
            $kontaktskjema_args = array( 'post_type' => 'page' );
            $kontakskjema_query = new WP_Query($kontaksjema_args);
        ?>
        <?php echo ( $kontaktskjema_forside ); ?>
        </div>
        <div class="copyright">Copyright © GO TO MELØY <?php echo date(Y); ?> | Utviklet av <a href="http://www.github.com/bruners/">Lasse Brun</a></div>
    </div>
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
                        <div class="row">
                            <?php
                            setlocale (LC_TIME, "no_NO");
                            $time = strtotime('now');
                            $args = array(
                                'post_type' => 'event',
                                'meta_key' => 'wpcf-event-start',
                                'orderby' => 'meta_value',
                                'order' => 'ASC',
                                'meta_query' => array(
                                    array(
                                        'key' => 'wpcf-event-start',
                                        'compare' => '>',
                                        'value' => $time
                                    )
                                )
                            );
                            $query = new WP_Query($args);
                            $day_check = "";
                            while($query -> have_posts()) : $query -> the_post();
                            ?>
                            <?php
                            $event_start_date = types_render_field("event-start", array( 'raw' => true));
                            $event_start_tid = types_render_field("event-start-tid", array( 'raw' => true));
                            $event_slutt_date = types_render_field("event-slutt", array( 'raw' => true));
                            $event_slutt_tid = types_render_field("event-slutt-tid", array( 'raw' => true));
                            $day = date("d/m/y", $event_start_date);
                            if ($day != $day_check) {
                                if ($day_check != "") {
                                    echo '<div class="col-sm-12 event-row-clear"></div>';
                                }
                                echo('<div class="col-sm-9 event-row">' . date("d/m/y", $event_start_date) . '</div><div class="col-sm-3 event-row">' . strftime("%A", $event_start_date) . '</div>' );
                            }
                            ?>
                                <div class="col-sm-9"><a href="<?php echo(types_render_field( "event-url", array( 'raw' => true) )); ?>" target="blank"><?php echo(the_title()); ?></a></div>
                                <div class="col-sm-3"><?php echo( $event_start_tid ); ?> - <?php echo( $event_slutt_tid ); ?></div>
                            <?php
                            $day_check = $day;
                            if( have_posts()) : endif;
                            ?>
                            <?php endwhile; wp_reset_postdata(); ?>
                        </div> <!-- /.div-row -->
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
        <?php if ($post_id != 868) { ?>
        <div id="tjeneste-modal-<?php echo $post_id; ?>" class="modal fade" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close fa fa-close" type="button" data-dismiss="modal"></button>
                        <h5 class="modal-title"><?php the_title(); ?></h5>
                    </div>
                    <div class="modal-body"><?php echo(types_render_field( "tjeneste-lang", array( 'raw' => false) )); ?></div>
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
    <div class="meny-modals">
        <?php
            $args = array('post_type' => 'meny-modal');
            $query = new WP_Query($args);
            while($query -> have_posts()) : $query -> the_post();
        ?>
        <!-- Modal -->
        <div id="meny-modal-<?php echo(get_the_ID()); ?>" role="dialog" aria-labeledby="<?php the_title(); ?>" class="modal fade" tabindex="-1">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button class="close" type="button" aria-label="Close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                            <h5 class="modal-title"><?php the_title(); ?></h5>
                    </div>
                    <div class="modal-body"><?php echo(types_render_field( "meny-modal-body", array( 'raw' => false) )); ?></div>
                    <div class="modal-footer">
                        <button class="btn btn-default" type="button" aria-label="Close" data-dismiss="modal">Lukk</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <?php endwhile; wp_reset_postdata(); ?>
    </div> <!-- /.meny-modals -->
</section>
<!-- END: SITE BODY -->

<?php get_footer(); ?>
