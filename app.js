document.addEventListener('DOMContentLoaded', loadLastWeather);
document.getElementById('weatherForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    let cityInput = document.getElementById('cityInput').value;
    let API = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=de94f32766c0a65e09d36639e42cc1de&units=metric`;

    if (cityInput !== '') {
        try {
            let response = await fetch(API);
            let data = await response.json();

            if (data.cod === 200) {
                displayWeatherData(data);
                localStorage.setItem('lastCity', cityInput);
                localStorage.setItem('temp', data.main.temp);
                localStorage.setItem('humidity', data.main.humidity);
                localStorage.setItem('description', data.weather[0].description);
            } else {
                document.getElementById('weatherData').textContent = 'City not found';
                console.log('City not found');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    } else {
        console.log('Please enter a city name');
    }
});

function loadLastWeather() {
    let lastCity = localStorage.getItem('lastCity');
    let temp = localStorage.getItem('temp');
    let humidity = localStorage.getItem('humidity');
    let description = localStorage.getItem('description');

    if (lastCity && temp && humidity && description) {
        document.getElementById('weatherData').innerHTML = `
            <h2>${lastCity}</h2>
            <p>Temperature: ${temp} °C</p>
            <p>Humidity: ${humidity} %</p>
            <p>Description: ${description}</p>
        `;
    }
}

function displayWeatherData(data) {
    document.getElementById('weatherData').innerHTML = `
        <h2>${data.name}</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity} %</p>
        <p>Description: ${data.weather[0].description}</p>
    `;
}
