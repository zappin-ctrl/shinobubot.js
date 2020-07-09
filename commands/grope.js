exports.run = async (client, message, args) => { 
 const { gropeP } = require('./actions.json');
 const fetch = require('node-fetch') 
 var grope = gropeP[Math.round(Math.random() * (gropeP.length - 1))];
 let getUserFromMention = message.mentions.users.first()
	if (args[0]) {
		const user = getUserFromMention
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