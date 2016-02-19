<?php

#-----------------------------------------------------------------#
# Begin processing our comments
#-----------------------------------------------------------------#


    /* Password protected? ----------------------------------------------------------*/
    if ( post_password_required() ) 
		return;
?>

<?php 

#-----------------------------------------------------------------#
# Display the Comments & Pings
#-----------------------------------------------------------------#
?>

    <!-- BEGIN #comments -->
    <div id="comments" class="single-blog-comments">

    <?php if ( have_comments() ) : ?>

	   <?php

        /* Display Comments ---------------------------------------------------------*/    
        if ( ! empty($comments_by_type['comment']) ) : // if there are normal comments ?>
	
	        <h5><strong><?php comments_number(esc_html__('0 Comments', 'gotomeloy'), esc_html__('1 Comment', 'gotomeloy'), esc_html__('% Comments', 'gotomeloy')); ?></strong></h5>
	
        	<ol class="comments-list">
                <?php wp_list_comments( 'type=comment&callback=lamark_comments' ); ?>
            </ol>

        <?php endif; // end normal comments 
        
        /* Display Pings -------------------------------------------------------------*/
        if ( ! empty($comments_by_type['pings']) ) : // if there are pings ?>
		
    		<h3 class="pings-title"><?php esc_html_e('Trackbacks', 'gotomeloy') ?></h3>
		
    		<ol class="pings-list">
                <?php wp_list_comments( 'type=pings&callback=lamark_list_pings' ); ?>
            </ol>

        <?php endif; // end pings 
		
		/* Display Comment Navigation -----------------------------------------------*/
		if ( get_comment_pages_count() > 1 && get_option( 'page_comments' ) ) : ?>
    		<div class="comment-navigation">
    			<div class="nav-previous"><?php previous_comments_link( sprintf( '&larr; %s', esc_html__('Older Comments', 'gotomeloy') ) ); ?></div>
                <div class="nav-next"><?php next_comments_link( sprintf( '%s &rarr; ', esc_html__('Newer Comments', 'gotomeloy') ) ); ?></div>
    		</div>
		<?php endif; // end comment pagination check
	

#-----------------------------------------------------------------#
# Deal with no comments or closed comments
#-----------------------------------------------------------------#

	elseif ( ! comments_open() && ! is_page() && '0' != get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) : ?>
		
		<p class="nocomments"><?php esc_html_e('Comments are closed.', 'gotomeloy') ?></p>
		
    <?php endif; // end if comments existence check ?>

<?php
#-----------------------------------------------------------------#
# Comment Form
#-----------------------------------------------------------------#

	if ( comments_open() ) : 
	
	    $fields = array(
            'comment_notes_before' => '',
            'label_submit' => esc_html__('Submit', 'gotomeloy')
	    );
		    	
	    comment_form($fields); 
?>

    
    <!-- END #comments -->
    </div>        

	<?php endif; // end if comments open check ?>
