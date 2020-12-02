// Creating map object
var myMap = L.map("map", {
  center: [38.58, -121.49],
  zoom: 6
});

// Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(url, function (response) {
  getFeatures(response.features)
  console.log(response.features);
});
  
function getFeatures(data) {
  
  function radius(mag) {
    return mag * 10000;
  }
  
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h2>" + feature.properties.place + "</h2><hr><h1>Magnitude: " + feature.properties.mag + "</h1><p>" + new Date(feature.properties.time) + "</p>");
  }

  function color(mag) {
    if (mag < 1) {
      return "green"
    }
    else if (mag < 2) {
      return "lightgreen"
    }
    else if (mag < 3) {
      return "yellow"
    }
    else if (mag < 4) {
      return "orange"
    }
    else if (mag < 5) {
      return "orangered"
    }
    else {
      return "red"
    }
  }

  var earthquakes = L.geoJSON(data, {
    pointToLayer: function(data, latlng) {
      return L.circle(latlng, {
        radius: radius(data.properties.mag),
        color: color(data.properties.mag),
        fillOpacity: 0.5
      });
    },
    onEachFeature: onEachFeature
  }).addTo(myMap);

}

function getColor(d) {
  return d > 5 ? "red" :
        d > 4 ? "orangered" :
        d > 3 ? "yellow" :
        d > 2 ? "lightgreen" :
        d > 1 ? "green" :
                "lime";
}

