document.addEventListener('DOMContentLoaded', function() {
  const sbmtBtn = document.getElementById('sbmt-btn');

  sbmtBtn.addEventListener('click', submitForm);
});

async function submitForm(event) {
  event.preventDefault();

  const input = document.getElementById('location-input');

  const location = input.value;

  const forecast = await getWeatherForecast(location);
  console.log(forecast);
  updatePage(forecast);
}

async function getWeatherForecast(location) {
  return await fetch(`/weather-forecast?location=${location}`)
    .then(function(res) {
      return res.json();
    })
    .then(function(body) {
      return body;
    });
}

function updatePage(forecast) {
  const resultDiv = document.getElementById('weather-result');
  const errorMessage = document.getElementById('error-message');

  if (forecast.place_name === undefined || forecast.error) {
    resultDiv.style.setProperty('display', 'none');
    errorMessage.style.removeProperty('display');
  } else {
    errorMessage.style.setProperty('display', 'none');

    const icons = document.getElementsByClassName('icon');

    // Show the appropriate icon
    for (let i = 0; i < icons.length; i++) {
      if (icons[i].id === forecast.icon) {
        icons[i].style.removeProperty('display');
      } else {
        icons[i].style.removeProperty('display');
        icons[i].style.setProperty('display', 'none');
      }
    }

    document.getElementById('location-name').innerText = forecast.place_name;
    document.getElementById('summary').innerText = forecast.summary;
    document.getElementById('temperature').innerText = forecast.temperature;
    document.getElementById('wind-speed').innerText = forecast.windSpeed;
    document.getElementById('wind-gust').innerText = forecast.windGust;

    resultDiv.style.removeProperty('display');
  }
}
