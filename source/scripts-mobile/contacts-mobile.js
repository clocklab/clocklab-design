// //=include ./components/menu.js

//  //=include ./components/open-form.js

(function() {
    // ----- google map -----
    function initialize() {
                
        // ----- определяем настройки отображения карты -----
        var settings = {
            center: new google.maps.LatLng(50.431399, 30.472858),
            streetViewControl: false,
            mapTypeControl: false,
            scaleControl: false,
            scrollwheel: false,
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
        };

        // ----- определяем карту -----
        var map = new google.maps.Map(document.getElementById("map"), settings);

            // ----- инициализируем карту ---
            setMarkers(map, pointer);
    }  

    function setMarkers(map, locations) {

        // ----- определяем область показа маркеров -----
        var latlngbounds = new google.maps.LatLngBounds();  
        var image = new google.maps.MarkerImage('/images/clock-pointer.png',
                    new google.maps.Size(46, 62),      
                    new google.maps.Point(0, 0)); 
        
        for (var i = 0; i < pointer.length; i++) {
            var myLatLng = new google.maps.LatLng(locations[i][1], locations[i][2]);

            latlngbounds.extend(myLatLng);

            // ----- определяем настройки маркера -----
            var marker = new google.maps.Marker({
                title: locations[i][0],
                position: myLatLng,
                icon: image,
                map: map
            }); 
        }

        // ----- центрируем и масштабируем карту =====
        map.setCenter(latlngbounds.getCenter());     
    };

    // ----- определяем места на карте -----
    var pointer = [['pointer', 50.431399, 30.472858]];

    initialize();
})();