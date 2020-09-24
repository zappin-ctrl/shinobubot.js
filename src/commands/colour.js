import Discord from "discord.js";
import axios from "axios";
import Canvas from "canvas";
import { registerFont } from 'canvas';
import {getEmbed, getUserFromMention} from "../utility";

export const aliases = ["color", "hex", "rgb", "cmyk"];
export const run = async (message, args) => {
  const errmsg = `Please type out a valid colour after \`+colour\`!\n**Examples:** \`#FFFFFF\` - \`rgb(0,71,171)\` - \`hsl(215,100%,34%)\` - \`cmyk(100,58,0,33)\``;

  message.channel.startTyping();

  let question = args.join('');
  let user = getUserFromMention(args[0]);
  let mention = await message.guild.members.fetch(user.id);
  if (!question) {
    return message.channel.send(errmsg);
  }
    
  let type;
  if (question.includes("rgb") === true) {
    type = "rgb";
  } else if (question.includes("hsl") === true) {
    type = "hsl";
  } else if (question.includes("cmyk") === true) {
    type = "cmyk";
  } else {
    type = "hex";
    if (!mention) {
      question = args[0].replace('#','');
    } else {
      question = mention.displayHexColor.toString().replace('#','');
    }
  }

  if (type !== "hex") {
    question = question.replace(/([^(\)]+)(?:$)/g ,"").replace(/^([^(]*)/g, "");
  }

  try {
    const colour = await axios.get(`https://www.thecolorapi.com/scheme?${type}=${question}`);
    if (colour.data.colors[0].cmyk.value.includes("NaN") === true) {
      return message.channel.send(errmsg);
    }

      registerFont('./assets/fonts/Roboto.ttf', { family: 'Roboto' });
      const canvas = Canvas.createCanvas(200, 200);
      const ctx = canvas.getContext('2d');
      ctx.beginPath();
      ctx.rect(0, 0, 200, 200);
      ctx.fillStyle = `${colour.data.seed.hex.value}`;
      ctx.fill();
      const rightpic = new Discord.MessageAttachment(canvas.toBuffer(), 'seed.jpg');

      const canvasx = Canvas.createCanvas(500, 100);
      const ctxt = canvasx.getContext('2d');
      var x = canvasx.width / 2;
      var y = canvasx.height / 2;
      ctxt.font = "12px Roboto";
      ctxt.textAlign = 'center';
      let addup = 0;
      let i = 0;
      for (i=0; i<5; i++) {
        ctxt.beginPath();
        ctxt.rect(addup,0,100,100);
        ctxt.fillStyle = `${colour.data.colors[i].hex.value}`;
        ctxt.fill();
        addup = addup + 100;
        ctxt.beginPath();
        ctxt.rect(addup-80,y-15,60,30);
        ctxt.fillStyle = `black`;
        ctxt.fill();
        ctxt.fillStyle = `white`;
        ctxt.fillText(`${colour.data.colors[i].hex.value}`, addup-51, y+4.3);
      }
      const bigpic = new Discord.MessageAttachment(canvasx.toBuffer(), 'array.jpg');

      const embed = getEmbed();
      const embmsg = `**HEX: \`${colour.data.seed.hex.value}\`  RGB: \`${colour.data.seed.rgb.value}\`\nCMYK: \`${colour.data.seed.cmyk.value}\`**`
      embed.setTitle(colour.data.seed.name.value);
      embed.setURL(`http://www.thecolorapi.com/id?format=html&hex=${colour.data.seed.hex.clean}`);
      embed.setColor(`0x${colour.data.seed.hex.value}`);
      embed.setDescription(embmsg);
      embed.attachFiles(rightpic);
      embed.setThumbnail(`attachment://seed.jpg`);
      embed.attachFiles(bigpic);
      embed.setImage(`attachment://array.jpg`);
      
      await message.channel.send(embed);
  } catch {
    message.channel.send(errmsg)
  } finally {
    message.channel.stopTyping();
  }
};

export const help = 'Get information on a HEX/RGB/CMYK colour.';
export const helpArguments = '[HEX/RGB/CMYK code]';
export const helpGroup = 'utility';
