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
