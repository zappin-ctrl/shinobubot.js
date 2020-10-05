import Discord from "discord.js";
import _ from "lodash";
import Canvas from "canvas";
import {getUserFromMention} from "../utility";

let image = null;

export const aliases = [`amongus`, `eject`, `ejected`, `imposter`, `impostor`];
export const run = async (message, args) => {
    // force load into memory, has to be here because otherwise it'd a promise
    if (_.isNull(image)) {
        image = await Canvas.loadImage('./assets/images/ejected.png');
    }

    try {
        let obj;
        let sayfull;
        const endQuote = [
            `was not The Imposter`,
            `was The Imposter`
        ];
        let say = _.sample(endQuote);
        if (say === `was not The Imposter`) {
            sayfull = `${say} ${process.env.EMOTE_MINUS}`
        } else {
            sayfull = `${say} ${process.env.EMOTE_PLUS}`
        }

        if (!args[0]) {
            obj = message.author;
        } else {
            obj = await getUserFromMention(args[0], message, true);
            if (!obj) {
                throw new Error();
            }
        }
        let memobj = message.channel.guild.member(obj);
        if (!memobj) {
            throw new Error();
        }
        let color = memobj.displayHexColor;
        if (!color || color === `#000000`) {
            color = '#FFFFFF'
        }

        const canvas = Canvas.createCanvas(1116, 628);
        let x = canvas.width / 2;
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.rect(0, 0, 1116, 628);
        ctx.fillStyle = `${color}`;
        ctx.fill();
        ctx.drawImage(image, 0, 0, 1116, 628);
        ctx.font = "34px Roboto";
        ctx.textAlign = 'center';
        ctx.fillStyle = `white`;
        ctx.fillText(`${obj.username || memobj.user.username} ${say}`, x, 314);
        const rightpic = new Discord.MessageAttachment(canvas.toBuffer(), 'ejected.png');

        await message.channel.send(`> **${obj.username || memobj.user.username}** ${sayfull}`, rightpic);
    } catch {
        await message.channel.send(`The user doesn't exist or something went wrong.`)
    }
};

export const help = 'Is your friend sus or not? Among Us meme.';
export const helpArguments = '[user]';
export const helpGroup = 'fun';
