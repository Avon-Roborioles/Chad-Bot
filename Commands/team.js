const axios = require('axios');

module.exports.run = async (client, message, args) => {
    if (!args.length) {
        return message.channel.send("Please provide a team number or event name. Example: `/ftc 12345`");
    }

    const query = args.join(" ");
    const ftcApiKey = process.env.FTC_API_KEY;

    try {
        // Example: Fetch FTC team info (Modify API endpoint based on your needs)
        const response = await axios.get(`https://ftc-api.firstinspires.org/v2.0/2024/teams?teamNumber=${query}`, {
            headers: {
                'Authorization': `Bearer ${ftcApiKey}`
            }
        });

        // Check if any team data was found
        if (!response.data.teams || response.data.teams.length === 0) {
            return message.channel.send("No data found for that team number.");
        }

        const team = response.data.teams[0];

        // Build the response message
        const ftcMessage = `🤖 **FTC Team ${team.teamNumber} - ${team.name}**  
🏫 **School:** ${team.schoolName || "N/A"}  
📍 **Location:** ${team.city}, ${team.stateProv}  
🌎 **Country:** ${team.country}  
📅 **Rookie Year:** ${team.rookieYear}  
🏆 **Awards:** ${team.awardsCount || 0}`;

        message.channel.send(ftcMessage);

    } catch (error) {
        console.error(error);
        message.channel.send("Error fetching FTC data. Please try again later.");
    }
};
