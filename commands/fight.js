exports.run = async (client, message, args) => {
   let getUserFromMention = message.mentions.users.first()
	 if (args[0]) {
  	const user = getUserFromMention
		if (!user) {
			return message.reply('please use a proper mention.');
    } else if (user.id === message.author.id) {
        return message.channel.send(`<@${message.author.id}> killed themselves ${process.env.DEAD_EMOTE}`);
    }  
    const m = await message.channel.send(`${process.env.LOADING_EMOTE} Loading the winner . . .`);
     function doRandHT() {
       var rand = [`<@${user.id}> is the winner! **R.I.P. ${message.author.username}** ${process.env.DEAD_EMOTE}`,`<@${message.author.id}> is the winner! **R.I.P. ${user.username}** ${process.env.DEAD_EMOTE}`];
       return rand[Math.floor(Math.random()*rand.length)];
      }   
      setTimeout(function(){
        m.edit(doRandHT());
      }, 2500)
    } else {
    message.channel.send(`<@${message.author.id}> killed themselves ${process.env.DEAD_EMOTE}`);
}
}
