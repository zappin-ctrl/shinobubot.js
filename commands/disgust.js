exports.run = async (client, message, args) => { 
 const { disgustP } = require('./actions.json'); 
 var disgust = disgustP[Math.round(Math.random() * (disgustP.length - 1))];
 let getUserFromMention = message.mentions.users.first()
	if (args[0]) {
		const user = getUserFromMention
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

	    const embed = {
            "description": `<@${message.author.id}> is disgusted by <@${user.id}>`,
            "color": process.env.COLOUR,
            "image": {
               "url": disgust
            },
        };
        return message.channel.send({ embed });
      } 

	const embed = {
        "color": process.env.COLOUR,
        "image": {
           "url": disgust
        },
    };
    return message.channel.send({ embed });
  }