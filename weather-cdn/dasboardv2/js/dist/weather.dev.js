"use strict";

var timeEl = document.getElementById('time');
var dateEl = document.getElementById('date');
var currentWeatherItemsEl = document.getElementById('current-weather-items');
var timezone = document.getElementById('time-zone');
var countryEl = document.getElementById('country');
var weatherForecastEl = document.getElementById('weather-forecast');
var currentTempEl = document.getElementById('current-temp');
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var API_KEY = '4204780fcaa3690fd351b3431df25a13';
setInterval(function () {
  var time = new Date();
  var month = time.getMonth();
  var date = time.getDate();
  var day = time.getDay();
  var hour = time.getHours();
  var hoursIn12HrFormat = hour >= 13 ? hour % 24 : hour;
  var minutes = time.getMinutes();
  var ampm = hour >= 24 ? 'AM' : 'PM';
  timeEl.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + "<span id=\"am-pm\">".concat(ampm, "</span>");
  dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month];
}, 1000);
getWeatherData();

function getWeatherData() {
  navigator.geolocation.getCurrentPosition(function (success) {
    var _success$coords = success.coords,
        latitude = _success$coords.latitude,
        longitude = _success$coords.longitude;
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=".concat(latitude, "&lon=").concat(longitude, "&exclude=hourly,minutely&units=metric&appid=").concat(API_KEY)).then(function (res) {
      return res.json();
    }).then(function (data) {
      console.log(data);
      showWeatherData(data);
    });
  });
}

function showWeatherData(data) {
  var _data$current = data.current,
      humidity = _data$current.humidity,
      pressure = _data$current.pressure,
      sunrise = _data$current.sunrise,
      sunset = _data$current.sunset,
      wind_speed = _data$current.wind_speed;
  timezone.innerHTML = data.timezone;
  countryEl.innerHTML = data.lat + 'N ' + data.lon + 'E';
  currentWeatherItemsEl.innerHTML = "<div class=\"weather-item\">\n        <div>Humidity</div>\n        <div>".concat(humidity, "%</div>\n    </div>\n    <div class=\"weather-item\">\n        <div>Pressure</div>\n        <div>").concat(pressure, "</div>\n    </div>\n    <div class=\"weather-item\">\n        <div>Wind Speed</div>\n        <div>").concat(wind_speed, "</div>\n    </div>\n\n    <div class=\"weather-item\">\n        <div>Sunrise</div>\n        <div>").concat(window.moment(sunrise * 1000).format('HH:mm a'), "</div>\n    </div>\n    <div class=\"weather-item\">\n        <div>Sunset</div>\n        <div>").concat(window.moment(sunset * 1000).format('HH:mm a'), "</div>\n    </div>\n    \n    \n    ");
  var otherDayForcast = '';
  data.daily.forEach(function (day, idx) {
    if (idx == 0) {
      currentTempEl.innerHTML = "\n            <img src=\"http://openweathermap.org/img/wn//".concat(day.weather[0].icon, "@4x.png\" alt=\"weather icon\" class=\"w-icon\">\n            <div class=\"other\">\n                <div class=\"day\">").concat(window.moment(day.dt * 1000).format('dddd'), "</div>\n                <div class=\"temp\">Night - ").concat(day.temp.night, "&#176;C</div>\n                <div class=\"temp\">Day - ").concat(day.temp.day, "&#176;C</div>\n            </div>\n            \n            ");
    } else {
      otherDayForcast += "\n            <div class=\"weather-forecast-item\">\n                <div class=\"day\">".concat(window.moment(day.dt * 1000).format('ddd'), "</div>\n                <img src=\"http://openweathermap.org/img/wn/").concat(day.weather[0].icon, "@2x.png\" alt=\"weather icon\" class=\"w-icon\">\n                <div class=\"temp\">Night - ").concat(day.temp.night, "&#176;C</div>\n                <div class=\"temp\">Day - ").concat(day.temp.day, "&#176;C</div>\n            </div>\n            \n            ");
    }
  });
  weatherForecastEl.innerHTML = otherDayForcast;
}