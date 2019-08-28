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

    $carousel_opts = get_post_meta($post_ID, 'enable_carousel', true);
    $is_hero_carousel = is_array($carousel_opts) && in_array('is_carousel', $carousel_opts) ? true : false;
    
    $carousel_slides = get_post_meta($post_ID, 'enable_slides', true);
    $slide_1_enabled = is_array($carousel_slides) && in_array('slide_1',  $carousel_slides) ? true : false;
    $slide_2_enabled = is_array($carousel_slides) && in_array('slide_2',  $carousel_slides) ? true : false;
    $slide_3_enabled = is_array($carousel_slides) && in_array('slide_3',  $carousel_slides) ? true : false;
    $slide_4_enabled = is_array($carousel_slides) && in_array('slide_4',  $carousel_slides) ? true : false;

    if ( $is_hero_carousel) {
        if ( $slide_1_enabled ) {
            $slide_1_img = get_field('slide_1_image');
            $slide_1_title = get_field('slide_1_title');
            $slide_1_subtitle = get_field('slide_1_subtitle');
            $slide_1_button_1_class = get_field('slide_1_button_1_class');
            $slide_1_button_1_id = get_field('slide_1_button_1_id');
            $slide_1_button_1_ikon = get_field('slide_1_button_1_ikon');
            $slide_1_button_1_tekst = get_field('slide_1_button_1_tekst');
            $slide_1_button_1_url = get_field('slide_1_button_1_url');
            $slide_1_button_2_class = get_field('slide_1_button_2_class');
            $slide_1_button_2_id = get_field('slide_1_button_2_id');
            $slide_1_button_2_ikon = get_field('slide_1_button_2_ikon');
            $slide_1_button_2_tekst = get_field('slide_1_button_2_tekst');
            $slide_1_button_2_url = get_field('slide_1_button_2_url');
        }
        if ( $slide_2_enabled ) {
            $slide_2_img = get_field('slide_2_image');
            $slide_2_title = get_field('slide_2_title');
            $slide_2_subtitle = get_field('slide_2_subtitle');
            $slide_2_button_1_class = get_field('slide_2_button_1_class');
            $slide_2_button_1_id = get_field('slide_2_button_1_id');
            $slide_2_button_1_ikon = get_field('slide_2_button_1_ikon');
            $slide_2_button_1_tekst = get_field('slide_2_button_1_tekst');
            $slide_2_button_1_url = get_field('slide_2_button_1_url');
            $slide_2_button_2_class = get_field('slide_2_button_2_class');
            $slide_2_button_2_id = get_field('slide_2_button_2_id');
            $slide_2_button_2_ikon = get_field('slide_2_button_2_ikon');
            $slide_2_button_2_tekst = get_field('slide_2_button_2_tekst');
            $slide_2_button_2_url = get_field('slide_2_button_2_url');
        }
        if ( $slide_3_enabled ) {
            $slide_3_img = get_field('slide_3_image');
            $slide_3_title = get_field('slide_3_title');
            $slide_3_subtitle = get_field('slide_3_subtitle');
            $slide_3_button_1_class = get_field('slide_3_button_1_class');
            $slide_3_button_1_id = get_field('slide_3_button_1_id');
            $slide_3_button_1_ikon = get_field('slide_3_button_1_ikon');
            $slide_3_button_1_tekst = get_field('slide_3_button_1_tekst');
            $slide_3_button_1_url = get_field('slide_3_button_1_url');
            $slide_3_button_2_class = get_field('slide_3_button_2_class');
            $slide_3_button_2_id = get_field('slide_3_button_2_id');
            $slide_3_button_2_ikon = get_field('slide_3_button_2_ikon');
            $slide_3_button_2_tekst = get_field('slide_3_button_2_tekst');
            $slide_3_button_2_url = get_field('slide_3_button_2_url');
        }
        if ( $slide_4_enabled ) {
            $slide_4_img = get_field('slide_4_image');
            $slide_4_title = get_field('slide_4_title');
            $slide_4_subtitle = get_field('slide_4_subtitle');
            $slide_4_button_1_class = get_field('slide_4_button_1_class');
            $slide_4_button_1_id = get_field('slide_4_button_1_id');
            $slide_4_button_1_ikon = get_field('slide_4_button_1_ikon');
            $slide_4_button_1_tekst = get_field('slide_4_button_1_tekst');
            $slide_4_button_1_url = get_field('slide_4_button_1_url');
            $slide_4_button_2_class = get_field('slide_4_button_2_class');
            $slide_4_button_2_id = get_field('slide_4_button_2_id');
            $slide_4_button_2_ikon = get_field('slide_4_button_2_ikon');
            $slide_4_button_2_tekst = get_field('slide_4_button_2_tekst');
            $slide_4_button_2_url = get_field('slide_4_button_2_url');
        }
    }

    if ( is_search() ) {
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
            $hero_subtitle = !empty($hero_subtitle) ? $hero_subtitle : '';
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

<script>
    function fallback(video) {
        var img = video.querySelector('img');
        if (img)
            video.parentNode.replaceChild(img, video);
        }
</script>
<?php if ( !$is_hero_carousel && $is_hero_module ) { ?>
    <!-- BEGIN: HERO MODULE -->
    <section id="home-featured" class="sections hero <?php echo $hero_height. ' ' .$hero_img_class; ?>">
        <div class="hero-image iBG noparalax" data-img="<?php echo $hero_img; ?>"></div>
        <div class="hero-content">
            <div class="hero-header text-center">
                <div class="hero-header-title"><?php echo $hero_title; ?></div>
                <div class="hero-header-subtitle"><?php echo $hero_subtitle; ?></div>
                <div><a href="#site-body" class="scroll-down"><i class="scroll-down-icon fa fa-4x fa-inverse fa-chevron-circle-down" aria-hidden="true"></i></a></div>
            </div>
        </div>
    </section>
    <!-- END: HERO MODULE -->

<?php } elseif ( $is_hero_module && $is_hero_carousel ) { ?>
    <!-- BEGIN: HERO MODULE -->
    <section id="home-featured" class="sections hero <?php echo $hero_height. ' ' .$hero_img_class; ?>">
        <div class="carousel fade-carousel slide" data-ride="carousel" data-pause="hover" data-interval="6000" id="hero-header-images">
            <!-- Indicators -->
            <ol class="carousel-indicators">
                <?php if ( $slide_1_enabled ) { ?><li data-target="#hero-header-images" data-slide-to="0" class="active"></li> <?php } ?>
                <?php if ( $slide_2_enabled ) { ?><li data-target="#hero-header-images" data-slide-to="1"></li> <?php } ?>
                <?php if ( $slide_3_enabled ) { ?><li data-target="#hero-header-images" data-slide-to="2"></li> <?php } ?>
                <?php if ( $slide_4_enabled ) { ?><li data-target="#hero-header-images" data-slide-to="3"></li> <?php } ?>
            </ol>

            <div class="fade-carousel__scrolldown">
                <a href="#site-body" class="scroll-down"><i class="scroll-down-icon fa fa-2x fa-inverse fa-chevron-circle-down" aria-hidden="true"></i></a>
            </div>

            <!-- Wrapper for slides -->
            <div class="carousel-inner">
                <?php if ( $slide_1_enabled ) { ?>
                <div class="item slides active">
                    <?php if( !empty($slide_1_img) ): ?>
                    <img class="slide-1" src="<?php echo $slide_1_img['url']; ?>" />
                    <?php endif; ?>
                    <div class="hero__carousel">
                        <hgroup>
                            <h1><?php echo $slide_1_title; ?></h1>
                            <h5><?php echo $slide_1_subtitle; ?></h5>
                        </hgroup>
                        <?php if (get_field('slide_1_button_1_enable')) { ?>
                        <a class="btn <?php echo $slide_1_button_1_class; ?>" id="<?php echo $slide_1_button_1_id; ?>" role="button" href="<?php echo $slide_1_button_1_url; ?>" <?php if (get_field('slide_1_button_1_fancybox')) { echo ' data-fancybox'; } ?>>
                            <i class="<?php echo $slide_1_button_1_ikon; ?>"></i> <?php echo $slide_1_button_1_tekst; ?>
                        </a>&nbsp;
                        <?php } if (get_field('slide_1_button_2_enable')) { ?>
                        <a class="btn <?php echo $slide_1_button_2_class; ?>" id="<?php echo $slide_1_button_2_id; ?>" role="button" href="<?php echo $slide_1_button_2_url; ?>" <?php if (get_field('slide_1_button_2_fancybox')) { echo ' data-fancybox'; } ?>>
                            <i class="<?php echo $slide_1_button_2_ikon; ?>"></i> <?php echo $slide_1_button_2_tekst; ?>
                        </a>
                        <?php } ?>
                    </div>
                </div>
                <?php } ?>
                <?php if ( $slide_2_enabled ) { ?>
                <div class="item slides">
                    <?php if( !empty($slide_1_img) ): ?>
                    <img class="slide-2 lazy" data-src="<?php echo $slide_2_img['url']; ?>" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1' viewBox='0 0 586 478'%3E %3Cpath d='M299 109c-1 14-1 14-6 13-4 0-4 2 0 2l3 1v6l-2 7c-1 2-17-2-25-5-2-1-2-1-2 2 0 2 1 3 2 3 4 2 17 4 20 4 6 0 8 1 8 4 0 2-1 3-2 3h-19c-11-2-11-2-11 0 0 3 2 3 18 4l14 1v5c0 6 1 6-15 4l-11-1 16 8 7 1v15l-4 44-6 1-5 1c-1 2 2 3 7 3h4v11h-16c-5-1-7-1-12-5-6-4-11-12-11-17 0-4 1-4 5 0 6 4 17 9 17 6l-3-5-3-7c0-4-9-12-12-11l-3 1-4 18-6 20c-1 2-2 5 0 3l7 5c6 6 12 9 17 10 3 1 4 0 1-1-4-2-14-10-17-15-3-4-4-10-2-11l5 4 8 7c5 2 7 3 17 3h12l-1 4c0 4-1 5-8 7l-7 2h11c3-1 3-1 4 1 0 3 2 2 3-2l2-3v10c0 2-2 3-2 1 0-3-2-1-4 2 0 2-2 3-6 5-12 4-21 2-30-8-5-5-6-5-7-2-3 10 2 13 24 15 5 0 8 0 13-2l8-2 2-1c1-2 2 0 3 5v5h-8l-20 1-10 1h19l19 2-1 3c-1 2-57-2-69-5l-16-6 8 2c12 3 17 4 17 2l-2-2c-4 0-23-5-29-8-6-2-7-3-4 0l1 2-2-2-1-2-1-1c-2-3-2-10-1-13 2-4 2-4 6-4 3 1 3 0 2-1h-6c-4 1-5 1-7-1-1-2-2-2-3-1-2 2-2 2-4 1-4-2-11-2-13 1l-5 2c-2 1 4 1 12 1l16-1-1 3-1 5c-1 3-2 53-1 55h15l34-1a1615 1615 0 0 0 129 2c18 1 24 2 24 3l-7 11c-6 7-4 6-27 8a798 798 0 0 1-186-7c-5-3-6-4-3-5 1-1 2-5 0-5v-1l-1-4-4-6-2-4v10c0 16 1 20 4 21 4 2 3 3-1 3-9 0-14 20-8 31 4 9 3 9 38 7l34-2 97-1h95l2-3c4-4 4-5-1-7-6-2-6-3 0-3 8 0 9-1 9-8 0-5 0-6-3-7l-3-1 3-1h3v-26l-6-1-5-1 5-1 6-1-3-10-2-16-1-9c0-2-1-2-4-1-3 0-3 0-3-3 1-2 1-2 3-2l3-1-1-4-1-9-1-5-9 1c-5 0-8 0-7-1l6-2c2-1 3-1 2-2v-3c0-2-2-3-4 0-2 2-2 1-3-4l-1-7-1-3-2-5-2-4-3 5c-3 6-4 6-4 3s-3-6-6-6c-4 0-7 13-3 15 1 0 2 3 0 4-1 1-4-2-4-4l-1-2-1 3-1 2-1 2-2 2v2c1 4 1 5-4 5l-4-1c1-2 0-2-2-1-18 3-19 3 16 3h32l-1 4-2 6-28 1h-27l-1-5-1-5v4l-1 5-9 2c-8 0-11 2-5 2s7 1 7 6v4h-15v-3a699 699 0 0 1 0-104 123 123 0 0 1-17 23c1 0 6-5 11-12 3-3 3-3 2-1-2 8-17 27-24 31-2 1-2 1-2-1v-48l5-3c5-2 6-3 10-3l2-1-7-1-9-1-1-6c0-4 1-5 3-7l3-2h-3c-2 0-2 0-2-12 0-10 0-11 2-13v-1c-2 0-2-1-2-12V99l-1 10zm15 130c-6 15-13 28-15 28l-1-4c0-4 1-5 3-8 5-5 5-7 1-4s-4 3-4-1c0-3 1-4 5-8l10-9c2-3 5-5 5-4l-4 10zm3 18l-4 12-4 8 3-2c4-3 6-2 7 4 0 3 0 4-2 6-2 3-3 3-10 3l-9-1c-1-1 0-13 1-13 1 1 5-5 9-12 4-8 6-11 8-10l1 5zm95 22c0 2-9 11-15 14s-16 6-29 7a558 558 0 0 1-145-5c-2-1-2-1 0-1 29 6 46 7 85 7 35 0 54-1 68-4 10-2 20-5 23-8l1-1c-13 4-34 7-57 7h-17-1l-15 1-12-1v-5l10 1h27c19 0 41-1 52-4 8-1 15-4 21-8 3-2 4-2 4 0zm-223 64c2 3 18 6 32 6 8 0 22 2 23 3l6 1 6 1h47c2-2 7-1 11 1 5 4 8 4 10 0l2-3h24a1579 1579 0 0 1 53 1 539 539 0 0 1-79 8c-4-2-4-2-7-1-3 2-5 2-7 2h-4a1020 1020 0 0 1-115-3c3-1 2-1-2-3-1 0-2-1-2-3v-3h12l-7-1c-5 0-5 0-7-4l-2-4 2 1 4 1z'/%3E %3C/svg%3E" alt="slide-2" />
                    <?php endif; ?>
                    <div class="hero__carousel">
                        <hgroup>
                            <h1><?php echo $slide_2_title; ?></h1>
                            <h5><?php echo $slide_2_subtitle; ?></h5>
                        </hgroup>
                        <?php if (get_field('slide_2_button_1_enable')) { ?>
                        <a class="btn <?php echo $slide_2_button_1_class; ?>" id="<?php echo $slide_2_button_1_id; ?>" role="button" href="<?php echo $slide_2_button_1_url; ?>" <?php if (get_field('slide_2_button_1_fancybox')) { echo ' data-fancybox'; } ?>>
                            <i class="<?php echo $slide_2_button_1_ikon; ?>"></i> <?php echo $slide_2_button_1_tekst; ?>
                        </a>&nbsp;
                        <?php } if (get_field('slide_2_button_2_enable')) { ?>
                        <a class="btn <?php echo $slide_2_button_2_class; ?>" id="<?php echo $slide_2_button_2_id; ?>" role="button" href="<?php echo $slide_2_button_2_url; ?>" <?php if (get_field('slide_2_button_2_fancybox')) { echo ' data-fancybox'; } ?>>
                            <i class="<?php echo $slide_2_button_2_ikon; ?>"></i> <?php echo $slide_2_button_2_tekst; ?>
                        </a>
                        <?php } ?>
                    </div>
                </div>
                <?php } ?>
                <?php if ( $slide_3_enabled ) { ?>
                <div class="item slides">
                    <?php if( !empty($slide_1_img) ): ?>
                    <img class="slide-3 lazy" data-src="<?php echo $slide_3_img['url']; ?>" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1' viewBox='0 0 586 478'%3E %3Cpath d='M299 109c-1 14-1 14-6 13-4 0-4 2 0 2l3 1v6l-2 7c-1 2-17-2-25-5-2-1-2-1-2 2 0 2 1 3 2 3 4 2 17 4 20 4 6 0 8 1 8 4 0 2-1 3-2 3h-19c-11-2-11-2-11 0 0 3 2 3 18 4l14 1v5c0 6 1 6-15 4l-11-1 16 8 7 1v15l-4 44-6 1-5 1c-1 2 2 3 7 3h4v11h-16c-5-1-7-1-12-5-6-4-11-12-11-17 0-4 1-4 5 0 6 4 17 9 17 6l-3-5-3-7c0-4-9-12-12-11l-3 1-4 18-6 20c-1 2-2 5 0 3l7 5c6 6 12 9 17 10 3 1 4 0 1-1-4-2-14-10-17-15-3-4-4-10-2-11l5 4 8 7c5 2 7 3 17 3h12l-1 4c0 4-1 5-8 7l-7 2h11c3-1 3-1 4 1 0 3 2 2 3-2l2-3v10c0 2-2 3-2 1 0-3-2-1-4 2 0 2-2 3-6 5-12 4-21 2-30-8-5-5-6-5-7-2-3 10 2 13 24 15 5 0 8 0 13-2l8-2 2-1c1-2 2 0 3 5v5h-8l-20 1-10 1h19l19 2-1 3c-1 2-57-2-69-5l-16-6 8 2c12 3 17 4 17 2l-2-2c-4 0-23-5-29-8-6-2-7-3-4 0l1 2-2-2-1-2-1-1c-2-3-2-10-1-13 2-4 2-4 6-4 3 1 3 0 2-1h-6c-4 1-5 1-7-1-1-2-2-2-3-1-2 2-2 2-4 1-4-2-11-2-13 1l-5 2c-2 1 4 1 12 1l16-1-1 3-1 5c-1 3-2 53-1 55h15l34-1a1615 1615 0 0 0 129 2c18 1 24 2 24 3l-7 11c-6 7-4 6-27 8a798 798 0 0 1-186-7c-5-3-6-4-3-5 1-1 2-5 0-5v-1l-1-4-4-6-2-4v10c0 16 1 20 4 21 4 2 3 3-1 3-9 0-14 20-8 31 4 9 3 9 38 7l34-2 97-1h95l2-3c4-4 4-5-1-7-6-2-6-3 0-3 8 0 9-1 9-8 0-5 0-6-3-7l-3-1 3-1h3v-26l-6-1-5-1 5-1 6-1-3-10-2-16-1-9c0-2-1-2-4-1-3 0-3 0-3-3 1-2 1-2 3-2l3-1-1-4-1-9-1-5-9 1c-5 0-8 0-7-1l6-2c2-1 3-1 2-2v-3c0-2-2-3-4 0-2 2-2 1-3-4l-1-7-1-3-2-5-2-4-3 5c-3 6-4 6-4 3s-3-6-6-6c-4 0-7 13-3 15 1 0 2 3 0 4-1 1-4-2-4-4l-1-2-1 3-1 2-1 2-2 2v2c1 4 1 5-4 5l-4-1c1-2 0-2-2-1-18 3-19 3 16 3h32l-1 4-2 6-28 1h-27l-1-5-1-5v4l-1 5-9 2c-8 0-11 2-5 2s7 1 7 6v4h-15v-3a699 699 0 0 1 0-104 123 123 0 0 1-17 23c1 0 6-5 11-12 3-3 3-3 2-1-2 8-17 27-24 31-2 1-2 1-2-1v-48l5-3c5-2 6-3 10-3l2-1-7-1-9-1-1-6c0-4 1-5 3-7l3-2h-3c-2 0-2 0-2-12 0-10 0-11 2-13v-1c-2 0-2-1-2-12V99l-1 10zm15 130c-6 15-13 28-15 28l-1-4c0-4 1-5 3-8 5-5 5-7 1-4s-4 3-4-1c0-3 1-4 5-8l10-9c2-3 5-5 5-4l-4 10zm3 18l-4 12-4 8 3-2c4-3 6-2 7 4 0 3 0 4-2 6-2 3-3 3-10 3l-9-1c-1-1 0-13 1-13 1 1 5-5 9-12 4-8 6-11 8-10l1 5zm95 22c0 2-9 11-15 14s-16 6-29 7a558 558 0 0 1-145-5c-2-1-2-1 0-1 29 6 46 7 85 7 35 0 54-1 68-4 10-2 20-5 23-8l1-1c-13 4-34 7-57 7h-17-1l-15 1-12-1v-5l10 1h27c19 0 41-1 52-4 8-1 15-4 21-8 3-2 4-2 4 0zm-223 64c2 3 18 6 32 6 8 0 22 2 23 3l6 1 6 1h47c2-2 7-1 11 1 5 4 8 4 10 0l2-3h24a1579 1579 0 0 1 53 1 539 539 0 0 1-79 8c-4-2-4-2-7-1-3 2-5 2-7 2h-4a1020 1020 0 0 1-115-3c3-1 2-1-2-3-1 0-2-1-2-3v-3h12l-7-1c-5 0-5 0-7-4l-2-4 2 1 4 1z'/%3E %3C/svg%3E" alt="slide-3" />
                    <?php endif; ?>
                    <div class="hero__carousel">
                        <hgroup>
                            <h1><?php echo $slide_3_title; ?></h1>
                            <h5><?php echo $slide_3_subtitle; ?></h5>
                        </hgroup>
                        <?php if (get_field('slide_3_button_1_enable')) { ?>
                        <a class="btn <?php echo $slide_3_button_1_class; ?>" id="<?php echo $slide_3_button_1_id; ?>" role="button" href="<?php echo $slide_3_button_1_url; ?>" <?php if (get_field('slide_3_button_1_fancybox')) { echo ' data-fancybox'; } ?>>
                            <i class="<?php echo $slide_3_button_1_ikon; ?>"></i> <?php echo $slide_3_button_1_tekst; ?>
                        </a>&nbsp;
                        <?php } if (get_field('slide_3_button_2_enable')) { ?>
                        <a class="btn <?php echo $slide_3_button_2_class; ?>" id="<?php echo $slide_3_button_2_id; ?>" role="button" href="<?php echo $slide_3_button_2_url; ?>" <?php if (get_field('slide_3_button_2_fancybox')) { echo ' data-fancybox'; } ?>>
                            <i class="<?php echo $slide_3_button_2_ikon; ?>"></i> <?php echo $slide_3_button_2_tekst; ?>
                        </a>
                        <?php } ?>
                    </div>
                </div>
                <?php } ?>
                <?php if ( $slide_4_enabled ) { ?>
                <div class="item slides">
                    <?php if( !empty($slide_1_img) ): ?>
                    <img class="slide-4 lazy" data-src="<?php echo $slide_4_img['url']; ?>" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1' viewBox='0 0 586 478'%3E %3Cpath d='M299 109c-1 14-1 14-6 13-4 0-4 2 0 2l3 1v6l-2 7c-1 2-17-2-25-5-2-1-2-1-2 2 0 2 1 3 2 3 4 2 17 4 20 4 6 0 8 1 8 4 0 2-1 3-2 3h-19c-11-2-11-2-11 0 0 3 2 3 18 4l14 1v5c0 6 1 6-15 4l-11-1 16 8 7 1v15l-4 44-6 1-5 1c-1 2 2 3 7 3h4v11h-16c-5-1-7-1-12-5-6-4-11-12-11-17 0-4 1-4 5 0 6 4 17 9 17 6l-3-5-3-7c0-4-9-12-12-11l-3 1-4 18-6 20c-1 2-2 5 0 3l7 5c6 6 12 9 17 10 3 1 4 0 1-1-4-2-14-10-17-15-3-4-4-10-2-11l5 4 8 7c5 2 7 3 17 3h12l-1 4c0 4-1 5-8 7l-7 2h11c3-1 3-1 4 1 0 3 2 2 3-2l2-3v10c0 2-2 3-2 1 0-3-2-1-4 2 0 2-2 3-6 5-12 4-21 2-30-8-5-5-6-5-7-2-3 10 2 13 24 15 5 0 8 0 13-2l8-2 2-1c1-2 2 0 3 5v5h-8l-20 1-10 1h19l19 2-1 3c-1 2-57-2-69-5l-16-6 8 2c12 3 17 4 17 2l-2-2c-4 0-23-5-29-8-6-2-7-3-4 0l1 2-2-2-1-2-1-1c-2-3-2-10-1-13 2-4 2-4 6-4 3 1 3 0 2-1h-6c-4 1-5 1-7-1-1-2-2-2-3-1-2 2-2 2-4 1-4-2-11-2-13 1l-5 2c-2 1 4 1 12 1l16-1-1 3-1 5c-1 3-2 53-1 55h15l34-1a1615 1615 0 0 0 129 2c18 1 24 2 24 3l-7 11c-6 7-4 6-27 8a798 798 0 0 1-186-7c-5-3-6-4-3-5 1-1 2-5 0-5v-1l-1-4-4-6-2-4v10c0 16 1 20 4 21 4 2 3 3-1 3-9 0-14 20-8 31 4 9 3 9 38 7l34-2 97-1h95l2-3c4-4 4-5-1-7-6-2-6-3 0-3 8 0 9-1 9-8 0-5 0-6-3-7l-3-1 3-1h3v-26l-6-1-5-1 5-1 6-1-3-10-2-16-1-9c0-2-1-2-4-1-3 0-3 0-3-3 1-2 1-2 3-2l3-1-1-4-1-9-1-5-9 1c-5 0-8 0-7-1l6-2c2-1 3-1 2-2v-3c0-2-2-3-4 0-2 2-2 1-3-4l-1-7-1-3-2-5-2-4-3 5c-3 6-4 6-4 3s-3-6-6-6c-4 0-7 13-3 15 1 0 2 3 0 4-1 1-4-2-4-4l-1-2-1 3-1 2-1 2-2 2v2c1 4 1 5-4 5l-4-1c1-2 0-2-2-1-18 3-19 3 16 3h32l-1 4-2 6-28 1h-27l-1-5-1-5v4l-1 5-9 2c-8 0-11 2-5 2s7 1 7 6v4h-15v-3a699 699 0 0 1 0-104 123 123 0 0 1-17 23c1 0 6-5 11-12 3-3 3-3 2-1-2 8-17 27-24 31-2 1-2 1-2-1v-48l5-3c5-2 6-3 10-3l2-1-7-1-9-1-1-6c0-4 1-5 3-7l3-2h-3c-2 0-2 0-2-12 0-10 0-11 2-13v-1c-2 0-2-1-2-12V99l-1 10zm15 130c-6 15-13 28-15 28l-1-4c0-4 1-5 3-8 5-5 5-7 1-4s-4 3-4-1c0-3 1-4 5-8l10-9c2-3 5-5 5-4l-4 10zm3 18l-4 12-4 8 3-2c4-3 6-2 7 4 0 3 0 4-2 6-2 3-3 3-10 3l-9-1c-1-1 0-13 1-13 1 1 5-5 9-12 4-8 6-11 8-10l1 5zm95 22c0 2-9 11-15 14s-16 6-29 7a558 558 0 0 1-145-5c-2-1-2-1 0-1 29 6 46 7 85 7 35 0 54-1 68-4 10-2 20-5 23-8l1-1c-13 4-34 7-57 7h-17-1l-15 1-12-1v-5l10 1h27c19 0 41-1 52-4 8-1 15-4 21-8 3-2 4-2 4 0zm-223 64c2 3 18 6 32 6 8 0 22 2 23 3l6 1 6 1h47c2-2 7-1 11 1 5 4 8 4 10 0l2-3h24a1579 1579 0 0 1 53 1 539 539 0 0 1-79 8c-4-2-4-2-7-1-3 2-5 2-7 2h-4a1020 1020 0 0 1-115-3c3-1 2-1-2-3-1 0-2-1-2-3v-3h12l-7-1c-5 0-5 0-7-4l-2-4 2 1 4 1z'/%3E %3C/svg%3E" alt="slide-4" />
                    <?php endif; ?>
                    <div class="hero__carousel">
                        <hgroup>
                            <h1><?php echo $slide_4_title; ?></h1>
                            <h5><?php echo $slide_4_subtitle; ?></h5>
                        </hgroup>
                        <?php if (get_field('slide_4_button_1_enable')) { ?>
                        <a class="btn <?php echo $slide_4_button_1_class; ?>" id="<?php echo $slide_4_button_1_id; ?>" role="button" href="<?php echo $slide_4_button_1_url; ?>" <?php if (get_field('slide_4_button_1_fancybox')) { echo ' data-fancybox'; } ?>>
                            <i class="<?php echo $slide_4_button_1_ikon; ?>"></i> <?php echo $slide_4_button_1_tekst; ?>
                        </a>&nbsp;
                        <?php } if (get_field('slide_4_button_2_enable')) { ?>
                        <a class="btn <?php echo $slide_4_button_2_class; ?>" id="<?php echo $slide_4_button_2_id; ?>" role="button" href="<?php echo $slide_4_button_2_url; ?>" <?php if (get_field('slide_4_button_2_fancybox')) { echo ' data-fancybox'; } ?>>
                            <i class="<?php echo $slide_4_button_2_ikon; ?>"></i> <?php echo $slide_4_button_2_tekst; ?>
                        </a>
                        <?php } ?>
                    </div>
                </div>
                <?php } ?>
                
            </div>
        </div>
    </section>
    <!-- END: HERO MODULE -->

<?php } elseif ( is_front_page() && $is_hero_module && is_user_logged_in() ) { ?>
    <!-- BEGIN: HERO MODULE -->
    <div id="home-featured" class="video-container jquery-background-video-wrapper">
        <video autoplay loop muted webkit-playsinline playsinline plays-inline data-bgvideo class="my-background-video jquery-background-video" poster="<?php echo $hero_img; ?>">
            <!-- <source src="https://static.stott.no/video/stott_brygge_V4-2_720x406_1500kbps_baseline3.mp4" type='video/mp4; codecs="avc1.58A01E"'> -->
            <!--<source src="https://static.stott.no/video/stott_brygge_V4-2_720p30_3000kbps_main_3.1.mp4" type='video/mp4; codecs="avc1.42001E"'> -->
            <source src="https://static.stott.no/video/stott_brygge_v4_720p24_1250kbps_web_i5gs.mp4" type='video/mp4'>
            Your browser does not support the video tag
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
        <div class="action-button text-center">
            <a id="stottfilm2" data-fancybox class="btn btn-info" href="https://www.youtube.com/watch?v=CkxmJ592_TY"><span class="fa fa-play"></span> <?php esc_html_e('Se video med lyd her', 'gotomeloy'); ?></a>
        </div>
    </div>
    <!-- END: HERO MODULE -->

<?php } else { ?>

    <?php if ( !is_home() && $is_hero_module) { ?>
        <!-- BEGIN: HERO MODULE 1920x752 -->
        <section id="home-featured" class="sections hero <?php echo $hero_height. ' ' .$hero_img_class; ?>">
            <div class="hero-image iBG noparalax" data-img="<?php echo $hero_img; ?>"></div>
            <div class="hero-content">
                <div class="hero-header text-center">
                    <div class="hero-header-title"><?php echo $hero_title; ?></div>
                    <div class="hero-header-subtitle"><?php echo $hero_subtitle; ?></div>
                    <div><a href="#site-body" class="scroll-down"><i class="scroll-down-icon fa fa-4x fa-inverse fa-chevron-circle-down" aria-hidden="true"></i></a></div>
                </div>
            </div>
        </section>
        <!-- END: HERO MODULE -->
    <?php } elseif ( !is_home() ) { ?>

            <section class="page-header">
                <h2 class="title"><?php echo $hero_title; ?></h2>
                <div class="date"><?php echo $hero_subtitle; ?></div>
            </section>

    <?php } ?>

<?php } ?>
