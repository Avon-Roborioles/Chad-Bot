module.exports.run = (client, message, args) => {
  console.log("Forbiddon Number detected!");

  //list of GIF 
  const responses = [
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2VkcTRudzFmNTRqNHVhaWpmYnE0djk1ZjR1bWdpeHNlaXB5bmEyZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UrzBnCV7rl0tkKutKQ/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWgyanlueGZjOWl4bnA5Zzc3eHNpYThieGM5Y3o3YTloN2UxcWo3bCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oz8xtdloPOSr3ne4U/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTByNmMyOGRlZnhiZ3JuajlmcGlzYzc4Y3hqbncwNzJubHAycjQ3dCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/h20lgQ1eksr1SEdc47/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3lzaXNjZGJneGxqa2NnNjAyZXU1NzN6eTN2YWVlYmdwbmF3Nms0cCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3oz8xMbKLAkRLHYNgI/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3Z2b2Z3emd1dmMyOWFoZ3MxNXg0OHV5d3F5anF5Z2VsOTN2OWZubSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/SwxXCZezUX1f19pNcH/giphy.gif",
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHVsZ3F0ZmR3eHF3bXpkeDBlcjczMmsxN25weXJuNHo4djFuOG5rMyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JraCnck7597rO/giphy.gif",
    "NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!!!",
    "HOW COULD YOU DO SAY THAT!. ",
    "Whyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy!",
    "You lost 100 trillion chances"
  
  ];

  function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  const randomNum = randomNumber(0, responses.length);

  message.reply(responses[randomNum]);

}