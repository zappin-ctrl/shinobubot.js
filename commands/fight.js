exports.run = async (client, message, args) => {
   let getUserFromMention = message.mentions.users.first()
	 if (args[0]) {
  	const user = getUserFromMention
		if (!user) {
			return message.reply('please use a proper mention.');
    }   
    const m = await message.channel.send("<a:loading:731893542141558894> Loading the winner . . .");
     function doRandHT() {
       var rand = [`<@${user.id}> is the winner! **R.I.P. ${message.author.username}** <:shinobuded:730902827848827002>`,`<@${message.author.id}> is the winner! **R.I.P. ${user.username}** <:shinobuded:730902827848827002>`];
       return rand[Math.floor(Math.random()*rand.length)];
      }   
      setTimeout(function(){
        m.edit(doRandHT());
      }, 2500)
    } else {
    message.channel.send(`<@${message.author.id}> killed themselves <:shinobuded:730902827848827002>`);
}
}