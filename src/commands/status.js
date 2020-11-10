import {getEmbed} from "../utility";
import client from "../bot";

const fill = (o) => o.toString().length >= 2 ? o.toString() : '0'+o.toString();

export const run = async (message) => {
    let userCount = 0;
    client.guilds.cache.map(guild => userCount += guild.memberCount);

    let total = Math.round(client.uptime / 1000);
    const hours = Math.floor(total / 3600);
    total %= 3600;
    const minutes = Math.floor(total / 60);
    const seconds = Math.floor(total % 60);

    await message.channel.send(
        getEmbed()
            .setDescription(`**Uptime:** ${fill(hours)+':'+fill(minutes)+':'+fill(seconds)}\n\n**Servers:** \`${client.guilds.cache.size}\` - **Users:** \`${userCount}\``)
    );
}