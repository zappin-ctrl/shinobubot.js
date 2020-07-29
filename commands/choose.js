exports.run = (client, message, args, argsclean) => {
  if (!args[0]) {
    message.channel.send(`Please type your options separated with a comma.\n**Example: \`+choose option 1,option 2,etc\`**`)
  } else {
let arg = argsclean.join(" ")
let ar = arg.split(`,`)
let random = Math.floor(Math.random() * ar.length);
let answer = ar[random]
 message.channel.send(answer)
  }
	  }

      exports.conf = {
    aliases: []
  }
