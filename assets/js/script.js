// Saves the randomly generated key supplied by Open Weather as a string variable.
var openWeatherAPI = "2185ac83df543cf01fee31582244cc17";

// Creates an array that will hold the a default list of cities on first load.
var cityArray = ["Austin", "New York City", "Denver"];

// Creates an array based on a localStorage object that will be populated if the user has used the site before.
var cityArrayStored = JSON.parse(localStorage.getItem("cityArrayStored"));

// If the stored array has data in it then it sets cityArray to the stored Array.
if (cityArrayStored !== null) {
  cityArray = cityArrayStored;
}

// Allows user inputs to be assigned to city and sets the default to 1st in array.
var city = cityArray[0];

// Populates the City List with data in cityArray
function cityArrayIntoCityList() {
  // Deletes all HTML elements inside of cityList so I can populate it with the for loop.
  $("#cityList").empty();
  // Creates a new list item in city list for each item in cityArray.
  for (i = 0; i < cityArray.length; i++) {
    var newCity = $("<li></li>");
    newCity.text(cityArray[i]);
    newCity.addClass("list-group-item list-group-item-action cityItem");
    $("#cityList").append(newCity);
  }
}

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
    // If the city the user entered doesn't exist it will alert them to this, remove the city from the array, and update the local storage array so they don't get stuck in the alert forever.
    if (response.status != 200) {
      alert("This city was not found in our database. Please try again.");
      cityArray.shift();
      localStorage.setItem("cityArrayStored", JSON.stringify(cityArray));
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
function fetchDisplayForecast() {
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

// Adds the user input to the front of the cityArray and populates the main data.
function addCitytoArray() {
  cityArray.unshift($("#searchInput").val());
  // Limits the cityArray to 10 total cities.
  cityArray.splice(10);
  // Saves the array to local storage.
  localStorage.setItem("cityArrayStored", JSON.stringify(cityArray));
  // Sets city to the newly created first input in cityArray.
  city = cityArray[0];
}

// Takes the value specified on cityList click and removes it from the array and adds it to the front.
function moveCitytoIndexZero(clickedCity) {
  var clickedCityIndex = cityArray.indexOf(clickedCity);
  if (clickedCityIndex !== 0) {
    cityArray.splice(clickedCityIndex, 1);
    cityArray.unshift(clickedCity);
    localStorage.setItem("cityArrayStored", JSON.stringify(cityArray));
  }
  city = cityArray[0];
}

// Cities on aside move their city to the front of the array and then populates the HTML.
$("#cityList").on("click", ".cityItem", function () {
  var clickedCity = $.trim($(this).text());
  moveCitytoIndexZero(clickedCity);
  // Calls HTML populating functions.
  cityArrayIntoCityList();
  fetchDisplayWeather();
  fetchDisplayForecast();
});

// Search button adds user input to the array and then populates the HTML.
$("#searchBtn").on("click", function () {
  addCitytoArray();
  cityArrayIntoCityList();
  fetchDisplayWeather();
  fetchDisplayForecast();
});

// Call HTML populating functions on page load.
cityArrayIntoCityList();
fetchDisplayWeather();
fetchDisplayForecast();
