const fetch = require('node-fetch');

exports.geocodeLocation = async function(location) {
  const escaped_str = require('querystring').escape(location);

  return await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${escaped_str}.json?access_token=${process.env.GEOCODE_KEY}`
  )
    .then(res => {
      if (res.status >= 400) {
        throw new Error(
          `Error while retrieving geocode for location: ${location}`
        );
      }
      return res.json();
    })
    .then(body => {
      if (body.features.length < 1) {
        throw new Error(
          `Location could not be found for location: ${location}`
        );
      }
      return {
        place_name: body.features[0].place_name,
        lat: body.features[0].center[1],
        long: body.features[0].center[0]
      };
    })
    .catch(error => {
      throw error;
    });
};
