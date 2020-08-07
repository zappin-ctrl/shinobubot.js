import {removeCommandPart} from "../utility";

export const aliases = ["rip"];
export const run = async (message, args) => {
    if (args[0]) {
        await message.channel.send(`**${process.env.DEAD_EMOTE} <@${message.author.id}>** paid their respects for **${removeCommandPart(message.cleanContent)}**.`)
    } else {
        await message.channel.send(`**${process.env.DEAD_EMOTE} <@${message.author.id}>** paid their respects.`)
    }
};