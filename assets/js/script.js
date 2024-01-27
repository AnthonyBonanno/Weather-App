var inputSearcher = document.querySelector('#city-search')
var searchButton = document.querySelector('#city-call')
var forecast = document.querySelector('#display-forecast')
var weatherToday = document.querySelector('#display-current-weather')
var savedCities = document.querySelector('#saved-cities')

var APIKey = '588a1fc5e1a8fe84e7a029e9f595566c'

searchButton.addEventListener('click', function () {
    getWeather();
});



// forcastWeatherData is equal to data.list[i]
function renderForcast(forecastWeatherData) {
    var twelvePMHourDate = document.createElement('li')
    var twelvePMHourTemp = document.createElement('li')
    var twelvePMHourWind = document.createElement('li')
    var twelvePMHourIcon = document.createElement('img')
    var twelvePMHourHumidity = document.createElement('li')

    twelvePMHourDate.textContent = forecastWeatherData.dt_txt
    twelvePMHourTemp.textContent = `Temperature: ${forecastWeatherData.main.temp}`
    twelvePMHourWind.textContent = `Wind Speed: ${forecastWeatherData.wind.speed}`
    twelvePMHourHumidity = `Humidity: ${forecastWeatherData.main.humidity}`

    twelvePMHourIcon.setAttribute('src', `https://openweathermap.org/img/wn/${forecastWeatherData.weather[0].icon}@2x.png`)

    var dayBox = document.createElement('div')
    
    dayBox.setAttribute('class', 'day-forcast-box')

    dayBox.append(twelvePMHourDate, twelvePMHourTemp, twelvePMHourWind, twelvePMHourIcon, twelvePMHourHumidity)

    forecast.append(dayBox)
}

function getWeather() {
    var cityName = inputSearcher.value
    
    var requestUrlCity = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIKey}`

    // fetches the API containing city names
    fetch(requestUrlCity)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            
            var requestUrlLat = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${APIKey}`
            // fetches the API containing the info for latitude and longnitude for the city name fetched by the previous fetch
            fetch(requestUrlLat) 
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // now data contains weather etc
                handleFormSubmission();
                // this for loop checks the full length of data provided by the API, and then uses "slice" to isolate all data from 12pm (and for 12pm only)
                for (let i=0; i < data.list.length; i++) {
                    var allHours = data.list[i].dt_txt.slice(11,13);

                     if (i == 0) {

                        var twelvePMHourDate = document.createElement('li')
                        var twelvePMHourCityName = document.createElement('li')
                        var twelvePMHourTemp = document.createElement('li')
                        var twelvePMHourWind = document.createElement('li')
                        var twelvePMHourIcon = document.createElement('img')
                        var twelvePMHourHumidity = document.createElement('li')
                        console.log(data)
                    
                        twelvePMHourCityName.textContent = data.city.name
                        twelvePMHourDate.textContent = data.list[i].dt_txt
                        twelvePMHourTemp.textContent = `Temperature: ${data.list[i].main.temp}`
                        twelvePMHourWind.textContent = `Wind Speed: ${data.list[i].wind.speed}`
                        twelvePMHourHumidity.textContent = `Humidity: ${data.list[i].main.humidity}`
                        console.log(twelvePMHourHumidity.textContent);

                        twelvePMHourIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`)

                        weatherToday.append(twelvePMHourCityName, twelvePMHourDate, twelvePMHourTemp, twelvePMHourWind, twelvePMHourIcon, twelvePMHourHumidity)
                    }
                    else if (allHours == 12) {
                        renderForcast(data.list[i])
                    }
                }
            })
        });
}

function handleFormSubmission() {

    var searchedCity = {
        city: inputSearcher.value,
    };

    localStorage.setItem('searchedCity', JSON.stringify(searchedCity));

    var storageButton = document.createElement('button');

    storageButton.textContent = searchedCity.city;

    savedCities.append(storageButton);
};