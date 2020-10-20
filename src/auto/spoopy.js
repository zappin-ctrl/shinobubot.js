import fs from "fs";
import _ from "lodash";
import Canvas from "canvas";
import GuildTag, { TAG_SPOOPY } from "../orm/settings/GuildTag";
import Wallet from "../orm/identity/Wallet";
import client from "../bot";
import logger from "../logger";
import Discord from "discord.js";
import { randomBetween } from "../utility";
import {Mutex} from "async-mutex";

const quotes = JSON.parse(fs.readFileSync('./assets/spoopy-words.json', 'utf8'));
let image = null;

const spoopy_quotes = {};
const deletion_timeouts = {};
const mutexes = {};

const claim_multipliers = [
    1,
    0.4,
    0.15
];

export async function tryClaimSpoopyPoints(message) {
    if (!(message.guild.id in spoopy_quotes)) {
        return -1;
    }

    if (message.channel.id === spoopy_quotes[message.guild.id].channel &&
        spoopy_quotes[message.guild.id].quote.toLowerCase() === message.cleanContent.toLowerCase()) {

        const release = await mutexes[message.guild.id].acquire();

        try {
            if (spoopy_quotes[message.guild.id].claimed.length >= claim_multipliers.length ||
                spoopy_quotes[message.guild.id].claimed.indexOf(message.author.id) !== -1) { // max claims or already claimed
                release();
                return;
            }

            const points = Math.floor(spoopy_quotes[message.guild.id].points * claim_multipliers[spoopy_quotes[message.guild.id].claimed.length]);
            spoopy_quotes[message.guild.id].claimed.push(message.author.id);
            if (null === spoopy_quotes[message.guild.id].response) {
                spoopy_quotes[message.guild.id].response = await message.channel.send(`> Good job <@${message.author.id}>, you get **${points}** points!`);
                setTimeout(async () => {
                    if (spoopy_quotes[message.guild.id].claimed.length > 1) {
                        let content = spoopy_quotes[message.guild.id].response.content;
                        for (let i = 1; i < spoopy_quotes[message.guild.id].claimed.length; i++) {
                            content += `\n> <@${spoopy_quotes[message.guild.id].claimed[i]}>, you get **${Math.floor(spoopy_quotes[message.guild.id].points * claim_multipliers[i])}** points!`;
                        }

                        await spoopy_quotes[message.guild.id].response.edit(content);
                    }

                    delete spoopy_quotes[message.guild.id];
                }, 4000); // stop listening for other claims in 4 seconds?
            }
            const [wallet, created] = await Wallet.findOrCreate({
                where: { discordId: message.author.id },
                defaults: { discordId: message.author.id }
            });
            wallet.amount += points;
            await wallet.save();
        } catch (e) {
            logger.error(`An issue occurred while trying to claim ${message.guild.id}'s spoopy stuff`, e);
        } finally {
            release();
        }

        return points;
    }

    return -1;
}

let post_timeout = null;

export function startTimeout() {
    if (null !== post_timeout) {
        clearTimeout(post_timeout);
    }

    post_timeout = setTimeout(spook, 1000 * randomBetween(60 * 5, 60 * 9)); // between 5-9 minutes
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
        if (!(guild.guildId in mutexes)) {
            mutexes[guild.guildId] = new Mutex();
        }

        const release = await mutexes[guild.guildId].acquire();

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
                ),
                claimed: [],
                response: null,
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
        } finally {
            release();
        }
    }

    startTimeout();
}

export default spook;