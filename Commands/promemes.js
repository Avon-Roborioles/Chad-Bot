module.exports.run = (client, message, args) => {
const axios = require("axios");
const RAK = process.env['X-RapidAPI-Key']

const options = {
  method: 'GET',
  url: 'https://programming-memes-images.p.rapidapi.com/v1/memes',
  headers: {
    'X-RapidAPI-Key': '8d2ee8fec4msh50965177990babep1427a4jsnb52e755768e7',//RAK,
    'X-RapidAPI-Host': 'programming-memes-images.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
  message.channel.send({files: [response.data[0].image]});
  
}).catch(function (error) {
	console.error(error);
});
}