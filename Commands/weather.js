const axios = require("axios");

module.exports.run = async (client, message, args) => {
  if (!args.length) {
    return message.channel.send("âŒ Please provide a location zip code. Example: `/weather 46123`");
  }

  const location = args.join(" ");
  const loadingMessage = await message.channel.send(`ðŸ” Fetching weather information for **${location}**...`);

  try {
    // 1) Geocode with Open-Meteo
    const geoRes = await axios.get("https://geocoding-api.open-meteo.com/v1/search", {
      params: { name: location, count: 5, format: "json" }
    });

    const results = geoRes.data.results;
    if (!results || results.length === 0) {
      await loadingMessage.delete().catch(() => {});
      return message.channel.send("âŒ Location not found. Try a different zip code.");
    }

    // Prefer US result, otherwise fallback to first result
    const place = results.find(r => r.country_code === "US") || results[0];
    const latitude = place.latitude;
    const longitude = place.longitude;
    const placeName = place.name || location;
    const placeAdmin = place.admin1 || "";

    // Headers required by NWS
    const nwsHeaders = {
      "User-Agent": "DiscordBot/1.0 (gboeke78@gmail.com)", // <-- REPLACE with your contact
      "Accept": "application/geo+json"
    };

    // 2) Get forecast URL from NWS
    const pointRes = await axios.get(`https://api.weather.gov/points/${latitude},${longitude}`, { headers: nwsHeaders });
    const forecastUrl = pointRes.data.properties && pointRes.data.properties.forecast;
    if (!forecastUrl) {
      console.error("NWS points response:", pointRes.data);
      await loadingMessage.delete().catch(() => {});
      return message.channel.send("âŒ NWS API error: No forecast data available for that location.");
    }

    // 3) Fetch forecast
    const forecastRes = await axios.get(forecastUrl, { headers: nwsHeaders });
    const periods = (forecastRes.data.properties && forecastRes.data.properties.periods) || [];
    const firstPeriods = periods.slice(0, 2); // today + tonight
    const forecastText = firstPeriods.length
      ? firstPeriods.map(p => `**${p.name}**: ${p.temperature}Â°${p.temperatureUnit} â€” ${p.shortForecast}`).join("\n")
      : "No forecast periods available.";

    // Send forecast
    await message.channel.send(`ðŸŒ **Weather for ${placeName}${placeAdmin ? ", " + placeAdmin : ""}:**\n${forecastText}`);

    // 4) Fetch alerts for the specific point
    const alertsRes = await axios.get(`https://api.weather.gov/alerts/active?point=${latitude},${longitude}`, { headers: nwsHeaders });
    const alerts = (alertsRes.data && alertsRes.data.features) || [];

    if (!alerts.length) {
      await message.channel.send("âœ… No active severe weather alerts for this location.");
    } else {
      await message.channel.send("âš ï¸ **Severe Weather Alerts:**");

      for (const aFeature of alerts) {
        const a = aFeature.properties || {};
        const headline = a.headline || a.event || "Weather Alert";
        const severity = a.severity || "N/A";
        const effective = a.effective ? new Date(a.effective).toLocaleString() : "N/A";
        const expires = a.expires ? new Date(a.expires).toLocaleString() : "N/A";

        // Trim description to avoid hitting Discord limits
        let description = (a.description || a.instruction || "No description available.").replace(/\r/g, "").trim();
        if (description.length > 1500) description = description.substring(0, 1500) + "... (truncated)";

        const alertMessage = `**${headline}**\nSeverity: ${severity}\nEffective: ${effective}\nExpires: ${expires}\n\n${description}`;

        await message.channel.send(alertMessage);
      }
    }
  } catch (err) {
    console.error("Weather command error:", err.response?.data || err.message || err);
    await message.channel.send("âŒ Error fetching weather data. Try again later.");
  } finally {
    try { await loadingMessage.delete(); } catch (e) { /* ignore */ }
  }
};

module.exports.help = {
  name: "weather"
};
