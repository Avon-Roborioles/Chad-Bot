module.exports.run = (client, message, args) => {
const announceChannel = 1006721419826176020;
let announcement = args.join(" ");
if(!announcement) return message.channel.send({content: "You have to provide something!"});

client.channels.cache.get("1006721419826176020").send({ content: "test!" })
  
  

}