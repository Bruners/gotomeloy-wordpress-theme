<?php

#-----------------------------------------------------------------#
# Stop Wordpress from inserting <p>'s in the editor!
#-----------------------------------------------------------------#

remove_filter( 'the_content', 'wpautop' );
remove_filter( 'the_excerpt', 'wpautop' );

#-----------------------------------------------------------------#
# Stop Wordpress emoji scripts
#-----------------------------------------------------------------#

remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');


function disable_devicepx()
{
  wp_dequeue_script( 'devicepx' );
}

add_action( 'wp_enqueue_scripts', 'disable_devicepx' );

#-----------------------------------------------------------------#
# Remove JQuery migrate
#-----------------------------------------------------------------#

function remove_jquery_migrate($scripts)
{
    if (!is_admin() && isset($scripts->registered['jquery'])) {
        $script = $scripts->registered['jquery'];
        
        if ($script->deps) { // Check whether the script has any dependencies
            $script->deps = array_diff($script->deps, array(
                'jquery-migrate'
            ));
        }
    }
}

add_action('wp_default_scripts', 'remove_jquery_migrate');

#-----------------------------------------------------------------#
# Remove comment-reply.min.js from footer
#-----------------------------------------------------------------#

function disable_comment_reply_js()
{
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

/*
add_action( 'wp_print_scripts', 'wsds_detect_enqueued_scripts' );
function wsds_detect_enqueued_scripts() {
  global $wp_scripts;
  foreach( $wp_scripts->queue as $handle ) :
    echo $handle . ' | ';
  endforeach;
}
*/

add_filter( 'script_loader_tag', 'wsds_defer_scripts', 10, 3 );
function wsds_defer_scripts( $tag, $handle, $src )
{

  // The handles of the enqueued scripts we want to defer
  $defer_scripts = array(
    'jquery',
    'sb_instagram_scripts',
    'gotomeloy-theme-functions',
    'isotope',
    'touchswipe',
    'fancybox',
    'gotomeloy-site-functions'
  );

    if ( in_array( $handle, $defer_scripts ) ) {
        return '<script src="' . $src . '" defer="defer"></script>' . "\n";
    }

    return $tag;
}

// sb_instagram_scripts | jquery | gotomeloy-theme-functions | isotope | touchswipe | fancybox | gotomeloy-site-functions |
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

  function gotomeloy_theme_setup()
  {

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

  function gotomeloy_register_menu()
  {
    register_nav_menu('gotomeloy-primary-navigation', esc_html__('Primary Navigation', 'gotomeloy'));
  }


#-----------------------------------------------------------------#
# Register Sidebar(s)
#-----------------------------------------------------------------#

  function gotomeloy_register_sidebar()
  {

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

  function gotomeloy_frontend_styles()
  {
    if ( !is_admin() ) {
      // wp_enqueue_style( $handle, $src, $deps, $ver, $media );
      wp_enqueue_style('gotomeloy', GOTOMELOY_CSS_URI . '/gotomeloy.min.css', array('gotomeloy-style'), 1.9 );
      wp_enqueue_style('gotomeloy-style', get_template_directory_uri() . '/style.css');

      wp_enqueue_style('fontawesome', 'https://use.fontawesome.com/releases/v5.0.13/css/all.css', null, '5.0.13', 'all' );
      wp_enqueue_style('fancybox', 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.6/jquery.fancybox.min.css', null, '3.5.6', 'all' );

      wp_add_inline_style('gotomeloy-style', get_theme_mod('gotomeloy_custom_css'));

    }
  }

  function gotomeloy_child_frontend_styles()
  {
    if ( !is_admin() && is_child_theme() ) {

      // Enqueue
        wp_enqueue_style( 'gotomeloy-child-style', get_stylesheet_directory_uri().'/style.css');

    }
  }

#-----------------------------------------------------------------#
# Register and Enqueue Frontend JS
#-----------------------------------------------------------------#

  function gotomeloy_frontend_js()
  {
    if ( !is_admin() ) {

      // Enqueue
      wp_enqueue_script('jquery');

      if( is_front_page() )
      {
        wp_enqueue_script('gotomeloy-theme-functions', GOTOMELOY_JS_URI . '/gotomeloy.min.js', array('jquery'), 1.7, true);

        wp_register_script('isotope', 'https://cdnjs.cloudflare.com/ajax/libs/jquery.isotope/3.0.6/isotope.pkgd.min.js', 'jquery', '3.0.6', true );
        wp_enqueue_script('isotope');
      }

      wp_register_script('touchswipe', 'https://cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.19/jquery.touchSwipe.min.js', 'jquery', '1.6.19', true );
      wp_enqueue_script('touchswipe');

      wp_register_script('fancybox', 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.6/jquery.fancybox.min.js', 'jquery', '3.5.6', true );
      wp_enqueue_script('fancybox');

      wp_enqueue_script('gotomeloy-site-functions', GOTOMELOY_JS_URI . '/functions.min.js', array('jquery'), 2.0, true);

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

function language_selector_flags()
{
  if (function_exists('icl_get_languages')) {
    $languages = icl_get_languages('skip_missing=0&orderby=code');
    if(!empty($languages)){
        foreach($languages as $l){
          if(!$l['active'])
              echo '<li><a href="'.$l['url'].'"><img class="lang-'.$l['language_code'].'" src="'.$l['country_flag_url'].'" height="18" alt="'.$l['language_code'].'" width="24" /></a></li>';
        }
    }
  }
}

function language_selector_flags_nolist()
{
    if (function_exists('icl_get_languages')) {
      $languages = icl_get_languages('skip_missing=1&orderby=code');
      if(!empty($languages)){
          foreach($languages as $l){
              if(!$l['active'])
                echo '<a href="'.$l['url'].'" class="lang-'.$l['language_code'].'" alt="'.$l['language_code'].'"></a>';
          }
      }
    }
}

//* Add new featured portfolio image size
add_image_size( 'portfolio-featured', 586, 478, TRUE );


// Sharing icons

function social_share_menu_item()
{
  add_submenu_page("options-general.php", "Social Share", "Social Share", "manage_options", "social-share", "social_share_page");
}

add_action("admin_menu", "social_share_menu_item");

function social_share_page()
{
   ?>
      <div class="wrap">
         <h1>Social Sharing Options</h1>

         <form method="post" action="options.php">
            <?php
               settings_fields("social_share_config_section");

               do_settings_sections("social-share");

               submit_button();
            ?>
         </form>
      </div>
   <?php
}

function social_share_settings()
{
    add_settings_section("social_share_config_section", "", null, "social-share");

    add_settings_field("social-share-facebook", __('Vis deleknapp for Facebook?', 'gotomeloy'), "social_share_facebook_checkbox", "social-share", "social_share_config_section");
    add_settings_field("social-share-twitter", __('Vis deleknapp for Twitter?', 'gotomeloy'), "social_share_twitter_checkbox", "social-share", "social_share_config_section");
    add_settings_field("social-share-googleplus", __('Vis deleknapp for Google+?', 'gotomeloy'), "social_share_googleplus_checkbox", "social-share", "social_share_config_section");

    register_setting("social_share_config_section", "social-share-facebook");
    register_setting("social_share_config_section", "social-share-twitter");
    register_setting("social_share_config_section", "social-share-googleplus");
}

function social_share_facebook_checkbox()
{
   ?>
        <input type="checkbox" name="social-share-facebook" value="1" <?php checked(1, get_option('social-share-facebook'), true); ?> />
   <?php
}

function social_share_twitter_checkbox()
{
   ?>
        <input type="checkbox" name="social-share-twitter" value="1" <?php checked(1, get_option('social-share-twitter'), true); ?> />
   <?php
}

function social_share_googleplus_checkbox()
{
   ?>
        <input type="checkbox" name="social-share-googleplus" value="1" <?php checked(1, get_option('social-share-googleplus'), true); ?> />
   <?php
}

add_action("admin_init", "social_share_settings");

function add_social_share_icons()
{
    $text_share = __('Del dette:', 'gotomeloy');
    $html = "<div class='clearfix'><div class='sb-social-icon'><h5 class='sb-title'>" . $text_share . "</h5><div class='sb-content'><ul>";
      
    global $post;

    $url = get_permalink($post->ID);
    $url = esc_url($url);
    $text_fb = __(  'Klikk for å dele på Facebook', 'gotomeloy' );
    $text_gl = __(  'Klikk for å dele på Google+', 'gotomeloy' );
    $text_tw = __(  'Klikk for å dele på Twitter', 'gotomeloy' );

    if(get_option("social-share-facebook") == 1)
    {
        $html = $html . "<li><a href='http://www.facebook.com/sharer.php?u=" . $url . "' rel='nofollow' class='fab fa-facebook' target='_blank' title='" . $text_fb . "'><span class='sr-only'>" . $text_fb . "</span></a></li>";
    }

    if(get_option("social-share-googleplus") == 1)
    {
        $html = $html . "<li><a href='https://plus.google.com/share?url=" . $url . "' rel='nofollow' class='fab fa-google' target='_blank' title='" . $text_gl . "'><span class='sr-only'>" . $text_gl . "</span></a></li>";
    }

    if(get_option("social-share-twitter") == 1)
    {
        $html = $html . "<li><a href='https://twitter.com/share?url=" . $url . "' rel='nofollow' class='fab fa-twitter' target='_blank' title='" . $text_tw . "'><span class='sr-only'>" . $text_tw . "</span></a></li>";
    }


    $html = $html . "<li class='share-end'></li></ul></div></div></div>";

    return $html;
}


function cats_related_post() {

  $post_id = get_the_ID();
  $customTaxonomyTerms = wp_get_object_terms( $post_id, 'portfolio_category', array('fields' => 'ids') );
  $current_post_type = 'portfolio'; //get_post_type($post_id);

  $query_args = array(
    'post_type'      => $current_post_type,
    'post__not_in'   => array($post_id),
    'posts_per_page' => '6',
    'orderby'        => 'rand',
    'no_found_rows'  => true, // We don't ned pagination so this speeds up the query
    'tax_query' => array(
      array(
        'taxonomy'  => 'portfolio_category',
        'field'     => 'term_id',
        'terms'     => $customTaxonomyTerms,
      )
    ),
  );

  $related_cats_post = new WP_Query( $query_args );

  if ($related_cats_post->have_posts())
  {
    echo '<div class="container-related-posts">';
    echo '<div class="row">';

    while($related_cats_post->have_posts()): $related_cats_post->the_post();
      $thumbnail_data = lamark_get_attachment_meta( get_post_thumbnail_id() );
    ?>
    <div class="col-xs-12 col-md-2">
      <div class="post__card">
        <a href="<?php echo get_permalink( $_post->ID ); ?>" title="<?php esc_attr( $_post->post_title ); ?>">
          <div class="post__card-body">
            <img class="post__card-img img-responsive" src="<?php echo $thumbnail_data['src']; ?>" />
            <div class="post__card-img-overlay text">
              <div class="post__card-title"><?php the_title(); ?></div>
            </div>
          </div>
        </a>
      </div>
    </div>

    <?php endwhile;
    echo '</div></div>';
    // Restore original Post Data
    wp_reset_postdata();
  }

}


function get_portfolio_posts( $args ) {

  if(!empty($args)){
    $current_post_type = $args;
  } else {
    $current_post_type = 'portfolio';
  }

  $post_id = get_the_ID();

  $query_args = array(
    'post_type'      => $current_post_type,
    'post__not_in'   => array($post_id),
    'posts_per_page' => '6',
    'orderby'        => 'rand',
    'no_found_rows'  => true, // We don't ned pagination so this speeds up the query
  );

  $portfolio_posts = new WP_Query( $query_args );

  if ($portfolio_posts->have_posts())
  {
    echo '<div class="container-related-posts">';
    echo '<div class="row">';

    while($portfolio_posts->have_posts()): $portfolio_posts->the_post();
      $thumbnail_data = lamark_get_attachment_meta( get_post_thumbnail_id() );
    ?>
    <div class="col-xs-12 col-md-2">
      <div class="post__card">
        <a href="<?php echo get_permalink( $_post->ID ); ?>" title="<?php esc_attr( $_post->post_title ); ?>">
          <div class="post__card-body">
            <img class="post__card-img img-responsive" src="<?php echo $thumbnail_data['src']; ?>" />
            <div class="post__card-img-overlay text">
              <div class="post__card-title"><?php the_title(); ?></div>
            </div>
          </div>
        </a>
      </div>
    </div>

    <?php endwhile;
    echo '</div></div>';
    // Restore original Post Data
    wp_reset_postdata();
  }

}


// Creates shortcode realtedposts to insert post of selected category id's defaulting to values 4 posts and null
// [realtedposts posts=3 cats='33,55']

add_shortcode( 'relatedposts', 'related_posts' );
function related_posts( $args ) {
  $args = shortcode_atts( array(
    'posts' => 4,
    'cats' => 'null'
  ), $args );

  $post_id = get_the_ID();

  if ( $args['posts'] == 4) {
    $posts = 4;
  } else {
    $posts = $args['posts'];
  }

  $cols = 12/$posts;

  if ( $args['cats'] == 'null') {
    $cats = array('');
  } else {
    $cats = explode( ',', $args['cats'] );
  }

  ob_start();
  ?>

  <div class="row">
  <?php
    $post_id = get_the_ID();

    $current_post_type = 'portfolio'; //get_post_type($post_id);
    $query_args = array(
      'post_type'      => $current_post_type,
      'post__not_in'   => array($post_id),
      'posts_per_page' => '-1',
      'orderby'        => 'rand',
      'no_found_rows'  => true, // We don't ned pagination so this speeds up the query
      'tax_query' => array(
        array(
          'taxonomy'  => 'portfolio_category',
          'field'     => 'term_id',
          'terms'     => $cats,
        )
      ),
    );

    $related_cats_post = new WP_Query( $query_args );

    if ($related_cats_post->have_posts())
    {

      while($related_cats_post->have_posts()): $related_cats_post->the_post();
        $thumbnail_data = lamark_get_attachment_meta( get_post_thumbnail_id() );
        ?>
      <div class="col-xs-12 col-md-<?php echo $cols; ?>">
        <div class="post__card">
          <a href="<?php echo get_permalink( $_post->ID ); ?>" title="<?php esc_attr( $_post->post_title ); ?>">
            <div class="card-body">
              <img class="post__card-img img-responsive" src="<?php echo $thumbnail_data['src']; ?>" />
              <div class="post__card-img-overlay text">
                <div class="post__card-title"><?php the_title(); ?></div>
              </div>
            </div>
          </a>
        </div>
      </div>

      <?php endwhile;

      // Restore original Post Data
      wp_reset_postdata();
    }
  ?>
  </div>
  <?php
  $output = ob_get_clean();
  return $output;
}

#-----------------------------------------------------------------#
# Legg til atributter for å åpne modals fra menyene
#-----------------------------------------------------------------#
add_filter( 'nav_menu_link_attributes', 'gotomeloy_menu_atts', 10, 3 );
function gotomeloy_menu_atts( $atts, $item, $args )
{
  // Provide the id of the targeted menu item
  $menu_target = array(23,24,959,1141,1142,1143,1144,18145,18146,1533,1534,1535,22544,22545);

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

function sendContactFormToSiteAdmin ()
{
  try {
    if (empty($_POST['message_name']) || empty($_POST['message_email']) || empty($_POST['message_text']) || empty($_POST['message_human'])) {
      throw new Exception('Bad form parameters. Check the markup to make sure you are naming the inputs correctly.');
    }

    if (!is_email($_POST['message_email'])) {
      throw new Exception('Email address not formatted correctly.');
    }

    $email_to = get_option('admin_email');
    $site_name = get_option( 'blogname' );
    $site_url = site_url();
    $site_domain = str_ireplace('www.', '', parse_url($site_url, PHP_URL_HOST));

    $subject = "Kontaktskjema Støtt Brygge: " . $_POST['message_name'];
    $message = "Melding fra: ". $_POST['message_name'] . "\n\n" . $_POST['message_text'] . "\r\n\r\n" . "--" . "\r\n" . "This e-mail was sent from a contact form on " . $site_name  . " (" . $site_url . ")";
    $headers = "From: ". $_POST['message_name'] . " <kontakt@" . $site_domain . ">" . "\r\n" . "Reply-To: " . $_POST['message_email'] . "\r\n";

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
