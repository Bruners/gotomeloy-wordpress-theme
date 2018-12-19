<?php
	// Helper Variable(s)
	$project_cats_slug = implode(' ', lamark_get_term_fields('offers_category', 'slug'));
	$project_cats_name = implode(', ', lamark_get_term_fields('offers_category', 'name'));

	$thumbnail_data = lamark_get_attachment_meta( get_post_thumbnail_id() );

	$is_offers_dim = get_post_meta(get_the_ID(), 'project_thumb_dimension', true);
	$offers_dim = is_array($is_offers_dim) ? $is_offers_dim : array();

	$width = in_array('w2', $offers_dim) ? 'w2' : '';
	$height = in_array('h2', $offers_dim) ? 'h2' : '';

	$project_class = $width .' '. $height;

	$project_url = get_post_meta(get_the_ID(), 'project_custom_url', true) != false ? esc_url( get_post_meta(get_the_ID(), 'project_custom_url', true) ) : esc_url( get_permalink() );

	$hero_opts = get_post_meta(get_the_ID(), 'hero_additional_options', true);
    $is_hero_module = is_array($hero_opts) && in_array('is_hero', $hero_opts) ? true : false;
?>

<!-- OFFERS ENTRY -->

<?php if ( $is_hero_module ) { ?>
	<div id="post-<?php the_ID(); ?>" <?php post_class("offers__item $project_class $project_cats_slug"); ?>>

	    <a href="<?php echo $project_url; ?>" title="<?php the_title(); ?>">
			<div class="offers__item-image iBG" data-img="<?php echo $thumbnail_data['src']; ?>">
				<div class="offers__item-text">
					<?php the_title(); ?>
				</div>
			</div>
		</a>

	</div>

<?php } else { ?>

	<div id="post-<?php the_ID(); ?>" <?php post_class("offers__item $project_class $project_cats_slug"); ?>>

	    <a href="#offers-modal-<?php the_ID(); ?>" title="<?php the_title(); ?>" data-toggle="modal">
			<div class="offers__item-image iBG" data-img="<?php echo $thumbnail_data['src']; ?>">
				<div class="offers__item-icon"><i class="fab fa-facebook" style="color:#3B5998;background-color: #fff;border-radius: 50% 8px 10px 50%;color: #305891;font-size: 25px;height: 20px;line-height: 20px;width: 20px;margin: 5px;"></i></div>
				<div class="offers__item-text">
					<?php the_title(); ?>
				</div>
			</div>
		</a>

	</div>

<?php } ?>