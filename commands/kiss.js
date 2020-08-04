exports.run = async (client, message, args) => { 
 const fetch = require('node-fetch') 
 const body = await fetch('https://nekos.life/api/v2/img/kiss').then(res => res.json())
	if (args[0]) {
		const user = getUserFromMention(args[0])
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

	    const embed = {
            "description": `<@${message.author.id}> kissed <@${user.id}>`,
            "color": process.env.COLOUR,
            "image": {
               "url": body.url //this is where the neko.sfw.hug url should go
            },
        };
        return message.channel.send({ embed });
      } 

	const embed = {
        "description": `<@${message.author.id}> kissed themselves.`,
        "color": process.env.COLOUR,
        "image": {
           "url": body.url //this is where the neko.sfw.hug url should go
        },
    };
    return message.channel.send({ embed });
  }
    exports.conf = {
    aliases: ["smooch"]
  }