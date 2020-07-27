exports.run = (client, message, args) => {
  let question = message.content.replace("+rate","");
  let num = Math.floor(Math.random() * 100)
  let rating = ``
  if (num >= 0 && num <25) {
  rating = `not that great...`
  } else if (num >= 25 && num < 50) {
  rating = `it's okay...`
  } else if (num >= 50 && num <75) {
  rating = `pretty good!`
  } else {
  rating = `i love it!`
  }
	if (!question) {
    return message.channel.send("Please type something to be rated.");
  }
  return message.channel.send(`I'd rate**${question}** a solid **${num}/100**, ${rating}`)
    }
      exports.conf = {
    aliases: []
  }
