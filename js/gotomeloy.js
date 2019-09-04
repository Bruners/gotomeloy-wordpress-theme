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
    /** TEMPLATE FUNCTIONS */
    /** ================================================== */
    var templateFunctions = {
        /** Portfolio */
        /** Filters */
        filtering: function() {
            //var container = $(".grid");
            $(".filters li a").on("click", function(e) {
                e.preventDefault();
                $(".filters li a").removeClass("active");
                $(this).addClass("active");
            });
        },

        /** Update webcamimage on stott.no */
        getImage: function() {
            $.ajax({
                url: "https://www.stott.no/wp-content/themes/gotomeloy/parts/ajax-get-webcam-image.inc.php",
                dataType: 'json',
                success: function(data) {
                    $("#webcam-img").attr("data-src", data.imgURL);
                    $("#webcam-url").attr("href", data.imgURL);
                }
            });
        },

        /** Update webcamimage on stott.no */
        updateImage: function() {
            $.ajax({
                url: "https://www.stott.no/wp-content/themes/gotomeloy/parts/ajax-get-webcam-image.inc.php",
                dataType: 'json',
                success: function(data) {
                    $("#webcam-img").attr("src", data.imgURL);
                    $("#webcam-url").attr("href", data.imgURL);
                }
            });
        }
    };

    /** Update webcam image every 2 minutes */
    /** ================================================== */
    window.setInterval(function(){
        templateFunctions.updateImage();
    }, 121e3);

    /** LOAD */
    /** ================================================== */
    $(window).bind("load", function() {
        /** Load template functions */
        templateFunctions.filtering();
        templateFunctions.getImage();
        filterSelection("all") // Execute the function and show all columns
        
    });
})(jQuery);

function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("column");
    if (c == "all") c = "";
    // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
    for (i = 0; i < x.length; i++) {
        filterRemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) filterAddClass(x[i], "show");
    }
}

        // Show filtered elements
function filterAddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
            element.className += " " + arr2[i];
        }
    }
}

// Hide elements that are not selected
function filterRemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1); 
        }
    }
    element.className = arr1.join(" ");
}

/*/ Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
*/

+function($) {
    "use strict";

    $(window).on('load', function(){
        // Add swipe functionality on carousel for touch devices.
        $(".carousel").swipe({
            swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
                if (direction == "left") $(this).carousel("next");
                if (direction == "right") $(this).carousel("prev");
            },
            allowPageScroll: "vertical"
        });
    });
}(jQuery);



'use strict';
window.gmapScriptLoaded = function(){
    $(window).trigger('gmapScriptLoaded');
};
(function($, window){
    'namespace lazymap';
    $.fn.lazymap = function(options) {
        var $window = $(window),
            $body = $('body'),
            windowHeight = $window.height(),
            windowScrollTop = 0,
            apiScriptLoaded = false,
            apiScriptLoading = false,
            $settings = $.extend({
                zoomAttr: 'data-zoom',
                locationAttr: 'data-locations',
                keepAttributes: ['class'],
                apiKey: '',
                culture: ''
            }, options);
        function debounce (delay, fn) {
            var timer = null;
            return function() {
                var context = this,
                    args = arguments;
                clearTimeout(timer);
                timer = setTimeout( function(){ fn.apply( context, args ); }, delay );
            };
        }
        function throttle (delay, fn) {
            var last,
                deferTimer;
            return function() {
                var context = this,
                    args = arguments,
                    now = +new Date;
                if( last && now < last + delay )
                {
                    clearTimeout(deferTimer);
                    deferTimer = setTimeout( function(){ last = now; fn.apply( context, args ); }, delay );
                }
                else
                {
                    last = now;
                    fn.apply( context, args );
                }
            };
        }
        var ret = this.each(function() {
            var obj = this;
            if (this.lazymap || !$(this).hasClass('map')) return;
            obj.lazymap = {
                // latitude: 0,
                // longitude: 0,
                zoom: 0,
                removeData: function(A) {
                    var attributes = $.map(A.attributes, function(item) {
                        return item.name;
                    });
                    $.each(attributes, function(i, attr) {
                        $.each($settings.keepAttributes, function(i, keepAttr) {
                            if (attr != keepAttr && A.hasAttribute(attr)) {
                                $(A).removeAttr(attr);
                            }
                        })
                    });
                },
                createMap: function() {
                    var O = this;
                    windowScrollTop = $window.scrollTop();
                    if ($(obj).hasClass('loaded'))
                        return true;
                    if($(obj).offset().top - windowScrollTop > windowHeight * 1)
                        return true;
                    if( !apiScriptLoaded && !apiScriptLoading ) {
                        $body.append( '<script async defer src="https://maps.googleapis.com/maps/api/js?key=' + $settings.apiKey + '&callback=gmapScriptLoaded&language=' + $settings.culture + '"></script>' );
                        apiScriptLoading = true;
                    }
                    if( !apiScriptLoaded ) return true;
                    O.zoom = parseInt($(obj).attr($settings.zoomAttr));

                    var settingsToParse = $(obj).attr($settings.locationAttr).split("], ");
                    var index = 0;
                    var values = [];
                    settingsToParse.forEach(function(el) {
                        if ((index + 1) < settingsToParse.length) {
                            el = el + "]";
                        }
                        values[index] = JSON.parse(el);
                        index++;
                    });

                    var position = new google.maps.LatLng(values[0][0], values[0][1]);
                    var map = new google.maps.Map(obj, {
                        center: position,
                        zoom: O.zoom
                    });

                    values.forEach(function(val) {
                        var tmp = new google.maps.Marker({
                            position: new google.maps.LatLng(val[0], val[1]),
                            map: map,
                            animation: google.maps.Animation.DROP,
                            icon: ''  
                        }); 
                    });
                    
                    O.removeData(obj);
                    $(obj).addClass("loaded");
                },
                listen: function() {
                    var O = this;
                    $window
                    .on('gmapScriptLoaded', function() {
                        apiScriptLoaded = true;
                        O.createMap();
                    })
                    .on('load scroll', throttle(250, O.createMap ))
                    .on('resize', debounce(250, function() {
                        windowHeight = $window.height();
                        O.createMap();
                    }))
                }
            }
            obj.lazymap.listen();
        })
        return ret.length === 1 ? ret[0] : ret;
    }
})(jQuery, window, document);