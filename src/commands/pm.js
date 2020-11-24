import client from "../bot";
import { isOwner } from "../utility";

export const aliases = ["reply"];
export const run = async(message, args) => {
    if (!isOwner(message)) {
        return;
    }
    if (!args[0]) {
        await message.reply("You need to provide a user's ID or ping them.");
        return;
    }

    const person = args[0].replace("<@", "").replace(">", "");

    try {
        await client.users.cache.get(person).send(
            `**\`From zappin#1312:\` ${args.join(" ").replace(args[0], "")}**`
        );
    } catch {
    message.reply("That user doesn't exist.")
    return;
    }
    await message.channel.send(`Your message was sent ${process.env.EMOTE_VERIFIED}`);
};
