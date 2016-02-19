<?php get_header(); ?>

<!-- BEGIN: SITE BODY -->
<section id="site-body" class="sections about padding-size-l">

	<div class="container">

		<?php while( have_posts() ) : the_post(); ?>

			<!-- PAGE CONTENT -->
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

				<div class="entry-content clearfix">
					<?php the_content( esc_html__( 'Read More', 'gotomeloy' ) ); ?>
				</div>

			</article>

			<?php if ( comments_open() || get_comments_number() ) : ?>

				<?php comments_template( '', true ); ?>

			<?php endif; ?>

		<?php endwhile; ?>

	</div>

</section>
<!-- END: SITE BODY -->

<?php get_footer(); ?>
