exports.run = async (client, message, args) => { 
function msToTime(e){var n=e%1e3,r=(e=(e-n)/1e3)%60,i=(e=(e-r)/60)%60;return(e-i)/60+":"+i+":"+r}
let utc = msToTime(client.uptime)
return message.channel.send(`**Shinobu Bot v1.0 | Status**\n**Uptime:** ${utc}`)

} 
    exports.conf = {
    aliases: []
  }