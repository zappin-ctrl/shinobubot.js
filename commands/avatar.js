exports.run = async (client, message, args) => { 
  let getUserFromMention = message.mentions.users.first()
  const fileauthor = message.author.displayAvatarURL({ format: 'jpg' , dynamic: true , size: 256})
	if (args[0]) {
		const user = getUserFromMention
    const fileuser = user.displayAvatarURL({ format: 'jpg' , dynamic: true , size: 256})
		if (!user) {
			return message.reply('Please use a proper mention.');
		}
      return message.channel.send({ files: [{
    attachment: fileuser
  }]
  });
  }
      return message.channel.send({ files: [{
    attachment: fileauthor
  }]
      
      });

}
  exports.conf = {
    aliases: ["pfp","image","profilepic","pic"]
  }