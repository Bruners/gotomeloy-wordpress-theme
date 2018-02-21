<?php get_header( 'blog' ); ?>

<?php

	// Pagination Variables
	$have_olders_posts = get_adjacent_post(false,'',true) ? '' : 'no-more-posts';
	$have_newer_posts = get_adjacent_post(false,'',false) ? '' : 'no-more-posts';
	$hero_title = !empty($hero_title) ? $hero_title : get_the_title();
?>

<!-- BEGIN: SITE BODY -->
<section id="site-body" class="sections project">

	<div class="container single-header">
		<div class="row">
			<div class="col-md-8">
				<div class="single-header-title"><h5><?php echo $hero_title; ?></h5></div>
				<div class="single-header-ingress"></div>
			</div>
			<div class="col-md-4">
				<?php if ( function_exists( 'sharing_display' ) ) { echo sharing_display(); } ?>	
			</div>
		</div>
		<div class="single-header-body">
			<?php while ( have_posts() ) : the_post(); ?>
				<?php the_content(); ?>
			<?php endwhile; ?>
		</div>
	</div>

</section>
<!-- END: SITE BODY -->

<!-- BEGIN: PAGINATION -->
<section class="sections project paginations">
	<div class="container">
			<!-- PAGINATE -->
			<ul class="project-pagination nostyle clearfix">
				<li class="prev <?php echo $have_olders_posts; ?>"><a href="<?php echo esc_url( get_permalink(get_adjacent_post(false,'',true)) ); ?> "><i class="fa fa-angle-left"></i></a></li>
				<li class="back"><a href="<?php echo esc_url( get_permalink(get_post_meta(get_the_ID(), 'portfolio_page', true)) ); ?>"><i class="fa fa-th-large"></i></a></li>
				<li class="next <?php echo $have_newer_posts; ?>"><a href="<?php echo esc_url( get_permalink(get_adjacent_post(false,'',false)) ); ?> "><i class="fa fa-angle-right"></i></a></li>
			</ul>
			<!-- /paginate -->
	</div>
</section>
<!-- END: PAGINATION -->
<style>
    #map-container { height: 400px; }
</style>
<div class="row project">
	<div id="map-container" class="col-md-12 google-maps project"></div>
    <script async defer src="https://maps.googleapis.com/maps/api/js?v=3&amp;key=AIzaSyAWe_W4EBKsLh6r582q_xyP-GbY7Am761E"></script>
</div>
<div class="project project-copyright text-center">
    <?php echo get_theme_mod('gotomeloy_copyright_text', esc_html__('Copyright © GO TO MELØY 2016', 'gotomeloy') ); ?> | <?php echo(esc_html__( 'Utviklet av', 'gotomeloy' )); ?> <a href="https://www.github.com/bruners/" target="_blank">Lasse Brun</a><br />
</div>

<?php get_footer(); ?>