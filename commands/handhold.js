exports.run = async (client, message, args) => { 
 const { handP } = require('./actions.json');
 var hand = handP[Math.round(Math.random() * (handP.length - 1))];
	if (args[0]) {
		const user = getUserFromMention(args[0])
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

	    const embed = {
            "description": `<@${message.author.id}> held hands with <@${user.id}>`,
            "color": process.env.COLOUR,
            "image": {
               "url": hand
            },
        };
        return message.channel.send({ embed });
      } 

	const embed = {
        "description": `<@${message.author.id}> held their own hand`,
        "color": process.env.COLOUR,
        "image": {
           "url": hand
        },
    };
    return message.channel.send({ embed });
  }
    exports.conf = {
    aliases: []
  }