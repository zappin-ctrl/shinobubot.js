exports.run = async (client, message, args) => { 
	const embed = {
		"title": "?? Here's a list of what i can do: ??",
        "description": `**Fun Stuff:** \n \n > hug | kiss | cuddle | bite | cry | nom | blush | dance | lick \n \n > poke | pat | highfive | wink | baka |  smug | tickle \n \n **Utility:** \n \n > ping | help`,
        "color": process.env.COLOUR
    };   
	return message.channel.send({ embed });
  }