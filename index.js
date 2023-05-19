const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, ActivityType } = require(`discord.js`);
const express = require("express")();
const app = express();
const db = require("./database.js");
let input = false;
var rl = require('readline-sync');
const PORT = process.env.PORT || 3000;
//symbol to add before each command to Chad
const prefix = "/";
const botChannel = process.env['botChannel']
const testChannel = process.env['testChannel']


app.get("", (req, res) => {
  res.send("Hello world!");
})

app.listen(PORT, () => {
  console.log("Project is running!");
  console.log(`App is up at port ${PORT}`)
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

if (input == false) {
client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix) && (message.channel == botChannel || testChannel)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift();

    const command = client.commands.get(commandName);
    console.log("Last said command was " + commandName);
    if (!command) return message.channel.send({ content: "That command doesn't exist!" });
    command.run(client, message, args, db, input);
  }
  

});
} else {
  message = rl.question("What do you think of node.js? ")
  //client.on("messageCreate", (message) => {
    const args = message.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift();

    const command = client.commands.get(commandName);
    console.log("Last said command was " + commandName);
    command.run(client, message, args, db, input);
  

}
client.login(process.env['token']);