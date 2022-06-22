const showFinal = document.getElementById("weather-body");

function giveData() {
  if (navigator.geolocation) {
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

// process.env.GOOGLE_API_KEY = "AIzaSyCHHOycYADJY0ZhPjDshAOQW92pjbqVkAw";
