const cooldowns = new Map(); // Stores users on cooldown

module.exports.run = async (client, message, args) => {
    const cooldownTime = 25 * 1000; // 10 seconds cooldown
    const userId = message.author.id;
    const now = Date.now();

    // Check if the user is on cooldown
    if (cooldowns.has(userId)) {
        const expirationTime = cooldowns.get(userId) + cooldownTime;
        if (now < expirationTime) {
            const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
            return message.channel.send(` Please wait **${timeLeft}** seconds before using /rithek again.`);
        }
    }

    // Set the cooldown
    cooldowns.set(userId, now);
    setTimeout(() => cooldowns.delete(userId), cooldownTime); // Remove cooldown after time expires

    // Ensure the user is tagged
    if (!args.length || !message.mentions.users.size) {
        return message.channel.send("Please mention a user to rithek. Example: `/rithek Dave G`");
    }

    const mentionedUser = message.mentions.users.first();

    // 1. Send in the channel that the user got rithek'd
    message.channel.send(`${mentionedUser} got RITHEKD`);

    // 2. Send a DM to the mentioned user
    try {
        const dmChannel = await mentionedUser.createDM();
        await dmChannel.send("You got RITHEKD!");

        // Send the image (Make sure GETRITHEKD.png is in the bot's directory)
        await dmChannel.send({
            files: ['./GETRITHEKD.png'] // Path to your image file
        });
    } catch (error) {
        console.error("Error sending DM to the user:", error);
        message.channel.send("I couldn't DM the user. They might have DMs disabled.");
    }
};

