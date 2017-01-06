
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
