<?php get_header(); ?>

<?php

	// Pagination Variables
	$have_olders_posts = get_adjacent_post(false,'',true) ? '' : 'no-more-posts';
	$have_newer_posts = get_adjacent_post(false,'',false) ? '' : 'no-more-posts';

?>

<!-- BEGIN: SITE BODY -->
<section id="site-body" class="sections project padding-size-l">

	<div class="container">

		<?php while ( have_posts() ) : the_post(); ?>

			<?php the_content(); ?>

		<?php endwhile; ?>

	</div>

</section>
<!-- END: SITE BODY -->

<!-- BEGIN: PAGINATION -->
<section class="sections paginations padding-size-m">
	<div class="container">

		<!-- PAGINATE -->
		<ul class="project-pagination nostyle clearfix">
			<li class="prev <?php echo $have_olders_posts; ?>"><a href="<?php echo esc_url( get_permalink(get_adjacent_post(false,'',true)) ); ?> "><i class="fa fa-angle-left"></i></a></li>
			<li class="back"><a href="<?php echo esc_url( get_permalink(get_post_meta(get_the_ID(), 'portfolio_page', true)) ); ?>"><i class="fa fa-th-large"></i></a></li>
			<li class="next <?php echo $have_newer_posts; ?>"><a href="<?php echo esc_url( get_permalink(get_adjacent_post(false,'',false)) ); ?> "><i class="fa fa-angle-right"></i></a></li>
		</ul>
		<!-- /paginate -->

		<!-- SHARE -->
		<ul class="share share-project nostyle text-center">
			<li class="share-title"><?php esc_html_e('Share:', 'lamark'); ?></li>
			<li><a href="<?php echo esc_url('http://facebook.com/sharer/sharer.php?u='. get_the_permalink()); ?>"><?php esc_html_e('Facebook', 'lamark'); ?></a></li>
			<li><a href="<?php echo esc_url('https://twitter.com/home?status='. get_the_permalink()); ?>"><?php esc_html_e('Twitter', 'lamark'); ?></a></li>
			<li><a href="<?php echo esc_url('http://pinterest.com/pin/create/button/?url='. get_the_permalink()); ?>"><?php esc_html_e('Pinterest', 'lamark'); ?></a></li>
		</ul>

	</div>
</section>
<!-- END: PAGINATION -->

<?php get_footer(); ?>