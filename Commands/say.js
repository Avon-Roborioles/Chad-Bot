module.exports.run = (client, message, args) => {
        let toSay = args.join(" ");
        if(!toSay) return message.channel.send({content: "You have to provide something!"});

        const answers = [
          "No! I'm not falling for that again!",
          "You can only use one slash. '/' Try again!",
          "Sorry can't do that. Dont use a slash!",
          "I can't say slashes. Try again!"
          ];

        function randomNumber(min, max) { 
        return Math.floor(Math.random() * (max - min) + min);
        }

        const randomNum = randomNumber(0,answers.length);
  
        if (!toSay.includes("/")) {
        message.channel.send({content: toSay});
        } else {
         message.channel.send({content: answers[randomNum]});

        }
}