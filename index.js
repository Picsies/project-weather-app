import {APIKEY} from "./apiKey.js";

const URL = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${APIKEY}`; 
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${APIKEY}`;

//Select the container
const container = document.getElementById('container');
const todaysWeather = document.getElementById('todays-weather');
const weatherForecast = document.getElementById('weather-forecast');
const weatherIcon = document.getElementById('weather-icon');
const weatherText = document.getElementById('weather-text');

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

        // Convert milliseconds to hour and minutes
        let sunrise = new Date (data.sys.sunrise * 1000).toLocaleTimeString(
            "sv-SE",{hour: "2-digit", minute: "2-digit"});
        let sunset = new Date (data.sys.sunset * 1000).toLocaleTimeString(
                "sv-SE",{hour: "2-digit", minute: "2-digit"});        

        todaysWeather.innerHTML = `
        <p>${data.weather[0].main} | ${temp}&deg;</p>
        <p>sunrise ${sunrise}</p>
        <p>sunset ${sunset}</p>`
 
        let weatherCondition = data.weather[0].main;

        switch(weatherCondition) {
            case "Clear":
                weatherIcon.innerHTML = `<img src="design/design2/icons/noun_Sunglasses_2055147.svg" alt="Weather Icon">`
                weatherText.innerHTML = `<p>Get your sunnies on. ${data.name} is looking rather great today.</p>`
                break;    
            case "Clouds":
                weatherIcon.innerHTML = `<img src="design/design2/icons/noun_Cloud_1188486.svg" alt="Weather Icon">`
                weatherText.innerHTML = `<p>Light a fire and get Cosy. ${data.name} is looking grey today.</p>`
                break;
            case "Rain":
            case "Drizzle":
                weatherIcon.innerHTML = `<img src="design/design2/icons/noun_Umbrella_2030530.svg" alt="Weather Icon">`
                weatherText.innerHTML = `<p>Don't forget your umbrella. \nIt's wet in ${data.name} today.</p> `   
                break;
            default:
                weatherIcon.innerHTML = "";
                weatherText.innerHTML = `<p>It's ${weatherCondition} in ${data.name} today.</p>`
        }

        console.log("data: " + data);
    })
    .catch((error) => {
        //Handle errors, such as network issues or invalid responses
        container.innerHTML = error;
        console.error("Fetch error:", error);
    });

    fetch(forecastURL)
    .then((response) => {
        if(!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json(); //Parse response as JSON
    })
    .then((data) => {
        
        const dailyForecasts = data.list.filter((item) => 
            item.dt_txt.includes("12:00:00"));
        
        dailyForecasts.forEach((forecast) => {
            const date = new Date(forecast.dt *1000);
            const day = date.toLocaleDateString("en-US", {weekday: "short"});
            const temp = forecast.main.temp.toFixed(1);
            const forecastItem = `<div class="forecast-item"><p>${day}</p><p>${temp}&deg;</p></div>`;
            weatherForecast.innerHTML += forecastItem;
            console.log(data.list.dt)
        })
    })
    .catch((error) => {
        //Handle errors, such as network issues or invalid responses
        container.innerHTML = error;
        console.error("Fetching forecast error:", error);
    });   
callApi();