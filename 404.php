<?php get_header( 'blog' ); ?>

<!-- BEGIN: SITE BODY -->
<section id="site-body" class="sections error-404 padding-size-l">

	<div class="container">

		<!-- PAGE CONTENT -->
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

			<header class="entry-header">
				<span class="category"><?php esc_html_e( 'Error 404', 'gotomeloy' ); ?></span>
				<h2 class="title"><?php esc_html_e( 'Not Found', 'gotomeloy' ); ?></h2>
			</header>

			<div class="blog-search">
				<form id="blog-search" method="get" action="<?php echo esc_url( home_url('/') ); ?>/">
					<div class="form-group">
						<input type="text" name="s" class="blog-search-input" placeholder="<?php esc_html_e('Search', 'gotomeloy') ?>">
						<button type="submit" class="blog-search-btn"><i class="fa fa-search"></i></button>
					</div>
				</form>
			</div>

			<p><?php esc_html_e( 'It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'gotomeloy' ); ?></p>


		</article>

	</div>

</section>
<!-- END: SITE BODY -->

<?php get_footer(); ?>