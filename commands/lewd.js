exports.run = async (client, message, args) => { 
 const fetch = require('node-fetch')
 const body = await fetch('https://rra.ram.moe/i/r?type=lewd').then(res => res.json()) 
 let getUserFromMention = message.mentions.users.first()
	if (args[0]) {
		const user = getUserFromMention
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

	    const embed = {
            "description": `<@${message.author.id}> bonks <@${user.id}> for being lewd`,
            "color": process.env.COLOUR,
            "image": {
               "url": `https://rra.ram.moe${body.path}`
            },
        };
        return message.channel.send({ embed });
      } 

	const embed = {
        "color": process.env.COLOUR,
        "image": {
           "url": `https://rra.ram.moe${body.path}`
        },
    };
    return message.channel.send({ embed });
  }
