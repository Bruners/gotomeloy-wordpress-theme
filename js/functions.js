
jQuery(document).ready(function( $ ) {
    /* Apply fancybox to multiple items */

    $("a.iframe").fancybox({
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
            $("#webcam-img").attr("src", src + "?timestamp=" + new Date().getTime());
            $("#webcam-url").attr("href", src + "?timestamp=" + new Date().getTime());
            setTimeout(updateImage, 5000);
        }

    updateImage();

})(jQuery);
