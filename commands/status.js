exports.run = async (client, message, args) => { 
  function formatBytes(a,b=2){if(0===a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d]}
  function fancyTimeFormat(n){var r=~~(n/3600),a=~~(n%3600/60),t=~~n%60,c="";return r>0&&(c+=r+":"+(a<10?"0":"")),c+=a+":"+(t<10?"0":""),c+=""+t}
var os = require('os');
//let tmem = os.totalmem()
let tmemgb = formatBytes(os.totalmem())
//let fmem = os.freemem()
let fmemgb = formatBytes(os.freemem())
//let ut = os.uptime() 
let utc = fancyTimeFormat(os.uptime())
return message.channel.send(`**Shinobu Bot v1.0 | Status**\n**Free/Total RAM:** ${fmemgb}/${tmemgb} | **Uptime:** ${utc}`)

} 
    exports.conf = {
    aliases: []
  }