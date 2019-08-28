<?php
	// Helper Variable(s)
	$project_cats_slug = implode(' ', lamark_get_term_fields('portfolio_category', 'slug'));
	$project_cats_name = implode(', ', lamark_get_term_fields('portfolio_category', 'name'));

	$thumbnail_data = lamark_get_attachment_meta( get_post_thumbnail_id() );

	$is_portfolio_dim = get_post_meta(get_the_ID(), 'project_thumb_dimension', true);
	$portfolio_dim = is_array($is_portfolio_dim) ? $is_portfolio_dim : array();

	$width = in_array('w2', $portfolio_dim) ? 'w2' : '';
	$height = in_array('h2', $portfolio_dim) ? 'h2' : '';

	$project_class = $width .' '. $height;

	$project_url = get_post_meta(get_the_ID(), 'project_custom_url', true) != false ? esc_url( get_post_meta(get_the_ID(), 'project_custom_url', true) ) : esc_url( get_permalink() );

	$hero_opts = get_post_meta(get_the_ID(), 'hero_additional_options', true);
    $is_hero_module = is_array($hero_opts) && in_array('is_hero', $hero_opts) ? true : false;

    $is_project_featured = get_post_meta(get_the_ID(), 'project_featured', true)
?>

<?php if ( $is_project_featured ) { ?>
	<!-- FEATURED PORTFOLIO ENTRY -->
<?php if ( $is_hero_module ) { ?>
	<div id="post-<?php the_ID(); ?>" <?php post_class("featured__item $project_class $project_cats_slug"); ?>>

	    <a href="<?php echo $project_url; ?>" title="<?php the_title(); ?>">
			<img class="featured__item-image lazy-bg" data-src="<?php echo $thumbnail_data['src']; ?>">
			<div class="featured__item-text"><?php the_title(); ?></div>
		</a>

	</div>

<?php } else { ?>

	<div id="post-<?php the_ID(); ?>" <?php post_class("featured__item $project_class $project_cats_slug"); ?>>

	    <a href="#portfolio-modal-<?php the_ID(); ?>" title="<?php the_title(); ?>" data-toggle="modal">
			<div class="featured__item-image lazy-bg" data-src="<?php echo $thumbnail_data['src']; ?>">
				<div class="featured__item-text">
					<?php the_title(); ?>
				</div>
			</div>
		</a>

	</div>

<?php } } ?>