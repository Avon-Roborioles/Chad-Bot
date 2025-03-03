module.exports.run = (client, message, args) => {
    let question = args.join(" ");
    let randomNum = Math.random();

    if (randomNum < 0.05) {
        message.channel.send("I don't care");
    } else if (randomNum < 0.525) { // 47.5% chance
        message.channel.send("Yes!");
    } else { // 47.5% chance
        message.channel.send("No!");
    }
};
