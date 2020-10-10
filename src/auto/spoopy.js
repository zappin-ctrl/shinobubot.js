import fs from "fs";
import _ from "lodash";
import Canvas from "canvas";
import GuildTag, { TAG_SPOOPY } from "../orm/settings/GuildTag";
import Wallet from "../orm/identity/Wallet";
import client from "../bot";
import logger from "../logger";
import Discord from "discord.js";
import { randomBetween } from "../utility";

const quotes = JSON.parse(fs.readFileSync('./assets/spoopy-words.json', 'utf8'));
let image = null;

const spoopy_quotes = {};
const deletion_timeouts = {};

export async function tryClaimSpoopyPoints(message) {
    if (!(message.guild.id in spoopy_quotes)) {
        return -1;
    }

    const item = spoopy_quotes[message.guild.id];
    if (message.channel.id === item.channel && item.quote.toLowerCase() === message.cleanContent.toLowerCase()) {
        const points = item.points;
        delete spoopy_quotes[message.guild.id];
        await message.channel.send(`> Good job <@${message.author.id}>, you get **${points}** points!`);
        const [wallet, created] = await Wallet.findOrCreate({
            where: { discordId: message.author.id },
            defaults: { discordId: message.author.id }
        });
        wallet.amount += points;
        await wallet.save();

        return points;
    }

    return -1;
}

let post_timeout = null;

export function startTimeout() {
    if (null !== post_timeout) {
        clearTimeout(post_timeout);
    }

    post_timeout = setTimeout(spook, randomBetween(1000 * 60 * 5, 1000 * 60 * 9)); // between 5-9 minutes
}

async function spook() {
    if (null !== post_timeout) {
        clearTimeout(post_timeout);
        post_timeout = null;
    }

    const allGuilds = await GuildTag.findAll({ where: { tag: TAG_SPOOPY } });

    if (_.isNull(image)) {
        image = await Canvas.loadImage('./assets/images/spoop.png')
    }

    for (let guild of allGuilds) {
        try {
            const channel = await client.channels.fetch(guild.value);

            const quote = _.sample(quotes);
            const canvas = Canvas.createCanvas(1400, 500);
            const ctx = canvas.getContext('2d');
            const x = canvas.width / 2;
            ctx.drawImage(image, 0, 0, 1400, 500)
            ctx.font = "120px Roboto";
            ctx.textAlign = 'center';
            ctx.fillStyle = `white`;
            ctx.fillText(`${quote}`, x, 275);

            const points = randomBetween(100, 666);
            spoopy_quotes[guild.guildId] = {
                quote: quote,
                points: points,
                channel: channel.id,
                message: await channel.send(
                    `🔔**A Halloween spirit has visited!**🔔\n> Type the word to claim **\`${points}\`** points!`,
                    new Discord.MessageAttachment(canvas.toBuffer(), 'spoopy.jpg')
                )
            };

            if (guild.guildId in deletion_timeouts) {
                clearTimeout(deletion_timeouts[guild.guildId]);
            }

            deletion_timeouts[guild.guildId] = setTimeout(() => {
                if (guild.guildId in spoopy_quotes) {
                    const item = spoopy_quotes[guild.guildId];
                    item.message.channel.send(`${process.env.EMOTE_MINUS} You missed this one! Look out for the next.`);
                    item.message.delete();
                    delete spoopy_quotes[guild.guildId];
                }

                delete deletion_timeouts[guild.guildId];
            }, 1000 * 60 * 2);
        } catch (e) {
            logger.error(`An error occurred while working on a spoopy image for guild ${guild.guildId} with value ${guild.value}`, e);
        }
    }

    startTimeout();
}

export default spook;