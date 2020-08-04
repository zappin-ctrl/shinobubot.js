exports.run = async (client, message, args) => {
   function quote(thing) {
    if (thing == 0) {
      return `You guys aren't even remotely a match . . .`
    } else if (thing > 0 && thing < 25) {
      return `Maybe you're better of as  distant friends.`
    } else if (thing >= 25 && thing <50) {
      return `You guys are friends but i sense no romance.`
    } else if (thing >= 50 && thing <75) {
      return `There's a connection between the two!`
    } else if (thing >= 75 && thing < 100) {
      return `Love is in the air <3`
    } else if (thing == 100) {
      return `Such a cute couple <3 <3 <3`
    }
  }
  function fhalf(str) {
    var middle = Math.ceil(str.length / 2);
    var s1 = str.slice(0, middle);
    return s1
};
function shalf(str) {
    var middle = Math.ceil(str.length / 2);
    var s2 = str.slice(middle);
    return s2
};
  const seedrandom = require('seedrandom');
  const usera = getUserFromMention(args[0])
	if (!args[0] || !usera) {
   return message.channel.send(`Please mention a user.`)
  }
  let userb = getUserFromMention(args[1])
  if (!args[1] || !userb) {
    let add = usera.id + message.author.id
    let x = seedrandom(add)
    let final = Math.round(Math.abs(x())*100)
    if (final > 100) {
      final = 100
    } else if (final < 0) {
      final = 0 
    } else {
    }
    let shipa = fhalf(message.author.username) + shalf(usera.username)
    const embed = {
      "description": `<@${message.author.id}> and <@${usera.id}>'s love is at **${final}%**\n\n> Your shipname is: **${shipa}**`,
      "color": process.env.COLOUR,
       "footer": {
       "text": quote(final)
      },
      "image": {
        "url": `https://api.alexflipnote.dev/ship?user=${message.author.displayAvatarURL()}&user2=${usera.displayAvatarURL()}`,
      }
    }
    return message.channel.send({embed})
  } else if (userb) {
    let add = usera.id + userb.id
    let x = seedrandom(add)
    let final = Math.round(Math.abs(x())*100)
    if (final > 100) {
      final = 100
    } else if (final < 0) {
      final = 0 
    } else {
    }
    let shipb = fhalf(usera.username) + shalf(userb.username)
    const embed = {
      "description": `<@${usera.id}> and <@${userb.id}>'s love is at **${final}%**\n\n> Your shipname is: **${shipb}**`,
      "color": process.env.COLOUR,
       "footer": {
       "text": quote(final)
      },
      "image": {
        "url": `https://api.alexflipnote.dev/ship?user=${usera.displayAvatarURL()}&user2=${userb.displayAvatarURL()}`,
      }
    }
        return message.channel.send({embed})
  }
  }
  
  
      exports.conf = {
    aliases: ["lovecalc","ship","calclove"]
  }
