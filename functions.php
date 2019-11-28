<?php

#-----------------------------------------------------------------#
# Stop Wordpress from inserting <p>'s in the editor!
#-----------------------------------------------------------------#

remove_filter( 'the_content', 'wpautop' );
remove_filter( 'the_excerpt', 'wpautop' );

#-----------------------------------------------------------------#
# Stop Wordpress emoji scripts
#-----------------------------------------------------------------#

function disable_emojicons()
{
    remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
    remove_action( 'wp_print_styles', 'print_emoji_styles' );
    remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
    remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
    remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
    remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
    remove_action( 'admin_print_styles', 'print_emoji_styles' );
}

add_action( 'init', 'disable_emojicons' );

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

// Set content width value based on the theme's design
if ( ! isset( $content_width ) )
    $content_width = 960;

if ( ! function_exists('gotomeloy_theme_features') )
{

    // Register Theme Features
    function gotomeloy_theme_setup()
    {
        // Add theme support for Post Formats
        add_theme_support( 'post-formats', array( 'status', 'quote', 'gallery', 'image', 'video', 'audio', 'link', 'aside', 'chat' ) );

        add_post_type_support( 'page', 'post-formats' );
        add_post_type_support( 'offers', 'post-formats' );
        add_post_type_support( 'portfolio', 'post-formats' );

        // Add theme support for Featured Images
        add_theme_support( 'post-thumbnails', array( 'post', 'page', 'portfolio', 'offers' ) );

        // Set custom thumbnail dimensions
        set_post_thumbnail_size( 586, 478, true );

        //* Add new featured portfolio image size
        add_image_size( 'portfolio-featured', 586, 478, TRUE );

        // Support for HTML5 markup for search forms, comment forms, comment lists, gallery and caption.
        add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption' ) );

        // Add theme support for document Title tag
        add_theme_support( 'title-tag' );

        // Add support for editor styles.
        add_theme_support( 'editor-styles' );

        // Enqueue editor styles.
        add_editor_style( 'style-editor.css' );

        // Add theme support for Translation
        load_theme_textdomain( 'gotomeloy', get_template_directory() . '/lang' );

        // Register and Enqueue Frontend CSS
        add_action('wp_enqueue_scripts', 'gotomeloy_frontend_styles');
        add_action('wp_enqueue_scripts', 'gotomeloy_child_frontend_styles', 20);

        // Register WP3.0+ Menus
        add_action('init', 'gotomeloy_register_menu');

        // Register Sidebars
        add_action('widgets_init', 'gotomeloy_register_sidebar');

        // Register and Enqueue Frontend JS
        add_action('wp_enqueue_scripts', 'gotomeloy_frontend_js');

        // Register and Enqueue Backend CSS
        add_action('admin_enqueue_scripts', 'gotomeloy_backend_styles');
    }
}
add_action( 'after_setup_theme', 'gotomeloy_theme_setup' );


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
    if ( function_exists('register_sidebar') )
    {
        register_sidebar( array(
            'name' => esc_html__( 'Primary Sidebar', 'gotomeloy' ),
            'id' => 'primary-sidebar',
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget' => '</div>',
            'before_title' => '<h3>',
            'after_title' => '</h3>',
        ));

        register_sidebars( 1, array(
            'name' => 'widgetized-page-bottom-portfolio',
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget' => '</div>',
            'before_title' => '<h4 class="widgettitle">',
            'after_title' => '</h4>'
        ));

        register_sidebars( 2, array(
            'name' => 'widgetized-page-bottom-video',
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget' => '</div>',
            'before_title' => '<h4 class="widgettitle">',
            'after_title' => '</h4>'
        ));
    }
}

#-----------------------------------------------------------------#
# Register and Enqueue Frontend CSS
#-----------------------------------------------------------------#

function gotomeloy_frontend_styles()
{
    if ( !is_admin() ) {
        // Dequeue Gutenberg-hooked CSS
        wp_dequeue_style('wp-block-library');

        // wp_enqueue_style( $handle, $src, $deps, $ver, $media );
        wp_enqueue_style('gotomeloy', GOTOMELOY_CSS_URI . '/gotomeloy.min.css', array('gotomeloy-style'), 1.9 );
        wp_enqueue_style('gotomeloy-style', get_template_directory_uri() . '/style.css');

        wp_enqueue_style('fontawesome', 'https://use.fontawesome.com/releases/v5.11.2/css/all.css', null, '5.11.2', 'all' );
        wp_enqueue_style('fancybox', 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.6/jquery.fancybox.min.css', null, '3.5.6', 'all' );

        wp_add_inline_style('gotomeloy-style', get_theme_mod('gotomeloy_custom_css'));

    }
}

function gotomeloy_child_frontend_styles()
{
    if ( !is_admin() && is_child_theme() )
    {
        // Enqueue
        wp_enqueue_style( 'gotomeloy-child-style', get_stylesheet_directory_uri().'/style.css');

    }
}

function gotomeloy_backend_styles()
{
    // Enqueue
    wp_enqueue_style( 'gotomeloy-backend-style', GOTOMELOY_ADMIN_URI . '/style.css');
    wp_enqueue_style('fontawesome', 'https://use.fontawesome.com/releases/v5.11.2/css/all.css', null, '5.11.2', 'all' );
}

#-----------------------------------------------------------------#
# Register and Enqueue Frontend JS
#-----------------------------------------------------------------#

function gotomeloy_frontend_js()
{
    if ( !is_admin() )
    {

        // Enqueue
        wp_enqueue_script('jquery');

        wp_register_script('yall', GOTOMELOY_JS_URI . '/lib/yall.min.js', 'jquery', '3.1.5', true );
        wp_enqueue_script('yall');

        wp_register_script('cookieconsent', GOTOMELOY_JS_URI . '/cookieconsent/cookieconsent.min.js', 'jquery', '3.1.1', true );
        wp_enqueue_script('cookieconsent');

        if( is_front_page() )
        {
            wp_enqueue_script('gotomeloy-theme-functions', GOTOMELOY_JS_URI . '/gotomeloy.min.js', array('jquery'), 1.7, true);

            wp_register_script('touchswipe', 'https://cdnjs.cloudflare.com/ajax/libs/jquery.touchswipe/1.6.19/jquery.touchSwipe.min.js', 'jquery', '1.6.19', true );
            wp_enqueue_script('touchswipe');
        }

        wp_register_script('fancybox', 'https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js', 'jquery', '3.5.7', true );
        wp_enqueue_script('fancybox');

        wp_enqueue_script('gotomeloy-site-functions', GOTOMELOY_JS_URI . '/functions.min.js', array('jquery'), 2.0, true);

        // Enqueue (conditional)
        if ( is_singular() )
        {
            wp_enqueue_script( 'comment-reply' );
        }

    }
}

#-----------------------------------------------------------------#
# Require PHP Theme Resources
#-----------------------------------------------------------------#

// require ADMIN resources
require_once GOTOMELOY_ADMIN . '/metaboxes/functions.php';
require_once GOTOMELOY_ADMIN . '/theme-settings.php';

// require HELPER theme functions
require_once GOTOMELOY_INC . '/lib/lamark.inc.php';

#-----------------------------------------------------------------#
# WMPL language selector
#-----------------------------------------------------------------#

function language_selector_flags()
{
    if (function_exists('icl_get_languages'))
    {
        $languages = icl_get_languages('skip_missing=0&orderby=code');
        if(!empty($languages))
        {
            foreach($languages as $l)
            {
                if(!$l['active'])
                echo '<li><a href="'.$l['url'].'"><img class="lang-'.$l['language_code'].'" src="'.$l['country_flag_url'].'" height="18" alt="'.$l['language_code'].'" width="24" /></a></li>';
            }
        }
    }
}

function language_selector_flags_nolist()
{
    if (function_exists('icl_get_languages'))
    {
        $languages = icl_get_languages('skip_missing=1&orderby=code');
        if(!empty($languages))
        {
            foreach($languages as $l)
            {
                if(!$l['active'])
                echo '<a href="'.$l['url'].'" class="lang-'.$l['language_code'].'" alt="'.$l['language_code'].'"></a>';
            }
        }
    }
}

function cats_related_post()
{
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
            <div class="col-xs-6 col-md-3">
              <div class="post__card">
                <a href="<?php echo get_permalink( $_post->ID ); ?>" title="<?php esc_attr( $_post->post_title ); ?>">
                  <div class="post__card-body">
                    <img class="post__card-img img-responsive lazy" data-src="<?php echo $thumbnail_data['src']; ?>" />
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


function get_portfolio_posts( $args )
{
    if(!empty($args)){
        $current_post_type = $args;
    } else {
        $current_post_type = 'portfolio';
    }

    $post_id = get_the_ID();

    $query_args = array(
        'post_type'      => $current_post_type,
        'post__not_in'   => array($post_id),
        'poss_per_page' => '6',
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
        <div class="col-xs-6 col-md-3">
            <div class="post__card">
                <a href="<?php echo get_permalink( $_post->ID ); ?>" title="<?php esc_attr( $_post->post_title ); ?>">
                <div class="post__card-body">
                    <img class="post__card-img img-responsive lazy" data-src="<?php echo $thumbnail_data['src']; ?>" />
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
// [realtedposts posts=3 cats='33,55' tax='portfolio_category']

add_shortcode( 'relatedposts', 'related_posts' );
function related_posts( $args )
{
    $args = shortcode_atts( array(
       'posts' => 4,
       'cats'  => 'null',
       'tax'  => 'portfolio_category'
    ), $args );

    $post_id = get_the_ID();

    if ( $args['posts'] == 4) {
        $posts = 4;
    } else {
        $posts = $args['posts'];
    }

    $cols = 12/$posts;

    if ( $cols <= 3) {
      $cols = 3;
    }

    if ( $args['cats'] == 'null') {
        $cats = array('');
    } else {
        $cats = explode( ',', $args['cats'] );
    }

    if ( $args['tax'] == '' || $args['tax'] == 'portfolio_category' ) {
        $tax = 'portfolio_category';
    } else {
        $tax = $args['tax'];
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
        'posts_per_page' => $posts,
        'orderby'        => 'rand',
        'no_found_rows'  => true, // We don't ned pagination so this speeds up the query
        'tax_query' => array(
            array(
                'taxonomy'  => $tax,
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
        <div class="col-xs-6 col-md-<?php echo $cols; ?>">
            <div class="post__card">
                <a href="<?php echo get_permalink( $_post->ID ); ?>" title="<?php esc_attr( $_post->post_title ); ?>">
                <div class="card-body">
                    <img class="post__card-img img-responsive lazy" src="<?php echo $thumbnail_data['src']; ?>" />
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
# WP Admin login page misc
#-----------------------------------------------------------------#
function custom_login_logo() {
    echo '<style type="text/css">h1 a { background: url('.get_bloginfo('template_directory').'/img/stottbrygge_logo_110x110.png) 50% 50% no-repeat !important; width:110px !important;height:110px !important; }</style>';
}
add_action('login_head', 'custom_login_logo');

function change_wp_login_url() {
    return "https://www.stott.no/";
}
add_filter('login_headerurl', 'change_wp_login_url');


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
    // Provide the id of the targeted menu item # Komme seg hit
    $menu_target = 18145;

    // inspect $item

    if ($item->ID == $menu_target) {
       $atts['data-target'] = '#meny-modal-49900';
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
       $atts['data-target'] = '#meny-modal-49907';
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
