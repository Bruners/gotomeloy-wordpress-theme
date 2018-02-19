/*!
 * Lamark
 *
 * Creative Portfolio Template
 *
 * v1.0.0
 * By Amcode
 */
(function($) {
    "use strict";
    /** GENERALS */
    /** ================================================== */
    /** Viewport dimensions */
    var ww = $(window).width();
    var wh = $(window).height();

    /** TEMPLATE FUNCTIONS */
    /** ================================================== */
    var templateFunctions = {
        /** Portfolio */
        grid: function() {
            /** Container */
            var container = $(".grid");
            for (var i = 0; i < container.length; i++) {
                /** Container */
                var containerAct = $(container[i]);
                var cWidth = containerAct.width();
                /** Items */
                var items = containerAct.find(".entry");
                /** Columns */
                var cols = 1;
                var attr_cols = parseInt(containerAct.attr("data-col"), 10);
                /** Margin */
                var margin = parseInt(containerAct.attr("data-margin"), 10);
                if (!margin) margin = 0;
                /** Height */
                var data_height = parseFloat(containerAct.attr("data-height"));
                if (!data_height) data_height = .7;
                /** Double height */
                var double_height = parseFloat(containerAct.attr("data-double-height"));
                if (!double_height) double_height = 1.5;
                /** Set margins to the container */
                container.css({
                    margin: -Math.floor(margin / 2) + "px"
                });
                if (ww >= 1024) {
                    cWidth = containerAct.width();
                    if (attr_cols) cols = attr_cols; else cols = 3;
                    /** Calculating the width and height */
                    var iWidth = Math.floor(cWidth / cols - margin * cols / cols);
                    var iHeight = Math.floor(iWidth * data_height);
                    var iMargin = Math.floor(margin / 2);
                    items.each(function() {
                        $(this).css({
                            width: iWidth + "px",
                            height: iHeight + "px",
                            margin: iMargin + "px"
                        });
                        if ($(this).hasClass("h2") && $(this).closest('[data-masonry="true"]').length) $(this).css("height", iHeight * double_height + margin + "px");
                        if ($(this).hasClass("w2") && $(this).closest('[data-masonry="true"]').length) $(this).css("width", iWidth * 2 + iMargin * 2 + "px");
                    });
                } else if (ww > 767) {
                    cWidth = containerAct.width();
                    if (attr_cols !== 1) cols = 2;
                    /** Calculating the width and height */
                    var iWidth = Math.floor(cWidth / cols - margin * cols / cols);
                    var iHeight = Math.floor(iWidth * data_height);
                    var iMargin = Math.floor(margin / 2);
                    items.each(function() {
                        $(this).css({
                            width: iWidth + "px",
                            height: iHeight + "px",
                            margin: iMargin + "px"
                        });
                        if ($(this).hasClass("h2") && $(this).closest('[data-masonry="true"]').length) $(this).css("height", iHeight * double_height + margin + "px");
                        if ($(this).hasClass("w2") && $(this).closest('[data-masonry="true"]').length) $(this).css("width", iWidth * 2 + iMargin * 2 + "px");
                    });
                } else {
                    cWidth = containerAct.width();
                    cols = cols;
                    /** Calculating the width and height */
                    var iWidth = Math.floor(cWidth / cols - margin * cols / cols);
                    var iHeight = Math.floor(iWidth * data_height);
                    var iMargin = Math.floor(margin / 2);
                    items.each(function() {
                        $(this).css({
                            width: iWidth + "px",
                            height: iHeight + "px",
                            margin: iMargin + "px"
                        });
                        if ($(this).hasClass("h2") && $(this).closest('[data-masonry="true"]').length) $(this).css("height", iHeight * double_height + margin + "px");
                        if ($(this).hasClass("w2") && $(this).closest('[data-masonry="true"]').length) $(this).css("width", iWidth + "px");
                    });
                }
            }
        },
        /** Masonry portfolio */
        masonry: function() {
            var container = $(".grid");
            container.isotope({
                itemSelector: ".entry"
            });
        },
        /** Filters */
        filtering: function() {
            var container = $(".grid");
            $(".filters li a").on("click", function(e) {
                e.preventDefault();
                $(".filters li a").removeClass("active");
                $(this).addClass("active");
            });
        }
    };

    /** LOAD */
    /** ================================================== */
    $(window).bind("load", function() {
        /** Load template functions */
        templateFunctions.grid();
        templateFunctions.filtering();
    });
    /** RESIZE */
    /** ================================================== */
    $(window).bind("resize", function() {
        /** Viewport dimensions */
        ww = $(window).width();
        wh = $(window).height();
        /** Load template functions */
        templateFunctions.grid();
    });
})(jQuery);

jQuery(document).ready(function($) {
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

// The MIT License (MIT)
// Copyright (c) 2015 BG Stock - html5backgroundvideos.com
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
(function($) {
    // Add js class to html
    $("html").addClass("js");
    // Add IE8 shim for Date.now()
    if (!Date.now) {
        Date.now = function() {
            return new Date().getTime();
        };
    }
    // Return current time in seconds
    function currentTime() {
        return Math.floor(Date.now() / 1e3);
    }
    // The plugin
    $.fn.bgVideo = function(options) {
        // @bool iOS
        //var iOS = /iPad|iPhone|iPod/.test(navigator.platform) || /iPad|iPhone|iPod/.test(navigator.userAgent);
        // Settings
        var settings = $.extend({}, $.fn.bgVideo.defaults, options);
        // Do the things
        return this.each(function() {
            // Set some handy variables
            var $video = $(this);
            // jQuery Object
            var video = $video[0];
            // DOM node
            var poster = $video.attr("poster") || "";
            var $container = $video.parent();
            var $pauseplay = $('<button class="jquery-background-video-pauseplay pause"><span>Pause</span></button>');
            var start_time;
            // We'll set this when it starts playing
            // Check for any data attributes that will override the settings for this particular element
            var el_settings = $.extend({}, settings);
            var data_attrs = $video.data();
            $.each(data_attrs, function(data_name, data_val) {
                if (data_name.indexOf("bgvideo") === 0) {
                    // It's a match! Strip the bgvideo prefix and lowercase the first letter
                    data_name = data_name.replace("bgvideo", "");
                    data_name = data_name.charAt(0).toLowerCase() + data_name.slice(1);
                    // Then set the setting
                    el_settings[data_name] = data_val;
                }
            });
            // Attach to playing event
            $video.on("playing", function() {
                if (start_time == null) {
                    start_time = currentTime();
                }
                $video.addClass("is-playing is-visible");
                $pauseplay.removeClass("play").addClass("pause").find("span").text("Pause");
                $(".hero-content").fadeOut("slow");
                $.fn.bgVideo.fitVideo($video);
            });
            // If the video is already playing before js loads
            if (video.currentTime > 0) {
                $video.addClass("is-playing is-visible");
            }
            // Attach to pause event
            $video.on("pause", function() {
                $video.removeClass("is-playing");
                $pauseplay.removeClass("pause").addClass("play").find("span").text("Play");
                $(".hero-content").fadeIn("slow");
                if (el_settings.fadeOnPause) {
                    $video.removeClass("is-visible");
                }
            });
            // Set default styles
            $container.css({
                position: "relative",
                overflow: "hidden",
                "background-size": "cover",
                "background-position": "center center",
                "background-repeat": "no-repeat",
                "background-image": "url(" + poster + ")"
            });
            $video.css({
                "min-width": "auto",
                "min-height": "auto",
                width: "100%",
                height: "auto",
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%,-50%)"
            });
            if (el_settings.fullScreen) {
                $container.css({
                    position: "fixed",
                    top: "0",
                    bottom: "0",
                    left: "0",
                    right: "0",
                    height: "auto",
                    margin: "0",
                    "z-index": "-1"
                });
            }
            // Fade in video by setting the transition duration
            $video.css("transition-duration", el_settings.fadeIn + "ms");
            // Remove on iOS
            //if (iOS) {
            //    // Unset sources to prevent them from continuing to download
            //    $video.attr("src", "");
            //    $video.find("source").attr("src", "");
            //    $video.remove();
            //}
            // Mimic background-size: cover with video element
            $.fn.bgVideo.fitVideo($video);
            $(window).resize(function() {
                $.fn.bgVideo.fitVideo($video);
            });
            // Pause after X seconds
            el_settings.pauseAfter = parseInt(el_settings.pauseAfter, 10);
            if (el_settings.pauseAfter > 0) {
                $video.on("timeupdate", function() {
                    var now = currentTime();
                    if (now > start_time + el_settings.pauseAfter) {
                        video.pause();
                        if (el_settings.fadeOnEnd) {
                            $video.removeClass("is-visible");
                        }
                    }
                });
            }
            // Play / pause button
            if (el_settings.showPausePlay) {
            //if (el_settings.showPausePlay && !iOS) {
                // Append pauseplay element created earlier
                $container.append($pauseplay);
                // Position element
                $pauseplay.css({
                    left: "auto",
                    right: "auto",
                    top: "auto",
                    bottom: "auto"
                });
                $pauseplay.css(el_settings.pausePlayXPos, el_settings.pausePlayXOffset);
                $pauseplay.css(el_settings.pausePlayYPos, el_settings.pausePlayYOffset);
                if (el_settings.pausePlayXPos === "center") {
                    $pauseplay.css({
                        left: "50%",
                        "margin-left": "-10px"
                    });
                }
                if (el_settings.pausePlayYPos === "center") {
                    $pauseplay.css({
                        top: "50%",
                        "margin-top": "-10px"
                    });
                }
                // Add functionality
                $pauseplay.on("click", function() {
                    if (video.paused) {
                        video.play();
                        start_time = currentTime();
                    } else {
                        video.pause();
                    }
                });
            }
        });
    };
    // Default settings
    $.fn.bgVideo.defaults = {
        fullScreen: false,
        // Sets the video to be fixed to the full window
        fadeIn: 500,
        // Milliseconds to fade video in/out (0 for no fade)
        pauseAfter: 120,
        // Seconds to play before pausing (0 for forever)
        fadeOnPause: false,
        // For all (including manual) pauses
        fadeOnEnd: true,
        // When we've reached the pauseAfter time
        showPausePlay: true,
        // Show pause/play button
        pausePlayXPos: "right",
        // left|right|center
        pausePlayYPos: "top",
        // top|bottom|center
        pausePlayXOffset: "15px",
        // pixels or percent from side - ignored if positioned center
        pausePlayYOffset: "15px"
    };
    // Fit video
    $.fn.bgVideo.fitVideo = function($video) {
        var $container = $video.parent(), container_height = $container.outerHeight(), container_width = $container.outerWidth();
        // Do this again every time the screen size changes
        $video.css({
            height: "auto",
            width: container_width + "px"
        });
        var video_height = $video.height();
        if (container_height > video_height) {
            //console.log('Container height > video height');
            $video.css({
                height: container_height + "px",
                width: "auto"
            });
        }
    };
    // Auto run based on data attributes
    $(document).ready(function() {
        $("[data-bgvideo]").bgVideo();

        // Resize header video container
        $('.my-background-video').bgVideo({
            pauseAfter: 120,
            showPausePlay: true, // Show pause/play button
            pausePlayXPos: 'center', // left|right|center
            pausePlayYPos: 'top', // top|bottom|center
            //pausePlayXOffset: '15px', // pixels or percent from side - ignored if positioned center
            pausePlayYOffset: '60%' // pixels or percent from top/bottom - ignored if positioned center
        });
    });
})(jQuery);