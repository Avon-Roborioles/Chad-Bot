//text only answers
module.exports.run = (client, message, args, db) => {
const axios = require("axios");
let question = args.join(" ");
let finalData = '{"question":"' + question + '","max_response_time":10}';
let API = "YouChat-GPT";
  
//console.log(db.APILimit("YouChat-GPT"));
async function quickc () {
  let c = await db.APILimit(API);
  let z = await db.APICurrent(API);
  if (c > z) {
    console.log(`${API}'s Limit of ${c} is greater than its current api uses of ${z}`);
  } else {
    console.log("Hmmm. I would take another look...");
  }
}

 quickc(); 
  
// if (db.APILimit("YouChat-GPT") == 100) {
//   console.log("It works!");
// } else {
//   console.log("Hmmm. I would take another look...");
// }

  
message.channel.send("Sorry, this command is closed today. Stephen needs to fix some issues!");  
// const options = {
//   method: 'POST',
//   url: 'https://you-chat-gpt.p.rapidapi.com/TextOnly',
//   headers: {
//     'content-type': 'application/json',
//     'X-RapidAPI-Key': '49ca736695msh945431f1d43798bp19553ajsn243ce21796f3',
//     'X-RapidAPI-Host': 'you-chat-gpt.p.rapidapi.com'
//   },
//   data: finalData
// };

// const errorResponses = [
//         "Sorry, I didn't get that. Could you ask me in a different way?",
//         "Hmm. That's a little too much for me to handle. Try again later.",
//         "Wow! Your question was so advanced, I got an error for my response! Try again later?"
//     ];

// function randomNumber(min, max) { 
//         return Math.floor(Math.random() * (max - min) + min);
//     } 

//     const randomNum = randomNumber(0,errorResponses.length);

//   //console.log("Hmm. Let me think for a sec...");
//  message.channel.send("Hmm. Let me think for a sec..."); 
  
//   axios.request(options).then(function (response) {
//     console.log("The last question was " + question);
//     console.log(response.data.answer);
//   if(response.data.answer.length > 700) {
//     message.channel.send("Got it! I sent the answer to you through your DMs. My answer may be long. 😅");
//     message.member.send(response.data.answer);
//   } else {
//   message.channel.send(response.data.answer);
//   }
  
//   let warn = response.data.warning;
  
// }).catch(function (error) {
//   console.log("The last question was " + question);
//   message.channel.send(errorResponses[randomNum]);
// 	console.error(error);
// });

}