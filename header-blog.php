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
        <?php include_once("analyticstracking.php") ?>
        <?php include_once("facebooktracking.php") ?>

        <!-- BEGIN: MAIN STRUCTURE -->
        <main id="main-structure">

            <!-- BEGIN: SITE HEADER -->
            <header id="header" class="headroom header header--fixed" role="banner">
                <div class="header-inner">
                    <div class="container clearfix">

                        <!-- LOGO -->
                        <div class="float-left">
                            <div class="site-logo">

                                <?php if ( get_theme_mod('gotomeloy_img_logo') ) { ?>
                                    <a href="<?php echo esc_url( home_url('/') ); ?>">
                                        <img src="<?php echo esc_url( get_theme_mod('gotomeloy_img_logo') ); ?>" alt="<?php echo esc_attr( get_bloginfo('name') ); ?>">
                                    </a>
                                <?php } else { ?>
                                    <a href="<?php echo esc_url( home_url('/') ); ?>"><?php echo esc_html( get_bloginfo('name') ); ?></a>
                                <?php } ?>

                            </div>
                        </div>

                        <!-- MENU -->
                        <div class="float-right">

                            <?php 
                            $args = array(
                                'theme_location'  => 'gotomeloy-primary-navigation',
                                'container'       => 'nav',
                                'container_id'    => 'primary-nav',
                                'menu_class'      => 'site-menu nostyle',
                                'fallback_cb'     => 'gotomeloy_default_menu'
                            );

                            wp_nav_menu($args);
                            ?>

                        </div>

                        <!-- MENU TRIGGER -->
                        <div class="float-right">
                            <div class="trigger-nav">
                            <div id="flags_language_selector"><?php language_selector_flags_nolist(); ?></div>
                                <div class="inner">
                                    <span class="icon-bar top"></span>
                                    <span class="icon-bar middle"></span>
                                    <span class="icon-bar bottom"></span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </header>
            <!-- END: SITE HEADER -->
            
            <?php get_template_part( 'parts/hero-module.inc' ); ?> 

