<?php if ( is_active_sidebar( 'primary-sidebar' ) ) { ?>

	<?php dynamic_sidebar( 'primary-sidebar' ); ?>

<?php } else { ?>
    
	<p><?php esc_html_e('Please add widgets to your primary sidebar.', 'gotomeloy') ?></p>

<?php } ?>