exports.run = (client, message, args) => {
  let make = Number(args[0])
  let test = Number.isNaN(make)
  if (!args[0]) {
    message.channel.send(`Please enter a number to roll with it as the max.`)
  } else if (test == true) {
    message.channel.send(`Please enter a number to roll with it as the max.`)
  } else {
    message.channel.send(`> **${message.author.username}** rolled a `  + `**` + (Math.round(Math.random() * (args[0] - 1) + 1)) + `** / ${args[0]}`);
  }
}
    
      exports.conf = {
    aliases: []
  }