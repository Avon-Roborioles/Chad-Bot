const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, ActivityType } = require(`discord.js`);
const express = require("express");
const app = express();


//symbol to add before each command to Chad
const prefix = "/";
const botChannel = 1041323546384814142;


app.listen(3000, () => {
  console.log("Project is running!");
})

app.get("/", (req, res) => {
  res.send("Hello world!");
})


const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on("ready", () => {
  console.log("Chad is online!");


  client.user.setPresence({
    activities: [{ name: `Cone Peeps`, type: ActivityType.Watching }],
    status: 'Online',
  });

  const Discord = require("discord.js");
  const fs = require("fs");
  client.commands = new Discord.Collection();
  const commands = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));

  for (file of commands) {
    const commandName = file.split(".")[0]
    const command = require(`./Commands/${commandName}`);
    client.commands.set(commandName, command);
  }
})

client.on("messageCreate", (message) => {
  
  if (message.content.startsWith(prefix) && (message.channel == botChannel)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift();

    const command = client.commands.get(commandName);
    console.log("Last said command was " + commandName);
    if (!command) return message.channel.send({ content: "That command doesn't exist!" });
    command.run(client, message, args);
  } else if (message.guild == null && message.author.id !== 'botDiscordId') {
    message.reply("It worked!");
  }

});
client.login(process.env['token']);