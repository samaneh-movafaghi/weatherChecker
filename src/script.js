let key = "c8ddb0291790d35932753a55c0365f57";
let cityElem = document.querySelector("#city");
cityElem.innerHTML = "paris";
let searchInputElem = document.querySelector("#search");
let searchButtonElem = document.querySelector("#searchButton");
let defenitionElem = document.querySelector("#defenition");
let degreeElem = document.querySelector("#degree");
let humidityElem = document.querySelector("#humidity");
let windElem = document.querySelector("#wind");
let showDayElem = document.querySelector("#weekDay");
//search(city);
searchButtonElem.addEventListener("click", function(event) {

    search(city);

});



function search(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&units=metric&appid=${key}`;
    axios.get(api).then(getResult);

}

function getResult(result) {
    console.log(result.data);
    replace(searchInputElem.value, result.data.weather[0].description, result.data.main.temp, result.data.main.humidity, result.data.wind.speed);
}

function replace(cityName, defenition, degree, humidity, wind) {
    cityElem.innerHTML = cityName;
    defenitionElem.innerHTML = defenition;
    degreeElem.innerHTML = degree;
    humidityElem.innerHTML = humidity;
    windElem.innerHTML = wind;


}

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let now = new Date;
let day = now.getDay();
showDayElem.innerHTML = days[day];





let current = document.querySelector("#currentButton");
current.addEventListener("click", getCurrentPosition);

function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {

    let geoApi = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${key}`;
    axios.get(geoApi).then(showCityLocation);

}

function showCityLocation(location) {
    let city = location.data.name;
    console.log(location);
    replace(city, location.data.weather[0].description, location.data.main.temp, location.data.main.humidity, location.data.wind.speed);

}