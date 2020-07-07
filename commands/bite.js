exports.run = async (client, message, args) => { 
 const fetch = require('node-fetch') 
 let getUserFromMention = message.mentions.users.first()
	if (args[0]) {
		const user = getUserFromMention
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

		const body = await fetch('https://waifu.pics/api/bite').then(res => res.json())
	    const embed = {
            "description": `<@${message.author.id}> bit <@${user.id}>`,
            "color": process.env.COLOUR,
            "image": {
               "url": body.url 
            },
        };
        return message.channel.send({ embed });
      } 

	const body = await fetch('https://waifu.pics/api/bite').then(res => res.json())
	const embed = {
        "description": `<@${message.author.id}> bit themselves`,
        "color": process.env.COLOUR,
        "image": {
           "url": body.url 
        },
    };
    return message.channel.send({ embed });
  }