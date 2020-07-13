exports.run = async (client, message, args, guild) => { 
let getUserFromMention = message.mentions.users.first()
const Canvas = require('canvas');
const Discord = require("discord.js");
if (args[0]) {
	const user = getUserFromMention
		if (!user) {
			return message.reply('please use a proper mention.');
    }
  //const pog = require(`./milk.jpg`)
	const canvas = Canvas.createCanvas(1263, 711);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./images/tuck.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

 /* // Pick up the pen
	ctx.beginPath();
	// Start the arc to form a circle
	ctx.arc(100, 100, 75, 0, Math.PI * 2, true);
	// Put the pen down
	ctx.closePath();
	// Clip off the region you drew on
	ctx.clip(); */

	const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }))
  ctx.shadowColor = 'black';
  ctx.shadowBlur = 25;
	ctx.drawImage(avatar, 70, 480, 265, 265);


  const avatara = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }))
  ctx.translate(canvas.width/2,canvas.height/2);
	ctx.rotate(310*Math.PI/180);
  ctx.shadowColor = 'black';
  ctx.shadowBlur = 25;
  ctx.drawImage(avatara, -180, -320, 360, 360);

  

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'tucked.jpg');

	message.channel.send(`> **${message.author.username}** has tucked **${user.username}** to sleep 💤💤💤`,attachment);
} else {
    return message.reply('please use a proper mention.');
}
}
  exports.conf = {
    aliases: ["sleep"]
  }