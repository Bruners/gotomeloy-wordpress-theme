<?php get_header(); ?>

<section id="site-body" class="sections blog single-blog padding-size-l">

	<div class="container">

		<section class="entry single-blog-content">

			<?php while ( have_posts() ) : the_post(); ?>

				<div class="entry-content">
					<?php the_content( esc_html__( 'Read More', 'gotomeloy' ) ); ?>
			    </div>

		        <div class="float-wrapper">

			        <?php if ( has_tag() ) { ?>
						<div class="blog-tags">
							<?php the_tags('',' '); ?>
						</div>        
			        <?php } ?>

			        <div class="post-pages"><?php wp_link_pages(); ?></div>

		        </div>

				<?php get_template_part( 'parts/blog-meta.inc' ); ?> 

			<?php endwhile; ?>

		</section>

		<?php if ( comments_open() ) { ?>

			<?php comments_template( '', true ); ?>

		<?php } ?>

	</div>

</section><!-- #site-body -->

<?php get_footer(); ?>