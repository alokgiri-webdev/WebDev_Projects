'use strict';
const apiKey = '42642a2967aa2187dbec14af011bb39b';
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=dibrugarh&appid=${apiKey}&units=metric`;
const weatherContainer = document.querySelector('.weather');
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const errorData = document.querySelector('.error');

//Reset Function
const reset = function () {
  weatherContainer.style.display = 'none';
  weatherContainer.innerHTML = ''; // Cleaning the previous data
};

//Render Data function from API
const renderWeatherData = function (data) {
  weatherContainer.innerHTML = '';
  const html = `<img src="${data.weather[0].main}.png" class="weather-icon" />
        <h1 class="temp">${+data.main.temp.toFixed('')}°C</h1>
        <h2 class="city">${data.name}</h2>
        <div class="details">
          <div class="col">
            <img src="humidity.png" />
            <div>
              <p class="humidity">${data.main.humidity}%</p>
              <p>Humidity</p>
            </div>
          </div>
          <div class="col">
            <img src="wind.png" />
            <div>
              <p class="wind">${data.wind.speed} km/hr</p>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>`;
  weatherContainer.insertAdjacentHTML('beforeend', html);
};

//CheckWeather Fucntion
const checkWeather = async function (city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      errorData.style.display = 'block';
      weatherContainer.style.display = 'none';
    } else {
      const data = await response.json();
      console.log(data);
      renderWeatherData(data);
      weatherContainer.style.display = 'block';
      errorData.style.display = 'none';
    }
  } catch (err) {
    console.error(err.message);

    throw err;
  }
};

//Executing Search
searchBtn.addEventListener('click', () => {
  reset();
  checkWeather(searchBox.value);
});
