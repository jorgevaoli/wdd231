// Select HTML elements
const currentTempElement = document.getElementById('current-temp');
const weatherDescElement = document.getElementById('weather-desc');
const weatherIconElement = document.getElementById('weather-icon');
const feelsLikeElement = document.getElementById('feels-like');
const humidityElement = document.getElementById('humidity');
const todayTempElement = document.getElementById('today-temp');
const tomorrowTempElement = document.getElementById('tomorrow-temp');
const dayAfterTempElement = document.getElementById('day-after-temp');

// API configuration
const lat = -12.046885225443454;
const lon = -77.0457586246971;
const apiKey = '273407765fd43f61fecdb60c426c9444';

// Current weather URL
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

// Forecast URL for 3-day forecast
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

// Asynchronous function to fetch current weather data
async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log('Current weather data:', data);
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('Error fetching current weather:', error);
    }
}

// Asynchronous function to fetch forecast data
async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            console.log('Forecast data:', data);
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

// Function to display current weather results
function displayCurrentWeather(data) {
    if (currentTempElement) {
        currentTempElement.textContent = Math.round(data.main.temp);
    }

    if (weatherDescElement) {
        weatherDescElement.textContent = data.weather[0].description;
    }

    if (weatherIconElement) {
        const iconCode = data.weather[0].icon;
        weatherIconElement.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIconElement.alt = data.weather[0].description;
    }

    if (feelsLikeElement) {
        feelsLikeElement.textContent = Math.round(data.main.feels_like);
    }

    if (humidityElement) {
        humidityElement.textContent = data.main.humidity;
    }
}

// Function to display forecast
function displayForecast(data) {
    const forecastDays = [];
    const today = new Date();

    const dailyForecasts = {};

    data.list.forEach(forecast => {
        const forecastDate = new Date(forecast.dt * 1000);
        const dateKey = forecastDate.toDateString();

        if (!dailyForecasts[dateKey]) {
            dailyForecasts[dateKey] = [];
        }
        dailyForecasts[dateKey].push(forecast);
    });

    // Get the next 3 days weather
    const dates = Object.keys(dailyForecasts).sort();

    if (todayTempElement && dates.length > 0) {
        const todayForecasts = dailyForecasts[dates[0]];
        const todayTemp = Math.round(todayForecasts[0].main.temp);
        todayTempElement.textContent = todayTemp;
    }

    if (tomorrowTempElement && dates.length > 1) {
        const tomorrowForecasts = dailyForecasts[dates[1]];
        const tomorrowTemp = Math.round(tomorrowForecasts[0].main.temp);
        tomorrowTempElement.textContent = tomorrowTemp;
    }

    if (dayAfterTempElement && dates.length > 2) {
        const dayAfterForecasts = dailyForecasts[dates[2]];
        const dayAfterTemp = Math.round(dayAfterForecasts[0].main.temp);
        dayAfterTempElement.textContent = dayAfterTemp;
    }
}

// Initialize weather data when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    apiFetch();
    fetchForecast();
});