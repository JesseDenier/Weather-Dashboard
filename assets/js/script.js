// Saves the randomly generated key supplied by Open Weather as a string variable.
var openWeatherAPI = "2185ac83df543cf01fee31582244cc17";

// Allows user inputs to be assigned to location based variables.
var city;
var state;
var country;

// TEST CODE
city = "Austin";

// Builds an API call based on variables above for the current weather.
var weatherURL =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  openWeatherAPI +
  "&units=imperial";

// Makes the Weather API call.
fetch(weatherURL);

// Makes the Weather API call and then runs a function to populate all HTML elements with data from created JSON file.
$.getJSON(weatherURL, function (data) {
  $("#currentCity").text(data.name);
  var currentTempRounded = Math.round(data.main.temp);
  $("#currentTemp").text(currentTempRounded + "°F");
  $("#currentWind").text(data.wind.speed + " MPH");
  $("#currentHumidity").text(data.main.humidity + "%");
});

// Builds an API call based on variables above for the 5 day forecast.
var forecastURL =
  "http://api.openweathermap.org/data/2.5/forecast?q=" +
  city +
  "&appid=" +
  openWeatherAPI +
  "&units=imperial";

// Makes the Forecast API call.
fetch(forecastURL);

// Makes the Forecast API call and then runs a function to populate all HTML elements with data from created JSON file.
$.getJSON(forecastURL, function (data) {
  $("#day1Date").text(data.list[4].dt_txt);
  var day1FTempRounded = Math.round(data.list[4].main.temp);
  $("#day1Temp").text(day1FTempRounded + "°F");
  $("#day1Wind").text(data.list[4].wind.speed + " MPH");
  $("#day1Humidity").text(data.list[4].main.humidity + "%");

  $("#day2Date").text(data.list[12].dt_txt);
  var day2FTempRounded = Math.round(data.list[12].main.temp);
  $("#day2Temp").text(day2FTempRounded + "°F");
  $("#day2Wind").text(data.list[12].wind.speed + " MPH");
  $("#day2Humidity").text(data.list[12].main.humidity + "%");

  $("#day3Date").text(data.list[20].dt_txt);
  var day3FTempRounded = Math.round(data.list[20].main.temp);
  $("#day3Temp").text(day3FTempRounded + "°F");
  $("#day3Wind").text(data.list[20].wind.speed + " MPH");
  $("#day3Humidity").text(data.list[20].main.humidity + "%");

  $("#day4Date").text(data.list[28].dt_txt);
  var day4FTempRounded = Math.round(data.list[28].main.temp);
  $("#day4Temp").text(day4FTempRounded + "°F");
  $("#day4Wind").text(data.list[28].wind.speed + " MPH");
  $("#day4Humidity").text(data.list[28].main.humidity + "%");

  $("#day5Date").text(data.list[36].dt_txt);
  var day5FTempRounded = Math.round(data.list[36].main.temp);
  $("#day5Temp").text(day5FTempRounded + "°F");
  $("#day5Wind").text(data.list[36].wind.speed + " MPH");
  $("#day5Humidity").text(data.list[36].main.humidity + "%");
});

// Search button prepends user input to top of city list.
// TODO: Make it also populate data on main.
// TODO: Make it return an error if user input is not a city.
$("#searchBtn").on("click", function () {
  var newCity = $("<li></li>");
  newCity.text($("#searchInput").val());
  newCity.addClass("list-group-item list-group-item-action");
  $("#cityList").prepend(newCity);
});
//TODO: Limit list size to 10.

//TODO: Make list items populate data on main.
