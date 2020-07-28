exports.run = (client, message, args) => {
	  if(message.author.id === process.env.OWNER) {
    if (args[0] !== `leave`) { 
      let guilds = client.guilds.cache.map(guild => `**${guild.name}** (${guild.memberCount}) - \`${guild.id}\`\nOwner: ${guild.owner} (\`${guild.ownerID}\`)\n`)
      let fix = guilds.toString().replace(`,`,`\n`)
  	    const embed = {
            "description": `${fix} \n **Servers:** ${client.guilds.cache.size} - **Users:** ${client.users.cache.size}`,
            "color": process.env.COLOUR,
        }; 
      message.channel.send({embed})
    } else if (args[0] == `leave`) {
      let guildie = client.guilds.cache.map(guild => guild.id)
      if (guildie.includes(args[1]) == false) {
        message.channel.send(`Please provide an ID of a server I am in!`)
      } else {
       client.guilds.cache.get(args[1]).leave()
       message.channel.send(`I've left the guild ${process.env.EMOTE_VERIFIED}`)
      }
      }
    }
	  }
    
      exports.conf = {
    aliases: ["guilds"]
  }