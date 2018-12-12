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

    jQuery('#menu-toggle').click(function(){
        
        jQuery('body').toggleClass('menu-open');
        return false;
    });
    
    var windowwidth = $(window).width();
    
    if (windowwidth <= 1000){
        
        jQuery('#primary-menu li a').click(function(){
        
            jQuery('#menu-toggle').trigger('click');
        
        });
        
    }
    
    $('.my-background-video').bgVideo({
        pauseAfter: 120,
        showPausePlay: true, // Show pause/play button
        pausePlayXPos: 'center', // left|right|center
        pausePlayYPos: 'top', // top|bottom|center
        //pausePlayXOffset: '15px', // pixels or percent from side - ignored if positioned center
        pausePlayYOffset: '60%' // pixels or percent from top/bottom - ignored if positioned center
    });

    jQuery(".scroll-down").click(function() {
        event.preventDefault();
        jQuery('html, body').animate({
            scrollTop: jQuery("#site-body").offset().top
        }, 'slow', 'swing' );
    });


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
        
        jQuery(document).ready(function() {
            sticky_navigation();
        });
         
        // and run it again every time you scroll
        jQuery(window).scroll(function() {
             sticky_navigation();
        });
        
        jQuery(window).resize(function() {
             sticky_navigation();
        });
     
    });

    jQuery("#stottfilm").click(function() {
        jQuery.fancybox({
            'padding'       : 0,
            'autoScale'     : false,
            'transitionIn'  : 'none',
            'transitionOut' : 'none',
            'title'         : this.title,
            'width'     : 680,
            'height'        : 495,
            'href'          : this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
            'type'          : 'swf',
            'swf'           : {
                 'wmode'        : 'transparent',
                'allowfullscreen'   : 'true'
            }
        });

    return false;
    });

    jQuery("#stottfilm2").click(function() {
        jQuery.fancybox({
            'padding'       : 0,
            'autoScale'     : false,
            'transitionIn'  : 'none',
            'transitionOut' : 'none',
            'title'         : this.title,
            'width'         : 680,
            'height'        : 495,
            'href'          : this.href,
            'type'          : $(this).data("type")
        });
        return false;
    });
    
});

(function($) {

    'use strict';
    function getImage() {
        var src = '';
        var lastimageurl = "https://www.stott.no/wp-content/themes/gotomeloy/parts/ajax-get-webcam-image.inc.php?t="
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

})(jQuery);

/*(function() {
    var header = document.querySelector("#header");

    if(window.location.hash) {
      header.classList.add("headroom--unpinned");
    }

    var headroom = new Headroom(header, {
        tolerance: {
          down : 10,
          up : 20
        },
        offset : 205
    });
    headroom.init();

}());
*/