<?php

    // Hero Variables
    if( is_home() || is_search() || is_archive() ) {
        $post_ID = get_option('page_for_posts');
    } else {
        $post_ID = get_the_ID();
    }

    $hero_opts = get_post_meta($post_ID, 'hero_additional_options', true);
    $is_hero_module = is_array($hero_opts) && in_array('is_hero', $hero_opts) ? true : false;
    
    $is_hero_img = get_post_meta($post_ID, 'hero_bg_img', true) != false;
    $hero_img_class = $is_hero_img ? '' : 'hero-no-bg';
    $hero_img = wp_get_attachment_url(get_post_meta($post_ID, 'hero_bg_img', true));

    $hero_title = get_post_meta($post_ID, 'hero_title', true); // default value
    $hero_subtitle = get_post_meta($post_ID, 'hero_subtitle', true); // default value

    if( is_search() ) {
        $hero_title = esc_html__( 'Search Results', 'gotomeloy' );
        $hero_subtitle = sprintf( esc_html__( 'For the term "%s"', 'gotomeloy' ), get_search_query() );
    } else if( is_category() ) {
        $hero_title = esc_html__( 'Category', 'gotomeloy' );
        $hero_subtitle = sprintf( esc_html__( 'Posted in "%s" Category', 'gotomeloy' ), single_cat_title( '', false ) );
    } else if( is_tag() ) {
        $hero_title = esc_html__( 'Tag', 'gotomeloy' );
        $hero_subtitle = sprintf( esc_html__( 'Posted in "%s" Tag', 'gotomeloy' ), single_tag_title( '', false ) );
    } else if( is_date() ) {
        $hero_title = esc_html__( 'Archive', 'gotomeloy' );
        if ( is_day() ) {
            $hero_subtitle = sprintf( esc_html__( 'Posted in "%s"', 'gotomeloy' ), get_the_date() );
        } else if ( is_month() ) {
            $hero_subtitle = sprintf( esc_html__( 'Posted in "%s"', 'gotomeloy' ), get_the_date( 'F Y' ) );
        } else {
            $hero_subtitle = sprintf( esc_html__( 'Posted in "%s"', 'gotomeloy' ), get_the_date( 'Y' ) );
        }
    } else if( is_author() ) {
        $hero_title = esc_html__( 'Author', 'gotomeloy' );
        $hero_subtitle = sprintf( esc_html__( 'Posted in "%s" Author', 'gotomeloy' ), get_search_query() );
    } else if( is_home() ) {
        if ( $is_hero_module ) { 
            $hero_subtitle = !empty($hero_subtitle) ? $hero_subtitle : get_the_date('j M, Y');
        } else {
            $hero_subtitle = '';
        }
    } else if( is_single() ) {

        if ( $is_hero_module ) { 
            $hero_title = !empty($hero_title) ? $hero_title : get_the_title();
        } else {
            $hero_title = get_the_title();
        }
        
        if ( $is_hero_module ) { 
            $hero_subtitle = '';
            //$hero_subtitle = !empty($hero_subtitle) ? $hero_subtitle : get_the_date('j M, Y');
        } else {
            $hero_subtitle = '';
            //$hero_subtitle = get_the_date('j M, Y');
        }
    } else if( is_page() ) {

        if ( $is_hero_module ) { 
            $hero_title = !empty($hero_title) ? $hero_title : get_the_title();
        } else {
            $hero_title = get_the_title();
        }

        if ( $is_hero_module ) { 
            $hero_subtitle = !empty($hero_subtitle) ? $hero_subtitle : get_the_date('j M, Y');
        } else {
            $hero_subtitle = '';
        }

    }

    $hero_height = get_post_meta($post_ID, 'hero_height', true) ? get_post_meta($post_ID, 'hero_height', true) : 'small';
?>

<?php if ($is_hero_module) { ?>

<!-- BEGIN: HERO MODULE -->
    <div id="home-featured" class="video-container jquery-background-video-wrapper" style="background-image: url(http://www.stott.no/wp-content/uploads/2016/02/stottgjestehavn_1920x1080_50op.jpg);">

        <video autoplay loop class="my-background-video jquery-background-video" poster="http://www.stott.no/wp-content/uploads/2016/02/stottgjestehavn_1920x1080_50op.jpg" muted plays-inline>
            <source src="http://www.stott.no/video/stott_brygge_v4_720p24_1250kbps_web_apple.mp4" type="video/mp4">
            <source src="http://www.stott.no/video/stott_brygge_v4_720p24_1250kbps_web_legacy_baseline.mp4" type="video/mp4">
            <source src="http://www.stott.no/video/stott_brygge_v4.mp4" type="video/mp4">
            <source src="http://www.stott.no/video/stott_brygge_v4_720p24_1250kbps_web_i5gs.mp4" type="video/mp4">
            Your browser does not support the video tag.
       </video>
        <header>
            <div class="hero-content">
                <div class="hero-header text-center">
                    <div class="hero-header-title"><?php echo $hero_title; ?></div>
                    <div class="hero-header-subtitle"><?php echo $hero_subtitle; ?></div>
                    <div><a href="#site-body" class="scroll-down"><i class="scroll-down-icon fa fa-3x fa-inverse fa-chevron-circle-down" aria-hidden="true"></i></a></div>
                </div>
            </div>
        </header>
    <a id="stottfilm2" data-fancybox class="action-button btn btn-info link_nounderline" href="http://www.youtube.com/watch?v=OBBdQBFGGLk">Se video med lyd her</a>
    </div>
<!-- END: HERO MODULE -->

<?php } else { ?>

    <?php if ( !is_home() ) { ?>

        <section class="page-header">
            <h2 class="title"><?php echo $hero_title; ?></h2>
            <div class="date"><?php echo $hero_subtitle; ?></div>
        </section>

    <?php } ?>

<?php } ?>
