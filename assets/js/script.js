var inputSearcher = document.querySelector('#city-search')
var searchButton = document.querySelector('#city-call')
var forcast = document.querySelector('#display-next-4-days')
var weatherToday = document.querySelector('#display-current-weather')

var APIKey = '588a1fc5e1a8fe84e7a029e9f595566c'

searchButton.addEventListener('click', function () {

    // const text = parent.querySelector('.description').value;
    // const hour = $(this).parent().attr("id").split("-")[1];

    // saveAppointment(text, hour);

    var cityName = inputSearcher.value
    
    var requestUrlCity = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIKey}`

    // TODO: Refactor the fetch in to its own functions
    fetch(requestUrlCity)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            
            var requestUrlLat = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=${APIKey}`
            //Loop over the data to generate a table, each table row will have a link to the repo url
            fetch(requestUrlLat) 
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
                console.log(data.list[1].main.temp)
                console.log(data.list[1].weather[0].icon)
                // now contains weather etc
                // 4th element is noon 
                //
                for (let i=3; i < data.list.length; i++) {
                    //console.log(data.list[i].dt_txt)
                    var allHours = data.list[i].dt_txt.slice(11,13);
                    //console.log(allHours);

                     if (i == 3) {
                        renderCurrentWeather(data.list[i])
                    }
                    else if (allHours == 12) {
                        renderForcast(data.list[i])
                    }


                }
            })
        });

});

// data is now equal to data.list[i], so 
function renderCurrentWeather(currentWatherData) {
    var twelvePMHourTemp = document.createElement('li')
    var twelvePMHourWind = document.createElement('li')
    var twelvePMHourIcon = document.createElement('li')
    var twelvePMHourHumidity = document.createElement('li')

    twelvePMHourTemp.textContent = currentWatherData.main.temp
    twelvePMHourWind.textContent = currentWatherData.wind.speed
    twelvePMHourIcon = currentWatherData.weather[0].icon
    twelvePMHourHumidity = currentWatherData.main.humidity
    forcast.append(twelvePMHourTemp, twelvePMHourWind, twelvePMHourIcon, twelvePMHourHumidity)
}

function renderForcast(forcastWeatherData) {
    var twelvePMHourTemp = document.createElement('li')
    var twelvePMHourWind = document.createElement('li')
    var twelvePMHourIcon = document.createElement('li')
    var twelvePMHourHumidity = document.createElement('li')

    twelvePMHourTemp.textContent = forcastWeatherData.main.temp
    twelvePMHourWind.textContent = forcastWeatherData.wind.speed
    twelvePMHourIcon = forcastWeatherData.weather[0].icon
    twelvePMHourHumidity = forcastWeatherData.main.humidity
    forcast.append(twelvePMHourTemp, twelvePMHourWind, twelvePMHourIcon, twelvePMHourHumidity)
}

function saveCity(city) {
    localStorage.setItem(city)
};

function getCity() {
    for (let i = 9; i < 18; i++) {
        var xxx = localStorage.getItem(i);
        if (xxx) {
            $('#hour-' + i + ' .description').val(xxx);
            console.log(i)
        }
    }
};