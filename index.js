//primary Chad Program
const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, ActivityType } = require(`discord.js`);
const express = require("express");
const app = express();
let input = false;
var rl = require('readline-sync');

var Filter = require('bad-words'), //a server-wide filter for bad words

filter = new Filter();
filter.removeWords("hell");
filter.removeWords("screw");  

//symbol to add before each command to Chad
const prefix = "/";
const botChannel = process.env['botChannel'] //Bot-Commands
const testChannel = process.env['testChannel'] //test-server



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
    
    if (filter.isProfane(message.content)){
      const command = client.commands.get("profanity");
      command.run(client, message);
      
    } else if (message.content.startsWith(prefix) && (message.channel == botChannel || testChannel)) {
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const commandName = args.shift();

      const command = client.commands.get(commandName);
      console.log("Last said command was " + commandName);
      if (!command) return message.channel.send({ content: "That command doesn't exist!" });
      
      //Add db parameter after connection to Firebase
      command.run(client, message, args, input);

      
    }


  });

client.login(process.env['token']);