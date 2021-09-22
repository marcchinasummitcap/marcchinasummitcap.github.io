var MSCOM = MSCOM || {};

MSCOM.Pages = MSCOM.Pages || {};

MSCOM.Pages.homepage = function () {
	var $tiles = $('.tiles-module .tile');

	// add special _mobile-hidden class so only 5 tiles show in tile grid on homepage
	function addMobileHidden(){

		if ( $('.tiles-module .load-more-container').length === 0 ) { //make sure not inside load more container

			$tiles.each( function(index){
				var $tile = $(this);
					$col = $tile.parent().parent(); //target the row container, skip .tile-wrapper

				if (index > 4) {
					$tile.addClass('_mobile-hidden');
				}

				if ( $col.find('._mobile-hidden').length === $col.find('.tile').length ) { // if all tiles inside col are hidden
					$col.addClass('_mobile-hidden');
				}

			});
		}

	}

	function init() {
		addMobileHidden();
	}

	var api = {
		'init': init
	};

	return api;
}();