            <!-- BEGIN: MENY MODALS -->
            <div class="meny-modals">
            <?php
                $args = array('post_type' => 'meny-modal');
                $query = new WP_Query($args);
                while($query -> have_posts()) : $query -> the_post();
            ?>
                <!-- Modal -->
                <div id="meny-modal-<?php echo(get_the_ID()); ?>" role="dialog" aria-labeledby="<?php the_title(); ?>" class="modal fade" tabindex="-1">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button class="close" type="button" aria-label="Close" data-dismiss="modal"><span aria-hidden="true">&times;</span></button>
                                <h5 class="modal-title"><?php the_title(); ?></h5>
                            </div>
                            <div class="modal-body">
                                <?php echo(types_render_field( "meny-modal-body", array( 'raw' => false) )); ?>
                                <br />
                                <?php if ( function_exists( 'sharing_display' ) ) { echo sharing_display(); } ?>
                            </div>
                            <div class="modal-footer">
                                <button class="btn btn-default" type="button" aria-label="Close" data-dismiss="modal">Lukk</button>
                            </div>
                        </div><!-- /.modal-content -->
                    </div><!-- /.modal-dialog -->
                </div><!-- /.modal -->
                <?php endwhile; wp_reset_postdata(); ?>
            </div> <!-- /.meny-modals -->
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
                    <?php if(!empty($facebook_url)) echo '<li><a href="' . $facebook_url .  '" target="blank"><i class="fab fa-facebook-square"></i></a></li>'; ?>
                    <?php if(!empty($youtube_url)) echo '<li><a href="' . $youtube_url .   '" target="blank"><i class="fab fa-youtube"></i></a></li>'; ?>
                    <?php if(!empty($instagram_url)) echo '<li><a href="' . $instagram_url . '" target="blank"><i class="fab fa-instagram"></i></a></li>'; ?>
                    <?php if(!empty($twitter_url)) echo '<li><a href="' . $twitter_url .   '" target="blank"><i class="fab fa-twitter-square"></i></a></li>'; ?>
                    <?php if(!empty($tripadvisor_url)) echo '<li><a href="' . $tripadvisor_url . '" target="blank"><i class="fab fa-tripadvisor"></i></a></li>'; ?>
                </ul>
                <span class="credits"><?php echo esc_html( get_bloginfo('name') ); ?> © 2016-2018</span>
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
