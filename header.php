<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<?php 
    $options = get_option( 'gotomeloy_theme_options' );
    $gdpr_google_analtyics = '';


    if( isset( $options['gdpr-google-analytics'] ) ) {
        $gdpr_google_analtyics = $options['gdpr-google-analytics'];
    }
?>

    <head>

        <!-- Basic Page Needs
        ================================================== -->
        <meta charset="<?php bloginfo( 'charset' ); ?>" />

        <!-- Mobile Specific Metas
        ================================================== -->
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="google-site-verification" content="<?php echo $gdpr_google_analtyics ?>">

        <!-- Pingback
        ================================================== -->
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
        <link href="https://fonts.googleapis.com/css?family=Oswald:400|Roboto:400,700" rel="stylesheet">

        <!-- WP Head
        ================================================== -->
        <?php wp_head(); ?>

        <?php include_once("gdpr.php") ?>

    </head>

    <body <?php body_class(); ?>>

        <!-- BEGIN: MAIN STRUCTURE -->
        <main id="wrapper">

            <!-- BEGIN: SITE HEADER -->
            
            <header id="site-header">
                <a id="logo" title="<?php echo esc_attr( get_bloginfo('name') ); ?>" href="<?php echo esc_url( home_url('/') ); ?>"></a>
                <?php
                    $args = array(
                        'theme_location'  => 'gotomeloy-primary-navigation',
                        'container'       => 'nav',
                        'container_id'    => 'primary-nav',
                        'menu_class'      => 'primary-menu',
                        'fallback_cb'     => 'gotomeloy_default_menu'
                    );

                    wp_nav_menu($args);
                ?>
                <div class="language-selector" id="language-selector"><?php language_selector_flags_nolist(); ?></div>
                <div id="menu-toggle">
                    <div class="inner">
                        <span class="icon-bar top"></span>
                        <span class="icon-bar middle"></span>
                        <span class="icon-bar bottom"></span>
                    </div>
                </div>
            </header>
            <!-- END: SITE HEADER -->

            <?php get_template_part( 'parts/hero-module.inc' ); ?>
