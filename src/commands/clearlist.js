import {isOwner} from "../utility";
import {commands, reloadLockList} from "../bot";
import connection from "../sequelize";
import {MODEL} from "../orm/settings/CommandStateList";

export const run = async (message, args) => {
    if (!isOwner(message)) {
        return;
    }

    if (!args[0] || !(args[0] in commands)) {
        await message.channel.send(`Unknown command`);
        return;
    }

    await connection.getQueryInterface().bulkDelete(MODEL, {
        guildId: message.guild.id,
        command: args[0]
    });

    await reloadLockList();
    await message.channel.send(`Cleared run conditions for ${args[0]}`);
}