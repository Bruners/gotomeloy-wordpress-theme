jQuery(document).ready(function($) {
    /* Apply fancybox to multiple items */
    jQuery("a[href$='.jpg'],a[href$='.png'],a[href$='.gif']").fancybox();
    jQuery("a.iframe").fancybox({
        openEffect  : 'none',
        closeEffect : 'none',
        autoSize: true,
        width: '95%',
        height: '95%',
        iframe : {
            preload: false
        }
    });
    jQuery("a#webcam-url").fancybox({
        openEffect  : 'none',
        closeEffect : 'none',
        autoSize: true,
        width: '95%',
        height: '95%',
        hideOnContentClick: true,
        iframe : {
            preload: false
        }
    });

    // Carousel Auto-Cycle
    jQuery('.carousel').carousel({
      interval: 0
    })

    // Move carousel caption into new-caption-area
    jQuery(function ($) {
        jQuery('.carousel').carousel();
        var caption = jQuery('div.item:nth-child(1) .carousel-caption');
        jQuery('.new-caption-area').html(caption.html());
        caption.css('display', 'none');

        jQuery(".carousel").on('slide.bs.carousel', function (evt) {
            var caption = jQuery('div.item:nth-child(' + (jQuery(evt.relatedTarget).index() + 1) + ') .carousel-caption');
            jQuery('.new-caption-area').html(caption.html());
            caption.css('display', 'none');
        });
    });

    // Resize header video container
    jQuery('.my-background-video').bgVideo({
        pauseAfter: 120,
        showPausePlay: true, // Show pause/play button
        pausePlayXPos: 'center', // left|right|center
        pausePlayYPos: 'top', // top|bottom|center
        //pausePlayXOffset: '15px', // pixels or percent from side - ignored if positioned center
        pausePlayYOffset: '60%' // pixels or percent from top/bottom - ignored if positioned center
    });

    // Resize image containers using background-image
    jQuery(".iBG").each(function() {
        jQuery(this).css("background-image", "url(" + jQuery(this).attr("data-img") + ")");
    });

    jQuery(".scroll-down").click(function() {
        event.preventDefault();
        jQuery('html, body').animate({
            scrollTop: jQuery("#site-body").offset().top
        }, 'slow', 'swing' );
    });

    jQuery(".back2top").on("click", function() {
        jQuery("html, body").animate({
            scrollTop: 0 
        }, 1e3);
    });

    jQuery('#menu-toggle').click(function(){   
        jQuery('body').toggleClass('menu-open');
        return false;
    });
    
    var windowwidth = $(window).width();

    if (windowwidth <= 1000) {
        jQuery('#primary-menu li a').click(function(){
            jQuery('#menu-toggle').trigger('click');
        });
    }

    jQuery(function($) {
 
        // grab the initial top offset of the navigation 
        var content_offset_top = jQuery('#site-body').offset().top;
         
        // our function that decides weather the navigation bar should have "fixed" css position or not.
        var sticky_navigation = function(){
            
            var scroll_top = jQuery(window).scrollTop(); // our current vertical position from the top
             
            // if we've scrolled more than the navigation, change its position to fixed to stick to top,
            // otherwise change it back to relative
            if ( (scroll_top + 70) >= content_offset_top) { 
                jQuery('body').addClass('sticky');
            } else {
                jQuery('body').removeClass('sticky'); 
            }   
        };
         
        // run our function on load
        sticky_navigation();
         
        // and run it again every time you scroll
        jQuery(window).scroll(function() {
             sticky_navigation();
        });
        
        jQuery(window).resize(function() {
             sticky_navigation();
        });
     
    });

    /*  stott.no specific */
    /* Update webcam image with the most up to date image  */ 
    jQuery(function($) {
        'use strict';
        function getImage() {
            var src = '';
            var lastimageurl = "http://www.stott.no/wp-content/themes/gotomeloy/parts/ajax-get-webcam-image.inc.php?t="
            jQuery.ajax({
                url: lastimageurl  + new Date().getTime(),
                async: false,
                success: function(data){
                  src = data;
                }
            });
            return src;
        }

        function updateImage() {
                var src = getImage();
                jQuery("#webcam-img").attr("src", src + "?timestamp=" + new Date().getTime());
                jQuery("#webcam-url").attr("href", src + "?timestamp=" + new Date().getTime());
                setTimeout(updateImage, 10000);
            }

        updateImage();
    });
});
