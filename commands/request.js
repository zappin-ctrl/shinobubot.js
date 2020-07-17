exports.run = async (client, message, args) => { 
 const fetch = require('node-fetch') 
 const fs = require("fs"); 
 if (!args[0]) {
   message.reply(" you need to provide a request/suggestion.")
 } else {
 let writer = message.content.replace("+request","").replace("+suggest","").replace("+suggestion","").replace("+idea","").replace(","," ")
 fs.writeFileSync("./commands/requests.txt",`\nUser: ${message.author.username} | Request: ${writer}`,
     { 
      encoding: "utf8", 
      flag: "a+", 
      mode: 0o666 
    })
    message.reply(` your request/suggestion has been recorded ${process.env.EMOTE_VERIFIED}`)
  }
}
  
    exports.conf = {
    aliases: ["suggest","suggestion","idea"]
  }