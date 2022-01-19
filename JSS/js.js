


var searchButton = document.querySelector(".searchHere");
var weatherSection = document.getElementById('weather-part');
var userInput = document.getElementById('userInput')
var weatherForecast = document.getElementById('weather-forecast');
var recentSearch = document.querySelector('.searchHistory');
var recentSearchSection = document.getElementById('recentSearchSection')
var listOneButton = document.getElementById('listItemOne')
var errorSection=document.getElementById('errorSection')

document.addEventListener("DOMContentLoaded", function () {
    init()

    var update = localStorage.getItem("Last City Searched")
    if (update === null)
        JSON.parse(localStorage.getItem("Last City Searched"));
    // Handler when the DOM is fully loaded

    var userEntries = []

    function init() {
        var storedEntries = JSON.parse(localStorage.getItem("userEntries"))
        if (storedEntries !== null) {
            userEntries = storedEntries;
        }
    }

    searchButton.addEventListener("click", function runSearch() {
        console.log("testing")
        var userCity = userInput.value



            // for (var i=0 ; i<userEntries.length; i++)
            //     var entries = userEntries[i];
            localStorage.setItem("userEntries", JSON.stringify(userEntries))






            // // userEntry[0]=userCity
            var lastSearch = localStorage.setItem("previousSearch", userInput.value)
            var firstSearch = localStorage.getItem("previousSearch")
            userEntries.push(firstSearch)
            if (userCity !== lastSearch) {

            }
            console.log(userEntries)
            localStorage.setItem("firstSearch", firstSearch)


            getWeather(userCity);
            getForecast(userCity);

    })

})



// Getting Current Weather Conditions 


function getWeather(city) {
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=b8033cd6f91ebcbedb1a8f2576574c01"

    fetch(requestUrl)
        .then((response) => {
            console.log(response);
            if ( response.ok ===false){
                var error = document.createElement('h2')
                error.style.color="red"
                error.style.fontWeight="bold"
                error.innerText = "Please Enter Valid City"

                errorSection.append(error)
            }
            else { errorSection.remove(error)}
            return response.json();
        })

        
        .then((data) => {
            weatherSection.innerHTML = "";
            console.log(data)

            // creating divs with java to push data
            var newDiv = document.createElement("div");
            var newHeader = document.createElement('h1');
            var newTemp = document.createElement('h3');
            var newHumidity = document.createElement('h3')
            var newWind = document.createElement('h3')
            var newUvIndex = document.createElement('h3')
            newUvIndex.setAttribute("id", "UvIndex")
            var newImage = document.createElement('img')
            newHeader.innerText = data.name;
            newTemp.innerText = "Today's Temp: " + data.main.temp;
            newHumidity.innerText = "Humidity: " + data.main.humidity;
            newWind.innerText = "Wind Speed: " + data.wind.speed;

            // newUvIndex= "UV Index: "+
            newImage.src = " http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
            newDiv.append(newHeader);
            newDiv.append(newTemp);
            newDiv.append(newHumidity);
            newDiv.append(newWind);
            newDiv.append(newImage)
            weatherSection.append(newDiv)

            var requestUrlIndex = "https://api.openweathermap.org/data/2.5/onecall?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&exclude=hourly,alerts&units=imperial&appid=e43ae957e225197b143c05e62415986d"
            fetch(requestUrlIndex)
                .then((response) => {
                    console.log(response)
                    return response.json();
                })
                .then((moreData) => {
                    console.log(moreData)
                    newUvIndex.innerText = "UV Index: " + moreData.current.uvi;
                    newDiv.append(newUvIndex)
                    if (moreData.current.uvi <= 2) {
                        newUvIndex.style.backgroundColor = "green"
                        newUvIndex.style.fontWeight = "bold"
                    }
                    else if (moreData.current.uvi > 2 && moreData.current.uvi <= 3.5) {
                        newUvIndex.style.backgroundColor = "yellow"
                        newUvIndex.style.fontWeight = "bold"
                    }

                    else {
                        newUvIndex.style.backgroundColor = "red"
                        newUvIndex.style.fontWeight = "bold"
                    }

                })

                        
  
        })


    


    recentSearch.addEventListener('click', function (event) {
        event.preventDefault()
        // console.log('show recent search');
        // recentSearchSection.innerHTML ="";


        // Creating list Element for recent search and turning them into active buttons
        // also setting IDs to elements to edit in CSS
        var uList = document.createElement('ul')
        var listItemOne = document.createElement('li')
        listItemOne.setAttribute("id", "listItemOne")

        var listItemTwo = document.createElement('li')
        listItemTwo.setAttribute("id", "listItemTwo")

        var listItemThree = document.createElement('li')
        listItemThree.setAttribute("id", "listItemThree")

        var listItemFour = document.createElement('li')
        listItemFour.setAttribute("id", "listItemFour")

        var listItemFive = document.createElement('li')
        listItemFive.setAttribute("id", "listItemFive")





        var lastCity = localStorage.getItem("previousSearch")
        var retrievedEntries = localStorage.getItem("userEntries")
        var storedEntries = JSON.parse(retrievedEntries)
        console.log(storedEntries)

        secondCity = storedEntries[0]
        thirdCity = storedEntries[1]
        fourthCity = storedEntries[2]
        fifthCity = storedEntries[3]




        listItemOne.innerText = lastCity
        listItemTwo.innerText = secondCity
        listItemThree.innerText = thirdCity
        listItemFour.innerText = fourthCity
        listItemFive.innerText = fifthCity

        listItemOne.addEventListener("click", function () {
            // event.preventDefault();
            getWeather(lastCity);
            getForecast(lastCity);
        })

        listItemTwo.addEventListener("click", function () {

            getWeather(secondCity);
            getForecast(secondCity);
        })

        listItemThree.addEventListener("click", function () {

            getWeather(thirdCity);
            getForecast(thirdCity);
        })


        listItemFour.addEventListener("click", function (event) {
            event.preventDefault();
            getWeather(fourthCity);
            getForecast(fourthCity);
        })


        listItemFive.addEventListener("click", function (event) {
            event.preventDefault();
            getWeather(fifthCity);
            getForecast(fifthCity);
        })


        recentSearchSection.append(uList);
        recentSearchSection.append(listItemOne)
        recentSearchSection.append(listItemTwo)
        recentSearchSection.append(listItemThree)
        recentSearchSection.append(listItemFour)
        recentSearchSection.append(listItemFive)
    })



}

// function clearBox(recentSearchSection)
// {
//     document.getElementById(recentSearchSection).innerHTML = "";
// }

function getForecast(city) {

    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=e43ae957e225197b143c05e62415986d"
    fetch(requestUrl)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            weatherForecast.innerHTML = "";
            console.log(data)


            //creating array of objects for for loop objectData ={List: }

            var arrayData = [data.list[10], data.list[18], data.list[26], data.list[34], data.list[39]]

            // creating divs with java to push data
            var newDiv = document.createElement("div");
            var newTemp = document.createElement('h3');
            var newHumidity = document.createElement('h3')
            var newWind = document.createElement('h3')
            var newImage = document.createElement('img')
            var newDate = document.createElement('h1')

            var newDivTwo = document.createElement("div");
            var newTempTwo = document.createElement('h3');
            var newHumidityTwo = document.createElement('h3')
            var newWindTwo = document.createElement('h3')
            var newImageTwo = document.createElement('img')
            var newDateTwo = document.createElement('h1')

            var newDivThree = document.createElement("div");
            var newTempThree = document.createElement('h3');
            var newHumidityThree = document.createElement('h3')
            var newWindThree = document.createElement('h3')
            var newImageThree = document.createElement('img')
            var newDateThree = document.createElement('h1')

            var newDivFour = document.createElement("div");
            var newTempFour = document.createElement('h3');
            var newHumidityFour = document.createElement('h3')
            var newWindFour = document.createElement('h3')
            var newImageFour = document.createElement('img')
            var newDateFour = document.createElement('h1')

            var newDivFive = document.createElement("div");
            var newTempFive = document.createElement('h3');
            var newHumidityFive = document.createElement('h3')
            var newWindFive = document.createElement('h3')
            var newImageFive = document.createElement('img')
            var newDateFive = document.createElement('h1')


            // Displays Forecast for 1 Day Out

            newDate.innerText = "Date: " + data.list[4].dt_txt;
            newTemp.innerText = "Temp: " + data.list[4].main.temp;
            newHumidity.innerText = "Humidity: " + data.list[4].main.humidity;
            newWind.innerText = "Wind Speed: " + data.list[4].wind.speed;
            newImage.src = " http://openweathermap.org/img/wn/" + data.list[4].weather[0].icon + "@2x.png"


            // Displays Forecast for 2 Days Out

            newDateTwo.innerText = "Date: " + data.list[10].dt_txt;
            newTempTwo.innerText = "Temp: " + data.list[10].main.temp;
            newHumidityTwo.innerText = "Humidity: " + data.list[10].main.humidity;
            newWindTwo.innerText = "Wind Speed: " + data.list[10].wind.speed;
            newImageTwo.src = " http://openweathermap.org/img/wn/" + data.list[10].weather[0].icon + "@2x.png"

            // Displays Forecast for 3 Days Out

            newDateThree.innerText = "Date: " + data.list[18].dt_txt;
            newTempThree.innerText = "Temp: " + data.list[18].main.temp;
            newHumidityThree.innerText = "Humidity: " + data.list[18].main.humidity;
            newWindThree.innerText = "Wind Speed: " + data.list[18].wind.speed;
            newImageThree.src = " http://openweathermap.org/img/wn/" + data.list[18].weather[0].icon + "@2x.png"


            // Displays Forecast for 4 Days Out

            newDateFour.innerText = "Date: " + data.list[26].dt_txt;
            newTempFour.innerText = "Temp: " + data.list[26].main.temp;
            newHumidityFour.innerText = "Humidity: " + data.list[26].main.humidity;
            newWindFour.innerText = "Wind Speed: " + data.list[26].wind.speed;
            newImageFour.src = " http://openweathermap.org/img/wn/" + data.list[26].weather[0].icon + "@2x.png"



            // Displays Forecast for 5 Days Out


            newDateFive.innerText = "Date: " + data.list[34].dt_txt;
            newTempFive.innerText = "Temp: " + data.list[34].main.temp;
            newHumidityFive.innerText = "Humidity: " + data.list[34].main.humidity;
            newWindFive.innerText = "Wind Speed: " + data.list[34].wind.speed;
            newImageFive.src = " http://openweathermap.org/img/wn/" + data.list[34].weather[0].icon + "@2x.png"
            data.list[39]

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

