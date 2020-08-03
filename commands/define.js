exports.run = async (client, message, args) => {
  if (!args[0]) {
    return message.channel.send(`You need to supply a word or phrase.`)
  }
 let question = args.join('_');
 let exam = ""
 let exama = ""
 let extra = ""
 let syns = ""
 let synsa = ""
 const fetch = require('node-fetch') 
 const body = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${question}`).then(res => res.json())
   if (body.title === `No Definitions Found`) {
    return message.channel.send(body.message)
   }

//for the first def
 if (typeof body["0"].meanings["0"].definitions["0"].example !== "undefined") { 
   exam = `\n> \n> **Example: **` + body["0"].meanings["0"].definitions["0"].example
 }
 let type = body["0"].meanings["0"].partOfSpeech
 let def = body["0"].meanings["0"].definitions["0"].definition
 if (typeof body["0"].meanings["0"].definitions["0"].synonyms !== `undefined`) {
   syns = `\n> \n> **Synonyms:** ` + body["0"].meanings["0"].definitions["0"].synonyms
 }

 //if there's a second def
 if (typeof body["0"].meanings["1"] !== "undefined") {
    if (typeof body["0"].meanings["1"].definitions["0"].example !== "undefined") { 
    exama = `\n> \n> **Example: **` + body["0"].meanings["1"].definitions["0"].example
 }
 let typea = body["0"].meanings["1"].partOfSpeech
 let defa = body["0"].meanings["1"].definitions["0"].definition
 if (typeof body["0"].meanings["1"].definitions["0"].synonyms !== `undefined`) {
   synsa = `\n> \n> **Synonyms:** ` + body["0"].meanings["1"].definitions["0"].synonyms
 }
 extra = `\n\n\n**\`2nd Result\`**\n(*${typea}*)\n\n> **Definition: **${defa}${exama}${synsa}`
 }
 let final = `**\`1st Result\`**\n(*${type}*)\n\n> **Definition: **${def}${exam}${syns}${extra}`
 let embed = {
   "title": "\""+question+"\"",
   "description": final,
   "color": process.env.COLOUR
 }
 return message.channel.send({ embed })
    }
      exports.conf = {
    aliases: ["definition","urban","meaning"]
  }
