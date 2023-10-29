module.exports.run = (client, message, args) => {
  const announceChannel = process.env['announceChannel'];
  let announcement = args.join(" ");
  if (!announcement) return message.channel.send({ content: "You have to provide something!" });

  //members in order - Stephen 
  const allowedClients = process.env['allowedClients'];

  if (allowedClients.includes(message.author.id)) {
    client.channels.cache.get(announceChannel).send({ content: announcement });
  }


}