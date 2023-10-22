import {APIKEY} from "./apiKey.js";

const URL = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${APIKEY}` 

//Select the container
const container = document.getElementById('container');
const todaysWeather = document.getElementById('todays-weather');
const weatherForecast = document.getElementById('weather-forecast');

const callApi = () => 
    fetch(URL)
    .then((response) => {
        if(!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json(); //Parse response as JSON
    })
    .then((data) => {
        //round temperature to 1 decimal 
        let temp = data.main.temp.toFixed(1);

        todaysWeather.innerHTML = `
        <h1>${temp}</h1>
        <h3>${data.name}</h3>
        <p>${data.weather[0].description}</p>
        `
        console.log("data: " + data);
    })
    .catch((error) => {
        //Handle errors, such as network issues or invalid responses
        container.innerHTML = error;
        console.error("Fetch error:", error);
    });

callApi();