<?php 
/*
Template Name: Contact
*/
?>

<?php get_header(); ?>

<?php

	// Contact Variables
    $short_msg = get_post_meta(get_the_ID(), 'contact_info_msg', true);
    $email_address = get_post_meta(get_the_ID(), 'contact_email', true);
    $phone_number = get_post_meta(get_the_ID(), 'contact_phone_number', true);
    $address = get_post_meta(get_the_ID(), 'contact_address', true);
    $form_shortcode = get_post_meta(get_the_ID(), 'contact_form_shortcode', true);
    $is_info_meta = !empty($short_msg) || !empty($email_address) || !empty($phone_number) || !empty($address);

?>

<!-- BEGIN: SITE BODY -->
<section id="site-body" class="sections contact padding-size-l">

	<div class="container">

		<div class="row clearfix">

			<?php while( have_posts() ) : the_post(); ?>

				<!-- MAIN CONTENT -->
				<article id="post-<?php the_ID(); ?>" class="column" data-span="12">
					<?php the_content( esc_html__( 'Read More', 'gotomeloy' ) ); ?>
				</article>
				
			<?php endwhile; ?>

			<?php if ($is_info_meta) { ?>

				<!-- CONTACT INFO -->
				<div class="column" data-span="6">

					<h5><?php esc_html_e('Contact info', 'gotomeloy'); ?></h5>

					<?php if ($short_msg) { ?>
						<p><?php echo $short_msg; ?></p>
					<?php } ?>				

					<?php if ($email_address) { ?>
						<p>
							<strong><?php esc_html_e('Email us', 'gotomeloy'); ?></strong><br>
							<a href="mailto:<?php echo esc_html( antispambot($email_address) ); ?>"><?php echo esc_html( antispambot($email_address) ); ?></a>
						</p>
					<?php } ?>

					<?php if ($phone_number) { ?>
						<p>
							<strong><?php esc_html_e('Call us', 'gotomeloy'); ?></strong><br>
							<?php echo $phone_number; ?>
						</p>
					<?php } ?>

					<?php if ($address) { ?>
						<p>
							<strong><?php esc_html_e('Address us', 'gotomeloy'); ?></strong><br>
							<?php echo $address; ?>
						</p>
					<?php } ?>					

				</div>

			<?php } ?>					

			<?php if ($form_shortcode) { ?>

				<!-- CONTACT FORM -->
				<div class="column" data-span="6">
					<h5><?php esc_html_e('Have a question?', 'gotomeloy'); ?></h5>
					<?php echo do_shortcode($form_shortcode); ?>
				</div>

			<?php } ?>

		</div>

	</div>

</section>
<!-- END: SITE BODY -->

<?php get_footer(); ?>