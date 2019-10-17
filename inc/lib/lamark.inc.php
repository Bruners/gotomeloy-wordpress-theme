<?php

#-----------------------------------------------------------------#
#
#	Here we have all the HELPER functions for the theme
#	Please be extremely cautious editing this file,
#	When things go wrong, they intend to go wrong in a big way.
#	You have been warned!
#
#-----------------------------------------------------------------#



#-------------------------------------------------------------------------------#
#  Filter Post Classes
#-------------------------------------------------------------------------------#

	if ( !function_exists('lamark_post_class') ) {

		function lamark_post_class( $classes ) {

			// add custom classes to the $classes array

			if ( get_post_type() == 'portfolio' ) {
				$classes[] = 'entry portfolio ';
			} else {
				$classes[] = 'entry clearfix';
			}

			// return the $classes array
			return $classes;
		}

	}

	add_filter( 'post_class', 'lamark_post_class' );


#-------------------------------------------------------------------------------#
#  Search Only Blog Posts
#-------------------------------------------------------------------------------#

	if ( !function_exists('lamark_search_filter') ) {

		function lamark_search_filter($query) {

		    if ($query->is_search) {
		        $query->set('post_type', 'post');
		    }
		    return $query;

		}

	}

	add_filter('pre_get_posts','lamark_search_filter');


#-----------------------------------------------------------------#
# Get Attachment Meta Value
#-----------------------------------------------------------------#

	if ( !function_exists('lamark_get_attachment_meta') ) {

		function lamark_get_attachment_meta( $attachment_id ) {

			$attachment = get_post( $attachment_id );
			return array(
				'alt' => get_post_meta( $attachment->ID, '_wp_attachment_image_alt', true ),
				'caption' => $attachment->post_excerpt,
				'description' => $attachment->post_content,
				'href' => esc_url( get_permalink( $attachment->ID ) ),
				'src' => $attachment->guid,
				'title' => $attachment->post_title
			);
		}

	}

#-----------------------------------------------------------------#
# Taxonomy Walker for Portfolio Filter
#-----------------------------------------------------------------#

	class Lamark_Walker_Portfolio_Filter extends Walker_Category {

	   function start_el(&$output, $category, $depth = 0, $args = array(), $current_object_id = 0) {

	      extract($args);
	      $cat_slug = esc_attr( $category->slug );
	      $cat_slug = apply_filters( 'list_cats', $cat_slug, $category );

		  if($cat_slug == 'summer' || $cat_slug == 'sommer') {
		  		$link = '<li><a href="#" onclick="filterSelection(\''.strtolower($cat_slug).'\')"><i class="fas fa-sun">&nbsp;</i>';
		  } elseif ($cat_slug == 'winter' || $cat_slug == 'vinter') {
		  		$link = '<li><a href="#" onclick="filterSelection(\''.strtolower($cat_slug).'\')"><i class="fas fa-snowflake">&nbsp;</i>';
		  } elseif ($cat_slug == 'autumn' || $cat_slug == 'host') {
		  		$link = '<li><a href="#" onclick="filterSelection(\''.strtolower($cat_slug).'\')"><i class="fab fa-canadian-maple-leaf">&nbsp;</i>';
		  } elseif ($cat_slug == 'spring' || $cat_slug == 'vaar') {
		  		$link = '<li><a href="#" onclick="filterSelection(\''.strtolower($cat_slug).'\')"><i class="fas fa-dove">&nbsp;</i>';
		  } else {
		        //$link = '<li><a href="#" data-filter=".'.strtolower(preg_replace('/\s+/', '-', $cat_slug)).'">';
	        	$link = '<li><a href="#" onclick="filterSelection(\''.strtolower($cat_slug).'\')">';
	  	  }

		  $cat_name = esc_attr( $category->name );
	      $cat_name = apply_filters( 'list_cats', $cat_name, $category );

	      $link .= $cat_name;

	      if(!empty($category->description)) {
	         $link .= ' <span>'.$category->description.'</span>';
	      }

	      $link .= '</a></li>';

	      $output .= $link;

	   }
	}


#-----------------------------------------------------------------#
# CPT Custom Functions
#-----------------------------------------------------------------#


	// Get array of term attr(s) of any taxonomy
	if ( !function_exists('lamark_get_term_fields') ) {

		function lamark_get_term_fields($taxonomy, $field) {

			global $post;

			$taxonomy_terms = get_the_terms($post->ID, $taxonomy);

			if ( !empty($taxonomy_terms) ) {
				foreach ( $taxonomy_terms as $term ) {
				  $term_field[] = $term->$field;
				}
			}

			return $term_field;

		}

	}


#-------------------------------------------------------------------------------#
#  Adds Nav. Class on Single CPT Page
#-------------------------------------------------------------------------------#

	if ( !function_exists('lamark_current_cpt_nav_class') ) {

		function lamark_current_cpt_nav_class($classes, $item) {

		    $post_type = get_post_type();
		    if ($item->attr_title != '' && $item->attr_title == $post_type) {
		        array_push($classes, 'current-menu-item');
		    };
		    return $classes;

		}

	}

	add_filter('nav_menu_css_class', 'lamark_current_cpt_nav_class', 10, 2 );
