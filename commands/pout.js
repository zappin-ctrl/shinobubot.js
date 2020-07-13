exports.run = async (client, message, args) => { 
 const fetch = require('node-fetch')
 const body = await fetch('https://rra.ram.moe/i/r?type=pout').then(res => res.json()) 
 let getUserFromMention = message.mentions.users.first()
	if (args[0]) {
		const user = getUserFromMention
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

	    const embed = {
            "description": `<@${message.author.id}> pouts at <@${user.id}>`,
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
    exports.conf = {
    aliases: []
  }
