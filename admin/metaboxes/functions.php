<?php

// Disable ACF setup in admin panel
define( 'ACF_LITE', false );

// Meta Panel Configuration
if(function_exists("register_field_group"))
{
	register_field_group(array (
		'id' => 'acf_contact-form',
		'title' => 'Contact Form',
		'fields' => array (
			array (
				'key' => 'field_5627b993f5e5e',
				'label' => 'Form Shortcode',
				'name' => 'contact_form_shortcode',
				'type' => 'text',
				'default_value' => '',
				'placeholder' => '[contact-form-7 id="XXX" title="XXX"]',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
		),
		'location' => array (
			array (
				array (
					'param' => 'page_template',
					'operator' => '==',
					'value' => 'template-contact.php',
					'order_no' => 0,
					'group_no' => 0,
				),
			),
		),
		'options' => array (
			'position' => 'side',
			'layout' => 'default',
			'hide_on_screen' => array (
			),
		),
		'menu_order' => 0,
	));
	register_field_group(array (
		'id' => 'acf_contact-info',
		'title' => 'Contact Info',
		'fields' => array (
			array (
				'key' => 'field_5627b6a7899ad',
				'label' => 'Short Message',
				'name' => 'contact_info_msg',
				'type' => 'text',
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_56277c7d6920b',
				'label' => 'Email Address',
				'name' => 'contact_email',
				'type' => 'email',
				'default_value' => '',
				'placeholder' => 'admin@example.com',
				'prepend' => '',
				'append' => '',
			),
			array (
				'key' => 'field_56277cf66920c',
				'label' => 'Phone Number',
				'name' => 'contact_phone_number',
				'type' => 'text',
				'default_value' => '',
				'placeholder' => '+00 123 456 7890',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_56277d466920d',
				'label' => 'Address',
				'name' => 'contact_address',
				'type' => 'textarea',
				'default_value' => '',
				'placeholder' => '',
				'maxlength' => '',
				'rows' => '',
				'formatting' => 'br',
			),
		),
		'location' => array (
			array (
				array (
					'param' => 'page_template',
					'operator' => '==',
					'value' => 'template-contact.php',
					'order_no' => 0,
					'group_no' => 0,
				),
			),
		),
		'options' => array (
			'position' => 'normal',
			'layout' => 'default',
			'hide_on_screen' => array (
			),
		),
		'menu_order' => 0,
	));
	register_field_group(array (
		'id' => 'acf_hero-header',
		'title' => 'Hero Header',
		'fields' => array (
			array (
				'key' => 'field_5626b57c5b2e6',
				'label' => 'Title',
				'name' => 'hero_title',
				'type' => 'text',
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5626b5955b2e7',
				'label' => 'Subtitle',
				'name' => 'hero_subtitle',
				'type' => 'text',
				'default_value' => '',
				'placeholder' => '',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5626b5a05b2e8',
				'label' => 'Hero Image',
				'name' => 'hero_bg_img',
				'type' => 'image',
				'save_format' => 'url',
				'preview_size' => 'medium',
				'library' => 'all',
			),
			array (
				'key' => 'field_5626b5c95b2e9',
				'label' => 'Hero Height',
				'name' => 'hero_height',
				'type' => 'select',
				'required' => 1,
				'choices' => array (
					'small' => 'Small',
					'medium' => 'Medium',
					'big' => 'Big',
					'full' => 'Full',
				),
				'default_value' => 'small',
				'allow_null' => 0,
				'multiple' => 0,
			),
			array (
				'key' => 'field_5626b6095b2ea',
				'label' => 'Additional Options',
				'name' => 'hero_additional_options',
				'type' => 'checkbox',
				'choices' => array (
					'is_hero' => 'Enable Hero Header',
				),
				'default_value' => '',
				'layout' => 'vertical',
			),
		),
		'location' => array (
			array (
				array (
					'param' => 'post_type',
					'operator' => '==',
					'value' => 'post',
					'order_no' => 0,
					'group_no' => 0,
				),
			),
			array (
				array (
					'param' => 'post_type',
					'operator' => '==',
					'value' => 'page',
					'order_no' => 0,
					'group_no' => 1,
				),
			),
			array (
				array (
					'param' => 'post_type',
					'operator' => '==',
					'value' => 'portfolio',
					'order_no' => 0,
					'group_no' => 0,
				),
			),			
		),
		'options' => array (
			'position' => 'normal',
			'layout' => 'default',
			'hide_on_screen' => array (
			),
		),
		'menu_order' => 0,
	));
	register_field_group(array (
		'id' => 'acf_portfolio-details',
		'title' => 'Portfolio Details',
		'fields' => array (
			array (
				'key' => 'field_5627c76e06991',
				'label' => 'Portfolio Category',
				'name' => 'portfolio_category',
				'type' => 'taxonomy',
				'taxonomy' => 'portfolio_category',
				'field_type' => 'select',
				'allow_null' => 1,
				'load_save_terms' => 0,
				'return_format' => 'id',
				'multiple' => 0,
			),
			array (
				'key' => 'field_5627c7e2ca2cd',
				'label' => 'Portfolio Columns',
				'name' => 'portfolio_columns',
				'type' => 'select',
				'required' => 1,
				'choices' => array (
					1 => 'One Column',
					2 => 'Two Columns',
					3 => 'Three Columns',
					4 => 'Four Columns',
					5 => 'Five Columns',
					6 => 'Six Columns',
				),
				'default_value' => 3,
				'allow_null' => 0,
				'multiple' => 0,
			),
			array (
				'key' => 'field_5627c850cfe23',
				'label' => 'Additional Options',
				'name' => 'portfolio_additional_options',
				'type' => 'checkbox',
				'choices' => array (
					'is_filtration' => 'Enable Filteration',
					'is_masonry' => 'Enable Masonry',
				),
				'default_value' => 'is_filtration
	is_masonry',
				'layout' => 'vertical',
			),
		),
		'location' => array (
			array (
				array (
					'param' => 'page_template',
					'operator' => '==',
					'value' => 'template-gotomeloy.php',
					'order_no' => 0,
					'group_no' => 0,
				),
			),
		),
		'options' => array (
			'position' => 'normal',
			'layout' => 'default',
			'hide_on_screen' => array (
			),
		),
		'menu_order' => 0,
	));
	register_field_group(array (
		'id' => 'acf_project-details',
		'title' => 'Project Details',
		'fields' => array (
			array (
				'key' => 'field_5627e2fd3d55c',
				'label' => 'Portfolio Page',
				'name' => 'portfolio_page',
				'type' => 'page_link',
				'required' => 1,
				'post_type' => array (
					0 => 'page',
				),
				'allow_null' => 1,
				'multiple' => 0,
			),
			array (
				'key' => 'field_5627f51b74d37',
				'label' => 'Custom URL',
				'name' => 'project_custom_url',
				'type' => 'text',
				'default_value' => '',
				'placeholder' => 'http://www.example.com',
				'prepend' => '',
				'append' => '',
				'formatting' => 'html',
				'maxlength' => '',
			),
			array (
				'key' => 'field_5627dc2e2c2cf',
				'label' => 'Thumbnail Dimension',
				'name' => 'project_thumb_dimension',
				'type' => 'checkbox',
				'choices' => array (
					'w2' => '2x Thumbnail Width',
					'h2' => '2x Thumbnail Height',
				),
				'default_value' => '',
				'layout' => 'vertical',
			),
		),
		'location' => array (
			array (
				array (
					'param' => 'post_type',
					'operator' => '==',
					'value' => 'portfolio',
					'order_no' => 0,
					'group_no' => 0,
				),
			),
		),
		'options' => array (
			'position' => 'normal',
			'layout' => 'default',
			'hide_on_screen' => array (
			),
		),
		'menu_order' => 0,
	));
}
