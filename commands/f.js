exports.run = async (client, message, args) => { 
  	if (args[0]) {
      let rip = message.content.replace("+f", "");
      return message.channel.send(`**${process.env.DEAD_EMOTE} ${message.author.username}** paid their respects for**${rip}**.`)
    } else {
      return message.channel.send(`**${process.env.DEAD_EMOTE} ${message.author.username}** paid their respects.`)
    }
};
