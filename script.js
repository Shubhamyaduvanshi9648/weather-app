const apiKey = '360443e6d5f23784b1b5b48b233d28ed'; // <-- Replace this with your own OpenWeatherMap API key

    async function getWeather() {
      const city = document.getElementById("city").value.trim();
      const weatherDiv = document.getElementById("weather");
      const errorDiv = document.getElementById("error");

      if (city === "") {
        errorDiv.textContent = "⚠️ Please enter a city name!";
        weatherDiv.style.display = "none";
        return;
      }

      errorDiv.textContent = "";

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
          throw new Error(data.message);
        }

        // Update UI
        document.getElementById("cityName").textContent = data.name;
        document.getElementById("temperature").textContent = `${data.main.temp}°C`;
        document.getElementById("details").innerHTML = `
          Condition: ${data.weather[0].description}<br>
          Humidity: ${data.main.humidity}%<br>
          Wind: ${data.wind.speed} km/h
        `;

        // Choose weather icon
        const weatherIcon = {
          Clear: "☀️",
          Clouds: "☁️",
          Rain: "🌧️",
          Snow: "❄️",
          Thunderstorm: "⚡",
          Drizzle: "🌦️",
          Mist: "🌫️"
        };

        const main = data.weather[0].main;
        document.getElementById("icon").textContent =
          weatherIcon[main] || "🌍";

        weatherDiv.style.display = "block";
      } catch (err) {
        weatherDiv.style.display = "none";
        errorDiv.textContent = "❌ City not found. Please try again.";
      }
    }