<!DOCTYPE html>
<html <?php language_attributes(); ?>>

    <head>

        <!-- Basic Page Needs
        ================================================== -->
        <meta charset="<?php bloginfo( 'charset' ); ?>" />

        <!-- Mobile Specific Metas
        ================================================== -->
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <!-- Pingback
        ================================================== -->
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

        <!-- WP Head
        ================================================== -->
        <?php wp_head(); ?>


    </head>

    <body <?php body_class(); ?>>

        <!-- PRELOADER -->
        <div class="preloader">
            <div class="loader"></div>
        </div>
        <?php include_once("analyticstracking.php") ?>
        <?php include_once("facebooktracking.php") ?>

        <!-- BEGIN: MAIN STRUCTURE -->
        <main id="main-structure">

            <!-- BEGIN: SITE HEADER -->
<div id="wrapper">
            <header id="site-header">    
                <a id="logo" title="<?php echo esc_attr( get_bloginfo('name') ); ?>" href="<?php echo esc_url( home_url('/') ); ?>"></a>
                <h5><?php echo esc_attr( get_bloginfo('name') ); ?></h5>
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
</div>

