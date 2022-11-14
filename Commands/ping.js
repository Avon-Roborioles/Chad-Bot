module.exports.run = (client, message, args) => {
    console.log("The channel is " + message.channel);
    message.channel.send("pong!");
  }

