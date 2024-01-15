var inputSearcher = document.querySelector('#city-search')
var searchButton = document.querySelector('#city-call')
var forcast = document.querySelector('#display-next-4-days')

var APIKey = '588a1fc5e1a8fe84e7a029e9f595566c'

var weatherArray = [1,9,17,25,33]

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
                for (let i=0; i < data.list.length; i++) {
                    //console.log(data.list[i].dt_txt)
                    var allHours = data.list[i].dt_txt.slice(11,13);
                    //console.log(allHours);

                    if(allHours === '12') {
                        var twelvePMHourTemp = document.createElement('li')
                        var twelvePMHourWind = document.createElement('li')

                        twelvePMHourTemp.textContent = data.list[i].main.temp
                        twelvePMHourWind.textContent = data.list[i].wind.speed
                        console.log(allHours)
                        forcast.append(twelvePMHourTemp, twelvePMHourWind)
                    }
                }
            })
        });

});

function printForcast(data) {
    console.log("Data:", data);

    var forcastWeather = $('#display-next-4-days');

    forcastWeather.empty();

    // refer the below line to object fetched from the API
    var mainTemp = data.items[0].volumeInfo.title

    var mainIcon = $('<li>').text(`Temp: ${data.items[0].volumeInfo.publisher}`);

    forcastWeather.append(mainTemp, mainIcon);
}

function printWeather(data) {
    console.log("Data:", data);

    var currentWeather = $('#display-current-weather');

    currentWeather.empty();

    // refer the below line to object fetched from the API
    var mainTemp = data.items[0].volumeInfo.title

    var mainIcon = $('<li>').text(`Temp: ${data.items[0].volumeInfo.publisher}`);

    currentWeather.append(mainTemp, mainIcon);
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