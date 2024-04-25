let number;
let butt = document.getElementById("search-button");
let searchBar = document.getElementById("search-bar");
let lat;
let lon;
function getWeather() {
  const apiKey = "85bbc0b223323a157715f7a942b9d8c4";
  const city = searchBar.value;
  if (city != "" && city != null) {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=0&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        lat = data[0].lat;
        lon = data[0].lon;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
        )
          .then((response) => response.json())
          .then((data) => {
            document.getElementById("temp-text").textContent =
              Math.round(data.main.temp - 273.15) + "c"; // The Tempeture in Celsius :D
            document.getElementById("weatherInfo").textContent =
              data.weather[0].description; // The weather description :D
            console.log(data);
            document.getElementById(
              "weather-icon"
            ).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // The weather icon :D
            document.getElementById(
              "humidity"
            ).textContent = `Humidity: ${data.main.humidity}%`; // The humidity :D
            document.getElementById(
              "pressure"
            ).textContent = `Pressure: ${data.main.pressure}hPa`; // The pressure :D
          });
      })
      .catch((error) => alert("Please Enter Correct City name"));
  }
}

function createDiv() {
  if (number != 1 && searchBar.value != "") {
    number = 1;
    let div = document.createElement("div");
    div.style.transition = "all 0.5s ease";
    div.className = "result";
    div.innerHTML =
      "<div style='margin: auto;align-items: center;justify-content: center;display: flex;width: 100%;'><img id='weather-icon' src='./Assets/icon/dark_mode_black_24dp.svg' alt='sky' style='width: 100px; height: 100px;padding: 10px;'> <p id='temp-text' style='margin-right: 30px;font-family: roboto;font-size: x-large;font-weight: bold;'>24&degC</p> </div>" +
      "<h2 id='city-name'>City Name</h2><h3 id='weatherInfo'>Cloudy</h3>" +
      "<div id='hourlyForecastDiv' style='display: flex;overflow-x: scroll;width: 100%;'>" +
      "<div class='bot-div'><p id='humidity'>Humidity</p></div><div class='bot-div'><p id='pressure'>Pressure</p></div>" +
      "</div> </div>";

    document.getElementById("main-art").appendChild(div);
    document.getElementsByTagName("h2")[0].innerHTML =
      document.getElementById("search-bar").value;
    document.getElementById("container").style.marginTop = "10px";
  } else {
    let widget = document.getElementsByClassName("result")[0];
    widget.remove();
    number = 0;
    document.getElementById("container").style.marginTop = "150px";
  }
}
