const weatherApi = "https://api.openweathermap.org/data/2.5/forecast?"
const geoApi = "http://api.openweathermap.org/geo/1.0/direct?"
const apiKey = "&appid=823a370fc2fa4cfdd918f24dc80857d7"

let searchHistory = JSON.parse(localStorage.getItem("searchHist")) ?? [];
let curCard;
let searchVal;

const fiveDayCards = document.getElementsByClassName("forecast-card");
const searchInput = document.getElementById("city-search");
const historyCard = document.getElementById("search-history");
const searchOutput = document.getElementById("search-output-container");

function getWeather(city) {
    fetch(weatherApi + "units=imperial&q=" + city + apiKey)
        .then(response => response.json())
        .then(result => {
            console.table(result)
            if (result.cod != 404) { //if city exists
                
                city = city.toUpperCase();
                if (!searchHistory.includes(city)) {
                    searchHistory.push(city);
                    localStorage.setItem("searchHist", JSON.stringify(searchHistory));
                    historyCard.innerHTML = "";
                    displayHistory();
                }

                //Add current day in big section

                let todayOutEls = document.getElementsByClassName("search-today-output");
                console.log(todayOutEls)

                todayOutEls[0].innerHTML = "<p> Today, " + (result.list[3].dt_txt).substring(0, 10) + "</p>";
                todayOutEls[1].innerHTML = "<img class='weather-icon' src='http://openweathermap.org/img/wn/" + result.list[3].weather[0].icon + "@2x.png'></img>";
                todayOutEls[2].innerHTML = "<p> Temp: " + result.list[3].main.temp + " F </p>"
                todayOutEls[3].innerHTML = "<p> Humidity: " + result.list[3].main.humidity + "% </p>"
                todayOutEls[4].innerHTML = "<p> Wind: " + result.list[3].wind.speed + "% </p>"

                curCard = 0;

                //every 8th result is noon of each day
                for (let i = 3; i < 36; i += 8) {
                    let output = "";
                    output += "<p> Date: " + (result.list[i].dt_txt).substring(0, 10) + "</p>"; //split("-").reverse().join("-")
                    output += "<p> Temp: " + result.list[i].main.temp + " F </p>" //: temp in farenheit
                    output += "<p> Humidity: " + result.list[i].main.humidity + "% </p>"
                    output += "<p> Wind: " + result.list[i].wind.speed + "% </p>"
                    output += "<img class='weather-icon' src='http://openweathermap.org/img/wn/" + result.list[i].weather[0].icon + "@2x.png'></img>"
                    fiveDayCards[curCard].innerHTML = output;
                    curCard++; //increment the card
                }
            } else {
                //City not found
            }
        })
}

function displayHistory() {
    // let output = "";
    // searchHistory.forEach(city => {
    //     output += "<p class='history-item' onclick=getWeather('" + city + "')>" + city + "</p>";
    // })
    // historyCard.innerHTML = output;
    historyCard.innerHTML = "";
    searchHistory.forEach(city => {
        let historyItem = document.createElement("p");
        historyItem.textContent = city;
        historyItem.id = city;
        historyItem.className = 'history-item py-1 my-2';
        historyCard.append(historyItem)
    })
}

searchInput.addEventListener("keydown", e => {
    if (e.code === "Enter") {
        searchVal = searchInput.value ?? "";
        getWeather(searchVal);
        searchInput.value = "";
    }
})

historyCard.addEventListener("click", e => {
    if (e.target.id) {
        getWeather(e.target.id);
    }
})


// function main() {
//     localStorage.clear()
// }

// main();
displayHistory();