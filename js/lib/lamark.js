/**
 * Lamark
 *
 * Creative Portfolio Template
 *
 * v1.0.0
 * By Amcode
 */



(function($) {

	'use strict';

	/** GENERALS */
	/** ================================================== */

	/** Viewport dimensions */
	var ww = $(window).width();
	var wh = $(window).height();

	/** Adjust components to viewport dimensions */
	$('.fh').css('height', wh + 'px');

	var hh = wh - $('.site-header').height();
	$('.hero.small').css('height', (hh * 0.7) + 'px');
	$('.hero.medium').css('height', (hh * 0.8) + 'px');
	$('.hero.big').css('height', (hh * 0.9) + 'px');
	$('.hero.full').css('height', hh + 'px');

	/** Vertical center */
	$('.vcenter').each(function() {
		$(this).css('top', ($(this).parent().height() - $(this).height()) / 2 + 'px');
	});



	/** TEMPLATE FUNCTIONS */
	/** ================================================== */

	var templateFunctions = {

		/** Nav */
		nav: function() {

			if (ww > 960) {
				$('.trigger-nav').css('display', 'none');
				$('.site-menu').css('display', 'block');
			} else {
				$('.trigger-nav').css('display', 'block');
				$('.site-menu').css('display', 'none');
			}

			$('.trigger-nav').on('click', function() {

				if (!$(this).hasClass('open-nav')) {
					$(this).addClass('open-nav');
					toggleNav(true);
				} else {
					$(this).removeClass('open-nav');
					toggleNav(false);
				}

			});

			$(window).bind('resize', function() {

				if (ww > 960) {
					$('.trigger-nav').css('display', 'none');
					$('.site-menu').css('display', 'block');

					if ($('.trigger-nav').hasClass('open-nav')) {
						$('.trigger-nav').removeClass('open-nav');
					}
				} else {
					$('.trigger-nav').css('display', 'block');
					$('.site-menu').css('display', 'none');
				}

			});

			$(window).on('scroll', function() {
				if (ww > 960) {
					if ($('.trigger-nav').hasClass('open-nav')) {
						$('.trigger-nav').removeClass('open-nav');
						toggleNav(false);
					}
				}
			});

			function toggleNav(bool) {

				if (bool === true) $('.site-menu').slideDown();
				else $('.site-menu').slideUp();

			}

		},

		/** Images */
		imgs: function() {

			/** Background images */
			$('.iBG').each(function() {
				$(this).css('background-image', 'url(' + $(this).attr('data-img') + ')');
			});

			/** Parallax */
			if (ww > 960) {
				$(window).bind('scroll', function() {

					var pos = -($(this).scrollTop() / 1.3);
					var coords = '50%' + pos + 'px';

					$('.parallax').each(function() {
						$(this).css('background-position', coords);
					});

				});
			}

		},

		/** Portfolio */
		grid: function() {

			/** Container */
			var container = $('.grid');

			for (var i = 0; i < container.length; i++) {

				/** Container */
				var containerAct = $(container[i]);
				var cWidth = containerAct.width();

				/** Items */
				var items = containerAct.find('.entry');

				/** Columns */
				var cols = 1;
				var attr_cols = parseInt(containerAct.attr('data-col'), 10);

				/** Margin */
				var margin = parseInt(containerAct.attr('data-margin'), 10);
				if (!margin) margin = 0;

				/** Height */
				var data_height = parseFloat(containerAct.attr('data-height'));
				if (!data_height) data_height = 0.7;

				/** Double height */
				var double_height = parseFloat(containerAct.attr('data-double-height'));
				if (!double_height) double_height = 1.5;

				/** Set margins to the container */
				container.css({
					margin: -Math.floor(margin / 2) + 'px'
				});

				if (ww >= 1024) {

					cWidth = containerAct.width();
					if (attr_cols) cols = attr_cols;
					else cols = 3;

					/** Calculating the width and height */
					var iWidth = Math.floor((cWidth / cols) - (margin * cols / cols));
					var iHeight = Math.floor(iWidth * data_height);
					var iMargin = Math.floor(margin / 2);

					items.each(function() {
						$(this).css({
							width: iWidth + 'px',
							height: iHeight + 'px',
							margin: iMargin + 'px'
						});

						if ($(this).hasClass('h2') && $(this).closest('[data-masonry="true"]').length) $(this).css('height', (iHeight * double_height) + margin + 'px');
						if ($(this).hasClass('w2') && $(this).closest('[data-masonry="true"]').length) $(this).css('width', (iWidth * 2) + (iMargin * 2) + 'px');
					});

				} else if (ww > 767) {

					cWidth = containerAct.width();
					if (attr_cols !== 1) cols = 2;

					/** Calculating the width and height */
					var iWidth = Math.floor((cWidth / cols) - (margin * cols / cols));
					var iHeight = Math.floor(iWidth * data_height);
					var iMargin = Math.floor(margin / 2);

					items.each(function() {
						$(this).css({
							width: iWidth + 'px',
							height: iHeight + 'px',
							margin: iMargin + 'px'
						});

						if ($(this).hasClass('h2') && $(this).closest('[data-masonry="true"]').length) $(this).css('height', (iHeight * double_height) + margin + 'px');
						if ($(this).hasClass('w2') && $(this).closest('[data-masonry="true"]').length) $(this).css('width', (iWidth * 2) + (iMargin * 2) + 'px');
					});

				} else {

					cWidth = containerAct.width();
					cols = cols;

					/** Calculating the width and height */
					var iWidth = Math.floor((cWidth / cols) - (margin * cols / cols));
					var iHeight = Math.floor(iWidth * data_height);
					var iMargin = Math.floor(margin / 2);

					items.each(function() {
						$(this).css({
							width: iWidth + 'px',
							height: iHeight + 'px',
							margin: iMargin + 'px'
						});

						if ($(this).hasClass('h2') && $(this).closest('[data-masonry="true"]').length) $(this).css('height', (iHeight * double_height) + margin + 'px');
						if ($(this).hasClass('w2') && $(this).closest('[data-masonry="true"]').length) $(this).css('width', iWidth + 'px');
					});

				}

			};

		},

		/** Masonry portfolio */
		masonry: function() {

			var container = $('.grid');

			container.isotope({
				itemSelector: '.entry'
			});

		},

		/** Filters */
		filtering: function() {

			var container = $('.grid');

			$('.filters li a').on('click', function(e) {
				e.preventDefault();

				$('.filters li a').removeClass('active');
				$(this).addClass('active');

				var filter = $(this).attr('data-filter');

				container.isotope({
					itemSelector: '.entry',
					filter: filter
				});
			});

		},

		/** Back2top */
		back2top: function() {

			$('.back2top').on('click', function() {
				$('html, body').animate({
					scrollTop: 0
				}, 1000);
			});

		},

		/** fitvids */
		fitvids: function() {

			$("#site-body").fitVids();

		}

	}



	/** FIX */
	/** ================================================== */

	function fix() {

		/** Adjust components to viewport dimensions */
		$('.fh').css('height', wh + 'px');

		/** Hero heights */
		var hh = wh - $('.site-header').height();
		$('.hero.small').css('height', (hh * 0.7) + 'px');
		$('.hero.medium').css('height', (hh * 0.8) + 'px');
		$('.hero.big').css('height', (hh * 0.9) + 'px');
		$('.hero.full').css('height', hh + 'px');

		/** Vertical center */
		$('.vcenter').each(function() {
			$(this).css('top', ($(this).parent().height() - $(this).height()) / 2 + 'px');
		});

	}



	/** LOAD */
	/** ================================================== */

	$(window).bind('load', function() {

		$('.preloader').delay(200).fadeOut();

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

	$(window).bind('resize', function() {

		/** Viewport dimensions */
		ww = $(window).width();
		wh = $(window).height();

		/** Load template functions */
		templateFunctions.grid();
		templateFunctions.masonry();

		fix();

	});

})(jQuery);