const apiKey = "97b7bf3dcbfb27ce253220f95298dcf6";

const searchBtn = document.getElementById("search-btn");
const convertBtn = document.getElementById("convert-btn");
const cityInput = document.getElementById("city-input");
const weatherResult = document.getElementById("weather-result");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

let currentTempCelsius = null;
let isCelsius = true;

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city === '') return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(res => res.json())
      .then(data => {
        currentTempCelsius = data.main.temp;
        cityName.textContent = data.name + ', ' + data.sys.country;
        temperature.textContent = `Temperature: ${currentTempCelsius.toFixed(1)} °C`;
        description.textContent = `Condition: ${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;
        weatherResult.classList.remove('hidden');

        setBackground(data.weather[0].main);
      })
      .catch(err => {
        alert("City not found. Please try again.");
        weatherResult.classList.add("hidden");
      });
    });

    convertBtn.addEventListener('click', ()=>{
        if(currentTempCelsius === null) return;
        if(isCelsius){
            const fahrenheit = (currentTempCelsius * 9/5) + 32;
            temperature.textContent = `Temperature: ${fahrenheit.toFixed(1)} °F`;
            convertBtn.textContent = "Convert to °F"
        }
        isCelsius = !isCelsius;
    });

    function setBackground(condition) {
        let background;
        switch (condition.toLowerCase()) {
          case 'clear':
            background = 'linear-gradient(to top, #fceabb, #f8b500)';
            break;
          case 'clouds':
            background = 'linear-gradient(to top, #d7d2cc, #304352)';
            break;
          case 'rain':
          case 'drizzle':
            background = 'linear-gradient(to top, #4e54c8, #8f94fb)';
            break;
          case 'snow':
            background = 'linear-gradient(to top, #e6dada, #274046)';
            break;
          case 'thunderstorm':
            background = 'linear-gradient(to top, #000000, #434343)';
            break;
          default:
            background = 'linear-gradient(to top, #83a4d4, #b6fbff)';
        }
        document.body.style.background = background;
      }