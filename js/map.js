// Function to draw your map
var drawMap = function() {
    // Create map and set view
    var map = L.map('container');
    map.setView([37.8, -96], 5);
    // Create an tile layer variable using the appropriate url
    var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {maxZoom: 13});
    // Add the layer to your map
    layer.addTo(map);
    // Execute your function to get data
    getData(map);
};

// Function for getting data
var getData = function(map) {
    // Execute an AJAX request to get the data in data/response.js
    $.ajax({
        url: 'data/response.json',
        type: 'get',
        success: function(data) {
            customBuild(data, map);
        }
    })
};
// Do something creative with the data here!
var customBuild = function(data, map) {
    var markers = L.markerClusterGroup({showCoverageOnHover: false,
                                        spiderfyDistanceMultiplier: 4,
                                        maxClusterRadius:60});
    data.map(function(d) {
        var popup = d['Victim Name'] + ' was shot by an officer from ' + d['Agency Name'] + ' ' + d['Armed or Unarmed?'] + '.<br><a href="'+d['Source Link']+'" target="_blank">Read more</a>';
        var marker;
        if (d['Hit or Killed?'] == 'Killed') {
            marker = L.circleMarker(new L.LatLng(d.lat, d.lng), {color: 'red', opacity: 1});
        } else {
            marker = L.circleMarker(new L.LatLng(d.lat, d.lng), {color: 'gold', opacity: 1});
        }
        marker.bindPopup(popup);
        markers.addLayer(marker);
    });
    map.addLayer(markers);
};

