exports.run = async (client, message, args) => {
   let getUserFromMention = message.mentions.users.first()
	 if (args[0]) {
  	const user = getUserFromMention
		if (!user) {
			return message.reply('please use a proper mention.');
    } else if (user.id === message.author.id) {
        return message.channel.send(`<@${message.author.id}> killed themselves ${process.env.DEAD_EMOTE}`);
    }  
     function doRand() {
       var rando = [`${process.env.LOADING_EMOTE} Getting ready to rumble . . .`,`${process.env.LOADING_EMOTE} On your marks, get set, go . . .`,`${process.env.LOADING_EMOTE} There's a brawl brewing . . .`,`${process.env.LOADING_EMOTE} The stage is set, fight . . .`,`${process.env.LOADING_EMOTE} This one's for Knack 2 baby . . .`,`${process.env.LOADING_EMOTE} This is a battle for the legends . . .`,`${process.env.LOADING_EMOTE} Let's fucking GOOOOOO . . .`,`${process.env.LOADING_EMOTE} Winner is chad, loser is incel . . .`];
       return rando[Math.floor(Math.random()*rando.length)];
     }
    const m = await message.channel.send(doRand());
     function doRandHT() {
       var rand = [`<@${user.id}> is the winner! **R.I.P. ${message.author.username}** ${process.env.DEAD_EMOTE}`,`<@${message.author.id}> is the winner! **R.I.P. ${user.username}** ${process.env.DEAD_EMOTE}`];
       return rand[Math.floor(Math.random()*rand.length)];
      }   
      setTimeout(function(){
        m.edit(doRandHT());
      }, 2800)
    } else {
    message.channel.send(`<@${message.author.id}> killed themselves ${process.env.DEAD_EMOTE}`);
}
} 
  exports.conf = {
    aliases: ["battle","vs"]
  }