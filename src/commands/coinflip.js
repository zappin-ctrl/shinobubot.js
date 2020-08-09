import {sleep} from "../utility";

const startQuote = [
    "Tossing a coin",
    "Flipping the coin of fate",
    "Heads or tails? Let's see"
];

const endQuote = [
    '> **Heads!**',
    '> **Tails!**'
];

export const run = async (message) => {
    const post = await message.channel.send(process.env.EMOTE_COINFLIP + " " + startQuote[Math.floor(Math.random() * startQuote.length)] + " . . .");
    await sleep(3000);
    await post.edit(endQuote[Math.floor(Math.random() * endQuote.length)]);
};

export const help = 'It flips a coin, what else would it do?';
export const helpGroup = 'fun';