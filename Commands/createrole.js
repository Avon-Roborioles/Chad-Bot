module.exports.run = (client, message, args) => {
  var newRole = args.join(" ");
  //members in order - Stephen 
var allowedClients = ["564908787153240101"]; 

if (allowedClients.includes(message.author.id)) {
  //member.guild.roles.create({name: newRole, permissions: [PermissionsBitField.Flags.SendMessages]});
}
}