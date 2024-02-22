const opencage = require("opencage-api-client");

async function geocoder(address) {
  try {
    const response = await opencage.geocode({
      q: address,
      key: process.env.OPENCAGE_API_KEY,
    });
    if (response.status.code === 200 && response.results.length > 0) {
      const result = response.results[0];
      return {
        latitude: result.geometry.lat,
        longitude: result.geometry.lng,
        formattedAddress: result.formatted,
        street: result.components.road,
        city: result.components.city,
        state: result.components.state,
        zipcode: result.components.postcode,
        country: result.components.country,
      };
    } else {
      throw new Error("Invalid Address");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = geocoder;
