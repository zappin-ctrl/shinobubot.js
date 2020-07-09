exports.run = async (client, message, args) => { 
 const fetch = require('node-fetch')
 const body = await fetch('https://nekos.life/api/v2/img/smug').then(res => res.json())
 let getUserFromMention = message.mentions.users.first() 
	if (args[0]) {
		const user = getUserFromMention
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

	    const embed = {
            "description": `<@${message.author.id}> smugs at <@${user.id}>`,
            "color": process.env.COLOUR,
            "image": {
               "url": body.url 
            },
        };
        return message.channel.send({ embed });
      } 

	const embed = {
        "description": `<@${message.author.id}> is feeling smug`,
        "color": process.env.COLOUR,
        "image": {
           "url": body.url 
        },
    };
    return message.channel.send({ embed });
  } 