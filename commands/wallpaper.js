exports.run = async (client, message, args) => { 
 const fetch = require('node-fetch') 
const body = await fetch('https://nekos.life/api/v2/img/wallpaper').then(res => res.json())
    return message.channel.send(`${body.url} **<- Click for full resolution**`);
  }