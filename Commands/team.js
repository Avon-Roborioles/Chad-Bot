const axios = require("axios");

module.exports.run = async (client, message, args) => {
    if (!args.length) {
        return message.channel.send("Please provide a team number. Example: `/teams 12345`");
    }

    const teamNumber = args[0];
    const ftcApiKey = process.env.FTC_API_KEY; // Ensure this is set in .env

    if (!ftcApiKey) {
        return message.channel.send("FTC API Key is not configured. Please check your .env file.");
    }

    try {
        // Fetch team data from the FIRST API
        const response = await axios.get(`https://ftc-api.firstinspires.org/v2.0/2024/teams?teamNumber=${teamNumber}`, {
            headers: {
                'Authorization': `Basic ${Buffer.from(ftcApiKey).toString('base64')}`,
                'Accept': 'application/json'
            }
        });

        if (!response.data.teams || response.data.teams.length === 0) {
            return message.channel.send(`No data found for FTC Team ${teamNumber}.`);
        }

        const team = response.data.teams[0];

        // Ensure we correctly access API response fields
        const teamName = team.name || "Unknown Team Name";
        const school = team.schoolName && team.schoolName.trim() !== "" ? team.schoolName : "N/A";
        const city = team.city || "Unknown City";
        const state = team.stateProv || "Unknown State";
        const country = team.country || "Unknown Country";
        const rookieYear = team.rookieYear || "Unknown";
        const awardsCount = team.awardsCount || 0;

        // Construct the response message
        const teamInfo = `🤖 **FTC Team ${team.teamNumber} - ${teamName}**  
🏫 **School:** ${school}  
📍 **Location:** ${city}, ${state}, ${country}  
📅 **Rookie Year:** ${rookieYear}  
🏆 **Awards Count:** ${awardsCount}`;

        message.channel.send(teamInfo);

    } catch (error) {
        console.error("Error fetching FTC data:", error.response?.data || error.message);
        message.channel.send("Error fetching FTC team data. Please try again later.");
    }
};

// Command metadata for your bot's handler
module.exports.help = {
    name: "teams",
    description: "Get information about an FTC robotics team using the FIRST API.",
    usage: "/teams <teamNumber>"
};
