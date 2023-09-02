module.exports.run = (client, message, args) => {
  const axios = require("axios");
  let date = new Date();
  let day = date.getDay() + 1;
  let city = "'" +  args.join(" ") + "'";
  let API = "WeatherAPI";
  const RAK = process.env['X-RapidAPI-Key']

  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    params: { q: city},
    headers: {
      'X-RapidAPI-Key': RAK,
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  };

  
  
  axios.request(options).then(function(response) {
  let finalResponse = `The current temperature is ${response.data.current.temp_f} degrees Fahrenheit in ${response.data.location.name}.`;
    message.channel.send(finalResponse);
  }).catch(function(error) {
    console.error(error);
  });

}