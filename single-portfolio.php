<?php get_header( 'blog' ); ?>

<?php

	// Pagination Variables
	$have_olders_posts = get_adjacent_post(false,'',true) ? '' : 'no-more-posts';
	$have_newer_posts = get_adjacent_post(false,'',false) ? '' : 'no-more-posts';

?>

<!-- BEGIN: SITE BODY -->
<section id="site-body" class="sections project padding-size-l">

	<div class="container">
		<div class="innhold">
			<?php while ( have_posts() ) : the_post(); ?>
				<?php the_content(); ?>
			<?php endwhile; ?>
		</div>
	</div>

</section>
<!-- END: SITE BODY -->

<!-- BEGIN: PAGINATION -->
<section class="sections paginations padding-size-m">
	<div class="container">
		<div class="innhold">
			<!-- PAGINATE -->
			<ul class="project-pagination nostyle clearfix">
				<li class="prev <?php echo $have_olders_posts; ?>"><a href="<?php echo esc_url( get_permalink(get_adjacent_post(false,'',true)) ); ?> "><i class="fa fa-angle-left"></i></a></li>
				<li class="back"><a href="<?php echo esc_url( get_permalink(get_post_meta(get_the_ID(), 'portfolio_page', true)) ); ?>"><i class="fa fa-th-large"></i></a></li>
				<li class="next <?php echo $have_newer_posts; ?>"><a href="<?php echo esc_url( get_permalink(get_adjacent_post(false,'',false)) ); ?> "><i class="fa fa-angle-right"></i></a></li>
			</ul>
			<!-- /paginate -->

			<!-- SHARE -->
			<?php if ( function_exists( 'sharing_display' ) ) { echo sharing_display(); } ?>
		</div>
	</div>
</section>
<!-- END: PAGINATION -->

<?php get_footer(); ?>