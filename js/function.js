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
		setDivHeight()  // обновляем при изменении размеров окна
		// showMenuArrow();
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

	// Navbar for mobile
	// $('.navbar').slick({
	// 	infinite: false,
	// 	slidesToShow: 8,
	// 	slidesToScroll: 1,
	// 	variableWidth: true,
	// 	prevArrow: $('.navbar__arrow_prev'),
	// 	nextArrow: $('.navbar__arrow_next')
	// });

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
			// box.css('marginLeft', 0);
		} else {
			box.addClass('left__content_hide');
			// box.css('marginLeft', -(boxWidth));
		}
	});

    $('.js-draggable').draggable({
        containment: ".main__content"
    });

    $('body').on('click', '.content__box .icon-close', function(event) {
    	event.preventDefault();
    	$(this).closest('.content__box').hide();
    });

    $('body').on('click', '[data-content-show]', function(event) {
    	event.preventDefault();
    	var id = $(this).data('contentShow');
    	$('#'+id).show();
    	setContentBoxPosition($('#'+id));
    	boxDraggable($('#'+id));
    });

    $('body').on('click', '.content__box', function() {
    	$('.content__box').not(this).removeClass('selected');
    	$(this).addClass('selected');
    });


});

function boxDraggable(el) {
    el.draggable({
        containment: ".main__content"
    });
}

function initMap() {
	var uluru = {lat: -25.363, lng: 131.044};
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 4,
		center: uluru
	});
	var marker = new google.maps.Marker({
		position: uluru,
		map: map
	});
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setContentBoxPosition(el) {
	el.offset(function(i, coord){
	    var  newCoord = {};
	    newCoord.top = coord.top + getRandomInt(10, 100);
	    newCoord.left = coord.left + getRandomInt(10, 100);
	    return newCoord;
	    newCoord = null;
	});
}

// function createUnit(unit, isVisible) {
// 	var miniWindow = '';
//     if (!$('.content__box_min').length) {
//         miniWindow =
//           '<div class="content__box content__box_min js-draggable">'
//             '<div class="content__box_head">Ford Focus III У 744 РС 777<i class="icon-close"></i></div>'
//             '<div class="content__box_body">'
//               '<div class="content__box_map"><img src="img/map-min.jpg" alt=""/></div>'
//               '<ul class="content__box_list">'
//                 '<li class="content__box_list-item">'
//                   '<div class="content__box_list-name">Назначен:</div>'
//                   '<div class="content__box_list-descr">17.07.2017 - 13:10:33</div>'
//                 '</li>'
//                 '<li class="content__box_list-item">'
//                   '<div class="content__box_list-name">Скорость:</div>'
//                   '<div class="content__box_list-descr">94</div>'
//                 '</li>'
//                 '<li class="content__box_list-item">'
//                   '<div class="content__box_list-name">Телефон:</div>'
//                   '<div class="content__box_list-descr">+79217391056</div>'
//                 '</li>'
//                 '<li class="content__box_list-item">'
//                   '<div class="content__box_list-name">Позиция:</div>'
//                   '<div class="content__box_list-descr">Савинское сельское поселение, РФ</div>'
//                 '</li>'
//               '</ul>'
//               '<ul class="content__box_list">'
//                 '<li class="content__box_list-item">'
//                   '<div class="content__box_list-name">Моточасы:</div>'
//                   '<div class="content__box_list-descr">23</div>'
//                 '</li>'
//                 '<li class="content__box_list-item">'
//                   '<div class="content__box_list-name">Пробег:</div>'
//                   '<div class="content__box_list-descr">219342.95</div>'
//                 '</li>'
//               '</ul>'
//               '<div class="content__box_chart"><img src="img/chart-min.jpg" alt=""/></div>'
//             '</div>'
//           '</div>'
//         ;
//     }
//     var html = '<ul class="within_accordion upd" style="display: '+ (isVisible ? 'block' : 'none') +';">' +
// 		'<li unit_id="'+ unit.id +'" class="unit_item">' +
//             '<img class="unit_watch mCS_img_loaded" src="/img/' + getTheme() + '/within_accordion_icon.png" alt="Следить">' +
//             '<img class="car_icon mCS_img_loaded" src="'+ (unit.unit_icon ? '/img/libauto/' + unit.unit_icon : '/img/car_icon.png' )+'" alt="Сменить иконку">' +
//             '<span>'+ unit.name +'</span>' +
//             '<div>' +
//                 '<a href="#"><img src="/img/' + getTheme() + '/signal_icon.png" alt="" class="mCS_img_loaded signal"></a> ' +
//                 '<a class="track_last_day" title="Трек за последние сутки" href="#"> ' +
//                     '<img src="/img/' + getTheme() + '/road_icon.png" alt="Трек за последние сутки" class="mCS_img_loaded">' +
//                 '</a> ' +
//                 '<a href="#"><img class="unit_movement" src="/img/' + getTheme() + '/stop_icon.png" alt="" class="mCS_img_loaded"></a> ' +
//                 miniWindow +
//                 '<a href="#" class="send_cmd"><img src="/img/' + getTheme() + '/message_icon.png" alt="" class="mCS_img_loaded"></a> ' +
//             '</div>' +
// 		'</li>' +
// 		'</ul>';

// 	return html;
// }
