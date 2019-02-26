            <!-- BEGIN: MENY MODALS -->
            
            <?php
                $args = array('post_type' => 'meny-modal');
                $query = new WP_Query($args);
                while($query -> have_posts()) : $query -> the_post();

                $post_id = get_the_ID();
            ?>

                <?php if ($post_id == 18140 || $post_id == 22519) { ?>
                    <!-- Modal -->
                    <div id="meny-modal-<?php echo(get_the_ID()); ?>" role="dialog" aria-labeledby="<?php the_title(); ?>" class="modal fade" tabindex="-1">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button class="close" type="button" aria-label="Close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                                    <h5 class="modal-title"><?php the_title(); ?></h5>
                                </div>
                                <div class="modal-body">
                                    <?php if ( function_exists( 'types_render_field' ) ) { echo(types_render_field( "meny-modal-body", array( 'raw' => false) )); } ?>
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
    </body>

</html>
