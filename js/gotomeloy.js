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
