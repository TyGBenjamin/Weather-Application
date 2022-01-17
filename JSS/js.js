var searchButton = document.querySelector(".searchHere");
var weatherSection = document.getElementById('weather-part');
var userInput = document.getElementById('userInput')
var weatherForecast=document.getElementById('weather-forecast');
var recentSearch = document.querySelector('.searchHistory');

document.addEventListener("DOMContentLoaded", function(){
    var update = JSON.parse(localStorage.getItem("userEntry"))
    if(update === null)
    JSON.parse(localStorage.getItem("userEntry"));
    // Handler when the DOM is fully loaded

searchButton.addEventListener("click", function runSearch(){
    console.log("testing")
    var userEntry={userInput,update}
    var userCity=userInput.value
    // userEntry[0]=userCity
    localStorage.setItem("userEntry", JSON.stringify(userEntry));
    var update = JSON.parse(localStorage.getItem("userEntry"));
    update[userCity]=userInput.value

    if (update === null) {
        userEntry[userCity] = userInput.value
        localStorage.setItem("userEntry", JSON.stringify(userEntry));
    }
    else {
        update[userCity] = userInput.value
        localStorage.setItem("userEntry", JSON.stringify(update));
    }
    // localStorage.setItem("userEntry", JSON.stringify(update));
    getWeather(userCity);
    // getForecast(userCity);
    
})

recentSearch.addEventListener('click', function(event){
    event.preventDefault();
    console.log('show recent search');

})


// api.openweathermap.org/data/2.5/weather?id={city id}&appid={536f4142de55778f35da3d666d1b464b}
function getWeather(city){
var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=b8033cd6f91ebcbedb1a8f2576574c01"

    fetch(requestUrl)
    .then((response)=> {
        return response.json();
      })
      .then((data)=> {
          weatherSection.innerHTML="";
        console.log(data)
        // creating divs with java to push data
        var newDiv = document.createElement("div");
        var newHeader = document.createElement('h1');
        var newTemp = document.createElement('h3');
        var newHumidity = document.createElement('h3')
        var newWind = document.createElement('h3')
        var newImage= document.createElement('img')
        newHeader.innerText = data.name;
        newTemp.innerText = "Today's Temp: "+data.main.temp;
        newHumidity.innerText = "Humidity: "+data.main.humidity;
        newWind.innerText = "Wind Speed: "+data.wind.speed;
        newImage.src =" http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
        newDiv.append(newHeader);
        newDiv.append(newTemp);
        newDiv.append(newHumidity);
        newDiv.append(newWind);
        newDiv.append(newImage)
        weatherSection.append(newDiv)
      })
    }

}


);


