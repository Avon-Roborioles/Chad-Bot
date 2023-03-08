//text only answers
module.exports.run = (client, message, args) => {
const axios = require("axios");
let question = args.join(" ");
let finalData = '{"question":"' + question + '","max_response_time":10}'
  
const options = {
  method: 'POST',
  url: 'https://you-chat-gpt.p.rapidapi.com/TextOnly',
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': '8d2ee8fec4msh50965177990babep1427a4jsnb52e755768e7',
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

    const randomNum = randomNumber(0,errorResponses.length);

  //console.log("Hmm. Let me think for a sec...");
 message.channel.send("Hmm. Let me think for a sec..."); 
  
axios.request(options).then(function (response) {
  console.log("The last question was " + question);
  console.log(response.data.answer);
 message.channel.send(response.data.answer);
  
  let warn = response.data.warning;
  
}).catch(function (error) {
  console.log("The last question was " + question);
  message.channel.send(errorResponses[randomNum]);
	console.error(error);
});

}