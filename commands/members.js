exports.run = async (client, message, args, guild) => { 
  const hmembers = message.guild.members.cache.filter(member => !member.user.bot).size;
  return message.channel.send(`> **Shinobu & Friends** currently has: [**${hmembers}**] members! <:shinobuwow:652549632290848788>`)
}
  exports.conf = {
    aliases: ["users"]
  }