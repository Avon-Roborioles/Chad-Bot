module.exports.run = (client, message, args) => {
  let finalCommands = [];
  const fs = require("fs");
  const commands = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));


  for (file of commands) {
    const commandName = file.split(".")[0]
    //const command = require(`./Commands/${commandName}`);
    finalCommands.push(commandName);
  }


  // inside a command, event listener, etc.
  message.channel.send({content: "All commands include /help, /ping, /team, /say, & /self-destruct, /ask, /dm, /magicball, /rithek, /weather, & /promemes !"});
  }