// Saves the randomly generated key supplied by Open Weather as a string variable.
var openWeatherAPI = "2185ac83df543cf01fee31582244cc17";

// Allows user inputs to be assigned to location based variables.
var city;
var state;
var country;

// Builds an API call based on variables above.
var queryURL =
  "http://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  openWeatherAPI;

// Makes the above API call.
fetch(queryURL);

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
