
exports.run = async (client, message, args, guild) => { 
let getUserFromMention = message.mentions.users.first()
const Canvas = require('canvas');
const Discord = require("discord.js");
/*const applyText = (canvas, text) => {
	const ctx = canvas.getContext('2d');

	// Declare a base size of the font
	let fontSize = 70;

	do {
		// Assign the font to the context and decrement it so it can be measured again
		ctx.font = `${fontSize -= 10}px sans-serif`;
		// Compare pixel width of the text to the canvas minus the approximate avatar size
	} while (ctx.measureText(text).width > canvas.width);

	// Return the result to use in the actual canvas
	return ctx.font;
}; */
if (args[0]) {
	const user = getUserFromMention
		if (!user) {
			return message.reply('please use a proper mention.');
    }
  //const pog = require(`./milk.jpg`)
	const canvas = Canvas.createCanvas(664, 581);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('./images/marry.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


	/* // Pick up the pen
	ctx.beginPath();
	// Start the arc to form a circle
	ctx.arc(100, 100, 75, 0, Math.PI * 2, true);
	// Put the pen down
	ctx.closePath();
	// Clip off the region you drew on
	ctx.clip(); */
  /* ctx.font = applyText(canvas, `${message.author.username} married ${user.username}!`);
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${message.author.username} married ${user.username}!`, canvas.width / 2.5, canvas.height / 1.8); */

	const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ format: 'jpg' }))
	ctx.drawImage(avatar, 400, 35, 150, 150);

  const avatara = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }))
	ctx.drawImage(avatara, 160, 35, 150, 150);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'marriage.jpg');

	message.channel.send(`> **${message.author.username}** has married **${user.username}**`,attachment);
} else {
    return message.reply('please use a proper mention.');
}
};