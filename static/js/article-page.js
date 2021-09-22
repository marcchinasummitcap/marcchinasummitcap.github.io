var MSCOM = MSCOM || {};

MSCOM.Pages = MSCOM.Pages || {};

MSCOM.Pages.articlePage = function () {


	/**
	 * Checks if whole tiles row on tiles container are threepillarbento row and adds a extra class to the container
	 *
	 */
	function detectTiles() {
		$('.page-article .article-related-content .tiles-container').each(function() {
            var $container = $(this),
                invalidBentoBox;

            invalidBentoBox  = $container.children().toArray().some(
                function (element) {
                    var check1 = $(element).hasClass('row-base') && !$(element).hasClass('threepillarbento');
                    var sqlWrapperTile = $container.find( ".threepillarbento .sq1x2-wrapper" );
                    var check2 = sqlWrapperTile && sqlWrapperTile.length > 0;
					return check1 || check2;
                }
            );

            if (!invalidBentoBox) $container.addClass('threepillarbento-container');
        })
	}

	/**
	 * Bind print
	 * @return {none}
	 */
	function printBinds() {
		var KEY = 'printThisPage';

		if (!window.print) { return null; }

		if (MSCOM.utilities.getParameterByName(KEY) === 'true') {
			window.print();
		}
		if (window.print) {
			
			$("body").delegate('[class*=icon-print]', 'click', function () {
				var article = $(this).data('href'),
					iframe;

				if (article && $('.article').length > 1) {
					article += '?' + KEY + '=true';
					iframe = '<iframe id="print-page" name="print-page" style="display: none"  src="'+ article +'"></iframe>';
					
					$('iframe#print-page').remove();
					$('body').append(iframe);
				} else {
					window.print();
				}

			});

		} else {
			$('body').addClass('no-print');
		}

	}

    /**
     * Binds function
     */
    function binds() {
        printBinds();
        detectTiles();
        $(window).on('infinite-scroll:article-added', detectTiles);
    }

	function init() {
		binds();

		var videoPlayed = true;
		$('.togglePlay').on("click", function () {
			if (videoPlayed == false) {
				videojs.players.myPlayerID.play();
				$(this).find("span").addClass("pause-video");
				$(this).find("span").removeClass("play-video");
				$(this).attr("aria-label", "Pause");
				videoPlayed = true;
			}
			else {
				videojs.players.myPlayerID.pause();
				$(this).find("span").addClass("play-video");
				$(this).find("span").removeClass("pause-video");
				$(this).attr("aria-label", "Play");
				videoPlayed = false;
			}
		});

	}


	return { 'init': init };
}();
// Hero start firefox