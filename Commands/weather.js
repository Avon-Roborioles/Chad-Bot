const axios = require("axios");

module.exports.run = async (client, message, args) => {
    if (!args.length) {
        return message.channel.send("âŒ Please provide a location. Example: `/weather Seattle, WA`");
    }

    const location = args.join(" ");

    // Inform the user that the weather data is being fetched
    const loadingMessage = await message.channel.send(`ðŸ”„ Fetching weather information for **${location}**...`);

    try {
        // 1ï¸âƒ£ Convert city/state to lat/lon using Open-Meteo
        const geoResponse = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
            params: { name: location, count: 5, format: "json" }
        });

        if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
            return message.channel.send("âŒ Location not found. Try a different city and state.");
        }

        // Find the first result that is in the U.S.
        const place = geoResponse.data.results.find(entry => entry.country === "United States");

        if (!place) {
            return message.channel.send("âŒ No U.S. locations found.");
        }

        const { latitude, longitude, name, admin1 } = place;

        // 2ï¸âƒ£ Get the forecast URL from the NWS API
        const nwsResponse = await axios.get(`https://api.weather.gov/points/${latitude},${longitude}`);
        
        if (!nwsResponse.data.properties.forecast) {
            console.error("NWS API Response:", nwsResponse.data);
            return message.channel.send("âŒ NWS API error: No forecast data available.");
        }

        const forecastUrl = nwsResponse.data.properties.forecast;

        // 3ï¸âƒ£ Get the weather forecast
        const forecastResponse = await axios.get(forecastUrl);
        const forecast = forecastResponse.data.properties.periods[0];

        // 4ï¸âƒ£ Send the weather info to Discord
        const weatherMessage = `ðŸŒ **Weather for ${name}, ${admin1}:**
ðŸŒ¡ï¸ ** High Temperature Today**: ${forecast.temperature}Â°F
â˜ï¸ **Condition**: ${forecast.shortForecast}
ðŸŒ¬ï¸ **Wind**: ${forecast.windSpeed} ${forecast.windDirection}`;

        // 5ï¸âƒ£ Check for severe weather alerts
        const alertsResponse = await axios.get(`https://api.weather.gov/alerts/active?area=${place.stateCode}`);
        const alerts = alertsResponse.data.features;

        if (alerts.length > 0) {
            let alertsMessage = `âš ï¸ **Severe Weather Alerts:**`;
            alerts.forEach(alert => {
                const alertInfo = alert.properties;
                alertsMessage += `
**${alertInfo.headline}**
Severity: ${alertInfo.severity}
Effective: ${new Date(alertInfo.effective).toLocaleString()}
Expires: ${new Date(alertInfo.expires).toLocaleString()}
Description: ${alertInfo.description}`;
            });
            message.channel.send(weatherMessage + "\n" + alertsMessage);
        } else {
            message.channel.send(weatherMessage + "\nNo active severe weather alerts for this location.");
        }

        // Delete the loading message
        loadingMessage.delete();

    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        message.channel.send("âŒ Error fetching weather data. Try again later.");
        loadingMessage.delete();
    }
};