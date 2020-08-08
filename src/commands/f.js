import {removeCommandPart, applyMentions} from "../utility";

export const aliases = ["rip"];
export const run = async (message, args) => {
    if (args[0]) {
        await message.channel.send(applyMentions(`**${process.env.DEAD_EMOTE} $1** paid their respects for **${removeCommandPart(message.cleanContent)}**.`, message.author))
    } else {
        await message.channel.send(applyMentions(`**${process.env.DEAD_EMOTE} $1** paid their respects.`, message.author))
    }
};

export const help = "Pay respects";
export const helpArguments = '[something] (optional)';
export const helpGroup = 'fun';