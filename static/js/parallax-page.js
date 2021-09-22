var MSCOM = MSCOM || {};

MSCOM.Pages = MSCOM.Pages || {};

MSCOM.Pages.parallaxPage = function () {

	function init() {
		initParallax();
	}

	function initParallax() {
		var $pxElements = $('.img-holder'),
			touch = Modernizr.touch,
			pxSupported = $('body').hasClass('ie8') ? false : true;

		if( $('body').hasClass('ie9') ) { pxSupported = false; }
		if( $pxElements.length < 1 ) { return false; }

		$pxElements.imageScroll({
			imageAttribute: (touch === true) ? 'image' : 'image',
			touch: touch,
			parallax: pxSupported,
			coverRatio: 0.55
		});

		if( !pxSupported ) {
			$pxElements.addClass('ie-cant-parallax');

			$pxElements.each(function(el, i) {
				var $el = $(this),
					$img = $el.find('img');
					imgsrc = $el.attr('data-image');

				$el.css('background-image', 'url(' + imgsrc + ')');
				$el.css('background-attachment', 'fixed');
				$el.css('background-size', 'cover');
				$el.css('background-repeat', 'no-repeat');

				$img.css('visibility', 'hidden');
			});
		}

		if( pxSupported && !touch ) {
			console.log('Parallax started, ' + $pxElements.length + ' items affected');

			// fix bug where height of parallax sections is too short on initial page load
			setTimeout(function(){
				$(window).trigger('resize');
			}, 200);
		}
	}

	var api = {
		'init': init
	};

	return api;
}();
