module.exports.run = (client, message, args) => {
  console.log("Profanity detected!");

  //list of GIF 
  const responses = [
    "https://media4.giphy.com/media/6Ptq0M5fqxyjDAFMBO/giphy.gif",
    "https://media0.giphy.com/media/XEfokGeXzYrV9lfC4f/200w.webp?cid=ecf05e47eqa1qxl3lu45zs95pfeisdo1spc9xwxrjtggb8ti&ep=v1_gifs_search&rid=200w.webp&ct=g",
    "https://media2.giphy.com/media/3og0IN2YJFptu9DQAw/200w.webp?cid=ecf05e470wnu8movhpr3p7cux4q8z790ohjscc9yyjjpkxst&ep=v1_gifs_search&rid=200w.webp&ct=g",
    "https://media1.giphy.com/media/3ohs7XEZXNKCUlZ9gk/200.webp?cid=ecf05e47cht6viekd0s1r7y2kbsk02wmrpoi7htbt4xk8s3e&ep=v1_gifs_search&rid=200.webp&ct=g",
    "https://media4.giphy.com/media/Y0xmlvJLOmDll1Yv3y/200w.webp?cid=ecf05e47cht6viekd0s1r7y2kbsk02wmrpoi7htbt4xk8s3e&ep=v1_gifs_search&rid=200w.webp&ct=g",
    "https://media0.giphy.com/media/iePazPfAYPL2b9pZyF/200w.webp?cid=ecf05e4727xcqnfdhoam16bmmd22u2rjelc6ojtzp97pivqi&ep=v1_gifs_search&rid=200w.webp&ct=g",
    "https://media2.giphy.com/media/MP5jN59JE48vFWWCfQ/200w.webp?cid=ecf05e47r7ylvwwrupgrev8eck3vyqimw2os73okbo2kwwc7&ep=v1_gifs_search&rid=200w.webp&ct=g",
    "https://media2.giphy.com/media/6kwFjj7BnrXssYsC6L/200w.webp?cid=ecf05e4712v18dg8fx9e7xi05572wwl4z7wg431eak35srmm&ep=v1_gifs_search&rid=200w.webp&ct=g",
    "https://media3.giphy.com/media/l2JeeOlUhDXKZaYcE/200.webp?cid=ecf05e4712v18dg8fx9e7xi05572wwl4z7wg431eak35srmm&ep=v1_gifs_search&rid=200.webp&ct=g"
  ];

  function randomNumber(min, max) { 
        return Math.floor(Math.random() * (max - min) + min);
    } 

    const randomNum = randomNumber(0,responses.length);
  
  message.reply(responses[randomNum]);

}