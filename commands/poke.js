exports.run = async (client, message, args) => { 
 const fetch = require('node-fetch') 
	if (args[0]) {
		const user = getUserFromMention(args[0]);
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

		const body = await fetch('https://nekos.life/api/v2/img/poke').then(res => res.json())
	    const embed = {
            "description": `<@${message.author.id}> poked <@${user.id}>`,
            "color": color,
            "image": {
               "url": body.url 
            },
        };
        return message.channel.send({ embed });
      } 

	const body = await fetch('https://nekos.life/api/v2/img/poke').then(res => res.json())
	const embed = {
        "description": `<@${message.author.id}> poked themselves`,
        "color": process.env.COLOUR,
        "image": {
           "url": body.url 
        },
    };
    return message.channel.send({ embed });
  }