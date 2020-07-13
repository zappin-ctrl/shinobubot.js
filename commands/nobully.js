exports.run = async (client, message, args) => { 
 const { nobullyP } = require('./actions.json'); 
 var nobully = nobullyP[Math.round(Math.random() * (nobullyP.length - 1))];
 let getUserFromMention = message.mentions.users.first()
	if (args[0]) {
		const user = getUserFromMention
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

	    const embed = {
            "description": `<@${message.author.id}>, please no bulli <@${user.id}>`,
            "color": process.env.COLOUR,
            "image": {
               "url": nobully
            },
        };
        return message.channel.send({ embed });
      } 

	const embed = {
        "color": process.env.COLOUR,
        "image": {
           "url": nobully
        },
    };
    return message.channel.send({ embed });
  }
    exports.conf = {
    aliases: ["nobulli"]
  }