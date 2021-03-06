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

        <!-- Basic Blog Needs
        ================================================== -->
        <meta charset="<?php bloginfo( 'charset' ); ?>" />

        <!-- Mobile Specific Metas
        ================================================== -->
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="<?php echo $gdpr_google_analtyics ?>">

        <!-- Pingback
        ================================================== -->
        <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
        <link href="//www.google-analytics.com" rel="dns-prefetch">
        <link href="//connect.facebook.net" rel="dns-prefetch">

        <style>
            /* latin */
            @font-face {
              font-family: 'Oswald';
              font-display: auto;
              font-style: normal;
              font-weight: 400;
              src: url(https://fonts.gstatic.com/s/oswald/v24/TK3_WkUHHAIjg75cFRf3bXL8LICs1_FvsUZiZQ.woff2) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            /* latin */
            @font-face {
              font-family: 'Roboto';
              font-display: auto;
              font-style: normal;
              font-weight: 400;
              src: local('Roboto'), local('Roboto-Regular'), url(https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
            /* latin */
            @font-face {
              font-family: 'Roboto';
              font-display: auto;
              font-style: normal;
              font-weight: 700;
              src: local('Roboto Bold'), local('Roboto-Bold'), url(https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc4.woff2) format('woff2');
              unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
        </style>

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
