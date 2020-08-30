import _ from "lodash";
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
    const post = await message.channel.send(process.env.EMOTE_COINFLIP + " " + _.sample(startQuote) + " . . .");
    await sleep(3000);
    await post.edit(_.sample(endQuote));
};

export const help = 'It flips a coin, what else would it do?';
export const helpGroup = 'fun';
