exports.run = async (client, message, args) => { 
  	if (args[0]) {
      let rip = message.cleanContent.replace("+f", "");
      return message.channel.send(`**${process.env.DEAD_EMOTE} ${message.author.username}** paid their respects for**${rip}**.`)
    } else {
      return message.channel.send(`**${process.env.DEAD_EMOTE} ${message.author.username}** paid their respects.`)
    }
}
  exports.conf = {
    aliases: ["rip"]
  }