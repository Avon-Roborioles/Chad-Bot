module.exports.run = (client, message, args) => {
const announceChannel = "1006721419826176020";
let announcement = args.join(" ");
if(!announcement) return message.channel.send({content: "You have to provide something!"});

//members in order - Stephen 
var allowedClients = ["564908787153240101"]; 

if (allowedClients.includes(message.author.id)) {
client.channels.cache.get(announceChannel).send({content: announcement});
}
  

}