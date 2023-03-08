module.exports.run = (client, message, args) => {
const axios = require("axios");
let city = args.join(" ");
let response;
  
const options = {
  method: 'GET',
  url: 'https://yahoo-weather5.p.rapidapi.com/weather',
  params: {location: 'Avon,in', format: 'json', u: 'f'},
  headers: {
    'X-RapidAPI-Key': '49ca736695msh945431f1d43798bp19553ajsn243ce21796f3',
    'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
}