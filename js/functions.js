
jQuery(document).ready(function( $ ) {
    /* Apply fancybox to multiple items */

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
});

/* jQuery('div.hero-header-title').click(function(){
    video = '<iframe src="'+ jQuery('div.hero-image').attr('data-video') +'" frameborder="0" allowfullscreen></iframe>';
    jQuery('div.hero-image').replaceWith(video);
}); */

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

(function($) {

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

})(jQuery);

            (function() {
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
