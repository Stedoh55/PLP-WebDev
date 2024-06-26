const apiKey = '6a91824d4878b16f9dc19493d02b1ba5';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');

searchButton.addEventListener('click', () =>{
    const location = locationInput.ariaValueMax;
    if (location) {
        fetchWeather(location);
    }
});

function fetchWeather(location){
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            locationElement.textContext = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}℃`;
            descriptionElement.textContent = data.weather[0].description;
        });
        .catch((error) => {
            console.error('Error fetching wether data:', error);
        });
}