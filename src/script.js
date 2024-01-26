
const apiKey="40e33abe67023b28d24b0df9f1btoede";
const apiUrl=`https://api.shecodes.io/weather/v1/current?key=${apiKey}`;
const txtSearch=document.querySelector("#txtSearch");
const btnSearch=document.querySelector("#btnSearch");
const divCity=document.querySelector("#divCity");

btnSearch.addEventListener("click", onSearchClick);
function onSearchClick(event){
    event.preventDefault();
    divCity.innerHTML=txtSearch.value;
    let url=apiUrl+"&query="+txtSearch.value;
    axios.get(url).then(onWeatherResponse);

}

function onWeatherResponse(response){
    console.log(response);
}