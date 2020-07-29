exports.run = async (client, message, args, argsclean) => { 
if (!args[0]) {
  return message.channel.send(`Please type something for me to repeat.`)
} else {
let say = argsclean.join(" ")
message.delete({ timeout: 10000 }).catch(O_o=>{}); 
return message.channel.send(say)
}
}

    exports.conf = {
    aliases: ["echo"]
  }
