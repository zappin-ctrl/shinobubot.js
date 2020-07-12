exports.run = async (client, message, args) => { 
	const embed = {
		"title": "🍩 Here's a list of what i can do: 🍩",
        "description": `**Fun/Memes:** \n ====================== \n \n **milk [@someone]** \n Create an 'i can milk this' meme \n \n **8ball [question]** \n Ask a yes/no question and have it answered \n \n **tuck [@someone]** \n Tuck someone to bed (if they're tired) \n \n **marry [@someone]** \n Engage in holy matrimony with someone (you'll be the groom) \n \n **pin [@someone]** \n Pin someone down, for reasons i won't mention \n \n **sauce [@someone]** \n Get a [someone]-tasting sauce. Yum~ \n \n \n **Gif Stuff:** \n ====================== \n \n **gif_name [@someone]**-optional \n Posts a gif of the requested action (with or without an @) \n \n > hug | kiss | cuddle | bite | cry | nom | blush | dance | lick \n \n > poke | pat | highfive | wink | baka | smug | tickle | nobully | noswear \n \n > disgust | lewd | pout | slap | kill | grope \n \n \n  **Utility:** \n ====================== \n \n **ping** \n Calculates response time for bot <-> server <-> api \n \n **help** \n Sends this message.`,
        "color": process.env.COLOUR
    };   
	return message.channel.send({ embed });
  }