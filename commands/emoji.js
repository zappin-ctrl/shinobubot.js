exports.run = async (client, message, args) => {
 const emoji = args[0]
  if(!emoji) return message.reply('Please define emoji to search for.');
  let filer
  let embed
  if (emoji.includes(`<a:`, 0) == true) {
     const test = emoji.replace(/\<a:(.*?)\:+/g, '').replace(/>+/g, '')
     filer = `https://cdn.discordapp.com/emojis/${test}.gif`
     	 embed = {
        "description": `Type: **Animated(.gif)** \n ID: **${test}**`,
        "color": process.env.COLOUR,
        "image": {
           "url": filer
        },
    };
  } else if (emoji.includes(`<:`, 0) == true) { 
     const test = emoji.replace(/\<:(.*?)\:+/g, '').replace(/>+/g, '')
     filer = `https://cdn.discordapp.com/emojis/${test}.png`
    	 embed = {
       "description": `Type: **Image(.png)** \n ID: **${test}**`,
       "color": process.env.COLOUR,
       "image": {
         "url": filer
        },
    };
  } else {
        	 embed = {
       "description": `**Seems to be an invalid emoji. Please try a different one.**`,
       "color": process.env.COLOUR
    };
  }
  return message.channel.send({ embed });
  }


    exports.conf = {
    aliases: ["emote","enlarge","steal"]
  }
