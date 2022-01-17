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
    getForecast(userCity);
    
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

function getForecast(city){

    var requestUrl ="https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=imperial&appid=e43ae957e225197b143c05e62415986d"
    fetch(requestUrl)
    .then((response)=> {
        return response.json();
      })
      .then((data)=> {
          weatherForecast.innerHTML="";
        console.log(data)


        //creating array of objects for for loop objectData ={List: }
        
        var arrayData= [data.list[10],data.list[18],data.list[26],data.list[34],data.list[39]]
        for (var i=0; i<5; i++){
            var x=arrayData[i]



        }


        // var x;
        // creating divs with java to push data
        var newDiv = document.createElement("div");
        var newTemp = document.createElement('h3');
        var newHumidity = document.createElement('h3')
        var newWind = document.createElement('h3')
        var newImage= document.createElement('img')
        var newDate= document.createElement('h1')

        var newDivTwo = document.createElement("div");
        var newTempTwo = document.createElement('h3');
        var newHumidityTwo = document.createElement('h3')
        var newWindTwo = document.createElement('h3')
        var newImageTwo= document.createElement('img')
        var newDateTwo= document.createElement('h1')
        
        var newDivThree = document.createElement("div");
        var newTempThree = document.createElement('h3');
        var newHumidityThree = document.createElement('h3')
        var newWindThree = document.createElement('h3')
        var newImageThree= document.createElement('img')
        var newDateThree= document.createElement('h1')

        var newDivFour = document.createElement("div");
        var newTempFour = document.createElement('h3');
        var newHumidityFour = document.createElement('h3')
        var newWindFour = document.createElement('h3')
        var newImageFour= document.createElement('img')
        var newDateFour= document.createElement('h1')

        var newDivFive = document.createElement("div");
        var newTempFive = document.createElement('h3');
        var newHumidityFive = document.createElement('h3')
        var newWindFive = document.createElement('h3')
        var newImageFive= document.createElement('img')
        var newDateFive= document.createElement('h1')



        newDate.innerText = "Date: "+x.dt_txt;
        newTemp.innerText = "Temp: "+x.main.temp;
        newHumidity.innerText = "Humidity: "+x.main.humidity;
        newWind.innerText = "Wind Speed: "+x.wind.speed;
        newImage.src =" http://openweathermap.org/img/wn/"+x.weather[0].icon+"@2x.png"


        newDateTwo.innerText = "Date: "+x.dt_txt;
        newTempTwo.innerText = "Temp: "+x.main.temp;
        newHumidityTwo.innerText = "Humidity: "+x.main.humidity;
        newWindTwo.innerText = "Wind Speed: "+x.wind.speed;
        newImageTwo.src =" http://openweathermap.org/img/wn/"+x.weather[0].icon+"@2x.png"


        newDateThree.innerText = "Date: "+x.dt_txt;
        newTempThree.innerText = "Temp: "+x.main.temp;
        newHumidityThree.innerText = "Humidity: "+x.main.humidity;
        newWindThree.innerText = "Wind Speed: "+x.wind.speed;
        newImageThree.src =" http://openweathermap.org/img/wn/"+x.weather[0].icon+"@2x.png"


        newDateFour.innerText = "Date: "+x.dt_txt;
        newTempFour.innerText = "Temp: "+x.main.temp;
        newHumidityFour.innerText = "Humidity: "+x.main.humidity;
        newWindFour.innerText = "Wind Speed: "+x.wind.speed;
        newImageFour.src =" http://openweathermap.org/img/wn/"+x.weather[0].icon+"@2x.png"


        newDateFive.innerText = "Date: "+x.dt_txt;
        newTempFive.innerText = "Temp: "+x.main.temp;
        newHumidityFive.innerText = "Humidity: "+x.main.humidity;
        newWindFive.innerText = "Wind Speed: "+x.wind.speed;
        newImageFive.src =" http://openweathermap.org/img/wn/"+x.weather[0].icon+"@2x.png"
       
       
        newDiv.append(newDate);
        newDiv.append(newTemp);
        newDiv.append(newHumidity);
        newDiv.append(newWind);
        newDiv.append(newImage)
        weatherForecast.append(newDiv)

        newDivTwo.append(newDateTwo);
        newDivTwo.append(newTempTwo);
        newDivTwo.append(newHumidityTwo);
        newDivTwo.append(newWindTwo);
        newDivTwo.append(newImageTwo)
        weatherForecast.append(newDivTwo)

        newDivThree.append(newDateThree);
        newDivThree.append(newTempThree);
        newDivThree.append(newHumidityThree);
        newDivThree.append(newWindThree);
        newDivThree.append(newImageThree)
        weatherForecast.append(newDivThree)

        newDivFour.append(newDateFour);
        newDivFour.append(newTempFour);
        newDivFour.append(newHumidityFour);
        newDivFour.append(newWindFour);
        newDivFour.append(newImageFour)
        weatherForecast.append(newDivFour)

        newDivFive.append(newDateFive);
        newDivFive.append(newTempFive);
        newDivFive.append(newHumidityFive);
        newDivFive.append(newWindFive);
        newDivFive.append(newImageFive)
        weatherForecast.append(newDivFive)


    })
}
