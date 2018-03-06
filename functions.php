<?php

#-----------------------------------------------------------------#
#
# Here define all the custom functions for the child theme.
# Please be extremely cautious editing this file,
# When things go wrong, they intend to go wrong in a big way.
# You have been warned!
#
#-----------------------------------------------------------------#

#-----------------------------------------------------------------#
# Stop Wordpress from inserting <p>'s in the editor!
#-----------------------------------------------------------------#

remove_filter( 'the_content', 'wpautop' );

#-----------------------------------------------------------------#
# Stop jetpack from inserting itself
#-----------------------------------------------------------------#

function jptweak_remove_share() {
    remove_filter( 'the_content', 'sharing_display',19 );
    remove_filter( 'the_excerpt', 'sharing_display',19 );
    if ( class_exists( 'Jetpack_Likes' ) ) {
        remove_filter( 'the_content', array( Jetpack_Likes::init(), 'post_likes' ), 30, 1 );
    }
}

add_action( 'loop_start', 'jptweak_remove_share' );


function disable_devicepx() {
  wp_dequeue_script( 'devicepx' );
}

add_action( 'wp_enqueue_scripts', 'disable_devicepx' );

#-----------------------------------------------------------------#
# Remove comment-reply.min.js from footer
#-----------------------------------------------------------------#

function disable_comment_reply_js(){
  wp_deregister_script( 'comment-reply' );
         }
add_action('init','disable_comment_reply_js');


#-----------------------------------------------------------------#
# Don't publish to facebook by default
#-----------------------------------------------------------------#

add_filter( 'publicize_checkbox_default', '__return_false' );


/*
* Getting script tags
* Thanks http://wordpress.stackexchange.com/questions/54064/how-do-i-get-the-handle-for-all-enqueued-scripts
*/

/* add_action( 'wp_print_scripts', 'wsds_detect_enqueued_scripts' );
function wsds_detect_enqueued_scripts() {
  global $wp_scripts;
  foreach( $wp_scripts->queue as $handle ) :
    echo $handle . ' | ';
  endforeach;
}
*/

add_filter( 'script_loader_tag', 'wsds_defer_scripts', 10, 3 );
function wsds_defer_scripts( $tag, $handle, $src ) {

  // The handles of the enqueued scripts we want to defer
  $defer_scripts = array(
    'admin-bar',
    'contact-form-7',
    'sb_instagram_scripts',
    'devicepx',
    'wpml-legacy-dropdown-0',
    'gotomeloy-theme-functions',
    'gotomeloy-site-functions',
    'comment-reply',
    'jquery-migrate',
    'fancybox',
  );

    if ( in_array( $handle, $defer_scripts ) ) {
        return '<script src="' . $src . '" defer="defer" type="text/javascript"></script>' . "\n";
    }

    return $tag;
}


// admin-bar | contact-form-7 | sb_instagram_scripts | devicepx | wpml-legacy-dropdown-0 | jquery | gotomeloy-theme-functions | gotomeloy-site-functions | comment-reply |

#-----------------------------------------------------------------#
# Define Theme Constants
#-----------------------------------------------------------------#

  define('GOTOMELOY_ADMIN', get_template_directory() .'/admin');
  define('GOTOMELOY_ADMIN_URI', get_template_directory_uri() .'/admin');
  define('GOTOMELOY_JS', get_template_directory() .'/js');
  define('GOTOMELOY_JS_URI', get_template_directory_uri() .'/js');
  define('GOTOMELOY_CSS', get_template_directory() .'/css');
  define('GOTOMELOY_CSS_URI', get_template_directory_uri() .'/css');
  define('GOTOMELOY_INC', get_template_directory() .'/inc');
  define('GOTOMELOY_INC_URI', get_template_directory_uri() .'/inc');

#-----------------------------------------------------------------#
# Theme Setup
#-----------------------------------------------------------------#

  function gotomeloy_theme_setup() {

    global $content_width;

    // Set Content Width
    if ( !isset($content_width) ) {
      $content_width = 960;
    }

    // Register and Enqueue Frontend CSS
    add_action('wp_enqueue_scripts', 'gotomeloy_frontend_styles');
    add_action('wp_enqueue_scripts', 'gotomeloy_child_frontend_styles', 20);

    // Load Translation Text Domain
    load_theme_textdomain( 'gotomeloy', get_template_directory() . '/lang' );

    // Support for Feed Links
    add_theme_support('automatic-feed-links');

    // Support for Title Tag
    add_theme_support( 'title-tag' );

    // Suport for Post Thumbnails
    add_theme_support( 'post-thumbnails' );

    // Register WP3.0+ Menus
    add_action('init', 'gotomeloy_register_menu');

    // Register Sidebars
    add_action('widgets_init', 'gotomeloy_register_sidebar');

    // Register and Enqueue Frontend JS
    add_action('wp_enqueue_scripts', 'gotomeloy_frontend_js');

    // Register and Enqueue Backend CSS
    add_action('admin_enqueue_scripts', 'gotomeloy_backend_styles');

  }

  add_action('after_setup_theme', 'gotomeloy_theme_setup');

#-----------------------------------------------------------------#
# Register WP3.0+ Menu(s)
#-----------------------------------------------------------------#

  function gotomeloy_register_menu() {
    register_nav_menu('gotomeloy-primary-navigation', esc_html__('Primary Navigation', 'gotomeloy'));
  }


#-----------------------------------------------------------------#
# Register Sidebar(s)
#-----------------------------------------------------------------#

  function gotomeloy_register_sidebar() {

  // Register sidebar the theme
    if ( function_exists('register_sidebar') ) {
      register_sidebar( array(
        'name' => esc_html__( 'Primary Sidebar', 'gotomeloy' ),
        'id' => 'primary-sidebar',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3>',
        'after_title' => '</h3>',
      ) );

      register_sidebars( 1, array(
        'name' => 'widgetized-page-bottom',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h4 class="kontakt-oss widgettitle">',
        'after_title' => '</h4>'
      ) );
    }
  }

#-----------------------------------------------------------------#
# Register and Enqueue Frontend CSS
#-----------------------------------------------------------------#

  function gotomeloy_frontend_styles() {
    if ( !is_admin() ) {
      // wp_enqueue_style( $handle, $src, $deps, $ver, $media );
      //wp_enqueue_style('gotomeloy', GOTOMELOY_CSS_URI . '/gotomeloy.min.css', array('gotomeloy-style'), 1.0);
      wp_enqueue_style('gotomeloy', GOTOMELOY_CSS_URI . '/gotomeloy.min.css', array('gotomeloy-style'), 1.7 );
      wp_enqueue_style('gotomeloy-style', get_template_directory_uri() . '/style.css');

      wp_enqueue_style('fontawesome', 'https://use.fontawesome.com/releases/v5.0.6/css/all.css', null, '5.0.6', 'all' );

      // Add Inline Styles (dynamic)
      ob_start();
      require( GOTOMELOY_CSS .'/dynamic.php' );
      $dynamic_css = ob_get_clean();

          wp_add_inline_style('gotomeloy-style', $dynamic_css);
      wp_add_inline_style('gotomeloy-style', get_theme_mod('gotomeloy_custom_css'));

    }
  }

  function gotomeloy_child_frontend_styles() {
    if ( !is_admin() && is_child_theme() ) {

      // Enqueue
        wp_enqueue_style( 'gotomeloy-child-style', get_stylesheet_directory_uri().'/style.css');

    }
  }


  function gotomeloy_backend_styles() {
      wp_enqueue_style('gotomeloy-plugins', GOTOMELOY_ADMIN_URI . '/plugins/css/style.css');
  }


#-----------------------------------------------------------------#
# Register and Enqueue Frontend JS
#-----------------------------------------------------------------#

  function gotomeloy_frontend_js() {
    if ( !is_admin() ) {

      // Enqueue
      wp_enqueue_script('jquery');

      if( is_front_page() )
      {
        wp_enqueue_script('gotomeloy-theme-functions', GOTOMELOY_JS_URI . '/gotomeloy.min.js', array('jquery'), 1.7, true);
      }
      wp_register_script( 'fancybox', 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.2.5/jquery.fancybox.min.js', 'jquery', '3.2.5', true );
      wp_enqueue_script('fancybox');

      wp_enqueue_script('gotomeloy-site-functions', GOTOMELOY_JS_URI . '/functions.min.js', array('jquery'), 1.7, true);

      wp_register_script( 'touchswipe', 'https://cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.4/jquery.touchSwipe.min.js', 'jquery', '1.6.4', true );
      wp_enqueue_script('touchswipe');


      // Enqueue (conditional)
      if ( is_singular() ) {
        wp_enqueue_script( 'comment-reply' );
      }

    }
  }

#-----------------------------------------------------------------#
# Require PHP Theme Resources
#-----------------------------------------------------------------#

  // require ADMIN resources
  require_once GOTOMELOY_ADMIN . '/customizer/functions.php';
  require_once GOTOMELOY_ADMIN . '/plugins/functions.php';
  require_once GOTOMELOY_ADMIN . '/metaboxes/functions.php';

  // require HELPER theme functions
  require_once GOTOMELOY_INC . '/lib/lamark.inc.php';

#-----------------------------------------------------------------#
# WMPL language selector
#-----------------------------------------------------------------#

function language_selector_flags(){
    $languages = icl_get_languages('skip_missing=0&orderby=code');
    if(!empty($languages)){
        foreach($languages as $l){
          if(!$l['active'])
              echo '<li><a href="'.$l['url'].'"><img class="lang-'.$l['language_code'].'" src="'.$l['country_flag_url'].'" height="18" alt="'.$l['language_code'].'" width="24" /></a></li>';
        }
    }
}

function language_selector_flags_nolist(){
    $languages = icl_get_languages('skip_missing=1&orderby=code');
    if(!empty($languages)){
        foreach($languages as $l){
            if(!$l['active'])
              echo '<a href="'.$l['url'].'" class="lang-'.$l['language_code'].'" alt="'.$l['language_code'].'"></a>';
        }
    }
}

//* Add new featured portfolio image size
add_image_size( 'portfolio-featured', 586, 478, TRUE );


#-----------------------------------------------------------------#
# Legg til atributter for å åpne modals fra menyene
#-----------------------------------------------------------------#
add_filter( 'nav_menu_link_attributes', 'gotomeloy_menu_atts', 10, 3 );
function gotomeloy_menu_atts( $atts, $item, $args )
{
  // Provide the id of the targeted menu item
  $menu_target = array(23,24,959,1141,1142,1143,1144,18145,18146,18147,1533,1534,1535,22544,22545,22547);

  // inspect $item

  if (in_array($item->ID, $menu_target)) {
    $atts['data-toggle'] = 'modal';
  }
  return $atts;
}
// Kontakt oss
add_filter( 'nav_menu_link_attributes', 'gotomeloy_menu_modal_1076', 10, 3 );
function gotomeloy_menu_modal_1076( $atts, $item, $args )
{
  // Provide the id of the targeted menu item
  $menu_target = 23;

  // inspect $item

  if ($item->ID == $menu_target) {
      $atts['data-target'] = '#meny-modal-1076';
  }
  return $atts;
}
add_filter( 'nav_menu_link_attributes', 'gotomeloy_menu_modal_1074', 10, 3 );
function gotomeloy_menu_modal_1074( $atts, $item, $args )
{
  $menu_target = 24;
  // inspect $item

  if ($item->ID == $menu_target) {
    $atts['data-target'] = '#meny-modal-1074';
  }
  return $atts;
}
// Om oss
add_filter( 'nav_menu_link_attributes', 'gotomeloy_menu_modal_1075', 10, 3 );
function gotomeloy_menu_modal_1075( $atts, $item, $args )
{
  // Provide the id of the targeted menu item
  $menu_target = 959;

  // inspect $item

  if ($item->ID == $menu_target) {
    $atts['data-target'] = '#meny-modal-1075';
  }
  return $atts;
}

// Get Here
add_filter( 'nav_menu_link_attributes', 'gotomeloy_menu_modal_1144', 10, 3 );
function gotomeloy_menu_modal_1144( $atts, $item, $args )
{
  // Provide the id of the targeted menu item
  $menu_target = 1144;

  // inspect $item

  if ($item->ID == $menu_target) {
    $atts['data-target'] = '#meny-modal-1140';
  }
  return $atts;
}

// About us
add_filter( 'nav_menu_link_attributes', 'gotomeloy_menu_modal_1142', 10, 3 );
function gotomeloy_menu_modal_1142( $atts, $item, $args )
{
  // Provide the id of the targeted menu item
  $menu_target = 1142;

  // inspect $item

  if ($item->ID == $menu_target) {
    $atts['data-target'] = '#meny-modal-1138';
  }
  return $atts;
}

add_filter( 'nav_menu_link_attributes', 'gotomeloy_menu_modal_1143', 10, 3 );
function gotomeloy_menu_modal_1143( $atts, $item, $args )
{
  // Provide the id of the targeted menu item
  $menu_target = 1143;

  // inspect $item

  if ($item->ID == $menu_target) {
    $atts['data-target'] = '#meny-modal-1135';
  }
  return $atts;
}
add_filter( 'nav_menu_link_attributes', 'gotomeloy_menu_modal_18145', 10, 3 );
function gotomeloy_menu_modal_18145( $atts, $item, $args )
{
  // Provide the id of the targeted menu item
  $menu_target = 18145;

  // inspect $item

  if ($item->ID == $menu_target) {
    $atts['data-target'] = '#meny-modal-18140';
  }
  return $atts;
}
add_filter( 'nav_menu_link_attributes', 'gotomeloy_menu_modal_18146', 10, 3 );
function gotomeloy_menu_modal_18146( $atts, $item, $args )
{
  // Provide the id of the targeted menu item
  $menu_target = 18146;

  // inspect $item

  if ($item->ID == $menu_target) {
    $atts['data-target'] = '#meny-modal-18139';
  }
  return $atts;
}
add_filter( 'nav_menu_link_attributes', 'gotomeloy_menu_modal_18147', 10, 3 );
function gotomeloy_menu_modal_18147( $atts, $item, $args )
{
  // Provide the id of the targeted menu item
  $menu_target = 18147;

  // inspect $item

  if ($item->ID == $menu_target) {
    $atts['data-target'] = '#meny-modal-18138';
  }
  return $atts;
}
add_filter( 'nav_menu_link_attributes', 'gotomeloy_menu_modal_1532', 10, 3 );
function gotomeloy_menu_modal_1532( $atts, $item, $args )
{
  // Provide the id of the targeted menu item
  $menu_target = 1533;

  // inspect $item

  if ($item->ID == $menu_target) {
    $atts['data-target'] = '#meny-modal-1532';
  }
  return $atts;
}
add_filter( 'nav_menu_link_attributes', 'gotomeloy_menu_modal_1531', 10, 3 );
function gotomeloy_menu_modal_1531( $atts, $item, $args )
{
  // Provide the id of the targeted menu item
  $menu_target = 1534;

  // inspect $item

  if ($item->ID == $menu_target) {
    $atts['data-target'] = '#meny-modal-1531';
  }
  return $atts;
}
add_filter( 'nav_menu_link_attributes', 'gotomeloy_menu_modal_1530', 10, 3 );
function gotomeloy_menu_modal_1530( $atts, $item, $args )
{
  // Provide the id of the targeted menu item
  $menu_target = 1535;

  // inspect $item

  if ($item->ID == $menu_target) {
    $atts['data-target'] = '#meny-modal-1530';
  }
  return $atts;
}

add_filter( 'nav_menu_link_attributes', 'gotomeloy_menu_modal_22544', 10, 3 );
function gotomeloy_menu_modal_22544( $atts, $item, $args )
{
  // Provide the id of the targeted menu item
  // Støtt Brygge Travel Here
  $menu_target = 22544;

  // inspect $item

  if ($item->ID == $menu_target) {
    $atts['data-target'] = '#meny-modal-22519';
  }
  return $atts;
}
add_filter( 'nav_menu_link_attributes', 'gotomeloy_menu_modal_22545', 10, 3 );
function gotomeloy_menu_modal_22545( $atts, $item, $args )
{
  // Provide the id of the targeted menu item
  // Støtt Brygge About us
  $menu_target = 22545;

  // inspect $item

  if ($item->ID == $menu_target) {
    $atts['data-target'] = '#meny-modal-22510';
  }
  return $atts;
}
add_filter( 'nav_menu_link_attributes', 'gotomeloy_menu_modal_22547', 10, 3 );
function gotomeloy_menu_modal_22547( $atts, $item, $args )
{
  // Provide the id of the targeted menu item
  // Støtt Brygge Contact us
  $menu_target = 22547;

  // inspect $item

  if ($item->ID == $menu_target) {
    $atts['data-target'] = '#meny-modal-22520';
  }
  return $atts;
}

function sendContactFormToSiteAdmin () {

  
  try {
    if (empty($_POST['message_name']) || empty($_POST['message_email']) || empty($_POST['message_text']) || empty($_POST['message_human'])) {
      throw new Exception('Bad form parameters. Check the markup to make sure you are naming the inputs correctly.');
    }
  
    if (!is_email($_POST['message_email'])) {
      throw new Exception('Email address not formatted correctly.');
    }

    $email_to = get_option('admin_email');
    $subject = "Kontaktskjema Støtt Brygge: " . $_POST['message_name'];
    $message = "Melding fra ". $_POST['message_name'] . ": \n\n " . $_POST['message_text'] . "\r\n\r\n" . "--" . "\r\n" . "This e-mail was sent from a contact form on Støtt Brygge (https://www.stott.no)";
    $headers = "From: ". $_POST['message_name'] . " <kontakt@stott.no>" . "\r\n" . "Reply-To: " . $_POST['message_email'] . "\r\n";
 
    if (wp_mail($email_to, $subject, $message, $headers)) {
      echo json_encode(array('status' => 'success', 'message' => 'Contact message sent.'));
      exit;
    } else {
      throw new Exception('Failed to send email. Check AJAX handler.');
    }
  } catch (Exception $e) {
    echo json_encode(array('status' => 'error', 'message' => $e->getMessage()));
    exit;
  }
}
add_action("wp_ajax_contact_send", "sendContactFormToSiteAdmin");
add_action("wp_ajax_nopriv_contact_send", "sendContactFormToSiteAdmin");