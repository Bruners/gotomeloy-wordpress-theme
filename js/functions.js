
document.addEventListener("DOMContentLoaded", function () {
  yall({});
});

/*!
 * Bootstrap v3.4.1 (https://getbootstrap.com/)
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
/*!
 * Generated using the Bootstrap Customizer (https://getbootstrap.com/docs/3.4/customize/))
 * Config saved to config.json
 */
if (typeof jQuery === "undefined") {
    throw new Error("Bootstrap's JavaScript requires jQuery");
}

+function($) {
    "use strict";
    var version = $.fn.jquery.split(" ")[0].split(".");
    if (version[0] < 2 && version[1] < 9 || version[0] == 1 && version[1] == 9 && version[2] < 1 || version[0] > 3) {
        throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4");
    }
}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($) {
    "use strict";
    // CAROUSEL CLASS DEFINITION
    // =========================
    var Carousel = function(element, options) {
        this.$element = $(element);
        this.$indicators = this.$element.find(".carousel-indicators");
        this.options = options;
        this.paused = null;
        this.sliding = null;
        this.interval = null;
        this.$active = null;
        this.$items = null;
        this.options.keyboard && this.$element.on("keydown.bs.carousel", $.proxy(this.keydown, this));
        this.options.pause == "hover" && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", $.proxy(this.pause, this)).on("mouseleave.bs.carousel", $.proxy(this.cycle, this));
    };
    Carousel.VERSION = "3.4.1";
    Carousel.TRANSITION_DURATION = 600;
    Carousel.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: true,
        keyboard: true
    };
    Carousel.prototype.keydown = function(e) {
        if (/input|textarea/i.test(e.target.tagName)) return;
        switch (e.which) {
          case 37:
            this.prev();
            break;

          case 39:
            this.next();
            break;

          default:
            return;
        }
        e.preventDefault();
    };
    Carousel.prototype.cycle = function(e) {
        e || (this.paused = false);
        this.interval && clearInterval(this.interval);
        this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));
        return this;
    };
    Carousel.prototype.getItemIndex = function(item) {
        this.$items = item.parent().children(".item");
        return this.$items.index(item || this.$active);
    };
    Carousel.prototype.getItemForDirection = function(direction, active) {
        var activeIndex = this.getItemIndex(active);
        var willWrap = direction == "prev" && activeIndex === 0 || direction == "next" && activeIndex == this.$items.length - 1;
        if (willWrap && !this.options.wrap) return active;
        var delta = direction == "prev" ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this.$items.length;
        return this.$items.eq(itemIndex);
    };
    Carousel.prototype.to = function(pos) {
        var that = this;
        var activeIndex = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (pos > this.$items.length - 1 || pos < 0) return;
        if (this.sliding) return this.$element.one("slid.bs.carousel", function() {
            that.to(pos);
        });
        // yes, "slid"
        if (activeIndex == pos) return this.pause().cycle();
        return this.slide(pos > activeIndex ? "next" : "prev", this.$items.eq(pos));
    };
    Carousel.prototype.pause = function(e) {
        e || (this.paused = true);
        if (this.$element.find(".next, .prev").length && $.support.transition) {
            this.$element.trigger($.support.transition.end);
            this.cycle(true);
        }
        this.interval = clearInterval(this.interval);
        return this;
    };
    Carousel.prototype.next = function() {
        if (this.sliding) return;
        return this.slide("next");
    };
    Carousel.prototype.prev = function() {
        if (this.sliding) return;
        return this.slide("prev");
    };
    Carousel.prototype.slide = function(type, next) {
        var $active = this.$element.find(".item.active");
        var $next = next || this.getItemForDirection(type, $active);
        var isCycling = this.interval;
        var direction = type == "next" ? "left" : "right";
        var that = this;
        if ($next.hasClass("active")) return this.sliding = false;
        var relatedTarget = $next[0];
        var slideEvent = $.Event("slide.bs.carousel", {
            relatedTarget: relatedTarget,
            direction: direction
        });
        this.$element.trigger(slideEvent);
        if (slideEvent.isDefaultPrevented()) return;
        this.sliding = true;
        isCycling && this.pause();
        if (this.$indicators.length) {
            this.$indicators.find(".active").removeClass("active");
            var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)]);
            $nextIndicator && $nextIndicator.addClass("active");
        }
        var slidEvent = $.Event("slid.bs.carousel", {
            relatedTarget: relatedTarget,
            direction: direction
        });
        // yes, "slid"
        if ($.support.transition && this.$element.hasClass("slide")) {
            $next.addClass(type);
            if (typeof $next === "object" && $next.length) {
                $next[0].offsetWidth;
            }
            $active.addClass(direction);
            $next.addClass(direction);
            $active.one("bsTransitionEnd", function() {
                $next.removeClass([ type, direction ].join(" ")).addClass("active");
                $active.removeClass([ "active", direction ].join(" "));
                that.sliding = false;
                setTimeout(function() {
                    that.$element.trigger(slidEvent);
                }, 0);
            }).emulateTransitionEnd(Carousel.TRANSITION_DURATION);
        } else {
            $active.removeClass("active");
            $next.addClass("active");
            this.sliding = false;
            this.$element.trigger(slidEvent);
        }
        isCycling && this.cycle();
        return this;
    };
    // CAROUSEL PLUGIN DEFINITION
    // ==========================
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.carousel");
            var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == "object" && option);
            var action = typeof option == "string" ? option : options.slide;
            if (!data) $this.data("bs.carousel", data = new Carousel(this, options));
            if (typeof option == "number") data.to(option); else if (action) data[action](); else if (options.interval) data.pause().cycle();
        });
    }
    var old = $.fn.carousel;
    $.fn.carousel = Plugin;
    $.fn.carousel.Constructor = Carousel;
    // CAROUSEL NO CONFLICT
    // ====================
    $.fn.carousel.noConflict = function() {
        $.fn.carousel = old;
        return this;
    };
    // CAROUSEL DATA-API
    // =================
    var clickHandler = function(e) {
        var $this = $(this);
        var href = $this.attr("href");
        if (href) {
            href = href.replace(/.*(?=#[^\s]+$)/, "");
        }
        var target = $this.attr("data-target") || href;
        var $target = $(document).find(target);
        if (!$target.hasClass("carousel")) return;
        var options = $.extend({}, $target.data(), $this.data());
        var slideIndex = $this.attr("data-slide-to");
        if (slideIndex) options.interval = false;
        Plugin.call($target, options);
        if (slideIndex) {
            $target.data("bs.carousel").to(slideIndex);
        }
        e.preventDefault();
    };
    $(document).on("click.bs.carousel.data-api", "[data-slide]", clickHandler).on("click.bs.carousel.data-api", "[data-slide-to]", clickHandler);
    $(window).on("load", function() {
        $('[data-ride="carousel"]').each(function() {
            var $carousel = $(this);
            Plugin.call($carousel, $carousel.data());
        });
    });
}(jQuery);

/* ========================================================================
 * Gotomeloy functions all pages
 * ======================================================================== */
+function($) {
    "use strict";
    /** Viewport dimensions */
    var ww = $(window).width();
    var wh = $(window).height();
    /** Adjust components to viewport dimensions */
    $(".fh").css("height", wh + "px");
    var hh = wh - $(".site-header").height();
    $(".hero.small").css("height", hh * .7 + "px");
    $(".hero.medium").css("height", hh * .8 + "px");
    $(".hero.big").css("height", hh * .9 + "px");
    $(".hero.full").css("height", hh + "px");
    /** Vertical center */
    $(".vcenter").each(function() {
        $(this).css("top", ($(this).parent().height() - $(this).height()) / 2 + "px");
    });
    $("#menu-toggle").click(function() {
        $("body").toggleClass("menu-open");
        return false;
    });
    if (ww <= 1e3) {
        $("#primary-menu li a").click(function() {
            $("#menu-toggle").trigger("click");
        });
    }
    /** FIX */
    function fix() {
        /** Adjust components to viewport dimensions */
        $(".fh").css("height", wh + "px");
        /** Hero heights */
        var hh = wh - $(".site-header").height();
        $(".hero.small").css("height", hh * .7 + "px");
        $(".hero.medium").css("height", hh * .8 + "px");
        $(".hero.big").css("height", hh * .9 + "px");
        $(".hero.full").css("height", hh + "px");
        /** Vertical center */
        $(".vcenter").each(function() {
            $(this).css("top", ($(this).parent().height() - $(this).height()) / 2 + "px");
        });
    }
    // grab the initial top offset of the navigation
    var content_offset_top = $("#site-body").offset().top;
    // our function that decides weather the navigation bar should have "fixed" css position or not.
    function sticky_navigation() {
        var scroll_top = $(window).scrollTop();
        // our current vertical position from the top
        // if we've scrolled more than the navigation, change its position to fixed to stick to top,
        // otherwise change it back to relative
        if (scroll_top + 70 >= content_offset_top) {
            $("body").addClass("sticky");
        } else {
            $("body").removeClass("sticky");
        }
    }
    /** LOAD */

    $(window).on('load', function(){
        fix();
        sticky_navigation();

        $('.map').lazymap({
            apiKey: 'AIzaSyAWe_W4EBKsLh6r582q_xyP-GbY7Am761E'
        });
        // Resize image containers using background-image
        $(".iBG").each(function() {
            $(this).css("background-image", "url(" + $(this).attr("data-img") + ")");
        });
        // Resize image containers using background-image
        $(".cBG").each(function() {
            $(this).css("background-image", $(this).attr("data-img"));
        });
        $(".scroll-down").click(function() {
            event.preventDefault();
            $("html, body").animate({
                scrollTop: $("#site-body").offset().top
            }, "slow", "swing");
        });
        $(".scroll-contact").click(function() {
            event.preventDefault();
            $("html, body").animate({
                scrollTop: $("#contact-us").offset().top
            }, "slow", "swing");
            fbq("track", "Contact");
        });
        $(".scroll-booking").click(function() {
            event.preventDefault();
            $("html, body").animate({
                scrollTop: $('[id^="bokun-"]').offset().top - 100
            }, "slow", "swing");
        });
        $(".back2top").click(function() {
            $("html, body").animate({
                scrollTop: 0
            }, 1e3);
        });
        /* Apply fancybox to multiple items */
        $("a[href$='.jpg'],a[href$='.png'],a[href$='.gif'],a.iframe,a#webcam-url").fancybox({
            iframe: {
                preload: false
            }
        });
        // Move carousel caption into new-caption-area
        //jQuery('.carousel').carousel();
        var caption = $("div.item:nth-child(1) .carousel-caption");
        $(".new-caption-area").html(caption.html());
        caption.css("display", "none");
        $("#carousel-promo-video").on("slide.bs.carousel", function(evt) {
            var caption = $("div.item:nth-child(" + ($(evt.relatedTarget).index() + 1) + ") .carousel-caption");
            $(".new-caption-area").html(caption.html());
            caption.css("display", "none");
            // Remove carousel video after carousel sliding
            $(".yt-video").children("iframe").remove();
            $(".yt-video").removeClass("player");
            $(".vm-video").children("iframe").remove();
            $(".vm-video").removeClass("player");
        });
        // Replace carousel <img> with video on click
        var yt_videos = $(".yt-video");
        var vm_videos = $(".vm-video");
        yt_videos.on("click", function() {
            var that = $(this);
            setTimeout(function() {
                var YTid = that.data("yt_id");
                that.addClass("player").append('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + YTid + '?autoplay=1?rel=0" frameborder="0" allowfullscreen></iframe>');
            }, 400);
        });
        vm_videos.on("click", function() {
            var that = $(this);
            setTimeout(function() {
                var VMid = that.data("vm_id");
                that.addClass("player").append('<iframe width="560" height="315" src="https://player.vimeo.com/video/' + VMid + '" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
            }, 400);
        });
        // Fix Instagram Feed Version 1.10.2 (Smash Balloon) not working with latest fontawesome
        jQuery(".fa.fa-instagram").removeClass("fa").addClass("fab");
    });
    /** RESIZE */
    $(window).resize(function() {
        /** Viewport dimensions */
        ww = $(window).width();
        wh = $(window).height();
        fix();
        sticky_navigation();
    });
    // and run it again every time you scroll
    $(window).scroll(function() {
        sticky_navigation();
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

/* ========================================================================
 * Bootstrap: modal.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#modals
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($) {
    "use strict";
    // MODAL CLASS DEFINITION
    // ======================
    var Modal = function(element, options) {
        this.options = options;
        this.$body = $(document.body);
        this.$element = $(element);
        this.$dialog = this.$element.find(".modal-dialog");
        this.$backdrop = null;
        this.isShown = null;
        this.originalBodyPad = null;
        this.scrollbarWidth = 0;
        this.ignoreBackdropClick = false;
        this.fixedContent = ".navbar-fixed-top, .navbar-fixed-bottom";
        if (this.options.remote) {
            this.$element.find(".modal-content").load(this.options.remote, $.proxy(function() {
                this.$element.trigger("loaded.bs.modal");
            }, this));
        }
    };
    Modal.VERSION = "3.4.1";
    Modal.TRANSITION_DURATION = 300;
    Modal.BACKDROP_TRANSITION_DURATION = 150;
    Modal.DEFAULTS = {
        backdrop: true,
        keyboard: true,
        show: true
    };
    Modal.prototype.toggle = function(_relatedTarget) {
        return this.isShown ? this.hide() : this.show(_relatedTarget);
    };
    Modal.prototype.show = function(_relatedTarget) {
        var that = this;
        var e = $.Event("show.bs.modal", {
            relatedTarget: _relatedTarget
        });
        this.$element.trigger(e);
        if (this.isShown || e.isDefaultPrevented()) return;
        this.isShown = true;
        this.checkScrollbar();
        this.setScrollbar();
        this.$body.addClass("modal-open");
        this.escape();
        this.resize();
        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', $.proxy(this.hide, this));
        this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            that.$element.one("mouseup.dismiss.bs.modal", function(e) {
                if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true;
            });
        });
        this.backdrop(function() {
            var transition = $.support.transition && that.$element.hasClass("fade");
            if (!that.$element.parent().length) {
                that.$element.appendTo(that.$body);
            }
            that.$element.show().scrollTop(0);
            that.adjustDialog();
            if (transition) {
                that.$element[0].offsetWidth;
            }
            that.$element.addClass("in");
            that.enforceFocus();
            var e = $.Event("shown.bs.modal", {
                relatedTarget: _relatedTarget
            });
            transition ? that.$dialog.one("bsTransitionEnd", function() {
                that.$element.trigger("focus").trigger(e);
            }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger("focus").trigger(e);
        });
    };
    Modal.prototype.hide = function(e) {
        if (e) e.preventDefault();
        e = $.Event("hide.bs.modal");
        this.$element.trigger(e);
        if (!this.isShown || e.isDefaultPrevented()) return;
        this.isShown = false;
        this.escape();
        this.resize();
        $(document).off("focusin.bs.modal");
        this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal");
        this.$dialog.off("mousedown.dismiss.bs.modal");
        $.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal();
    };
    Modal.prototype.enforceFocus = function() {
        $(document).off("focusin.bs.modal").on("focusin.bs.modal", $.proxy(function(e) {
            if (document !== e.target && this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                this.$element.trigger("focus");
            }
        }, this));
    };
    Modal.prototype.escape = function() {
        if (this.isShown && this.options.keyboard) {
            this.$element.on("keydown.dismiss.bs.modal", $.proxy(function(e) {
                e.which == 27 && this.hide();
            }, this));
        } else if (!this.isShown) {
            this.$element.off("keydown.dismiss.bs.modal");
        }
    };
    Modal.prototype.resize = function() {
        if (this.isShown) {
            $(window).on("resize.bs.modal", $.proxy(this.handleUpdate, this));
        } else {
            $(window).off("resize.bs.modal");
        }
    };
    Modal.prototype.hideModal = function() {
        var that = this;
        this.$element.hide();
        this.backdrop(function() {
            that.$body.removeClass("modal-open");
            that.resetAdjustments();
            that.resetScrollbar();
            that.$element.trigger("hidden.bs.modal");
        });
    };
    Modal.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove();
        this.$backdrop = null;
    };
    Modal.prototype.backdrop = function(callback) {
        var that = this;
        var animate = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate;
            this.$backdrop = $(document.createElement("div")).addClass("modal-backdrop " + animate).appendTo(this.$body);
            this.$element.on("click.dismiss.bs.modal", $.proxy(function(e) {
                if (this.ignoreBackdropClick) {
                    this.ignoreBackdropClick = false;
                    return;
                }
                if (e.target !== e.currentTarget) return;
                this.options.backdrop == "static" ? this.$element[0].focus() : this.hide();
            }, this));
            if (doAnimate) this.$backdrop[0].offsetWidth;
            // force reflow
            this.$backdrop.addClass("in");
            if (!callback) return;
            doAnimate ? this.$backdrop.one("bsTransitionEnd", callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var callbackRemove = function() {
                that.removeBackdrop();
                callback && callback();
            };
            $.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
        } else if (callback) {
            callback();
        }
    };
    // these following methods are used to handle overflowing modals
    Modal.prototype.handleUpdate = function() {
        this.adjustDialog();
    };
    Modal.prototype.adjustDialog = function() {
        var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ""
        });
    };
    Modal.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        });
    };
    Modal.prototype.checkScrollbar = function() {
        var fullWindowWidth = window.innerWidth;
        if (!fullWindowWidth) {
            // workaround for missing window.innerWidth in IE8
            var documentElementRect = document.documentElement.getBoundingClientRect();
            fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
        this.scrollbarWidth = this.measureScrollbar();
    };
    Modal.prototype.setScrollbar = function() {
        var bodyPad = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "";
        var scrollbarWidth = this.scrollbarWidth;
        if (this.bodyIsOverflowing) {
            this.$body.css("padding-right", bodyPad + scrollbarWidth);
            $(this.fixedContent).each(function(index, element) {
                var actualPadding = element.style.paddingRight;
                var calculatedPadding = $(element).css("padding-right");
                $(element).data("padding-right", actualPadding).css("padding-right", parseFloat(calculatedPadding) + scrollbarWidth + "px");
            });
        }
    };
    Modal.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad);
        $(this.fixedContent).each(function(index, element) {
            var padding = $(element).data("padding-right");
            $(element).removeData("padding-right");
            element.style.paddingRight = padding ? padding : "";
        });
    };
    Modal.prototype.measureScrollbar = function() {
        // thx walsh
        var scrollDiv = document.createElement("div");
        scrollDiv.className = "modal-scrollbar-measure";
        this.$body.append(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        this.$body[0].removeChild(scrollDiv);
        return scrollbarWidth;
    };
    // MODAL PLUGIN DEFINITION
    // =======================
    function Plugin(option, _relatedTarget) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.modal");
            var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == "object" && option);
            if (!data) $this.data("bs.modal", data = new Modal(this, options));
            if (typeof option == "string") data[option](_relatedTarget); else if (options.show) data.show(_relatedTarget);
        });
    }
    var old = $.fn.modal;
    $.fn.modal = Plugin;
    $.fn.modal.Constructor = Modal;
    // MODAL NO CONFLICT
    // =================
    $.fn.modal.noConflict = function() {
        $.fn.modal = old;
        return this;
    };
    // MODAL DATA-API
    // ==============
    $(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
        var $this = $(this);
        var href = $this.attr("href");
        var target = $this.attr("data-target") || href && href.replace(/.*(?=#[^\s]+$)/, "");
        // strip for ie7
        var $target = $(document).find(target);
        var option = $target.data("bs.modal") ? "toggle" : $.extend({
            remote: !/#/.test(href) && href
        }, $target.data(), $this.data());
        if ($this.is("a")) e.preventDefault();
        $target.one("show.bs.modal", function(showEvent) {
            if (showEvent.isDefaultPrevented()) return;
            // only register focus restorer if modal will actually get shown
            $target.one("hidden.bs.modal", function() {
                $this.is(":visible") && $this.trigger("focus");
            });
        });
        Plugin.call($target, option, this);
    });
}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
/* jshint latedef: false */
+function($) {
    "use strict";
    // COLLAPSE PUBLIC CLASS DEFINITION
    // ================================
    var Collapse = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, Collapse.DEFAULTS, options);
        this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],' + '[data-toggle="collapse"][data-target="#' + element.id + '"]');
        this.transitioning = null;
        if (this.options.parent) {
            this.$parent = this.getParent();
        } else {
            this.addAriaAndCollapsedClass(this.$element, this.$trigger);
        }
        if (this.options.toggle) this.toggle();
    };
    Collapse.VERSION = "3.4.1";
    Collapse.TRANSITION_DURATION = 350;
    Collapse.DEFAULTS = {
        toggle: true
    };
    Collapse.prototype.dimension = function() {
        var hasWidth = this.$element.hasClass("width");
        return hasWidth ? "width" : "height";
    };
    Collapse.prototype.show = function() {
        if (this.transitioning || this.$element.hasClass("in")) return;
        var activesData;
        var actives = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
        if (actives && actives.length) {
            activesData = actives.data("bs.collapse");
            if (activesData && activesData.transitioning) return;
        }
        var startEvent = $.Event("show.bs.collapse");
        this.$element.trigger(startEvent);
        if (startEvent.isDefaultPrevented()) return;
        if (actives && actives.length) {
            Plugin.call(actives, "hide");
            activesData || actives.data("bs.collapse", null);
        }
        var dimension = this.dimension();
        this.$element.removeClass("collapse").addClass("collapsing")[dimension](0).attr("aria-expanded", true);
        this.$trigger.removeClass("collapsed").attr("aria-expanded", true);
        this.transitioning = 1;
        var complete = function() {
            this.$element.removeClass("collapsing").addClass("collapse in")[dimension]("");
            this.transitioning = 0;
            this.$element.trigger("shown.bs.collapse");
        };
        if (!$.support.transition) return complete.call(this);
        var scrollSize = $.camelCase([ "scroll", dimension ].join("-"));
        this.$element.one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize]);
    };
    Collapse.prototype.hide = function() {
        if (this.transitioning || !this.$element.hasClass("in")) return;
        var startEvent = $.Event("hide.bs.collapse");
        this.$element.trigger(startEvent);
        if (startEvent.isDefaultPrevented()) return;
        var dimension = this.dimension();
        this.$element[dimension](this.$element[dimension]())[0].offsetHeight;
        this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", false);
        this.$trigger.addClass("collapsed").attr("aria-expanded", false);
        this.transitioning = 1;
        var complete = function() {
            this.transitioning = 0;
            this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
        };
        if (!$.support.transition) return complete.call(this);
        this.$element[dimension](0).one("bsTransitionEnd", $.proxy(complete, this)).emulateTransitionEnd(Collapse.TRANSITION_DURATION);
    };
    Collapse.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    };
    Collapse.prototype.getParent = function() {
        return $(document).find(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each($.proxy(function(i, element) {
            var $element = $(element);
            this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element);
        }, this)).end();
    };
    Collapse.prototype.addAriaAndCollapsedClass = function($element, $trigger) {
        var isOpen = $element.hasClass("in");
        $element.attr("aria-expanded", isOpen);
        $trigger.toggleClass("collapsed", !isOpen).attr("aria-expanded", isOpen);
    };
    function getTargetFromTrigger($trigger) {
        var href;
        var target = $trigger.attr("data-target") || (href = $trigger.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "");
        // strip for ie7
        return $(document).find(target);
    }
    // COLLAPSE PLUGIN DEFINITION
    // ==========================
    function Plugin(option) {
        return this.each(function() {
            var $this = $(this);
            var data = $this.data("bs.collapse");
            var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == "object" && option);
            if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false;
            if (!data) $this.data("bs.collapse", data = new Collapse(this, options));
            if (typeof option == "string") data[option]();
        });
    }
    var old = $.fn.collapse;
    $.fn.collapse = Plugin;
    $.fn.collapse.Constructor = Collapse;
    // COLLAPSE NO CONFLICT
    // ====================
    $.fn.collapse.noConflict = function() {
        $.fn.collapse = old;
        return this;
    };
    // COLLAPSE DATA-API
    // =================
    $(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(e) {
        var $this = $(this);
        if (!$this.attr("data-target")) e.preventDefault();
        var $target = getTargetFromTrigger($this);
        var data = $target.data("bs.collapse");
        var option = data ? "toggle" : $this.data();
        Plugin.call($target, option);
    });
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.4.1
 * https://getbootstrap.com/docs/3.4/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2019 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function($) {
    "use strict";
    // CSS TRANSITION SUPPORT (Shoutout: https://modernizr.com/)
    // ============================================================
    function transitionEnd() {
        var el = document.createElement("bootstrap");
        var transEndEventNames = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return {
                    end: transEndEventNames[name]
                };
            }
        }
        return false;
    }
    // https://blog.alexmaccaw.com/css-transitions
    $.fn.emulateTransitionEnd = function(duration) {
        var called = false;
        var $el = this;
        $(this).one("bsTransitionEnd", function() {
            called = true;
        });
        var callback = function() {
            if (!called) $($el).trigger($.support.transition.end);
        };
        setTimeout(callback, duration);
        return this;
    };
    $(function() {
        $.support.transition = transitionEnd();
        if (!$.support.transition) return;
        $.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function(e) {
                if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
            }
        };
    });
}(jQuery);