exports.run = async (client, message, args) => {
 const emoji = args[0]
  if(!emoji) return message.reply('Please define emoji to search for.');

  const emojiID = emoji.replace(/[^0-9]+/g, '');
  let filer
  if (emoji.includes(`<a:`, 0) == true) {
     filer = `https://cdn.discordapp.com/emojis/${emojiID}.gif`
  } else if (emoji.includes(`<:`, 0) == true) { 
     filer = `https://cdn.discordapp.com/emojis/${emojiID}.png`
  } else {
    let filer = `Not an existing emoji.`
  }
    if (filer == `Not an existing emoji.`) {
    return message.channel.send(filer)
  } else {
 return message.channel.send({
  files: [{
    attachment: filer,
  }]
 }) 
  }
}

    exports.conf = {
    aliases: ["emote","enlarge","steal"]
  }