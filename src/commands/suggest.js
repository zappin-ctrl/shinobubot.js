import {removeCommandPart} from "../utility";
import client from "../bot";

export const aliases = ["request", "suggestion", "idea"];
export const run = async (message, args) => {
    if (!args[0]) {
        await message.reply(" you need to provide a request/suggestion.");
        return;
    }

    const owner = process.env.OWNER.split(",")[0];

    await client.users.cache.get(owner).send(
        `User <@${message.author.id}> (${message.author.tag} / ${message.author.id}) requested the following: \n> ${removeCommandPart(message.cleanContent)}`
    );
    await message.reply(` your suggestion has been sent ${process.env.EMOTE_VERIFIED}`);
};

export const help = "Send a suggestion for the bot";
export const helpArguments = '[sentence]';
export const helpGroup = 'utility';
