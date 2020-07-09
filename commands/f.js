exports.run = async (client, message, args) => { 
  	if (args[0]) {
      let rip = message.content.replace("+f", "");
      return message.channel.send(`**<:shinobuded:730902827848827002> ${message.author.username}** paid their respects for**${rip}**.`)
    } else {
      return message.channel.send(`**<:shinobuded:730902827848827002> ${message.author.username}** paid their respects.`)
    }
};
