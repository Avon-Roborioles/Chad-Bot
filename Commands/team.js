const axios = require("axios");

module.exports.run = async (client, message, args) => {
  if (!args.length) {
    return message.channel.send(
      "Please provide a team number. Example: `/teams 12345`"
    );
  }

  const teamNumber = args[0];
  const ftcApiKey = process.env.FTC_API_KEY; // make sure this is in your .env

  if (!ftcApiKey) {
    return message.channel.send(
      "FTC API Key is not configured. Please check your .env file."
    );
  }

  try {
    // call the FTC API
    const { data } = await axios.get(
      `https://ftc-api.firstinspires.org/v2.0/2024/teams?teamNumber=${teamNumber}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(ftcApiKey).toString("base64")}`,
          Accept: "application/json",
        },
      }
    );

    const team = data.teams?.[0];
    if (!team) {
      return message.channel.send(`No data found for FTC Team ${teamNumber}.`);
    }

    const teamName =
      team.name ||
      team.teamName ||
      team.nickname ||
      team.teamNickname ||
      "Unknown Team Name";
    // extract and normalize
    const lines = [];
    // always have the header
    lines.push(
      `ðŸ¤– **FTC Team ${team.teamNumber} â€“ ${team.name || "Unknown Team Name"}**`
    );

    // school
    if (team.schoolName && team.schoolName.trim() !== "") {
      lines.push(`ðŸ« **School:** ${team.schoolName}`);
    }

    // location (city, state, country)
    const parts = [
      team.city?.trim(),
      team.stateProv?.trim(),
      team.country?.trim(),
    ].filter((s) => s && s !== "");
    if (parts.length) {
      lines.push(`ðŸ“ **Location:** ${parts.join(", ")}`);
    }

    // rookie year
    if (team.rookieYear) {
      lines.push(`ðŸ“… **Rookie Year:** ${team.rookieYear}`);
    }

    // awards count (if zero is meaningful, still show it)
    if (typeof team.awardsCount === "number") {
      lines.push(`ðŸ† **Awards Count:** ${team.awardsCount}`);
    }

    // send only the lines that passed the above checks
    await message.channel.send(lines.join("\n"));

  } catch (err) {
    console.error("Error fetching FTC data:", err.response?.data || err);
    return message.channel.send(
      "Error fetching FTC team data. Please try again later."
    );
  }
};

module.exports.help = {
  name: "teams",
  description: "Get information about an FTC robotics team using the FIRST API.",
  usage: "/teams <teamNumber>",
};

