exports.run = async (client, message, args) => { 
  if (message.author.id == process.env.OWNER) {
	const embed = {
        "description": `${process.env.EMOTE_VERIFIED} **[Click here](https://discord.com/api/oauth2/authorize?client_id=490901986502377512&permissions=379968&scope=bot) to invite the bot to your server.**\n(if you run into issues, contact <@148407805882269696>)`,
        "color": process.env.COLOUR,
    };
 return message.channel.send({embed})
} else {
 return message.channel.send(`Please contact <@148407805882269696> if you want to invite the bot.`)
} 
}
    exports.conf = {
    aliases: []
  }