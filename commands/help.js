exports.run = async (client, message, args) => { 
	const embed = {
		"title": "🍩 Here's a list of what i can do: 🍩",
        "description": `**Fun/Memes:** \n \n **milk [@someone]** \n Create an 'i can milk this' meme \n \n **8ball [question]** \n Ask a yes/no question and have it answered \n \n **marry [@someone]** \n Engage in holy matrimony with someone (you'll be the groom) \n \n **Gif Stuff:** \n (*use these with or w/out an @ to post a related gif*) \n \n > hug | kiss | cuddle | bite | cry | nom | blush | dance | lick \n \n > poke | pat | highfive | wink | baka | smug | tickle | nobully | noswear \n \n > disgust | lewd | pout | slap | kill | grope \n \n **Utility:** \n \n > ping | help`,
        "color": process.env.COLOUR
    };   
	return message.channel.send({ embed });
  }