<!-- BEGIN: SITE FOOTER -->
            <?php
                $facebook_url = types_render_field("gotomeloy-facebook", array('raw' => true));
                $youtube_url = types_render_field("gotomeloy-youtube", array('raw' => true));
                $instagram_url = types_render_field("gotomeloy-instagram", array('raw' => true));
                $twitter_url = types_render_field("gotomeloy-twitter", array('raw' => true));
                $tripadvisor_url = types_render_field("gotomeloy-tripadvisor", array('raw' => true));

                $social_args = array(
                    'post_type' => 'page',
                    'post_per_page' => -1
                );
                $social_query = new WP_Query($social_args);
            ?>
            <footer id="site-footer">
                <ul class="social-media">
                    <?php if(!empty($facebook_url)) echo '<li><a href="' . $facebook_url .  '" target="blank"><i class="fa fa-facebook-square"></i></a></li>'; ?>
                    <?php if(!empty($youtube_url)) echo '<li><a href="' . $youtube_url .   '" target="blank"><i class="fa fa-youtube-play"></i></a></li>'; ?>
                    <?php if(!empty($instagram_url)) echo '<li><a href="' . $instagram_url . '" target="blank"><i class="fa fa-instagram"></i></a></li>'; ?>
                    <?php if(!empty($twitter_url)) echo '<li><a href="' . $twitter_url .   '" target="blank"><i class="fa fa-twitter-square"></i></a></li>'; ?>
                    <?php if(!empty($tripadvisor_url)) echo '<li><a href="' . $tripadvisor_url . '" target="blank"><i class="fa fa-tripadvisor"></i></a></li>'; ?>
                </ul>
                <span class="credits">go to meløy © 2016</span>
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

    </body>

</html>
