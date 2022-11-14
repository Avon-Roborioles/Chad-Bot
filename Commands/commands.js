module.exports.run = (client, message, args) => {
  let finalCommands = [];
  const { EmbedBuilder } = require('discord.js');
  const fs = require("fs");
  const commands = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));


  for (file of commands) {
    const commandName = file.split(".")[0]
    //const command = require(`./Commands/${commandName}`);
    finalCommands.push(commandName);
  }


  // inside a command, event listener, etc.
  const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle(`Total Commands: ${client.commands.size}`)
    .setDescription(finalCommands)
    .setTimestamp()
    .setFooter("My prefix is /");
  
  message.channel.send({ embeds: [exampleEmbed] });
  }
