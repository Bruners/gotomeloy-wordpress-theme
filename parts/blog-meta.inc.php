<footer class="blog-meta clearfix">
	<div class="comments"><a href="<?php echo esc_url( get_permalink() ); ?>#comments"><?php echo get_comments_number() .' <span>'. esc_html__( 'Comments', 'gotomeloy') .'</span>'; ?></a></div>
	<div class="social-icons">
		<a href="<?php echo esc_url('http://facebook.com/sharer/sharer.php?u='. get_permalink()); ?>"><i class="fa fa-facebook"></i></a>
		<a href="<?php echo esc_url('https://twitter.com/home?status='. get_permalink()); ?>"><i class="fa fa-twitter"></i></a>
		<a href="<?php echo esc_url('http://pinterest.com/pin/create/button/?url='. get_permalink()); ?>"><i class="fa fa-pinterest"></i></a>
		<a href="<?php echo esc_url('https://plus.google.com/share?url='. get_permalink()); ?>"><i class="fa fa-google-plus"></i></a>
	</div>
	<div class="author"><span><?php esc_html_e('By', 'gotomeloy'); ?></span> <a href="<?php echo get_author_posts_url( get_the_author_meta('ID') ); ?>"><?php echo get_the_author(); ?></a></div>
</footer>
