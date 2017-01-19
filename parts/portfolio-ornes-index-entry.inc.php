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

?>

<!-- PORTFOLIO ENTRY -->
<article id="post-<?php the_ID(); ?>" <?php post_class("$project_class $project_cats_slug"); ?>>

    <a href="#portfolio-modal-<?php the_ID(); ?>" title="<?php the_title(); ?>" data-toggle="modal">
		<div class="entry-image iBG" data-img="<?php echo $thumbnail_data['src']; ?>"></div>
		<div class="entry-hover text-center">
			<div class="vcenter">
				<div class="entry-title"><?php the_title(); ?></div>
			</div>
		</div>
	</a>    

</article>
