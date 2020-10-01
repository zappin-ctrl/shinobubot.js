import Discord from "discord.js";
import axios from "axios";
import Canvas from "canvas";
import {registerFont} from 'canvas';
import {getEmbed, getUserFromMention} from "../utility";

const rgbRegEx = /rgba?\( *([0-9]{1,3})%* *, *([0-9]{1,3})%* *, *([0-9]{1,3})%* *(, *[0-9]{1,3} *)*%*?\)/i;
const hslRegEx = /hsl\( *([0-9]{1,3}) *, *([0-9]{1,3})%* *, *([0-9]{1,3})%* *\)/i;
const cmykRegEx = /cmyk\( *([0-9]{1,3})%* *, *([0-9]{1,3})%* *, *([0-9]{1,3})%* *, *([0-9]{1,3})%* *\)/i;
const hexRegEx = /(#|0x)([0-9A-F]{6})/i;

function vErr(name, value, from, to) {
    value = parseInt(value);
    if (value < from || value > to) {
        throw new Error(`> Value for **${name}** must be between **${from}** and **${to}**`);
    }
}

export const aliases = ["color", "hex", "rgb", "cmyk"];
export const run = async (message, args) => {
    try {
        message.channel.startTyping();

        let question = args.join('');
        let user = null;
        let memuser = null;
        if (!question) {
            throw new Error();
        }

        const rgb = question.match(rgbRegEx);
        const hsl = question.match(hslRegEx);
        const cmyk = question.match(cmykRegEx);
        const hex = question.match(hexRegEx);

        let uri = null;
        if (rgb !== null) {
            vErr('Red', rgb[1], 0, 255);
            vErr('Green', rgb[2], 0, 255);
            vErr('Blue', rgb[3], 0, 255);
            uri = `rgb=rgb(${rgb[1]},${rgb[2]},${rgb[3]})`;
        } else if (hsl !== null) {
            vErr('Hue', hsl[1], 0, 359);
            vErr('Saturation', hsl[2], 0, 100);
            vErr('Lightness', hsl[3], 0, 100);
            uri = `hsl=hsl(${hsl[1]},${hsl[2]},${hsl[3]})`;
        } else if (cmyk !== null) {
            vErr('Cyan', cmyk[1], 0, 100);
            vErr('Magenta', cmyk[2], 0, 100);
            vErr('Yellow', cmyk[3], 0, 100);
            vErr('K (Black)', cmyk[4], 0, 100);
            uri = `cmyk=cmyk(${cmyk[1]},${cmyk[2]},${cmyk[3]},${cmyk[4]})`;
        } else if (hex !== null) {
            uri = `hex=${hex[2]}`;
        } else {
            user = await getUserFromMention(args[0], message, true);
            memuser = message.channel.guild.member(user);
            if (memuser) {
                uri = `hex=${memuser.displayHexColor.toString().replace('#','')}`;
            } else if (typeof memuser === 'undefined' && typeof user.displayHexColor !== 'undefined') {
                uri = `hex=${user.displayHexColor.toString().replace('#','')}`;
            } else {
              throw new Error(`If you're looking for hex, use \`#\` or \`0x\`.`);
            }
        }

        const colour = await axios.get(`https://www.thecolorapi.com/scheme?${uri}`);

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
        let y = canvasx.height / 2;
        ctxt.font = "12px Roboto";
        ctxt.textAlign = 'center';
        let addup = 0;
        for (let i=0; i<5; i++) {
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

        const embed = getEmbed()
            .setTitle(colour.data.seed.name.value)
            .setURL(`http://www.thecolorapi.com/id?format=html&hex=${colour.data.seed.hex.clean}`)
            .setDescription(`**HEX: \`${colour.data.seed.hex.value}\`  RGB: \`${colour.data.seed.rgb.value}\`\nCMYK: \`${colour.data.seed.cmyk.value}\`**`)
            .setColor(`0x${colour.data.seed.hex.value}`)
            .attachFiles(rightpic)
            .setThumbnail(`attachment://seed.jpg`)
            .attachFiles(bigpic)
            .setImage(`attachment://array.jpg`);

        message.channel.stopTyping();
        await message.channel.send(embed);
    } catch (e) {
        await message.channel.send(`Please type out a valid colour after \`${process.env.PREFIX}colour\`!\n` +
            `**Examples:** \`#FFFFFF\` - \`rgb(0-255,0-255,0-255)\` - \`hsl(0-359,0-100%,0-100%)\` - \`cmyk(0-100%,0-100%,0-100%,0-100%)\`` +
            (e.message.length ? `\n${e.message}` : ''));
    } finally {
        message.channel.stopTyping();
    }
};

export const help = 'Get information on a HEX/RGB/CMYK/HSL colour.';
export const helpArguments = '[HEX/RGB/CMYK/HSL code/user]';
export const helpGroup = 'utility';
