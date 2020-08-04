exports.run = async (client, message, args) => { 
 const fetch = require('node-fetch')
 const body = await fetch('https://rra.ram.moe/i/r?type=cry').then(res => res.json()) 
	if (args[0]) {
		const user = getUserFromMention(args[0])
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

	    const embed = {
            "description": `<@${message.author.id}> cries with <@${user.id}>`,
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
    aliases: ["sob"]
  }
