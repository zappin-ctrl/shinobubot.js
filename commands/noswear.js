exports.run = async (client, message, args) => { 
 const { noswearP } = require('./actions.json');
 var noswear = noswearP[Math.round(Math.random() * (noswearP.length - 1))];
 let getUserFromMention = message.mentions.users.first()
	if (args[0]) {
		const user = getUserFromMention
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

	    const embed = {
            "description": `<@${message.author.id}>, please no swearing <@${user.id}>`,
            "color": process.env.COLOUR,
            "image": {
               "url": noswear
            },
        };
        return message.channel.send({ embed });
      } 

	const embed = {
        "color": process.env.COLOUR,
        "image": {
           "url": noswear
        },
    };
    return message.channel.send({ embed });
  }
    exports.conf = {
    aliases: ["noswearing"]
  }