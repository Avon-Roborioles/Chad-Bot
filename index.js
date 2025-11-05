//primary Chad Program
const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, ActivityType } = require(`discord.js`);
const express = require("express");
const app = express();
let input = false;
var rl = require('readline-sync');

var Filter = require('bad-words'); // a server-wide filter for bad words
var filter = new Filter();

const exemptWords = ["hell", "screw", "crap", "poop", "willy", "god", "bum"];

// remove exempt words from filter
for (let i = 0; i < exemptWords.length; i++) {
  filter.removeWords(exemptWords[i]);
}

// symbol to add before each command to Chad
const prefix = "/";
const botChannel = process.env['botChannel']; // Bot-Commands
const testChannel = process.env['testChannel']; // test-server

// express keep-alive
app.listen(3000, () => {
  console.log("Project is running!");
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// create Discord client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on("ready", () => {
  console.log("Chad is online!");

  client.user.setPresence({
    activities: [{ name: `Artifact Peeps`, type: ActivityType.Watching }],
    status: 'online',
  });

  const Discord = require("discord.js");
  const fs = require("fs");
  client.commands = new Discord.Collection();
  const commands = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));

  for (file of commands) {
    const commandName = file.split(".")[0];
    const command = require(`./Commands/${commandName}`);
    client.commands.set(commandName, command);
  }
});

// message handler
client.on("messageCreate", (message) => {
  // ignore bot messages to avoid loops
  if (message.author.bot) return;

  // profanity filter
   const cleanedContent = message.content
  .replace(/<@!?(\d+)>/g, "")     // @user
  .replace(/<@&(\d+)>/g, "")      // @role
  .replace(/<#(\d+)>/g, "")       // #channel
  .trim();

// ✅ ONLY trigger if the entire message is 67 (not inside a string)
if (/^(67|6-7|6 7|6\s*or\s*7|six\s*seven|⁶⁷)$/i.test(cleanedContent)) {
  const command = client.commands.get("67");
  if (command) {
    console.log("Triggered the 67 command (exact match)");
    command.run(client, message);
  }
}


  // profanity filter
  if (filter.isProfane(message.content)) {
    const command = client.commands.get("profanity");
    if (command) command.run(client, message);
  }

  // slash-style commands
  else if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift();

    const command = client.commands.get(commandName);
    console.log("Last said command was " + commandName);
    if (!command) return message.channel.send({ content: "That command doesn't exist!" });

    // Add db parameter after connection to Firebase
    command.run(client, message, args, input);
  }
});

client.login(process.env['token']);
