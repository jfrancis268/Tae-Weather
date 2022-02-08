//fetch url
//to return lat & lon

//use that lat & lon, plug in second api to fetch
//to return current weather & 5-day forecast

var searchInput = document.querySelector(".searchInput")
var searchBtn = document.querySelector(".searchBtn")
var historyCities = document.querySelector(".historyCities")
var currentContainer = document.querySelector(".currentContainer")
var forecastContainer = document.querySelector(".forecastContainer")
var apiKey = "1707fcf06406d9ecef0e5b259677807b";
var searchedCities = JSON.parse(localStorage.getItem("searchedCities")) || [];


var today = moment();
$("#date").text(today.format("MM/D/YYYY"));


var getLatLon = function (cityName) {
    var latLonURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=5&appid=" + apiKey + "&units=imperial"
    fetch(latLonURL)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            var lat = data[0].lat;
            var lon = data[0].lon;
            getWeatherData(lat, lon);
        })
}

var getWeatherData = function (lat, lon) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial"
    fetch(weatherURL)
        .then(function (response) {
            console.log(response)
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            getCurrentWeather(data);
            getForecastWeather(data)
        })
}

var getCurrentWeather = function(weather){
    var pTemp = document.createElement("p");
    pTemp.textContent = "Temperature: " + weather.current.temp;
    currentContainer.appendChild(pTemp)

    var pUV = document.createElement("p");
    pUV.textContent = "UV Index: " + weather.current.uvi;
    currentContainer.appendChild(pUV)

    var pHumidity = document.createElement("p");
    pHumidity.textContent = "Humidity: " + weather.current.humidity;
    currentContainer.appendChild(pHumidity)

    var pWind_Gust = document.createElement("p");
    pWind_Gust.textContent = "Wind: " + weather.current.wind_gust + " MPH";
    currentContainer.appendChild(pWind_Gust)
}

// var getForecastWeather = function(weather){
//     //for loop
//     $.ajax({
//         url: weatherURL,
//         method: 'GET'
//     }).then(function (response) {
//         // Storing an array of results in the results variable
//         var results = response.list;
//         //empty 5day div--------
//         $("#5day").empty();
//         //create HTML for 5day forcast................
//         for (var i = 0; i < results.length; i += 8) {
//             // Creating a div
//             var fiveDayDiv = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");
// };

function displaySearchedCities()    {

    for (var i = 0; i < searchedCities.length; i++) {
        console.log("yoooo")

            var li = document.createElement("li");
            li.textContent = searchedCities[i]

            historyCities.appendChild(li)
    }
}

searchBtn.addEventListener("click", function () {
    var searchValue = searchInput.value;
    console.log(searchValue)
    getLatLon(searchValue)
    searchedCities.push(searchValue)
    localStorage.setItem("searchedCities", JSON.stringify(searchedCities));

})