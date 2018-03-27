<?php
/**
 * Template Name: Facebook Events
 * Description: Facebook Events Template
 */
 ?>
<?php get_header(); ?>


<style>
#load_more_fbe,.fbe_feat_event_link{text-align:center;border-radius:3px}#fbe_header,.fbe_col_title,.fbecol,.fbegrid,.slick-list{overflow:hidden}.fbegrid:after,.group:after,.slick-track:after{clear:both}.slick-loading .slick-slide,.slick-loading .slick-track{visibility:hidden}.fbe_list_image{background-size:cover;background-position:top left;height:250px;width:100%}#fbe_tags{margin:20px 0}#fbe_tags a{padding:2px 20px;margin:2px;border:1px solid #0075A2;color:#0075A2}#fbe_tags a:hover{background:#0075A2;border:1px solid #fff;color:#fff}#facebook_events_wrap{margin:0}#fbe_header{min-height:400px;max-height:450px;background:#000;width:100%;left:0;position:relative}.fbe_feat_col{position:absolute;z-index:10;top:50px;left:0;right:0;margin:0 auto}#fbe_map_canvas{height:100%;max-height:30vh!important;min-height:320px!important;margin:20px 0;padding:0;border:3px solid #E5E1D7}.fbe_feat_event_link{display:block;width:200px;margin:20px auto;color:#fff;padding:10px 20px;text-transform:uppercase;font-weight:700 letter-spacing:1px;font-size:16px}.fbegrid:after,.group:after,.group:before{content:"";display:table}#fbe_header .fbecol{height:300px;margin:0 60px}#fbe_header .fbe_list_bar{top:160px}.fbe_featured_image{width:150vw;height:130vh;margin:-20px auto 0;background-size:cover;-webkit-filter:blur(20px);-moz-filter:blur(20px);-o-filter:blur(20px);-ms-filter:blur(20px);filter:blur(20px);opacity:.6}.fbecol{margin:10px 0;cursor:pointer;height:230px;position:relative;border-radius:3px}.fbecolhover .fbe_list_bar{-webkit-animation:fbehover .25s ease-in-out forwards;-moz-animation:fbehover .25s ease-in-out forwards;-o-animation:fbehover .25s ease-in-out forwards;animation:fbehover .25s ease-in-out forwards}@-webkit-keyframes fbehover{100%{background-color:#222;color:#fff}}@-moz-keyframes fbehover{100%{background-color:#222;color:#fff}}@-o-keyframes fbehover{100%{background-color:#222;color:#fff}}@keyframes fbehover{100%{background-color:#222;color:#fff}}.fbecolhoverOut .fbe_list_bar{-webkit-animation:fbehoverOut .25s forwards;-moz-animation:fbehoverOut .25s forwards;-o-animation:fbehoverOut .25s forwards;animation:fbehoverOut .25s forwards}@-webkit-keyframes fbehoverOut{0%{background-color:#222}100%{background-color:rgba(255,255,255,.9)}}@-moz-keyframes fbehoverOut{0%{background-color:#222}100%{background-color:rgba(255,255,255,.9)}}@-o-keyframes fbehoverOut{0%{background-color:#222}100%{background-color:rgba(255,255,255,.9)}}@keyframes fbehoverOut{0%{background-color:#222}100%{background-color:rgba(255,255,255,.9)}}.group{zoom:1}.fbe-sidebar-post .fbe_list_bar{position:static;cursor:pointer}.fbe_list_bar{background-color:rgba(255,255,255,.9);left:0;padding:20px 10px 10px;height:90px;position:relative;top:140px;width:100%}.fbe_col_title{height:30px}.fbe_col_title h2{font-size:18px;margin:0;padding:0}.fbe_list_date{text-align:center;position:relative;left:-10px;top:-20px;float:left;margin-right:10px;width:90px;color:#fff;background:#444;height:90px}.fbe_list_month{margin:20px 0 0;font-size:18px;height:25px;width:100%;text-transform:uppercase;letter-spacing:2px}.fbe_list_day{font-size:23px;width:100%}.fbe_col_location{height:30px;overflow:hidden;font-size:16px;margin:0;padding:0}.fbe_slider_bar,.wpfbe_slider .fbe_list_bar{padding:20px 10px 10px;height:90px;width:100%;position:relative}.fbe_slider_bar{background-color:left:0px}.wpfbe_slider .fbe_list_bar{background-color:rgba(255,255,255,.9);left:0;top:160px}.featured_fbe_col_location h4{color:#fff;font-size:20px;margin:0 30px 20px}.fbe_feat_event_desc,.fbe_page_title{margin:0 30px;color:#fff}.featured.fbe_list_bar{background:0 0!important}.fbe_feat_event_desc{font-size:18px}#load_more_fbe{padding:20px 40px;-o-transition:.35s;-ms-transition:.35s;-moz-transition:.35s;-webkit-transition:.35s;cursor:pointer;background-color:#222;color:#fff;margin:10px auto 30px;letter-spacing:1px;width:280px}.fbecol-1-1,.fbegrid{width:100%}#fbe_single_date{font-size:20px;margin:0 0 10px}h1.fbe_single_title{margin:20px 0 0}#fbe_sidebar{margin:0 15px}#fbe_sidebar ul{list-style:none;margin:0 0 20px;padding:0}#fbe_sidebar ul li{list-style:none;margin:0;padding:10px}#fbe_sidebar h2{margin:0}*,:after,:before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}[class*=fbecol-]{float:left;padding-right:20px}.fbegrid{max-width:1600px;min-width:755px;margin:0 auto}.fbegrid-pad{padding-top:20px;padding-left:20px;padding-right:0}.fbecol-2-3,.fbecol-8-12{width:66.66%}.fbecol-1-2,.fbecol-6-12{width:50%}.fbecol-1-3,.fbecol-4-12{width:33.33%}.fbecol-1-4,.fbecol-3-12{width:25%}.fbecol-1-5{width:20%}.fbecol-1-6,.fbecol-2-12{width:16.667%}.fbecol-1-7{width:14.28%}.fbecol-1-8{width:12.5%}.fbecol-1-9{width:11.1%}.fbecol-1-10{width:10%}.fbecol-1-11{width:9.09%}.fbecol-1-12{width:8.33%}.fbecol-11-12{width:91.66%}.fbecol-10-12{width:83.333%}.fbecol-9-12{width:75%}.fbecol-5-12{width:41.66%}.fbecol-7-12{width:58.33%}.fbe-full-width{width:100%;height:auto!important}@media (max-width:768px){.fbe-hide-on-mobile{display:none!important;width:0;height:0}}@media (max-width:980px){.fbecol-1-3,.fbecol-4-12{width:50%}}@media handheld,only screen and (max-width:767px){.fbegrid{width:100%;min-width:0;margin-left:0;margin-right:0;padding-left:20px;padding-right:10px}[class*=fbecol-]{width:auto;float:none;padding-left:0;padding-right:10px;margin:10px 0}}uiload{display:inline-block;position:relative}uiload>div{position:relative}@-webkit-keyframes uil-facebook{0%{-ms-transform:scale(2);-moz-transform:scale(2);-webkit-transform:scale(2);-o-transform:scale(2);transform:scale(2)}100%,90%{-ms-transform:scale(1);-moz-transform:scale(1);-webkit-transform:scale(1);-o-transform:scale(1);transform:scale(1)}}@-moz-keyframes uil-facebook{0%{-ms-transform:scale(2);-moz-transform:scale(2);-webkit-transform:scale(2);-o-transform:scale(2);transform:scale(2)}100%,90%{-ms-transform:scale(1);-moz-transform:scale(1);-webkit-transform:scale(1);-o-transform:scale(1);transform:scale(1)}}@-ms-keyframes uil-facebook{0%{-ms-transform:scale(2);-moz-transform:scale(2);-webkit-transform:scale(2);-o-transform:scale(2);transform:scale(2)}100%,90%{-ms-transform:scale(1);-moz-transform:scale(1);-webkit-transform:scale(1);-o-transform:scale(1);transform:scale(1)}}@keyframes uil-facebook{0%{-ms-transform:scale(2);-moz-transform:scale(2);-webkit-transform:scale(2);-o-transform:scale(2);transform:scale(2)}100%,90%{-ms-transform:scale(1);-moz-transform:scale(1);-webkit-transform:scale(1);-o-transform:scale(1);transform:scale(1)}}.fbe-facebook-css{background:0 0;position:fixed;width:50px;height:50px;z-index:999;top:50%;left:0;right:0;margin:0 auto}.fbe-facebook-css>div{position:absolute;width:15px;height:30px;top:40px;left:0;background:#222;opacity:.6;-ms-animation:uil-facebook 1s cubic-bezier(.01,.73,.28,.93) infinite;-moz-animation:uil-facebook 1s cubic-bezier(.01,.73,.28,.93) infinite;-webkit-animation:uil-facebook 1s cubic-bezier(.01,.73,.28,.93) infinite;-o-animation:uil-facebook 1s cubic-bezier(.01,.73,.28,.93) infinite;animation:uil-facebook 1s cubic-bezier(.01,.73,.28,.93) infinite}.fbe-facebook-css>div:nth-of-type(2){left:20px;opacity:.8;-ms-animation-delay:.1s;-moz-animation-delay:.1s;-webkit-animation-delay:.1s;-o-animation-delay:.1s;animation-delay:.1s}.fbe-facebook-css>div:nth-of-type(3){left:40px;opacity:.9;-ms-animation-delay:.2s;-moz-animation-delay:.2s;-webkit-animation-delay:.2s;-o-animation-delay:.2s;animation-delay:.2s}.prev_fb_event{display:block;float:left}.next_fb_event{float:right}.next_fb_event,.prev_fb_event{color:#0075A2;padding:5px 15px}.next_fb_event:hover,.prev_fb_event:hover{background:#0075A2;color:#fff}#event_facebook_page{fill:#fff;background:#0075A2;padding:5px;width:24px;height:24px}.arrow-left,.arrow-right{width:0;height:0;border-top:6px solid transparent;border-bottom:6px solid transparent;display:inline-block;top:1px}.arrow-right{border-left:6px solid;margin-left:7px;position:relative}.arrow-left{margin-right:8px;position:relative;border-right:6px solid}.slick-list,.slick-slider,.slick-track{position:relative;display:block}.slick-slider{box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-touch-callout:none;-khtml-user-select:none;-ms-touch-action:pan-y;touch-action:pan-y;-webkit-tap-highlight-color:transparent}.slick-list{margin:0;padding:0}.slick-list:focus{outline:0}.slick-list.dragging{cursor:pointer;cursor:hand}.slick-slider .slick-list,.slick-slider .slick-track{-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);-o-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.slick-track{top:0;left:0}.slick-track:after,.slick-track:before{display:table;content:''}.slick-slide{display:none;float:left;height:100%;min-height:1px}[dir=rtl] .slick-slide{float:right}.slick-slide img{display:block}.slick-slide.slick-loading img{display:none}.slick-slide.dragging img{pointer-events:none}.slick-initialized .slick-slide{display:block}.slick-vertical .slick-slide{display:block;height:auto;border:1px solid transparent}.slick-arrow.slick-hidden{display:none}

</style>

<div class="fbegrid" style="display:none;">
<h1 class="fbe_page_title"><?php _e( get_the_title()); ?></h1>	
    <div class="fbe_page_desc">
	<?php 
	if ( have_posts() ) {
		while ( have_posts() ) {
			the_post(); 
			the_content();
		} 
	}
	?>
    </div>
</div>   
<?php
     $feat_post_count = 0; 
     $post_count = 0;
    /* $currentdate = date("Y-m-d",mktime(0,0,0,date("m"),date("d")-1,date("Y")));
		$args = array (
		    'post_type' => 'facebook_events',
			'posts_per_page' => -1,
			'orderby'=> 'modified',
            'order' => 'DESC',
            );
	*/
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
			'posts_per_page' => $max,
			'paged' => $paged,
	        'meta_key' => 'event_starts_sort_field',
           'orderby'=> 'modified',
            'order' => 'DESC',
			
		);




		$fbe_query = new WP_Query( $args );
		if( $fbe_query->have_posts() ): 
		while ( $fbe_query->have_posts() ) : $fbe_query->the_post();

		  $eventType = '';	
		  $event_title = get_the_title();
		  $event_desc =  get_the_content();
		  $event_image = get_fbe_image('cover');
		  $event_starts_month = get_fbe_date('event_starts','M');
		  $event_starts_day = get_fbe_date('event_starts','j');
		  $location = get_fbe_field('location');
		  $permalink = get_permalink();
		  $featured = get_post_meta($post->ID, 'feature_event', true);
		  $post_count++;
		  if($featured == 'yes'){
		  	$feat_post_count++;
		  }
         if($feat_post_count == 1 && $featured == 'yes'){ 
	?>
      <div class="group">
      <div id="fbe_header">
      <div class="fbegrid fbegrid-pad fbe_feat_col">
			
	  <div class="fbecol-1-2">
	  <div class="fbecol" data-id="<?php echo $permalink; ?>">	
	  <div class="featured fbe_list_image" style="background-image:url(<?php echo get_fbe_image('cover'); ?>);" >	  
	  <div class="featured fbe_list_bar" style="background:transparent!important;">
	  <div class="fbe_list_date">
	  	<div class="fbe_list_month"><?php echo $event_starts_month; ?></div>
		<div class="fbe_list_day"><?php echo $event_starts_day; ?></div>	
	  </div>	
	  </div>	
	  </div>
	  </div>  
	  </div> 
	  <div class="fbecol-1-2 fbe-hide-on-mobile">
	  <h1 class="fbe_page_title"><?php _e( $event_title ); ?></h1>
	  <div class="featured_fbe_col_location"><h4><?php if ($location){ _e($location ); }?></h4></div>	
	  <div class="fbe_feat_event_desc"><?_e( limitFBETxt($event_desc,200) );?></div>
	  <a href="<?php echo $permalink; ?>" class="fbe_feat_event_link">View Event</a>	
	  </div>
	  </div>
	  <div class="fbe_featured_image" style="background-image:url(<?php echo get_fbe_image('cover'); ?>);" ></div> 
      </div>
      </div>
      <?php
      }
	     endwhile;
		 endif;
			
	wp_reset_query();  

 ?>

 <div class="fbegrid fbegrid-pad">
  <div class='fbe-facebook-css' style='-webkit-transform:scale(0.27)'> <div></div><div></div><div></div></div>
 
 <div id="facebook_events_wrap">

 </div> 
 </div>
  <div class="fbegrid fbegrid-pad"> 
   <div class="col-1-1"> 
   <?php if(get_option("fbe_posts_per_page") != 'all'){	
 	_e( '<div id="load_more_fbe" data-id="1"></div>');
	}
	?>	
</div>
</div>
<?php get_footer(); ?>