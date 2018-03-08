<?php get_header( 'blog' ); ?>

<?php

	// Pagination Variables
	$have_olders_posts = get_adjacent_post(false,'',true) ? '' : 'no-more-posts';
	$have_newer_posts = get_adjacent_post(false,'',false) ? '' : 'no-more-posts';
	$post_id = get_the_ID();
?>

<!-- BEGIN: SITE BODY -->
<section id="site-body" class="sections project padding-size-l">

	<div class="container">
		<div class="innhold-single">
			<?php while ( have_posts() ) : the_post(); ?>
				<?php if ($post_id == 868 || $post_id == 1132 || $post_id == 18085 || $post_id == 19946) { ?>
					<h4><?php echo(esc_html__( 'Liste over kommende aktiviteter:', 'gotomeloy' )); ?></h4>
					<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
					<?php 
	                    $currentdate = date("Y-m-d",mktime(0,0,0,date("m"),date("d")-1,date("Y")));
	                    
	                    $args = array (
	                        'meta_query'=> array(
	                            array(
	                                'key' => 'event_starts_sort_field',
	                                'compare' => '>',
	                                'value' => $currentdate,
	                                'type' => 'DATE',
	                            )),

	                        'post_type' => 'facebook_events',
	                        'posts_per_page' => -1,
	                        
	                        'meta_key' => 'event_starts_sort_field',
	                        'orderby' => 'meta_value',
	                        'order' => 'ASC'
	                    );
	                
	                    $fbe_query = new WP_Query( $args );
	                    
	                    if( $fbe_query->have_posts() ): 
	                    while ( $fbe_query->have_posts() ) : $fbe_query->the_post();
	                		$event_id = get_the_ID();
	                        $event_title = get_the_title();
	                        $event_image = get_fbe_image('cover');
	                        $event_url =  get_fbe_field('fb_event_uri');
	                        $event_site = ucfirst(str_replace(array('https://facebook.com','/'), array('',''), get_fbe_field('facebook') ));
	                        $event_location = get_fbe_field('location');
	                        $event_starts_month = get_fbe_date('event_starts','M');
	                        $event_starts_day = get_fbe_date('event_starts','j');
	                ?>
	                	<div class="panel panel-default">
	                    <div class="fbecol fbecolhover" role="tab" id="<?php echo('event-' . $post_id . '-head'); ?>">
	                    	<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="<?php echo('#event-' . $event_id .'-body'); ?>" aria-expanded="false" aria-controls="<?php echo('event-' . $event_id .'-body'); ?>">
	                        <div class="fbe_list_image" style="background-image:url(<?php echo $event_image; ?>)" />
	                            <div class="fbe_list_bar">
	                                <div class="fbe_list_date">
	                                    <div class="fbe_list_month"><?php echo $event_starts_month; ?></div>
	                                    <div class="fbe_list_day"><?php echo $event_starts_day; ?></div>
	                                </div>
	                                <div class="fbe_col_title"><h2><?php echo $event_title; ?></h2></div>
	                                <div class="fbe_col_location"><?php echo $event_site; ?></div>
	                            </div>
	                        </div>
	                    </a></div>
	                        <div id="<?php echo('event-' . $event_id .'-body'); ?>" class="panel-body panel-collapse collapse" role="tabpanel" aria-labelledby="<?php echo('event-' . $event_id .'-head'); ?>">
            					<div class="panel-body well">
            						<a class="btn btn-primary" href="<?php echo $event_url; ?>" role="button"><?php esc_html_e('Meld deg på nå!', 'gotomeloy'); ?></a><br/>
            						<?php the_content(); ?><br />
            						<a class="btn btn-primary" href="<?php echo $event_url; ?>" role="button"><?php esc_html_e('Meld deg på nå!', 'gotomeloy'); ?></a>
				            	</div>
        					</div>
	                    </div>
	                <?php
	                    endwhile; endif; wp_reset_query();
	                ?>
	                <!-- END panel-group -->
					</div>
				<?php } else { ?>
					<?php echo(types_render_field( "tjeneste-lang", array( 'raw' => false) )); ?>
				<?php } ?>
			<?php endwhile; ?>
		</div>
	</div>

</section>
<!-- END: SITE BODY -->

<!-- BEGIN: PAGINATION -->
<section class="sections paginations padding-size-m">
	<div class="container">
		<div class="innhold-single">
			<!-- PAGINATE -->
			<ul class="project-pagination nostyle clearfix">
				<li class="prev <?php echo $have_olders_posts; ?>"><a href="<?php echo esc_url( get_permalink(get_adjacent_post(false,'',true)) ); ?> "><i class="fa fa-angle-left"></i></a></li>
				<li class="back"><a href="<?php echo esc_url( get_permalink(get_post_meta(get_the_ID(), 'portfolio_page', true)) ); ?>"><i class="fa fa-th-large"></i></a></li>
				<li class="next <?php echo $have_newer_posts; ?>"><a href="<?php echo esc_url( get_permalink(get_adjacent_post(false,'',false)) ); ?> "><i class="fa fa-angle-right"></i></a></li>
			</ul>
			<!-- /paginate -->

			<!-- SHARE -->
			<?php if ( function_exists( 'add_social_share_icons' ) ) { echo add_social_share_icons(); } ?>
		</div>
	</div>
</section>
<!-- END: PAGINATION -->

<?php get_footer(); ?>