module.exports = (client) => { 
 console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`); 
  client.user.setActivity(`+help | made by zappin`);
  }