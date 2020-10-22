import { getChannelFromMention, isOwner } from "../utility";
import CommandStateList from "../orm/settings/CommandStateList";
import client, { commands, reloadLockList } from "../bot";

export async function addToList(command, guildId, channelId, isWhitelist = true) {
    const [obj, created] = await CommandStateList.findOrCreate({
        where: {
            command: command,
            guildId: guildId,
            channelId: channelId,
            isWhitelist: isWhitelist
        }
    });

    if (!created) {
        await obj.save();
    }

    await reloadLockList();
}

export const aliases = ['blacklist'];
export const run = async(message, args, argsclean, cmd, realAlias) => {
    if (!isOwner(message)) {
        return;
    }

    if (!args[0] || !(args[0] in commands)) {
        await message.channel.send(`Command not found or not specified`);
        return;
    }

    const channel = await getChannelFromMention(args[1]);

    if (!channel) {
        await message.channel.send(`Unknown channel specified`);
        return;
    }

    if (channel.guild.id !== message.guild.id) {
        await message.channel.send(`Channel not in current guild`);
        return;
    }

    await addToList(args[0], message.guild.id, channel.id, realAlias === "whitelist");
    await message.channel.send(`Command \`${args[0]}\` is now **${realAlias === "whitelist" ? "usable" : "locked out"}** in channel <#${channel.id}>`);
}

export const help = 'Allow (whitelist) or block (blacklist) a command in a channel.';
export const helpArguments = '[channel]';
export const helpGroup = 'utility';