var map;
function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(-25.363,131.044),
		zoom: 4,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map"),
	mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);

function mapResize() {
	setTimeout(function() {
		var center = map.getCenter();
		$('#map').css({
			height: $('.main__content').height(),
			width: $('.main__content').width()
		});
		google.maps.event.trigger(map, "resize");
		map.setCenter(center);
	}, 500);
}
