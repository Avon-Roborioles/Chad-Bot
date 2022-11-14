const {Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions } = require(`discord.js`);

//symbol to add before each command to Chad
const prefix = "/";
const botChannel = 1041323546384814142;

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

client.on("ready", () => {
    console.log("Chad is online!");
    client.user.setActivity(`the Server`, {type: "WATCHING"});
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

client.on("messageCreate", (message) => { /////
//     if (!message.content.startsWith(prefix) || message.author.bot) return;

//     const args = message.content.slice(prefix.length).split(/ +/);
//     const command = args.shift().toLowerCase();

//     //message array

//     const messageArray = message.content.split(" ");
//     const argument = messageArray.slice(1);
//     const cmd = messageArray[0];

//     //COMMANDS

// //test command

// if (command === "ping") {
//     message.channel.send("pong! Finally I work!");
// }

if (message.content.startsWith(prefix) && message.content != "/commands" && message.channel == botChannel) { ///////////////////////
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift();
  
    const command = client.commands.get(commandName);
    if (!command) return message.channel.send({content: "That command doesn't exist!"});
    command.run(client, message, args);
  }

});






















 client.login("MTA0MTMwMDY0MjYxNjA2NjA4OA.G0_rjU.BvO53L93NBYIAoykKqi74GsU_5ZOLawol7klzE");