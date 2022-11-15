module.exports.run = (client, message, args) => {
    const answers = [
        "lol no",
        "Never!", 
        "Self destruct Initia..I mean no!",
        "You wish!",
        "Ha! When birds..I mean pigs fly!"
    ];

    function randomNumber(min, max) { 
        return Math.floor(Math.random() * (max - min) + min);
    } 

    const randomNum = randomNumber(0,answers.length)

    message.channel.send(answers[randomNum]);
}