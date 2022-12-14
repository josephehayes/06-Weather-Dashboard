const weatherApi = "https://api.openweathermap.org/data/2.5/forecast?"
const geoApi = "http://api.openweathermap.org/geo/1.0/direct?"
const apiKey = "&appid=823a370fc2fa4cfdd918f24dc80857d7"

let searchHistory = JSON.parse(localStorage.getItem("searchHist")) ?? [];

function getWeather(city) {
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        console.log("Search History Added: " + city)
        localStorage.setItem("searchHist", JSON.stringify(searchHistory))
    }
    fetch(weatherApi + "units=imperial&q=" + city + apiKey)
        .then(response => response.json())
        .then(result => {
            console.table(result)
        })
}

function main() {
    localStorage.clear()
    getWeather("Jacksonville");
    getWeather("Los Angeles");
    console.log("history: ", searchHistory)
}

main();