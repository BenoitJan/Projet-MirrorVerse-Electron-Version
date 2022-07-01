const showFinal = document.getElementById("weather-body");
const _process = process;
_process.env.GOOLE_API_KEY = "AIzaSyCHHOycYADJY0ZhPjDshAOQW92pjbqVkAw";

function initMap() {
  if (navigator.geolocation) {
    console.log(_process.env.GOOLE_API_KEY);
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log(
      "Your location isn't available to us and we cannot show weather data"
    );
  }

  function showPosition(positions) {
    var lat = positions.coords.latitude;
    var long = positions.coords.longitude;
    arrangeApi(lat, long);
  }
}

function arrangeApi(latitude, longitude) {
  const apiKey = "00ea48f43dc03ba8f38e876121ef0f7b";
  const firstHalfApi = "https://api.openweathermap.org/data/2.5/weather?lat=";
  const secondHalfApi = "&lon=";
  const thirdHalfApi = "&appid=";
  const fullAPI =
    firstHalfApi + latitude + secondHalfApi + longitude + thirdHalfApi + apiKey;
  retData(fullAPI);
}

async function retData(fullAPi) {
  const apiUrlData = await fetch(fullAPi);
  const DataApi = await apiUrlData.json();
  showData(DataApi);
}

function showData(DataWeather) {
  const { main, wind, sys } = DataWeather;
  var finalTemp = parseInt(main.feels_like - 273.15);

  var imageIcon = DataWeather.weather[0].icon;

  var sunriseTime = sunrise(sys.sunrise);
  var sunsetTime = sunset(sys.sunset);

  showFinal.innerHTML = `
    <div class="city-name">
        <h3>${DataWeather.name}</h3>
        </div>
        <div class="weather-icon">
        <img src="http://openweathermap.org/img/wn/${imageIcon}@2x.png" alt="">
        </div>
        <div class="weather-main">
        <h3>${DataWeather.weather[0].main}</h3>
        </div>
        <div class="weather-data">
        <h3>${finalTemp}<sup>&#176</sup>C</h3>
        </div>
        <div class="weather-description">
        <h3>${DataWeather.weather[0].description}</h3>
        </div>
        <div class="weather-wind">
        <h3>Wind-Speed - ${wind.speed}</h3>
        </div>
        <div class="weather-sunrise">
        <h4>Sunrise - ${sunriseTime}</h4>
        </div>
        <div class="weather-sunset">
        <h4>Sunset - ${sunsetTime}</h4>
        </div>
    `;
}

function sunrise(datae) {
  var date = new Date(datae * 1000);
  var timestr = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // console.log(timestr);
  return timestr;
}

function sunset(dat) {
  var date = new Date(dat * 1000);
  var timestr = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  //console.log(timestr);
  return timestr;
}

//Transition to page | Fade animation
window.transitionToPage = function (href) {
  document.querySelector("body").style.opacity = 0;
  setTimeout(function () {
    window.location.href = href;
  }, 500);
};

document.addEventListener("DOMContentLoaded", function (event) {
  document.querySelector("body").style.opacity = 1;
});

// CURSOR CUSTOMIZATION
let innerCursor = document.querySelector(".inner-cursor");
let outerCursor = document.querySelector(".outer-cursor");

document.addEventListener("mousemove", moveCursor);

function moveCursor(e) {
  let x = e.clientX;
  let y = e.clientY;

  innerCursor.style.left = `${x}px`;
  innerCursor.style.top = `${y}px`;
  outerCursor.style.left = `${x}px`;
  outerCursor.style.top = `${y}px`;
}

let links = Array.from(document.querySelectorAll("button"));

console.log(links);

links.forEach((link) => {
  link.addEventListener("mouseover", () => {
    innerCursor.classList.add("grow");
  });
  link.addEventListener("mouseleave", () => {
    innerCursor.classList.remove("grow");
  });
});
