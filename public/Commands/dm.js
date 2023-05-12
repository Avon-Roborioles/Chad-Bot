module.exports.run = (client, message, args) => {
  let messageContent = args.join(" ");
  console.clear();
  message.member.send(messageContent);
  
}