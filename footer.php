            <section class="sections project padding-size-m">
                <ul class="affiliates">
                <a href="https://www.reisegarantifondet.no/" rel="nofollow" target="_blank"><li class="affiliates_li"><div class="affiliates_img affiliates_reisegarantifondet"></div><span class="affiliates_txt">Reisegarantifondet</span ></li></a>
                <a href="https://www.nhoreiseliv.no/" rel="nofollow" target="_blank"><li class="affiliates_li"><div class="affiliates_img affiliates_nho-reiseliv"></div><span class="affiliates_txt">NHO Reiseliv</span ></li></a>
                <a href="http://www.visitbodo.no/" rel="nofollow" target="_blank"><li class="affiliates_li"><div class="affiliates_img affiliates_visit-bodo"></div><span class="affiliates_txt">Visit Bodø</span ></li></a>
                <a href="https://visithelgeland.com/" rel="nofollow" target="_blank"><li class="affiliates_li"><div class="affiliates_img affiliates_visit-helgeland"></div><span class="affiliates_txt">Visit Helgeland</span ></li></a>
                </ul>

                
                
                <div class="copyright text-center">
                    <?php echo get_theme_mod('gotomeloy_copyright_text', esc_html__('Copyright © GO TO MELØY 2016', 'gotomeloy') ); echo date("Y"); ?> | <?php echo(esc_html__( 'Utviklet av', 'gotomeloy' )); ?> <a href="https://www.github.com/bruners/" target="_blank">Lasse Brun</a> | <i class="fa fa-user-secret fa-w-14"></i> <a href='<?php echo __("https://www.stott.no/personvernerklaering/"); ?>' target='__blank'><?php echo __("Personvernerklæring", "gotomeloy"); ?></a>
                </div>
            </section>

            <!-- BEGIN: MENY MODALS -->
            <?php
                $args = array('post_type' => 'meny');
                $query = new WP_Query($args);
                while($query -> have_posts()) : $query -> the_post();

                $post_id = get_the_ID();
            ?>

                <?php if ($post_id == 49900 || $post_id == 49907) { ?>
                    <!-- Modal -->
                    <div id="meny-modal-<?php echo(get_the_ID()); ?>" role="dialog" aria-labeledby="<?php the_title(); ?>" class="modal fade" tabindex="-1">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button class="close" type="button" aria-label="Close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                                    <h5 class="modal-title"><?php the_title(); ?></h5>
                                </div>
                                <div class="modal-body">
                                    <?php the_content(); ?>
                                    <br />
                                    <?php if ( function_exists( 'add_social_share_icons' ) ) { echo add_social_share_icons(); } ?>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-default" type="button" aria-label="Close" data-dismiss="modal">Lukk</button>
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal-dialog -->
                    </div><!-- /.modal -->

                <?php } ?>
            <?php endwhile; wp_reset_postdata(); ?>
            
            <!-- BEGIN: SITE FOOTER -->
            <?php

            if ( function_exists ( 'add_social_share_icons' ) ) {
                $options = get_option( 'gotomeloy_theme_options' );

                $social_share_facebook_profile = $options['social-share-facebook-profile'];
                $social_share_youtube_profile = $options['social-share-youtube-profile'];
                $social_share_instagram_profile = $options['social-share-instagram-profile'];
                $social_share_twitter_profile = $options['social-share-twitter-profile'];
                $social_share_tripadvisor_profile = $options['social-share-tripadvisor-profile'];
            }
            ?>
            <footer id="site-footer">
                <ul class="social-media">
                    <?php if(!empty($social_share_facebook_profile)) echo '<li><a href="' . $social_share_facebook_profile .  '" target="blank"><i class="fab fa-facebook-square"></i></a></li>'; ?>
                    <?php if(!empty($social_share_youtube_profile)) echo '<li><a href="' . $social_share_youtube_profile .   '" target="blank"><i class="fab fa-youtube"></i></a></li>'; ?>
                    <?php if(!empty($social_share_instagram_profile)) echo '<li><a href="' . $social_share_instagram_profile . '" target="blank"><i class="fab fa-instagram"></i></a></li>'; ?>
                    <?php if(!empty($social_share_twitter_profile)) echo '<li><a href="' . $social_share_twitter_profile .   '" target="blank"><i class="fab fa-twitter"></i></a></li>'; ?>
                    <?php if(!empty($social_share_tripadvisor_profile)) echo '<li><a href="' . $social_share_tripadvisor_profile . '" target="blank"><i class="fab fa-tripadvisor"></i></a></li>'; ?>
                </ul>
                <span class="credits"><?php echo esc_html( get_bloginfo('name') ); ?> © 2016-2019</span>
                <ul class="language-selector">
                    <!-- Inserts a <li> list with flags -->
                    <?php language_selector_flags(); ?>
                </ul>
                <!-- BACK2TOP TRIGGER -->
                <div class="back2top">
                    <i class="fa fa-angle-up"></i>
                </div>
            </footer>
            <!-- END: SITE FOOTER -->

        </main>
        <!-- END: MAIN STRUCTURE -->

        <!-- WP Footer
        ================================================== -->
        <?php wp_footer(); ?>
        <script>
            function init() {
            var vidDefer = document.getElementsByTagName('iframe');
            for (var i=0; i<vidDefer.length; i++) {
            if(vidDefer[i].getAttribute('data-src')) {
            vidDefer[i].setAttribute('src',vidDefer[i].getAttribute('data-src'));
            } } }
            window.onload = init;
        </script>
        <!-- Load Facebook SDK for JavaScript -->
        <div id="fb-root"></div>
        <script>
          window.fbAsyncInit = function() {
            FB.init({
              xfbml            : true,
              version          : 'v3.3'
            });
          };

          (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = 'https://connect.facebook.net/nb_NO/sdk/xfbml.customerchat.js';
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));</script>

        <!-- Your customer chat code -->
        <div class="fb-customerchat"
          attribution=setup_tool
          page_id="314547331970935"
          theme_color="#0084ff">
        </div>
    </body>

</html>
