module.exports.run = (client, message, args) => {
    const answers = [
        "lol no",
        "Never!", 
        "Self destruct Initia..I mean no!",
        "You wish!",
        "Ha! When birds..I mean pigs fly!",
        "Nah I'm good",
        "Make me lol",
        "Why tho?",
        "You thought it was that easy? Ha!",
        "No thank you",
        "Nope! Try again!",
        "What if I don't want to?",
        "You Lost 10 million chances!",
        "How Dare You! ",
        "How About No",
        "Nice Try",
        "A for effort but I will not do that to myself"
    ];

    function randomNumber(min, max) { 
        return Math.floor(Math.random() * (max - min) + min);
    } 

    const randomNum = randomNumber(0,answers.length)

    message.channel.send(answers[randomNum]);
}