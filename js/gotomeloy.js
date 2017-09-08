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
    /** TEMPLATE FUNCTIONS */
    /** ================================================== */
    var templateFunctions = {
        /** Nav */
        nav: function() {
            if (ww > 960) {
                $(".trigger-nav").css("display", "none");
                $(".site-menu").css("display", "block");
            } else {
                $(".trigger-nav").css("display", "block");
                $(".site-menu").css("display", "none");
            }
            $(".trigger-nav").on("click", function() {
                if (!$(this).hasClass("open-nav")) {
                    $(this).addClass("open-nav");
                    toggleNav(true);
                } else {
                    $(this).removeClass("open-nav");
                    toggleNav(false);
                }
            });
            $(window).bind("resize", function() {
                if (ww > 960) {
                    $(".trigger-nav").css("display", "none");
                    $(".site-menu").css("display", "block");
                    if ($(".trigger-nav").hasClass("open-nav")) {
                        $(".trigger-nav").removeClass("open-nav");
                    }
                } else {
                    $(".trigger-nav").css("display", "block");
                    $(".site-menu").css("display", "none");
                }
            });
            $(window).on("scroll", function() {
                if (ww > 960) {
                    if ($(".trigger-nav").hasClass("open-nav")) {
                        $(".trigger-nav").removeClass("open-nav");
                        toggleNav(false);
                    }
                }
            });
            function toggleNav(bool) {
                if (bool === true) $(".site-menu").slideDown(); else $(".site-menu").slideUp();
            }
        },
        /** Images */
        imgs: function() {
            /** Background images */
            $(".iBG").each(function() {
                $(this).css("background-image", "url(" + $(this).attr("data-img") + ")");
            });
            /** Parallax */
            if (ww > 960) {
                $(window).bind("scroll", function() {
                    var pos = -($(this).scrollTop() / 1.3);
                    var coords = "50%" + pos + "px";
                    $(".parallax").each(function() {
                        $(this).css("background-position", coords);
                    });
                });
            }
        },
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
                var filter = $(this).attr("data-filter");
                container.isotope({
                    itemSelector: ".entry",
                    filter: filter
                });
            });
        },
        /** Back2top */
        back2top: function() {
            $(".back2top").on("click", function() {
                $("html, body").animate({
                    scrollTop: 0
                }, 1e3);
            });
        },
        /** fitvids */
        fitvids: function() {
            $("#site-body").fitVids();
        }
    };
    /** FIX */
    /** ================================================== */
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
    /** LOAD */
    /** ================================================== */
    $(window).bind("load", function() {
        $(".preloader").delay(200).fadeOut();
        /** Load template functions */
        templateFunctions.nav();
        templateFunctions.imgs();
        templateFunctions.grid();
        templateFunctions.masonry();
        templateFunctions.filtering();
        templateFunctions.back2top();
        templateFunctions.fitvids();
        fix();
    });
    /** RESIZE */
    /** ================================================== */
    $(window).bind("resize", function() {
        /** Viewport dimensions */
        ww = $(window).width();
        wh = $(window).height();
        /** Load template functions */
        templateFunctions.grid();
        templateFunctions.masonry();
        fix();
    });
})(jQuery);

/*!
 * headroom.js v0.9.4 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2017 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */
!function(a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define([], b) : "object" == typeof exports ? module.exports = b() : a.Headroom = b();
}(this, function() {
    "use strict";
    function a(a) {
        this.callback = a, this.ticking = !1;
    }
    function b(a) {
        return a && "undefined" != typeof window && (a === window || a.nodeType);
    }
    function c(a) {
        if (arguments.length <= 0) throw new Error("Missing arguments in extend function");
        var d, e, f = a || {};
        for (e = 1; e < arguments.length; e++) {
            var g = arguments[e] || {};
            for (d in g) "object" != typeof f[d] || b(f[d]) ? f[d] = f[d] || g[d] : f[d] = c(f[d], g[d]);
        }
        return f;
    }
    function d(a) {
        return a === Object(a) ? a : {
            down: a,
            up: a
        };
    }
    function e(a, b) {
        b = c(b, e.options), this.lastKnownScrollY = 0, this.elem = a, this.tolerance = d(b.tolerance), 
        this.classes = b.classes, this.offset = b.offset, this.scroller = b.scroller, this.initialised = !1, 
        this.onPin = b.onPin, this.onUnpin = b.onUnpin, this.onTop = b.onTop, this.onNotTop = b.onNotTop, 
        this.onBottom = b.onBottom, this.onNotBottom = b.onNotBottom;
    }
    var f = {
        bind: !!function() {}.bind,
        classList: "classList" in document.documentElement,
        rAF: !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)
    };
    return window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame, 
    a.prototype = {
        constructor: a,
        update: function() {
            this.callback && this.callback(), this.ticking = !1;
        },
        requestTick: function() {
            this.ticking || (requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this))), 
            this.ticking = !0);
        },
        handleEvent: function() {
            this.requestTick();
        }
    }, e.prototype = {
        constructor: e,
        init: function() {
            if (e.cutsTheMustard) return this.debouncer = new a(this.update.bind(this)), this.elem.classList.add(this.classes.initial), 
            setTimeout(this.attachEvent.bind(this), 100), this;
        },
        destroy: function() {
            var a = this.classes;
            this.initialised = !1;
            for (var b in a) a.hasOwnProperty(b) && this.elem.classList.remove(a[b]);
            this.scroller.removeEventListener("scroll", this.debouncer, !1);
        },
        attachEvent: function() {
            this.initialised || (this.lastKnownScrollY = this.getScrollY(), this.initialised = !0, 
            this.scroller.addEventListener("scroll", this.debouncer, !1), this.debouncer.handleEvent());
        },
        unpin: function() {
            var a = this.elem.classList, b = this.classes;
            !a.contains(b.pinned) && a.contains(b.unpinned) || (a.add(b.unpinned), a.remove(b.pinned), 
            this.onUnpin && this.onUnpin.call(this));
        },
        pin: function() {
            var a = this.elem.classList, b = this.classes;
            a.contains(b.unpinned) && (a.remove(b.unpinned), a.add(b.pinned), this.onPin && this.onPin.call(this));
        },
        top: function() {
            var a = this.elem.classList, b = this.classes;
            a.contains(b.top) || (a.add(b.top), a.remove(b.notTop), this.onTop && this.onTop.call(this));
        },
        notTop: function() {
            var a = this.elem.classList, b = this.classes;
            a.contains(b.notTop) || (a.add(b.notTop), a.remove(b.top), this.onNotTop && this.onNotTop.call(this));
        },
        bottom: function() {
            var a = this.elem.classList, b = this.classes;
            a.contains(b.bottom) || (a.add(b.bottom), a.remove(b.notBottom), this.onBottom && this.onBottom.call(this));
        },
        notBottom: function() {
            var a = this.elem.classList, b = this.classes;
            a.contains(b.notBottom) || (a.add(b.notBottom), a.remove(b.bottom), this.onNotBottom && this.onNotBottom.call(this));
        },
        getScrollY: function() {
            return void 0 !== this.scroller.pageYOffset ? this.scroller.pageYOffset : void 0 !== this.scroller.scrollTop ? this.scroller.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop;
        },
        getViewportHeight: function() {
            return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        },
        getElementPhysicalHeight: function(a) {
            return Math.max(a.offsetHeight, a.clientHeight);
        },
        getScrollerPhysicalHeight: function() {
            return this.scroller === window || this.scroller === document.body ? this.getViewportHeight() : this.getElementPhysicalHeight(this.scroller);
        },
        getDocumentHeight: function() {
            var a = document.body, b = document.documentElement;
            return Math.max(a.scrollHeight, b.scrollHeight, a.offsetHeight, b.offsetHeight, a.clientHeight, b.clientHeight);
        },
        getElementHeight: function(a) {
            return Math.max(a.scrollHeight, a.offsetHeight, a.clientHeight);
        },
        getScrollerHeight: function() {
            return this.scroller === window || this.scroller === document.body ? this.getDocumentHeight() : this.getElementHeight(this.scroller);
        },
        isOutOfBounds: function(a) {
            var b = a < 0, c = a + this.getScrollerPhysicalHeight() > this.getScrollerHeight();
            return b || c;
        },
        toleranceExceeded: function(a, b) {
            return Math.abs(a - this.lastKnownScrollY) >= this.tolerance[b];
        },
        shouldUnpin: function(a, b) {
            var c = a > this.lastKnownScrollY, d = a >= this.offset;
            return c && d && b;
        },
        shouldPin: function(a, b) {
            var c = a < this.lastKnownScrollY, d = a <= this.offset;
            return c && b || d;
        },
        update: function() {
            var a = this.getScrollY(), b = a > this.lastKnownScrollY ? "down" : "up", c = this.toleranceExceeded(a, b);
            this.isOutOfBounds(a) || (a <= this.offset ? this.top() : this.notTop(), a + this.getViewportHeight() >= this.getScrollerHeight() ? this.bottom() : this.notBottom(), 
            this.shouldUnpin(a, c) ? this.unpin() : this.shouldPin(a, c) && this.pin(), this.lastKnownScrollY = a);
        }
    }, e.options = {
        tolerance: {
            up: 0,
            down: 0
        },
        offset: 0,
        scroller: window,
        classes: {
            pinned: "headroom--pinned",
            unpinned: "headroom--unpinned",
            top: "headroom--top",
            notTop: "headroom--not-top",
            bottom: "headroom--bottom",
            notBottom: "headroom--not-bottom",
            initial: "headroom"
        }
    }, e.cutsTheMustard = "undefined" != typeof f && f.rAF && f.bind && f.classList, 
    e;
});

/*!
 * Bootstrap v3.3.5 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
/*!
 * Generated using the Bootstrap Customizer (http://getbootstrap.com/customize/?id=0f92ae52e80210e53c75)
 * Config saved to config.json and https://gist.github.com/0f92ae52e80210e53c75
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery");

+function(t) {
    "use strict";
    var e = t.fn.jquery.split(" ")[0].split(".");
    if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || e[0] > 2) throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3");
}(jQuery), +function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var i = t(this), n = i.data("bs.alert");
            n || i.data("bs.alert", n = new o(this)), "string" == typeof e && n[e].call(i);
        });
    }
    var i = '[data-dismiss="alert"]', o = function(e) {
        t(e).on("click", i, this.close);
    };
    o.VERSION = "3.3.6", o.TRANSITION_DURATION = 150, o.prototype.close = function(e) {
        function i() {
            a.detach().trigger("closed.bs.alert").remove();
        }
        var n = t(this), s = n.attr("data-target");
        s || (s = n.attr("href"), s = s && s.replace(/.*(?=#[^\s]*$)/, ""));
        var a = t(s);
        e && e.preventDefault(), a.length || (a = n.closest(".alert")), a.trigger(e = t.Event("close.bs.alert")), 
        e.isDefaultPrevented() || (a.removeClass("in"), t.support.transition && a.hasClass("fade") ? a.one("bsTransitionEnd", i).emulateTransitionEnd(o.TRANSITION_DURATION) : i());
    };
    var n = t.fn.alert;
    t.fn.alert = e, t.fn.alert.Constructor = o, t.fn.alert.noConflict = function() {
        return t.fn.alert = n, this;
    }, t(document).on("click.bs.alert.data-api", i, o.prototype.close);
}(jQuery), +function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.button"), s = "object" == typeof e && e;
            n || o.data("bs.button", n = new i(this, s)), "toggle" == e ? n.toggle() : e && n.setState(e);
        });
    }
    var i = function(e, o) {
        this.$element = t(e), this.options = t.extend({}, i.DEFAULTS, o), this.isLoading = !1;
    };
    i.VERSION = "3.3.6", i.DEFAULTS = {
        loadingText: "loading..."
    }, i.prototype.setState = function(e) {
        var i = "disabled", o = this.$element, n = o.is("input") ? "val" : "html", s = o.data();
        e += "Text", null == s.resetText && o.data("resetText", o[n]()), setTimeout(t.proxy(function() {
            o[n](null == s[e] ? this.options[e] : s[e]), "loadingText" == e ? (this.isLoading = !0, 
            o.addClass(i).attr(i, i)) : this.isLoading && (this.isLoading = !1, o.removeClass(i).removeAttr(i));
        }, this), 0);
    }, i.prototype.toggle = function() {
        var t = !0, e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) {
            var i = this.$element.find("input");
            "radio" == i.prop("type") ? (i.prop("checked") && (t = !1), e.find(".active").removeClass("active"), 
            this.$element.addClass("active")) : "checkbox" == i.prop("type") && (i.prop("checked") !== this.$element.hasClass("active") && (t = !1), 
            this.$element.toggleClass("active")), i.prop("checked", this.$element.hasClass("active")), 
            t && i.trigger("change");
        } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active");
    };
    var o = t.fn.button;
    t.fn.button = e, t.fn.button.Constructor = i, t.fn.button.noConflict = function() {
        return t.fn.button = o, this;
    }, t(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(i) {
        var o = t(i.target);
        o.hasClass("btn") || (o = o.closest(".btn")), e.call(o, "toggle"), t(i.target).is('input[type="radio"]') || t(i.target).is('input[type="checkbox"]') || i.preventDefault();
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(e) {
        t(e.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(e.type));
    });
}(jQuery), +function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.carousel"), s = t.extend({}, i.DEFAULTS, o.data(), "object" == typeof e && e), a = "string" == typeof e ? e : s.slide;
            n || o.data("bs.carousel", n = new i(this, s)), "number" == typeof e ? n.to(e) : a ? n[a]() : s.interval && n.pause().cycle();
        });
    }
    var i = function(e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), 
        this.options = i, this.paused = null, this.sliding = null, this.interval = null, 
        this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", t.proxy(this.keydown, this)), 
        "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", t.proxy(this.pause, this)).on("mouseleave.bs.carousel", t.proxy(this.cycle, this));
    };
    i.VERSION = "3.3.6", i.TRANSITION_DURATION = 600, i.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0,
        keyboard: !0
    }, i.prototype.keydown = function(t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
              case 37:
                this.prev();
                break;

              case 39:
                this.next();
                break;

              default:
                return;
            }
            t.preventDefault();
        }
    }, i.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), 
        this;
    }, i.prototype.getItemIndex = function(t) {
        return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active);
    }, i.prototype.getItemForDirection = function(t, e) {
        var i = this.getItemIndex(e), o = "prev" == t && 0 === i || "next" == t && i == this.$items.length - 1;
        if (o && !this.options.wrap) return e;
        var n = "prev" == t ? -1 : 1, s = (i + n) % this.$items.length;
        return this.$items.eq(s);
    }, i.prototype.to = function(t) {
        var e = this, i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return t > this.$items.length - 1 || 0 > t ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            e.to(t);
        }) : i == t ? this.pause().cycle() : this.slide(t > i ? "next" : "prev", this.$items.eq(t));
    }, i.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition && (this.$element.trigger(t.support.transition.end), 
        this.cycle(!0)), this.interval = clearInterval(this.interval), this;
    }, i.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next");
    }, i.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev");
    }, i.prototype.slide = function(e, o) {
        var n = this.$element.find(".item.active"), s = o || this.getItemForDirection(e, n), a = this.interval, r = "next" == e ? "left" : "right", l = this;
        if (s.hasClass("active")) return this.sliding = !1;
        var h = s[0], d = t.Event("slide.bs.carousel", {
            relatedTarget: h,
            direction: r
        });
        if (this.$element.trigger(d), !d.isDefaultPrevented()) {
            if (this.sliding = !0, a && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var p = t(this.$indicators.children()[this.getItemIndex(s)]);
                p && p.addClass("active");
            }
            var c = t.Event("slid.bs.carousel", {
                relatedTarget: h,
                direction: r
            });
            return t.support.transition && this.$element.hasClass("slide") ? (s.addClass(e), 
            s[0].offsetWidth, n.addClass(r), s.addClass(r), n.one("bsTransitionEnd", function() {
                s.removeClass([ e, r ].join(" ")).addClass("active"), n.removeClass([ "active", r ].join(" ")), 
                l.sliding = !1, setTimeout(function() {
                    l.$element.trigger(c);
                }, 0);
            }).emulateTransitionEnd(i.TRANSITION_DURATION)) : (n.removeClass("active"), s.addClass("active"), 
            this.sliding = !1, this.$element.trigger(c)), a && this.cycle(), this;
        }
    };
    var o = t.fn.carousel;
    t.fn.carousel = e, t.fn.carousel.Constructor = i, t.fn.carousel.noConflict = function() {
        return t.fn.carousel = o, this;
    };
    var n = function(i) {
        var o, n = t(this), s = t(n.attr("data-target") || (o = n.attr("href")) && o.replace(/.*(?=#[^\s]+$)/, ""));
        if (s.hasClass("carousel")) {
            var a = t.extend({}, s.data(), n.data()), r = n.attr("data-slide-to");
            r && (a.interval = !1), e.call(s, a), r && s.data("bs.carousel").to(r), i.preventDefault();
        }
    };
    t(document).on("click.bs.carousel.data-api", "[data-slide]", n).on("click.bs.carousel.data-api", "[data-slide-to]", n), 
    t(window).on("load", function() {
        t('[data-ride="carousel"]').each(function() {
            var i = t(this);
            e.call(i, i.data());
        });
    });
}(jQuery), +function(t) {
    "use strict";
    function e(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"), i = i && /#[A-Za-z]/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var o = i && t(i);
        return o && o.length ? o : e.parent();
    }
    function i(i) {
        i && 3 === i.which || (t(n).remove(), t(s).each(function() {
            var o = t(this), n = e(o), s = {
                relatedTarget: this
            };
            n.hasClass("open") && (i && "click" == i.type && /input|textarea/i.test(i.target.tagName) && t.contains(n[0], i.target) || (n.trigger(i = t.Event("hide.bs.dropdown", s)), 
            i.isDefaultPrevented() || (o.attr("aria-expanded", "false"), n.removeClass("open").trigger(t.Event("hidden.bs.dropdown", s)))));
        }));
    }
    function o(e) {
        return this.each(function() {
            var i = t(this), o = i.data("bs.dropdown");
            o || i.data("bs.dropdown", o = new a(this)), "string" == typeof e && o[e].call(i);
        });
    }
    var n = ".dropdown-backdrop", s = '[data-toggle="dropdown"]', a = function(e) {
        t(e).on("click.bs.dropdown", this.toggle);
    };
    a.VERSION = "3.3.6", a.prototype.toggle = function(o) {
        var n = t(this);
        if (!n.is(".disabled, :disabled")) {
            var s = e(n), a = s.hasClass("open");
            if (i(), !a) {
                "ontouchstart" in document.documentElement && !s.closest(".navbar-nav").length && t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click", i);
                var r = {
                    relatedTarget: this
                };
                if (s.trigger(o = t.Event("show.bs.dropdown", r)), o.isDefaultPrevented()) return;
                n.trigger("focus").attr("aria-expanded", "true"), s.toggleClass("open").trigger(t.Event("shown.bs.dropdown", r));
            }
            return !1;
        }
    }, a.prototype.keydown = function(i) {
        if (/(38|40|27|32)/.test(i.which) && !/input|textarea/i.test(i.target.tagName)) {
            var o = t(this);
            if (i.preventDefault(), i.stopPropagation(), !o.is(".disabled, :disabled")) {
                var n = e(o), a = n.hasClass("open");
                if (!a && 27 != i.which || a && 27 == i.which) return 27 == i.which && n.find(s).trigger("focus"), 
                o.trigger("click");
                var r = " li:not(.disabled):visible a", l = n.find(".dropdown-menu" + r);
                if (l.length) {
                    var h = l.index(i.target);
                    38 == i.which && h > 0 && h--, 40 == i.which && h < l.length - 1 && h++, ~h || (h = 0), 
                    l.eq(h).trigger("focus");
                }
            }
        }
    };
    var r = t.fn.dropdown;
    t.fn.dropdown = o, t.fn.dropdown.Constructor = a, t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = r, this;
    }, t(document).on("click.bs.dropdown.data-api", i).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation();
    }).on("click.bs.dropdown.data-api", s, a.prototype.toggle).on("keydown.bs.dropdown.data-api", s, a.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", a.prototype.keydown);
}(jQuery), +function(t) {
    "use strict";
    function e(e, o) {
        return this.each(function() {
            var n = t(this), s = n.data("bs.modal"), a = t.extend({}, i.DEFAULTS, n.data(), "object" == typeof e && e);
            s || n.data("bs.modal", s = new i(this, a)), "string" == typeof e ? s[e](o) : a.show && s.show(o);
        });
    }
    var i = function(e, i) {
        this.options = i, this.$body = t(document.body), this.$element = t(e), this.$dialog = this.$element.find(".modal-dialog"), 
        this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, 
        this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, t.proxy(function() {
            this.$element.trigger("loaded.bs.modal");
        }, this));
    };
    i.VERSION = "3.3.6", i.TRANSITION_DURATION = 300, i.BACKDROP_TRANSITION_DURATION = 150, 
    i.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, i.prototype.toggle = function(t) {
        return this.isShown ? this.hide() : this.show(t);
    }, i.prototype.show = function(e) {
        var o = this, n = t.Event("show.bs.modal", {
            relatedTarget: e
        });
        this.$element.trigger(n), this.isShown || n.isDefaultPrevented() || (this.isShown = !0, 
        this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), 
        this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), 
        this.$dialog.on("mousedown.dismiss.bs.modal", function() {
            o.$element.one("mouseup.dismiss.bs.modal", function(e) {
                t(e.target).is(o.$element) && (o.ignoreBackdropClick = !0);
            });
        }), this.backdrop(function() {
            var n = t.support.transition && o.$element.hasClass("fade");
            o.$element.parent().length || o.$element.appendTo(o.$body), o.$element.show().scrollTop(0), 
            o.adjustDialog(), n && o.$element[0].offsetWidth, o.$element.addClass("in"), o.enforceFocus();
            var s = t.Event("shown.bs.modal", {
                relatedTarget: e
            });
            n ? o.$dialog.one("bsTransitionEnd", function() {
                o.$element.trigger("focus").trigger(s);
            }).emulateTransitionEnd(i.TRANSITION_DURATION) : o.$element.trigger("focus").trigger(s);
        }));
    }, i.prototype.hide = function(e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), 
        this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), 
        t(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), 
        this.$dialog.off("mousedown.dismiss.bs.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", t.proxy(this.hideModal, this)).emulateTransitionEnd(i.TRANSITION_DURATION) : this.hideModal());
    }, i.prototype.enforceFocus = function() {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
            this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus");
        }, this));
    }, i.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", t.proxy(function(t) {
            27 == t.which && this.hide();
        }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal");
    }, i.prototype.resize = function() {
        this.isShown ? t(window).on("resize.bs.modal", t.proxy(this.handleUpdate, this)) : t(window).off("resize.bs.modal");
    }, i.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(), this.backdrop(function() {
            t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal");
        });
    }, i.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null;
    }, i.prototype.backdrop = function(e) {
        var o = this, n = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var s = t.support.transition && n;
            if (this.$backdrop = t(document.createElement("div")).addClass("modal-backdrop " + n).appendTo(this.$body), 
            this.$element.on("click.dismiss.bs.modal", t.proxy(function(t) {
                return this.ignoreBackdropClick ? void (this.ignoreBackdropClick = !1) : void (t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()));
            }, this)), s && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            s ? this.$backdrop.one("bsTransitionEnd", e).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : e();
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var a = function() {
                o.removeBackdrop(), e && e();
            };
            t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(i.BACKDROP_TRANSITION_DURATION) : a();
        } else e && e();
    }, i.prototype.handleUpdate = function() {
        this.adjustDialog();
    }, i.prototype.adjustDialog = function() {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({
            paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "",
            paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : ""
        });
    }, i.prototype.resetAdjustments = function() {
        this.$element.css({
            paddingLeft: "",
            paddingRight: ""
        });
    }, i.prototype.checkScrollbar = function() {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left);
        }
        this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar();
    }, i.prototype.setScrollbar = function() {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth);
    }, i.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", this.originalBodyPad);
    }, i.prototype.measureScrollbar = function() {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e;
    };
    var o = t.fn.modal;
    t.fn.modal = e, t.fn.modal.Constructor = i, t.fn.modal.noConflict = function() {
        return t.fn.modal = o, this;
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(i) {
        var o = t(this), n = o.attr("href"), s = t(o.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, "")), a = s.data("bs.modal") ? "toggle" : t.extend({
            remote: !/#/.test(n) && n
        }, s.data(), o.data());
        o.is("a") && i.preventDefault(), s.one("show.bs.modal", function(t) {
            t.isDefaultPrevented() || s.one("hidden.bs.modal", function() {
                o.is(":visible") && o.trigger("focus");
            });
        }), e.call(s, a, this);
    });
}(jQuery), +function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.tooltip"), s = "object" == typeof e && e;
            (n || !/destroy|hide/.test(e)) && (n || o.data("bs.tooltip", n = new i(this, s)), 
            "string" == typeof e && n[e]());
        });
    }
    var i = function(t, e) {
        this.type = null, this.options = null, this.enabled = null, this.timeout = null, 
        this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e);
    };
    i.VERSION = "3.3.6", i.TRANSITION_DURATION = 150, i.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, i.prototype.init = function(e, i, o) {
        if (this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(o), 
        this.$viewport = this.options.viewport && t(t.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), 
        this.inState = {
            click: !1,
            hover: !1,
            focus: !1
        }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var n = this.options.trigger.split(" "), s = n.length; s--; ) {
            var a = n[s];
            if ("click" == a) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this)); else if ("manual" != a) {
                var r = "hover" == a ? "mouseenter" : "focusin", l = "hover" == a ? "mouseleave" : "focusout";
                this.$element.on(r + "." + this.type, this.options.selector, t.proxy(this.enter, this)), 
                this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this));
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle();
    }, i.prototype.getDefaults = function() {
        return i.DEFAULTS;
    }, i.prototype.getOptions = function(e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e;
    }, i.prototype.getDelegateOptions = function() {
        var e = {}, i = this.getDefaults();
        return this._options && t.each(this._options, function(t, o) {
            i[t] != o && (e[t] = o);
        }), e;
    }, i.prototype.enter = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), 
        t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusin" == e.type ? "focus" : "hover"] = !0), 
        i.tip().hasClass("in") || "in" == i.hoverState ? void (i.hoverState = "in") : (clearTimeout(i.timeout), 
        i.hoverState = "in", i.options.delay && i.options.delay.show ? void (i.timeout = setTimeout(function() {
            "in" == i.hoverState && i.show();
        }, i.options.delay.show)) : i.show());
    }, i.prototype.isInStateTrue = function() {
        for (var t in this.inState) if (this.inState[t]) return !0;
        return !1;
    }, i.prototype.leave = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget).data("bs." + this.type);
        return i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), 
        t(e.currentTarget).data("bs." + this.type, i)), e instanceof t.Event && (i.inState["focusout" == e.type ? "focus" : "hover"] = !1), 
        i.isInStateTrue() ? void 0 : (clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void (i.timeout = setTimeout(function() {
            "out" == i.hoverState && i.hide();
        }, i.options.delay.hide)) : i.hide());
    }, i.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e);
            var o = t.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (e.isDefaultPrevented() || !o) return;
            var n = this, s = this.tip(), a = this.getUID(this.type);
            this.setContent(), s.attr("id", a), this.$element.attr("aria-describedby", a), this.options.animation && s.addClass("fade");
            var r = "function" == typeof this.options.placement ? this.options.placement.call(this, s[0], this.$element[0]) : this.options.placement, l = /\s?auto?\s?/i, h = l.test(r);
            h && (r = r.replace(l, "") || "top"), s.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(r).data("bs." + this.type, this), this.options.container ? s.appendTo(this.options.container) : s.insertAfter(this.$element), 
            this.$element.trigger("inserted.bs." + this.type);
            var d = this.getPosition(), p = s[0].offsetWidth, c = s[0].offsetHeight;
            if (h) {
                var f = r, u = this.getPosition(this.$viewport);
                r = "bottom" == r && d.bottom + c > u.bottom ? "top" : "top" == r && d.top - c < u.top ? "bottom" : "right" == r && d.right + p > u.width ? "left" : "left" == r && d.left - p < u.left ? "right" : r, 
                s.removeClass(f).addClass(r);
            }
            var g = this.getCalculatedOffset(r, d, p, c);
            this.applyPlacement(g, r);
            var v = function() {
                var t = n.hoverState;
                n.$element.trigger("shown.bs." + n.type), n.hoverState = null, "out" == t && n.leave(n);
            };
            t.support.transition && this.$tip.hasClass("fade") ? s.one("bsTransitionEnd", v).emulateTransitionEnd(i.TRANSITION_DURATION) : v();
        }
    }, i.prototype.applyPlacement = function(e, i) {
        var o = this.tip(), n = o[0].offsetWidth, s = o[0].offsetHeight, a = parseInt(o.css("margin-top"), 10), r = parseInt(o.css("margin-left"), 10);
        isNaN(a) && (a = 0), isNaN(r) && (r = 0), e.top += a, e.left += r, t.offset.setOffset(o[0], t.extend({
            using: function(t) {
                o.css({
                    top: Math.round(t.top),
                    left: Math.round(t.left)
                });
            }
        }, e), 0), o.addClass("in");
        var l = o[0].offsetWidth, h = o[0].offsetHeight;
        "top" == i && h != s && (e.top = e.top + s - h);
        var d = this.getViewportAdjustedDelta(i, e, l, h);
        d.left ? e.left += d.left : e.top += d.top;
        var p = /top|bottom/.test(i), c = p ? 2 * d.left - n + l : 2 * d.top - s + h, f = p ? "offsetWidth" : "offsetHeight";
        o.offset(e), this.replaceArrow(c, o[0][f], p);
    }, i.prototype.replaceArrow = function(t, e, i) {
        this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "");
    }, i.prototype.setContent = function() {
        var t = this.tip(), e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right");
    }, i.prototype.hide = function(e) {
        function o() {
            "in" != n.hoverState && s.detach(), n.$element.removeAttr("aria-describedby").trigger("hidden.bs." + n.type), 
            e && e();
        }
        var n = this, s = t(this.$tip), a = t.Event("hide.bs." + this.type);
        return this.$element.trigger(a), a.isDefaultPrevented() ? void 0 : (s.removeClass("in"), 
        t.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", o).emulateTransitionEnd(i.TRANSITION_DURATION) : o(), 
        this.hoverState = null, this);
    }, i.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "");
    }, i.prototype.hasContent = function() {
        return this.getTitle();
    }, i.prototype.getPosition = function(e) {
        e = e || this.$element;
        var i = e[0], o = "BODY" == i.tagName, n = i.getBoundingClientRect();
        null == n.width && (n = t.extend({}, n, {
            width: n.right - n.left,
            height: n.bottom - n.top
        }));
        var s = o ? {
            top: 0,
            left: 0
        } : e.offset(), a = {
            scroll: o ? document.documentElement.scrollTop || document.body.scrollTop : e.scrollTop()
        }, r = o ? {
            width: t(window).width(),
            height: t(window).height()
        } : null;
        return t.extend({}, n, a, r, s);
    }, i.prototype.getCalculatedOffset = function(t, e, i, o) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - o,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - o / 2,
            left: e.left - i
        } : {
            top: e.top + e.height / 2 - o / 2,
            left: e.left + e.width
        };
    }, i.prototype.getViewportAdjustedDelta = function(t, e, i, o) {
        var n = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return n;
        var s = this.options.viewport && this.options.viewport.padding || 0, a = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var r = e.top - s - a.scroll, l = e.top + s - a.scroll + o;
            r < a.top ? n.top = a.top - r : l > a.top + a.height && (n.top = a.top + a.height - l);
        } else {
            var h = e.left - s, d = e.left + s + i;
            h < a.left ? n.left = a.left - h : d > a.right && (n.left = a.left + a.width - d);
        }
        return n;
    }, i.prototype.getTitle = function() {
        var t, e = this.$element, i = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title);
    }, i.prototype.getUID = function(t) {
        do {
            t += ~~(1e6 * Math.random());
        } while (document.getElementById(t));
        return t;
    }, i.prototype.tip = function() {
        if (!this.$tip && (this.$tip = t(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip;
    }, i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow");
    }, i.prototype.enable = function() {
        this.enabled = !0;
    }, i.prototype.disable = function() {
        this.enabled = !1;
    }, i.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled;
    }, i.prototype.toggle = function(e) {
        var i = this;
        e && (i = t(e.currentTarget).data("bs." + this.type), i || (i = new this.constructor(e.currentTarget, this.getDelegateOptions()), 
        t(e.currentTarget).data("bs." + this.type, i))), e ? (i.inState.click = !i.inState.click, 
        i.isInStateTrue() ? i.enter(i) : i.leave(i)) : i.tip().hasClass("in") ? i.leave(i) : i.enter(i);
    }, i.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout), this.hide(function() {
            t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), 
            t.$tip = null, t.$arrow = null, t.$viewport = null;
        });
    };
    var o = t.fn.tooltip;
    t.fn.tooltip = e, t.fn.tooltip.Constructor = i, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = o, this;
    };
}(jQuery), +function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.popover"), s = "object" == typeof e && e;
            (n || !/destroy|hide/.test(e)) && (n || o.data("bs.popover", n = new i(this, s)), 
            "string" == typeof e && n[e]());
        });
    }
    var i = function(t, e) {
        this.init("popover", t, e);
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    i.VERSION = "3.3.6", i.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), i.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), i.prototype.constructor = i, 
    i.prototype.getDefaults = function() {
        return i.DEFAULTS;
    }, i.prototype.setContent = function() {
        var t = this.tip(), e = this.getTitle(), i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), 
        t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide();
    }, i.prototype.hasContent = function() {
        return this.getTitle() || this.getContent();
    }, i.prototype.getContent = function() {
        var t = this.$element, e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content);
    }, i.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow");
    };
    var o = t.fn.popover;
    t.fn.popover = e, t.fn.popover.Constructor = i, t.fn.popover.noConflict = function() {
        return t.fn.popover = o, this;
    };
}(jQuery), +function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.tab");
            n || o.data("bs.tab", n = new i(this)), "string" == typeof e && n[e]();
        });
    }
    var i = function(e) {
        this.element = t(e);
    };
    i.VERSION = "3.3.6", i.TRANSITION_DURATION = 150, i.prototype.show = function() {
        var e = this.element, i = e.closest("ul:not(.dropdown-menu)"), o = e.data("target");
        if (o || (o = e.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var n = i.find(".active:last a"), s = t.Event("hide.bs.tab", {
                relatedTarget: e[0]
            }), a = t.Event("show.bs.tab", {
                relatedTarget: n[0]
            });
            if (n.trigger(s), e.trigger(a), !a.isDefaultPrevented() && !s.isDefaultPrevented()) {
                var r = t(o);
                this.activate(e.closest("li"), i), this.activate(r, r.parent(), function() {
                    n.trigger({
                        type: "hidden.bs.tab",
                        relatedTarget: e[0]
                    }), e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: n[0]
                    });
                });
            }
        }
    }, i.prototype.activate = function(e, o, n) {
        function s() {
            a.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), 
            e.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), r ? (e[0].offsetWidth, 
            e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu").length && e.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), 
            n && n();
        }
        var a = o.find("> .active"), r = n && t.support.transition && (a.length && a.hasClass("fade") || !!o.find("> .fade").length);
        a.length && r ? a.one("bsTransitionEnd", s).emulateTransitionEnd(i.TRANSITION_DURATION) : s(), 
        a.removeClass("in");
    };
    var o = t.fn.tab;
    t.fn.tab = e, t.fn.tab.Constructor = i, t.fn.tab.noConflict = function() {
        return t.fn.tab = o, this;
    };
    var n = function(i) {
        i.preventDefault(), e.call(t(this), "show");
    };
    t(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', n).on("click.bs.tab.data-api", '[data-toggle="pill"]', n);
}(jQuery), +function(t) {
    "use strict";
    function e(e) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.affix"), s = "object" == typeof e && e;
            n || o.data("bs.affix", n = new i(this, s)), "string" == typeof e && n[e]();
        });
    }
    var i = function(e, o) {
        this.options = t.extend({}, i.DEFAULTS, o), this.$target = t(this.options.target).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), 
        this.$element = t(e), this.affixed = null, this.unpin = null, this.pinnedOffset = null, 
        this.checkPosition();
    };
    i.VERSION = "3.3.6", i.RESET = "affix affix-top affix-bottom", i.DEFAULTS = {
        offset: 0,
        target: window
    }, i.prototype.getState = function(t, e, i, o) {
        var n = this.$target.scrollTop(), s = this.$element.offset(), a = this.$target.height();
        if (null != i && "top" == this.affixed) return i > n ? "top" : !1;
        if ("bottom" == this.affixed) return null != i ? n + this.unpin <= s.top ? !1 : "bottom" : t - o >= n + a ? !1 : "bottom";
        var r = null == this.affixed, l = r ? n : s.top, h = r ? a : e;
        return null != i && i >= n ? "top" : null != o && l + h >= t - o ? "bottom" : !1;
    }, i.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(i.RESET).addClass("affix");
        var t = this.$target.scrollTop(), e = this.$element.offset();
        return this.pinnedOffset = e.top - t;
    }, i.prototype.checkPositionWithEventLoop = function() {
        setTimeout(t.proxy(this.checkPosition, this), 1);
    }, i.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var e = this.$element.height(), o = this.options.offset, n = o.top, s = o.bottom, a = Math.max(t(document).height(), t(document.body).height());
            "object" != typeof o && (s = n = o), "function" == typeof n && (n = o.top(this.$element)), 
            "function" == typeof s && (s = o.bottom(this.$element));
            var r = this.getState(a, e, n, s);
            if (this.affixed != r) {
                null != this.unpin && this.$element.css("top", "");
                var l = "affix" + (r ? "-" + r : ""), h = t.Event(l + ".bs.affix");
                if (this.$element.trigger(h), h.isDefaultPrevented()) return;
                this.affixed = r, this.unpin = "bottom" == r ? this.getPinnedOffset() : null, this.$element.removeClass(i.RESET).addClass(l).trigger(l.replace("affix", "affixed") + ".bs.affix");
            }
            "bottom" == r && this.$element.offset({
                top: a - e - s
            });
        }
    };
    var o = t.fn.affix;
    t.fn.affix = e, t.fn.affix.Constructor = i, t.fn.affix.noConflict = function() {
        return t.fn.affix = o, this;
    }, t(window).on("load", function() {
        t('[data-spy="affix"]').each(function() {
            var i = t(this), o = i.data();
            o.offset = o.offset || {}, null != o.offsetBottom && (o.offset.bottom = o.offsetBottom), 
            null != o.offsetTop && (o.offset.top = o.offsetTop), e.call(i, o);
        });
    });
}(jQuery), +function(t) {
    "use strict";
    function e(e) {
        var i, o = e.attr("data-target") || (i = e.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "");
        return t(o);
    }
    function i(e) {
        return this.each(function() {
            var i = t(this), n = i.data("bs.collapse"), s = t.extend({}, o.DEFAULTS, i.data(), "object" == typeof e && e);
            !n && s.toggle && /show|hide/.test(e) && (s.toggle = !1), n || i.data("bs.collapse", n = new o(this, s)), 
            "string" == typeof e && n[e]();
        });
    }
    var o = function(e, i) {
        this.$element = t(e), this.options = t.extend({}, o.DEFAULTS, i), this.$trigger = t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'), 
        this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), 
        this.options.toggle && this.toggle();
    };
    o.VERSION = "3.3.6", o.TRANSITION_DURATION = 350, o.DEFAULTS = {
        toggle: !0
    }, o.prototype.dimension = function() {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height";
    }, o.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e, n = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(n && n.length && (e = n.data("bs.collapse"), e && e.transitioning))) {
                var s = t.Event("show.bs.collapse");
                if (this.$element.trigger(s), !s.isDefaultPrevented()) {
                    n && n.length && (i.call(n, "hide"), e || n.data("bs.collapse", null));
                    var a = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[a](0).attr("aria-expanded", !0), 
                    this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var r = function() {
                        this.$element.removeClass("collapsing").addClass("collapse in")[a](""), this.transitioning = 0, 
                        this.$element.trigger("shown.bs.collapse");
                    };
                    if (!t.support.transition) return r.call(this);
                    var l = t.camelCase([ "scroll", a ].join("-"));
                    this.$element.one("bsTransitionEnd", t.proxy(r, this)).emulateTransitionEnd(o.TRANSITION_DURATION)[a](this.$element[0][l]);
                }
            }
        }
    }, o.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), 
                this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var n = function() {
                    this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse");
                };
                return t.support.transition ? void this.$element[i](0).one("bsTransitionEnd", t.proxy(n, this)).emulateTransitionEnd(o.TRANSITION_DURATION) : n.call(this);
            }
        }
    }, o.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]();
    }, o.prototype.getParent = function() {
        return t(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(t.proxy(function(i, o) {
            var n = t(o);
            this.addAriaAndCollapsedClass(e(n), n);
        }, this)).end();
    }, o.prototype.addAriaAndCollapsedClass = function(t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i);
    };
    var n = t.fn.collapse;
    t.fn.collapse = i, t.fn.collapse.Constructor = o, t.fn.collapse.noConflict = function() {
        return t.fn.collapse = n, this;
    }, t(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(o) {
        var n = t(this);
        n.attr("data-target") || o.preventDefault();
        var s = e(n), a = s.data("bs.collapse"), r = a ? "toggle" : n.data();
        i.call(s, r);
    });
}(jQuery), +function(t) {
    "use strict";
    function e(i, o) {
        this.$body = t(document.body), this.$scrollElement = t(t(i).is(document.body) ? window : i), 
        this.options = t.extend({}, e.DEFAULTS, o), this.selector = (this.options.target || "") + " .nav li > a", 
        this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, 
        this.$scrollElement.on("scroll.bs.scrollspy", t.proxy(this.process, this)), this.refresh(), 
        this.process();
    }
    function i(i) {
        return this.each(function() {
            var o = t(this), n = o.data("bs.scrollspy"), s = "object" == typeof i && i;
            n || o.data("bs.scrollspy", n = new e(this, s)), "string" == typeof i && n[i]();
        });
    }
    e.VERSION = "3.3.6", e.DEFAULTS = {
        offset: 10
    }, e.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight);
    }, e.prototype.refresh = function() {
        var e = this, i = "offset", o = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), 
        t.isWindow(this.$scrollElement[0]) || (i = "position", o = this.$scrollElement.scrollTop()), 
        this.$body.find(this.selector).map(function() {
            var e = t(this), n = e.data("target") || e.attr("href"), s = /^#./.test(n) && t(n);
            return s && s.length && s.is(":visible") && [ [ s[i]().top + o, n ] ] || null;
        }).sort(function(t, e) {
            return t[0] - e[0];
        }).each(function() {
            e.offsets.push(this[0]), e.targets.push(this[1]);
        });
    }, e.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset, i = this.getScrollHeight(), o = this.options.offset + i - this.$scrollElement.height(), n = this.offsets, s = this.targets, a = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), e >= o) return a != (t = s[s.length - 1]) && this.activate(t);
        if (a && e < n[0]) return this.activeTarget = null, this.clear();
        for (t = n.length; t--; ) a != s[t] && e >= n[t] && (void 0 === n[t + 1] || e < n[t + 1]) && this.activate(s[t]);
    }, e.prototype.activate = function(e) {
        this.activeTarget = e, this.clear();
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]', o = t(i).parents("li").addClass("active");
        o.parent(".dropdown-menu").length && (o = o.closest("li.dropdown").addClass("active")), 
        o.trigger("activate.bs.scrollspy");
    }, e.prototype.clear = function() {
        t(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
    };
    var o = t.fn.scrollspy;
    t.fn.scrollspy = i, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = o, this;
    }, t(window).on("load.bs.scrollspy.data-api", function() {
        t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            i.call(e, e.data());
        });
    });
}(jQuery), +function(t) {
    "use strict";
    function e() {
        var t = document.createElement("bootstrap"), e = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var i in e) if (void 0 !== t.style[i]) return {
            end: e[i]
        };
        return !1;
    }
    t.fn.emulateTransitionEnd = function(e) {
        var i = !1, o = this;
        t(this).one("bsTransitionEnd", function() {
            i = !0;
        });
        var n = function() {
            i || t(o).trigger(t.support.transition.end);
        };
        return setTimeout(n, e), this;
    }, t(function() {
        t.support.transition = e(), t.support.transition && (t.event.special.bsTransitionEnd = {
            bindType: t.support.transition.end,
            delegateType: t.support.transition.end,
            handle: function(e) {
                return t(e.target).is(this) ? e.handleObj.handler.apply(this, arguments) : void 0;
            }
        });
    });
}(jQuery);

(function($) {
    "use strict";
    $.fn.fitVids = function(options) {
        var settings = {
            customSelector: null,
            ignore: null
        };
        if (!document.getElementById("fit-vids-style")) {
            // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
            var head = document.head || document.getElementsByTagName("head")[0];
            var css = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}";
            var div = document.createElement("div");
            div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + "</style>";
            head.appendChild(div.childNodes[1]);
        }
        if (options) {
            $.extend(settings, options);
        }
        return this.each(function() {
            var selectors = [ 'iframe[src*="player.vimeo.com"]', 'iframe[src*="youtube.com"]', 'iframe[src*="youtube-nocookie.com"]', 'iframe[src*="kickstarter.com"][src*="video.html"]', "object", "embed" ];
            if (settings.customSelector) {
                selectors.push(settings.customSelector);
            }
            var ignoreList = ".fitvidsignore";
            if (settings.ignore) {
                ignoreList = ignoreList + ", " + settings.ignore;
            }
            var $allVideos = $(this).find(selectors.join(","));
            $allVideos = $allVideos.not("object object");
            // SwfObj conflict patch
            $allVideos = $allVideos.not(ignoreList);
            // Disable FitVids on this video.
            $allVideos.each(function(count) {
                var $this = $(this);
                if ($this.parents(ignoreList).length > 0) {
                    return;
                }
                if (this.tagName.toLowerCase() === "embed" && $this.parent("object").length || $this.parent(".fluid-width-video-wrapper").length) {
                    return;
                }
                if (!$this.css("height") && !$this.css("width") && (isNaN($this.attr("height")) || isNaN($this.attr("width")))) {
                    $this.attr("height", 9);
                    $this.attr("width", 16);
                }
                var height = this.tagName.toLowerCase() === "object" || $this.attr("height") && !isNaN(parseInt($this.attr("height"), 10)) ? parseInt($this.attr("height"), 10) : $this.height(), width = !isNaN(parseInt($this.attr("width"), 10)) ? parseInt($this.attr("width"), 10) : $this.width(), aspectRatio = height / width;
                if (!$this.attr("id")) {
                    var videoID = "fitvid" + count;
                    $this.attr("id", videoID);
                }
                $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", aspectRatio * 100 + "%");
                $this.removeAttr("height").removeAttr("width");
            });
        });
    };
})(window.jQuery || window.Zepto);

/*!
 * Isotope PACKAGED v2.2.0
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * http://isotope.metafizzy.co
 * Copyright 2015 Metafizzy
 */
!function(a) {
    function b() {}
    function c(a) {
        function c(b) {
            b.prototype.option || (b.prototype.option = function(b) {
                a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b));
            });
        }
        function e(b, c) {
            a.fn[b] = function(e) {
                if ("string" == typeof e) {
                    for (var g = d.call(arguments, 1), h = 0, i = this.length; i > h; h++) {
                        var j = this[h], k = a.data(j, b);
                        if (k) if (a.isFunction(k[e]) && "_" !== e.charAt(0)) {
                            var l = k[e].apply(k, g);
                            if (void 0 !== l) return l;
                        } else f("no such method '" + e + "' for " + b + " instance"); else f("cannot call methods on " + b + " prior to initialization; attempted to call '" + e + "'");
                    }
                    return this;
                }
                return this.each(function() {
                    var d = a.data(this, b);
                    d ? (d.option(e), d._init()) : (d = new c(this, e), a.data(this, b, d));
                });
            };
        }
        if (a) {
            var f = "undefined" == typeof console ? b : function(a) {
                console.error(a);
            };
            return a.bridget = function(a, b) {
                c(b), e(a, b);
            }, a.bridget;
        }
    }
    var d = Array.prototype.slice;
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery.bridget", [ "jquery" ], c) : c("object" == typeof exports ? require("jquery") : a.jQuery);
}(window), function(a) {
    function b(b) {
        var c = a.event;
        return c.target = c.target || c.srcElement || b, c;
    }
    var c = document.documentElement, d = function() {};
    c.addEventListener ? d = function(a, b, c) {
        a.addEventListener(b, c, !1);
    } : c.attachEvent && (d = function(a, c, d) {
        a[c + d] = d.handleEvent ? function() {
            var c = b(a);
            d.handleEvent.call(d, c);
        } : function() {
            var c = b(a);
            d.call(a, c);
        }, a.attachEvent("on" + c, a[c + d]);
    });
    var e = function() {};
    c.removeEventListener ? e = function(a, b, c) {
        a.removeEventListener(b, c, !1);
    } : c.detachEvent && (e = function(a, b, c) {
        a.detachEvent("on" + b, a[b + c]);
        try {
            delete a[b + c];
        } catch (d) {
            a[b + c] = void 0;
        }
    });
    var f = {
        bind: d,
        unbind: e
    };
    "function" == typeof define && define.amd ? define("eventie/eventie", f) : "object" == typeof exports ? module.exports = f : a.eventie = f;
}(window), function() {
    "use strict";
    function a() {}
    function b(a, b) {
        for (var c = a.length; c--; ) if (a[c].listener === b) return c;
        return -1;
    }
    function c(a) {
        return function() {
            return this[a].apply(this, arguments);
        };
    }
    var d = a.prototype, e = this, f = e.EventEmitter;
    d.getListeners = function(a) {
        var b, c, d = this._getEvents();
        if (a instanceof RegExp) {
            b = {};
            for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c]);
        } else b = d[a] || (d[a] = []);
        return b;
    }, d.flattenListeners = function(a) {
        var b, c = [];
        for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
        return c;
    }, d.getListenersAsObject = function(a) {
        var b, c = this.getListeners(a);
        return c instanceof Array && (b = {}, b[a] = c), b || c;
    }, d.addListener = function(a, c) {
        var d, e = this.getListenersAsObject(a), f = "object" == typeof c;
        for (d in e) e.hasOwnProperty(d) && -1 === b(e[d], c) && e[d].push(f ? c : {
            listener: c,
            once: !1
        });
        return this;
    }, d.on = c("addListener"), d.addOnceListener = function(a, b) {
        return this.addListener(a, {
            listener: b,
            once: !0
        });
    }, d.once = c("addOnceListener"), d.defineEvent = function(a) {
        return this.getListeners(a), this;
    }, d.defineEvents = function(a) {
        for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
        return this;
    }, d.removeListener = function(a, c) {
        var d, e, f = this.getListenersAsObject(a);
        for (e in f) f.hasOwnProperty(e) && (d = b(f[e], c), -1 !== d && f[e].splice(d, 1));
        return this;
    }, d.off = c("removeListener"), d.addListeners = function(a, b) {
        return this.manipulateListeners(!1, a, b);
    }, d.removeListeners = function(a, b) {
        return this.manipulateListeners(!0, a, b);
    }, d.manipulateListeners = function(a, b, c) {
        var d, e, f = a ? this.removeListener : this.addListener, g = a ? this.removeListeners : this.addListeners;
        if ("object" != typeof b || b instanceof RegExp) for (d = c.length; d--; ) f.call(this, b, c[d]); else for (d in b) b.hasOwnProperty(d) && (e = b[d]) && ("function" == typeof e ? f.call(this, d, e) : g.call(this, d, e));
        return this;
    }, d.removeEvent = function(a) {
        var b, c = typeof a, d = this._getEvents();
        if ("string" === c) delete d[a]; else if (a instanceof RegExp) for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b]; else delete this._events;
        return this;
    }, d.removeAllListeners = c("removeEvent"), d.emitEvent = function(a, b) {
        var c, d, e, f, g = this.getListenersAsObject(a);
        for (e in g) if (g.hasOwnProperty(e)) for (d = g[e].length; d--; ) c = g[e][d], 
        c.once === !0 && this.removeListener(a, c.listener), f = c.listener.apply(this, b || []), 
        f === this._getOnceReturnValue() && this.removeListener(a, c.listener);
        return this;
    }, d.trigger = c("emitEvent"), d.emit = function(a) {
        var b = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(a, b);
    }, d.setOnceReturnValue = function(a) {
        return this._onceReturnValue = a, this;
    }, d._getOnceReturnValue = function() {
        return this.hasOwnProperty("_onceReturnValue") ? this._onceReturnValue : !0;
    }, d._getEvents = function() {
        return this._events || (this._events = {});
    }, a.noConflict = function() {
        return e.EventEmitter = f, a;
    }, "function" == typeof define && define.amd ? define("eventEmitter/EventEmitter", [], function() {
        return a;
    }) : "object" == typeof module && module.exports ? module.exports = a : e.EventEmitter = a;
}.call(this), function(a) {
    function b(a) {
        if (a) {
            if ("string" == typeof d[a]) return a;
            a = a.charAt(0).toUpperCase() + a.slice(1);
            for (var b, e = 0, f = c.length; f > e; e++) if (b = c[e] + a, "string" == typeof d[b]) return b;
        }
    }
    var c = "Webkit Moz ms Ms O".split(" "), d = document.documentElement.style;
    "function" == typeof define && define.amd ? define("get-style-property/get-style-property", [], function() {
        return b;
    }) : "object" == typeof exports ? module.exports = b : a.getStyleProperty = b;
}(window), function(a, b) {
    function c(a) {
        var b = parseFloat(a), c = -1 === a.indexOf("%") && !isNaN(b);
        return c && b;
    }
    function d() {}
    function e() {
        for (var a = {
            width: 0,
            height: 0,
            innerWidth: 0,
            innerHeight: 0,
            outerWidth: 0,
            outerHeight: 0
        }, b = 0, c = h.length; c > b; b++) {
            var d = h[b];
            a[d] = 0;
        }
        return a;
    }
    function f(b) {
        function d() {
            if (!m) {
                m = !0;
                var d = a.getComputedStyle;
                if (j = function() {
                    var a = d ? function(a) {
                        return d(a, null);
                    } : function(a) {
                        return a.currentStyle;
                    };
                    return function(b) {
                        var c = a(b);
                        return c || g("Style returned " + c + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), 
                        c;
                    };
                }(), k = b("boxSizing")) {
                    var e = document.createElement("div");
                    e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", 
                    e.style.borderWidth = "1px 2px 3px 4px", e.style[k] = "border-box";
                    var f = document.body || document.documentElement;
                    f.appendChild(e);
                    var h = j(e);
                    l = 200 === c(h.width), f.removeChild(e);
                }
            }
        }
        function f(a) {
            if (d(), "string" == typeof a && (a = document.querySelector(a)), a && "object" == typeof a && a.nodeType) {
                var b = j(a);
                if ("none" === b.display) return e();
                var f = {};
                f.width = a.offsetWidth, f.height = a.offsetHeight;
                for (var g = f.isBorderBox = !(!k || !b[k] || "border-box" !== b[k]), m = 0, n = h.length; n > m; m++) {
                    var o = h[m], p = b[o];
                    p = i(a, p);
                    var q = parseFloat(p);
                    f[o] = isNaN(q) ? 0 : q;
                }
                var r = f.paddingLeft + f.paddingRight, s = f.paddingTop + f.paddingBottom, t = f.marginLeft + f.marginRight, u = f.marginTop + f.marginBottom, v = f.borderLeftWidth + f.borderRightWidth, w = f.borderTopWidth + f.borderBottomWidth, x = g && l, y = c(b.width);
                y !== !1 && (f.width = y + (x ? 0 : r + v));
                var z = c(b.height);
                return z !== !1 && (f.height = z + (x ? 0 : s + w)), f.innerWidth = f.width - (r + v), 
                f.innerHeight = f.height - (s + w), f.outerWidth = f.width + t, f.outerHeight = f.height + u, 
                f;
            }
        }
        function i(b, c) {
            if (a.getComputedStyle || -1 === c.indexOf("%")) return c;
            var d = b.style, e = d.left, f = b.runtimeStyle, g = f && f.left;
            return g && (f.left = b.currentStyle.left), d.left = c, c = d.pixelLeft, d.left = e, 
            g && (f.left = g), c;
        }
        var j, k, l, m = !1;
        return f;
    }
    var g = "undefined" == typeof console ? d : function(a) {
        console.error(a);
    }, h = [ "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth" ];
    "function" == typeof define && define.amd ? define("get-size/get-size", [ "get-style-property/get-style-property" ], f) : "object" == typeof exports ? module.exports = f(require("desandro-get-style-property")) : a.getSize = f(a.getStyleProperty);
}(window), function(a) {
    function b(a) {
        "function" == typeof a && (b.isReady ? a() : g.push(a));
    }
    function c(a) {
        var c = "readystatechange" === a.type && "complete" !== f.readyState;
        b.isReady || c || d();
    }
    function d() {
        b.isReady = !0;
        for (var a = 0, c = g.length; c > a; a++) {
            var d = g[a];
            d();
        }
    }
    function e(e) {
        return "complete" === f.readyState ? d() : (e.bind(f, "DOMContentLoaded", c), e.bind(f, "readystatechange", c), 
        e.bind(a, "load", c)), b;
    }
    var f = a.document, g = [];
    b.isReady = !1, "function" == typeof define && define.amd ? define("doc-ready/doc-ready", [ "eventie/eventie" ], e) : "object" == typeof exports ? module.exports = e(require("eventie")) : a.docReady = e(a.eventie);
}(window), function(a) {
    "use strict";
    function b(a, b) {
        return a[g](b);
    }
    function c(a) {
        if (!a.parentNode) {
            var b = document.createDocumentFragment();
            b.appendChild(a);
        }
    }
    function d(a, b) {
        c(a);
        for (var d = a.parentNode.querySelectorAll(b), e = 0, f = d.length; f > e; e++) if (d[e] === a) return !0;
        return !1;
    }
    function e(a, d) {
        return c(a), b(a, d);
    }
    var f, g = function() {
        if (a.matches) return "matches";
        if (a.matchesSelector) return "matchesSelector";
        for (var b = [ "webkit", "moz", "ms", "o" ], c = 0, d = b.length; d > c; c++) {
            var e = b[c], f = e + "MatchesSelector";
            if (a[f]) return f;
        }
    }();
    if (g) {
        var h = document.createElement("div"), i = b(h, "div");
        f = i ? b : e;
    } else f = d;
    "function" == typeof define && define.amd ? define("matches-selector/matches-selector", [], function() {
        return f;
    }) : "object" == typeof exports ? module.exports = f : window.matchesSelector = f;
}(Element.prototype), function(a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", [ "doc-ready/doc-ready", "matches-selector/matches-selector" ], function(c, d) {
        return b(a, c, d);
    }) : "object" == typeof exports ? module.exports = b(a, require("doc-ready"), require("desandro-matches-selector")) : a.fizzyUIUtils = b(a, a.docReady, a.matchesSelector);
}(window, function(a, b, c) {
    var d = {};
    d.extend = function(a, b) {
        for (var c in b) a[c] = b[c];
        return a;
    }, d.modulo = function(a, b) {
        return (a % b + b) % b;
    };
    var e = Object.prototype.toString;
    d.isArray = function(a) {
        return "[object Array]" == e.call(a);
    }, d.makeArray = function(a) {
        var b = [];
        if (d.isArray(a)) b = a; else if (a && "number" == typeof a.length) for (var c = 0, e = a.length; e > c; c++) b.push(a[c]); else b.push(a);
        return b;
    }, d.indexOf = Array.prototype.indexOf ? function(a, b) {
        return a.indexOf(b);
    } : function(a, b) {
        for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
        return -1;
    }, d.removeFrom = function(a, b) {
        var c = d.indexOf(a, b);
        -1 != c && a.splice(c, 1);
    }, d.isElement = "function" == typeof HTMLElement || "object" == typeof HTMLElement ? function(a) {
        return a instanceof HTMLElement;
    } : function(a) {
        return a && "object" == typeof a && 1 == a.nodeType && "string" == typeof a.nodeName;
    }, d.setText = function() {
        function a(a, c) {
            b = b || (void 0 !== document.documentElement.textContent ? "textContent" : "innerText"), 
            a[b] = c;
        }
        var b;
        return a;
    }(), d.getParent = function(a, b) {
        for (;a != document.body; ) if (a = a.parentNode, c(a, b)) return a;
    }, d.getQueryElement = function(a) {
        return "string" == typeof a ? document.querySelector(a) : a;
    }, d.handleEvent = function(a) {
        var b = "on" + a.type;
        this[b] && this[b](a);
    }, d.filterFindElements = function(a, b) {
        a = d.makeArray(a);
        for (var e = [], f = 0, g = a.length; g > f; f++) {
            var h = a[f];
            if (d.isElement(h)) if (b) {
                c(h, b) && e.push(h);
                for (var i = h.querySelectorAll(b), j = 0, k = i.length; k > j; j++) e.push(i[j]);
            } else e.push(h);
        }
        return e;
    }, d.debounceMethod = function(a, b, c) {
        var d = a.prototype[b], e = b + "Timeout";
        a.prototype[b] = function() {
            var a = this[e];
            a && clearTimeout(a);
            var b = arguments, f = this;
            this[e] = setTimeout(function() {
                d.apply(f, b), delete f[e];
            }, c || 100);
        };
    }, d.toDashed = function(a) {
        return a.replace(/(.)([A-Z])/g, function(a, b, c) {
            return b + "-" + c;
        }).toLowerCase();
    };
    var f = a.console;
    return d.htmlInit = function(c, e) {
        b(function() {
            for (var b = d.toDashed(e), g = document.querySelectorAll(".js-" + b), h = "data-" + b + "-options", i = 0, j = g.length; j > i; i++) {
                var k, l = g[i], m = l.getAttribute(h);
                try {
                    k = m && JSON.parse(m);
                } catch (n) {
                    f && f.error("Error parsing " + h + " on " + l.nodeName.toLowerCase() + (l.id ? "#" + l.id : "") + ": " + n);
                    continue;
                }
                var o = new c(l, k), p = a.jQuery;
                p && p.data(l, e, o);
            }
        });
    }, d;
}), function(a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/item", [ "eventEmitter/EventEmitter", "get-size/get-size", "get-style-property/get-style-property", "fizzy-ui-utils/utils" ], function(c, d, e, f) {
        return b(a, c, d, e, f);
    }) : "object" == typeof exports ? module.exports = b(a, require("wolfy87-eventemitter"), require("get-size"), require("desandro-get-style-property"), require("fizzy-ui-utils")) : (a.Outlayer = {}, 
    a.Outlayer.Item = b(a, a.EventEmitter, a.getSize, a.getStyleProperty, a.fizzyUIUtils));
}(window, function(a, b, c, d, e) {
    "use strict";
    function f(a) {
        for (var b in a) return !1;
        return b = null, !0;
    }
    function g(a, b) {
        a && (this.element = a, this.layout = b, this.position = {
            x: 0,
            y: 0
        }, this._create());
    }
    function h(a) {
        return a.replace(/([A-Z])/g, function(a) {
            return "-" + a.toLowerCase();
        });
    }
    var i = a.getComputedStyle, j = i ? function(a) {
        return i(a, null);
    } : function(a) {
        return a.currentStyle;
    }, k = d("transition"), l = d("transform"), m = k && l, n = !!d("perspective"), o = {
        WebkitTransition: "webkitTransitionEnd",
        MozTransition: "transitionend",
        OTransition: "otransitionend",
        transition: "transitionend"
    }[k], p = [ "transform", "transition", "transitionDuration", "transitionProperty" ], q = function() {
        for (var a = {}, b = 0, c = p.length; c > b; b++) {
            var e = p[b], f = d(e);
            f && f !== e && (a[e] = f);
        }
        return a;
    }();
    e.extend(g.prototype, b.prototype), g.prototype._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        }, this.css({
            position: "absolute"
        });
    }, g.prototype.handleEvent = function(a) {
        var b = "on" + a.type;
        this[b] && this[b](a);
    }, g.prototype.getSize = function() {
        this.size = c(this.element);
    }, g.prototype.css = function(a) {
        var b = this.element.style;
        for (var c in a) {
            var d = q[c] || c;
            b[d] = a[c];
        }
    }, g.prototype.getPosition = function() {
        var a = j(this.element), b = this.layout.options, c = b.isOriginLeft, d = b.isOriginTop, e = a[c ? "left" : "right"], f = a[d ? "top" : "bottom"], g = parseInt(e, 10), h = parseInt(f, 10), i = this.layout.size;
        g = -1 != e.indexOf("%") ? g / 100 * i.width : g, h = -1 != f.indexOf("%") ? h / 100 * i.height : h, 
        g = isNaN(g) ? 0 : g, h = isNaN(h) ? 0 : h, g -= c ? i.paddingLeft : i.paddingRight, 
        h -= d ? i.paddingTop : i.paddingBottom, this.position.x = g, this.position.y = h;
    }, g.prototype.layoutPosition = function() {
        var a = this.layout.size, b = this.layout.options, c = {}, d = b.isOriginLeft ? "paddingLeft" : "paddingRight", e = b.isOriginLeft ? "left" : "right", f = b.isOriginLeft ? "right" : "left", g = this.position.x + a[d];
        c[e] = this.getXValue(g), c[f] = "";
        var h = b.isOriginTop ? "paddingTop" : "paddingBottom", i = b.isOriginTop ? "top" : "bottom", j = b.isOriginTop ? "bottom" : "top", k = this.position.y + a[h];
        c[i] = this.getYValue(k), c[j] = "", this.css(c), this.emitEvent("layout", [ this ]);
    }, g.prototype.getXValue = function(a) {
        var b = this.layout.options;
        return b.percentPosition && !b.isHorizontal ? a / this.layout.size.width * 100 + "%" : a + "px";
    }, g.prototype.getYValue = function(a) {
        var b = this.layout.options;
        return b.percentPosition && b.isHorizontal ? a / this.layout.size.height * 100 + "%" : a + "px";
    }, g.prototype._transitionTo = function(a, b) {
        this.getPosition();
        var c = this.position.x, d = this.position.y, e = parseInt(a, 10), f = parseInt(b, 10), g = e === this.position.x && f === this.position.y;
        if (this.setPosition(a, b), g && !this.isTransitioning) return void this.layoutPosition();
        var h = a - c, i = b - d, j = {};
        j.transform = this.getTranslate(h, i), this.transition({
            to: j,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: !0
        });
    }, g.prototype.getTranslate = function(a, b) {
        var c = this.layout.options;
        return a = c.isOriginLeft ? a : -a, b = c.isOriginTop ? b : -b, a = this.getXValue(a), 
        b = this.getYValue(b), n ? "translate3d(" + a + ", " + b + ", 0)" : "translate(" + a + ", " + b + ")";
    }, g.prototype.goTo = function(a, b) {
        this.setPosition(a, b), this.layoutPosition();
    }, g.prototype.moveTo = m ? g.prototype._transitionTo : g.prototype.goTo, g.prototype.setPosition = function(a, b) {
        this.position.x = parseInt(a, 10), this.position.y = parseInt(b, 10);
    }, g.prototype._nonTransition = function(a) {
        this.css(a.to), a.isCleaning && this._removeStyles(a.to);
        for (var b in a.onTransitionEnd) a.onTransitionEnd[b].call(this);
    }, g.prototype._transition = function(a) {
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(a);
        var b = this._transn;
        for (var c in a.onTransitionEnd) b.onEnd[c] = a.onTransitionEnd[c];
        for (c in a.to) b.ingProperties[c] = !0, a.isCleaning && (b.clean[c] = !0);
        if (a.from) {
            this.css(a.from);
            var d = this.element.offsetHeight;
            d = null;
        }
        this.enableTransition(a.to), this.css(a.to), this.isTransitioning = !0;
    };
    var r = "opacity," + h(q.transform || "transform");
    g.prototype.enableTransition = function() {
        this.isTransitioning || (this.css({
            transitionProperty: r,
            transitionDuration: this.layout.options.transitionDuration
        }), this.element.addEventListener(o, this, !1));
    }, g.prototype.transition = g.prototype[k ? "_transition" : "_nonTransition"], g.prototype.onwebkitTransitionEnd = function(a) {
        this.ontransitionend(a);
    }, g.prototype.onotransitionend = function(a) {
        this.ontransitionend(a);
    };
    var s = {
        "-webkit-transform": "transform",
        "-moz-transform": "transform",
        "-o-transform": "transform"
    };
    g.prototype.ontransitionend = function(a) {
        if (a.target === this.element) {
            var b = this._transn, c = s[a.propertyName] || a.propertyName;
            if (delete b.ingProperties[c], f(b.ingProperties) && this.disableTransition(), c in b.clean && (this.element.style[a.propertyName] = "", 
            delete b.clean[c]), c in b.onEnd) {
                var d = b.onEnd[c];
                d.call(this), delete b.onEnd[c];
            }
            this.emitEvent("transitionEnd", [ this ]);
        }
    }, g.prototype.disableTransition = function() {
        this.removeTransitionStyles(), this.element.removeEventListener(o, this, !1), this.isTransitioning = !1;
    }, g.prototype._removeStyles = function(a) {
        var b = {};
        for (var c in a) b[c] = "";
        this.css(b);
    };
    var t = {
        transitionProperty: "",
        transitionDuration: ""
    };
    return g.prototype.removeTransitionStyles = function() {
        this.css(t);
    }, g.prototype.removeElem = function() {
        this.element.parentNode.removeChild(this.element), this.css({
            display: ""
        }), this.emitEvent("remove", [ this ]);
    }, g.prototype.remove = function() {
        if (!k || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
        var a = this;
        this.once("transitionEnd", function() {
            a.removeElem();
        }), this.hide();
    }, g.prototype.reveal = function() {
        delete this.isHidden, this.css({
            display: ""
        });
        var a = this.layout.options, b = {}, c = this.getHideRevealTransitionEndProperty("visibleStyle");
        b[c] = this.onRevealTransitionEnd, this.transition({
            from: a.hiddenStyle,
            to: a.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: b
        });
    }, g.prototype.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal");
    }, g.prototype.getHideRevealTransitionEndProperty = function(a) {
        var b = this.layout.options[a];
        if (b.opacity) return "opacity";
        for (var c in b) return c;
    }, g.prototype.hide = function() {
        this.isHidden = !0, this.css({
            display: ""
        });
        var a = this.layout.options, b = {}, c = this.getHideRevealTransitionEndProperty("hiddenStyle");
        b[c] = this.onHideTransitionEnd, this.transition({
            from: a.visibleStyle,
            to: a.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: b
        });
    }, g.prototype.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }), this.emitEvent("hide"));
    }, g.prototype.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        });
    }, g;
}), function(a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", [ "eventie/eventie", "eventEmitter/EventEmitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item" ], function(c, d, e, f, g) {
        return b(a, c, d, e, f, g);
    }) : "object" == typeof exports ? module.exports = b(a, require("eventie"), require("wolfy87-eventemitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : a.Outlayer = b(a, a.eventie, a.EventEmitter, a.getSize, a.fizzyUIUtils, a.Outlayer.Item);
}(window, function(a, b, c, d, e, f) {
    "use strict";
    function g(a, b) {
        var c = e.getQueryElement(a);
        if (!c) return void (h && h.error("Bad element for " + this.constructor.namespace + ": " + (c || a)));
        this.element = c, i && (this.$element = i(this.element)), this.options = e.extend({}, this.constructor.defaults), 
        this.option(b);
        var d = ++k;
        this.element.outlayerGUID = d, l[d] = this, this._create(), this.options.isInitLayout && this.layout();
    }
    var h = a.console, i = a.jQuery, j = function() {}, k = 0, l = {};
    return g.namespace = "outlayer", g.Item = f, g.defaults = {
        containerStyle: {
            position: "relative"
        },
        isInitLayout: !0,
        isOriginLeft: !0,
        isOriginTop: !0,
        isResizeBound: !0,
        isResizingContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    }, e.extend(g.prototype, c.prototype), g.prototype.option = function(a) {
        e.extend(this.options, a);
    }, g.prototype._create = function() {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e.extend(this.element.style, this.options.containerStyle), 
        this.options.isResizeBound && this.bindResize();
    }, g.prototype.reloadItems = function() {
        this.items = this._itemize(this.element.children);
    }, g.prototype._itemize = function(a) {
        for (var b = this._filterFindItemElements(a), c = this.constructor.Item, d = [], e = 0, f = b.length; f > e; e++) {
            var g = b[e], h = new c(g, this);
            d.push(h);
        }
        return d;
    }, g.prototype._filterFindItemElements = function(a) {
        return e.filterFindElements(a, this.options.itemSelector);
    }, g.prototype.getItemElements = function() {
        for (var a = [], b = 0, c = this.items.length; c > b; b++) a.push(this.items[b].element);
        return a;
    }, g.prototype.layout = function() {
        this._resetLayout(), this._manageStamps();
        var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
        this.layoutItems(this.items, a), this._isLayoutInited = !0;
    }, g.prototype._init = g.prototype.layout, g.prototype._resetLayout = function() {
        this.getSize();
    }, g.prototype.getSize = function() {
        this.size = d(this.element);
    }, g.prototype._getMeasurement = function(a, b) {
        var c, f = this.options[a];
        f ? ("string" == typeof f ? c = this.element.querySelector(f) : e.isElement(f) && (c = f), 
        this[a] = c ? d(c)[b] : f) : this[a] = 0;
    }, g.prototype.layoutItems = function(a, b) {
        a = this._getItemsForLayout(a), this._layoutItems(a, b), this._postLayout();
    }, g.prototype._getItemsForLayout = function(a) {
        for (var b = [], c = 0, d = a.length; d > c; c++) {
            var e = a[c];
            e.isIgnored || b.push(e);
        }
        return b;
    }, g.prototype._layoutItems = function(a, b) {
        if (this._emitCompleteOnItems("layout", a), a && a.length) {
            for (var c = [], d = 0, e = a.length; e > d; d++) {
                var f = a[d], g = this._getItemLayoutPosition(f);
                g.item = f, g.isInstant = b || f.isLayoutInstant, c.push(g);
            }
            this._processLayoutQueue(c);
        }
    }, g.prototype._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        };
    }, g.prototype._processLayoutQueue = function(a) {
        for (var b = 0, c = a.length; c > b; b++) {
            var d = a[b];
            this._positionItem(d.item, d.x, d.y, d.isInstant);
        }
    }, g.prototype._positionItem = function(a, b, c, d) {
        d ? a.goTo(b, c) : a.moveTo(b, c);
    }, g.prototype._postLayout = function() {
        this.resizeContainer();
    }, g.prototype.resizeContainer = function() {
        if (this.options.isResizingContainer) {
            var a = this._getContainerSize();
            a && (this._setContainerMeasure(a.width, !0), this._setContainerMeasure(a.height, !1));
        }
    }, g.prototype._getContainerSize = j, g.prototype._setContainerMeasure = function(a, b) {
        if (void 0 !== a) {
            var c = this.size;
            c.isBorderBox && (a += b ? c.paddingLeft + c.paddingRight + c.borderLeftWidth + c.borderRightWidth : c.paddingBottom + c.paddingTop + c.borderTopWidth + c.borderBottomWidth), 
            a = Math.max(a, 0), this.element.style[b ? "width" : "height"] = a + "px";
        }
    }, g.prototype._emitCompleteOnItems = function(a, b) {
        function c() {
            e.dispatchEvent(a + "Complete", null, [ b ]);
        }
        function d() {
            g++, g === f && c();
        }
        var e = this, f = b.length;
        if (!b || !f) return void c();
        for (var g = 0, h = 0, i = b.length; i > h; h++) {
            var j = b[h];
            j.once(a, d);
        }
    }, g.prototype.dispatchEvent = function(a, b, c) {
        var d = b ? [ b ].concat(c) : c;
        if (this.emitEvent(a, d), i) if (this.$element = this.$element || i(this.element), 
        b) {
            var e = i.Event(b);
            e.type = a, this.$element.trigger(e, c);
        } else this.$element.trigger(a, c);
    }, g.prototype.ignore = function(a) {
        var b = this.getItem(a);
        b && (b.isIgnored = !0);
    }, g.prototype.unignore = function(a) {
        var b = this.getItem(a);
        b && delete b.isIgnored;
    }, g.prototype.stamp = function(a) {
        if (a = this._find(a)) {
            this.stamps = this.stamps.concat(a);
            for (var b = 0, c = a.length; c > b; b++) {
                var d = a[b];
                this.ignore(d);
            }
        }
    }, g.prototype.unstamp = function(a) {
        if (a = this._find(a)) for (var b = 0, c = a.length; c > b; b++) {
            var d = a[b];
            e.removeFrom(this.stamps, d), this.unignore(d);
        }
    }, g.prototype._find = function(a) {
        return a ? ("string" == typeof a && (a = this.element.querySelectorAll(a)), a = e.makeArray(a)) : void 0;
    }, g.prototype._manageStamps = function() {
        if (this.stamps && this.stamps.length) {
            this._getBoundingRect();
            for (var a = 0, b = this.stamps.length; b > a; a++) {
                var c = this.stamps[a];
                this._manageStamp(c);
            }
        }
    }, g.prototype._getBoundingRect = function() {
        var a = this.element.getBoundingClientRect(), b = this.size;
        this._boundingRect = {
            left: a.left + b.paddingLeft + b.borderLeftWidth,
            top: a.top + b.paddingTop + b.borderTopWidth,
            right: a.right - (b.paddingRight + b.borderRightWidth),
            bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth)
        };
    }, g.prototype._manageStamp = j, g.prototype._getElementOffset = function(a) {
        var b = a.getBoundingClientRect(), c = this._boundingRect, e = d(a), f = {
            left: b.left - c.left - e.marginLeft,
            top: b.top - c.top - e.marginTop,
            right: c.right - b.right - e.marginRight,
            bottom: c.bottom - b.bottom - e.marginBottom
        };
        return f;
    }, g.prototype.handleEvent = function(a) {
        var b = "on" + a.type;
        this[b] && this[b](a);
    }, g.prototype.bindResize = function() {
        this.isResizeBound || (b.bind(a, "resize", this), this.isResizeBound = !0);
    }, g.prototype.unbindResize = function() {
        this.isResizeBound && b.unbind(a, "resize", this), this.isResizeBound = !1;
    }, g.prototype.onresize = function() {
        function a() {
            b.resize(), delete b.resizeTimeout;
        }
        this.resizeTimeout && clearTimeout(this.resizeTimeout);
        var b = this;
        this.resizeTimeout = setTimeout(a, 100);
    }, g.prototype.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
    }, g.prototype.needsResizeLayout = function() {
        var a = d(this.element), b = this.size && a;
        return b && a.innerWidth !== this.size.innerWidth;
    }, g.prototype.addItems = function(a) {
        var b = this._itemize(a);
        return b.length && (this.items = this.items.concat(b)), b;
    }, g.prototype.appended = function(a) {
        var b = this.addItems(a);
        b.length && (this.layoutItems(b, !0), this.reveal(b));
    }, g.prototype.prepended = function(a) {
        var b = this._itemize(a);
        if (b.length) {
            var c = this.items.slice(0);
            this.items = b.concat(c), this._resetLayout(), this._manageStamps(), this.layoutItems(b, !0), 
            this.reveal(b), this.layoutItems(c);
        }
    }, g.prototype.reveal = function(a) {
        this._emitCompleteOnItems("reveal", a);
        for (var b = a && a.length, c = 0; b && b > c; c++) {
            var d = a[c];
            d.reveal();
        }
    }, g.prototype.hide = function(a) {
        this._emitCompleteOnItems("hide", a);
        for (var b = a && a.length, c = 0; b && b > c; c++) {
            var d = a[c];
            d.hide();
        }
    }, g.prototype.revealItemElements = function(a) {
        var b = this.getItems(a);
        this.reveal(b);
    }, g.prototype.hideItemElements = function(a) {
        var b = this.getItems(a);
        this.hide(b);
    }, g.prototype.getItem = function(a) {
        for (var b = 0, c = this.items.length; c > b; b++) {
            var d = this.items[b];
            if (d.element === a) return d;
        }
    }, g.prototype.getItems = function(a) {
        a = e.makeArray(a);
        for (var b = [], c = 0, d = a.length; d > c; c++) {
            var f = a[c], g = this.getItem(f);
            g && b.push(g);
        }
        return b;
    }, g.prototype.remove = function(a) {
        var b = this.getItems(a);
        if (this._emitCompleteOnItems("remove", b), b && b.length) for (var c = 0, d = b.length; d > c; c++) {
            var f = b[c];
            f.remove(), e.removeFrom(this.items, f);
        }
    }, g.prototype.destroy = function() {
        var a = this.element.style;
        a.height = "", a.position = "", a.width = "";
        for (var b = 0, c = this.items.length; c > b; b++) {
            var d = this.items[b];
            d.destroy();
        }
        this.unbindResize();
        var e = this.element.outlayerGUID;
        delete l[e], delete this.element.outlayerGUID, i && i.removeData(this.element, this.constructor.namespace);
    }, g.data = function(a) {
        a = e.getQueryElement(a);
        var b = a && a.outlayerGUID;
        return b && l[b];
    }, g.create = function(a, b) {
        function c() {
            g.apply(this, arguments);
        }
        return Object.create ? c.prototype = Object.create(g.prototype) : e.extend(c.prototype, g.prototype), 
        c.prototype.constructor = c, c.defaults = e.extend({}, g.defaults), e.extend(c.defaults, b), 
        c.prototype.settings = {}, c.namespace = a, c.data = g.data, c.Item = function() {
            f.apply(this, arguments);
        }, c.Item.prototype = new f(), e.htmlInit(c, a), i && i.bridget && i.bridget(a, c), 
        c;
    }, g.Item = f, g;
}), function(a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define("isotope/js/item", [ "outlayer/outlayer" ], b) : "object" == typeof exports ? module.exports = b(require("outlayer")) : (a.Isotope = a.Isotope || {}, 
    a.Isotope.Item = b(a.Outlayer));
}(window, function(a) {
    "use strict";
    function b() {
        a.Item.apply(this, arguments);
    }
    b.prototype = new a.Item(), b.prototype._create = function() {
        this.id = this.layout.itemGUID++, a.Item.prototype._create.call(this), this.sortData = {};
    }, b.prototype.updateSortData = function() {
        if (!this.isIgnored) {
            this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
            var a = this.layout.options.getSortData, b = this.layout._sorters;
            for (var c in a) {
                var d = b[c];
                this.sortData[c] = d(this.element, this);
            }
        }
    };
    var c = b.prototype.destroy;
    return b.prototype.destroy = function() {
        c.apply(this, arguments), this.css({
            display: ""
        });
    }, b;
}), function(a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define("isotope/js/layout-mode", [ "get-size/get-size", "outlayer/outlayer" ], b) : "object" == typeof exports ? module.exports = b(require("get-size"), require("outlayer")) : (a.Isotope = a.Isotope || {}, 
    a.Isotope.LayoutMode = b(a.getSize, a.Outlayer));
}(window, function(a, b) {
    "use strict";
    function c(a) {
        this.isotope = a, a && (this.options = a.options[this.namespace], this.element = a.element, 
        this.items = a.filteredItems, this.size = a.size);
    }
    return function() {
        function a(a) {
            return function() {
                return b.prototype[a].apply(this.isotope, arguments);
            };
        }
        for (var d = [ "_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout" ], e = 0, f = d.length; f > e; e++) {
            var g = d[e];
            c.prototype[g] = a(g);
        }
    }(), c.prototype.needsVerticalResizeLayout = function() {
        var b = a(this.isotope.element), c = this.isotope.size && b;
        return c && b.innerHeight != this.isotope.size.innerHeight;
    }, c.prototype._getMeasurement = function() {
        this.isotope._getMeasurement.apply(this, arguments);
    }, c.prototype.getColumnWidth = function() {
        this.getSegmentSize("column", "Width");
    }, c.prototype.getRowHeight = function() {
        this.getSegmentSize("row", "Height");
    }, c.prototype.getSegmentSize = function(a, b) {
        var c = a + b, d = "outer" + b;
        if (this._getMeasurement(c, d), !this[c]) {
            var e = this.getFirstItemSize();
            this[c] = e && e[d] || this.isotope.size["inner" + b];
        }
    }, c.prototype.getFirstItemSize = function() {
        var b = this.isotope.filteredItems[0];
        return b && b.element && a(b.element);
    }, c.prototype.layout = function() {
        this.isotope.layout.apply(this.isotope, arguments);
    }, c.prototype.getSize = function() {
        this.isotope.getSize(), this.size = this.isotope.size;
    }, c.modes = {}, c.create = function(a, b) {
        function d() {
            c.apply(this, arguments);
        }
        return d.prototype = new c(), b && (d.options = b), d.prototype.namespace = a, c.modes[a] = d, 
        d;
    }, c;
}), function(a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define("masonry/masonry", [ "outlayer/outlayer", "get-size/get-size", "fizzy-ui-utils/utils" ], b) : "object" == typeof exports ? module.exports = b(require("outlayer"), require("get-size"), require("fizzy-ui-utils")) : a.Masonry = b(a.Outlayer, a.getSize, a.fizzyUIUtils);
}(window, function(a, b, c) {
    var d = a.create("masonry");
    return d.prototype._resetLayout = function() {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), 
        this.measureColumns();
        var a = this.cols;
        for (this.colYs = []; a--; ) this.colYs.push(0);
        this.maxY = 0;
    }, d.prototype.measureColumns = function() {
        if (this.getContainerWidth(), !this.columnWidth) {
            var a = this.items[0], c = a && a.element;
            this.columnWidth = c && b(c).outerWidth || this.containerWidth;
        }
        var d = this.columnWidth += this.gutter, e = this.containerWidth + this.gutter, f = e / d, g = d - e % d, h = g && 1 > g ? "round" : "floor";
        f = Math[h](f), this.cols = Math.max(f, 1);
    }, d.prototype.getContainerWidth = function() {
        var a = this.options.isFitWidth ? this.element.parentNode : this.element, c = b(a);
        this.containerWidth = c && c.innerWidth;
    }, d.prototype._getItemLayoutPosition = function(a) {
        a.getSize();
        var b = a.size.outerWidth % this.columnWidth, d = b && 1 > b ? "round" : "ceil", e = Math[d](a.size.outerWidth / this.columnWidth);
        e = Math.min(e, this.cols);
        for (var f = this._getColGroup(e), g = Math.min.apply(Math, f), h = c.indexOf(f, g), i = {
            x: this.columnWidth * h,
            y: g
        }, j = g + a.size.outerHeight, k = this.cols + 1 - f.length, l = 0; k > l; l++) this.colYs[h + l] = j;
        return i;
    }, d.prototype._getColGroup = function(a) {
        if (2 > a) return this.colYs;
        for (var b = [], c = this.cols + 1 - a, d = 0; c > d; d++) {
            var e = this.colYs.slice(d, d + a);
            b[d] = Math.max.apply(Math, e);
        }
        return b;
    }, d.prototype._manageStamp = function(a) {
        var c = b(a), d = this._getElementOffset(a), e = this.options.isOriginLeft ? d.left : d.right, f = e + c.outerWidth, g = Math.floor(e / this.columnWidth);
        g = Math.max(0, g);
        var h = Math.floor(f / this.columnWidth);
        h -= f % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);
        for (var i = (this.options.isOriginTop ? d.top : d.bottom) + c.outerHeight, j = g; h >= j; j++) this.colYs[j] = Math.max(i, this.colYs[j]);
    }, d.prototype._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var a = {
            height: this.maxY
        };
        return this.options.isFitWidth && (a.width = this._getContainerFitWidth()), a;
    }, d.prototype._getContainerFitWidth = function() {
        for (var a = 0, b = this.cols; --b && 0 === this.colYs[b]; ) a++;
        return (this.cols - a) * this.columnWidth - this.gutter;
    }, d.prototype.needsResizeLayout = function() {
        var a = this.containerWidth;
        return this.getContainerWidth(), a !== this.containerWidth;
    }, d;
}), function(a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/masonry", [ "../layout-mode", "masonry/masonry" ], b) : "object" == typeof exports ? module.exports = b(require("../layout-mode"), require("masonry-layout")) : b(a.Isotope.LayoutMode, a.Masonry);
}(window, function(a, b) {
    "use strict";
    function c(a, b) {
        for (var c in b) a[c] = b[c];
        return a;
    }
    var d = a.create("masonry"), e = d.prototype._getElementOffset, f = d.prototype.layout, g = d.prototype._getMeasurement;
    c(d.prototype, b.prototype), d.prototype._getElementOffset = e, d.prototype.layout = f, 
    d.prototype._getMeasurement = g;
    var h = d.prototype.measureColumns;
    d.prototype.measureColumns = function() {
        this.items = this.isotope.filteredItems, h.call(this);
    };
    var i = d.prototype._manageStamp;
    return d.prototype._manageStamp = function() {
        this.options.isOriginLeft = this.isotope.options.isOriginLeft, this.options.isOriginTop = this.isotope.options.isOriginTop, 
        i.apply(this, arguments);
    }, d;
}), function(a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/fit-rows", [ "../layout-mode" ], b) : "object" == typeof exports ? module.exports = b(require("../layout-mode")) : b(a.Isotope.LayoutMode);
}(window, function(a) {
    "use strict";
    var b = a.create("fitRows");
    return b.prototype._resetLayout = function() {
        this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth");
    }, b.prototype._getItemLayoutPosition = function(a) {
        a.getSize();
        var b = a.size.outerWidth + this.gutter, c = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && b + this.x > c && (this.x = 0, this.y = this.maxY);
        var d = {
            x: this.x,
            y: this.y
        };
        return this.maxY = Math.max(this.maxY, this.y + a.size.outerHeight), this.x += b, 
        d;
    }, b.prototype._getContainerSize = function() {
        return {
            height: this.maxY
        };
    }, b;
}), function(a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define("isotope/js/layout-modes/vertical", [ "../layout-mode" ], b) : "object" == typeof exports ? module.exports = b(require("../layout-mode")) : b(a.Isotope.LayoutMode);
}(window, function(a) {
    "use strict";
    var b = a.create("vertical", {
        horizontalAlignment: 0
    });
    return b.prototype._resetLayout = function() {
        this.y = 0;
    }, b.prototype._getItemLayoutPosition = function(a) {
        a.getSize();
        var b = (this.isotope.size.innerWidth - a.size.outerWidth) * this.options.horizontalAlignment, c = this.y;
        return this.y += a.size.outerHeight, {
            x: b,
            y: c
        };
    }, b.prototype._getContainerSize = function() {
        return {
            height: this.y
        };
    }, b;
}), function(a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "outlayer/outlayer", "get-size/get-size", "matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope/js/item", "isotope/js/layout-mode", "isotope/js/layout-modes/masonry", "isotope/js/layout-modes/fit-rows", "isotope/js/layout-modes/vertical" ], function(c, d, e, f, g, h) {
        return b(a, c, d, e, f, g, h);
    }) : "object" == typeof exports ? module.exports = b(a, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("./item"), require("./layout-mode"), require("./layout-modes/masonry"), require("./layout-modes/fit-rows"), require("./layout-modes/vertical")) : a.Isotope = b(a, a.Outlayer, a.getSize, a.matchesSelector, a.fizzyUIUtils, a.Isotope.Item, a.Isotope.LayoutMode);
}(window, function(a, b, c, d, e, f, g) {
    function h(a, b) {
        return function(c, d) {
            for (var e = 0, f = a.length; f > e; e++) {
                var g = a[e], h = c.sortData[g], i = d.sortData[g];
                if (h > i || i > h) {
                    var j = void 0 !== b[g] ? b[g] : b, k = j ? 1 : -1;
                    return (h > i ? 1 : -1) * k;
                }
            }
            return 0;
        };
    }
    var i = a.jQuery, j = String.prototype.trim ? function(a) {
        return a.trim();
    } : function(a) {
        return a.replace(/^\s+|\s+$/g, "");
    }, k = document.documentElement, l = k.textContent ? function(a) {
        return a.textContent;
    } : function(a) {
        return a.innerText;
    }, m = b.create("isotope", {
        layoutMode: "masonry",
        isJQueryFiltering: !0,
        sortAscending: !0
    });
    m.Item = f, m.LayoutMode = g, m.prototype._create = function() {
        this.itemGUID = 0, this._sorters = {}, this._getSorters(), b.prototype._create.call(this), 
        this.modes = {}, this.filteredItems = this.items, this.sortHistory = [ "original-order" ];
        for (var a in g.modes) this._initLayoutMode(a);
    }, m.prototype.reloadItems = function() {
        this.itemGUID = 0, b.prototype.reloadItems.call(this);
    }, m.prototype._itemize = function() {
        for (var a = b.prototype._itemize.apply(this, arguments), c = 0, d = a.length; d > c; c++) {
            var e = a[c];
            e.id = this.itemGUID++;
        }
        return this._updateItemsSortData(a), a;
    }, m.prototype._initLayoutMode = function(a) {
        var b = g.modes[a], c = this.options[a] || {};
        this.options[a] = b.options ? e.extend(b.options, c) : c, this.modes[a] = new b(this);
    }, m.prototype.layout = function() {
        return !this._isLayoutInited && this.options.isInitLayout ? void this.arrange() : void this._layout();
    }, m.prototype._layout = function() {
        var a = this._getIsInstant();
        this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, a), 
        this._isLayoutInited = !0;
    }, m.prototype.arrange = function(a) {
        function b() {
            d.reveal(c.needReveal), d.hide(c.needHide);
        }
        this.option(a), this._getIsInstant();
        var c = this._filter(this.items);
        this.filteredItems = c.matches;
        var d = this;
        this._bindArrangeComplete(), this._isInstant ? this._noTransition(b) : b(), this._sort(), 
        this._layout();
    }, m.prototype._init = m.prototype.arrange, m.prototype._getIsInstant = function() {
        var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
        return this._isInstant = a, a;
    }, m.prototype._bindArrangeComplete = function() {
        function a() {
            b && c && d && e.dispatchEvent("arrangeComplete", null, [ e.filteredItems ]);
        }
        var b, c, d, e = this;
        this.once("layoutComplete", function() {
            b = !0, a();
        }), this.once("hideComplete", function() {
            c = !0, a();
        }), this.once("revealComplete", function() {
            d = !0, a();
        });
    }, m.prototype._filter = function(a) {
        var b = this.options.filter;
        b = b || "*";
        for (var c = [], d = [], e = [], f = this._getFilterTest(b), g = 0, h = a.length; h > g; g++) {
            var i = a[g];
            if (!i.isIgnored) {
                var j = f(i);
                j && c.push(i), j && i.isHidden ? d.push(i) : j || i.isHidden || e.push(i);
            }
        }
        return {
            matches: c,
            needReveal: d,
            needHide: e
        };
    }, m.prototype._getFilterTest = function(a) {
        return i && this.options.isJQueryFiltering ? function(b) {
            return i(b.element).is(a);
        } : "function" == typeof a ? function(b) {
            return a(b.element);
        } : function(b) {
            return d(b.element, a);
        };
    }, m.prototype.updateSortData = function(a) {
        var b;
        a ? (a = e.makeArray(a), b = this.getItems(a)) : b = this.items, this._getSorters(), 
        this._updateItemsSortData(b);
    }, m.prototype._getSorters = function() {
        var a = this.options.getSortData;
        for (var b in a) {
            var c = a[b];
            this._sorters[b] = n(c);
        }
    }, m.prototype._updateItemsSortData = function(a) {
        for (var b = a && a.length, c = 0; b && b > c; c++) {
            var d = a[c];
            d.updateSortData();
        }
    };
    var n = function() {
        function a(a) {
            if ("string" != typeof a) return a;
            var c = j(a).split(" "), d = c[0], e = d.match(/^\[(.+)\]$/), f = e && e[1], g = b(f, d), h = m.sortDataParsers[c[1]];
            return a = h ? function(a) {
                return a && h(g(a));
            } : function(a) {
                return a && g(a);
            };
        }
        function b(a, b) {
            var c;
            return c = a ? function(b) {
                return b.getAttribute(a);
            } : function(a) {
                var c = a.querySelector(b);
                return c && l(c);
            };
        }
        return a;
    }();
    m.sortDataParsers = {
        parseInt: function(a) {
            return parseInt(a, 10);
        },
        parseFloat: function(a) {
            return parseFloat(a);
        }
    }, m.prototype._sort = function() {
        var a = this.options.sortBy;
        if (a) {
            var b = [].concat.apply(a, this.sortHistory), c = h(b, this.options.sortAscending);
            this.filteredItems.sort(c), a != this.sortHistory[0] && this.sortHistory.unshift(a);
        }
    }, m.prototype._mode = function() {
        var a = this.options.layoutMode, b = this.modes[a];
        if (!b) throw new Error("No layout mode: " + a);
        return b.options = this.options[a], b;
    }, m.prototype._resetLayout = function() {
        b.prototype._resetLayout.call(this), this._mode()._resetLayout();
    }, m.prototype._getItemLayoutPosition = function(a) {
        return this._mode()._getItemLayoutPosition(a);
    }, m.prototype._manageStamp = function(a) {
        this._mode()._manageStamp(a);
    }, m.prototype._getContainerSize = function() {
        return this._mode()._getContainerSize();
    }, m.prototype.needsResizeLayout = function() {
        return this._mode().needsResizeLayout();
    }, m.prototype.appended = function(a) {
        var b = this.addItems(a);
        if (b.length) {
            var c = this._filterRevealAdded(b);
            this.filteredItems = this.filteredItems.concat(c);
        }
    }, m.prototype.prepended = function(a) {
        var b = this._itemize(a);
        if (b.length) {
            this._resetLayout(), this._manageStamps();
            var c = this._filterRevealAdded(b);
            this.layoutItems(this.filteredItems), this.filteredItems = c.concat(this.filteredItems), 
            this.items = b.concat(this.items);
        }
    }, m.prototype._filterRevealAdded = function(a) {
        var b = this._filter(a);
        return this.hide(b.needHide), this.reveal(b.matches), this.layoutItems(b.matches, !0), 
        b.matches;
    }, m.prototype.insert = function(a) {
        var b = this.addItems(a);
        if (b.length) {
            var c, d, e = b.length;
            for (c = 0; e > c; c++) d = b[c], this.element.appendChild(d.element);
            var f = this._filter(b).matches;
            for (c = 0; e > c; c++) b[c].isLayoutInstant = !0;
            for (this.arrange(), c = 0; e > c; c++) delete b[c].isLayoutInstant;
            this.reveal(f);
        }
    };
    var o = m.prototype.remove;
    return m.prototype.remove = function(a) {
        a = e.makeArray(a);
        var b = this.getItems(a);
        o.call(this, a);
        var c = b && b.length;
        if (c) for (var d = 0; c > d; d++) {
            var f = b[d];
            e.removeFrom(this.filteredItems, f);
        }
    }, m.prototype.shuffle = function() {
        for (var a = 0, b = this.items.length; b > a; a++) {
            var c = this.items[a];
            c.sortData.random = Math.random();
        }
        this.options.sortBy = "random", this._sort(), this._layout();
    }, m.prototype._noTransition = function(a) {
        var b = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var c = a.call(this);
        return this.options.transitionDuration = b, c;
    }, m.prototype.getFilteredItemElements = function() {
        for (var a = [], b = 0, c = this.filteredItems.length; c > b; b++) a.push(this.filteredItems[b].element);
        return a;
    }, m;
});

/*!
 * FancyBox - jQuery Plugin
 * Simple and fancy lightbox alternative
 *
 * Examples and documentation at: http://fancybox.net
 *
 * Copyright (c) 2008 - 2010 Janis Skarnelis
 * That said, it is hardly a one-person project. Many people have submitted bugs, code, and offered their advice freely. Their support is greatly appreciated.
 *
 * Version: 1.3.4 (11/11/2010)
 * Requires: jQuery v1.3+
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function(b) {
    var m, t, u, f, D, j, E, n, z, A, q = 0, e = {}, o = [], p = 0, d = {}, l = [], G = null, v = new Image(), J = /\.(jpg|gif|png|bmp|jpeg)(.*)?$/i, W = /[^\.]\.(swf)\s*$/i, K, L = 1, y = 0, s = "", r, i, h = false, B = b.extend(b("<div/>")[0], {
        prop: 0
    }), M = b.browser.msie && b.browser.version < 7 && !window.XMLHttpRequest, N = function() {
        t.hide();
        v.onerror = v.onload = null;
        G && G.abort();
        m.empty();
    }, O = function() {
        if (false === e.onError(o, q, e)) {
            t.hide();
            h = false;
        } else {
            e.titleShow = false;
            e.width = "auto";
            e.height = "auto";
            m.html('<p id="fancybox-error">The requested content cannot be loaded.<br />Please try again later.</p>');
            F();
        }
    }, I = function() {
        var a = o[q], c, g, k, C, P, w;
        N();
        e = b.extend({}, b.fn.fancybox.defaults, typeof b(a).data("fancybox") == "undefined" ? e : b(a).data("fancybox"));
        w = e.onStart(o, q, e);
        if (w === false) h = false; else {
            if (typeof w == "object") e = b.extend(e, w);
            k = e.title || (a.nodeName ? b(a).attr("title") : a.title) || "";
            if (a.nodeName && !e.orig) e.orig = b(a).children("img:first").length ? b(a).children("img:first") : b(a);
            if (k === "" && e.orig && e.titleFromAlt) k = e.orig.attr("alt");
            c = e.href || (a.nodeName ? b(a).attr("href") : a.href) || null;
            if (/^(?:javascript)/i.test(c) || c == "#") c = null;
            if (e.type) {
                g = e.type;
                if (!c) c = e.content;
            } else if (e.content) g = "html"; else if (c) g = c.match(J) ? "image" : c.match(W) ? "swf" : b(a).hasClass("iframe") ? "iframe" : c.indexOf("#") === 0 ? "inline" : "ajax";
            if (g) {
                if (g == "inline") {
                    a = c.substr(c.indexOf("#"));
                    g = b(a).length > 0 ? "inline" : "ajax";
                }
                e.type = g;
                e.href = c;
                e.title = k;
                if (e.autoDimensions) if (e.type == "html" || e.type == "inline" || e.type == "ajax") {
                    e.width = "auto";
                    e.height = "auto";
                } else e.autoDimensions = false;
                if (e.modal) {
                    e.overlayShow = true;
                    e.hideOnOverlayClick = false;
                    e.hideOnContentClick = false;
                    e.enableEscapeButton = false;
                    e.showCloseButton = false;
                }
                e.padding = parseInt(e.padding, 10);
                e.margin = parseInt(e.margin, 10);
                m.css("padding", e.padding + e.margin);
                b(".fancybox-inline-tmp").unbind("fancybox-cancel").bind("fancybox-change", function() {
                    b(this).replaceWith(j.children());
                });
                switch (g) {
                  case "html":
                    m.html(e.content);
                    F();
                    break;

                  case "inline":
                    if (b(a).parent().is("#fancybox-content") === true) {
                        h = false;
                        break;
                    }
                    b('<div class="fancybox-inline-tmp" />').hide().insertBefore(b(a)).bind("fancybox-cleanup", function() {
                        b(this).replaceWith(j.children());
                    }).bind("fancybox-cancel", function() {
                        b(this).replaceWith(m.children());
                    });
                    b(a).appendTo(m);
                    F();
                    break;

                  case "image":
                    h = false;
                    b.fancybox.showActivity();
                    v = new Image();
                    v.onerror = function() {
                        O();
                    };
                    v.onload = function() {
                        h = true;
                        v.onerror = v.onload = null;
                        e.width = v.width;
                        e.height = v.height;
                        b("<img />").attr({
                            id: "fancybox-img",
                            src: v.src,
                            alt: e.title
                        }).appendTo(m);
                        Q();
                    };
                    v.src = c;
                    break;

                  case "swf":
                    e.scrolling = "no";
                    C = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + e.width + '" height="' + e.height + '"><param name="movie" value="' + c + '"></param>';
                    P = "";
                    b.each(e.swf, function(x, H) {
                        C += '<param name="' + x + '" value="' + H + '"></param>';
                        P += " " + x + '="' + H + '"';
                    });
                    C += '<embed src="' + c + '" type="application/x-shockwave-flash" width="' + e.width + '" height="' + e.height + '"' + P + "></embed></object>";
                    m.html(C);
                    F();
                    break;

                  case "ajax":
                    h = false;
                    b.fancybox.showActivity();
                    e.ajax.win = e.ajax.success;
                    G = b.ajax(b.extend({}, e.ajax, {
                        url: c,
                        data: e.ajax.data || {},
                        error: function(x) {
                            x.status > 0 && O();
                        },
                        success: function(x, H, R) {
                            if ((typeof R == "object" ? R : G).status == 200) {
                                if (typeof e.ajax.win == "function") {
                                    w = e.ajax.win(c, x, H, R);
                                    if (w === false) {
                                        t.hide();
                                        return;
                                    } else if (typeof w == "string" || typeof w == "object") x = w;
                                }
                                m.html(x);
                                F();
                            }
                        }
                    }));
                    break;

                  case "iframe":
                    Q();
                }
            } else O();
        }
    }, F = function() {
        var a = e.width, c = e.height;
        a = a.toString().indexOf("%") > -1 ? parseInt((b(window).width() - e.margin * 2) * parseFloat(a) / 100, 10) + "px" : a == "auto" ? "auto" : a + "px";
        c = c.toString().indexOf("%") > -1 ? parseInt((b(window).height() - e.margin * 2) * parseFloat(c) / 100, 10) + "px" : c == "auto" ? "auto" : c + "px";
        m.wrapInner('<div style="width:' + a + ";height:" + c + ";overflow: " + (e.scrolling == "auto" ? "auto" : e.scrolling == "yes" ? "scroll" : "hidden") + ';position:relative;"></div>');
        e.width = m.width();
        e.height = m.height();
        Q();
    }, Q = function() {
        var a, c;
        t.hide();
        if (f.is(":visible") && false === d.onCleanup(l, p, d)) {
            b.event.trigger("fancybox-cancel");
            h = false;
        } else {
            h = true;
            b(j.add(u)).unbind();
            b(window).unbind("resize.fb scroll.fb");
            b(document).unbind("keydown.fb");
            f.is(":visible") && d.titlePosition !== "outside" && f.css("height", f.height());
            l = o;
            p = q;
            d = e;
            if (d.overlayShow) {
                u.css({
                    "background-color": d.overlayColor,
                    opacity: d.overlayOpacity,
                    cursor: d.hideOnOverlayClick ? "pointer" : "auto",
                    height: b(document).height()
                });
                if (!u.is(":visible")) {
                    M && b("select:not(#fancybox-tmp select)").filter(function() {
                        return this.style.visibility !== "hidden";
                    }).css({
                        visibility: "hidden"
                    }).one("fancybox-cleanup", function() {
                        this.style.visibility = "inherit";
                    });
                    u.show();
                }
            } else u.hide();
            i = X();
            s = d.title || "";
            y = 0;
            n.empty().removeAttr("style").removeClass();
            if (d.titleShow !== false) {
                if (b.isFunction(d.titleFormat)) a = d.titleFormat(s, l, p, d); else a = s && s.length ? d.titlePosition == "float" ? '<table id="fancybox-title-float-wrap" cellpadding="0" cellspacing="0"><tr><td id="fancybox-title-float-left"></td><td id="fancybox-title-float-main">' + s + '</td><td id="fancybox-title-float-right"></td></tr></table>' : '<div id="fancybox-title-' + d.titlePosition + '">' + s + "</div>" : false;
                s = a;
                if (!(!s || s === "")) {
                    n.addClass("fancybox-title-" + d.titlePosition).html(s).appendTo("body").show();
                    switch (d.titlePosition) {
                      case "inside":
                        n.css({
                            width: i.width - d.padding * 2,
                            marginLeft: d.padding,
                            marginRight: d.padding
                        });
                        y = n.outerHeight(true);
                        n.appendTo(D);
                        i.height += y;
                        break;

                      case "over":
                        n.css({
                            marginLeft: d.padding,
                            width: i.width - d.padding * 2,
                            bottom: d.padding
                        }).appendTo(D);
                        break;

                      case "float":
                        n.css("left", parseInt((n.width() - i.width - 40) / 2, 10) * -1).appendTo(f);
                        break;

                      default:
                        n.css({
                            width: i.width - d.padding * 2,
                            paddingLeft: d.padding,
                            paddingRight: d.padding
                        }).appendTo(f);
                    }
                }
            }
            n.hide();
            if (f.is(":visible")) {
                b(E.add(z).add(A)).hide();
                a = f.position();
                r = {
                    top: a.top,
                    left: a.left,
                    width: f.width(),
                    height: f.height()
                };
                c = r.width == i.width && r.height == i.height;
                j.fadeTo(d.changeFade, .3, function() {
                    var g = function() {
                        j.html(m.contents()).fadeTo(d.changeFade, 1, S);
                    };
                    b.event.trigger("fancybox-change");
                    j.empty().removeAttr("filter").css({
                        "border-width": d.padding,
                        width: i.width - d.padding * 2,
                        height: e.autoDimensions ? "auto" : i.height - y - d.padding * 2
                    });
                    if (c) g(); else {
                        B.prop = 0;
                        b(B).animate({
                            prop: 1
                        }, {
                            duration: d.changeSpeed,
                            easing: d.easingChange,
                            step: T,
                            complete: g
                        });
                    }
                });
            } else {
                f.removeAttr("style");
                j.css("border-width", d.padding);
                if (d.transitionIn == "elastic") {
                    r = V();
                    j.html(m.contents());
                    f.show();
                    if (d.opacity) i.opacity = 0;
                    B.prop = 0;
                    b(B).animate({
                        prop: 1
                    }, {
                        duration: d.speedIn,
                        easing: d.easingIn,
                        step: T,
                        complete: S
                    });
                } else {
                    d.titlePosition == "inside" && y > 0 && n.show();
                    j.css({
                        width: i.width - d.padding * 2,
                        height: e.autoDimensions ? "auto" : i.height - y - d.padding * 2
                    }).html(m.contents());
                    f.css(i).fadeIn(d.transitionIn == "none" ? 0 : d.speedIn, S);
                }
            }
        }
    }, Y = function() {
        if (d.enableEscapeButton || d.enableKeyboardNav) b(document).bind("keydown.fb", function(a) {
            if (a.keyCode == 27 && d.enableEscapeButton) {
                a.preventDefault();
                b.fancybox.close();
            } else if ((a.keyCode == 37 || a.keyCode == 39) && d.enableKeyboardNav && a.target.tagName !== "INPUT" && a.target.tagName !== "TEXTAREA" && a.target.tagName !== "SELECT") {
                a.preventDefault();
                b.fancybox[a.keyCode == 37 ? "prev" : "next"]();
            }
        });
        if (d.showNavArrows) {
            if (d.cyclic && l.length > 1 || p !== 0) z.show();
            if (d.cyclic && l.length > 1 || p != l.length - 1) A.show();
        } else {
            z.hide();
            A.hide();
        }
    }, S = function() {
        if (!b.support.opacity) {
            j.get(0).style.removeAttribute("filter");
            f.get(0).style.removeAttribute("filter");
        }
        e.autoDimensions && j.css("height", "auto");
        f.css("height", "auto");
        s && s.length && n.show();
        d.showCloseButton && E.show();
        Y();
        d.hideOnContentClick && j.bind("click", b.fancybox.close);
        d.hideOnOverlayClick && u.bind("click", b.fancybox.close);
        b(window).bind("resize.fb", b.fancybox.resize);
        d.centerOnScroll && b(window).bind("scroll.fb", b.fancybox.center);
        if (d.type == "iframe") b('<iframe id="fancybox-frame" name="fancybox-frame' + new Date().getTime() + '" frameborder="0" hspace="0" ' + (b.browser.msie ? 'allowtransparency="true""' : "") + ' scrolling="' + e.scrolling + '" src="' + d.href + '"></iframe>').appendTo(j);
        f.show();
        h = false;
        b.fancybox.center();
        d.onComplete(l, p, d);
        var a, c;
        if (l.length - 1 > p) {
            a = l[p + 1].href;
            if (typeof a !== "undefined" && a.match(J)) {
                c = new Image();
                c.src = a;
            }
        }
        if (p > 0) {
            a = l[p - 1].href;
            if (typeof a !== "undefined" && a.match(J)) {
                c = new Image();
                c.src = a;
            }
        }
    }, T = function(a) {
        var c = {
            width: parseInt(r.width + (i.width - r.width) * a, 10),
            height: parseInt(r.height + (i.height - r.height) * a, 10),
            top: parseInt(r.top + (i.top - r.top) * a, 10),
            left: parseInt(r.left + (i.left - r.left) * a, 10)
        };
        if (typeof i.opacity !== "undefined") c.opacity = a < .5 ? .5 : a;
        f.css(c);
        j.css({
            width: c.width - d.padding * 2,
            height: c.height - y * a - d.padding * 2
        });
    }, U = function() {
        return [ b(window).width() - d.margin * 2, b(window).height() - d.margin * 2, b(document).scrollLeft() + d.margin, b(document).scrollTop() + d.margin ];
    }, X = function() {
        var a = U(), c = {}, g = d.autoScale, k = d.padding * 2;
        c.width = d.width.toString().indexOf("%") > -1 ? parseInt(a[0] * parseFloat(d.width) / 100, 10) : d.width + k;
        c.height = d.height.toString().indexOf("%") > -1 ? parseInt(a[1] * parseFloat(d.height) / 100, 10) : d.height + k;
        if (g && (c.width > a[0] || c.height > a[1])) if (e.type == "image" || e.type == "swf") {
            g = d.width / d.height;
            if (c.width > a[0]) {
                c.width = a[0];
                c.height = parseInt((c.width - k) / g + k, 10);
            }
            if (c.height > a[1]) {
                c.height = a[1];
                c.width = parseInt((c.height - k) * g + k, 10);
            }
        } else {
            c.width = Math.min(c.width, a[0]);
            c.height = Math.min(c.height, a[1]);
        }
        c.top = parseInt(Math.max(a[3] - 20, a[3] + (a[1] - c.height - 40) * .5), 10);
        c.left = parseInt(Math.max(a[2] - 20, a[2] + (a[0] - c.width - 40) * .5), 10);
        return c;
    }, V = function() {
        var a = e.orig ? b(e.orig) : false, c = {};
        if (a && a.length) {
            c = a.offset();
            c.top += parseInt(a.css("paddingTop"), 10) || 0;
            c.left += parseInt(a.css("paddingLeft"), 10) || 0;
            c.top += parseInt(a.css("border-top-width"), 10) || 0;
            c.left += parseInt(a.css("border-left-width"), 10) || 0;
            c.width = a.width();
            c.height = a.height();
            c = {
                width: c.width + d.padding * 2,
                height: c.height + d.padding * 2,
                top: c.top - d.padding - 20,
                left: c.left - d.padding - 20
            };
        } else {
            a = U();
            c = {
                width: d.padding * 2,
                height: d.padding * 2,
                top: parseInt(a[3] + a[1] * .5, 10),
                left: parseInt(a[2] + a[0] * .5, 10)
            };
        }
        return c;
    }, Z = function() {
        if (t.is(":visible")) {
            b("div", t).css("top", L * -40 + "px");
            L = (L + 1) % 12;
        } else clearInterval(K);
    };
    b.fn.fancybox = function(a) {
        if (!b(this).length) return this;
        b(this).data("fancybox", b.extend({}, a, b.metadata ? b(this).metadata() : {})).unbind("click.fb").bind("click.fb", function(c) {
            c.preventDefault();
            if (!h) {
                h = true;
                b(this).blur();
                o = [];
                q = 0;
                c = b(this).attr("rel") || "";
                if (!c || c == "" || c === "nofollow") o.push(this); else {
                    o = b("a[rel=" + c + "], area[rel=" + c + "]");
                    q = o.index(this);
                }
                I();
            }
        });
        return this;
    };
    b.fancybox = function(a, c) {
        var g;
        if (!h) {
            h = true;
            g = typeof c !== "undefined" ? c : {};
            o = [];
            q = parseInt(g.index, 10) || 0;
            if (b.isArray(a)) {
                for (var k = 0, C = a.length; k < C; k++) if (typeof a[k] == "object") b(a[k]).data("fancybox", b.extend({}, g, a[k])); else a[k] = b({}).data("fancybox", b.extend({
                    content: a[k]
                }, g));
                o = jQuery.merge(o, a);
            } else {
                if (typeof a == "object") b(a).data("fancybox", b.extend({}, g, a)); else a = b({}).data("fancybox", b.extend({
                    content: a
                }, g));
                o.push(a);
            }
            if (q > o.length || q < 0) q = 0;
            I();
        }
    };
    b.fancybox.showActivity = function() {
        clearInterval(K);
        t.show();
        K = setInterval(Z, 66);
    };
    b.fancybox.hideActivity = function() {
        t.hide();
    };
    b.fancybox.next = function() {
        return b.fancybox.pos(p + 1);
    };
    b.fancybox.prev = function() {
        return b.fancybox.pos(p - 1);
    };
    b.fancybox.pos = function(a) {
        if (!h) {
            a = parseInt(a);
            o = l;
            if (a > -1 && a < l.length) {
                q = a;
                I();
            } else if (d.cyclic && l.length > 1) {
                q = a >= l.length ? 0 : l.length - 1;
                I();
            }
        }
    };
    b.fancybox.cancel = function() {
        if (!h) {
            h = true;
            b.event.trigger("fancybox-cancel");
            N();
            e.onCancel(o, q, e);
            h = false;
        }
    };
    b.fancybox.close = function() {
        function a() {
            u.fadeOut("fast");
            n.empty().hide();
            f.hide();
            b.event.trigger("fancybox-cleanup");
            j.empty();
            d.onClosed(l, p, d);
            l = e = [];
            p = q = 0;
            d = e = {};
            h = false;
        }
        if (!(h || f.is(":hidden"))) {
            h = true;
            if (d && false === d.onCleanup(l, p, d)) h = false; else {
                N();
                b(E.add(z).add(A)).hide();
                b(j.add(u)).unbind();
                b(window).unbind("resize.fb scroll.fb");
                b(document).unbind("keydown.fb");
                j.find("iframe").attr("src", M && /^https/i.test(window.location.href || "") ? "javascript:void(false)" : "about:blank");
                d.titlePosition !== "inside" && n.empty();
                f.stop();
                if (d.transitionOut == "elastic") {
                    r = V();
                    var c = f.position();
                    i = {
                        top: c.top,
                        left: c.left,
                        width: f.width(),
                        height: f.height()
                    };
                    if (d.opacity) i.opacity = 1;
                    n.empty().hide();
                    B.prop = 1;
                    b(B).animate({
                        prop: 0
                    }, {
                        duration: d.speedOut,
                        easing: d.easingOut,
                        step: T,
                        complete: a
                    });
                } else f.fadeOut(d.transitionOut == "none" ? 0 : d.speedOut, a);
            }
        }
    };
    b.fancybox.resize = function() {
        u.is(":visible") && u.css("height", b(document).height());
        b.fancybox.center(true);
    };
    b.fancybox.center = function(a) {
        var c, g;
        if (!h) {
            g = a === true ? 1 : 0;
            c = U();
            !g && (f.width() > c[0] || f.height() > c[1]) || f.stop().animate({
                top: parseInt(Math.max(c[3] - 20, c[3] + (c[1] - j.height() - 40) * .5 - d.padding)),
                left: parseInt(Math.max(c[2] - 20, c[2] + (c[0] - j.width() - 40) * .5 - d.padding))
            }, typeof a == "number" ? a : 200);
        }
    };
    b.fancybox.init = function() {
        if (!b("#fancybox-wrap").length) {
            b("body").append(m = b('<div id="fancybox-tmp"></div>'), t = b('<div id="fancybox-loading"><div></div></div>'), u = b('<div id="fancybox-overlay"></div>'), f = b('<div id="fancybox-wrap"></div>'));
            D = b('<div id="fancybox-outer"></div>').append('<div class="fancybox-bg" id="fancybox-bg-n"></div><div class="fancybox-bg" id="fancybox-bg-ne"></div><div class="fancybox-bg" id="fancybox-bg-e"></div><div class="fancybox-bg" id="fancybox-bg-se"></div><div class="fancybox-bg" id="fancybox-bg-s"></div><div class="fancybox-bg" id="fancybox-bg-sw"></div><div class="fancybox-bg" id="fancybox-bg-w"></div><div class="fancybox-bg" id="fancybox-bg-nw"></div>').appendTo(f);
            D.append(j = b('<div id="fancybox-content"></div>'), E = b('<a id="fancybox-close"></a>'), n = b('<div id="fancybox-title"></div>'), z = b('<a href="javascript:;" id="fancybox-left"><span class="fancy-ico" id="fancybox-left-ico"></span></a>'), A = b('<a href="javascript:;" id="fancybox-right"><span class="fancy-ico" id="fancybox-right-ico"></span></a>'));
            E.click(b.fancybox.close);
            t.click(b.fancybox.cancel);
            z.click(function(a) {
                a.preventDefault();
                b.fancybox.prev();
            });
            A.click(function(a) {
                a.preventDefault();
                b.fancybox.next();
            });
            b.fn.mousewheel && f.bind("mousewheel.fb", function(a, c) {
                if (h) a.preventDefault(); else if (b(a.target).get(0).clientHeight == 0 || b(a.target).get(0).scrollHeight === b(a.target).get(0).clientHeight) {
                    a.preventDefault();
                    b.fancybox[c > 0 ? "prev" : "next"]();
                }
            });
            b.support.opacity || f.addClass("fancybox-ie");
            if (M) {
                t.addClass("fancybox-ie6");
                f.addClass("fancybox-ie6");
                b('<iframe id="fancybox-hide-sel-frame" src="' + (/^https/i.test(window.location.href || "") ? "javascript:void(false)" : "about:blank") + '" scrolling="no" border="0" frameborder="0" tabindex="-1"></iframe>').prependTo(D);
            }
        }
    };
    b.fn.fancybox.defaults = {
        padding: 10,
        margin: 40,
        opacity: false,
        modal: false,
        cyclic: false,
        scrolling: "auto",
        width: 560,
        height: 340,
        autoScale: true,
        autoDimensions: true,
        centerOnScroll: false,
        ajax: {},
        swf: {
            wmode: "transparent"
        },
        hideOnOverlayClick: true,
        hideOnContentClick: false,
        overlayShow: true,
        overlayOpacity: .7,
        overlayColor: "#777",
        titleShow: true,
        titlePosition: "float",
        titleFormat: null,
        titleFromAlt: false,
        transitionIn: "fade",
        transitionOut: "fade",
        speedIn: 300,
        speedOut: 300,
        changeSpeed: 300,
        changeFade: "fast",
        easingIn: "swing",
        easingOut: "swing",
        showCloseButton: true,
        showNavArrows: true,
        enableEscapeButton: true,
        enableKeyboardNav: true,
        onStart: function() {},
        onCancel: function() {},
        onComplete: function() {},
        onCleanup: function() {},
        onClosed: function() {},
        onError: function() {}
    };
    b(document).ready(function() {
        b.fancybox.init();
    });
})(jQuery);