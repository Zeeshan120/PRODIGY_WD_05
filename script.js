const apiKey = "90e0a7f8776b110d1dd40cc597412055"; // Replace with your OpenWeatherMap API key

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const locBtn = document.getElementById("locBtn");
const weatherCard = document.getElementById("weatherInfo");

const locationEl = document.getElementById("location");
const descriptionEl = document.getElementById("description");
const tempEl = document.getElementById("temperature");
const detailsEl = document.getElementById("details");

// Fetch weather by city name
function getWeatherByCity(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) throw new Error("City not found");
            return response.json();
        })
        .then(data => displayWeather(data))
        .catch(error => alert(error.message));
}

// Fetch weather by coordinates
function getWeatherByCoords(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(() => alert("Unable to get weather data"));
}

// Display weather data
function displayWeather(data) {
    locationEl.textContent = `${data.name}, ${data.sys.country}`;
    descriptionEl.textContent = data.weather[0].description;
    tempEl.textContent = `${Math.round(data.main.temp)}°C`;
    detailsEl.textContent = `Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s`;

    weatherCard.classList.remove("hidden");
}

// Event listeners
searchBtn.addEventListener("click", () => {
    if (cityInput.value.trim() !== "") {
        getWeatherByCity(cityInput.value);
    }
});

locBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                getWeatherByCoords(position.coords.latitude, position.coords.longitude);
            },
            () => alert("Location access denied")
        );
    } else {
        alert("Geolocation not supported by this browser.");
    }
});
