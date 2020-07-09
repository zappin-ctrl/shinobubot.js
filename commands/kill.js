exports.run = async (client, message, args) => { 
 const { killP } = require('./actions.json');
 const fetch = require('node-fetch') 
 var kill = killP[Math.round(Math.random() * (killP.length - 1))];
 let getUserFromMention = message.mentions.users.first()
	if (args[0]) {
		const user = getUserFromMention
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

	    const embed = {
            "description": `<@${message.author.id}> killed <@${user.id}>`,
            "color": process.env.COLOUR,
            "image": {
               "url": kill
            },
        };
        return message.channel.send({ embed });
      } 

	const embed = {
        "color": process.env.COLOUR,
        "image": {
           "url": kill
        },
    };
    return message.channel.send({ embed });
  }