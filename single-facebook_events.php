<?php get_header(); ?>
<style>
#load_more_fbe,.fbe_feat_event_link{text-align:center;border-radius:3px}#fbe_header,.fbe_col_title,.fbecol,.fbegrid,.slick-list{overflow:hidden}.fbegrid:after,.group:after,.slick-track:after{clear:both}.slick-loading .slick-slide,.slick-loading .slick-track{visibility:hidden}.fbe_list_image{background-size:cover;background-position:top left;height:250px;width:100%}#fbe_tags{margin:20px 0}#fbe_tags a{padding:2px 20px;margin:2px;border:1px solid #0075A2;color:#0075A2}#fbe_tags a:hover{background:#0075A2;border:1px solid #fff;color:#fff}#facebook_events_wrap{margin:0}#fbe_header{min-height:400px;max-height:450px;background:#000;width:100%;left:0;position:relative}.fbe_feat_col{position:absolute;z-index:10;top:50px;left:0;right:0;margin:0 auto}#fbe_map_canvas{height:100%;max-height:30vh!important;min-height:320px!important;margin:20px 0;padding:0;border:3px solid #E5E1D7}.fbe_feat_event_link{display:block;width:200px;margin:20px auto;color:#fff;padding:10px 20px;text-transform:uppercase;font-weight:700 letter-spacing:1px;font-size:16px}.fbegrid:after,.group:after,.group:before{content:"";display:table}#fbe_header .fbecol{height:300px;margin:0 60px}#fbe_header .fbe_list_bar{top:160px}.fbe_featured_image{width:150vw;height:130vh;margin:-20px auto 0;background-size:cover;-webkit-filter:blur(20px);-moz-filter:blur(20px);-o-filter:blur(20px);-ms-filter:blur(20px);filter:blur(20px);opacity:.6}.fbecol{margin:10px 0;cursor:pointer;height:230px;position:relative;border-radius:3px}.fbecolhover .fbe_list_bar{-webkit-animation:fbehover .25s ease-in-out forwards;-moz-animation:fbehover .25s ease-in-out forwards;-o-animation:fbehover .25s ease-in-out forwards;animation:fbehover .25s ease-in-out forwards}@-webkit-keyframes fbehover{100%{background-color:#222;color:#fff}}@-moz-keyframes fbehover{100%{background-color:#222;color:#fff}}@-o-keyframes fbehover{100%{background-color:#222;color:#fff}}@keyframes fbehover{100%{background-color:#222;color:#fff}}.fbecolhoverOut .fbe_list_bar{-webkit-animation:fbehoverOut .25s forwards;-moz-animation:fbehoverOut .25s forwards;-o-animation:fbehoverOut .25s forwards;animation:fbehoverOut .25s forwards}@-webkit-keyframes fbehoverOut{0%{background-color:#222}100%{background-color:rgba(255,255,255,.9)}}@-moz-keyframes fbehoverOut{0%{background-color:#222}100%{background-color:rgba(255,255,255,.9)}}@-o-keyframes fbehoverOut{0%{background-color:#222}100%{background-color:rgba(255,255,255,.9)}}@keyframes fbehoverOut{0%{background-color:#222}100%{background-color:rgba(255,255,255,.9)}}.group{zoom:1}.fbe-sidebar-post .fbe_list_bar{position:static;cursor:pointer}.fbe_list_bar{background-color:rgba(255,255,255,.9);left:0;padding:20px 10px 10px;height:90px;position:relative;top:140px;width:100%}.fbe_col_title{height:30px}.fbe_col_title h2{font-size:18px;margin:0;padding:0}.fbe_list_date{text-align:center;position:relative;left:-10px;top:-20px;float:left;margin-right:10px;width:90px;color:#fff;background:#444;height:90px}.fbe_list_month{margin:20px 0 0;font-size:18px;height:25px;width:100%;text-transform:uppercase;letter-spacing:2px}.fbe_list_day{font-size:23px;width:100%}.fbe_col_location{height:30px;overflow:hidden;font-size:16px;margin:0;padding:0}.fbe_slider_bar,.wpfbe_slider .fbe_list_bar{padding:20px 10px 10px;height:90px;width:100%;position:relative}.fbe_slider_bar{background-color:left:0px}.wpfbe_slider .fbe_list_bar{background-color:rgba(255,255,255,.9);left:0;top:160px}.featured_fbe_col_location h4{color:#fff;font-size:20px;margin:0 30px 20px}.fbe_feat_event_desc,.fbe_page_title{margin:0 30px;color:#fff}.featured.fbe_list_bar{background:0 0!important}.fbe_feat_event_desc{font-size:18px}#load_more_fbe{padding:20px 40px;-o-transition:.35s;-ms-transition:.35s;-moz-transition:.35s;-webkit-transition:.35s;cursor:pointer;background-color:#222;color:#fff;margin:10px auto 30px;letter-spacing:1px;width:280px}.fbecol-1-1,.fbegrid{width:100%}#fbe_single_date{font-size:20px;margin:0 0 10px}h1.fbe_single_title{margin:20px 0 0}#fbe_sidebar{margin:0 15px}#fbe_sidebar ul{list-style:none;margin:0 0 20px;padding:0}#fbe_sidebar ul li{list-style:none;margin:0;padding:10px}#fbe_sidebar h2{margin:0}*,:after,:before{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}[class*=fbecol-]{float:left;padding-right:20px}.fbegrid{max-width:1600px;min-width:755px;margin:0 auto}.fbegrid-pad{padding-top:20px;padding-left:20px;padding-right:0}.fbecol-2-3,.fbecol-8-12{width:66.66%}.fbecol-1-2,.fbecol-6-12{width:50%}.fbecol-1-3,.fbecol-4-12{width:33.33%}.fbecol-1-4,.fbecol-3-12{width:25%}.fbecol-1-5{width:20%}.fbecol-1-6,.fbecol-2-12{width:16.667%}.fbecol-1-7{width:14.28%}.fbecol-1-8{width:12.5%}.fbecol-1-9{width:11.1%}.fbecol-1-10{width:10%}.fbecol-1-11{width:9.09%}.fbecol-1-12{width:8.33%}.fbecol-11-12{width:91.66%}.fbecol-10-12{width:83.333%}.fbecol-9-12{width:75%}.fbecol-5-12{width:41.66%}.fbecol-7-12{width:58.33%}.fbe-full-width{width:100%;height:auto!important}@media (max-width:768px){.fbe-hide-on-mobile{display:none!important;width:0;height:0}}@media (max-width:980px){.fbecol-1-3,.fbecol-4-12{width:50%}}@media handheld,only screen and (max-width:767px){.fbegrid{width:100%;min-width:0;margin-left:0;margin-right:0;padding-left:20px;padding-right:10px}[class*=fbecol-]{width:auto;float:none;padding-left:0;padding-right:10px;margin:10px 0}}uiload{display:inline-block;position:relative}uiload>div{position:relative}@-webkit-keyframes uil-facebook{0%{-ms-transform:scale(2);-moz-transform:scale(2);-webkit-transform:scale(2);-o-transform:scale(2);transform:scale(2)}100%,90%{-ms-transform:scale(1);-moz-transform:scale(1);-webkit-transform:scale(1);-o-transform:scale(1);transform:scale(1)}}@-moz-keyframes uil-facebook{0%{-ms-transform:scale(2);-moz-transform:scale(2);-webkit-transform:scale(2);-o-transform:scale(2);transform:scale(2)}100%,90%{-ms-transform:scale(1);-moz-transform:scale(1);-webkit-transform:scale(1);-o-transform:scale(1);transform:scale(1)}}@-ms-keyframes uil-facebook{0%{-ms-transform:scale(2);-moz-transform:scale(2);-webkit-transform:scale(2);-o-transform:scale(2);transform:scale(2)}100%,90%{-ms-transform:scale(1);-moz-transform:scale(1);-webkit-transform:scale(1);-o-transform:scale(1);transform:scale(1)}}@keyframes uil-facebook{0%{-ms-transform:scale(2);-moz-transform:scale(2);-webkit-transform:scale(2);-o-transform:scale(2);transform:scale(2)}100%,90%{-ms-transform:scale(1);-moz-transform:scale(1);-webkit-transform:scale(1);-o-transform:scale(1);transform:scale(1)}}.fbe-facebook-css{background:0 0;position:fixed;width:50px;height:50px;z-index:999;top:50%;left:0;right:0;margin:0 auto}.fbe-facebook-css>div{position:absolute;width:15px;height:30px;top:40px;left:0;background:#222;opacity:.6;-ms-animation:uil-facebook 1s cubic-bezier(.01,.73,.28,.93) infinite;-moz-animation:uil-facebook 1s cubic-bezier(.01,.73,.28,.93) infinite;-webkit-animation:uil-facebook 1s cubic-bezier(.01,.73,.28,.93) infinite;-o-animation:uil-facebook 1s cubic-bezier(.01,.73,.28,.93) infinite;animation:uil-facebook 1s cubic-bezier(.01,.73,.28,.93) infinite}.fbe-facebook-css>div:nth-of-type(2){left:20px;opacity:.8;-ms-animation-delay:.1s;-moz-animation-delay:.1s;-webkit-animation-delay:.1s;-o-animation-delay:.1s;animation-delay:.1s}.fbe-facebook-css>div:nth-of-type(3){left:40px;opacity:.9;-ms-animation-delay:.2s;-moz-animation-delay:.2s;-webkit-animation-delay:.2s;-o-animation-delay:.2s;animation-delay:.2s}.prev_fb_event{display:block;float:left}.next_fb_event{float:right}.next_fb_event,.prev_fb_event{color:#0075A2;padding:5px 15px}.next_fb_event:hover,.prev_fb_event:hover{background:#0075A2;color:#fff}#event_facebook_page{fill:#fff;background:#0075A2;padding:5px;width:24px;height:24px}.arrow-left,.arrow-right{width:0;height:0;border-top:6px solid transparent;border-bottom:6px solid transparent;display:inline-block;top:1px}.arrow-right{border-left:6px solid;margin-left:7px;position:relative}.arrow-left{margin-right:8px;position:relative;border-right:6px solid}.slick-list,.slick-slider,.slick-track{position:relative;display:block}.slick-slider{box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-touch-callout:none;-khtml-user-select:none;-ms-touch-action:pan-y;touch-action:pan-y;-webkit-tap-highlight-color:transparent}.slick-list{margin:0;padding:0}.slick-list:focus{outline:0}.slick-list.dragging{cursor:pointer;cursor:hand}.slick-slider .slick-list,.slick-slider .slick-track{-webkit-transform:translate3d(0,0,0);-moz-transform:translate3d(0,0,0);-ms-transform:translate3d(0,0,0);-o-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.slick-track{top:0;left:0}.slick-track:after,.slick-track:before{display:table;content:''}.slick-slide{display:none;float:left;height:100%;min-height:1px}[dir=rtl] .slick-slide{float:right}.slick-slide img{display:block}.slick-slide.slick-loading img{display:none}.slick-slide.dragging img{pointer-events:none}.slick-initialized .slick-slide{display:block}.slick-vertical .slick-slide{display:block;height:auto;border:1px solid transparent}.slick-arrow.slick-hidden{display:none}

</style>

<?php if (have_posts()) :
   while (have_posts()) :
      the_post();
          $fb_link = get_fbe_field('fb_event_uri'); 
          $tickets = get_fbe_field('ticket_uri'); 
          $event_title = get_the_title();
		   $event_desc = apply_filters( 'the_content', get_the_content() );
		  
		  $event_image = get_fbe_image('cover');
		  
		  
		  //Translate variable to turkish
	
		  $event_start_date = get_fbe_date('event_starts','M j, Y');
		
		  $event_start_time = get_fbe_date('start_time','g:i a');
		  $event_end_date = get_fbe_date('event_ends','M j, Y');
		  $event_end_time = get_fbe_date('end_time','g:ia');
          $LatLng = get_fbe_field('geo_latitude').','.get_fbe_field('geo_longitude');
		  $location = get_fbe_field('location');
		  $permalink = get_permalink();
	      $venue_phone = get_fbe_field( 'venue_phone');
	      $venue_email = get_fbe_field( 'venue_email');
	      $venue_website = get_fbe_field( 'venue_website');
	      $facebook_page = get_fbe_field( 'facebook');
	      $venue_desc = get_fbe_field( 'venue_desc');
	      $venue_name = get_fbe_field( 'venue_name');
	      $venue_email = get_fbe_field( 'venue_email');
	      $geo_latitude = get_fbe_field( 'geo_latitude');
	      $geo_longitude = get_fbe_field( 'geo_longitude');
	      $event_image = get_fbe_image('full'); 
	      
?> 
<div class="event-wrapper" itemscope itemtype="http://schema.org/Event">

	  <div itemprop="location" itemscope itemtype="http://schema.org/Place" style="display:none;">
  <div itemprop="name"><?echo $venue_name; ?></div>
  <div itemprop="url"><?echo $$venue_website; ?></div>
    <div itemprop="description"><?echo $venue_desc; ?></div>
  
  <div itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
      <span itemprop="addressLocality"><?echo $location;?></span>,
    </div>
	  </div>
<div class="group"></div>      
<div class="fbegrid fbegrid-pad">
	<div class="fbecol-8-12">
	<?php if ($event_image ){ ?>
	<div class="fbe_single_event_image_wrap">
	<img class="1fbe-full-width"  itemprop="image" src="<?php echo $event_image; ?>" /> 
	</div>	
	<hr />	
	<?php } ?>
	<h1 class="fbe_single_title" itemprop="name"> <?php echo $event_title; ?></h1>

	<div id="fbe_single_date" itemprop="startDate"><?php echo $event_start_date; if($event_start_time){echo ' @ '.$event_start_time; } ?>
    <span itemprop="endDate"><?php if($event_end_date){echo '&nbsp;&mdash;&nbsp;&nbsp;'. $event_end_date; } if($event_end_time){echo ' @ '.$event_end_time; } ?></span>
	</div>
	<p itemprop="description"><?php echo $event_desc ; ?></p>
    <?php the_tags( '<div id="fbe_tags">', '', '</div>' ); ?> 
	<?php if(get_option('fbe_geo_map') == 'true'){ 
		if ($LatLng !=','){

		echo '<div class="group"></div><hr/>';

		if($venue_name){
			echo '<br/><h3>'.$venue_name.'</h3>';
		}


		if($venue_name != $location){echo $location; }else{
			$address = getaddress(get_fbe_field('geo_latitude'),get_fbe_field('geo_longitude')); 
			if($address)
			{
			echo $address;
			}
			else
			{
			}			
		}
		
		echo '</br>';		
		echo '<div id="fbe_map_canvas" style="min-height:500px;"></div>'; 
		}
	} 
	?>

<hr />
<div class="group"></div>
	<?php custom_fbe_post_nav(get_fbe_date('event_starts','m/d/Y')); ?>
<div class="group"></div>
<hr />

	<?php if ( comments_open() || get_comments_number() ) { ?>
	<div id="comments">
	<div class="fbe_comments">Post a comment</div>  
	<?php comments_template(); ?>
	</div>  
	<?php  } ?>

	</div>
	<div class="fbecol-4-12">
		<div id="fbe_sidebar">
		<?php if(get_option('fbe_venue') == 'true'){ ?>
		<?php if($venue_name){ ?>
		<h2>Event Venue</h2>
		<hr />	
		<ul>
		<?php if($venue_name){ ?><li><b>Venue </b><br/><span itemprop="sponsor" itemtype="http://schema.org/Organization"><img style="display:none;" class="fbe-full-width"  itemprop="image" src="<?php echo $event_image; ?>" /> <span itemprop="name"><?php echo $venue_name; ?><span  itemprop="description" style="display:none;"><? echo $venue_desc; ?></span></span></li><?php } ?>
		<?php if($venue_desc){ ?><li><b>About</b><br/><?php echo $venue_desc; ?></li><?php } ?>
		<?php if($location){
		if($location == $venue_name){
		$address = getaddress(get_fbe_field('geo_latitude'),get_fbe_field('geo_longitude'));
			if($address)
			{
			echo '<li><b>Location</b><br/>'.$address.'</li>';
			}
			else
			{
				echo '<li><b>Location</b><br/>'.$location.'</li>';
			}
		}else{
			$address = getaddress(get_fbe_field('geo_latitude'),get_fbe_field('geo_longitude'));
			if($address)
			{
			echo '<li><b>Location</b><br/>'.$address.'</li>';
			}
		}	
		?>
		<?php } ?>
		<?php if($venue_website){ ?><li><b>Website </b><br/><?php echo '<a href="'.$venue_website.'" target="_blank"><span itemtype="http://schema.org/Organization"><span itemprop="url">'.$venue_website.'<span><span></a>'; ?></li><?php } ?>
		<?php if($venue_phone){ ?><li><b>Phone</b><br/><?php echo $venue_phone; ?></li><?php } ?>
		<?php if($venue_email){ ?><li><b>Email</b><br/><?php echo $venue_email; ?></li><?php } ?>
		<?php if($facebook_page){ ?><li><b>Follow On</b><br/><a class="event_facebook_page" itemprop="url" href="<?php echo $facebook_page; ?>" target="_blank">
		<svg version="1.1" id="event_facebook_page" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="241.6 0 308.3 612" enable-background="new 241.6 0 308.3 612" xml:space="preserve">
<path  d="M549.9,218.6H439.7V165c0,0-6.9-49.5,30.2-49.5c41.3,0,73,0,73,0V1.2H417.8c0,0-103.2,0-103.2,103.2
	c0,23.4,0,64.7,0,114.2h-73v90.8h73c0,140.3,0,300,0,300h125.3V310.8h83.9L549.9,218.6z"/>
<path d="M2016.6,177.7c-18.4,8.7-35.6,11.9-57.3,15.1c20.5-11.9,35.6-30.2,42.1-54c-18.4,11.9-38.9,18.4-62.6,23.7
	c-18.4-18.4-45.4-30.2-72.3-30.2c-50.8,0-96.1,45.4-96.1,99.3c0,8.7,0,15.1,3.2,20.5c-81-3.2-155.5-42.1-204.1-101.5
	c-8.7,15.1-11.9,30.2-11.9,50.8c0,33.5,18.4,62.6,45.4,81c-15.1,0-30.2-6.5-45.4-11.9l0,0c0,47.5,33.5,87.5,77.7,96.1
	c-8.7,3.2-18.4,3.2-27,3.2c-6.5,0-11.9,0-18.4-3.2c11.9,38.9,47.5,69.1,92.9,69.1c-33.5,27-74.5,42.1-123.1,42.1
	c-8.7,0-15.1,0-23.7,0c45.4,27,96.1,45.4,150.1,45.4c180.3,0,278.6-150.1,278.6-278.6v-11.9C1986.3,217.7,2004.7,199.3,2016.6,177.7
	z"/>
</svg></a></li><?php } ?>
	
		</ul>
		<?php } ?>
		<?php } ?>
		<h2>Event Details</h2>
		<hr />		
		<ul>
	<?php if(get_option('fbe_venue') == 'false'){ ?>

		<?php if($location){
		if($location == $venue_name){
		$address = getaddress(get_fbe_field('geo_latitude'),get_fbe_field('geo_longitude'));
			if($address)
			{
			echo '<li><b>Location</b><br/>'.$address,'</li>';
			}
			else
			{
				echo '<li><b>Location</b><br/>'.$location,'</li>';
			}
		}else{
			$address = getaddress(get_fbe_field('geo_latitude'),get_fbe_field('geo_longitude'));
			if($address)
			{
			echo '<li><b>Location</b><br/>'.$address,'</li>';
			}
		}	
		?>
		<?php } ?>
	<?php } ?>
	<?php if($event_start_date){?><li><b>Starts</b><br/><?php echo $event_start_date; if($event_start_time){echo ' @ '.$event_start_time; } ?></li><?php } ?>
    <?php if($event_end_date){?><li><b>Ends</b><br/> <?php echo $event_end_date; if($event_end_time){echo ' @ '.$event_end_time; } ?></li><?php } ?>
		<?php if ($fb_link){?><li><b>Facebook Event</b><br/><a href="<?php echo $fb_link; ?>" target="_blank">View event on Facebook</a></li><?php } ?>
		<?php if($tickets){?><li><b>Admission</b><br/><a href="<?php echo $tickets; ?>" target="_blank">Get Tickets</a></li><?php } ?>
	    </ul>
	    <?php load_template ( dirname( __FILE__ ) . '/sidebar-facebook-events.php' ) ; ?>
		</div>
	</div>

</div>
<?php  endwhile;

endif;
wp_reset_query();  
?>

<div class="group"></div> 
</div>



<?php get_footer(); ?>