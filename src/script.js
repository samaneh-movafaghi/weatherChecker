
const apiKey="40e33abe67023b28d24b0df9f1btoede";
const currentApiUrl=`https://api.shecodes.io/weather/v1/current?key=${apiKey}`;
const forecastApiUrl=`https://api.shecodes.io/weather/v1/forecast?key=${apiKey}`;
const txtSearch=document.querySelector("#txtSearch");
const btnSearch=document.querySelector("#btnSearch");
const divCity=document.querySelector("#divCity");
let degree=document.querySelector(".degree");
let date=document.querySelector(".date");
let humidity=document.querySelector("#humid");
let windSpeed=document.querySelector("#windSpeed");
let description=document.querySelector(".description");
let Icon=document.querySelector("#imgIcon");


updateCityInfo("Lisbon");





btnSearch.addEventListener("click", onSearchClick);

function onSearchClick(event){
    event.preventDefault();
    let cityName=txtSearch.value;
    updateCityInfo(cityName);
}

function updateCityInfo(city){
    divCity.innerHTML=city;
    let url=currentApiUrl+"&query="+city;
    axios.get(url).then(onWeatherResponse);

    let forecastUrl=forecastApiUrl+"&query="+city;
    axios.get(forecastUrl).then(displayForecast);
}

function onWeatherResponse(response){
    console.log(response); 
    let temperature=Math.round(response.data.temperature.current);
    degree.innerHTML=temperature; 
    console.log(temperature);
    let humid=response.data.temperature.humidity;
    humidity.innerHTML="%"+humid;
    let wind=response.data.wind.speed;
    windSpeed.innerHTML=wind+"km/h";
    let cloudDescription=response.data.condition.description
    description.innerHTML=cloudDescription; 
    let dateInfo=new Date(response.data.time*1000);
    let dateAndTimeResult=showDateAndTime(dateInfo);
    date.innerHTML=dateAndTimeResult;
    //let iconUrl="img src="+(response.data.condition.icon_url);
   // icon.innerHTML=iconUrl;
    Icon.src=response.data.condition.icon_url;
   

}
function showDateAndTime(date){
    let week=[
        
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day=week[date.getDay()];
    let hour=date.getHours();
    let muinte=date.getMinutes();
    if(muinte<10){
        muinte="0"+muinte;
    }

    return(day+", "+hour+":"+muinte+", ");
}

function forecastDay(timestamp){
let date=new Date(timestamp*1000);
let days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
return days[date.getDay()];
}


function displayForecast(response){
    console.log(response);
    let forecast=document.querySelector("#forecast");
    let forecastHTML="";
    response.data.daily.forEach(function(day,index)  {
        if(index<5){
        forecastHTML=
        forecastHTML+`
        
    <div class="weather-forecast-first">
        <div class="weather-forecast-day">
            ${forecastDay(day.time)}
        </div>
        <div class="weather-forecast-icon">
        <img class="forecast-icon" src="${day.condition.icon_url}" alt>
        </div>
        <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max">${Math.round(day.temperature.maximum)}</span>
            <span class="weather-forecast-temperature-max">${Math.round(day.temperature.minimum)}</span>
        </div>
    </div>
    `;
    forecast.innerHTML=forecastHTML;
    }
});
}

    