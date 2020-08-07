import {getEmbed, isOwner} from "../utility";
import client from "../bot";

export const aliases = ["guilds"];
export const run = async (message, args) => {
    if (!isOwner(message)) {
        return;
    }

    if (args[0] === 'leave') {
        const guildIds = client.guilds.cache.map(guild => guild.id);
        if (!guildIds.includes(args[1])) {
            await message.channel.send("Please provide an ID of a server I'm in");
            return;
        }

        await client.guilds.cache.get(args[1]).leave();
        await message.channel.send(`I've left the guild ${process.env.EMOTE_VERIFIED}`);
        return;
    }

    const guilds = client.guilds.cache.map(guild => `**${guild.name}** (${guild.memberCount}) - \`${guild.id}\`\nOwner: ${guild.owner} (\`${guild.ownerID}\`)\n`);
    const embed = getEmbed()
        .setDescription(`${guilds.toString().replace(/,/g, '\n')} \n **Servers:** ${client.guilds.cache.size} - **Users:** ${client.users.cache.size}`);

    await message.channel.send(embed);
};