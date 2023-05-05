//text only answers
module.exports.run = (client, message, args, db) => {
  const axios = require("axios");
  let question = args.join(" ");
  let finalData = '{"question":"' + question + '","max_response_time":10}';
  let API1 = "YouChat-GPT";
  let API2;
  let API3;
  const RAK = process.env['X-RapidAPI-Key']
  
  if (db.CanUseAPI(API1)) {
    // message.channel.send("Sorry, this command is closed today. Stephen needs //to fix some issues!");  
    const options = {
      method: 'POST',
      url: 'https://you-chat-gpt.p.rapidapi.com/TextOnly',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': RAK,
        'X-RapidAPI-Host': 'you-chat-gpt.p.rapidapi.com'
      },
      data: finalData
};

    const errorResponses = [
      "Sorry, I didn't get that. Could you ask me in a different way?",
      "Hmm. That's a little too much for me to handle. Try again later.",
      "Wow! Your question was so advanced, I got an error for my response! Try again later?"
    ];

    function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    const randomNum = randomNumber(0, errorResponses.length);

    //console.log("Hmm. Let me think for a sec...");
    message.channel.send("Hmm. Let me think for a sec...");

    axios.request(options).then(function(response) {
      console.log("The last question was " + question);
      console.log(response.data.answer);
      if (response.data.answer.length > 700) {
        message.channel.send("Got it! I sent the answer to you through your DMs. My answer may be long. 😅");
        message.member.send(response.data.answer);
      } else {
        message.channel.send(response.data.answer);
      }

      let warn = response.data.warning;

    }).catch(function(error) {
      console.log("The last question was " + question);
      message.channel.send(errorResponses[randomNum]);
      console.error(error);
    });
    console.log("The program runs well until it updates the API count");
    //db.UpdateAPI(API1);
  } else {
    message.channel.send("Sorry! This command has reached its limit for the month. Stephen is working on this!");
  }
}