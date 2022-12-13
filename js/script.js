const weatherApi = "https://api.openweathermap.org/data/2.5/forecast?"
const apiKey = "&appid=823a370fc2fa4cfdd918f24dc80857d7"

function getWeather(lat, lon) {
    fetch(weatherApi + "lat=" + lat + "&lon=" + lon + apiKey)
    .then(response => response.json)
    .then(result => {
        console.log(result)
    })
}

// getWeather(72, 4);