/* Accent Color */
input[type="submit"], input[type="reset"], input[type="button"], button:not(.blog-search-btn), .btn,
.filters li a.active,
.entry-header .category,
.widget h3,
.back2top {
	background-color: <?php echo esc_attr( get_theme_mod('gotomeloy_accent_color', '#1E2023') ); ?> !important;
}

@media (min-width: 961px) {

	.site-menu li ul {
		background-color: <?php echo esc_attr( get_theme_mod('gotomeloy_accent_color', '#1E2023') ); ?> !important;
	}

}
