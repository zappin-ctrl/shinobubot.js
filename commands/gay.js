exports.run = (client, message, args) => {
  function quote(thing) {
    if (thing == 0) {
      return `You're straight! Congrats!`
    } else if (thing > 0 && thing < 25) {
      return `Not that gay tbh`
    } else if (thing >= 25 && thing <50) {
      return `Kinda gay i guess`
    } else if (thing >= 50 && thing <75) {
      return `Pretty damn gay`
    } else if (thing >= 75 && thing <= 100) {
      return `So gay it hurts oof`
    } else if (thing >100 && thing <200) {
      return `You're beyond gay wow`
    } else if (thing >200 && thing <207) {
      return `Gay beyond what is cosmically known...`
    } else if (thing == 207) {
      return `GAY OVERLORD OF CUM`
    }
    
  }
 let getUserFromMention = message.mentions.users.first()
	if (args[0]) {
    const user = getUserFromMention
    if (!user) {
      return message.channel.send(`Please use a proper mention.`)
    }
    const x = (((Math.cos(user.id)) * Math.PI) * 0.5) + 0.5;
    const fix = Math.round(Math.abs(x)*100)
    const embed = {
      "description": `<@${user.id}> is **${fix}%** gay! ${process.env.EMOTE_DANCE}\n\n`,
      "color": process.env.COLOUR,
      "footer": {
       "text": quote(fix)
      },
      "image": {
         "url": `http://www.yarntomato.com/percentbarmaker/button.php?barPosition=${fix}&leftFill=%23FF99FF`
       },
    };
    return message.channel.send({ embed })
    }
  const x = (((Math.cos(message.author.id)) * Math.PI) * 0.5) + 0.5;
  const fix = Math.round(Math.abs(x)*100)
  const embed = {
   "description": `You're **${fix}%** gay! ${process.env.EMOTE_DANCE}`,
   "color": process.env.COLOUR,
   "footer": {
      "text": quote(fix)
    },
    "image": {
      "url": `http://www.yarntomato.com/percentbarmaker/button.php?barPosition=${fix}&leftFill=%23FF99FF`
     },
    };
    return message.channel.send({ embed })
}

      exports.conf = {
    aliases: []
  }