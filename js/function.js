var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }
};

function isLgWidth() { return $(window).width() >= TempApp.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < TempApp.smWidth; } // < 768
function isIOS() { return TempApp.iOS(); } // for iPhone iPad iPod

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
	    $('.js_full_height').css({
	        minHeight: ($(window).height() - 80) + 'px'
	    });
	    $('.login').css({
	        minHeight: $(window).height()
	    });
	}
	setDivHeight(); // устанавливаем высоту окна при первой загрузке страницы
	$(window).resize(function() { 
		setDivHeight()  // обновляем при изменении размеров окна
		// showMenuArrow();
	});


	// Reset link whte attribute href="#"
	$('[href*="#"]').click(function(event) {
		event.preventDefault();
	});


	// Navbar for mobile
	$('.navbar').slick({
		infinite: false,
		slidesToShow: 8,
		slidesToScroll: 1,
		variableWidth: true,
		prevArrow: $('.navbar__arrow_prev'),
		nextArrow: $('.navbar__arrow_next')
	});

	// Mini menu
	$('.mini__menu_toggle:not(.menu-close)').on('click', function(event) {
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

	$('.mini__menu_toggle.menu-close').on('click', function(event) {
		event.preventDefault();
		var item = $(this).closest('.mini__menu_item');
		$('.mini__menu_item').not(item).css('marginLeft', '0').removeClass('active');
		$('.mini__menu_item:nth-child(n+3)').slideToggle(300);
	});

	$(document).mouseup(function (e){
		var div = $('.mini__menu_item');
		if (!div.is(e.target)
		    && div.has(e.target).length === 0) {
      		div.css('marginLeft', '0').removeClass('active');
		}
	});

	// Left box
	$('.left__content_toggle').on('click', function() {
		var box = $(this).closest('.left__content'),
			boxWidth = box.width() + 42;

		if (box.hasClass('left__content_hide')) {
			box.removeClass('left__content_hide');
			// box.css('marginLeft', 0);
		} else {
			box.addClass('left__content_hide');
			// box.css('marginLeft', -(boxWidth));
		}
	});

	// Scroll to ID // Плавный скролл к элементу при нажатии на ссылку. В ссылке указываем ID элемента
	// $('#main__menu a[href^="#"]').click( function(){ 
	// 	var scroll_el = $(this).attr('href'); 
	// 	if ($(scroll_el).length != 0) {
	// 	$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500);
	// 	}
	// 	return false;
	// });

	// Stiky menu // Липкое меню. При прокрутке к элементу #header добавляется класс .stiky который и стилизуем
    // $(document).ready(function(){
    //     var HeaderTop = $('#header').offset().top;
        
    //     $(window).scroll(function(){
    //             if( $(window).scrollTop() > HeaderTop ) {
    //                     $('#header').addClass('stiky');
    //             } else {
    //                     $('#header').removeClass('stiky');
    //             }
    //     });
    // });

});

