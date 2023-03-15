module.exports.run = (client, message, args) => {
const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://programming-memes-images.p.rapidapi.com/v1/memes',
  headers: {
    'X-RapidAPI-Key': '49ca736695msh945431f1d43798bp19553ajsn243ce21796f3',
    'X-RapidAPI-Host': 'programming-memes-images.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
  message.channel.send({files: [response.data[0].image]});
  
}).catch(function (error) {
	console.error(error);
});
}