import {isOwner} from "../utility";
import GuildTag, {allowedTags} from "../orm/settings/GuildTag";

export const run = async (message, args) => {
    if (!isOwner(message)) {
        return;
    }

    if (args.length < 2) {
        await message.channel.send("To tag a feature you need at least 2 arguments");
        return;
    }

    if (allowedTags.indexOf(args[0]) === -1) {
        await message.channel.send(`Tag not found, must be one of ${allowedTags.join(' ')}`);
        return;
    }

    const [tag, created] = await GuildTag.findOrCreate({
        where: {guildId: message.guild.id, tag: args[0]},
        defaults: {guildId: message.guild.id, tag: args[0], value: args[1]}
    });

    tag.value = args[1];
    await tag.save();
    await message.channel.send(`Tag ${args[0]} successfully updated.`);
};