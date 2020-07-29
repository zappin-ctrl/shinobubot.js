exports.run = async (client, message, args) => { 
function msToTime(e){var n=e%1e3,r=(e=(e-n)/1e3)%60,i=(e=(e-r)/60)%60;return(e-i)/60+":"+i+":"+r}
let utc = msToTime(client.uptime)
let embed = {
  "description": `**Uptime:** ${utc}\n\n**Servers:** \`${client.guilds.cache.size}\` - **Users:** \`${client.users.cache.size}\``,
  "color": process.env.COLOUR
  
}
return message.channel.send({embed})

} 
    exports.conf = {
    aliases: []
  }