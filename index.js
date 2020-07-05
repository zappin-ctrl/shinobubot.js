
// Load up the discord.js library
const keep_alive = require('./keep_alive.js')
const Discord = require("discord.js");
require('dotenv').config();
const cliente = require('nekos.life');
const neko = new cliente();
const fetch = require('node-fetch')
const color = 16769572
/*
 DISCORD.JS VERSION 12 CODE
*/


// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 

// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`+help | made by zappin`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`+help | made by zappin`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`+help | made by zappin`);
});


client.on("message", async message => {
	function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(!message.content.startsWith(process.env.PREFIX)) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`);
  }
  
  if(command === "hug") {
	if (args[0]) {
		const user = getUserFromMention(args[0]);
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

		const body = await fetch('https://nekos.life/api/v2/img/hug').then(res => res.json())
	    const embed = {
            "description": `<@${message.author.id}> hugged <@${user.id}>`,
            "color": color,
            "image": {
               "url": body.url //this is where the neko.sfw.hug url should go
            },
        };
        return message.channel.send({ embed });
      } 

	const body = await fetch('https://nekos.life/api/v2/img/hug').then(res => res.json())
	const embed = {
        "description": `<@${message.author.id}> hugged themselves.`,
        "color": color,
        "image": {
           "url": body.url //this is where the neko.sfw.hug url should go
        },
    };
    return message.channel.send({ embed });
  }

  if(command === "kiss") {
	if (args[0]) {
		const user = getUserFromMention(args[0]);
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

		const body = await fetch('https://nekos.life/api/v2/img/kiss').then(res => res.json())
	    const embed = {
            "description": `<@${message.author.id}> kissed <@${user.id}>`,
            "color": color,
            "image": {
               "url": body.url //this is where the neko.sfw.hug url should go
            },
        };
        return message.channel.send({ embed });
      } 

	const body = await fetch('https://nekos.life/api/v2/img/kiss').then(res => res.json())
	const embed = {
        "description": `<@${message.author.id}> kissed themselves.`,
        "color": color,
        "image": {
           "url": body.url //this is where the neko.sfw.hug url should go
        },
    };
    return message.channel.send({ embed });
  }

  if(command === "slap") {
	if (args[0]) {
		const user = getUserFromMention(args[0]);
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

		const body = await fetch('https://nekos.life/api/v2/img/slap').then(res => res.json())
	    const embed = {
            "description": `<@${message.author.id}> slapped <@${user.id}>`,
            "color": color,
            "image": {
               "url": body.url 
            },
        };
        return message.channel.send({ embed });
      } 

	const body = await fetch('https://nekos.life/api/v2/img/slap').then(res => res.json())
	const embed = {
        "description": `<@${message.author.id}> slapped themselves.`,
        "color": color,
        "image": {
           "url": body.url 
        },
    };
    return message.channel.send({ embed });
  }
  
  if(command === "pat") {
	if (args[0]) {
		const user = getUserFromMention(args[0]);
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

		const body = await fetch('https://nekos.life/api/v2/img/pat').then(res => res.json())
	    const embed = {
            "description": `<@${message.author.id}> gave <@${user.id}> a pat.`,
            "color": color,
            "image": {
               "url": body.url 
            },
        };
        return message.channel.send({ embed });
      } 

	const body = await fetch('https://nekos.life/api/v2/img/pat').then(res => res.json())
	const embed = {
        "description": `<@${message.author.id}> gave themselves a pat.`,
        "color": color,
        "image": {
           "url": body.url 
        },
    };
    return message.channel.send({ embed });
  }
  
  if(command === "cuddle") {
	if (args[0]) {
		const user = getUserFromMention(args[0]);
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

		const body = await fetch('https://nekos.life/api/v2/img/cuddle').then(res => res.json())
	    const embed = {
            "description": `<@${message.author.id}> cuddled with <@${user.id}>`,
            "color": color,
            "image": {
               "url": body.url 
            },
        };
        return message.channel.send({ embed });
      } 

	const body = await fetch('https://nekos.life/api/v2/img/cuddle').then(res => res.json())
	const embed = {
        "description": `<@${message.author.id}> cuddled with themselves`,
        "color": color,
        "image": {
           "url": body.url 
        },
    };
    return message.channel.send({ embed });
  }
  
  if(command === "cry") {
	if (args[0]) {
		const user = getUserFromMention(args[0]);
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

		const body = await fetch('https://waifu.pics/api/cry').then(res => res.json())
	    const embed = {
            "description": `<@${message.author.id}> cries with <@${user.id}>`,
            "color": color,
            "image": {
               "url": body.url 
            },
        };
        return message.channel.send({ embed });
      } 

	const body = await fetch('https://waifu.pics/api/cry').then(res => res.json())
	const embed = {
        "description": `<@${message.author.id}> is crying`,
        "color": color,
        "image": {
           "url": body.url 
        },
    };
    return message.channel.send({ embed });
  }  
  
  if(command === "lick") {
	if (args[0]) {
		const user = getUserFromMention(args[0]);
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

		const body = await fetch('https://waifu.pics/api/lick').then(res => res.json())
	    const embed = {
            "description": `<@${message.author.id}> licked <@${user.id}>`,
            "color": color,
            "image": {
               "url": body.url 
            },
        };
        return message.channel.send({ embed });
      } 

	const body = await fetch('https://waifu.pics/api/lick').then(res => res.json())
	const embed = {
        "description": `<@${message.author.id}> licked themselves`,
        "color": color,
        "image": {
           "url": body.url 
        },
    };
    return message.channel.send({ embed });
  }  
  
  if(command === "smug") {
	if (args[0]) {
		const user = getUserFromMention(args[0]);
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

		const body = await fetch('https://nekos.life/api/v2/img/smug').then(res => res.json())
	    const embed = {
            "description": `<@${message.author.id}> smugs at <@${user.id}>`,
            "color": color,
            "image": {
               "url": body.url 
            },
        };
        return message.channel.send({ embed });
      } 

	const body = await fetch('https://nekos.life/api/v2/img/smug').then(res => res.json())
	const embed = {
        "description": `<@${message.author.id}> is feeling smug`,
        "color": color,
        "image": {
           "url": body.url 
        },
    };
    return message.channel.send({ embed });
  }
  
  if(command === "tickle") {
	if (args[0]) {
		const user = getUserFromMention(args[0]);
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

		const body = await fetch('https://nekos.life/api/v2/img/tickle').then(res => res.json())
	    const embed = {
            "description": `<@${message.author.id}> tickled <@${user.id}>`,
            "color": color,
            "image": {
               "url": body.url 
            },
        };
        return message.channel.send({ embed });
      } 

	const body = await fetch('https://nekos.life/api/v2/img/tickle').then(res => res.json())
	const embed = {
        "description": `<@${message.author.id}> tickled themselves`,
        "color": color,
        "image": {
           "url": body.url 
        },
    };
    return message.channel.send({ embed });
  }
  
  if(command === "baka") {
	if (args[0]) {
		const user = getUserFromMention(args[0]);
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

		const body = await fetch('https://nekos.life/api/v2/img/baka').then(res => res.json())
	    const embed = {
            "description": `<@${message.author.id}> called <@${user.id}> a dummy`,
            "color": color,
            "image": {
               "url": body.url 
            },
        };
        return message.channel.send({ embed });
      } 

	const body = await fetch('https://nekos.life/api/v2/img/baka').then(res => res.json())
	const embed = {
        "color": color,
        "image": {
           "url": body.url 
        },
    };
    return message.channel.send({ embed });
  }
  
  if(command === "poke") {
	if (args[0]) {
		const user = getUserFromMention(args[0]);
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

		const body = await fetch('https://nekos.life/api/v2/img/poke').then(res => res.json())
	    const embed = {
            "description": `<@${message.author.id}> poked <@${user.id}>`,
            "color": color,
            "image": {
               "url": body.url 
            },
        };
        return message.channel.send({ embed });
      } 

	const body = await fetch('https://nekos.life/api/v2/img/poke').then(res => res.json())
	const embed = {
        "description": `<@${message.author.id}> poked themselves`,
        "color": color,
        "image": {
           "url": body.url 
        },
    };
    return message.channel.send({ embed });
  }
  
  if(command === "blush") {
	if (args[0]) {
		const user = getUserFromMention(args[0]);
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

		const body = await fetch('https://waifu.pics/api/blush').then(res => res.json())
	    const embed = {
            "description": `<@${message.author.id}> blushes at <@${user.id}>`,
            "color": color,
            "image": {
               "url": body.url 
            },
        };
        return message.channel.send({ embed });
      } 

	const body = await fetch('https://waifu.pics/api/blush').then(res => res.json())
	const embed = {
        "description": `<@${message.author.id}> blushed`,
        "color": color,
        "image": {
           "url": body.url 
        },
    };
    return message.channel.send({ embed });
  } 
  
  if(command === "wink") {
	if (args[0]) {
		const user = getUserFromMention(args[0]);
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

		const body = await fetch('https://waifu.pics/api/wink').then(res => res.json())
	    const embed = {
            "description": `<@${message.author.id}> winked at <@${user.id}>`,
            "color": color,
            "image": {
               "url": body.url 
            },
        };
        return message.channel.send({ embed });
      } 

	const body = await fetch('https://waifu.pics/api/wink').then(res => res.json())
	const embed = {
        "description": `<@${message.author.id}> winks mysteriously`,
        "color": color,
        "image": {
           "url": body.url 
        },
    };
    return message.channel.send({ embed });
  }
  
  if(command === "nom") {
	if (args[0]) {
		const user = getUserFromMention(args[0]);
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

		const body = await fetch('https://waifu.pics/api/nom').then(res => res.json())
	    const embed = {
            "description": `<@${message.author.id}> nommed <@${user.id}>`,
            "color": color,
            "image": {
               "url": body.url 
            },
        };
        return message.channel.send({ embed });
      } 

	const body = await fetch('https://waifu.pics/api/nom').then(res => res.json())
	const embed = {
        "color": color,
        "image": {
           "url": body.url 
        },
    };
    return message.channel.send({ embed });
  }
  
  if(command === "highfive") { 
	if (args[0]) {
		const user = getUserFromMention(args[0]);
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

		const body = await fetch('https://waifu.pics/api/highfive').then(res => res.json())
	    const embed = {
            "description": `<@${message.author.id}> highfived <@${user.id}>`,
            "color": color,
            "image": {
               "url": body.url 
            },
        };
        return message.channel.send({ embed });
      } 

	const body = await fetch('https://waifu.pics/api/highfive').then(res => res.json())
	const embed = {
        "description": `<@${message.author.id}> highfived themselves`,
        "color": color,
        "image": {
           "url": body.url 
        },
    };
    return message.channel.send({ embed });
  }
  
  if(command === "bite") {
	if (args[0]) {
		const user = getUserFromMention(args[0]);
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

		const body = await fetch('https://waifu.pics/api/bite').then(res => res.json())
	    const embed = {
            "description": `<@${message.author.id}> bit <@${user.id}>`,
            "color": color,
            "image": {
               "url": body.url 
            },
        };
        return message.channel.send({ embed });
      } 

	const body = await fetch('https://waifu.pics/api/bite').then(res => res.json())
	const embed = {
        "description": `<@${message.author.id}> bit themselves`,
        "color": color,
        "image": {
           "url": body.url 
        },
    };
    return message.channel.send({ embed });
  }
  
  if(command === "dance") {
	if (args[0]) {
		const user = getUserFromMention(args[0]);
		if (!user) {
			return message.reply('Please use a proper mention.');
		}

		const body = await fetch('https://waifu.pics/api/dance').then(res => res.json())
	    const embed = {
            "description": `<@${message.author.id}> is dancing with <@${user.id}>`,
            "color": color,
            "image": {
               "url": body.url 
            },
        };
        return message.channel.send({ embed });
      } 

	const body = await fetch('https://waifu.pics/api/dance').then(res => res.json())
	const embed = {
        "description": `<@${message.author.id}> is dancing alone`,
        "color": color,
        "image": {
           "url": body.url 
        },
    };
    return message.channel.send({ embed });
  }
  
  if(command === "help") {
	const embed = {
		"title": "🍩 Here's a list of what i can do: 🍩",
        "description": `**Fun Stuff:** \n \n > hug | kiss | cuddle | bite | cry | nom | blush | dance | lick \n \n > poke | pat | highfive | wink | baka |  smug | tickle \n \n **Utility:** \n \n > ping | help`,
        "color": color,
    };   
	return message.channel.send({ embed });
  }

  if(command === "stop") {
	  if(message.author.id === "148407805882269696") {
		  process.exit()
	  }
  }
});


client.login(process.env.DISCORD_TOKEN);