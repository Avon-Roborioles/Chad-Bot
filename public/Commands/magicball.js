module.exports.run = (client, message, args) => {
let question = args.join(" ");

    if (Math.random() > 0.5) {
    message.channel.send("Yes!");
} else {
    message.channel.send("No!");
}

}