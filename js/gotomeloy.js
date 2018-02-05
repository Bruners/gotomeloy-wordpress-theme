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

// ==================================================
// fancyBox v3.2.5
//
// Licensed GPLv3 for open source use
// or fancyBox Commercial License for commercial use
//
// http://fancyapps.com/fancybox/
// Copyright 2017 fancyApps
//
// ==================================================
!function(t, e, n, o) {
    "use strict";
    function a(t) {
        var e = n(t.currentTarget), o = t.data ? t.data.options : {}, a = e.attr("data-fancybox") || "", i = 0, s = [];
        t.isDefaultPrevented() || (t.preventDefault(), a ? (s = o.selector ? n(o.selector) : t.data ? t.data.items : [], 
        s = s.length ? s.filter('[data-fancybox="' + a + '"]') : n('[data-fancybox="' + a + '"]'), 
        i = s.index(e), i < 0 && (i = 0)) : s = [ e ], n.fancybox.open(s, o, i));
    }
    if (n) {
        if (n.fn.fancybox) return void ("console" in t && console.log("fancyBox already initialized"));
        var i = {
            loop: !1,
            margin: [ 44, 0 ],
            gutter: 50,
            keyboard: !0,
            arrows: !0,
            infobar: !0,
            toolbar: !0,
            buttons: [ "slideShow", "fullScreen", "thumbs", "share", "close" ],
            idleTime: 3,
            smallBtn: "auto",
            protect: !1,
            modal: !1,
            image: {
                preload: "auto"
            },
            ajax: {
                settings: {
                    data: {
                        fancybox: !0
                    }
                }
            },
            iframe: {
                tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
                preload: !0,
                css: {},
                attr: {
                    scrolling: "auto"
                }
            },
            defaultType: "image",
            animationEffect: "zoom",
            animationDuration: 500,
            zoomOpacity: "auto",
            transitionEffect: "fade",
            transitionDuration: 366,
            slideClass: "",
            baseClass: "",
            baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div></div></div>',
            spinnerTpl: '<div class="fancybox-loading"></div>',
            errorTpl: '<div class="fancybox-error"><p>{{ERROR}}<p></div>',
            btnTpl: {
                download: '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}"><svg viewBox="0 0 40 40"><path d="M20,23 L20,8 L20,23 L13,16 L20,23 L27,16 L20,23 M26,28 L13,28 L27,28 L14,28" /></svg></a>',
                zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg viewBox="0 0 40 40"><path d="M 18,17 m-8,0 a 8,8 0 1,0 16,0 a 8,8 0 1,0 -16,0 M25,23 L31,29 L25,23" /></svg></button>',
                close: '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg viewBox="0 0 40 40"><path d="M10,10 L30,30 M30,10 L10,30" /></svg></button>',
                smallBtn: '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>',
                arrowLeft: '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><svg viewBox="0 0 40 40"><path d="M10,20 L30,20 L10,20 L18,28 L10,20 L18,12 L10,20"></path></svg></button>',
                arrowRight: '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><svg viewBox="0 0 40 40"><path d="M30,20 L10,20 L30,20 L22,28 L30,20 L22,12 L30,20"></path></svg></button>'
            },
            parentEl: "body",
            autoFocus: !1,
            backFocus: !0,
            trapFocus: !0,
            fullScreen: {
                autoStart: !1
            },
            touch: {
                vertical: !0,
                momentum: !0
            },
            hash: null,
            media: {},
            slideShow: {
                autoStart: !1,
                speed: 4e3
            },
            thumbs: {
                autoStart: !1,
                hideOnClose: !0,
                parentEl: ".fancybox-container",
                axis: "y"
            },
            onInit: n.noop,
            beforeLoad: n.noop,
            afterLoad: n.noop,
            beforeShow: n.noop,
            afterShow: n.noop,
            beforeClose: n.noop,
            afterClose: n.noop,
            onActivate: n.noop,
            onDeactivate: n.noop,
            clickContent: function(t, e) {
                return "image" === t.type && "zoom";
            },
            clickSlide: "close",
            clickOutside: "close",
            dblclickContent: !1,
            dblclickSlide: !1,
            dblclickOutside: !1,
            mobile: {
                margin: 0,
                clickContent: function(t, e) {
                    return "image" === t.type && "toggleControls";
                },
                clickSlide: function(t, e) {
                    return "image" === t.type ? "toggleControls" : "close";
                },
                dblclickContent: function(t, e) {
                    return "image" === t.type && "zoom";
                },
                dblclickSlide: function(t, e) {
                    return "image" === t.type && "zoom";
                }
            },
            lang: "en",
            i18n: {
                en: {
                    CLOSE: "Close",
                    NEXT: "Next",
                    PREV: "Previous",
                    ERROR: "The requested content cannot be loaded. <br/> Please try again later.",
                    PLAY_START: "Start slideshow",
                    PLAY_STOP: "Pause slideshow",
                    FULL_SCREEN: "Full screen",
                    THUMBS: "Thumbnails",
                    DOWNLOAD: "Download",
                    SHARE: "Share",
                    ZOOM: "Zoom"
                },
                de: {
                    CLOSE: "Schliessen",
                    NEXT: "Weiter",
                    PREV: "Zurück",
                    ERROR: "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.",
                    PLAY_START: "Diaschau starten",
                    PLAY_STOP: "Diaschau beenden",
                    FULL_SCREEN: "Vollbild",
                    THUMBS: "Vorschaubilder",
                    DOWNLOAD: "Herunterladen",
                    SHARE: "Teilen",
                    ZOOM: "Maßstab"
                }
            }
        }, s = n(t), r = n(e), c = 0, l = function(t) {
            return t && t.hasOwnProperty && t instanceof n;
        }, u = function() {
            return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function(e) {
                return t.setTimeout(e, 1e3 / 60);
            };
        }(), d = function() {
            var t, n = e.createElement("fakeelement"), a = {
                transition: "transitionend",
                OTransition: "oTransitionEnd",
                MozTransition: "transitionend",
                WebkitTransition: "webkitTransitionEnd"
            };
            for (t in a) if (n.style[t] !== o) return a[t];
            return "transitionend";
        }(), f = function(t) {
            return t && t.length && t[0].offsetHeight;
        }, p = function(t, o, a) {
            var i = this;
            i.opts = n.extend(!0, {
                index: a
            }, n.fancybox.defaults, o || {}), n.fancybox.isMobile && (i.opts = n.extend(!0, {}, i.opts, i.opts.mobile)), 
            o && n.isArray(o.buttons) && (i.opts.buttons = o.buttons), i.id = i.opts.id || ++c, 
            i.group = [], i.currIndex = parseInt(i.opts.index, 10) || 0, i.prevIndex = null, 
            i.prevPos = null, i.currPos = 0, i.firstRun = null, i.createGroup(t), i.group.length && (i.$lastFocus = n(e.activeElement).blur(), 
            i.slides = {}, i.init());
        };
        n.extend(p.prototype, {
            init: function() {
                var a, i, s, c = this, l = c.group[c.currIndex], u = l.opts, d = n.fancybox.scrollbarWidth;
                c.scrollTop = r.scrollTop(), c.scrollLeft = r.scrollLeft(), n.fancybox.getInstance() || (n("body").addClass("fancybox-active"), 
                /iPad|iPhone|iPod/.test(navigator.userAgent) && !t.MSStream ? "image" !== l.type && n("body").css("top", n("body").scrollTop() * -1).addClass("fancybox-iosfix") : !n.fancybox.isMobile && e.body.scrollHeight > t.innerHeight && (d === o && (a = n('<div style="width:50px;height:50px;overflow:scroll;" />').appendTo("body"), 
                d = n.fancybox.scrollbarWidth = a[0].offsetWidth - a[0].clientWidth, a.remove()), 
                n("head").append('<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: ' + d + "px; }</style>"), 
                n("body").addClass("compensate-for-scrollbar"))), s = "", n.each(u.buttons, function(t, e) {
                    s += u.btnTpl[e] || "";
                }), i = n(c.translate(c, u.baseTpl.replace("{{buttons}}", s).replace("{{arrows}}", u.btnTpl.arrowLeft + u.btnTpl.arrowRight))).attr("id", "fancybox-container-" + c.id).addClass("fancybox-is-hidden").addClass(u.baseClass).data("FancyBox", c).appendTo(u.parentEl), 
                c.$refs = {
                    container: i
                }, [ "bg", "inner", "infobar", "toolbar", "stage", "caption", "navigation" ].forEach(function(t) {
                    c.$refs[t] = i.find(".fancybox-" + t);
                }), c.trigger("onInit"), c.activate(), c.jumpTo(c.currIndex);
            },
            translate: function(t, e) {
                var n = t.opts.i18n[t.opts.lang];
                return e.replace(/\{\{(\w+)\}\}/g, function(t, e) {
                    var a = n[e];
                    return a === o ? t : a;
                });
            },
            createGroup: function(t) {
                var e = this, a = n.makeArray(t);
                n.each(a, function(t, a) {
                    var i, s, r, c, l = {}, u = {};
                    n.isPlainObject(a) ? (l = a, u = a.opts || a) : "object" === n.type(a) && n(a).length ? (i = n(a), 
                    u = i.data(), u = n.extend({}, u, u.options || {}), u.$orig = i, l.src = u.src || i.attr("href"), 
                    l.type || l.src || (l.type = "inline", l.src = a)) : l = {
                        type: "html",
                        src: a + ""
                    }, l.opts = n.extend(!0, {}, e.opts, u), n.isArray(u.buttons) && (l.opts.buttons = u.buttons), 
                    s = l.type || l.opts.type, r = l.src || "", !s && r && (r.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? s = "image" : r.match(/\.(pdf)((\?|#).*)?$/i) ? s = "pdf" : "#" === r.charAt(0) && (s = "inline")), 
                    s ? l.type = s : e.trigger("objectNeedsType", l), l.index = e.group.length, l.opts.$orig && !l.opts.$orig.length && delete l.opts.$orig, 
                    !l.opts.$thumb && l.opts.$orig && (l.opts.$thumb = l.opts.$orig.find("img:first")), 
                    l.opts.$thumb && !l.opts.$thumb.length && delete l.opts.$thumb, "function" === n.type(l.opts.caption) && (l.opts.caption = l.opts.caption.apply(a, [ e, l ])), 
                    "function" === n.type(e.opts.caption) && (l.opts.caption = e.opts.caption.apply(a, [ e, l ])), 
                    l.opts.caption instanceof n || (l.opts.caption = l.opts.caption === o ? "" : l.opts.caption + ""), 
                    "ajax" === s && (c = r.split(/\s+/, 2), c.length > 1 && (l.src = c.shift(), l.opts.filter = c.shift())), 
                    "auto" == l.opts.smallBtn && (n.inArray(s, [ "html", "inline", "ajax" ]) > -1 ? (l.opts.toolbar = !1, 
                    l.opts.smallBtn = !0) : l.opts.smallBtn = !1), "pdf" === s && (l.type = "iframe", 
                    l.opts.iframe.preload = !1), l.opts.modal && (l.opts = n.extend(!0, l.opts, {
                        infobar: 0,
                        toolbar: 0,
                        smallBtn: 0,
                        keyboard: 0,
                        slideShow: 0,
                        fullScreen: 0,
                        thumbs: 0,
                        touch: 0,
                        clickContent: !1,
                        clickSlide: !1,
                        clickOutside: !1,
                        dblclickContent: !1,
                        dblclickSlide: !1,
                        dblclickOutside: !1
                    })), e.group.push(l);
                });
            },
            addEvents: function() {
                var o = this;
                o.removeEvents(), o.$refs.container.on("click.fb-close", "[data-fancybox-close]", function(t) {
                    t.stopPropagation(), t.preventDefault(), o.close(t);
                }).on("click.fb-prev touchend.fb-prev", "[data-fancybox-prev]", function(t) {
                    t.stopPropagation(), t.preventDefault(), o.previous();
                }).on("click.fb-next touchend.fb-next", "[data-fancybox-next]", function(t) {
                    t.stopPropagation(), t.preventDefault(), o.next();
                }).on("click.fb", "[data-fancybox-zoom]", function(t) {
                    o[o.isScaledDown() ? "scaleToActual" : "scaleToFit"]();
                }), s.on("orientationchange.fb resize.fb", function(t) {
                    t && t.originalEvent && "resize" === t.originalEvent.type ? u(function() {
                        o.update();
                    }) : (o.$refs.stage.hide(), setTimeout(function() {
                        o.$refs.stage.show(), o.update();
                    }, 600));
                }), r.on("focusin.fb", function(t) {
                    var a = n.fancybox ? n.fancybox.getInstance() : null;
                    a.isClosing || !a.current || !a.current.opts.trapFocus || n(t.target).hasClass("fancybox-container") || n(t.target).is(e) || a && "fixed" !== n(t.target).css("position") && !a.$refs.container.has(t.target).length && (t.stopPropagation(), 
                    a.focus(), s.scrollTop(o.scrollTop).scrollLeft(o.scrollLeft));
                }), r.on("keydown.fb", function(t) {
                    var e = o.current, a = t.keyCode || t.which;
                    if (e && e.opts.keyboard && !n(t.target).is("input") && !n(t.target).is("textarea")) return 8 === a || 27 === a ? (t.preventDefault(), 
                    void o.close(t)) : 37 === a || 38 === a ? (t.preventDefault(), void o.previous()) : 39 === a || 40 === a ? (t.preventDefault(), 
                    void o.next()) : void o.trigger("afterKeydown", t, a);
                }), o.group[o.currIndex].opts.idleTime && (o.idleSecondsCounter = 0, r.on("mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle", function(t) {
                    o.idleSecondsCounter = 0, o.isIdle && o.showControls(), o.isIdle = !1;
                }), o.idleInterval = t.setInterval(function() {
                    o.idleSecondsCounter++, o.idleSecondsCounter >= o.group[o.currIndex].opts.idleTime && (o.isIdle = !0, 
                    o.idleSecondsCounter = 0, o.hideControls());
                }, 1e3));
            },
            removeEvents: function() {
                var e = this;
                s.off("orientationchange.fb resize.fb"), r.off("focusin.fb keydown.fb .fb-idle"), 
                this.$refs.container.off(".fb-close .fb-prev .fb-next"), e.idleInterval && (t.clearInterval(e.idleInterval), 
                e.idleInterval = null);
            },
            previous: function(t) {
                return this.jumpTo(this.currPos - 1, t);
            },
            next: function(t) {
                return this.jumpTo(this.currPos + 1, t);
            },
            jumpTo: function(t, e, a) {
                var i, s, r, c, l, u, d, p = this, h = p.group.length;
                if (!(p.isSliding || p.isClosing || p.isAnimating && p.firstRun)) {
                    if (t = parseInt(t, 10), s = p.current ? p.current.opts.loop : p.opts.loop, !s && (t < 0 || t >= h)) return !1;
                    if (i = p.firstRun = null === p.firstRun, !(h < 2 && !i && p.isSliding)) {
                        if (c = p.current, p.prevIndex = p.currIndex, p.prevPos = p.currPos, r = p.createSlide(t), 
                        h > 1 && ((s || r.index > 0) && p.createSlide(t - 1), (s || r.index < h - 1) && p.createSlide(t + 1)), 
                        p.current = r, p.currIndex = r.index, p.currPos = r.pos, p.trigger("beforeShow", i), 
                        p.updateControls(), u = n.fancybox.getTranslate(r.$slide), r.isMoved = (0 !== u.left || 0 !== u.top) && !r.$slide.hasClass("fancybox-animated"), 
                        r.forcedDuration = o, n.isNumeric(e) ? r.forcedDuration = e : e = r.opts[i ? "animationDuration" : "transitionDuration"], 
                        e = parseInt(e, 10), i) return r.opts.animationEffect && e && p.$refs.container.css("transition-duration", e + "ms"), 
                        p.$refs.container.removeClass("fancybox-is-hidden"), f(p.$refs.container), p.$refs.container.addClass("fancybox-is-open"), 
                        r.$slide.addClass("fancybox-slide--current"), p.loadSlide(r), void p.preload();
                        n.each(p.slides, function(t, e) {
                            n.fancybox.stop(e.$slide);
                        }), r.$slide.removeClass("fancybox-slide--next fancybox-slide--previous").addClass("fancybox-slide--current"), 
                        r.isMoved ? (l = Math.round(r.$slide.width()), n.each(p.slides, function(t, o) {
                            var a = o.pos - r.pos;
                            n.fancybox.animate(o.$slide, {
                                top: 0,
                                left: a * l + a * o.opts.gutter
                            }, e, function() {
                                o.$slide.removeAttr("style").removeClass("fancybox-slide--next fancybox-slide--previous"), 
                                o.pos === p.currPos && (r.isMoved = !1, p.complete());
                            });
                        })) : p.$refs.stage.children().removeAttr("style"), r.isLoaded ? p.revealContent(r) : p.loadSlide(r), 
                        p.preload(), c.pos !== r.pos && (d = "fancybox-slide--" + (c.pos > r.pos ? "next" : "previous"), 
                        c.$slide.removeClass("fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous"), 
                        c.isComplete = !1, e && (r.isMoved || r.opts.transitionEffect) && (r.isMoved ? c.$slide.addClass(d) : (d = "fancybox-animated " + d + " fancybox-fx-" + r.opts.transitionEffect, 
                        n.fancybox.animate(c.$slide, d, e, function() {
                            c.$slide.removeClass(d).removeAttr("style");
                        }))));
                    }
                }
            },
            createSlide: function(t) {
                var e, o, a = this;
                return o = t % a.group.length, o = o < 0 ? a.group.length + o : o, !a.slides[t] && a.group[o] && (e = n('<div class="fancybox-slide"></div>').appendTo(a.$refs.stage), 
                a.slides[t] = n.extend(!0, {}, a.group[o], {
                    pos: t,
                    $slide: e,
                    isLoaded: !1
                }), a.updateSlide(a.slides[t])), a.slides[t];
            },
            scaleToActual: function(t, e, a) {
                var i, s, r, c, l, u = this, d = u.current, f = d.$content, p = parseInt(d.$slide.width(), 10), h = parseInt(d.$slide.height(), 10), g = d.width, b = d.height;
                "image" != d.type || d.hasError || !f || u.isAnimating || (n.fancybox.stop(f), u.isAnimating = !0, 
                t = t === o ? .5 * p : t, e = e === o ? .5 * h : e, i = n.fancybox.getTranslate(f), 
                c = g / i.width, l = b / i.height, s = .5 * p - .5 * g, r = .5 * h - .5 * b, g > p && (s = i.left * c - (t * c - t), 
                s > 0 && (s = 0), s < p - g && (s = p - g)), b > h && (r = i.top * l - (e * l - e), 
                r > 0 && (r = 0), r < h - b && (r = h - b)), u.updateCursor(g, b), n.fancybox.animate(f, {
                    top: r,
                    left: s,
                    scaleX: c,
                    scaleY: l
                }, a || 330, function() {
                    u.isAnimating = !1;
                }), u.SlideShow && u.SlideShow.isActive && u.SlideShow.stop());
            },
            scaleToFit: function(t) {
                var e, o = this, a = o.current, i = a.$content;
                "image" != a.type || a.hasError || !i || o.isAnimating || (n.fancybox.stop(i), o.isAnimating = !0, 
                e = o.getFitPos(a), o.updateCursor(e.width, e.height), n.fancybox.animate(i, {
                    top: e.top,
                    left: e.left,
                    scaleX: e.width / i.width(),
                    scaleY: e.height / i.height()
                }, t || 330, function() {
                    o.isAnimating = !1;
                }));
            },
            getFitPos: function(t) {
                var e, o, a, i, s, r = this, c = t.$content, l = t.width, u = t.height, d = t.opts.margin;
                return !(!c || !c.length || !l && !u) && ("number" === n.type(d) && (d = [ d, d ]), 
                2 == d.length && (d = [ d[0], d[1], d[0], d[1] ]), e = parseInt(r.$refs.stage.width(), 10) - (d[1] + d[3]), 
                o = parseInt(r.$refs.stage.height(), 10) - (d[0] + d[2]), a = Math.min(1, e / l, o / u), 
                i = Math.floor(a * l), s = Math.floor(a * u), {
                    top: Math.floor(.5 * (o - s)) + d[0],
                    left: Math.floor(.5 * (e - i)) + d[3],
                    width: i,
                    height: s
                });
            },
            update: function() {
                var t = this;
                n.each(t.slides, function(e, n) {
                    t.updateSlide(n);
                });
            },
            updateSlide: function(t) {
                var e = this, o = t.$content;
                o && (t.width || t.height) && (e.isAnimating = !1, n.fancybox.stop(o), n.fancybox.setTranslate(o, e.getFitPos(t)), 
                t.pos === e.currPos && e.updateCursor()), t.$slide.trigger("refresh"), e.trigger("onUpdate", t);
            },
            updateCursor: function(t, e) {
                var n, a = this, i = a.$refs.container.removeClass("fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-drag fancybox-can-zoomOut");
                a.current && !a.isClosing && (a.isZoomable() ? (i.addClass("fancybox-is-zoomable"), 
                n = t !== o && e !== o ? t < a.current.width && e < a.current.height : a.isScaledDown(), 
                n ? i.addClass("fancybox-can-zoomIn") : a.current.opts.touch ? i.addClass("fancybox-can-drag") : i.addClass("fancybox-can-zoomOut")) : a.current.opts.touch && i.addClass("fancybox-can-drag"));
            },
            isZoomable: function() {
                var t, e = this, o = e.current;
                if (o && !e.isClosing) return !!("image" === o.type && o.isLoaded && !o.hasError && ("zoom" === o.opts.clickContent || n.isFunction(o.opts.clickContent) && "zoom" === o.opts.clickContent(o)) && (t = e.getFitPos(o), 
                o.width > t.width || o.height > t.height));
            },
            isScaledDown: function() {
                var t = this, e = t.current, o = e.$content, a = !1;
                return o && (a = n.fancybox.getTranslate(o), a = a.width < e.width || a.height < e.height), 
                a;
            },
            canPan: function() {
                var t = this, e = t.current, n = e.$content, o = !1;
                return n && (o = t.getFitPos(e), o = Math.abs(n.width() - o.width) > 1 || Math.abs(n.height() - o.height) > 1), 
                o;
            },
            loadSlide: function(t) {
                var e, o, a, i = this;
                if (!t.isLoading && !t.isLoaded) {
                    switch (t.isLoading = !0, i.trigger("beforeLoad", t), e = t.type, o = t.$slide, 
                    o.off("refresh").trigger("onReset").addClass("fancybox-slide--" + (e || "unknown")).addClass(t.opts.slideClass), 
                    e) {
                      case "image":
                        i.setImage(t);
                        break;

                      case "iframe":
                        i.setIframe(t);
                        break;

                      case "html":
                        i.setContent(t, t.src || t.content);
                        break;

                      case "inline":
                        n(t.src).length ? i.setContent(t, n(t.src)) : i.setError(t);
                        break;

                      case "ajax":
                        i.showLoading(t), a = n.ajax(n.extend({}, t.opts.ajax.settings, {
                            url: t.src,
                            success: function(e, n) {
                                "success" === n && i.setContent(t, e);
                            },
                            error: function(e, n) {
                                e && "abort" !== n && i.setError(t);
                            }
                        })), o.one("onReset", function() {
                            a.abort();
                        });
                        break;

                      default:
                        i.setError(t);
                    }
                    return !0;
                }
            },
            setImage: function(e) {
                var o, a, i, s, r = this, c = e.opts.srcset || e.opts.image.srcset;
                if (c) {
                    i = t.devicePixelRatio || 1, s = t.innerWidth * i, a = c.split(",").map(function(t) {
                        var e = {};
                        return t.trim().split(/\s+/).forEach(function(t, n) {
                            var o = parseInt(t.substring(0, t.length - 1), 10);
                            return 0 === n ? e.url = t : void (o && (e.value = o, e.postfix = t[t.length - 1]));
                        }), e;
                    }), a.sort(function(t, e) {
                        return t.value - e.value;
                    });
                    for (var l = 0; l < a.length; l++) {
                        var u = a[l];
                        if ("w" === u.postfix && u.value >= s || "x" === u.postfix && u.value >= i) {
                            o = u;
                            break;
                        }
                    }
                    !o && a.length && (o = a[a.length - 1]), o && (e.src = o.url, e.width && e.height && "w" == o.postfix && (e.height = e.width / e.height * o.value, 
                    e.width = o.value));
                }
                e.$content = n('<div class="fancybox-image-wrap"></div>').addClass("fancybox-is-hidden").appendTo(e.$slide), 
                e.opts.preload !== !1 && e.opts.width && e.opts.height && (e.opts.thumb || e.opts.$thumb) ? (e.width = e.opts.width, 
                e.height = e.opts.height, e.$ghost = n("<img />").one("error", function() {
                    n(this).remove(), e.$ghost = null, r.setBigImage(e);
                }).one("load", function() {
                    r.afterLoad(e), r.setBigImage(e);
                }).addClass("fancybox-image").appendTo(e.$content).attr("src", e.opts.thumb || e.opts.$thumb.attr("src"))) : r.setBigImage(e);
            },
            setBigImage: function(t) {
                var e = this, o = n("<img />");
                t.$image = o.one("error", function() {
                    e.setError(t);
                }).one("load", function() {
                    clearTimeout(t.timouts), t.timouts = null, e.isClosing || (t.width = this.naturalWidth, 
                    t.height = this.naturalHeight, t.opts.image.srcset && o.attr("sizes", "100vw").attr("srcset", t.opts.image.srcset), 
                    e.hideLoading(t), t.$ghost ? t.timouts = setTimeout(function() {
                        t.timouts = null, t.$ghost.hide();
                    }, Math.min(300, Math.max(1e3, t.height / 1600))) : e.afterLoad(t));
                }).addClass("fancybox-image").attr("src", t.src).appendTo(t.$content), (o[0].complete || "complete" == o[0].readyState) && o[0].naturalWidth && o[0].naturalHeight ? o.trigger("load") : o[0].error ? o.trigger("error") : t.timouts = setTimeout(function() {
                    o[0].complete || t.hasError || e.showLoading(t);
                }, 100);
            },
            setIframe: function(t) {
                var e, a = this, i = t.opts.iframe, s = t.$slide;
                t.$content = n('<div class="fancybox-content' + (i.preload ? " fancybox-is-hidden" : "") + '"></div>').css(i.css).appendTo(s), 
                e = n(i.tpl.replace(/\{rnd\}/g, new Date().getTime())).attr(i.attr).appendTo(t.$content), 
                i.preload ? (a.showLoading(t), e.on("load.fb error.fb", function(e) {
                    this.isReady = 1, t.$slide.trigger("refresh"), a.afterLoad(t);
                }), s.on("refresh.fb", function() {
                    var n, a, s, r = t.$content, c = i.css.width, l = i.css.height;
                    if (1 === e[0].isReady) {
                        try {
                            a = e.contents(), s = a.find("body");
                        } catch (t) {}
                        s && s.length && (c === o && (n = e[0].contentWindow.document.documentElement.scrollWidth, 
                        c = Math.ceil(s.outerWidth(!0) + (r.width() - n)), c += r.outerWidth() - r.innerWidth()), 
                        l === o && (l = Math.ceil(s.outerHeight(!0)), l += r.outerHeight() - r.innerHeight()), 
                        c && r.width(c), l && r.height(l)), r.removeClass("fancybox-is-hidden");
                    }
                })) : this.afterLoad(t), e.attr("src", t.src), t.opts.smallBtn === !0 && t.$content.prepend(a.translate(t, t.opts.btnTpl.smallBtn)), 
                s.one("onReset", function() {
                    try {
                        n(this).find("iframe").hide().attr("src", "//about:blank");
                    } catch (t) {}
                    n(this).empty(), t.isLoaded = !1;
                });
            },
            setContent: function(t, e) {
                var o = this;
                o.isClosing || (o.hideLoading(t), t.$slide.empty(), l(e) && e.parent().length ? (e.parent(".fancybox-slide--inline").trigger("onReset"), 
                t.$placeholder = n("<div></div>").hide().insertAfter(e), e.css("display", "inline-block")) : t.hasError || ("string" === n.type(e) && (e = n("<div>").append(n.trim(e)).contents(), 
                3 === e[0].nodeType && (e = n("<div>").html(e))), t.opts.filter && (e = n("<div>").html(e).find(t.opts.filter))), 
                t.$slide.one("onReset", function() {
                    t.$placeholder && (t.$placeholder.after(e.hide()).remove(), t.$placeholder = null), 
                    t.$smallBtn && (t.$smallBtn.remove(), t.$smallBtn = null), t.hasError || (n(this).empty(), 
                    t.isLoaded = !1);
                }), t.$content = n(e).appendTo(t.$slide), this.afterLoad(t));
            },
            setError: function(t) {
                t.hasError = !0, t.$slide.removeClass("fancybox-slide--" + t.type), this.setContent(t, this.translate(t, t.opts.errorTpl));
            },
            showLoading: function(t) {
                var e = this;
                t = t || e.current, t && !t.$spinner && (t.$spinner = n(e.opts.spinnerTpl).appendTo(t.$slide));
            },
            hideLoading: function(t) {
                var e = this;
                t = t || e.current, t && t.$spinner && (t.$spinner.remove(), delete t.$spinner);
            },
            afterLoad: function(t) {
                var e = this;
                e.isClosing || (t.isLoading = !1, t.isLoaded = !0, e.trigger("afterLoad", t), e.hideLoading(t), 
                t.opts.smallBtn && !t.$smallBtn && (t.$smallBtn = n(e.translate(t, t.opts.btnTpl.smallBtn)).appendTo(t.$content.filter("div,form").first())), 
                t.opts.protect && t.$content && !t.hasError && (t.$content.on("contextmenu.fb", function(t) {
                    return 2 == t.button && t.preventDefault(), !0;
                }), "image" === t.type && n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)), 
                e.revealContent(t));
            },
            revealContent: function(t) {
                var e, a, i, s, r, c = this, l = t.$slide, u = !1;
                return e = t.opts[c.firstRun ? "animationEffect" : "transitionEffect"], i = t.opts[c.firstRun ? "animationDuration" : "transitionDuration"], 
                i = parseInt(t.forcedDuration === o ? i : t.forcedDuration, 10), !t.isMoved && t.pos === c.currPos && i || (e = !1), 
                "zoom" !== e || t.pos === c.currPos && i && "image" === t.type && !t.hasError && (u = c.getThumbPos(t)) || (e = "fade"), 
                "zoom" === e ? (r = c.getFitPos(t), r.scaleX = r.width / u.width, r.scaleY = r.height / u.height, 
                delete r.width, delete r.height, s = t.opts.zoomOpacity, "auto" == s && (s = Math.abs(t.width / t.height - u.width / u.height) > .1), 
                s && (u.opacity = .1, r.opacity = 1), n.fancybox.setTranslate(t.$content.removeClass("fancybox-is-hidden"), u), 
                f(t.$content), void n.fancybox.animate(t.$content, r, i, function() {
                    c.complete();
                })) : (c.updateSlide(t), e ? (n.fancybox.stop(l), a = "fancybox-animated fancybox-slide--" + (t.pos >= c.prevPos ? "next" : "previous") + " fancybox-fx-" + e, 
                l.removeAttr("style").removeClass("fancybox-slide--current fancybox-slide--next fancybox-slide--previous").addClass(a), 
                t.$content.removeClass("fancybox-is-hidden"), f(l), void n.fancybox.animate(l, "fancybox-slide--current", i, function(e) {
                    l.removeClass(a).removeAttr("style"), t.pos === c.currPos && c.complete();
                }, !0)) : (f(l), t.$content.removeClass("fancybox-is-hidden"), void (t.pos === c.currPos && c.complete())));
            },
            getThumbPos: function(o) {
                var a, i = this, s = !1, r = function(e) {
                    for (var o, a = e[0], i = a.getBoundingClientRect(), s = []; null !== a.parentElement; ) "hidden" !== n(a.parentElement).css("overflow") && "auto" !== n(a.parentElement).css("overflow") || s.push(a.parentElement.getBoundingClientRect()), 
                    a = a.parentElement;
                    return o = s.every(function(t) {
                        var e = Math.min(i.right, t.right) - Math.max(i.left, t.left), n = Math.min(i.bottom, t.bottom) - Math.max(i.top, t.top);
                        return e > 0 && n > 0;
                    }), o && i.bottom > 0 && i.right > 0 && i.left < n(t).width() && i.top < n(t).height();
                }, c = o.opts.$thumb, l = c ? c.offset() : 0;
                return l && c[0].ownerDocument === e && r(c) && (a = i.$refs.stage.offset(), s = {
                    top: l.top - a.top + parseFloat(c.css("border-top-width") || 0),
                    left: l.left - a.left + parseFloat(c.css("border-left-width") || 0),
                    width: c.width(),
                    height: c.height(),
                    scaleX: 1,
                    scaleY: 1
                }), s;
            },
            complete: function() {
                var t = this, o = t.current, a = {};
                o.isMoved || !o.isLoaded || o.isComplete || (o.isComplete = !0, o.$slide.siblings().trigger("onReset"), 
                f(o.$slide), o.$slide.addClass("fancybox-slide--complete"), n.each(t.slides, function(e, o) {
                    o.pos >= t.currPos - 1 && o.pos <= t.currPos + 1 ? a[o.pos] = o : o && (n.fancybox.stop(o.$slide), 
                    o.$slide.off().remove());
                }), t.slides = a, t.updateCursor(), t.trigger("afterShow"), (n(e.activeElement).is("[disabled]") || o.opts.autoFocus && "image" != o.type && "iframe" !== o.type) && t.focus());
            },
            preload: function() {
                var t, e, n = this;
                n.group.length < 2 || (t = n.slides[n.currPos + 1], e = n.slides[n.currPos - 1], 
                t && "image" === t.type && n.loadSlide(t), e && "image" === e.type && n.loadSlide(e));
            },
            focus: function() {
                var t, e = this.current;
                this.isClosing || (e && e.isComplete && (t = e.$slide.find("input[autofocus]:enabled:visible:first"), 
                t.length || (t = e.$slide.find("button,:input,[tabindex],a").filter(":enabled:visible:first"))), 
                t = t && t.length ? t : this.$refs.container, t.focus());
            },
            activate: function() {
                var t = this;
                n(".fancybox-container").each(function() {
                    var e = n(this).data("FancyBox");
                    e && e.id !== t.id && !e.isClosing && (e.trigger("onDeactivate"), e.removeEvents(), 
                    e.isVisible = !1);
                }), t.isVisible = !0, (t.current || t.isIdle) && (t.update(), t.updateControls()), 
                t.trigger("onActivate"), t.addEvents();
            },
            close: function(t, e) {
                var o, a, i, s, r, c, l = this, p = l.current, h = function() {
                    l.cleanUp(t);
                };
                return !l.isClosing && (l.isClosing = !0, l.trigger("beforeClose", t) === !1 ? (l.isClosing = !1, 
                u(function() {
                    l.update();
                }), !1) : (l.removeEvents(), p.timouts && clearTimeout(p.timouts), i = p.$content, 
                o = p.opts.animationEffect, a = n.isNumeric(e) ? e : o ? p.opts.animationDuration : 0, 
                p.$slide.off(d).removeClass("fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"), 
                p.$slide.siblings().trigger("onReset").remove(), a && l.$refs.container.removeClass("fancybox-is-open").addClass("fancybox-is-closing"), 
                l.hideLoading(p), l.hideControls(), l.updateCursor(), "zoom" !== o || t !== !0 && i && a && "image" === p.type && !p.hasError && (c = l.getThumbPos(p)) || (o = "fade"), 
                "zoom" === o ? (n.fancybox.stop(i), r = n.fancybox.getTranslate(i), r.width = r.width * r.scaleX, 
                r.height = r.height * r.scaleY, s = p.opts.zoomOpacity, "auto" == s && (s = Math.abs(p.width / p.height - c.width / c.height) > .1), 
                s && (c.opacity = 0), r.scaleX = r.width / c.width, r.scaleY = r.height / c.height, 
                r.width = c.width, r.height = c.height, n.fancybox.setTranslate(p.$content, r), 
                f(p.$content), n.fancybox.animate(p.$content, c, a, h), !0) : (o && a ? t === !0 ? setTimeout(h, a) : n.fancybox.animate(p.$slide.removeClass("fancybox-slide--current"), "fancybox-animated fancybox-slide--previous fancybox-fx-" + o, a, h) : h(), 
                !0)));
            },
            cleanUp: function(t) {
                var o, a, i = this, r = n("body");
                i.current.$slide.trigger("onReset"), i.$refs.container.empty().remove(), i.trigger("afterClose", t), 
                i.$lastFocus && i.current.opts.backFocus && i.$lastFocus.focus(), i.current = null, 
                o = n.fancybox.getInstance(), o ? o.activate() : (s.scrollTop(i.scrollTop).scrollLeft(i.scrollLeft), 
                r.removeClass("fancybox-active compensate-for-scrollbar"), r.hasClass("fancybox-iosfix") && (a = parseInt(e.body.style.top, 10), 
                r.removeClass("fancybox-iosfix").css("top", "").scrollTop(a * -1)), n("#fancybox-style-noscroll").remove());
            },
            trigger: function(t, e) {
                var o, a = Array.prototype.slice.call(arguments, 1), i = this, s = e && e.opts ? e : i.current;
                return s ? a.unshift(s) : s = i, a.unshift(i), n.isFunction(s.opts[t]) && (o = s.opts[t].apply(s, a)), 
                o === !1 ? o : void ("afterClose" !== t && i.$refs ? i.$refs.container.trigger(t + ".fb", a) : r.trigger(t + ".fb", a));
            },
            updateControls: function(t) {
                var e = this, n = e.current, o = n.index, a = n.opts.caption, i = e.$refs.container, s = e.$refs.caption;
                n.$slide.trigger("refresh"), e.$caption = a && a.length ? s.html(a) : null, e.isHiddenControls || e.isIdle || e.showControls(), 
                i.find("[data-fancybox-count]").html(e.group.length), i.find("[data-fancybox-index]").html(o + 1), 
                i.find("[data-fancybox-prev]").prop("disabled", !n.opts.loop && o <= 0), i.find("[data-fancybox-next]").prop("disabled", !n.opts.loop && o >= e.group.length - 1), 
                "image" === n.type ? i.find("[data-fancybox-download]").attr("href", n.opts.image.src || n.src).show() : i.find("[data-fancybox-download],[data-fancybox-zoom]").hide();
            },
            hideControls: function() {
                this.isHiddenControls = !0, this.$refs.container.removeClass("fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav");
            },
            showControls: function() {
                var t = this, e = t.current ? t.current.opts : t.opts, n = t.$refs.container;
                t.isHiddenControls = !1, t.idleSecondsCounter = 0, n.toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons)).toggleClass("fancybox-show-infobar", !!(e.infobar && t.group.length > 1)).toggleClass("fancybox-show-nav", !!(e.arrows && t.group.length > 1)).toggleClass("fancybox-is-modal", !!e.modal), 
                t.$caption ? n.addClass("fancybox-show-caption ") : n.removeClass("fancybox-show-caption");
            },
            toggleControls: function() {
                this.isHiddenControls ? this.showControls() : this.hideControls();
            }
        }), n.fancybox = {
            version: "3.2.5",
            defaults: i,
            getInstance: function(t) {
                var e = n('.fancybox-container:not(".fancybox-is-closing"):last').data("FancyBox"), o = Array.prototype.slice.call(arguments, 1);
                return e instanceof p && ("string" === n.type(t) ? e[t].apply(e, o) : "function" === n.type(t) && t.apply(e, o), 
                e);
            },
            open: function(t, e, n) {
                return new p(t, e, n);
            },
            close: function(t) {
                var e = this.getInstance();
                e && (e.close(), t === !0 && this.close());
            },
            destroy: function() {
                this.close(!0), r.off("click.fb-start");
            },
            isMobile: e.createTouch !== o && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            use3d: function() {
                var n = e.createElement("div");
                return t.getComputedStyle && t.getComputedStyle(n).getPropertyValue("transform") && !(e.documentMode && e.documentMode < 11);
            }(),
            getTranslate: function(t) {
                var e;
                if (!t || !t.length) return !1;
                if (e = t.eq(0).css("transform"), e && e.indexOf("matrix") !== -1 ? (e = e.split("(")[1], 
                e = e.split(")")[0], e = e.split(",")) : e = [], e.length) e = e.length > 10 ? [ e[13], e[12], e[0], e[5] ] : [ e[5], e[4], e[0], e[3] ], 
                e = e.map(parseFloat); else {
                    e = [ 0, 0, 1, 1 ];
                    var n = /\.*translate\((.*)px,(.*)px\)/i, o = n.exec(t.eq(0).attr("style"));
                    o && (e[0] = parseFloat(o[2]), e[1] = parseFloat(o[1]));
                }
                return {
                    top: e[0],
                    left: e[1],
                    scaleX: e[2],
                    scaleY: e[3],
                    opacity: parseFloat(t.css("opacity")),
                    width: t.width(),
                    height: t.height()
                };
            },
            setTranslate: function(t, e) {
                var n = "", a = {};
                if (t && e) return e.left === o && e.top === o || (n = (e.left === o ? t.position().left : e.left) + "px, " + (e.top === o ? t.position().top : e.top) + "px", 
                n = this.use3d ? "translate3d(" + n + ", 0px)" : "translate(" + n + ")"), e.scaleX !== o && e.scaleY !== o && (n = (n.length ? n + " " : "") + "scale(" + e.scaleX + ", " + e.scaleY + ")"), 
                n.length && (a.transform = n), e.opacity !== o && (a.opacity = e.opacity), e.width !== o && (a.width = e.width), 
                e.height !== o && (a.height = e.height), t.css(a);
            },
            animate: function(t, e, a, i, s) {
                n.isFunction(a) && (i = a, a = null), n.isPlainObject(e) || t.removeAttr("style"), 
                t.on(d, function(a) {
                    (!a || !a.originalEvent || t.is(a.originalEvent.target) && "z-index" != a.originalEvent.propertyName) && (n.fancybox.stop(t), 
                    n.isPlainObject(e) ? e.scaleX !== o && e.scaleY !== o && (t.css("transition-duration", ""), 
                    e.width = Math.round(t.width() * e.scaleX), e.height = Math.round(t.height() * e.scaleY), 
                    e.scaleX = 1, e.scaleY = 1, n.fancybox.setTranslate(t, e)) : s !== !0 && t.removeClass(e), 
                    n.isFunction(i) && i(a));
                }), n.isNumeric(a) && t.css("transition-duration", a + "ms"), n.isPlainObject(e) ? n.fancybox.setTranslate(t, e) : t.addClass(e), 
                e.scaleX && t.hasClass("fancybox-image-wrap") && t.parent().addClass("fancybox-is-scaling"), 
                t.data("timer", setTimeout(function() {
                    t.trigger("transitionend");
                }, a + 16));
            },
            stop: function(t) {
                clearTimeout(t.data("timer")), t.off("transitionend").css("transition-duration", ""), 
                t.hasClass("fancybox-image-wrap") && t.parent().removeClass("fancybox-is-scaling");
            }
        }, n.fn.fancybox = function(t) {
            var e;
            return t = t || {}, e = t.selector || !1, e ? n("body").off("click.fb-start", e).on("click.fb-start", e, {
                options: t
            }, a) : this.off("click.fb-start").on("click.fb-start", {
                items: this,
                options: t
            }, a), this;
        }, r.on("click.fb-start", "[data-fancybox]", a);
    }
}(window, document, window.jQuery || jQuery), function(t) {
    "use strict";
    var e = function(e, n, o) {
        if (e) return o = o || "", "object" === t.type(o) && (o = t.param(o, !0)), t.each(n, function(t, n) {
            e = e.replace("$" + t, n || "");
        }), o.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + o), e;
    }, n = {
        youtube: {
            matcher: /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
            params: {
                autoplay: 1,
                autohide: 1,
                fs: 1,
                rel: 0,
                hd: 1,
                wmode: "transparent",
                enablejsapi: 1,
                html5: 1
            },
            paramPlace: 8,
            type: "iframe",
            url: "//www.youtube.com/embed/$4",
            thumb: "//img.youtube.com/vi/$4/hqdefault.jpg"
        },
        vimeo: {
            matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
            params: {
                autoplay: 1,
                hd: 1,
                show_title: 1,
                show_byline: 1,
                show_portrait: 0,
                fullscreen: 1,
                api: 1
            },
            paramPlace: 3,
            type: "iframe",
            url: "//player.vimeo.com/video/$2"
        },
        metacafe: {
            matcher: /metacafe.com\/watch\/(\d+)\/(.*)?/,
            type: "iframe",
            url: "//www.metacafe.com/embed/$1/?ap=1"
        },
        dailymotion: {
            matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
            params: {
                additionalInfos: 0,
                autoStart: 1
            },
            type: "iframe",
            url: "//www.dailymotion.com/embed/video/$1"
        },
        vine: {
            matcher: /vine.co\/v\/([a-zA-Z0-9\?\=\-]+)/,
            type: "iframe",
            url: "//vine.co/v/$1/embed/simple"
        },
        instagram: {
            matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
            type: "image",
            url: "//$1/p/$2/media/?size=l"
        },
        gmap_place: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
            type: "iframe",
            url: function(t) {
                return "//maps.google." + t[2] + "/?ll=" + (t[9] ? t[9] + "&z=" + Math.floor(t[10]) + (t[12] ? t[12].replace(/^\//, "&") : "") : t[12]) + "&output=" + (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed");
            }
        },
        gmap_search: {
            matcher: /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
            type: "iframe",
            url: function(t) {
                return "//maps.google." + t[2] + "/maps?q=" + t[5].replace("query=", "q=").replace("api=1", "") + "&output=embed";
            }
        }
    };
    t(document).on("objectNeedsType.fb", function(o, a, i) {
        var s, r, c, l, u, d, f, p = i.src || "", h = !1;
        s = t.extend(!0, {}, n, i.opts.media), t.each(s, function(n, o) {
            if (c = p.match(o.matcher)) {
                if (h = o.type, d = {}, o.paramPlace && c[o.paramPlace]) {
                    u = c[o.paramPlace], "?" == u[0] && (u = u.substring(1)), u = u.split("&");
                    for (var a = 0; a < u.length; ++a) {
                        var s = u[a].split("=", 2);
                        2 == s.length && (d[s[0]] = decodeURIComponent(s[1].replace(/\+/g, " ")));
                    }
                }
                return l = t.extend(!0, {}, o.params, i.opts[n], d), p = "function" === t.type(o.url) ? o.url.call(this, c, l, i) : e(o.url, c, l), 
                r = "function" === t.type(o.thumb) ? o.thumb.call(this, c, l, i) : e(o.thumb, c), 
                "vimeo" === n && (p = p.replace("&%23", "#")), !1;
            }
        }), h ? (i.src = p, i.type = h, i.opts.thumb || i.opts.$thumb && i.opts.$thumb.length || (i.opts.thumb = r), 
        "iframe" === h && (t.extend(!0, i.opts, {
            iframe: {
                preload: !1,
                attr: {
                    scrolling: "no"
                }
            }
        }), i.contentProvider = f, i.opts.slideClass += " fancybox-slide--" + ("gmap_place" == f || "gmap_search" == f ? "map" : "video"))) : p && (i.type = i.opts.defaultType);
    });
}(window.jQuery || jQuery), function(t, e, n) {
    "use strict";
    var o = function() {
        return t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.oRequestAnimationFrame || function(e) {
            return t.setTimeout(e, 1e3 / 60);
        };
    }(), a = function() {
        return t.cancelAnimationFrame || t.webkitCancelAnimationFrame || t.mozCancelAnimationFrame || t.oCancelAnimationFrame || function(e) {
            t.clearTimeout(e);
        };
    }(), i = function(e) {
        var n = [];
        e = e.originalEvent || e || t.e, e = e.touches && e.touches.length ? e.touches : e.changedTouches && e.changedTouches.length ? e.changedTouches : [ e ];
        for (var o in e) e[o].pageX ? n.push({
            x: e[o].pageX,
            y: e[o].pageY
        }) : e[o].clientX && n.push({
            x: e[o].clientX,
            y: e[o].clientY
        });
        return n;
    }, s = function(t, e, n) {
        return e && t ? "x" === n ? t.x - e.x : "y" === n ? t.y - e.y : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)) : 0;
    }, r = function(t) {
        if (t.is('a,area,button,[role="button"],input,label,select,summary,textarea') || n.isFunction(t.get(0).onclick) || t.data("selectable")) return !0;
        for (var e = 0, o = t[0].attributes, a = o.length; e < a; e++) if ("data-fancybox-" === o[e].nodeName.substr(0, 14)) return !0;
        return !1;
    }, c = function(e) {
        var n = t.getComputedStyle(e)["overflow-y"], o = t.getComputedStyle(e)["overflow-x"], a = ("scroll" === n || "auto" === n) && e.scrollHeight > e.clientHeight, i = ("scroll" === o || "auto" === o) && e.scrollWidth > e.clientWidth;
        return a || i;
    }, l = function(t) {
        for (var e = !1; ;) {
            if (e = c(t.get(0))) break;
            if (t = t.parent(), !t.length || t.hasClass("fancybox-stage") || t.is("body")) break;
        }
        return e;
    }, u = function(t) {
        var e = this;
        e.instance = t, e.$bg = t.$refs.bg, e.$stage = t.$refs.stage, e.$container = t.$refs.container, 
        e.destroy(), e.$container.on("touchstart.fb.touch mousedown.fb.touch", n.proxy(e, "ontouchstart"));
    };
    u.prototype.destroy = function() {
        this.$container.off(".fb.touch");
    }, u.prototype.ontouchstart = function(o) {
        var a = this, c = n(o.target), u = a.instance, d = u.current, f = d.$content, p = "touchstart" == o.type;
        if (p && a.$container.off("mousedown.fb.touch"), !d || a.instance.isAnimating || a.instance.isClosing) return o.stopPropagation(), 
        void o.preventDefault();
        if ((!o.originalEvent || 2 != o.originalEvent.button) && c.length && !r(c) && !r(c.parent()) && !(o.originalEvent.clientX > c[0].clientWidth + c.offset().left) && (a.startPoints = i(o), 
        a.startPoints && !(a.startPoints.length > 1 && u.isSliding))) {
            if (a.$target = c, a.$content = f, a.canTap = !0, a.opts = d.opts.touch, n(e).off(".fb.touch"), 
            n(e).on(p ? "touchend.fb.touch touchcancel.fb.touch" : "mouseup.fb.touch mouseleave.fb.touch", n.proxy(a, "ontouchend")), 
            n(e).on(p ? "touchmove.fb.touch" : "mousemove.fb.touch", n.proxy(a, "ontouchmove")), 
            !a.opts && !u.canPan() || !c.is(a.$stage) && !a.$stage.find(c).length) return void (c.is("img") && o.preventDefault());
            o.stopPropagation(), n.fancybox.isMobile && (l(a.$target) || l(a.$target.parent())) || o.preventDefault(), 
            a.canvasWidth = Math.round(d.$slide[0].clientWidth), a.canvasHeight = Math.round(d.$slide[0].clientHeight), 
            a.startTime = new Date().getTime(), a.distanceX = a.distanceY = a.distance = 0, 
            a.isPanning = !1, a.isSwiping = !1, a.isZooming = !1, a.sliderStartPos = a.sliderLastPos || {
                top: 0,
                left: 0
            }, a.contentStartPos = n.fancybox.getTranslate(a.$content), a.contentLastPos = null, 
            1 !== a.startPoints.length || a.isZooming || (a.canTap = !u.isSliding, "image" === d.type && (a.contentStartPos.width > a.canvasWidth + 1 || a.contentStartPos.height > a.canvasHeight + 1) ? (n.fancybox.stop(a.$content), 
            a.$content.css("transition-duration", "0ms"), a.isPanning = !0) : a.isSwiping = !0, 
            a.$container.addClass("fancybox-controls--isGrabbing")), 2 !== a.startPoints.length || u.isAnimating || d.hasError || "image" !== d.type || !d.isLoaded && !d.$ghost || (a.isZooming = !0, 
            a.isSwiping = !1, a.isPanning = !1, n.fancybox.stop(a.$content), a.$content.css("transition-duration", "0ms"), 
            a.centerPointStartX = .5 * (a.startPoints[0].x + a.startPoints[1].x) - n(t).scrollLeft(), 
            a.centerPointStartY = .5 * (a.startPoints[0].y + a.startPoints[1].y) - n(t).scrollTop(), 
            a.percentageOfImageAtPinchPointX = (a.centerPointStartX - a.contentStartPos.left) / a.contentStartPos.width, 
            a.percentageOfImageAtPinchPointY = (a.centerPointStartY - a.contentStartPos.top) / a.contentStartPos.height, 
            a.startDistanceBetweenFingers = s(a.startPoints[0], a.startPoints[1]));
        }
    }, u.prototype.ontouchmove = function(t) {
        var e = this;
        if (e.newPoints = i(t), n.fancybox.isMobile && (l(e.$target) || l(e.$target.parent()))) return t.stopPropagation(), 
        void (e.canTap = !1);
        if ((e.opts || e.instance.canPan()) && e.newPoints && e.newPoints.length && (e.distanceX = s(e.newPoints[0], e.startPoints[0], "x"), 
        e.distanceY = s(e.newPoints[0], e.startPoints[0], "y"), e.distance = s(e.newPoints[0], e.startPoints[0]), 
        e.distance > 0)) {
            if (!e.$target.is(e.$stage) && !e.$stage.find(e.$target).length) return;
            t.stopPropagation(), t.preventDefault(), e.isSwiping ? e.onSwipe() : e.isPanning ? e.onPan() : e.isZooming && e.onZoom();
        }
    }, u.prototype.onSwipe = function() {
        var e, i = this, s = i.isSwiping, r = i.sliderStartPos.left || 0;
        s === !0 ? Math.abs(i.distance) > 10 && (i.canTap = !1, i.instance.group.length < 2 && i.opts.vertical ? i.isSwiping = "y" : i.instance.isSliding || i.opts.vertical === !1 || "auto" === i.opts.vertical && n(t).width() > 800 ? i.isSwiping = "x" : (e = Math.abs(180 * Math.atan2(i.distanceY, i.distanceX) / Math.PI), 
        i.isSwiping = e > 45 && e < 135 ? "y" : "x"), i.instance.isSliding = i.isSwiping, 
        i.startPoints = i.newPoints, n.each(i.instance.slides, function(t, e) {
            n.fancybox.stop(e.$slide), e.$slide.css("transition-duration", "0ms"), e.inTransition = !1, 
            e.pos === i.instance.current.pos && (i.sliderStartPos.left = n.fancybox.getTranslate(e.$slide).left);
        }), i.instance.SlideShow && i.instance.SlideShow.isActive && i.instance.SlideShow.stop()) : ("x" == s && (i.distanceX > 0 && (i.instance.group.length < 2 || 0 === i.instance.current.index && !i.instance.current.opts.loop) ? r += Math.pow(i.distanceX, .8) : i.distanceX < 0 && (i.instance.group.length < 2 || i.instance.current.index === i.instance.group.length - 1 && !i.instance.current.opts.loop) ? r -= Math.pow(-i.distanceX, .8) : r += i.distanceX), 
        i.sliderLastPos = {
            top: "x" == s ? 0 : i.sliderStartPos.top + i.distanceY,
            left: r
        }, i.requestId && (a(i.requestId), i.requestId = null), i.requestId = o(function() {
            i.sliderLastPos && (n.each(i.instance.slides, function(t, e) {
                var o = e.pos - i.instance.currPos;
                n.fancybox.setTranslate(e.$slide, {
                    top: i.sliderLastPos.top,
                    left: i.sliderLastPos.left + o * i.canvasWidth + o * e.opts.gutter
                });
            }), i.$container.addClass("fancybox-is-sliding"));
        }));
    }, u.prototype.onPan = function() {
        var t, e, i, s = this;
        s.canTap = !1, t = s.contentStartPos.width > s.canvasWidth ? s.contentStartPos.left + s.distanceX : s.contentStartPos.left, 
        e = s.contentStartPos.top + s.distanceY, i = s.limitMovement(t, e, s.contentStartPos.width, s.contentStartPos.height), 
        i.scaleX = s.contentStartPos.scaleX, i.scaleY = s.contentStartPos.scaleY, s.contentLastPos = i, 
        s.requestId && (a(s.requestId), s.requestId = null), s.requestId = o(function() {
            n.fancybox.setTranslate(s.$content, s.contentLastPos);
        });
    }, u.prototype.limitMovement = function(t, e, n, o) {
        var a, i, s, r, c = this, l = c.canvasWidth, u = c.canvasHeight, d = c.contentStartPos.left, f = c.contentStartPos.top, p = c.distanceX, h = c.distanceY;
        return a = Math.max(0, .5 * l - .5 * n), i = Math.max(0, .5 * u - .5 * o), s = Math.min(l - n, .5 * l - .5 * n), 
        r = Math.min(u - o, .5 * u - .5 * o), n > l && (p > 0 && t > a && (t = a - 1 + Math.pow(-a + d + p, .8) || 0), 
        p < 0 && t < s && (t = s + 1 - Math.pow(s - d - p, .8) || 0)), o > u && (h > 0 && e > i && (e = i - 1 + Math.pow(-i + f + h, .8) || 0), 
        h < 0 && e < r && (e = r + 1 - Math.pow(r - f - h, .8) || 0)), {
            top: e,
            left: t
        };
    }, u.prototype.limitPosition = function(t, e, n, o) {
        var a = this, i = a.canvasWidth, s = a.canvasHeight;
        return n > i ? (t = t > 0 ? 0 : t, t = t < i - n ? i - n : t) : t = Math.max(0, i / 2 - n / 2), 
        o > s ? (e = e > 0 ? 0 : e, e = e < s - o ? s - o : e) : e = Math.max(0, s / 2 - o / 2), 
        {
            top: e,
            left: t
        };
    }, u.prototype.onZoom = function() {
        var e = this, i = e.contentStartPos.width, r = e.contentStartPos.height, c = e.contentStartPos.left, l = e.contentStartPos.top, u = s(e.newPoints[0], e.newPoints[1]), d = u / e.startDistanceBetweenFingers, f = Math.floor(i * d), p = Math.floor(r * d), h = (i - f) * e.percentageOfImageAtPinchPointX, g = (r - p) * e.percentageOfImageAtPinchPointY, b = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft(), m = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop(), y = b - e.centerPointStartX, v = m - e.centerPointStartY, x = c + (h + y), w = l + (g + v), $ = {
            top: w,
            left: x,
            scaleX: e.contentStartPos.scaleX * d,
            scaleY: e.contentStartPos.scaleY * d
        };
        e.canTap = !1, e.newWidth = f, e.newHeight = p, e.contentLastPos = $, e.requestId && (a(e.requestId), 
        e.requestId = null), e.requestId = o(function() {
            n.fancybox.setTranslate(e.$content, e.contentLastPos);
        });
    }, u.prototype.ontouchend = function(t) {
        var o = this, s = Math.max(new Date().getTime() - o.startTime, 1), r = o.isSwiping, c = o.isPanning, l = o.isZooming;
        return o.endPoints = i(t), o.$container.removeClass("fancybox-controls--isGrabbing"), 
        n(e).off(".fb.touch"), o.requestId && (a(o.requestId), o.requestId = null), o.isSwiping = !1, 
        o.isPanning = !1, o.isZooming = !1, o.canTap ? o.onTap(t) : (o.speed = 366, o.velocityX = o.distanceX / s * .5, 
        o.velocityY = o.distanceY / s * .5, o.speedX = Math.max(.5 * o.speed, Math.min(1.5 * o.speed, 1 / Math.abs(o.velocityX) * o.speed)), 
        void (c ? o.endPanning() : l ? o.endZooming() : o.endSwiping(r)));
    }, u.prototype.endSwiping = function(t) {
        var e = this, o = !1;
        e.instance.isSliding = !1, e.sliderLastPos = null, "y" == t && Math.abs(e.distanceY) > 50 ? (n.fancybox.animate(e.instance.current.$slide, {
            top: e.sliderStartPos.top + e.distanceY + 150 * e.velocityY,
            opacity: 0
        }, 150), o = e.instance.close(!0, 300)) : "x" == t && e.distanceX > 50 && e.instance.group.length > 1 ? o = e.instance.previous(e.speedX) : "x" == t && e.distanceX < -50 && e.instance.group.length > 1 && (o = e.instance.next(e.speedX)), 
        o !== !1 || "x" != t && "y" != t || e.instance.jumpTo(e.instance.current.index, 150), 
        e.$container.removeClass("fancybox-is-sliding");
    }, u.prototype.endPanning = function() {
        var t, e, o, a = this;
        a.contentLastPos && (a.opts.momentum === !1 ? (t = a.contentLastPos.left, e = a.contentLastPos.top) : (t = a.contentLastPos.left + a.velocityX * a.speed, 
        e = a.contentLastPos.top + a.velocityY * a.speed), o = a.limitPosition(t, e, a.contentStartPos.width, a.contentStartPos.height), 
        o.width = a.contentStartPos.width, o.height = a.contentStartPos.height, n.fancybox.animate(a.$content, o, 330));
    }, u.prototype.endZooming = function() {
        var t, e, o, a, i = this, s = i.instance.current, r = i.newWidth, c = i.newHeight;
        i.contentLastPos && (t = i.contentLastPos.left, e = i.contentLastPos.top, a = {
            top: e,
            left: t,
            width: r,
            height: c,
            scaleX: 1,
            scaleY: 1
        }, n.fancybox.setTranslate(i.$content, a), r < i.canvasWidth && c < i.canvasHeight ? i.instance.scaleToFit(150) : r > s.width || c > s.height ? i.instance.scaleToActual(i.centerPointStartX, i.centerPointStartY, 150) : (o = i.limitPosition(t, e, r, c), 
        n.fancybox.setTranslate(i.content, n.fancybox.getTranslate(i.$content)), n.fancybox.animate(i.$content, o, 150)));
    }, u.prototype.onTap = function(t) {
        var e, o = this, a = n(t.target), s = o.instance, r = s.current, c = t && i(t) || o.startPoints, l = c[0] ? c[0].x - o.$stage.offset().left : 0, u = c[0] ? c[0].y - o.$stage.offset().top : 0, d = function(e) {
            var a = r.opts[e];
            if (n.isFunction(a) && (a = a.apply(s, [ r, t ])), a) switch (a) {
              case "close":
                s.close(o.startEvent);
                break;

              case "toggleControls":
                s.toggleControls(!0);
                break;

              case "next":
                s.next();
                break;

              case "nextOrClose":
                s.group.length > 1 ? s.next() : s.close(o.startEvent);
                break;

              case "zoom":
                "image" == r.type && (r.isLoaded || r.$ghost) && (s.canPan() ? s.scaleToFit() : s.isScaledDown() ? s.scaleToActual(l, u) : s.group.length < 2 && s.close(o.startEvent));
            }
        };
        if (!(t.originalEvent && 2 == t.originalEvent.button || s.isSliding || l > a[0].clientWidth + a.offset().left)) {
            if (a.is(".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container")) e = "Outside"; else if (a.is(".fancybox-slide")) e = "Slide"; else {
                if (!s.current.$content || !s.current.$content.has(t.target).length) return;
                e = "Content";
            }
            if (o.tapped) {
                if (clearTimeout(o.tapped), o.tapped = null, Math.abs(l - o.tapX) > 50 || Math.abs(u - o.tapY) > 50 || s.isSliding) return this;
                d("dblclick" + e);
            } else o.tapX = l, o.tapY = u, r.opts["dblclick" + e] && r.opts["dblclick" + e] !== r.opts["click" + e] ? o.tapped = setTimeout(function() {
                o.tapped = null, d("click" + e);
            }, 300) : d("click" + e);
            return this;
        }
    }, n(e).on("onActivate.fb", function(t, e) {
        e && !e.Guestures && (e.Guestures = new u(e));
    }), n(e).on("beforeClose.fb", function(t, e) {
        e && e.Guestures && e.Guestures.destroy();
    });
}(window, document, window.jQuery || jQuery), function(t, e) {
    "use strict";
    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
            slideShow: '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg viewBox="0 0 40 40"><path d="M13,12 L27,20 L13,27 Z" /><path d="M15,10 v19 M23,10 v19" /></svg></button>'
        },
        slideShow: {
            autoStart: !1,
            speed: 3e3
        }
    });
    var n = function(t) {
        this.instance = t, this.init();
    };
    e.extend(n.prototype, {
        timer: null,
        isActive: !1,
        $button: null,
        init: function() {
            var t = this;
            t.$button = t.instance.$refs.toolbar.find("[data-fancybox-play]").on("click", function() {
                t.toggle();
            }), (t.instance.group.length < 2 || !t.instance.group[t.instance.currIndex].opts.slideShow) && t.$button.hide();
        },
        set: function(t) {
            var e = this;
            e.instance && e.instance.current && (t === !0 || e.instance.current.opts.loop || e.instance.currIndex < e.instance.group.length - 1) ? e.timer = setTimeout(function() {
                e.isActive && e.instance.jumpTo((e.instance.currIndex + 1) % e.instance.group.length);
            }, e.instance.current.opts.slideShow.speed) : (e.stop(), e.instance.idleSecondsCounter = 0, 
            e.instance.showControls());
        },
        clear: function() {
            var t = this;
            clearTimeout(t.timer), t.timer = null;
        },
        start: function() {
            var t = this, e = t.instance.current;
            e && (t.isActive = !0, t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_STOP).removeClass("fancybox-button--play").addClass("fancybox-button--pause"), 
            t.set(!0));
        },
        stop: function() {
            var t = this, e = t.instance.current;
            t.clear(), t.$button.attr("title", e.opts.i18n[e.opts.lang].PLAY_START).removeClass("fancybox-button--pause").addClass("fancybox-button--play"), 
            t.isActive = !1;
        },
        toggle: function() {
            var t = this;
            t.isActive ? t.stop() : t.start();
        }
    }), e(t).on({
        "onInit.fb": function(t, e) {
            e && !e.SlideShow && (e.SlideShow = new n(e));
        },
        "beforeShow.fb": function(t, e, n, o) {
            var a = e && e.SlideShow;
            o ? a && n.opts.slideShow.autoStart && a.start() : a && a.isActive && a.clear();
        },
        "afterShow.fb": function(t, e, n) {
            var o = e && e.SlideShow;
            o && o.isActive && o.set();
        },
        "afterKeydown.fb": function(n, o, a, i, s) {
            var r = o && o.SlideShow;
            !r || !a.opts.slideShow || 80 !== s && 32 !== s || e(t.activeElement).is("button,a,input") || (i.preventDefault(), 
            r.toggle());
        },
        "beforeClose.fb onDeactivate.fb": function(t, e) {
            var n = e && e.SlideShow;
            n && n.stop();
        }
    }), e(t).on("visibilitychange", function() {
        var n = e.fancybox.getInstance(), o = n && n.SlideShow;
        o && o.isActive && (t.hidden ? o.clear() : o.set());
    });
}(document, window.jQuery || jQuery), function(t, e) {
    "use strict";
    var n = function() {
        var e, n, o, a = [ [ "requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror" ], [ "webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror" ], [ "webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror" ], [ "mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror" ], [ "msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError" ] ], i = {};
        for (n = 0; n < a.length; n++) if (e = a[n], e && e[1] in t) {
            for (o = 0; o < e.length; o++) i[a[0][o]] = e[o];
            return i;
        }
        return !1;
    }();
    if (!n) return void (e && e.fancybox && (e.fancybox.defaults.btnTpl.fullScreen = !1));
    var o = {
        request: function(e) {
            e = e || t.documentElement, e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT);
        },
        exit: function() {
            t[n.exitFullscreen]();
        },
        toggle: function(e) {
            e = e || t.documentElement, this.isFullscreen() ? this.exit() : this.request(e);
        },
        isFullscreen: function() {
            return Boolean(t[n.fullscreenElement]);
        },
        enabled: function() {
            return Boolean(t[n.fullscreenEnabled]);
        }
    };
    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
            fullScreen: '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"><svg viewBox="0 0 40 40"><path d="M9,12 h22 v16 h-22 v-16 v16 h22 v-16 Z" /></svg></button>'
        },
        fullScreen: {
            autoStart: !1
        }
    }), e(t).on({
        "onInit.fb": function(t, e) {
            var n;
            e && e.group[e.currIndex].opts.fullScreen ? (n = e.$refs.container, n.on("click.fb-fullscreen", "[data-fancybox-fullscreen]", function(t) {
                t.stopPropagation(), t.preventDefault(), o.toggle(n[0]);
            }), e.opts.fullScreen && e.opts.fullScreen.autoStart === !0 && o.request(n[0]), 
            e.FullScreen = o) : e && e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide();
        },
        "afterKeydown.fb": function(t, e, n, o, a) {
            e && e.FullScreen && 70 === a && (o.preventDefault(), e.FullScreen.toggle(e.$refs.container[0]));
        },
        "beforeClose.fb": function(t) {
            t && t.FullScreen && o.exit();
        }
    }), e(t).on(n.fullscreenchange, function() {
        var t = o.isFullscreen(), n = e.fancybox.getInstance();
        n && (n.current && "image" === n.current.type && n.isAnimating && (n.current.$content.css("transition", "none"), 
        n.isAnimating = !1, n.update(!0, !0, 0)), n.trigger("onFullscreenChange", t), n.$refs.container.toggleClass("fancybox-is-fullscreen", t));
    });
}(document, window.jQuery || jQuery), function(t, e) {
    "use strict";
    e.fancybox.defaults = e.extend(!0, {
        btnTpl: {
            thumbs: '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg viewBox="0 0 120 120"><path d="M30,30 h14 v14 h-14 Z M50,30 h14 v14 h-14 Z M70,30 h14 v14 h-14 Z M30,50 h14 v14 h-14 Z M50,50 h14 v14 h-14 Z M70,50 h14 v14 h-14 Z M30,70 h14 v14 h-14 Z M50,70 h14 v14 h-14 Z M70,70 h14 v14 h-14 Z" /></svg></button>'
        },
        thumbs: {
            autoStart: !1,
            hideOnClose: !0,
            parentEl: ".fancybox-container",
            axis: "y"
        }
    }, e.fancybox.defaults);
    var n = function(t) {
        this.init(t);
    };
    e.extend(n.prototype, {
        $button: null,
        $grid: null,
        $list: null,
        isVisible: !1,
        isActive: !1,
        init: function(t) {
            var e = this;
            e.instance = t, t.Thumbs = e;
            var n = t.group[0], o = t.group[1];
            e.opts = t.group[t.currIndex].opts.thumbs, e.$button = t.$refs.toolbar.find("[data-fancybox-thumbs]"), 
            e.opts && n && o && ("image" == n.type || n.opts.thumb || n.opts.$thumb) && ("image" == o.type || o.opts.thumb || o.opts.$thumb) ? (e.$button.show().on("click", function() {
                e.toggle();
            }), e.isActive = !0) : e.$button.hide();
        },
        create: function() {
            var t, n, o = this, a = o.instance, i = o.opts.parentEl;
            o.$grid = e('<div class="fancybox-thumbs fancybox-thumbs-' + o.opts.axis + '"></div>').appendTo(a.$refs.container.find(i).addBack().filter(i)), 
            t = "<ul>", e.each(a.group, function(e, o) {
                n = o.opts.thumb || (o.opts.$thumb ? o.opts.$thumb.attr("src") : null), n || "image" !== o.type || (n = o.src), 
                n && n.length && (t += '<li data-index="' + e + '"  tabindex="0" class="fancybox-thumbs-loading"><img data-src="' + n + '" /></li>');
            }), t += "</ul>", o.$list = e(t).appendTo(o.$grid).on("click", "li", function() {
                a.jumpTo(e(this).data("index"));
            }), o.$list.find("img").hide().one("load", function() {
                var t, n, o, a, i = e(this).parent().removeClass("fancybox-thumbs-loading"), s = i.outerWidth(), r = i.outerHeight();
                t = this.naturalWidth || this.width, n = this.naturalHeight || this.height, o = t / s, 
                a = n / r, o >= 1 && a >= 1 && (o > a ? (t /= a, n = r) : (t = s, n /= o)), e(this).css({
                    width: Math.floor(t),
                    height: Math.floor(n),
                    "margin-top": n > r ? Math.floor(.3 * r - .3 * n) : Math.floor(.5 * r - .5 * n),
                    "margin-left": Math.floor(.5 * s - .5 * t)
                }).show();
            }).each(function() {
                this.src = e(this).data("src");
            }), "x" === o.opts.axis && o.$list.width(parseInt(o.$grid.css("padding-right")) + a.group.length * o.$list.children().eq(0).outerWidth(!0) + "px");
        },
        focus: function(t) {
            var e, n, o = this, a = o.$list;
            o.instance.current && (e = a.children().removeClass("fancybox-thumbs-active").filter('[data-index="' + o.instance.current.index + '"]').addClass("fancybox-thumbs-active"), 
            n = e.position(), "y" === o.opts.axis && (n.top < 0 || n.top > a.height() - e.outerHeight()) ? a.stop().animate({
                scrollTop: a.scrollTop() + n.top
            }, t) : "x" === o.opts.axis && (n.left < a.parent().scrollLeft() || n.left > a.parent().scrollLeft() + (a.parent().width() - e.outerWidth())) && a.parent().stop().animate({
                scrollLeft: n.left
            }, t));
        },
        update: function() {
            this.instance.$refs.container.toggleClass("fancybox-show-thumbs", this.isVisible), 
            this.isVisible ? (this.$grid || this.create(), this.instance.trigger("onThumbsShow"), 
            this.focus(0)) : this.$grid && this.instance.trigger("onThumbsHide"), this.instance.update();
        },
        hide: function() {
            this.isVisible = !1, this.update();
        },
        show: function() {
            this.isVisible = !0, this.update();
        },
        toggle: function() {
            this.isVisible = !this.isVisible, this.update();
        }
    }), e(t).on({
        "onInit.fb": function(t, e) {
            var o;
            e && !e.Thumbs && (o = new n(e), o.isActive && o.opts.autoStart === !0 && o.show());
        },
        "beforeShow.fb": function(t, e, n, o) {
            var a = e && e.Thumbs;
            a && a.isVisible && a.focus(o ? 0 : 250);
        },
        "afterKeydown.fb": function(t, e, n, o, a) {
            var i = e && e.Thumbs;
            i && i.isActive && 71 === a && (o.preventDefault(), i.toggle());
        },
        "beforeClose.fb": function(t, e) {
            var n = e && e.Thumbs;
            n && n.isVisible && n.opts.hideOnClose !== !1 && n.$grid.hide();
        }
    });
}(document, window.jQuery), function(t, e) {
    "use strict";
    function n(t) {
        var e = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;",
            "`": "&#x60;",
            "=": "&#x3D;"
        };
        return String(t).replace(/[&<>"'`=\/]/g, function(t) {
            return e[t];
        });
    }
    e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
            share: '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg viewBox="0 0 40 40"><path d="M6,30 C8,18 19,16 23,16 L23,16 L23,10 L33,20 L23,29 L23,24 C19,24 8,27 6,30 Z"></svg></button>'
        },
        share: {
            tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a href="https://www.facebook.com/sharer/sharer.php?u={{src}}" target="_blank" class="fancybox-share_button"><svg version="1.1" viewBox="0 0 32 32" fill="#3b5998"><path d="M27.6 3h-23.2c-.8 0-1.4.6-1.4 1.4v23.1c0 .9.6 1.5 1.4 1.5h12.5v-10.1h-3.4v-3.9h3.4v-2.9c0-3.4 2.1-5.2 5-5.2 1.4 0 2.7.1 3 .2v3.5h-2.1c-1.6 0-1.9.8-1.9 1.9v2.5h3.9l-.5 3.9h-3.4v10.1h6.6c.8 0 1.4-.6 1.4-1.4v-23.2c.1-.8-.5-1.4-1.3-1.4z"></path></svg><span>Facebook</span></a><a href="https://www.pinterest.com/pin/create/button/?url={{src}}&amp;description={{descr}}" target="_blank" class="fancybox-share_button"><svg version="1.1" viewBox="0 0 32 32" fill="#c92228"><path d="M16 3c-7.2 0-13 5.8-13 13 0 5.5 3.4 10.2 8.3 12.1-.1-1-.2-2.6 0-3.7.2-1 1.5-6.5 1.5-6.5s-.4-.8-.4-1.9c0-1.8 1-3.2 2.4-3.2 1.1 0 1.6.8 1.6 1.8 0 1.1-.7 2.8-1.1 4.3-.3 1.3.6 2.3 1.9 2.3 2.3 0 4.1-2.4 4.1-6 0-3.1-2.2-5.3-5.4-5.3-3.7 0-5.9 2.8-5.9 5.6 0 1.1.4 2.3 1 3 .1.1.1.2.1.4-.1.4-.3 1.3-.4 1.5-.1.2-.2.3-.4.2-1.6-.8-2.6-3.1-2.6-5 0-4.1 3-7.9 8.6-7.9 4.5 0 8 3.2 8 7.5 0 4.5-2.8 8.1-6.7 8.1-1.3 0-2.6-.7-3-1.5 0 0-.7 2.5-.8 3.1-.3 1.1-1.1 2.5-1.6 3.4 1.2.4 2.5.6 3.8.6 7.2 0 13-5.8 13-13 0-7.1-5.8-12.9-13-12.9z"></path></svg><span>Pinterest</span></a><a href="https://twitter.com/intent/tweet?url={{src}}&amp;text={{descr}}" target="_blank" class="fancybox-share_button"><svg version="1.1" viewBox="0 0 32 32" fill="#1da1f2"><path d="M30 7.3c-1 .5-2.1.8-3.3.9 1.2-.7 2.1-1.8 2.5-3.2-1.1.7-2.3 1.1-3.6 1.4-1-1.1-2.5-1.8-4.2-1.8-3.2 0-5.7 2.6-5.7 5.7 0 .5.1.9.1 1.3-4.8-.2-9-2.5-11.8-6-.5.9-.8 1.9-.8 3 0 2 1 3.8 2.6 4.8-.9 0-1.8-.3-2.6-.7v.1c0 2.8 2 5.1 4.6 5.6-.5.1-1 .2-1.5.2-.4 0-.7 0-1.1-.1.7 2.3 2.9 3.9 5.4 4-2 1.5-4.4 2.5-7.1 2.5-.5 0-.9 0-1.4-.1 2.5 1.6 5.6 2.6 8.8 2.6 10.6 0 16.3-8.8 16.3-16.3v-.7c1.1-1 2-2 2.8-3.2z"></path></svg><span>Twitter</span></a></p><p><input type="text" value="{{src_raw}}" onfocus="this.select()" /></p></div>'
        }
    }), e(t).on("click", "[data-fancybox-share]", function() {
        var t, o, a = e.fancybox.getInstance();
        a && (t = a.current.opts.hash === !1 ? a.current.src : window.location, o = a.current.opts.share.tpl.replace(/\{\{src\}\}/g, encodeURIComponent(t)).replace(/\{\{src_raw\}\}/g, n(t)).replace(/\{\{descr\}\}/g, a.$caption ? encodeURIComponent(a.$caption.text()) : ""), 
        e.fancybox.open({
            src: a.translate(a, o),
            type: "html",
            opts: {
                animationEffect: "fade",
                animationDuration: 250
            }
        }));
    });
}(document, window.jQuery || jQuery), function(t, e, n) {
    "use strict";
    function o() {
        var t = e.location.hash.substr(1), n = t.split("-"), o = n.length > 1 && /^\+?\d+$/.test(n[n.length - 1]) ? parseInt(n.pop(-1), 10) || 1 : 1, a = n.join("-");
        return o < 1 && (o = 1), {
            hash: t,
            index: o,
            gallery: a
        };
    }
    function a(t) {
        var e;
        "" !== t.gallery && (e = n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']").eq(t.index - 1), 
        e.length || (e = n("#" + n.escapeSelector(t.gallery))), e.length && (s = !1, e.trigger("click")));
    }
    function i(t) {
        var e;
        return !!t && (e = t.current ? t.current.opts : t.opts, e.hash || (e.$orig ? e.$orig.data("fancybox") : ""));
    }
    n.escapeSelector || (n.escapeSelector = function(t) {
        var e = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g, n = function(t, e) {
            return e ? "\0" === t ? "�" : t.slice(0, -1) + "\\" + t.charCodeAt(t.length - 1).toString(16) + " " : "\\" + t;
        };
        return (t + "").replace(e, n);
    });
    var s = !0, r = null, c = null;
    n(function() {
        n.fancybox.defaults.hash !== !1 && (n(t).on({
            "onInit.fb": function(t, e) {
                var n, a;
                e.group[e.currIndex].opts.hash !== !1 && (n = o(), a = i(e), a && n.gallery && a == n.gallery && (e.currIndex = n.index - 1));
            },
            "beforeShow.fb": function(n, o, a) {
                var l;
                a && a.opts.hash !== !1 && (l = i(o), l && "" !== l && (e.location.hash.indexOf(l) < 0 && (o.opts.origHash = e.location.hash), 
                r = l + (o.group.length > 1 ? "-" + (a.index + 1) : ""), "replaceState" in e.history ? (c && clearTimeout(c), 
                c = setTimeout(function() {
                    e.history[s ? "pushState" : "replaceState"]({}, t.title, e.location.pathname + e.location.search + "#" + r), 
                    c = null, s = !1;
                }, 300)) : e.location.hash = r));
            },
            "beforeClose.fb": function(o, a, s) {
                var l, u;
                c && clearTimeout(c), s.opts.hash !== !1 && (l = i(a), u = a && a.opts.origHash ? a.opts.origHash : "", 
                l && "" !== l && ("replaceState" in history ? e.history.replaceState({}, t.title, e.location.pathname + e.location.search + u) : (e.location.hash = u, 
                n(e).scrollTop(a.scrollTop).scrollLeft(a.scrollLeft))), r = null);
            }
        }), n(e).on("hashchange.fb", function() {
            var t = o();
            n.fancybox.getInstance() ? !r || r === t.gallery + "-" + t.index || 1 === t.index && r == t.gallery || (r = null, 
            n.fancybox.close()) : "" !== t.gallery && a(t);
        }), setTimeout(function() {
            a(o());
        }, 50));
    });
}(document, window, window.jQuery || jQuery);
