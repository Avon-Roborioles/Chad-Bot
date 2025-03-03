module.exports.run = async (client, message, args) => {
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
        await dmChannel.send("Get RITHEKD!");

        // Send the image
        await dmChannel.send({
            files: ['./GETRITHEKD.png'] // Path to your image file
        });
    } catch (error) {
        console.error("Error sending DM to the user:", error);
        message.channel.send("I couldn't DM the user. They might have blocked me.");
    }
};
