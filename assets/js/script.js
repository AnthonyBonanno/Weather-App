var inputSearcher = document.querySelector('#city-search')
var searchButton = document.querySelector('#city-call')


searchButton.addEventListener('click', function () {

    // const text = parent.querySelector('.description').value;
    // const hour = $(this).parent().attr("id").split("-")[1];

    // saveAppointment(text, hour);

    var cityName = inputSearcher.value
    
    var requestUrlCity = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=588a1fc5e1a8fe84e7a029e9f595566c`

    // TODO: Refactor the fetch in to its own functions
    fetch(requestUrlCity)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            
            var requestUrlLat = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&appid=588a1fc5e1a8fe84e7a029e9f595566c`
            //Loop over the data to generate a table, each table row will have a link to the repo url
            fetch(requestUrlLat) 
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
                console.log(data.list[3].main.temp)
                // now contains weather etc
                // data.list[1].
            })
        });

});

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