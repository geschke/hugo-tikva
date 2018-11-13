/**
 * Theme functions file
 *
 * Contains handlers for navigation, accessibility, header sizing
 * footer widgets and Featured Content slider
 *
 */
( function( $ ) {
	var body    = $( 'body' );
		//_window = $( window );


	var mediaSize = '';
	var azbalacHeaderImageClassPos = '';

	$.moveHeader = function(moveAbove) {
		// if title and subtitle is placed as overlay of the header image, 
		// move this above the header image
		var headerImage = $('#site-header-container-overlay');
		if (! headerImage.length) {
			return false;
		}

		if (azbalacHeaderImageClassPos == '' ) { // only check once when page is loaded
			if (headerImage.hasClass('fixed-top')) { // store for later usage
				azbalacHeaderImageClassPos = 'fixed-top';
				
			} else if (headerImage.hasClass('fixed-bottom')) {
				azbalacHeaderImageClassPos = 'fixed-bottom';
			}
		}
		if (moveAbove == true) {

			headerImage.appendTo($('#site-header-container-above')).removeClass('position-absolute');
		
			headerImage.removeClass(azbalacHeaderImageClassPos);
			$('#site-header-container-overlay').addClass('col');
			if (typeof azbalacSettingHeaderColor != 'undefined' && typeof azbalacSettingHeaderColor.bg != 'undefined') {
				$('#site-header-box-title').css('background', azbalacSettingHeaderColor.bg);
				$('#site-header-box-subtitle').css('background', azbalacSettingHeaderColor.bg);
				$('#site-header-container-overlay').css('left','0px').css('top','0px').css('right', '0px').css('bottom','0px');
				$('#site-header-text a').css('background', azbalacSettingHeaderColor.bg);
				$('#site-description').css('background', azbalacSettingHeaderColor.bg);		
			} 
		} 
		else {
			headerImage.appendTo($('#site-header-above')).addClass('position-absolute');
			headerImage.addClass(azbalacHeaderImageClassPos);
			$('#site-header-container-overlay').removeClass('col');
			if (typeof azbalacSettingHeaderColor != 'undefined' && typeof azbalacSettingHeaderColor.bg != 'undefined') {
				$('#site-header-box-title').css('background', '');
				$('#site-header-box-subtitle').css('background', '');
				$('#site-header-container-overlay').css('left','').css('top','').css('right', '').css('bottom','');
				
				$('#site-header-text a').css('background','');
				$('#site-description').css('background', '');		
			} 
		}


	}

    $.getHeaderImage = function(index, fallback) {
        var siteHeaderImage = '';
        var width = 0;
        var height = 0;
        var dontscale = 0;
        if (typeof azbalacHeaderImage[index].url != 'undefined') {
            siteHeaderImage = azbalacHeaderImage[index].url;
            height = azbalacHeaderImage[index].height;
            width = azbalacHeaderImage[index].width;
            dontscale = azbalacHeaderImage[index].dontscale;
        } else if (typeof azbalacHeaderImage[fallback].url != 'undefined') {
            siteHeaderImage  = azbalacHeaderImage[fallback].url;
            height = azbalacHeaderImage[fallback].height;
            width = azbalacHeaderImage[fallback].width;
            dontscale = azbalacHeaderImage[fallback].dontscale;
        }
        return { image: siteHeaderImage,
            width: width,
            height: height,
            dontscale: dontscale};
	}
	
	
    $.headerImageResize = function(mediaSize) {
        if (! $('#site-header-image').length) {
            return false;
        }
        var siteHeaderImage =  $('#site-header-image');
        var width, height;

		
        var newWidth = 0, newHeight = 0;
        var imgData = {};
        if (mediaSize == 'xs') {
            newWidth = $('#main').width() -30; 
			imgData = $.getHeaderImage(3,0);
			$.moveHeader(true);
            //newWidth = 244;
        } else if (mediaSize == 'sm') {
            imgData = $.getHeaderImage(2,0);
			newWidth = 510;
			$.moveHeader(true);
        } else if (mediaSize == 'md') {
            imgData = $.getHeaderImage(1,0);
			newWidth = 690;
			$.moveHeader(false);
        } else if (mediaSize == 'lg') { // lg
            imgData = $.getHeaderImage(0,0);
			newWidth = 930;
			$.moveHeader(false);
		} else { // xl
            imgData = $.getHeaderImage(0,0);
			newWidth = 1110;
			$.moveHeader(false);
		}
		
		
        if (imgData.image != '') {
            $('#site-header-above').show();


            siteHeaderImage.attr('src', imgData.image);

            if (imgData.dontscale == 1) {
                newWidth = imgData.width;
                newHeight = imgData.height;
            } else {
                var ratio = imgData.width / imgData.height;
                newHeight = Math.round(newWidth / ratio);
            }
            siteHeaderImage.attr('width', newWidth);
            siteHeaderImage.attr('height', newHeight);
            siteHeaderImage.attr('data-width', newWidth);
            siteHeaderImage.attr('data-height', newHeight);


        } else {

                $('#site-header-above').hide();

        }
    };

    $.checkMediaSize = function( ) {
		var elementSize = $('#media-width-detection-element').width();
		if (elementSize < 540) {
			mediaDetectSize = 'xs';
		} else if (elementSize >= 540 && elementSize < 720) { 
            mediaDetectSize = 'sm';
        } else if (elementSize >= 720 && elementSize < 960) { 
            mediaDetectSize = 'md';
        } else if (elementSize >= 960 && elementSize < 1140) { 
            mediaDetectSize = 'lg';
        } else { // >= 1200
            mediaDetectSize = 'xl';
		}
        if (mediaDetectSize != mediaSize || mediaDetectSize == 'xs') {
            mediaSize = mediaDetectSize;
            $.headerImageResize(mediaSize);
		}

    };
	

    $( window).resize(function () {
        if (! $('#site-header-image').length) {
            return false;
        }
        $.checkMediaSize();
    });


	
	$( function() {
		// Search toggle.
		$( '.search-toggle' ).on( 'click.azbalac', function( event ) {
			var that    = $( this ),
				wrapper = $( '.search-box-wrapper' );

			that.toggleClass( 'active' );
			wrapper.toggleClass( 'hide' );

			if ( that.is( '.active' ) || $( '.search-toggle .screen-reader-text' )[0] === event.target ) {
				wrapper.find( '.search-field' ).focus();
			}
		} );



	} );

    $(window).on('load', function() {

        if (!$('#site-header-image').length) {
            return;
        }
        $.checkMediaSize();
	});

	

$( ".innersocial" ).hover(
  function() {
     
    $( this ).parent().find('.innersocialbg').addClass('socialhover');
  }, function() {
     
       $( this ).parent().find('.innersocialbg').removeClass('socialhover');
   
  }
);
 
/* Bootstrap 4 Responsive Navbar with Multi level Dropdowns
  see https://github.com/bootstrapthemesco/bootstrap-4-multi-dropdown-navbar */

$( '.dropdown-menu a.dropdown-toggle' ).on( 'click', function ( e ) {
	var $el = $( this );
	var $parent = $( this ).offsetParent( ".dropdown-menu" );
	if ( !$( this ).next().hasClass( 'show' ) ) {
		$( this ).parents( '.dropdown-menu' ).first().find( '.show' ).removeClass( "show" );
	}
	var $subMenu = $( this ).next( ".dropdown-menu" );
	$subMenu.toggleClass( 'show' );
	
	$( this ).parent( "li" ).toggleClass( 'show' );

	$( this ).parents( 'li.nav-item.dropdown.show' ).on( 'hidden.bs.dropdown', function ( e ) {
		$( '.dropdown-menu .show' ).removeClass( "show" );
	} );
	
	 if ( !$parent.parent().hasClass( 'navbar-nav' ) ) {
		$el.next().css( { "top": $el[0].offsetTop, "left": $parent.outerWidth() - 4 } );
	}

	return false;
} );


$(window).on('load', function() {
var elementSize = $('#main').width();
if (elementSize < 540) {
	mediaDetectSize = 'xs';
} else if (elementSize >= 540 && elementSize < 720) { 
	mediaDetectSize = 'sm';
} else if (elementSize >= 720 && elementSize < 960) { 
	mediaDetectSize = 'md';
} else if (elementSize >= 960 && elementSize < 1140) { 
	mediaDetectSize = 'lg';
} else { // >= 1200
	mediaDetectSize = 'xl';
}
});

 
} )( jQuery );

