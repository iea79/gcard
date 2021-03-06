var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= TempApp.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < TempApp.smWidth; } // < 768
function isIOS() { return TempApp.iOS(); } // for iPhone iPad iPod
function isTouch() { return TempApp.touchDevice(); } // for touch device

$(document).ready(function() {

    // Хак для фокуса на ссылке на iOS
    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }

    if (isIOS()) {
    } else {
    }

	if ('flex' in document.documentElement.style) {
		// Хак для UCBrowser
		if (navigator.userAgent.search(/UCBrowser/) > -1) {
			document.documentElement.setAttribute('data-browser', 'not-flex');
		} else {		
		    // Flexbox-совместимый браузер.
			document.documentElement.setAttribute('data-browser', 'flexible');
		}
	} else {
	    // Браузер без поддержки Flexbox, в том числе IE 9/10.
		document.documentElement.setAttribute('data-browser', 'not-flex');
	}

	$("select").select2({
		minimumResultsForSearch: 10
	});


	// First screen full height
	function setDivHeight() {
		if (isXsWidth()) {
			var headerHeight = 50
		} else {
			var headerHeight = 80
		}
	    $('.js_full_height').css({
	        height: ($(window).height() - headerHeight) + 'px'
	    });
	    $('.login').css({
	        minHeight: $(window).height()
	    });
	}
	setDivHeight(); // устанавливаем высоту окна при первой загрузке страницы
	$(window).resize(function() { 
		setDivHeight();  // обновляем при изменении размеров окна
		mapResize();
	});


	// Reset link whte attribute href="#"
	$('[href*="#"], a[class*="icon-"]').click(function(event) {
		event.preventDefault();
	});

	$('.navbar__link').each(function(index, el) {
		if ($(this).attr('href') == location.pathname) {
			$(this).closest('.navbar__item').addClass('active');
		}
	});

	$('.header__mobile_toggle').on('click', function(event) {
		event.preventDefault();
		$('.header__mobile_menu').toggleClass('open');
	});

	if (isTouch()) {
		$(".header__mobile_menu").swipe( {
			swipeLeft:function(event, direction) {
				$(this).removeClass('open');
			}
		});
	}

	// Mini menu
	$('.mini__menu_toggle').on('mouseenter', function(event) {
		event.preventDefault();
		var item = $(this).closest('.mini__menu_item'),
			drop = item.find('.mini__menu_drop').width(),
			itemWidth = (drop+15);

		$('.mini__menu_item').not(item).css('marginLeft', '0').removeClass('active');
		item.toggleClass('active');

		if (item.hasClass('active')) {		
			item.css('marginLeft', -(itemWidth));
		} else {
			item.css('marginLeft', '0').removeClass('active');
		}
	});

	$('.mini__menu').on('mouseleave', function(event) {
		event.preventDefault();
		$('.mini__menu_item').css('marginLeft', '0').removeClass('active');
	});

	$('.mini__menu_toggle.menu-close').on('click', function(event) {
		event.preventDefault();
		var item = $(this).closest('.mini__menu_item');
		$('.mini__menu_item').not(item).css('marginLeft', '0').removeClass('active');
		$('.mini__menu_item:nth-child(n+3)').slideToggle(300);
	});

	// Left box
	$('.left__content_toggle').on('click', function() {
		var box = $(this).closest('.left__content'),
			boxWidth = box.width() + 42;

		if (box.hasClass('left__content_hide')) {
			box.removeClass('left__content_hide');
		} else {
			box.addClass('left__content_hide');
		}
		mapResize();
	});

	if (isTouch()) {
		$(".left__content").swipe( {
			swipeLeft:function(event, direction) {
				$(this).addClass('left__content_hide');
				mapResize();
			},
			swipeRight:function(event, direction) {
				$(this).removeClass('left__content_hide');
				mapResize();
			}
		});
	}

	if (isXsWidth()||isSmWidth()) {
		$('.left__content').addClass('left__content_hide');
	};

    $('.js-draggable').draggable({
        // containment: ".main__content"
    });

    $('body').on('click touchend', '.content__box .icon-close', function(event) {
    	event.preventDefault();
    	$(this).closest('.content__box').hide();
    });

    $('body').on('click touchend', '.content__box .icon-minus', function(event) {
    	event.preventDefault();
    	$(this).closest('.content__box_head').toggleClass('collapsed');
    	$(this).closest('.content__box_head').next('.content__box_slide_wrap').slideToggle();
    });

    $('body').on('click', '[data-content-show]', function(event) {
    	event.preventDefault();
    	var id = $(this).data('contentShow');
    	$('#'+id).show();
    	setContentBoxPosition($('#'+id));
		boxDraggable($('#'+id));
    });

    $('body').on('click', '[data-content-full-show]', function(event) {
    	event.preventDefault();
    	var id = $(this).data('contentFullShow');
    	$('#'+id).show();
    	setContentBoxPosition($('#'+id));
		// boxDraggableMainContent($('#'+id));
		heightResize();
    });

    $('body').on('click', '.content__box_min', function() {
    	$('.content__box').not(this).removeClass('selected');
    	$(this).addClass('selected');
    });

    $('.js-scrollbar').scrollbar();

    $('.datetime').datetimepicker({
        // locale: 'ru',
        format: 'DD.MM.YYYY HH:mm',
        useCurrent: false,
        focusOnShow: false,
        ignoreReadonly: true,
        allowInputToggle: true,
        useCurrent: false,
        // debug: true
    });

    $('.timepicker').datetimepicker({
        // locale: 'ru',
        format: 'HH:mm',
        useCurrent: false,
        focusOnShow: false,
        ignoreReadonly: true,
        allowInputToggle: true,
        useCurrent: false,
        // debug: true
    });


    $( '.track__slide' ).slider({
		range: "min",
		min: 1,
		max: 10,
		value: 1,
		slide: function( event, ui ) {
			$('.ui-slider-bage').html( ui.value );
		}
    });
	$('.ui-slider-handle').append('<span class="ui-slider-bage" />')
    $('.ui-slider-bage').html($('.track__slide').slider('value'));

    filleUpload();

    $('[data-toggle="modal"]').on('click', function (e) {
	    e.preventDefault();
	    e.stopPropagation();
	    var target = $(this).data('target');
	    $(target).modal('show');
   	})

});

function heightResize() {
	var contentHeight = $('.main__content').height();
	var elHeight = 0;
	$('.main__content > div').each(function() {
		thisHeight = $(this).height();
		if (elHeight<thisHeight) {
			elHeight=thisHeight;
		}
	});
	// console.log(elHeight)
	if ($('.main__content').height() != elHeight) {
		$('.map_box').height(elHeight);
		mapResize();
	}
}

function boxDraggable(el) {
    el.draggable({
        // containment: "body"
    });
}

function boxDraggableMainContent(el) {
    el.draggable({
        containment: ".main__content"
    });
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setContentBoxPosition(el) {
	el.offset(function(i, coord){
	    var  newCoord = [];
	    if (el.is('[data-content-show]')) {
		    if (isXsWidth()) {    	
			    var coord = $('.wrapper').offset();
			    newCoord.top = coord.top;
			    newCoord.left = coord.left;
		    } else {
			    var coord = $('.main__content').offset();
			    newCoord.top = coord.top + getRandomInt(10, 100);
			    newCoord.left = coord.left + getRandomInt(10, 100);	    	
		    }	    	
	    } else {
		    if (isXsWidth()) {    	
			    var coord = $('.wrapper').offset();
			    newCoord.top = coord.top + 50;
			    newCoord.left = coord.left;
		    } else {
				var coord = $('.main__content').offset();
				newCoord.top = coord.top + 5;
				newCoord.left = coord.left + 35;	    	
		    }
	    }
	    return newCoord;
	    newCoord = null;
	});
}

function filleUpload() {
    var wrapper = $( ".file_upload" ),
        inp = wrapper.find( "input" ),
        btn = wrapper.find( "button" ),
        lbl = wrapper.find( "div" );
    btn.focus(function(){
        inp.focus()
    });
    // Crutches for the :focus style:
    inp.focus(function(){
        wrapper.addClass( "focus" );
    }).blur(function(){
        wrapper.removeClass( "focus" );
    });
    // Yep, it works!
    btn.add( lbl ).click(function(){
        inp.click();
    });   
    // Crutches for the :focus style:
    btn.focus(function(){
        wrapper.addClass( "focus" );
    }).blur(function(){
        wrapper.removeClass( "focus" );
    });
    var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;

    inp.change(function(){
        var file_name;
        if( file_api && inp[ 0 ].files[ 0 ] )
            file_name = inp[ 0 ].files[ 0 ].name;
        else
            file_name = inp.val().replace( "C:\\fakepath\\", '' );

        if( ! file_name.length )
            return;

        if( lbl.is( ":visible" ) ){
            lbl.text( file_name );
            btn.text( "Выбрать" );
        }else
            btn.text( file_name );
    }).change();
}
