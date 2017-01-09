if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    $("#data").html("latitude: " + position.coords.latitude + "<br>longitude: " + position.coords.longitude);

  var lat = position.coords.latitude;
  var lon = position.coords.longitude;

  var url = "https://api.forecast.io/forecast/7834509dda67359b2ad83a6869d08958/" + lat + "," + lon;

    $.ajax({
        url: "https://maps.googleapis.com/maps/api/geocode/json",
        datatype: "jsonp",
        data: {
          key: "AIzaSyD-rEfh-YG8t5l3aQpL3Y78FccNZi6e8KU",
          latlng: position.coords.latitude + "," + position.coords.longitude
        },
        success: function(json) {
          $("#location").html("<h3>" + json.results[0].address_components[2].long_name + ", " + json.results[0].address_components[4].long_name + "</h3>");
        },
      });

    $(".unit").on("click", function() {
  if ($(this).attr("id") == "celsiusSymbol") {
    $("#fahrenheitSymbol").removeClass("active");
    $("#fahrenheitSymbol").addClass("inactive");
    $("#celsiusSymbol").removeClass("inactive");
    $("#celsiusSymbol").addClass("active");
    $("#tempValue").html($("#temperature").attr("celsius"));
  } else if ($(this).attr("id") == "fahrenheitSymbol") {
    $("#celsiusSymbol").removeClass("active");
    $("#celsiusSymbol").addClass("inactive");
    $("#fahrenheitSymbol").removeClass("inactive");
    $("#fahrenheitSymbol").addClass("active");
    $("#tempValue").html($("#temperature").attr("fahrenheit"));
  }
});

    $.ajax({
      url: url,
      dataType: 'jsonp',
      success: function(currentWeather) {
            var weatherDescription = currentWeather.currently.summary;
            var weatherIcon = getIcon(currentWeather.currently.icon);
            var tempF = Math.round(currentWeather.currently.temperature);
            var tempC = Math.round((currentWeather.currently.temperature - 32) * (5 / 9));


            $("#temperature").attr("fahrenheit", tempF);
            $("#temperature").attr("celsius", tempC);
            $("#tempValue").html(tempF);
            $("#conditions").html("<h3>" + weatherDescription + "</h3>");
            $("#condition-img").html("<h3><i class=\"wi " + weatherIcon + "\"></i></h3>");
      }
    });
  });
}

function getIcon(iconID) {
  var iconName;
  switch (iconID) {
    case "clear-day":
      iconName = "wi-day-sunny";
      break;
    case "clear-night":
      iconName = "wi-night-clear";
    case "rain":
      iconName = "wi-rain";
      break;
    case "snow":
      iconName = "wi-snow";
      break;
    case "sleet":
      iconName = "wi-sleet";
      break;
    case "wind":
      iconName = "wi-windy";
      break;
    case "fog":
      iconName = "wi-fog";
      break;
    case "cloudy":
      iconName = "wi-day-cloudy";
      break;
    case "partly-cloudy-day":
      iconName = "wi-day-cloudy";
      break;
    case "partly-cloudy-night":
      iconName = "wi-night-cloudy";
      break;
  }

  return iconName;
}


/*
use secure connection => wont work on http, must be https
Get geolocation coords => navigator call from Freecodecamp previous challenge
Use goelocation coords to input into google maps API and return name of location => ajax call
Display Name of location
Input coords in API call => Darksky.io
Receive weather data
Use weather icons from https://erikflowers.github.io/weather-icons/
Input into css file
Display CSS icons according to weather data (Case / break)
JQuery for fahrenheit and celsius toggling

*/
