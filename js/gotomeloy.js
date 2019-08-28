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


document.addEventListener("DOMContentLoaded", function() {
    if (document.querySelectorAll("#map-container").length > 0) {
        if (document.querySelector("html").lang) lang = document.querySelector("html").lang; else lang = "en";
        var js_file = document.createElement("script");
        js_file.type = "text/javascript";
        js_file.src = "https://maps.googleapis.com/maps/api/js?callback=initMap&key=AIzaSyAWe_W4EBKsLh6r582q_xyP-GbY7Am761E&language=" + lang;
        document.getElementsByTagName("head")[0].appendChild(js_file);
    }
});

/*
 * declare map as a global variable
 */
var map;

/*
 * use google maps api built-in mechanism to attach dom events
 */
function initMap() {
    /*
     * create map
     */
    var map = new google.maps.Map(document.getElementById("map-container"), {
        center: new google.maps.LatLng(67.0120865, 13.8881624),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        panControl: false,
        rotateControl: false,
        streetViewControl: false
    });
    /*
     * create infowindow (which will be used by markers)
     */
    var infoWindow = new google.maps.InfoWindow();
    /*
     * marker creater function (acts as a closure for html parameter)
     */
    function createMarker(options, html) {
        var marker = new google.maps.Marker(options);
        if (html) {
            google.maps.event.addListener(marker, "click", function() {
                infoWindow.setContent(html);
                infoWindow.open(options.map, this);
            });
        }
        return marker;
    }
    /*
     * add markers to map
     */
    var pin_blue = {
        url: "../../../wp-content/themes/gotomeloy/img/map-pins/pin-blue-10.png"
    };
    /*
    new: 66.703641, 13.730335
    old: 66.704096,13.731034
     */
    var marker0 = createMarker({
        position: new google.maps.LatLng(66.925775, 13.43798),
        map: map,
        icon: pin_blue
    }, "<div id='infowindow_content'><p><strong>Støtt Brygge</strong><br />8159 Støtt<br>Norge<br />+47 400 21 212</p><a href='https://www.stott.no' target='_blank'>stott.no</a> | <a href='mailto:eaa@stott.no'>eaa@stott.no</a></div>");
}

