exports.run = async (client, message, args) => { 
 const fetch = require('node-fetch')
 let question = args.join(' ');
 let feel
	if (!question) {
    return message.channel.send("Please ask a **yes / no** question.");
  }
	const body = await fetch(`https://8ball.delegator.com/magic/JSON/${question}`).then(res => res.json())
  if (body.magic.type == `Affirmative`) {
    feel = process.env.EMOTE_PLUS
  } else if (body.magic.type == `Contrary`) {
    feel = process.env.EMOTE_MINUS
  } else {
    feel = process.env.EMOTE_NEUTRAL
  }
  const embed = {
        "description": `<@${message.author.id}> asks: \n > ${question} \n \n **\`Answer:\`** **${body.magic.answer} ${feel}**`,
        "color": process.env.COLOUR,
        "thumbnail": {
          "url": "https://i.imgur.com/ciZLX5u.png"
        },
    };
    return message.channel.send({ embed });
  }

  exports.conf = {
    aliases: ["eightball","magic8","magicball"]
  }
  