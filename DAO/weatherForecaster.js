const fetch = require('node-fetch');

exports.getWeatherForecastByGeocode = async function(latitude, longitude) {
  return await fetch(
    `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${latitude},${longitude}?exclude=minutely&exclude=hourly&exclude=daily&exclude=flags`
  )
    .then(res => {
      if (res.status >= 400) {
        throw new Error(
          `Error while retrieving weather forecast for latitude: ${latitude} and longitude: ${longitude}`
        );
      }
      return res.json();
    })
    .then(body => {
      return {
        summary: body.currently.summary,
        icon: body.currently.icon,
        temperature: body.currently.temperature,
        windSpeed: body.currently.windSpeed,
        windGust: body.currently.windGust
      };
    })
    .catch(error => {
      throw error;
    });
};
