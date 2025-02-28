const axios = require("axios");

module.exports.run = async (client, message, args) => {
    if (!args.length) {
        return message.channel.send("❌ Please provide a location. Example: `/weather Seattle, WA`");
    }

    const location = args.join(" ");

    try {
        // 1️⃣ Convert city/state to lat/lon using Open-Meteo
        const geoResponse = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
            params: { name: location, count: 5, format: "json" }
        });

        if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
            return message.channel.send("❌ Location not found. Try a different city and state.");
        }

        // Find the first result that is in the U.S.
        const place = geoResponse.data.results.find(entry => entry.country === "United States");

        if (!place) {
            return message.channel.send("❌ No U.S. locations found.");
        }

        const { latitude, longitude, name, admin1 } = place;

        // 2️⃣ Get the forecast URL from the NWS API
        const nwsResponse = await axios.get(`https://api.weather.gov/points/${latitude},${longitude}`);
        
        if (!nwsResponse.data.properties.forecast) {
            console.error("NWS API Response:", nwsResponse.data);
            return message.channel.send("❌ NWS API error: No forecast data available.");
        }

        const forecastUrl = nwsResponse.data.properties.forecast;

        // 3️⃣ Get the weather forecast
        const forecastResponse = await axios.get(forecastUrl);
        const forecast = forecastResponse.data.properties.periods[0];

        // 4️⃣ Send the weather info to Discord
        const weatherMessage = `🌍 **Weather for ${name}, ${admin1}:**
🌡️ **Temperature**: ${forecast.temperature}°F
☁️ **Condition**: ${forecast.shortForecast}
🌬️ **Wind**: ${forecast.windSpeed} ${forecast.windDirection}`;

        message.channel.send(weatherMessage);

    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        message.channel.send("❌ Error fetching weather data. Try again later.");
    }
};