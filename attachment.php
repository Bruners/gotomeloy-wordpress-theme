<?php get_header(); ?>

<!-- BEGIN: SITE BODY -->
<section id="site-body" class="sections about padding-size-l">

	<div class="container">

		<?php while( have_posts() ) : the_post(); ?>

			<!-- PAGE CONTENT -->
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

				<header class="entry-header">
					<span class="category"><?php echo get_the_time('j M, Y'); ?></span>
					<h2 class="title"><?php the_title(); ?></h2>
				</header>

				<div class="attachment-media">
					<?php echo wp_get_attachment_image( get_the_ID(), 'large' ); ?>
				</div>

				<?php the_content( esc_html__( 'Read More', 'gotomeloy' ) ); ?>

				<p class='resolutions'> All Resolutions: 
				<?php
					$images = array();
					$image_sizes = get_intermediate_image_sizes();
					array_unshift( $image_sizes, 'full' );
					foreach( $image_sizes as $image_size ) {
						$image = wp_get_attachment_image_src( get_the_ID(), $image_size );
						$name = $image_size . ' (' . $image[1] . 'x' . $image[2] . ')';
						$images[] = '<a href="' . $image[0] . '">' . $name . '</a>';
					}
					echo implode( ' | ', $images );
				?>
				</p>

				<?php get_template_part( 'parts/blog-meta.inc' ); ?> 

			</article>

			<?php if ( comments_open() || get_comments_number() ) : ?>

				<?php comments_template( '', true ); ?>

			<?php endif; ?>

		<?php endwhile; ?>

	</div>

</section>
<!-- END: SITE BODY -->

<?php get_footer(); ?>