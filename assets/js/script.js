// Saves the randomly generated key supplied by Open Weather as a string variable.
var openWeatherAPI = "2185ac83df543cf01fee31582244cc17";

// Allows user inputs to be assigned to city and sets a default upon first open.
var city = "Austin";

// Fetches the Weather API.
function fetchDisplayWeather() {
  fetch(
    "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      openWeatherAPI +
      "&units=imperial"
    // Creates a JSON file of the data.
  ).then(function (response) {
    if (response.status != 200) {
      alert("This city was not found in our database. Please try again.");
      window.location.reload();
    }
    return (
      response
        .json()
        // Populates all HTML elements with data from created JSON file.
        .then(function (data) {
          $("#currentCity").text(data.name);
          var currentTempRounded = Math.round(data.main.temp);
          $("#currentTemp").text(currentTempRounded + "°F");
          var currentWindRounded = Math.round(data.wind.speed);
          $("#currentWind").text(currentWindRounded + " MPH");
          $("#currentHumidity").text(data.main.humidity + "%");
          if (data.weather[0].main === "Clouds") {
            $("main").css("background-image", "url(assets/imgs/Clear.jpeg)");
            $("main").css("background-size", "cover");
          }
          if (data.weather[0].main === "Clear") {
            $("main").css("background-image", "url(assets/imgs/Clear.jpeg)");
            $("main").css("background-size", "cover");
          }
          if (data.weather[0].main === "Rain") {
            $("main").css("background-image", "url(assets/imgs/Rain.jpeg)");
            $("main").css("background-size", "cover");
          }
          if (data.weather[0].main === "Snow") {
            $("main").css("background-image", "url(assets/imgs/Snow.jpeg)");
            $("main").css("background-size", "cover");
          }
        })
    );
  });
}

// Fetches the Forecast API.
function fetchDisplayForecast() {
  fetch(
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      openWeatherAPI +
      "&units=imperial"
    // Creates a JSON file of the data.
  ).then(function (response) {
    return (
      response
        .json()
        // Populates all HTML elements with data from created JSON file.
        // TODO: The free API I am using does not give daily averages, lows, or highs but rather 3 hour forecasts over 5 days. There is likely a better way to display the weather than only using the noon time slot.
        // TODO: There is a probably a way to better follow DRY principles using a for loop for all 5 days, but there would be no need to add more days in the future so I left it.
        .then(function (data) {
          // Adjusts the way the date is displayed.
          var date = new Date(data.list[4].dt_txt),
            month = date.getMonth() + 1,
            day = date.getDate(),
            day1Date = month + "/" + day;
          // Appends an emoji to the date based on overall weather
          $("#day1Date").text(day1Date);
          if (data.list[4].weather[0].main === "Clouds") {
            $("#day1Date").append(" ☁️");
          }
          if (data.list[4].weather[0].main === "Clear") {
            $("#day1Date").append(" ☀️");
          }
          if (data.list[4].weather[0].main === "Rain") {
            $("#day1Date").append(" 🌧️");
          }
          if (data.list[4].weather[0].main === "Snow") {
            $("#day1Date").append(" ❄️");
          }
          // Rounds the temp and wind speed to the nearest whole number and displays the temp, wind speed, and humidity with the correct symbols.
          var day1TempRounded = Math.round(data.list[4].main.temp);
          $("#day1Temp").text(day1TempRounded + "°F");
          var day1WindRounded = Math.round(data.list[4].wind.speed);
          $("#day1Wind").text(day1WindRounded + " MPH");
          $("#day1Humidity").text(data.list[4].main.humidity + "%");

          var date = new Date(data.list[12].dt_txt),
            month = date.getMonth() + 1,
            day = date.getDate(),
            day2Date = month + "/" + day;
          $("#day2Date").text(day2Date);
          if (data.list[12].weather[0].main === "Clouds") {
            $("#day2Date").append(" ☁️");
          }
          if (data.list[12].weather[0].main === "Clear") {
            $("#day2Date").append(" ☀️");
          }
          if (data.list[12].weather[0].main === "Rain") {
            $("#day2Date").append(" 🌧️");
          }
          if (data.list[12].weather[0].main === "Snow") {
            $("#day2Date").append(" ❄️");
          }
          var day2TempRounded = Math.round(data.list[12].main.temp);
          $("#day2Temp").text(day2TempRounded + "°F");
          var day2WindRounded = Math.round(data.list[12].wind.speed);
          $("#day2Wind").text(day2WindRounded + " MPH");
          $("#day2Humidity").text(data.list[12].main.humidity + "%");

          var date = new Date(data.list[20].dt_txt),
            month = date.getMonth() + 1,
            day = date.getDate(),
            day3Date = month + "/" + day;
          $("#day3Date").text(day3Date);
          if (data.list[20].weather[0].main === "Clouds") {
            $("#day3Date").append(" ☁️");
          }
          if (data.list[20].weather[0].main === "Clear") {
            $("#day3Date").append(" ☀️");
          }
          if (data.list[20].weather[0].main === "Rain") {
            $("#day3Date").append(" 🌧️");
          }
          if (data.list[20].weather[0].main === "Snow") {
            $("#day3Date").append(" ❄️");
          }
          var day3TempRounded = Math.round(data.list[20].main.temp);
          $("#day3Temp").text(day3TempRounded + "°F");
          var day3WindRounded = Math.round(data.list[20].wind.speed);
          $("#day3Wind").text(day3WindRounded + " MPH");
          $("#day3Humidity").text(data.list[20].main.humidity + "%");

          var date = new Date(data.list[28].dt_txt),
            month = date.getMonth() + 1,
            day = date.getDate(),
            day4Date = month + "/" + day;
          $("#day4Date").text(day4Date);
          if (data.list[28].weather[0].main === "Clouds") {
            $("#day4Date").append(" ☁️");
          }
          if (data.list[28].weather[0].main === "Clear") {
            $("#day4Date").append(" ☀️");
          }
          if (data.list[28].weather[0].main === "Rain") {
            $("#day4Date").append(" 🌧️");
          }
          if (data.list[28].weather[0].main === "Snow") {
            $("#day4Date").append(" ❄️");
          }
          var day4TempRounded = Math.round(data.list[28].main.temp);
          $("#day4Temp").text(day4TempRounded + "°F");
          var day4WindRounded = Math.round(data.list[28].wind.speed);
          $("#day4Wind").text(day4WindRounded + " MPH");
          $("#day4Humidity").text(data.list[28].main.humidity + "%");

          var date = new Date(data.list[36].dt_txt),
            month = date.getMonth() + 1,
            day = date.getDate(),
            day5Date = month + "/" + day;
          $("#day5Date").text(day5Date);
          if (data.list[36].weather[0].main === "Clouds") {
            $("#day5Date").append(" ☁️");
          }
          if (data.list[36].weather[0].main === "Clear") {
            $("#day5Date").append(" ☀️");
          }
          if (data.list[36].weather[0].main === "Rain") {
            $("#day5Date").append(" 🌧️");
          }
          if (data.list[36].weather[0].main === "Snow") {
            $("#day5Date").append(" ❄️");
          }
          var day5TempRounded = Math.round(data.list[36].main.temp);
          $("#day5Temp").text(day5TempRounded + "°F");
          var day5WindRounded = Math.round(data.list[36].wind.speed);
          $("#day5Wind").text(day5WindRounded + " MPH");
          $("#day5Humidity").text(data.list[36].main.humidity + "%");
        })
    );
  });
}

// Search button prepends user input to top of city list and fills out data on main.
// TODO: It would be best to limit the number of cities in the list to 5 but due to them resetting on reload I left it alone.
$("#searchBtn").on("click", function () {
  // Changes the variable city to the user input and populates the main data.
  city = $("#searchInput").val();
  fetchDisplayWeather();
  fetchDisplayForecast();
  // Creates a new list item based on the user input and prepends it to the city list.
  var newCity = $("<li></li>");
  newCity.text($("#searchInput").val());
  newCity.addClass("list-group-item list-group-item-action cityItem");
  $("#cityList").prepend(newCity);
});

// When any city in the aside is clicked it changes the variable city to that list item and populates the main data.
$("#cityList").on("click", ".cityItem", function () {
  city = $.trim($(this).text());
  fetchDisplayWeather();
  fetchDisplayForecast();
});

// Call the populate main data functions on page load.
fetchDisplayWeather();
fetchDisplayForecast();
