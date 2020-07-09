exports.run = async (client, message, args) => { 
 const fetch = require('node-fetch') 
 const body = await fetch('https://nekos.life/api/v2/img/hug').then(res => res.json())
 let getUserFromMention = message.mentions.users.first()
	if (args[0]) {
		const user = getUserFromMention
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

	    const embed = {
            "description": `<@${message.author.id}> hugged <@${user.id}>`,
            "color": process.env.COLOUR,
            "image": {
               "url": body.url //this is where the neko.sfw.hug url should go
            },
        };
        return message.channel.send({ embed });
      } 

	const embed = {
        "description": `<@${message.author.id}> hugged themselves.`,
        "color": process.env.COLOUR,
        "image": {
           "url": body.url //this is where the neko.sfw.hug url should go
        },
    };
    return message.channel.send({ embed });
  }