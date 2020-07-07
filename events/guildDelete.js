module.exports = (client, guild) => { 
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`+help | made by zappin`);
  }