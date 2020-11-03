import {getEmbed, isOwner} from "../utility";
import client from "../bot";
import _ from "lodash";

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

    let userCount = 0;
    const guilds = client.guilds.cache.map(guild => `**${guild.name}** (${guild.memberCount}) - \`${guild.id}\`\nOwner: ${guild.owner} (\`${guild.ownerID}\`)\n`);
    client.guilds.cache.map(guild => userCount += guild.memberCount);
    const chunks = _.chunk(guilds, 10);
    for (let i = 0; i < chunks.length; i++) {
        let description = `${chunks[i].join('\n')}`;
        if (0 === i) {
            description = `**Servers:** ${client.guilds.cache.size} - **Users:** ${userCount}\n\n` + description;
        }

        await message.channel.send(
            getEmbed()
                .setDescription(description)
        );
    }

};