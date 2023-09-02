//text only answers
module.exports.run = (client, message, args) => {
  const axios = require("axios");
  let question = args.join(" ");
  let finalData = '{"question":"' + question + '","max_response_time":10}';
  let API1 = "YouChat-GPT";
  let API2;
  let API3;
  const RAK = process.env['X-RapidAPI-Key']
  

    const options = {
      method: 'POST',
      url: 'https://chatgpt-gpt-3-5.p.rapidapi.com/ask',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': RAK,
        'X-RapidAPI-Host': 'chatgpt-gpt-3-5.p.rapidapi.com'
      },
      data: {
        query: question
      }
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

  async function runcommand() {
     try {
	const response = await axios.request(options);
	//console.log(response.data.response);
  message.channel.send(response.data.response);
       console.log("Message Sent!")
} catch (error) {
	console.error(error);
}
  }
  runcommand();
  
}