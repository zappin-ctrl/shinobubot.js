exports.run = async (client, message, args) => { 
	const embed = {
		"title": "🍩 Here's a list of what i can do: 🍩",
        "description": `**Fun/Memes:** \n ====================== \n \n **choose [op1,op2,etc]**\n I'll choose one of the options on your behalf.\n\n**rate [sentence]** \n Rates whatever your heart desires. \n \n **gay [@someone]** \n Find out yours or your friends' gay potential. \n \n **8ball [question]** \n Ask a yes/no question and have it answered \n \n **say [sentence]**\n Have the bot repeat your message\n\n **fight [@someone]** \n Fight someone and let fate decide who lives and who dies \n \n **milk [@someone]** \n Create an 'i can milk this' meme \n \n **tuck [@someone]** \n Tuck someone to bed (if they're tired) \n \n **marry [@someone]** \n Engage in holy matrimony with someone (you'll be the groom) \n \n **pin [@someone]** \n Pin someone down, for reasons i won't mention \n \n **sauce [@someone]** \n Get a [someone]-tasting sauce. Yum~ \n \n \n **Gif Stuff:** \n ====================== \n \n **gif_name [@someone]**-optional \n Posts a gif of the requested action (with or without an @) \n \n > hug | kiss | cuddle | bite | cry | nom | blush | dance | lick \n \n > poke | pat | highfive | wink | baka | smug | tickle | nobully | noswear \n \n > disgust | lewd | pout | slap | kill | grope | handhold \n \n \n  **Utility:** \n ====================== \n \n **avatar [@someone]** \n Show a user's profile picture. \n \n **emote [gif/image emote]** \n Enlarge an emote (so you can steal it) \n \n **suggest** \n Send a suggestion for the bot \n \n **ping** \n Calculates response time for bot <-> server <-> api \n \n **help** \n Sends this message.`,
        "color": process.env.COLOUR
    };   
    message.react(`✅`)
	  return message.author.send({ embed }).catch(error =>  {
    message.channel.send(`Your DMs are disabled!`)
    message.reactions.removeAll()
    message.react(`❌`)
    .then(fail =>{
    message.react(`🇩`)
    })
    .then(rip => {
    message.react(`🇲`)
    })
    })
    
  
  }
    exports.conf = {
    aliases: []
  }