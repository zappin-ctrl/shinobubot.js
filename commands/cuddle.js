exports.run = async (client, message, args) => { 
 const fetch = require('node-fetch') 
const body = await fetch('https://nekos.life/api/v2/img/cuddle').then(res => res.json())
	if (args[0]) {
		const user = getUserFromMention(args[0])
    if (!user) {
			return message.reply('Please use a proper mention.');
		}

	    const embed = {
            "description": `<@${message.author.id}> cuddled with <@${user.id}>`,
            "color": process.env.COLOUR,
            "image": {
               "url": body.url 
            },
        };
        return message.channel.send({ embed });
      } 

	const embed = {
        "description": `<@${message.author.id}> cuddled with themselves`,
        "color": process.env.COLOUR,
        "image": {
           "url": body.url 
        },
    };
    return message.channel.send({ embed });
  }
    exports.conf = {
    aliases: []
  }