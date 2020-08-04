exports.run = async (client, message, args) => { 
 const { gropeP } = require('./actions.json');
 var grope = gropeP[Math.round(Math.random() * (gropeP.length - 1))];
	if (args[0]) {
		const user = getUserFromMention(args[0])
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

	    const embed = {
            "description": `<@${message.author.id}> groped <@${user.id}>`,
            "color": process.env.COLOUR,
            "image": {
               "url": grope
            },
        };
        return message.channel.send({ embed });
  }
 

	const embed = {
        "description": `<@${message.author.id}> groped themselves? Ok.`,
        "color": process.env.COLOUR,
        "image": {
           "url": grope
        },
    };
    return message.channel.send({ embed });
  }

    exports.conf = {
    aliases: []
  }
