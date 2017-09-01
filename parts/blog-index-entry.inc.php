<?php

	// Heler Variable(s)
	$category = get_the_category();

?>


<!-- BLOG ENTRY -->
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	
	<a class="entry-thumbnail" href="<?php echo esc_url( get_permalink() ); ?>" title="<?php the_title(); ?>">
	  <?php the_post_thumbnail(); ?>
	</a>

	<header class="entry-header">
		<?php if ( is_sticky() ) { ?>
			<span class="category"><?php echo esc_html( 'Featured' ); ?></span>
		<?php } else { ?>
			<span class="category"><a href="<?php echo get_category_link( $category[0]->term_id ); ?>"><?php echo $category[0]->cat_name; ?></a></span>
		<?php } ?>
		<h3 class="title"><a href="<?php echo esc_url( get_permalink() ); ?>"><?php the_title(); ?></a></h3>
		<p class="date"><?php echo get_the_time('j M, Y'); ?></p>
	</header>

	<div class="entry-content">
		<?php the_content( esc_html__( 'Read More', 'gotomeloy' ) ); ?>
	</div>

	<?php get_template_part( 'parts/blog-meta.inc' ); ?>

</article>
