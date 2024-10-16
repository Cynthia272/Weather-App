let isCelsius = true;

document.getElementById('search-btn').addEventListener('click', getWeather);
document.getElementById('toggle-btn').addEventListener('click', toggleTemperatureUnit);

async function getWeather() {
    const city = document.getElementById('city-input').value;
    const apiKey = '7f6b7f48254b9ddba1b81caa9669ac47';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weather-output').innerText = error.message;
        document.getElementById('humidity-output').innerHTML = '';
        document.getElementById('wind-speed-output').innerHTML = '';
    }
}

function displayWeather(data) {
    const temp = data.main.temp;
    const weatherCondition = data.weather[0].main.toLowerCase();
    const weatherImages = {
        clear: 'clear.png',
        clouds: 'clouds.png',
        drizzle: 'drizzle.png',
        mist: 'mist.png',
        rain: 'rain.png',
        snow: 'snow.png'
    };
    const weatherImage = weatherImages[weatherCondition] || 'default.png';

    document.getElementById('weather-output').innerHTML = `
        <h2>${data.name}</h2>
        <p id="temperature">${temp}°C</p>
        <img src="images/${weatherImage}" alt="${weatherCondition}" class="weather-icon">
    `;
    document.getElementById('humidity-output').innerHTML = `
        Humidity: ${data.main.humidity}% <img src="images/humidity.png" alt="Humidity">
    `;
    document.getElementById('wind-speed-output').innerHTML = `
        Wind Speed: ${data.wind.speed} km/h <img src="images/wind.png" alt="Wind">
    `;
    isCelsius = true;
    document.getElementById('toggle-btn').innerText = "Switch to °F";
}

function toggleTemperatureUnit() {
    const tempElem = document.getElementById('temperature');
    let temp = parseFloat(tempElem.innerText);

    if (isCelsius) {
        temp = (temp * 9 / 5) + 32;
        tempElem.innerText = `${temp.toFixed(1)}°F`;
        document.getElementById('toggle-btn').innerText = "Switch to °C";
    } else {
        temp = (temp - 32) * 5 / 9;
        tempElem.innerText = `${temp.toFixed(1)}°C`;
        document.getElementById('toggle-btn').innerText = "Switch to °F";
    }
    isCelsius = !isCelsius;
}
