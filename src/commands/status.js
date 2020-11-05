import {getEmbed} from "../utility";
import client from "../bot";
import moment from "moment";

export const run = async (message) => {
    let userCount = 0;
    client.guilds.cache.map(guild => userCount += guild.memberCount);

    await message.channel.send(
        getEmbed()
            .setDescription(`**Uptime:** ${moment(client.uptime).format('HHH:mm:ss')}\n\n**Servers:** \`${client.guilds.cache.size}\` - **Users:** \`${userCount}\``)
    );
}