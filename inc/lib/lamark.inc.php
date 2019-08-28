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
# Custom Gallery Markup for WordPress
#-----------------------------------------------------------------#

	if ( !function_exists('lamark_gallery_markup') ) {

		function lamark_gallery_markup( $output = '', $atts, $instance ) {
			$return = $output; // fallback


			if ( !empty($atts['ids']) ) { // proceed only if ids exist

				$atts['columns'] = !empty($atts['columns']) ? $atts['columns'] : 3;

				$gallery_ids = explode(',', $atts['ids']);

				$return = '<div id="grid-'. rand(10,100) .'" class="grid clearfix" data-col="'. $atts['columns'] .'" data-margin="25" data-height="0.7" data-masonry="true">';

				foreach( $gallery_ids as $image_id ) {

					// $attachment_meta['alt'] = '';
					// $attachment_meta['title'] = '';
					// $attachment_meta['src'] = '';

					$attachment_meta = lamark_get_attachment_meta($image_id);

					$return .= '<div class="entry '. $attachment_meta['alt'] .'">';
					$return .= '<a href="'. esc_url( $attachment_meta['src'] ) .'" title="'. esc_attr( $attachment_meta['title'] ) .'" rel="lightbox">';
					$return .= '<div class="entry-image iBG" data-img="'. esc_attr( $attachment_meta['src'] ) .'"></div>';
					$return .= '</a>';
					$return .= '</div>';

				}

				$return .= '</div>';

			}

			return $return;
		}

	}

	add_filter( 'post_gallery', 'lamark_gallery_markup', 10, 3 );


#-----------------------------------------------------------------#
# Taxonomy Walker for Portfolio Filter
#-----------------------------------------------------------------# 

	class Lamark_Walker_Portfolio_Filter extends Walker_Category {
		
	   function start_el(&$output, $category, $depth = 0, $args = array(), $current_object_id = 0) {

	      extract($args);
	      $cat_slug = esc_attr( $category->slug );
	      $cat_slug = apply_filters( 'list_cats', $cat_slug, $category );
		  
	      //$link = '<li><a href="#" data-filter=".'.strtolower(preg_replace('/\s+/', '-', $cat_slug)).'">';
	      $link = '<li><a href="#" onclick="filterSelection(\''.strtolower($cat_slug).'\')">';
		  
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


#-------------------------------------------------------------------------------#
#  Comment Template
#-------------------------------------------------------------------------------#

	if ( !function_exists('lamark_comments') ) {

		function lamark_comments($comment, $args, $depth) {
		
	        $isByAuthor = false;

	        if($comment->comment_author_email == get_the_author_meta('email')) {
	            $isByAuthor = true;
	        }

	        $GLOBALS['comment'] = $comment; ?>
	        <li <?php comment_class(); ?> id="li-comment-<?php comment_ID() ?>">

				<header class="clearfix">

					<!-- Avatar -->
					<div class="float-left">
						<?php echo wp_kses_post( get_avatar(get_the_author_meta('ID'), $size = '60') ); ?>
					</div>

					<div class="float-left">
						<div class="comment-meta">
							<div class="comment-meta-inner">
								<div class="comment-author">
									<h6 class="author"><?php echo wp_kses_post( get_comment_author_link() ); ?></h6>
								</div>
								<div class="comment-date">
									<?php echo human_time_diff( get_comment_time('U'), current_time('timestamp') ) .' '. esc_html__(' ago', 'lamark'); ?>
								</div>
							</div>
						</div>
					</div>

				</header>	        

                <div class="comment-content">
                    <?php comment_text() ?>
                </div>

                <?php comment_reply_link(array_merge( $args, array('reply_text' => 'Reply', 'depth' => $depth, 'max_depth' => $args['max_depth']))) ?>

		<?php
		}
	}


#-------------------------------------------------------------------------------#
#  Pings Template
#-------------------------------------------------------------------------------#

	if ( !function_exists('lamark_list_pings') ) {

		function lamark_list_pings($comment, $args, $depth) {
		    $GLOBALS['comment'] = $comment; ?>
			<li id="comment-<?php comment_ID(); ?>"><?php comment_author_link(); ?>
			<?php 
		}

	}


#-------------------------------------------------------------------------------#
#  Comments Form
#-------------------------------------------------------------------------------#

	if ( !function_exists('lamark_update_fields') ) {

		function lamark_update_fields($fields) {

		    $commenter = wp_get_current_commenter();
		    $req = get_option('require_name_email');
		    $aria_req = ($req ? " aria-required='true'" : '');

		    $fields['author'] =
		        '<p class="comment-form-author">
					<input required maxlength="30" placeholder="' . esc_html__('Name', 'lamark') . '" id="author" name="author" type="text" value="' . esc_attr($commenter['comment_author']) .
		        '" size="30"' . $aria_req . ' />
		    	</p>';

		    $fields['email'] =
		        '<p class="comment-form-email">
		    		<input required placeholder="' . esc_html__('Email', 'lamark') . '" id="email" name="email" type="email" value="' . esc_attr($commenter['comment_author_email']) .
		        '" size="30"' . $aria_req . ' />
		    	</p>';

		    $fields['url'] =
		        '<p class="comment-form-url">
					<input placeholder="' . esc_html__('Website', 'lamark') . '" id="url" name="url" type="url" value="' . esc_attr($commenter['comment_author_url']) .
		        '" size="30" />
		    	</p>';

		    return $fields;
		}

	}

	add_filter('comment_form_default_fields', 'lamark_update_fields');



	if ( !function_exists('lamark_comment_field') ) {

		function lamark_comment_field($comment_field) {

		    $comment_field =
		        '<p class="comment-form-comment">
					<textarea required placeholder="' . esc_html__('Comment', 'lamark') . '" id="comment" name="comment" cols="45" rows="10" aria-required="true"></textarea>
				</p>';

		    return $comment_field;
		}

	}

	add_filter('comment_form_field_comment', 'lamark_comment_field');

