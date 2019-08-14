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
<?php if ( !is_front_page() && $is_hero_module ) { ?>
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

<?php } elseif ( is_front_page() && $is_hero_module && $is_hero_carousel ) { ?>
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
                    <div class="slide-1 cBG" data-img="linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(<?php echo $slide_1_img['url']; ?>)"></div>
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
                    <div class="slide-2 cBG" data-img="linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(<?php echo $slide_2_img['url']; ?>)"></div>
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
                    <div class="slide-3 cBG" data-img="linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(<?php echo $slide_3_img['url']; ?>)"></div>
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
                    <div class="slide-4 cBG" data-img="linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(<?php echo $slide_4_img['url']; ?>)"></div>
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

<?php } elseif ( is_front_page() && $is_hero_module ) { ?>

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
