<?php 
/*
Template Name: Portfolio
*/
?>

<?php get_header(); ?>

<?php

	// Add. Options Variables
	$portfolio_opts = get_post_meta(get_the_ID(), 'portfolio_additional_options', true);
	$is_filtration = is_array($portfolio_opts) && in_array('is_filtration', $portfolio_opts) ? true : false;
	$is_masonry = is_array($portfolio_opts) && in_array('is_masonry', $portfolio_opts) ? 'true' : 'false';

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
	            'terms' => $taxonomy_terms
			),
		),
		'posts_per_page'      => -1
	);

	$portfolio_query = new WP_Query($portfolio_args);

?>

<!-- BEGIN: SITE BODY -->
<section id="site-body" class="sections portfolio padding-size-l">

	<div class="container">

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

			<?php endwhile; else: ?>

				<p class="entry"><?php printf( esc_html__( 'Ready to publish your first entry? <a href="%1$s">Get started here</a>.', 'gotomeloy' ), esc_url( admin_url() ) ); ?></p> 

			<?php endif; ?>
		  
		</section>
		<!-- END: PORTFOLIO GRID -->

	</div>

</section>
<!-- END: SITE BODY -->

<?php get_footer(); ?>