function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 43.835571,
      lng: 25.965654
    },
    zoom: 13,
    mapTypeId: 'roadmap'
  });

  var input = document.getElementById('address');
  var searchBox = new google.maps.places.SearchBox(input);
  var icon = {
    url: "images/marker.png",
    size: new google.maps.Size(30, 50),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(17, 34),
    scaledSize: new google.maps.Size(30, 50)
  };
  var geocoder= new google.maps.Geocoder();
  var markers = [];
  var markerTitle;

  map.addListener('bounds_changed', function () {
    searchBox.setBounds(map.getBounds());
  });

  google.maps.event.addListener(map, 'click', function(event) {
    geocoder.geocode({
      'latLng': event.latLng
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          markerTitle = results[0].formatted_address;
          input.value = results[0].formatted_address;
        } else {
          markerTitle = "Unknown address";
        }
      }
    });

    addMarker(map, event.latLng, icon, markerTitle);
  });

  searchBox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    
    clearOutOldMarkers();

    markers = [];

    var bounds = new google.maps.LatLngBounds();
    places.forEach(function (place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }

      addMarker(map, place.geometry.location, icon, place.name);

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });

  function addMarker(map, location, icon, title) {
    clearOutOldMarkers();

    markers.push(new google.maps.Marker({
      map: map,
      position: location,
      icon: icon,
      title: title
    }));
  }

  function clearOutOldMarkers() {
    markers.forEach(function (marker) {
      marker.setMap(null);
    });
  }
}