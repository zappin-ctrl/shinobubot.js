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
	const canvas = Canvas.createCanvas(750, 564);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./images/sauce.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	/* // Pick up the pen
	ctx.beginPath();
	// Start the arc to form a circle
	ctx.arc(100, 100, 75, 0, Math.PI * 2, true);
	// Put the pen down
	ctx.closePath();
	// Clip off the region you drew on
	ctx.clip(); */
  ctx.globalAlpha = 0.7;
  const avatara = await Canvas.loadImage(user.displayAvatarURL({ format: 'png' }))
	ctx.drawImage(avatara, 190, 282, 260, 260);


	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'sauced.jpg');

	message.channel.send(`> Fresh tub of **${user.username}** sauce!`,attachment);
} else {
    return message.reply('please use a proper mention.');
}
};