import {getEmbed} from "../utility";
import client from "../bot";
import moment from "moment";

export const run = async (message) => {
    await message.channel.send(
        getEmbed()
            .setDescription(`**Uptime:** ${moment().startOf('day').seconds(client.uptime / 1000).format('H:mm:ss')}\n\n**Servers:** \`${client.guilds.cache.size}\` - **Users:** \`${client.users.cache.size}\``)
    );
};