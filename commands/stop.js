exports.run = (client, message, args) => {
	  if(message.author.id === process.env.OWNER) {
		  process.exit()
	  }
    }
      exports.conf = {
    aliases: []
  }