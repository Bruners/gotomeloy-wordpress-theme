<?php 
	if ( is_front_page() ) :
		get_header();
	elseif ( is_404() ) :
		get_header( 'blog' );
	else :
		get_header( 'blog' );
	endif;
?>

<?php

	// Blog Layout
	$blog_layout = isset($_GET['layout']) ? $_GET['layout'] : get_theme_mod('gotomeloy_blog_layout', 'full');
	$is_sidebar = ($blog_layout == 'side') ? true : false;
	$content_cols = $is_sidebar ? '8' : '12';

	// Pagination Variables
	global $wp_query;

	$max_pages = $wp_query->max_num_pages;
	$have_olders_posts = get_next_posts_link() ? '' : 'no-more-posts';
	$have_newer_posts = get_previous_posts_link() ? '' : 'no-more-posts';

	// Hero Variables
	$hero_opts = get_post_meta(get_the_ID(), 'hero_additional_options', true);
	$is_hero_module = is_array($hero_opts) && in_array('is_hero', $hero_opts) ? true : false;

?>

<!-- BEGIN: SITE BODY -->
<section id="site-body" class="sections blog padding-size-l">

	<div class="container clearfix">

		<!-- BEGIN: SEARCH FORM -->
		<div class="blog-search">
			<form id="blog-search" method="get" action="<?php echo esc_url( home_url('/') ); ?>/">
				<div class="form-group">
					<input type="text" name="s" class="blog-search-input" placeholder="<?php esc_html_e('Search', 'gotomeloy') ?>">
					<button type="submit" class="blog-search-btn"><i class="fa fa-search"></i></button>
				</div>
			</form>
		</div>
		<!-- BEGIN: SEARCH FORM -->

		<div class="row">

		<!-- BEGIN: PAGE CONTENT -->
		<div class="page-content column" data-span="<?php echo $content_cols; ?>">

			<!-- BLOG ENTRIES -->
			<div class="blog-entries">

				<?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
					<?php get_template_part( 'parts/blog-index-entry.inc' ); ?> 
				<?php endwhile; else: ?>
					<p class="entry"><?php esc_html_e( 'Sorry but there is no posts as per your criteria.', 'gotomeloy' ); ?></p> 
				<?php endif; ?>

			</div>

			<?php if ( $max_pages > 1 ) { ?>

			<!-- PAGINATION -->
			<section id="pagination" class="sections paginations padding-size-m">
				<ul class="blog-pagination nostyle clearfix">
					<li class="prev <?php echo $have_olders_posts; ?>"><?php echo get_next_posts_link('<i class="fa fa-angle-left"></i>'); ?></li>
					<li class="next <?php echo $have_newer_posts; ?>"><?php echo get_previous_posts_link('<i class="fa fa-angle-right"></i>'); ?></li>
				</ul>
			</section>

			<?php } ?>

		</div>
		<!-- END: PAGE CONTENT -->

		<?php if ( $is_sidebar ) { ?>

		<!-- BEGIN: PAGE SIDEBAR -->
		<aside class="page-sidebar column" data-span="4">
			<?php get_sidebar(); ?>
		</aside>
		<!-- END: PAGE SIDEBAR -->

		<?php } ?>

		</div>

	</div>

</section>
<!-- END: SITE BODY -->

<?php get_footer(); ?>
