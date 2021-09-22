var MSCOM = MSCOM || {};



MSCOM.utilities = function () {

	/**
	 * Ajax wrapper
	 * @param  {String}   url      URL for endpoint
	 * @param  {String}   type     type of call GET, POST
	 * @param  {String}   dataType Retrurn data type, JSON, HTML
	 * @param  {Function} callback What do we do with the data
	 * @return {none}
	 */
	function ajax(url,type,dataType,formData,callback) {
		$.ajax({
			url: url,
			type: type,
			dataType: dataType,
			data: formData,
			success: callback,
			error: function(xhr, textStatus, errorThrown) {
				console.log(xhr.status);
			}
		});
	}

	/**
	 * iOS6/7 bug with vw units and orientation change, hide and show tiles module, reset font-size
	 * @param {Obj} $tilesModule	tile module div
	 * @param {Obj} $tileRows		tile module rows
	 * @return {none}
	 */
	function repaintTiles($tilesModule,$tileRows){
		var height = $tilesModule.height();
		$tilesModule.css({'height':height});

		// iOS6/7 bug with vw units and orientation change, hide and show tiles module
		$tileRows.hide();

		setTimeout(function() {
			$tileRows.show();
			$tilesModule.removeAttr('style');
		}, 0);
	}

	/**
	 * Adds a timeout to methods that would otherwise
	 * be called multiple times when not needed
	 * @param  {function} func     callback
	 * @param  {number} wait       time to wait
	 * @param  {boolean} immediate trigger on leading edge
	 * @return {function}
	 */
	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}

	/**
	 * Dynamically scales fonts
	 * @param  {object} $el jquery element
	 * @param  {number} min min font size
	 * @param  {number} max max font size
	 * @param  {number} mid how quickly font scales
	 * @return {none}
	 */
	function fontFlex($el, min, max, mid) {

		var mid_size = mid || 65,
			size = window.innerWidth / mid_size;

        if (size < min) size = min;
        if (size > max) size = max;

        $el.css('font-size', size + 'px');
	}

	/**
	 * adds font flex to tiles module
	 * @param  {object} $element jquery element
	 * @return {none}
	 */
	function tileFontFlex($element) {
		var wWidth = window.innerWidth;

		if ( wWidth >= 1280 ) {
			$element.css('font-size','');
		}
		else if ( wWidth < 1280 && wWidth >=1000 ) { // Small Desktop
			fontFlex($element, 12.8, 16, 80);

		} else if ( wWidth < 1000 && wWidth >=600 ) { // Tablet
			fontFlex($element, 12.8, 20, 50);

		} else { // Mobile
			fontFlex($element, 12.5, 60, 25);
		}
	}

	/**
	 * Adds background image to container
	 * @return {none}
	 */
	function responsiveBackground() {
		var $imgs = $('[data-url]');

		$imgs.each(function(){
			var URL = $(this).data('url'),
				fileName = URL.substr(0,URL.lastIndexOf(".")),
				fileSize = fileName.substr(0, fileName.lastIndexOf("-"))
				fileExt = URL.substr(URL.lastIndexOf(".") + 1,URL.length);

			$(this).css({
				"backgroundImage": "url("+fileSize+"-"+MSCOM.windowObj.viewport+'.'+fileExt+")"
			});
		});
	}



	/**
	 * Returns width of scrollbar if it exists
	 * @return {number} Width of scrollbar
	 */
	function getScrollBarWidth(){
		var width = 0;

		if (window.innerWidth) { //IE8 check
			width = window.innerWidth - $(window).width();
		}
		return width;
	}

	/**
	 * Styles Branch List with additional css classes
	 * 1) Measures content amount/height of individual cells and adds class so heights do not break
	 * 2) Applies "_last-three" and "_last-two" classes to dynamically set branch list items for
	 * correct bottom borders at three and two columns
	 * @return {none}
	 */
	function styleFluidGridList($fluidGridLists){

		//in case there are multiple lists on page
		$fluidGridLists.each(function(){

			var $fluidGridList = $(this),
				$fluidGridItems = $fluidGridList.find('.fg-list-item'),
				FG_ITEMS_LENGTH = $fluidGridItems.length,
				remainingThree = FG_ITEMS_LENGTH - (FG_ITEMS_LENGTH % 3),
				remainingTwo = FG_ITEMS_LENGTH - (FG_ITEMS_LENGTH % 2),
				maxCharCount = 0,
				DEFAULT_MIN_HEIGHT = 263,
				HEIGHT_MULTIPLIER = 8.2,
				setHeight = parseInt($fluidGridList.data('set-height'),10); // manual height set by user in dialog

			if (FG_ITEMS_LENGTH % 3 === 0) {
				remainingThree -= 3;
			}
			if (FG_ITEMS_LENGTH % 2 === 0) {
				remainingTwo -= 2;
			}

			$fluidGridItems.each(function(index){
				var $item = $(this),
					$location = $item.find('.location'),
					$name = $item.find('.name'),
					nameBrCount = $name.find('br').length;

				// check if location exists, then get character count
				if ( $location.length > 0 && $name.length > 0 ) {
					var itemCharCount = $location.text().replace(/\s+/g,'').length + $name.text().length;

					if (nameBrCount > 0) {
						itemCharCount = itemCharCount + ( Math.ceil(nameBrCount/2) * 25 );
					}

					if (itemCharCount > maxCharCount) {
						maxCharCount = itemCharCount;
					}
				}

				if (index > remainingThree - 1 ) {
					$item.addClass('_last-three');
				}
				if (index > remainingTwo - 1 ) {
					$item.addClass('_last-two');
				}
			});

			if ( !isNaN( setHeight ) ) { // if user has set height manually

				$fluidGridItems.find('.fg-inner').css('min-height', setHeight + 'px' );

			} else if (maxCharCount > 90 && !$fluidGridList.hasClass('-disable-calc-height')) { //don't style portfolio lists
				var calcHeight = ( Math.sqrt(maxCharCount)*HEIGHT_MULTIPLIER + maxCharCount ) > DEFAULT_MIN_HEIGHT ? ( Math.sqrt(maxCharCount)*HEIGHT_MULTIPLIER + maxCharCount ) : DEFAULT_MIN_HEIGHT;

				$fluidGridItems.find('.fg-inner').css('min-height', calcHeight.toFixed() + 'px' );
			}



		});

	}

	/**
	 * Get url parameters based on the provided name
	 * @param  {String} name parameter name
	 * @param  {String} url  url in which paramerers will be found
	 * @return {null|String} returns param from the url or null of not parameter found
	 */
	function getParameterByName(name, url) {
		var regex,
			results;

	    if (!url) {
	    	url = window.location.href;
	    }

	    name = name.replace(/[\[\]]/g, "\\$&");
	    regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        results = regex.exec(url);
	    if (!results) {
	    	return null;
	    }
	    if (!results[2]) {
	    	return '';
	    }

	    return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	var api = {
		'ajax': ajax,
		'repaintTiles': repaintTiles,
		'debounce': debounce,
		'fontFlex': fontFlex,
		'tileFontFlex': tileFontFlex,
		'responsiveBackground': responsiveBackground,
		'getScrollBarWidth': getScrollBarWidth,
		'styleFluidGridList': styleFluidGridList,
		'getParameterByName': getParameterByName
	};

	return api;
 }();



;var MSCOM = MSCOM || {};

MSCOM.windowObj = MSCOM.windowObj || {};

MSCOM = (function(MSCOM, $){

	var	$html = $('html'),
		$body = $('body'),
		$hamburger = $('.hamburger'),
		$trigger = $('.trigger'),
		$target = $('.target'),
		$mobileSearchTrigger = $('.mobile-nav').find('.search-button'),
		$searchTrigger = $('.sub-nav').find('.search-button'),
		$menuOverlay = $('.menu-overlay'),
		$mainNav = $('.main-nav'),
		$subNav = $('.sub-nav'),
		$smooth = $('._smooth'),
		$input = $('.search-bar').find('input'),
		$tileRow = $('.tiles-module .row').add('.talents-carousel').add('.themetilefullwidth'),
		$searchForm = $('.search-bar').find('form'),
		$searchInput = $searchForm.find('input[type="text"]'),
		$searchButton = $searchForm.find('button'),
		$faLocator = $('.falocator'),
		$svgImg = $('.svg-icon'),
		$hero = $('.hero');

	var loadingPartial = '<div class="loading"></div>';

	MSCOM.windowObj.windowWid = $(window).width();

	/**
	 * Initilaizes accordion for mobile menu
	 * @return {none}
	 */
	function initAccordion() {
		$subNav.on('click','.trigger', function(e){
			if(!$html.hasClass('large')){
				e.preventDefault();
				var ind = $trigger.index($(this));

				if(!$(this).hasClass('is-active')){
					toggleItem();
				}

				$(this).parent('li').toggleClass('icon-up-nav icon-down-nav');
				$(this).toggleClass('is-active');
				$($target[ind]).toggleClass('is-active');
			}

			if($html.hasClass('touch') && MSCOM.windowObj.viewport === 'large') {
				e.preventDefault();
			}
		});
	}

	function checkNavigation() {
		if(MSCOM.windowObj.viewport === 'large') {
			toggleItem();
		}
	}

	function toggleItem() {
		$('.trigger._active').parent('li').toggleClass('icon-up-nav icon-down-nav');
		$trigger.removeClass('_active');
		$target.removeClass('_active');
	}

	function getPNG(el, original, isBG) {
		var newURL = original.replace(".svg", ".svg/_jcr_content/renditions/fallback");
		//var newURL = original.replace(".svg", ".svg/jcr:content/renditions/fallback");
		return newURL;
	}

	function svgIt(){
		if($svgImg.length > 0) {
			$svgImg.svgmagic({
				forceReplacements: false,
				replacementUriCreator: getPNG
			});
		}
	}


	/**
	 * Checks if placeholder is supported
	 * @return {none}
	 */
	function placeholderIsSupported() {
		var test = document.createElement('input');
		return ('placeholder' in test);
	}


	/**
	 * Registers all js for page and inits
	 * @return {none}
	 */
	function registerJS(){
		//we can require templates if needed

		var requires = ['Modules', 'Pages'];
		for( var i = 0; i < requires.length; i++) {
			var obj = MSCOM[requires[i]];
			for( var prop in obj){
				if(obj.hasOwnProperty(prop)){
					if(typeof obj[prop].init === 'function'){
						obj[prop].init();
					}
				}
			}
		}
	}

	/**
	 * Sets class per breakpoint
	 * @param {Number} val Window width
	 */

	function setBreakpointClass(val) {
		switch (true) {
			case (val >= 1000 && !$html.hasClass('large')):
				MSCOM.windowObj.viewport = 'large';
				$(MSCOM.windowObj).trigger('change');
				$html.addClass('large').removeClass('small medium');
				break;
			case (val <=999 && val >=600 && !$html.hasClass('medium')):
				MSCOM.windowObj.viewport = 'medium';
				$(MSCOM.windowObj).trigger('change');
				$html.addClass('medium').removeClass('small large');
				break;
			case (val > 0 && val <=599 && !$html.hasClass('small')):
				MSCOM.windowObj.viewport = 'small';
				$(MSCOM.windowObj).trigger('change');
				$html.addClass('small').removeClass('large medium');
				break;
			default:

			break;
		}
	}

	/**
	 * Returns viewport size
	 * @return {object}
	 */

	function viewport() {
		var e = window, a = 'inner';
		if (!('innerWidth' in window )) {
			a = 'client';
			e = document.documentElement || document.body;
		}
		return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
	}

	/**
	 * Sets Values for MSCOM.windowObj
	 * @return {none}
	 */

	function setValues() {
		MSCOM.windowObj.windowWid = viewport().width;
		MSCOM.windowObj.windowHT = viewport().height;
		setBreakpointClass(MSCOM.windowObj.windowWid);
	}


	/**
	 * Binds global elements
	 * @return {none}
	 */
	function binds() {

		$(window).on('resize', MSCOM.utilities.debounce(function() {
			setValues();
			fontFlexElements();
			reImg();
			checkNavigation();

		}, 250));

		$('.load-more-container').on('click', '.load-more-button a', loadMoreItems);

		$hamburger.on('click', openMenu);
		$mobileSearchTrigger.on('click', toggleSearch);
		$searchTrigger.on('click', toggleSearch);
		$menuOverlay.on('click', checkMenus);
		$mainNav.on('click', checkClick);
		$searchForm.on('submit', checkInput);
		$searchInput.on('keyup', toggleButton);
		$faLocator.on('submit', validateZip);
		$(MSCOM.windowObj).on('change', toggleMenu);
		$hero.on('click', clearTarget);

		if($smooth.length > 0 ){
			$smooth.smoothScroll();
		}
	}

	function clearTarget() {
		if($html.hasClass('touch') && MSCOM.windowObj.viewport === 'large') {
			return;
		}
	}

	function loadMoreItems(e) {
		e.preventDefault();
		var url = $(this).attr('href'),
			$parent = $(this).parent();

		$parent.before(loadingPartial);

		MSCOM.utilities.ajax(url,'GET','html', '', function(data){
			addMore(data, $parent);
		});
	}

	function addMore(data, $parent) {
		$('.loading').remove();
		$parent.before(data);
		$parent.remove();
	}

	function toggleButton() {
		if($(this).val().replace(/ /g,'') === '') {
			$searchButton.addClass('disabled').removeClass('blue');

		}else {
			$searchButton.addClass('blue').removeClass('disabled');
		}
	}

	function checkInput(e) {
		if($(this).find('button').hasClass('disabled')){
			return false;
		}
	}

	function validateZip() {
		var $input = $(this).find('input'),
				$errorMessage = $(this).find('.error-message'),
				inputVal = $input.val();


		if(inputVal.match(/^\d+$/) === null || inputVal.length < 5) {
			$(this).find('input').addClass('error');
			$errorMessage.css({'display': 'block'});
			return false;
		}
	}


	/**
	 * Opens mobile menu
	 * @param  {event} e mouse event
	 * @return {none}
	 */
	function openMenu(e) {
		$html.toggleClass('_mobile-open');
		if($html.hasClass('_search-open')) {
			toggleSearch(e);
		}
	}

	/**
	 * Checks if outside of search has been clicked
	 * @param  {event} e mouse event
	 * @return {none}
	 */
	function checkClick(e) {
		if($html.hasClass('large') && $html.hasClass('_search-open')){
			e.stopPropagation();
			toggleSearch(e);
		}
	}

	/**
	 * Toggles mobile menu if viewport changes
	 * @return {none}
	 */
	function toggleMenu() {
		if(MSCOM.windowObj.viewport === 'large' && $html.hasClass('_mobile-open')) {
			$html.toggleClass('_mobile-open');

		}
	}

	/**
	 * Toggles search open and close
	 * @param  {event} e mouse event
	 * @return {none}
	 */
	function toggleSearch(e) {
		e.stopPropagation();
		$html.toggleClass('_search-open');
		if($html.hasClass('_search-open')){
			$input.focus();
		}
	}

	/**
	 * Checks what menus are open
	 * @return {none}
	 */
	function checkMenus() {
		if($html.hasClass('_mobile-open')){
			$html.toggleClass('_mobile-open');
		}else if($html.hasClass('_search-open')){
			$html.toggleClass('_search-open');
			$searchTrigger.toggleClass('_active');
		}
	}

	/**
	 * Called in window resize bind
	 * @return {none}
	 */
    function fontFlexElements() {
    	MSCOM.utilities.tileFontFlex($tileRow);
    }

	/**
	 * Sets breakpoint on load
	 * @return {none}
	 */

	function setBreakpoint() {
		setValues();
	}

	/**
	 * adds filters for IE to responsive background images
	 * @return {none}
	 */
	function reImg() {
		MSCOM.utilities.responsiveBackground();
	}

	/**
	 * Sets the scrollbar width, 0 if no scrollbar
	 * @return {none}
	 */
	function calcScrollBarWidth(){
		MSCOM.windowObj.scrollBarWidth = MSCOM.utilities.getScrollBarWidth();
	}

	/**
	 * Adds _active class to .custom-select select dropdowns which allows custom styling
	 * @return {none}
	 */
	function activateCustomSelect(){
		if ( !$body.hasClass('ie8') && !$body.hasClass('ie9') ) {
			$('.custom-select').addClass('_active');
		}
	}

	
	 /**
     * Allow for internal list of tile rows to be updated
     */
    MSCOM.updateTileRows = function() {
        $tileRow = $('.tiles-module .row').add('.talents-carousel').add('.themetilefullwidth');
        fontFlexElements();
    };
	
	/**
	 * Inits the app
	 * @return {none}
	 */

	MSCOM.init = function(){
		calcScrollBarWidth();
		binds();
		setBreakpoint();
		initAccordion();
		registerJS();
		fontFlexElements(); // call once on page load
		reImg();
		svgIt();
		activateCustomSelect();
		checkIphoneVideo();
	};

	return MSCOM;

}(MSCOM, jQuery));


/**
 * Check if MSCOM exists. If it does, init MSCOM
 * moved from bootstrap into app
 */


if (!window.console) {
	var console = {
		log : function() {}
	};
}

function checkIphoneVideo() {
		if (navigator.userAgent.match(/(iPhone)/)) {
			
			if($(".mobile-video-none").length > 0){
               $('.mobile-video-none').css({'display': 'none'});
               }
        }
	}

$(document).ready(function(){
	if( typeof MSCOM !== undefined) {
		MSCOM.init();
	}
});
