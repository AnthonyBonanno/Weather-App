var inputSearcher = document.querySelector('#city-search')
var searchButton = document.querySelector('#city-call')
var forecast = document.querySelector('#display-forecast')
var weatherToday = document.querySelector('#display-current-weather')
var savedCities = document.querySelector('#saved-cities')

var APIKey = '588a1fc5e1a8fe84e7a029e9f595566c'

searchButton.addEventListener('click', function () {
    getWeather(inputSearcher.value);
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

function getWeather(cityName) {

    clearContent();

    var requestUrlCity = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIKey}`

    // fetches the API containing city names
    fetch(requestUrlCity)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            
            var requestUrlLat = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${APIKey}&units=metric`
            // fetches the API containing the info for latitude and longnitude for the city name fetched by the previous fetch
            fetch(requestUrlLat) 
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // now data contains weather etc
                checkStorage(cityName);
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

function clearContent() {
    forecast.innerHTML = "";
    weatherToday.innerHTML = "";
}

function handleButtonClick(event) {
    // event.target
    // event.currentTarget
    var element = event.target;
    var citySavedName = element.textContent;
    getWeather(citySavedName)
}

savedCities.addEventListener('click', handleButtonClick)


function checkStorage(city) {
    // In the following line storage must store either the array from local storage if it exists OTHERWISE an empty array
    const storage = JSON.parse(localStorage.getItem('searchedCity')) ? JSON.parse(localStorage.getItem('searchedCity')) : [];
    if (!storage.includes(city)) {
        addToStorage('searchedCity', storage, city)
    }
    createStorageButton(city);
}

function addToStorage(key, array, item) {
    array.push(item);
    localStorage.setItem(key, JSON.stringify(array));
}

function createStorageButton(buttonText) {
    var storageButton = document.createElement('button');
    storageButton.textContent = buttonText;
    savedCities.append(storageButton);
}

var storage = JSON.parse(localStorage.getItem('searchedCity'));

for (let i=0; i<storage.length; i++) {
    var storageButton = document.createElement('button');
    storageButton.textContent = storage[i];
    savedCities.append(storageButton);
}