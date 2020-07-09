exports.run = async (client, message, args) => { 
 const fetch = require('node-fetch')
 let question = message.content.replace("+8ball", ""); 
	if (!question) {
    return message.channel.send("Please ask a **yes / no** question.");
  }
	const body = await fetch(`https://8ball.delegator.com/magic/JSON/${question}`).then(res => res.json())
 // if (body.magic.type.includes(`Affirmative`)) {
 //   let feel = `<:added:727964272524787733>`
 // } else if (body.magic.type.includes(`Contrary`)) {
 //   let feel = `<:removed:727964250185793709>`
 // } else {
 //   let feel = `<:change:727964186537361408>`
 // }
  const embed = {
        "description": `<@${message.author.id}> asks: \n > ${question} \n \n **\`Answer:\`** **${body.magic.answer}**`,
        "color": process.env.COLOUR,
        "thumbnail": {
          "url": "https://i.imgur.com/ciZLX5u.png"
        },
    };
    return message.channel.send({ embed });
  }