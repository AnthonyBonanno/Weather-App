var inputSearcher = document.querySelector('#city-search')
var searchButton = document.querySelector('#city-call')
var forcast = document.querySelector('#display-forecast')
var weatherToday = document.querySelector('#display-current-weather')
var savedCities = document.querySelector('#saved-cities')

var APIKey = '588a1fc5e1a8fe84e7a029e9f595566c'

searchButton.addEventListener('click', function () {

    var cityName = inputSearcher.value
    
    var requestUrlCity = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIKey}`

    // Refactored the fetch in to its own functions
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
                console.log(data.list[2].main.temp)
                console.log(data.list[2].weather[0].icon)
                // now contains weather etc
                // 4th element is noon 
                //
                for (let i=2; i < data.list.length; i++) {
                    console.log(data.list[i].dt_txt)
                    var allHours = data.list[i].dt_txt.slice(11,13);
                    console.log(allHours);

                     if (i == 2) {

                        var twelvePMHourDate = document.createElement('li')
                        var twelvePMHourCityName = document.createElement('li')
                        var twelvePMHourTemp = document.createElement('li')
                        var twelvePMHourWind = document.createElement('li')
                        var twelvePMHourIcon = document.createElement('img')
                        var twelvePMHourHumidity = document.createElement('li')
                        console.log(data)
                    
                        twelvePMHourCityName.textContent = data.city.name
                        twelvePMHourDate.textContent = data.list[i].dt_txt
                        twelvePMHourTemp.textContent = data.list[i].main.temp
                        twelvePMHourWind.textContent = data.list[i].wind.speed
                        twelvePMHourHumidity.textContent = data.list[i].main.humidity

                        twelvePMHourIcon.setAttribute('src', `https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`)

                        weatherToday.append(twelvePMHourCityName, twelvePMHourDate, twelvePMHourTemp, twelvePMHourWind, twelvePMHourIcon, twelvePMHourHumidity)
                    }
                    else if (allHours == 12) {
                        renderForcast(data.list[i])
                    }
                }
            })
        });
});



// forcastWeatherData is equal to data.list[i]
function renderForcast(forcastWeatherData) {
    var twelvePMHourDate = document.createElement('li')
    var twelvePMHourTemp = document.createElement('li')
    var twelvePMHourWind = document.createElement('li')
    var twelvePMHourIcon = document.createElement('img')
    var twelvePMHourHumidity = document.createElement('li')

    twelvePMHourDate.textContent = forcastWeatherData.dt_txt
    twelvePMHourTemp.textContent = forcastWeatherData.main.temp
    twelvePMHourWind.textContent = forcastWeatherData.wind.speed
    twelvePMHourHumidity = forcastWeatherData.main.humidity

    twelvePMHourIcon.setAttribute('src', `https://openweathermap.org/img/wn/${forcastWeatherData.weather[0].icon}@2x.png`)

    forcast.append(twelvePMHourDate, twelvePMHourTemp, twelvePMHourWind, twelvePMHourIcon, twelvePMHourHumidity)
}

function handleFormSubmission(event) {
    event.preventDefault();

    var searchedCity = {
        city: document.getElementById('saved-cities').value,
    };

    localStorage.setItem('searchedCity', JSON.stringify(searchedCity));

    console.log(searchedCity);

    document.getElementById('city-search').addEventListener('submit', handleFormSubmission);

    var savedSearchedCity = localStorage.getItem('searchedCity');
    if (savedSearchedCity) {
      var parsedSearchedCity = JSON.parse(savedSearchedCity);
      document.getElementById('city-search').value = parsedSearchedCity;
    };
    console.log(savedSearchedCity)
};

// function getCity() {
//     for (let i = 9; i < 18; i++) {
//         var xxx = localStorage.getItem(i);
//         if (xxx) {
//             $('#hour-' + i + ' .description').val(xxx);
//             console.log(i)
//         }
//     }
// };