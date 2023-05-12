module.exports.run = (client, message, args) => {
  var wantedRole = args.join(" ");
  var role = member.guild.roles.cache.find(role => role.name === wantedRole);
  member.roles.add(role);
  message.channel.send({content: `The ${wantedRole} Role has been added to your profile!`});
}