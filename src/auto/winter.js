import fs from "fs";
import _ from "lodash";
import GuildTag, {TAG_WINTER} from "../orm/settings/GuildTag";
import Wallet from "../orm/identity/Wallet";
import client from "../bot";
import logger from "../logger";
import Discord from "discord.js";
import {drawTextOnImage, randomBetween, randomChance} from "../utility";
import {Mutex} from "async-mutex";
import Canvas from "canvas";
import NonRepeatingRandom from "../classes/NonRepeatingRandom";

let words = JSON.parse(fs.readFileSync("./assets/event/winter/words.json", 'utf8'));
const wordsSimple = JSON.parse(fs.readFileSync("./assets/event/winter/words-simple.json", "utf8"));

for (let i of wordsSimple) {
    words[i] = [i];
}

const quotes = new NonRepeatingRandom(words);
let image = null;

const mutexes = {};
const deletion_timeouts = {};
const event_quotes = {};

const claim_multipliers = [
    1,
    0.4,
    0.15
];

export async function tryClaim(message) {
    if (!(message.guild.id in event_quotes)) {
        return false;
    }

    if (message.channel.id === event_quotes[message.guild.id].channel &&
        event_quotes[message.guild.id].quote.indexOf(message.cleanContent.toLowerCase()) !== -1) {

        const release = await mutexes[message.guild.id].acquire();

        try {
            if (event_quotes[message.guild.id].claimed.length >= claim_multipliers.length ||
                event_quotes[message.guild.id].claimed.indexOf(message.author.id) !== -1) { // max claims or already claimed
                release();
                return false;
            }

            const points = Math.floor(event_quotes[message.guild.id].points * claim_multipliers[event_quotes[message.guild.id].claimed.length]);
            event_quotes[message.guild.id].claimed.push(message.author.id);
            if (null === event_quotes[message.guild.id].response) {
                event_quotes[message.guild.id].response = await message.channel.send(`> Good job <@${message.author.id}>, you get **${points}** points!`);
                setTimeout(async () => {
                    if (event_quotes[message.guild.id].claimed.length > 1) {
                        let content = event_quotes[message.guild.id].response.content;
                        for (let i = 1; i < event_quotes[message.guild.id].claimed.length; i++) {
                            content += `\n> <@${event_quotes[message.guild.id].claimed[i]}>, you get **${Math.floor(event_quotes[message.guild.id].points * claim_multipliers[i])}** points!`;
                        }

                        await event_quotes[message.guild.id].response.edit(content);
                    }

                    delete event_quotes[message.guild.id];
                }, 4000); // stop listening for other claims in 4 seconds?
            }
            const [wallet, created] = await Wallet.findOrCreate({
                where: { discordId: message.author.id, guildId: message.guild.id },
                defaults: { discordId: message.author.id, guildId: message.guild.id }
            });
            wallet.amount += points;
            await wallet.save();
        } catch (e) {
            logger.error(`An issue occurred while trying to claim ${message.guild.id}'s winter event`, e);
        } finally {
            release();
        }

        return true;
    }

    return false;
}

export async function run() {
    const allGuilds = await GuildTag.findAll({ where: { tag: TAG_WINTER } });

    if (_.isNull(image)) {
        image = await Canvas.loadImage('./assets/event/winter/image.png')
    }

    for (let guild of allGuilds) {
        if (!(guild.guildId in mutexes)) {
            mutexes[guild.guildId] = new Mutex();
        }

        const release = await mutexes[guild.guildId].acquire();

        try {
            const channel = await client.channels.fetch(guild.value);

            const [quote, expected] = quotes.get();
            const buffer = drawTextOnImage(1400, 500, image, quote);
            const points = randomBetween(100, 1000) * (randomChance(5) ? 5 : 1);

            event_quotes[guild.guildId] = {
                quote: _.isArray(expected) ? expected.map((s) => s.toLowerCase()) : [expected.toLowerCase()],
                points: points,
                channel: channel.id,
                message: await channel.send(
                    `🔔**A Christmas spirit has visited!**🔔\n> Type the word/do the math to claim **\`${points}\`** points!`,
                    new Discord.MessageAttachment(buffer, 'event.jpg')
                ),
                claimed: [],
                response: null,
            };

            if (guild.guildId in deletion_timeouts) {
                clearTimeout(deletion_timeouts[guild.guildId]);
            }

            deletion_timeouts[guild.guildId] = setTimeout(() => {
                if (guild.guildId in event_quotes) {
                    const item = event_quotes[guild.guildId];
                    item.message.channel.send(`${process.env.EMOTE_MINUS} You missed this one! Look out for the next.`);
                    item.message.delete();
                    delete event_quotes[guild.guildId];
                }

                delete deletion_timeouts[guild.guildId];
            }, 1000 * 60 * 2);
        } catch (e) {
            logger.error(`An error occurred while working on a winter image for guild ${guild.guildId} with value ${guild.value}`, e);
        } finally {
            release();
        }
    }
}
