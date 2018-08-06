(function() {
    var center = {lat: 50.431399, lng: 30.472858};
    var map = new google.maps.Map(document.querySelector('#map'), {
        scrollwheel: false,
        mapTypeControl: false,
        streetViewControl: false,
        center: {lat: center.lat - 0.00021, lng: center.lng + 0.0003},
        gestureHandling: 'cooperative',
        scaleControl: false,
        panControl: false,
        zoomControl: true,
        zoom: 18,
        panControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        streetViewControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            {"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#2D333C"}]},
            {"stylers": [
                {"hue": "#ff1a00"},
                {"invert_lightness": true},
                {"saturation": -100},
                {"lightness": 33},
                {"gamma": 0.5}
            ]}
        ]
    });

    var marker = new google.maps.Marker({
        position: center,
        map: map,
        icon: '/images/clock-pointer.png'
    });
})();