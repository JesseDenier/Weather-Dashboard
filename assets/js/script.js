// Saves the randomly generated key supplied by Open Weather as a string variable.
var openWeatherAPI = "2185ac83df543cf01fee31582244cc17";

// Allows user inputs to be assigned to city and sets a default upon first open.
var city = "Austin";

// Fetches the Open Weather Weather API.
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
        // Populates HTML elements with data from created JSON file.
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

// Fetches the Open Weather Forecast API.
function fetchDisplayForecast(city, openWeatherAPI) {
  fetch(
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      openWeatherAPI +
      "&units=imperial"
  )
    // Creates a JSON file of the data.
    .then(function (response) {
      return response.json();
    })
    // Populates HTML elements with data from created JSON file.
    .then(function (data) {
      // Iterates over the 5 days adjusting which JSON data it uses and which HTML element it places data in.
      for (var i = 1; i < 6; i++) {
        // Changes how the date is displayed.
        var date = new Date(data.list[(i - 1) * 8 + 4].dt_txt),
          month = date.getMonth() + 1,
          day = date.getDate(),
          dayDate = month + "/" + day;
        $("#day" + i + "Date").text(dayDate);
        // Changes the emoji next to the date based on general weather.
        if (data.list[(i - 1) * 8 + 4].weather[0].main === "Clouds") {
          $("#day" + i + "Date").append(" ☁️");
        }
        if (data.list[(i - 1) * 8 + 4].weather[0].main === "Clear") {
          $("#day" + i + "Date").append(" ☀️");
        }
        if (data.list[(i - 1) * 8 + 4].weather[0].main === "Rain") {
          $("#day" + i + "Date").append(" 🌧️");
        }
        if (data.list[(i - 1) * 8 + 4].weather[0].main === "Snow") {
          $("#day" + i + "Date").append(" ❄️");
        }
        // Rounds the temperature and wind speed to the nearest whole number and adds proper unit symobls.
        var TempRounded = Math.round(data.list[(i - 1) * 8 + 4].main.temp);
        $("#day" + i + "Temp").text(TempRounded + "°F");
        var WindRounded = Math.round(data.list[(i - 1) * 8 + 4].wind.speed);
        $("#day" + i + "Wind").text(WindRounded + " MPH");
        $("#day" + i + "Humidity").text(
          data.list[(i - 1) * 8 + 4].main.humidity + "%"
        );
      }
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
