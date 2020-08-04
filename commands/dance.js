exports.run = async (client, message, args) => { 
 const fetch = require('node-fetch')
 const body = await fetch('https://waifu.pics/api/dance').then(res => res.json()) 
	if (args[0]) {
		const user = getUserFromMention(args[0])
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

	    const embed = {
            "description": `<@${message.author.id}> is dancing with <@${user.id}>`,
            "color": process.env.COLOUR,
            "image": {
               "url": body.url 
            },
        };
        return message.channel.send({ embed });
      } 

	const embed = {
        "description": `<@${message.author.id}> is dancing alone`,
        "color": process.env.COLOUR,
        "image": {
           "url": body.url 
        },
    };
    return message.channel.send({ embed });
  }
    exports.conf = {
    aliases: ["party"]
  }