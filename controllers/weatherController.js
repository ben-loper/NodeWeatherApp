const geocoder = require(__dirname + '../../DAO/geocoder');
const weatherForecaster = require(__dirname + '../../DAO/weatherForecaster');

exports.index = function(req, res) {
  res.render('index');
};

exports.getWeatherForecastForLocation = async function(req, res) {
  const location = req.query.location;

  // Verify location has been passed in
  if (location === '' || location === undefined || location === null) {
    res.statusCode = 400;
    res.statusMessage = 'Location is required';
    res.send({ error: res.statusMessage });
  } else {
    try {
      // Geocode the location
      const geocode = await geocoder.geocodeLocation(location);

      // Get weather forecast for the geocode returned from geocoding call
      const weatherForecast = await weatherForecaster.getWeatherForecastByGeocode(
        geocode.lat,
        geocode.long
      );

      res.send({
        place_name: geocode.place_name,
        summary: weatherForecast.summary,
        icon: weatherForecast.icon,
        temperature: weatherForecast.temperature,
        windSpeed: weatherForecast.windSpeed,
        windGust: weatherForecast.windGust
      });
    } catch (error) {
      res.statusCode = 400;
      res.statusMessage = 'Error while retrieving weather forecast';
      res.send({ error: error.message });
    }
  }
};
