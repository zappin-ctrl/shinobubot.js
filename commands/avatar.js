exports.run = async (client, message, args) => { 
  const fileauthor = message.author.displayAvatarURL({ format: 'jpg' , dynamic: true , size: 256})
	if (args[0]) {
		const user = getUserFromMention(args[0])
		if (!user) {
			return message.reply('Please use a proper mention.');
		}
      const fileuser = user.displayAvatarURL({ format: 'jpg' , dynamic: true , size: 256})
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