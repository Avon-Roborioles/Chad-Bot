module.exports.run = (client, message, args) => {
        let toSay = args.join(" ");
        if(!toSay) return message.channel.send({content: "You have to provide something!"});

        if (!toSay.includes("/")) {
        message.channel.send({content: toSay});
        } else {
         message.channel.send({content: "No! I'm not falling for that again!"});

        }
}