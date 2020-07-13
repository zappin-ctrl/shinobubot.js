/* exports.run = async (client, message, args) => { 
 const fetch = require('node-fetch') 
 let getUserFromMention = message.mentions.users.first()
	if (args[0]) {
		const user = getUserFromMention
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

		const body = await fetch('https://holyshit.wtf/gifs/kick/').then(res => res.json())
	    const embed = {
            "description": `<@${message.author.id}> kicked <@${user.id}>`,
            "color": process.env.COLOUR,
            "image": {
               "url": body.response
            },
        };
        return message.channel.send({ embed });
      } 

	const body = await fetch('https://holyshit.wtf/gifs/kick/').then(res => res.json())
  const test = body.response.replace(/\n/g, "")
	const embed = {
        "description": `<@${message.author.id}> kicked their own ass.`,
        "color": process.env.COLOUR,
        "image": {
           "url": finalurl.response
        },
    };
    return message.channel.send({ embed });
  }
  */
    exports.conf = {
    aliases: []
  }