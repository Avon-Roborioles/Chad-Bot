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
  if (filter.isProfane(message.content)) {
    const command = client.commands.get("profanity");
    if (command) command.run(client, message);
  }

  // ?? Trigger "67" command whenever "67" appears anywhere in the message
  else if (message.content.includes("67")) {
    const command = client.commands.get("67");
    if (command) {
      console.log("Triggered the 67 command!");
      command.run(client, message);
    } else {
      console.warn("67 command not found!");
    }
  }

  // standard slash-like commands
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
