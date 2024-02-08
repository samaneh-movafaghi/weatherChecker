
const apiKey="40e33abe67023b28d24b0df9f1btoede";
const apiUrl=`https://api.shecodes.io/weather/v1/current?key=${apiKey}`;
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
    let url=apiUrl+"&query="+city;
    axios.get(url).then(onWeatherResponse);

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
        "saturday",
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday"
    ];
    let day=week[date.getDay()];
    let hour=date.getHours();
    let muinte=date.getMinutes();
    if(muinte<10){
        muinte="0"+muinte;
    }

    return(day+", "+hour+":"+muinte+", ");
}
