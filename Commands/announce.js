module.exports.run = (client, message, args) => {
const annouceChannel = 1006721419826176020;
let announcement = args.join(" ");
if(!toSay) return message.channel.send({content: "You have to provide something!"});
  message.channels.get(announceChannel).send(announcement);
}