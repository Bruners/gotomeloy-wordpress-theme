<?php

/*-----------------------------------------------------------------------------------*/
/*	Theme Customization Options
/*-----------------------------------------------------------------------------------*/

add_action( 'customize_register', 'gotomeloy_customize_register' );

function gotomeloy_customize_register($wp_customize) {

	$wp_customize->remove_section('colors');
	$wp_customize->remove_section('background_image');
	$wp_customize->get_section('static_front_page')->priority = 20;

	/*-----------------------------------------------------------------------------------*/
	/*	General Settings
	/*-----------------------------------------------------------------------------------*/

	$wp_customize->get_section('title_tagline')->title = esc_html__('General Settings', 'gotomeloy');
	$wp_customize->get_section('title_tagline')->priority = 10;

    $wp_customize->add_setting( 'gotomeloy_img_logo', array (
		'sanitize_callback' => 'esc_url_raw',
    ) );

	$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'gotomeloy_img_logo', array(
        'label'   => esc_html__('Image Logo', 'gotomeloy'),
        'section' => 'title_tagline',
    ) ) );

    $wp_customize->add_setting( 'gotomeloy_blog_layout', array (
	    'default' => 'full',
		'sanitize_callback' => 'sanitize_text_field',
    ) );

    $wp_customize->add_control('gotomeloy_blog_layout', array(
	    'label'    => esc_html__('Blog Layout', 'gotomeloy'),
	    'section'  => 'title_tagline',
		'type'     => 'select',
		'choices'  => array(
			'full'  => 'Full Width',
			'side' => 'With Sidebar',
		),

	) );


    $wp_customize->add_setting( 'gotomeloy_copyright_text', array (
	    'default' => esc_html__('Copyright GO TO MELOY 2016', 'gotomeloy'),
		'sanitize_callback' => 'custom_sanitize_textarea',
    ) );

    $wp_customize->add_control('gotomeloy_copyright_text', array(
	    'label'    => esc_html__('Copyright Text', 'gotomeloy'),
	    'section'  => 'title_tagline',
	    'type'     => 'textarea',
	) );


	/*-----------------------------------------------------------------------------------*/
	/*	Styling Settings
	/*-----------------------------------------------------------------------------------*/

    $wp_customize->add_section( 'gotomeloy_styling', array(
	    'title'          => esc_html__( 'Styling Options', 'gotomeloy' ),
	    'priority'       => 80,
	));

    $wp_customize->add_setting( 'gotomeloy_accent_color', array (
	    'default' => '#1E2023',
		'sanitize_callback' => 'sanitize_hex_color',
    ) );

	$wp_customize->add_control( new WP_Customize_Color_Control($wp_customize, 'gotomeloy_accent_color', array(
	    'label' => esc_html__( 'Accent Color', 'gotomeloy' ),
	    'section' => 'gotomeloy_styling',
	    'priority' => 10,
	 )
	) );

    $wp_customize->add_setting( 'gotomeloy_custom_css', array (
		'sanitize_callback' => 'custom_sanitize_textarea',
    ) );

    $wp_customize->add_control('gotomeloy_custom_css', array(
	    'label'    => esc_html__('Custom CSS', 'gotomeloy'),
	    'section'  => 'gotomeloy_styling',
	    'type'     => 'textarea',
	) );

}


/*-----------------------------------------------------------------------------------*/
/*	Custom Sanitization Function(s)
/*-----------------------------------------------------------------------------------*/

function custom_sanitize_textarea( $input ) {
      return wp_kses_post( force_balance_tags( $input ) );
}

?>
